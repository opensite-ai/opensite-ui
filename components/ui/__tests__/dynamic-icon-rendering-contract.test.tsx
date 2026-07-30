import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import * as ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
// Reviewed local JSX values that have already crossed DynamicIcon.
const ALLOWED_RESOLVED_VALUES = new Set([
  "components/blocks/features/feature-utility-cards-grid.tsx:renderLabelIcon",
  "components/blocks/link-page/link-page-bento-layout.tsx:defaultIcon",
  "components/blocks/link-page/link-page-grid-cards.tsx:defaultIcon",
  "components/blocks/link-page/link-page-minimal-profile.tsx:defaultIcon",
  "components/blocks/link-page/link-page-newsletter-social.tsx:resolvedChevronIcon",
  "components/blocks/link-page/link-page-newsletter-social.tsx:defaultIcon",
  "components/blocks/link-page/link-tree-block.tsx:defaultIcon",
  "components/ui/social-link-icon.tsx:icon",
  "components/ui/social-link-icon.tsx:iconNameOverride",
]);

const isIconName = (value: string) =>
  /^(icon|iconAfter|iconBefore|iconName|iconNameOverride|iconSlot|[a-z]\w*Icon(?:Name(?:Override)?|Slot)?)$/.test(
    value,
  );

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory())
      return entry.name === "__tests__" ? [] : sourceFiles(target);
    return /\.tsx?$/.test(entry.name) ? [target] : [];
  });
}

describe("dynamic icon rendering contract", () => {
  it("rejects raw builder-facing icon values and ReactNode-only contracts", () => {
    const files = [
      ...sourceFiles(path.join(ROOT, "components/blocks")),
      ...sourceFiles(path.join(ROOT, "components/ui")),
      path.join(ROOT, "src/types/blocks.ts"),
    ].filter((file) => !file.endsWith("/dynamic-icon.tsx"));
    const violations = new Set<string>();

    for (const file of files) {
      const relative = path.relative(ROOT, file);
      const source = ts.createSourceFile(
        file,
        readFileSync(file, "utf8"),
        ts.ScriptTarget.Latest,
        true,
        file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
      );
      const unwrap = (node: ts.Expression): ts.Expression => {
        while (
          ts.isParenthesizedExpression(node) ||
          ts.isAsExpression(node) ||
          ts.isNonNullExpression(node) ||
          ts.isSatisfiesExpression(node)
        )
          node = node.expression;
        return node;
      };
      const iconRef = (node: ts.Expression) => {
        if (ts.isIdentifier(node) && isIconName(node.text)) return node.text;
        if (ts.isPropertyAccessExpression(node) && isIconName(node.name.text))
          return node.getText(source);
        return null;
      };
      const rawRefs = (value: ts.Expression): string[] => {
        const node = unwrap(value);
        const direct = iconRef(node);
        if (direct) return [direct];
        if (ts.isBinaryExpression(node)) {
          if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken)
            return rawRefs(node.right);
          if (
            node.operatorToken.kind === ts.SyntaxKind.BarBarToken ||
            node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken
          )
            return [...rawRefs(node.left), ...rawRefs(node.right)];
        }
        if (ts.isConditionalExpression(node))
          return [...rawRefs(node.whenTrue), ...rawRefs(node.whenFalse)];
        if (ts.isJsxSelfClosingElement(node))
          return node.tagName.getText(source) === "DynamicIcon" ? [] : [];
        if (ts.isJsxElement(node)) {
          if (node.openingElement.tagName.getText(source) === "DynamicIcon")
            return [];
          return node.children.flatMap((child) =>
            ts.isJsxExpression(child) && child.expression
              ? rawRefs(child.expression)
              : [],
          );
        }
        if (ts.isJsxFragment(node))
          return node.children.flatMap((child) =>
            ts.isJsxExpression(child) && child.expression
              ? rawRefs(child.expression)
              : [],
          );
        return [];
      };
      const record = (node: ts.Node, expression: ts.Expression) => {
        for (const ref of rawRefs(expression)) {
          const parts = ref.split(".");
          const leaf = parts[parts.length - 1]!;
          if (!ALLOWED_RESOLVED_VALUES.has(`${relative}:${leaf}`))
            violations.add(
              `${relative}:${source.getLineAndCharacterOfPosition(node.getStart()).line + 1} renders ${ref} directly`,
            );
        }
      };
      const visit = (node: ts.Node) => {
        if (
          ts.isJsxExpression(node) &&
          node.expression &&
          (ts.isJsxElement(node.parent) || ts.isJsxFragment(node.parent))
        )
          record(node, node.expression);
        if (ts.isReturnStatement(node) && node.expression)
          record(node, node.expression);
        if (ts.isArrowFunction(node) && !ts.isBlock(node.body))
          record(node, node.body);
        if (ts.isPropertySignature(node) && node.type && node.name) {
          const name = node.name.getText(source).replace(/["']/g, "");
          const type = node.type.getText(source);
          if (
            isIconName(name) &&
            /\bReactNode\b|React\.ReactNode/.test(type) &&
            !/\bstring\b|DynamicIconName/.test(type)
          )
            violations.add(
              `${relative}:${source.getLineAndCharacterOfPosition(node.getStart()).line + 1} declares ${name} without string support`,
            );
        }
        ts.forEachChild(node, visit);
      };
      visit(source);
    }

    const sortedViolations = [...violations].sort();
    expect(
      sortedViolations,
      `Dynamic icon contract violations:\n${sortedViolations.join("\n")}`,
    ).toEqual([]);
  });
});

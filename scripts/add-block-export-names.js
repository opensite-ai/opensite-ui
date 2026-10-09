import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptsDirectory, "..");
const registryPath = path.join(repositoryRoot, "src/registry/blocks.ts");

const registryFile = ts.createSourceFile(
  registryPath,
  fs.readFileSync(registryPath, "utf8"),
  ts.ScriptTarget.Latest,
  true,
);

const declaration = registryFile.statements
  .filter(ts.isVariableStatement)
  .flatMap((statement) => [...statement.declarationList.declarations])
  .find(
    (item) =>
      ts.isIdentifier(item.name) &&
      item.name.text === "BLOCK_COMPONENTS",
  );

if (
  !declaration?.initializer ||
  !ts.isObjectLiteralExpression(declaration.initializer)
) {
  throw new Error("Could not find BLOCK_COMPONENTS in src/registry/blocks.ts");
}

const componentNames = new Map();

for (const property of declaration.initializer.properties) {
  if (
    !ts.isPropertyAssignment(property) ||
    !ts.isIdentifier(property.initializer)
  ) {
    continue;
  }

  const id = ts.isStringLiteral(property.name)
    ? property.name.text
    : ts.isIdentifier(property.name)
      ? property.name.text
      : undefined;

  if (id) componentNames.set(id, property.initializer.text);
}

function getRuntimeExportNames(wrapperPath) {
  const sourceFile = ts.createSourceFile(
    wrapperPath,
    fs.readFileSync(wrapperPath, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );

  return sourceFile.statements.flatMap((statement) => {
    if (
      !ts.isExportDeclaration(statement) ||
      statement.isTypeOnly ||
      !statement.exportClause ||
      !ts.isNamedExports(statement.exportClause)
    ) {
      return [];
    }

    return statement.exportClause.elements
      .filter((specifier) => !specifier.isTypeOnly)
      .map((specifier) => specifier.name.text);
  });
}

const manifestsDirectory = path.join(scriptsDirectory, "manifests");
const manifests = fs
  .readdirSync(manifestsDirectory)
  .filter((name) => /^blocks-.*\.json$/.test(name))
  .sort();

const seenIds = new Set();
let blockCount = 0;

for (const manifest of manifests) {
  const manifestPath = path.join(manifestsDirectory, manifest);
  const entries = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  for (const entry of entries) {
    const id = path.posix.basename(entry.path);
    const wrapperPath = path.join(repositoryRoot, "src", `${id}.ts`);

    if (!fs.existsSync(wrapperPath)) {
      throw new Error(`Missing block wrapper: ${wrapperPath}`);
    }

    if (seenIds.has(id)) {
      throw new Error(`Duplicate block ID in manifests: ${id}`);
    }
    seenIds.add(id);

    const runtimeExports = getRuntimeExportNames(wrapperPath);
    const mappedName = componentNames.get(id);

    // Use the registry mapping to disambiguate wrappers with helper exports.
    const exportName =
      mappedName ??
      (runtimeExports.length === 1 ? runtimeExports[0] : undefined);

    if (!exportName || !runtimeExports.includes(exportName)) {
      throw new Error(
        `Cannot resolve a valid component export for block "${id}"`,
      );
    }

    entry.exportName = exportName;
    blockCount++;
  }

  fs.writeFileSync(manifestPath, `${JSON.stringify(entries, null, 2)}\n`);
}

console.log(`Added exportName to ${blockCount} block manifest entries.`);
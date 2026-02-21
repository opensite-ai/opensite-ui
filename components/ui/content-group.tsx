import * as React from "react";
import { cn } from "../../lib/utils";
import { Text, type TextProps, type TextElement } from "./text";

/**
 * Content item configuration for Text component rendering.
 * Use this when you want ContentGroup to render a Text component with specific props.
 *
 * The `_type: "text"` discriminator distinguishes this from React.ReactNode items.
 */
export type ContentTextItem<T extends TextElement = "span"> = {
  /**
   * Type discriminator - must be "text" for Text component rendering
   */
  _type: "text";
} & TextProps<T>;

/**
 * Union type for content group items.
 * Can be either a ContentTextItem (renders as Text component) or React.ReactNode (renders directly).
 */
export type ContentGroupItem = ContentTextItem<TextElement> | React.ReactNode;

/**
 * Type guard to check if an item is a ContentTextItem (has _type: "text")
 */
function isContentTextItem(item: ContentGroupItem): item is ContentTextItem {
  return (
    item !== null &&
    typeof item === "object" &&
    !React.isValidElement(item) &&
    "_type" in item &&
    item._type === "text"
  );
}

/**
 * Props for the ContentGroup component.
 * Extends HTML div attributes for full flexibility on the wrapper element.
 */
export interface ContentGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of content items to render.
   * Each item can be either:
   * - A ContentTextItem object (renders as Text component with specified props)
   * - A React.ReactNode (renders directly - for Badge, custom components, etc.)
   *
   * @example
   * ```tsx
   * items={[
   *   { _type: "text", as: "h2", className: "text-2xl font-bold", children: "Heading" },
   *   { _type: "text", as: "p", className: "text-muted-foreground", children: "Description" },
   *   <Badge key="badge">Featured</Badge>,
   * ]}
   * ```
   */
  items: ContentGroupItem[];
}

/**
 * ContentGroup component for rendering a standardized group of text/content elements.
 *
 * This component streamlines the common pattern found throughout blocks where
 * headings, descriptions, badges, and other content elements are rendered together.
 * It supports both structured TextProps (rendered via the Text component for SEO-compliant
 * semantic HTML) and arbitrary React.ReactNode elements (for components like Badge).
 *
 * **Key Features:**
 * - Renders Text components with full SEO-compliant HTML tag support (h1-h6, p, span, etc.)
 * - Supports arbitrary React.ReactNode for custom components (Badge, icons, etc.)
 * - Passes through all HTML div attributes to the wrapper element
 * - Returns null if no items are provided (clean conditional rendering)
 *
 * **Type Discrimination:**
 * Items are distinguished by the `_type: "text"` property:
 * - Objects with `_type: "text"` are rendered as Text components
 * - Everything else (ReactNode, strings, elements) is rendered directly
 *
 * @example
 * ```tsx
 * // Basic usage with Text items
 * <ContentGroup
 *   className="mb-10 text-center"
 *   items={[
 *     { _type: "text", as: "h2", className: "text-3xl font-bold", children: "Our Services" },
 *     { _type: "text", as: "p", className: "text-muted-foreground", children: "What we offer" },
 *   ]}
 * />
 *
 * // Mixed content with Badge component
 * <ContentGroup
 *   className="space-y-4 flex flex-col items-center"
 *   items={[
 *     <Badge key="badge" className="px-3 py-1">New Feature</Badge>,
 *     { _type: "text", as: "h2", className: "text-4xl font-bold", children: "Introducing AI" },
 *     { _type: "text", as: "p", children: "Transform your workflow with our AI tools." },
 *   ]}
 * />
 *
 * // Hero section replacement
 * <ContentGroup
 *   className="flex flex-col gap-5"
 *   items={[
 *     { _type: "text", as: "p", className: "font-light uppercase", children: subtitle },
 *     { _type: "text", as: "h1", className: "text-5xl font-medium", children: heading },
 *     { _type: "text", as: "p", className: "my-0 md:my-8", children: description },
 *   ]}
 * />
 * ```
 */
export const ContentGroup = React.forwardRef<HTMLDivElement, ContentGroupProps>(
  ({ items, className, children, ...props }, ref) => {
    const hasContent = items && items.length > 0;

    if (!hasContent) {
      return null;
    }

    return (
      <div ref={ref} className={cn(className)} {...props}>
        {items.map((item, idx) => {
          if (isContentTextItem(item)) {
            // Extract _type and pass remaining props to Text
            const { _type, ...textProps } = item;
            return <Text key={idx} {...textProps} />;
          }

          // At this point, item is React.ReactNode (not ContentTextItem)
          const reactNode = item as React.ReactNode;

          // Render ReactNode directly (Badge, custom components, strings, etc.)
          // If it's a valid element, use its key if available, otherwise use index
          if (React.isValidElement(reactNode)) {
            return React.cloneElement(reactNode, { key: reactNode.key ?? idx });
          }

          // For primitives (strings, numbers, null, undefined, etc.), wrap in fragment with key
          return <React.Fragment key={idx}>{reactNode}</React.Fragment>;
        })}
        {children}
      </div>
    );
  },
);

ContentGroup.displayName = "ContentGroup";

import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * Allowed HTML text element tags that the Text component can render.
 * Includes headings (h1-h6), paragraphs, spans, divs, and other inline/block text elements.
 */
export type TextElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "label"
  | "legend"
  | "caption"
  | "figcaption"
  | "blockquote"
  | "cite"
  | "q"
  | "abbr"
  | "address"
  | "b"
  | "strong"
  | "i"
  | "em"
  | "mark"
  | "small"
  | "del"
  | "ins"
  | "sub"
  | "sup"
  | "code"
  | "kbd"
  | "samp"
  | "var"
  | "pre"
  | "time"
  | "data"
  | "s"
  | "u";

/**
 * Maps TextElement to its corresponding HTML element props interface.
 * This enables full type safety when using the Text component.
 */
type TextElementPropsMap = {
  h1: React.HTMLAttributes<HTMLHeadingElement>;
  h2: React.HTMLAttributes<HTMLHeadingElement>;
  h3: React.HTMLAttributes<HTMLHeadingElement>;
  h4: React.HTMLAttributes<HTMLHeadingElement>;
  h5: React.HTMLAttributes<HTMLHeadingElement>;
  h6: React.HTMLAttributes<HTMLHeadingElement>;
  p: React.HTMLAttributes<HTMLParagraphElement>;
  span: React.HTMLAttributes<HTMLSpanElement>;
  div: React.HTMLAttributes<HTMLDivElement>;
  label: React.LabelHTMLAttributes<HTMLLabelElement>;
  legend: React.HTMLAttributes<HTMLLegendElement>;
  caption: React.HTMLAttributes<HTMLTableCaptionElement>;
  figcaption: React.HTMLAttributes<HTMLElement>;
  blockquote: React.BlockquoteHTMLAttributes<HTMLQuoteElement>;
  cite: React.HTMLAttributes<HTMLElement>;
  q: React.QuoteHTMLAttributes<HTMLQuoteElement>;
  abbr: React.HTMLAttributes<HTMLElement>;
  address: React.HTMLAttributes<HTMLElement>;
  b: React.HTMLAttributes<HTMLElement>;
  strong: React.HTMLAttributes<HTMLElement>;
  i: React.HTMLAttributes<HTMLElement>;
  em: React.HTMLAttributes<HTMLElement>;
  mark: React.HTMLAttributes<HTMLElement>;
  small: React.HTMLAttributes<HTMLElement>;
  del: React.DelHTMLAttributes<HTMLModElement>;
  ins: React.InsHTMLAttributes<HTMLModElement>;
  sub: React.HTMLAttributes<HTMLElement>;
  sup: React.HTMLAttributes<HTMLElement>;
  code: React.HTMLAttributes<HTMLElement>;
  kbd: React.HTMLAttributes<HTMLElement>;
  samp: React.HTMLAttributes<HTMLElement>;
  var: React.HTMLAttributes<HTMLElement>;
  pre: React.HTMLAttributes<HTMLPreElement>;
  time: React.TimeHTMLAttributes<HTMLTimeElement>;
  data: React.DataHTMLAttributes<HTMLDataElement>;
  s: React.HTMLAttributes<HTMLElement>;
  u: React.HTMLAttributes<HTMLElement>;
};

/**
 * Maps TextElement to its corresponding HTMLElement type for ref forwarding.
 */
type TextElementRefMap = {
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  h3: HTMLHeadingElement;
  h4: HTMLHeadingElement;
  h5: HTMLHeadingElement;
  h6: HTMLHeadingElement;
  p: HTMLParagraphElement;
  span: HTMLSpanElement;
  div: HTMLDivElement;
  label: HTMLLabelElement;
  legend: HTMLLegendElement;
  caption: HTMLTableCaptionElement;
  figcaption: HTMLElement;
  blockquote: HTMLQuoteElement;
  cite: HTMLElement;
  q: HTMLQuoteElement;
  abbr: HTMLElement;
  address: HTMLElement;
  b: HTMLElement;
  strong: HTMLElement;
  i: HTMLElement;
  em: HTMLElement;
  mark: HTMLElement;
  small: HTMLElement;
  del: HTMLModElement;
  ins: HTMLModElement;
  sub: HTMLElement;
  sup: HTMLElement;
  code: HTMLElement;
  kbd: HTMLElement;
  samp: HTMLElement;
  var: HTMLElement;
  pre: HTMLPreElement;
  time: HTMLTimeElement;
  data: HTMLDataElement;
  s: HTMLElement;
  u: HTMLElement;
};

/**
 * Props for the Text component.
 * Extends the HTML element props for the specified tag type.
 *
 * @template T - The HTML element tag to render (default: "span")
 */
export type TextProps<T extends TextElement = "span"> = {
  /**
   * The HTML element tag to render.
   * @default "span"
   */
  as?: T;
  /**
   * Additional CSS classes to apply.
   */
  className?: string;
  /**
   * Content to render inside the text element.
   */
  children?: React.ReactNode;
} & Omit<TextElementPropsMap[T], "className" | "children">;

/**
 * Text component for dynamically rendering semantic HTML text elements.
 *
 * This primitive component allows the AI builder to dynamically define which HTML
 * tag should be rendered, ensuring proper semantic structure for SEO compliance.
 * For example, the builder can ensure only one h1 tag exists per page by dynamically
 * assigning heading levels.
 *
 * The component extends the full HTML interface of the specified element, making it
 * a true drop-in replacement with full prop compatibility.
 *
 * @template T - The HTML element tag to render
 *
 * @example
 * ```tsx
 * // Render as h1 (for page title)
 * <Text as="h1" className="text-4xl font-bold">Page Title</Text>
 *
 * // Render as h2 (for section heading)
 * <Text as="h2" className="text-2xl font-semibold">Section Heading</Text>
 *
 * // Render as paragraph
 * <Text as="p" className="text-base text-muted-foreground">
 *   Description text goes here.
 * </Text>
 *
 * // Default renders as span
 * <Text className="text-sm">Inline text</Text>
 *
 * // With time element attributes
 * <Text as="time" dateTime="2024-01-15">January 15, 2024</Text>
 *
 * // With label attributes
 * <Text as="label" htmlFor="email-input">Email Address</Text>
 * ```
 */
function TextInner<T extends TextElement = "span">(
  { as, className, children, ...props }: TextProps<T>,
  ref: React.ForwardedRef<TextElementRefMap[T]>,
) {
  const Component = (as || "span") as React.ElementType;

  return (
    <Component ref={ref} className={cn(className)} {...props}>
      {children}
    </Component>
  );
}

/**
 * Polymorphic Text component with ref forwarding.
 *
 * Due to TypeScript limitations with generic forwardRef, we use a type assertion
 * to maintain proper generic inference while supporting ref forwarding.
 */
export const Text = React.forwardRef(TextInner) as <
  T extends TextElement = "span",
>(
  props: TextProps<T> & { ref?: React.ForwardedRef<TextElementRefMap[T]> },
) => React.ReactElement | null;

// Add display name for React DevTools
(Text as React.FC).displayName = "Text";

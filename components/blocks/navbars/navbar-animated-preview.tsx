"use client";

import * as React from "react";
import { Fragment, useState, useEffect, useRef, forwardRef } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle } from "../../ui/sheet";
import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";
import { AspectRatio } from "../../ui/aspect-ratio";
import {
  logoPlaceholders,
  imagePlaceholders,
} from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Base link item for dropdown menus
 */
export interface ILinkItem {
  label: React.ReactNode;
  description?: React.ReactNode;
  url: string;
  icon?: React.ReactNode;
  iconName?: string;
  image?: string;
  background?: string;
  company?: {
    name: React.ReactNode;
    logo: string;
  };
}

/**
 * Group of links with a title
 */
export interface ILinkGroup {
  title: React.ReactNode;
  links: ILinkItem[];
}

/**
 * Featured image link with badge
 */
export interface IFeaturedImageLink {
  url: string;
  image?: string;
  label: React.ReactNode;
}

/**
 * Layout types for animated preview dropdown menus
 *
 * LAYOUT OPTIONS FOR AI PAGE BUILDER:
 *
 * 1. "animated-image-preview"
 *    - Visual: Grid layout with large image preview on left (360px wide), links list on right
 *    - Behavior: Image changes on hover based on which link is being hovered
 *    - Best for: Product showcases, feature highlights, visual content navigation
 *    - Required data: links[] with label, description, url, image
 *    - Example use case: Product categories where each has a hero image
 *
 * 2. "featured-cards-grid"
 *    - Visual: 2-column grid of featured cards with background images and icons
 *    - Behavior: Static grid, cards have hover effects
 *    - Best for: Highlighting key features or products with visual emphasis
 *    - Required data: featuredLinks[] with label, description, url, iconName, background
 *                     links[] for additional non-featured links
 *    - Example use case: Premium features or flagship products
 *
 * 3. "grouped-links-image"
 *    - Visual: Left side has grouped link sections, right side has single featured image card
 *    - Behavior: Static layout with organized link groups
 *    - Best for: Organized navigation with many links grouped by category
 *    - Required data: groupLinks[] with title and links[]
 *                     imageLink with label, description, url, image, badge (optional)
 *    - Example use case: Developer resources grouped by topic with featured documentation
 */
export type AnimatedPreviewLayout =
  | "animated-image-preview" // Grid of links with animated image preview on hover
  | "featured-cards-grid" // Featured cards at top + separator + grid of links
  | "grouped-links-image"; // Grouped links + featured image card

/**
 * Menu link interface with flexible dropdown configuration
 */
export interface IMenuLink {
  title: React.ReactNode;
  url?: string;
  layout?: AnimatedPreviewLayout;

  // Animated image preview layout
  links?: ILinkItem[];

  // Featured cards grid layout
  featuredLinks?: ILinkItem[];

  // Grouped links image layout
  groupLinks?: ILinkGroup[];
  imageLink?: IFeaturedImageLink;
}

/**
 * Logo configuration interface
 */
export interface LogoConfig {
  url?: string;
  src?: string;
  alt?: string;
  title?: React.ReactNode;
  className?: string;
}

/**
 * Props for the NavbarAnimatedPreview component
 */
export interface NavbarAnimatedPreviewProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the nav wrapper
   */
  navClassName?: string;
  /**
   * Additional CSS classes for the navigation menu
   */
  navigationMenuClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Logo configuration
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo object)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo
   */
  logoClassName?: string;
  /**
   * Navigation menu links with optional dropdown groups
   */
  menuLinks?: IMenuLink[];
  /**
   * Custom slot for navigation (overrides menuLinks array)
   */
  navigationSlot?: React.ReactNode;
  /**
   * Action configurations (e.g., Sign In, Get Started buttons)
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const MOBILE_BREAKPOINT = 1280;

/**
 * NavbarAnimatedPreview - A fixed navigation bar with animated image previews and multiple dropdown styles.
 *
 * Features three distinct dropdown menu styles: (1) Products dropdown with animated image preview that
 * slides up when hovering over links, (2) Solutions dropdown with featured cards and a grid of links,
 * and (3) Developers dropdown with grouped links and a featured image card with badge. The navigation
 * menu spans full width with smooth fade-in animations. Mobile view uses a full-screen sheet with
 * accordion navigation. Ideal for complex SaaS products and developer platforms.
 */
export const NavbarAnimatedPreview = ({
  className,
  containerClassName,
  navClassName,
  navigationMenuClassName,
  actionsClassName,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
  },
  logoSlot,
  logoClassName,
  menuLinks,
  navigationSlot,
  actions,
  actionsSlot,
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarAnimatedPreviewProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleMobileMenu = () => {
    setOpen(!open);
  };

  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Pressable
        href={logo.url || "/"}
        className={cn(
          "flex max-h-8 items-center gap-2 text-lg font-semibold tracking-tighter",
          logoClassName
        )}
      >
        {logo.src && (
          <Img
            src={logo.src}
            alt={logo.alt || "Logo"}
            className={cn("inline-block size-6", logo.className)}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {logo.title && (
          typeof logo.title === "string" ? (
            <span className="hidden md:inline-block">{logo.title}</span>
          ) : (
            logo.title
          )
        )}
      </Pressable>
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={actionClassName}
          {...pressableProps}
        >
          {children ?? (
            <>
              {icon}
              {label}
              {iconAfter ?? <DynamicIcon name="lucide/chevron-right" size={16} />}
            </>
          )}
        </Pressable>
      );
    });
  };

  const renderNavigation = () => {
    if (navigationSlot) return navigationSlot;
    if (!menuLinks || menuLinks.length === 0) return null;

    return (
      <NavigationMenuList>
        {menuLinks.map((item, index) => (
          <DesktopMenuItem
            key={`desktop-link-${index}`}
            item={item}
            index={index}
            optixFlowConfig={optixFlowConfig}
          />
        ))}
      </NavigationMenuList>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(
        "pointer-events-auto fixed top-0 z-999 flex w-full items-center justify-center",
        className
      )}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <NavigationMenu className={cn(
        "h-20 max-w-full after:absolute after:inset-0 after:z-998 after:block after:size-full after:bg-background after:content-[''] [&>div:last-child>div]:mt-0 [&>div:last-child>div]:animate-none [&>div:last-child>div]:rounded-none [&>div:last-child>div]:border-0 [&>div:last-child>div]:shadow-[0px_-1px_0px_0px_rgba(0,0,0,0.05),0px_0px_0px_1px_rgba(17,26,37,0.05),0px_2px_5px_0px_rgba(16,25,36,0.1),0px_5px_20px_0px_rgba(16,25,36,0.1)]!",
        navigationMenuClassName
      )}>
        <div className={cn(
          "relative z-999 container grid w-full grid-cols-2 items-center justify-between gap-8 xl:grid-cols-3",
          containerClassName
        )}>
          {renderLogo()}
          <div className={cn("hidden xl:flex", navClassName)}>
            {renderNavigation()}
          </div>
          <div className={cn("justify-self-end", actionsClassName)}>
            <div className="hidden xl:block">
              {renderActions()}
            </div>
            <div className="xl:hidden">
              <Pressable
                className="size-11"
                variant="ghost"
                size="icon"
                asButton
                onClick={handleMobileMenu}
              >
                {open ? (
                  <DynamicIcon
                    name="lucide/x"
                    size={22}
                    className="stroke-foreground"
                  />
                ) : (
                  <DynamicIcon
                    name="lucide/menu"
                    size={22}
                    className="stroke-foreground"
                  />
                )}
              </Pressable>
            </div>
          </div>
        </div>
      </NavigationMenu>
      <MobileNavigationMenu
        open={open}
        menuLinks={menuLinks ?? []}
        actions={actions}
        actionsSlot={actionsSlot}
      />
    </Section>
  );
};

interface DesktopMenuItemProps {
  item: IMenuLink;
  index: number;
  optixFlowConfig?: OptixFlowConfig;
}

const DesktopMenuItem = ({
  item,
  index,
  optixFlowConfig,
}: DesktopMenuItemProps) => {
  const hasDropdown = Boolean(
    item.links?.length ||
    item.featuredLinks?.length ||
    item.groupLinks?.length
  );

  if (hasDropdown) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger className="bg-transparent px-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent h-fit font-normal text-foreground/60">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="hidden rounded-xl! border-0! p-0! xl:block">
          <div className="w-dvw animate-[fade-in-slide-down_0.35s_cubic-bezier(0.33,1,0.68,1)_forwards] px-8 pt-6 pb-12">
            <div className="container">
              {renderDropdownContent(item, optixFlowConfig)}
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
      <NavigationMenuLink
        href={item.url}
        className={`${navigationMenuTriggerStyle()} bg-transparent px-0 hover:bg-transparent focus:bg-transparent h-fit font-normal text-foreground/60`}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderDropdownContent = (item: IMenuLink, optixFlowConfig?: OptixFlowConfig) => {
  const layout = item.layout || "animated-image-preview";

  switch (layout) {
    case "animated-image-preview":
      return (
        <AnimatedImagePreviewDropdown
          links={item.links}
          optixFlowConfig={optixFlowConfig}
        />
      );
    case "featured-cards-grid":
      return (
        <FeaturedCardsGridDropdown
          featuredLinks={item.featuredLinks}
          links={item.links}
          optixFlowConfig={optixFlowConfig}
        />
      );
    case "grouped-links-image":
      return (
        <GroupedLinksImageDropdown
          groupLinks={item.groupLinks}
          imageLink={item.imageLink}
          optixFlowConfig={optixFlowConfig}
        />
      );
    default:
      return null;
  }
};

interface AnimatedImagePreviewDropdownProps {
  links?: ILinkItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const AnimatedImagePreviewDropdown = ({ links, optixFlowConfig }: AnimatedImagePreviewDropdownProps) => {
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  const updateImageClasses = (activeIndex: number) => {
    imageRefs.current.forEach((img, i) => {
      if (!img) return;
      const isActive = i === activeIndex;

      img.classList.toggle("opacity-100", isActive);
      img.classList.toggle("translate-y-0", isActive);
      img.classList.toggle("opacity-0", !isActive);
      img.classList.toggle("translate-y-20", !isActive);
      img.classList.toggle("z-10", isActive);
    });
  };

  const handleMouseEnter =
    (index: number) => (event: React.MouseEvent<HTMLElement>) => {
      linksRef.current.forEach((link) => {
        if (link && link !== event.currentTarget) {
          link.classList.add("opacity-50");
        }
      });
      updateImageClasses(index);
    };

  const handleMouseLeave = () => {
    linksRef.current.forEach((link) => {
      link?.classList.remove("opacity-50");
    });
    updateImageClasses(0);
  };

  if (!links) return null;

  return (
    <div className="grid grid-cols-2 gap-8">
      <ul className="grid grid-cols-2 gap-8">
        {links.map((link, index) => (
          <NavLink
            key={`default-nav-link-${index}`}
            link={link}
            onMouseEnter={handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            ref={(el: HTMLAnchorElement | null) => {
              if (el) linksRef.current[index] = el;
            }}
          />
        ))}
      </ul>
      <div className="relative h-64! w-full overflow-hidden rounded-lg bg-muted">
        {links.map((link, index) => (
          <div
            key={`default-nav-link-img-${index}`}
            ref={(el) => {
              if (el) imageRefs.current[index] = el;
            }}
            className={`will-change-opacity absolute top-14 left-14 aspect-video w-175 overflow-hidden rounded-tl-md border-t border-l transition-all duration-600 ease-in-out will-change-transform ${
              index === 0
                ? "z-10 translate-y-0 opacity-100"
                : "pointer-events-none z-0 translate-y-20 opacity-0"
            }`}
          >
            <Img
              src={link.image || imagePlaceholders[0]}
              alt={typeof link.label === "string" ? link.label : ""}
              className="size-full object-cover object-left-top"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface FeaturedCardsGridDropdownProps {
  links?: ILinkItem[];
  featuredLinks?: ILinkItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const FeaturedCardsGridDropdown = ({
  links,
  featuredLinks,
  optixFlowConfig,
}: FeaturedCardsGridDropdownProps) => {
  return (
    <div>
      <div className="flex gap-8 pb-8">
        {featuredLinks?.map((link, index) => (
          <FeaturedLink
            key={`desktop-featured-link-${index}`}
            link={link}
            optixFlowConfig={optixFlowConfig}
          />
        ))}
      </div>
      <Separator />
      <div className="grid grid-cols-4 pt-8">
        {links?.map((link, index) => (
          <NavLink key={`default-nav-link-${index}`} link={link} />
        ))}
      </div>
    </div>
  );
};

interface GroupedLinksImageDropdownProps {
  groupLinks?: ILinkGroup[];
  imageLink?: IFeaturedImageLink;
  optixFlowConfig?: OptixFlowConfig;
}

const GroupedLinksImageDropdown = ({
  groupLinks,
  imageLink,
  optixFlowConfig,
}: GroupedLinksImageDropdownProps) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <GroupLinks groupLinks={groupLinks} />
      <FeaturedImageLink link={imageLink} optixFlowConfig={optixFlowConfig} />
    </div>
  );
};

interface GroupLinksProps {
  groupLinks?: ILinkGroup[];
}

const GroupLinks = ({ groupLinks }: GroupLinksProps) => {
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  const handleMouseEnter = () => (event: React.MouseEvent<HTMLElement>) => {
    linksRef.current.forEach((link) => {
      if (link && link !== event.currentTarget) {
        link.classList.add("opacity-50");
      }
    });
  };

  const handleMouseLeave = () => {
    linksRef.current.forEach((link) => {
      link?.classList.remove("opacity-50");
    });
  };

  if (!groupLinks) return null;

  let linkIndex = 0;
  return (
    <div className="grid grid-cols-2 gap-8">
      {groupLinks.map((group, index1) => (
        <div key={`group-link-${index1}`}>
          <div className="mb-4 text-xs text-muted-foreground">
            {group.title}
          </div>
          <ul className="flex flex-col gap-8">
            {group.links.map((link, index2) => {
              const idx = linkIndex++;
              return (
                <li key={`group-link-${index1}-${index2}`}>
                  <NavLink
                    link={link}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    ref={(el: HTMLAnchorElement | null) => {
                      if (el) linksRef.current[idx] = el;
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

interface FeaturedImageLinkProps {
  link?: IFeaturedImageLink;
  optixFlowConfig?: OptixFlowConfig;
}

const FeaturedImageLink = ({
  link,
  optixFlowConfig,
}: FeaturedImageLinkProps) => {
  if (!link) return null;

  return (
    <div className="hidden xl:block">
      <Pressable href={link.url} className="w-full max-w-147.5">
        <AspectRatio
          ratio={1.77245509}
          className="overflow-hidden rounded-lg bg-muted"
        >
          <div className="size-full">
            <Badge className="absolute top-2 left-2">New</Badge>
            <div className="flex w-full flex-col items-center justify-center gap-8 pt-10">
              <div className="text-2xl font-semibold">{link.label}</div>
              <div className="w-[80%]">
                <AspectRatio
                  ratio={1.5}
                  className="overflow-hidden rounded-lg bg-muted"
                >
                  <Img
                    src={link.image || imagePlaceholders[0]}
                    alt={typeof link.label === "string" ? link.label : ""}
                    className="size-full object-cover object-left-top"
                    optixFlowConfig={optixFlowConfig}
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </AspectRatio>
      </Pressable>
    </div>
  );
};

interface FeaturedLinkProps {
  link: ILinkItem;
  optixFlowConfig?: OptixFlowConfig;
}

const FeaturedLink = ({ link, optixFlowConfig }: FeaturedLinkProps) => {
  return (
    <Pressable
      href={link.url}
      className="group relative flex w-full overflow-hidden rounded-xl bg-muted px-8 py-7"
    >
      <div className="relative z-10 flex w-full items-center gap-6">
        <div className="flex size-12 shrink-0 rounded-lg border bg-background shadow-lg">
          {link.icon ? (
            link.icon
          ) : link.iconName ? (
            <DynamicIcon
              name={link.iconName}
              size={20}
              className="m-auto stroke-foreground"
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold text-white">{link.label}</div>
          <div className="font-medium text-white/80">{link.description}</div>
        </div>
      </div>
      <Img
        src={link.background || imagePlaceholders[0]}
        alt={typeof link.label === "string" ? link.label : ""}
        className="absolute top-0 left-0 size-full object-cover object-left-top opacity-90 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
        optixFlowConfig={optixFlowConfig}
      />
    </Pressable>
  );
};

interface NavLinkProps {
  link: ILinkItem;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: () => void;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ link, onMouseEnter, onMouseLeave }, ref) => {
    return (
      <Pressable
        ref={ref}
        href={link.url}
        className="flex w-full gap-2 transition-opacity duration-300"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {(link.icon || link.iconName) && (
          <div className="flex size-6 shrink-0 rounded-md border shadow">
            {link.icon ? link.icon : link.iconName && <DynamicIcon name={link.iconName} size={14} className="m-auto" />}
          </div>
        )}
        <div className="flex flex-col items-start gap-2">
          {link.company && (
            <div className="block text-base leading-normal xl:hidden">
              {link.company.name}
            </div>
          )}
          {link.company && (
            <Img
              className="hidden h-6 xl:block"
              src={link.company.logo}
              alt={typeof link.company.name === "string" ? link.company.name : ""}
            />
          )}
          {link.label && (
            <div className="text-base leading-normal">{link.label}</div>
          )}
          <div className="text-sm leading-normal text-muted-foreground">
            {link.description}
          </div>
        </div>
      </Pressable>
    );
  }
);

NavLink.displayName = "NavLink";

interface MobileNavigationMenuProps {
  open: boolean;
  menuLinks: IMenuLink[];
  actions?: ActionConfig[];
  actionsSlot?: React.ReactNode;
}

const MobileNavigationMenu = ({
  open,
  menuLinks,
  actions,
  actionsSlot,
}: MobileNavigationMenuProps) => {
  const renderMobileActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={actionClassName}
          {...pressableProps}
        >
          {children ?? (
            <>
              {icon}
              {label}
              {iconAfter}
            </>
          )}
        </Pressable>
      );
    });
  };

  return (
    <Sheet open={open}>
      <SheetContent
        aria-describedby={undefined}
        side="top"
        className="inset-0 z-998 h-dvh w-full bg-background pt-20 [&>button]:hidden"
      >
        <div className="flex-1 overflow-y-auto">
          <div className="container py-8">
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
              <SheetTitle className="text-primary">
                Mobile Navigation
              </SheetTitle>
            </div>
            <div className="flex min-h-full flex-col gap-6">
              <Accordion type="multiple" className="w-full">
                {menuLinks.map((item, index) =>
                  renderMobileMenuItem(item, index)
                )}
              </Accordion>
              <div className="flex flex-col gap-2">
                {renderMobileActions()}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const renderMobileMenuItem = (item: IMenuLink, index: number) => {
  if (item.links || item.featuredLinks || item.groupLinks) {
    return (
      <AccordionItem
        key={`nav-item-${index}`}
        value={`nav-${index}`}
        className="border-b-0"
      >
        <AccordionTrigger className="h-10 items-center text-base font-normal text-foreground hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-6 p-2">
          {item.featuredLinks && (
            <div className="flex flex-col gap-2 p-2">
              {item.featuredLinks.map((link, idx) => (
                <NavLink key={`default-nav-link-${idx}`} link={link} />
              ))}
            </div>
          )}
          {item.links && (
            <div className="flex flex-col gap-2 p-2">
              {item.links.map((link, idx) => (
                <NavLink key={`default-nav-link-${idx}`} link={link} />
              ))}
            </div>
          )}
          {item.groupLinks && (
            <div className="flex flex-col gap-2 p-2">
              {item.groupLinks.map((group, groupIdx) => (
                <div className="mb-8 last:mb-0" key={`group-link-${groupIdx}`}>
                  <div className="mb-4 text-xs text-muted-foreground">
                    {group.title}
                  </div>
                  <ul className="flex flex-col gap-2">
                    {group.links.map((link, linkIdx) => (
                      <li key={`group-link-${groupIdx}-${linkIdx}`}>
                        <NavLink link={link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Pressable
      key={`nav-link-${index}`}
      href={item.url}
      className="flex h-10 items-center rounded-md text-left text-base leading-[3.75] font-normal text-foreground ring-ring/10 outline-ring/50 transition-all focus-visible:ring-4 focus-visible:outline-1 nth-last-1:border-0"
    >
      {item.title}
    </Pressable>
  );
};

export default NavbarAnimatedPreview;

‘’’tsx
import { cn } from "@/lib/utils"; import { Logo, LogoImage, LogoText } from "@/components/shadcnblocks/logo"; interface MenuItem { title: string; links: { text: string; url: string; }[]; } interface Footer2Props { logo?: { url: string; src: string; alt: string; title: string; }; className?: string; tagline?: string; menuItems?: MenuItem[]; copyright?: string; bottomLinks?: { text: string; url: string; }[]; } const Footer2 = ({ logo = { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg", alt: "blocks for shadcn/ui", title: "Shadcnblocks.com", url: "https://www.shadcnblocks.com", }, className, tagline = "Components made easy.", menuItems = [ { title: "Product", links: [ { text: "Overview", url: "#" }, { text: "Pricing", url: "#" }, { text: "Marketplace", url: "#" }, { text: "Features", url: "#" }, { text: "Integrations", url: "#" }, { text: "Pricing", url: "#" }, ], }, { title: "Company", links: [ { text: "About", url: "#" }, { text: "Team", url: "#" }, { text: "Blog", url: "#" }, { text: "Careers", url: "#" }, { text: "Contact", url: "#" }, { text: "Privacy", url: "#" }, ], }, { title: "Resources", links: [ { text: "Help", url: "#" }, { text: "Sales", url: "#" }, { text: "Advertise", url: "#" }, ], }, { title: "Social", links: [ { text: "Twitter", url: "#" }, { text: "Instagram", url: "#" }, { text: "LinkedIn", url: "#" }, ], }, ], copyright = "© 2024 Shadcnblocks.com. All rights reserved.", bottomLinks = [ { text: "Terms and Conditions", url: "#" }, { text: "Privacy Policy", url: "#" }, ], }: Footer2Props) => { return ( <section className={cn("py-32", className)}> <div className="container"> <footer> <div className="grid grid-cols-2 gap-8 lg:grid-cols-6"> <div className="col-span-2 mb-8 lg:mb-0"> <div className="flex items-center gap-2 lg:justify-start"> <Logo url="https://shadcnblocks.com"> <LogoImage src={logo.src} alt={logo.alt} title={logo.title} className="h-10 dark:invert" /> <LogoText className="text-xl">{logo.title}</LogoText> </Logo> </div> <p className="mt-4 font-bold">{tagline}</p> </div> {menuItems.map((section, sectionIdx) => ( <div key={sectionIdx}> <h3 className="mb-4 font-bold">{section.title}</h3> <ul className="space-y-4 text-muted-foreground"> {section.links.map((link, linkIdx) => ( <li key={linkIdx} className="font-medium hover:text-primary" > <a href={link.url}>{link.text}</a> </li> ))} </ul> </div> ))} </div> <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center"> <p>{copyright}</p> <ul className="flex gap-4"> {bottomLinks.map((link, linkIdx) => ( <li key={linkIdx} className="underline hover:text-primary"> <a href={link.url}>{link.text}</a> </li> ))} </ul> </div> </footer> </div> </section> ); }; export { Footer2 };
‘’’


‘’’tsx

import {
  FaDiscord,
  FaLinkedin,
  FaRedditAlien,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";

import { cn } from "@/lib/utils";

import { Logo, LogoImage, LogoText } from "@/components/shadcnblocks/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
      { name: "Integrations", href: "#" },
      { name: "Pricing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
    ],
  },
];

interface Footer3Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
}
const Footer3 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  className,
}: Footer3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <Logo url="https://shadcnblocks.com">
            <LogoImage
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-10"
            />
            <LogoText className="text-xl">{logo.title}</LogoText>
          </Logo>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-4">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="lg:col-span-2 xl:col-span-1">
              <ul className="mb-10 flex items-center gap-2 text-muted-foreground">
                <li className="font-medium">
                  <a href="#">
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaDiscord className="size-6" />
                    </span>
                  </a>
                </li>
                <li className="font-medium">
                  <a href="#">
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaRedditAlien className="size-6" />
                    </span>
                  </a>
                </li>
                <li className="font-medium">
                  <a href="#">
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaTwitter className="size-6" />
                    </span>
                  </a>
                </li>
                <li className="font-medium">
                  <a href="#">
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaTelegramPlane className="size-6" />
                    </span>
                  </a>
                </li>
                <li className="font-medium">
                  <a href="#">
                    <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                      <FaLinkedin className="size-6" />
                    </span>
                  </a>
                </li>
              </ul>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Subscribe to our newsletter</Label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="email" placeholder="Email" />
                  <Button type="submit">Subscribe</Button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  By submitting, you agree to our
                  <a href="#" className="ml-1 text-primary hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-24 flex flex-col flex-wrap justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>© 2024 Shadcnblocks.com. All rights reserved.</p>
            <ul className="flex gap-4">
              <li className="whitespace-nowrap underline hover:text-primary">
                <a href="#">Terms and Conditions</a>
              </li>
              <li className="whitespace-nowrap underline hover:text-primary">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer3 };

‘’’


‘’’tsx

import { FaDiscord, FaTwitter } from "react-icons/fa";

import { cn } from "@/lib/utils";

import {
  Logo,
  LogoImageDesktop,
  LogoImageMobile,
} from "@/components/shadcnblocks/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
      { name: "Integrations", href: "#" },
      { name: "Pricing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
    ],
  },
];

interface Footer4Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    srcMobile: string;
  };
  className?: string;
}
const Footer4 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblocks-logo-word.svg",
    srcMobile: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblocks-logo.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  className,
}: Footer4Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 flex h-full items-center justify-between md:items-start lg:col-span-3 lg:flex-col">
              <Logo url="https://shadcnblocks.com">
                <LogoImageDesktop
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-9"
                />
                <LogoImageMobile
                  src={logo.srcMobile}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-8"
                />
              </Logo>
              <ul className="flex items-center space-x-6 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <FaDiscord className="size-6" />
                  </a>
                </li>

                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <FaTwitter className="size-6" />
                  </a>
                </li>
              </ul>
            </div>
            <Separator className="col-span-2 my-6 lg:hidden" />
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-14 lg:my-20" />
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="mb-2 text-3xl font-semibold lg:text-4xl">
                Join our newsletter
              </p>
              <p className="text-muted-foreground">
                Get exclusive news, features, and updates.
              </p>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" />
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
          <Separator className="my-14 lg:my-20" />
          <div className="flex flex-col justify-between gap-4 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <ul className="flex gap-4">
              <li className="underline hover:text-primary">
                <a href="#"> Terms and Conditions</a>
              </li>
              <li className="underline hover:text-primary">
                <a href="#"> Privacy Policy</a>
              </li>
            </ul>
            <p>© 2024 Shadcnblocks.com. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer4 };

‘’’


‘’’tsx

import {
  FaAndroid,
  FaApple,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaRedditAlien,
  FaTwitter,
} from "react-icons/fa";

import { cn } from "@/lib/utils";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
      { name: "Integrations", href: "#" },
      { name: "Pricing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { name: "Twitter", href: "#" },
      { name: "Instagram", href: "#" },
      { name: "LinkedIn", href: "#" },
    ],
  },
];

interface Footer5Props {
  className?: string;
}

const Footer5 = ({ className }: Footer5Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 gap-10">
            <div className="grid gap-8 lg:grid-cols-4 lg:flex-row">
              <div className="col-span-3">
                <p className="mb-3 font-bold">Follow us</p>
                <ul className="flex items-center gap-2 text-muted-foreground">
                  <li className="font-medium">
                    <a href="#">
                      <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                        <FaFacebook className="size-6" />
                      </span>
                    </a>
                  </li>
                  <li className="font-medium">
                    <a href="#">
                      <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                        <FaRedditAlien className="size-6" />
                      </span>
                    </a>
                  </li>
                  <li className="font-medium">
                    <a href="#">
                      <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                        <FaTwitter className="size-6" />
                      </span>
                    </a>
                  </li>
                  <li className="font-medium">
                    <a href="#">
                      <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                        <FaInstagram className="size-6" />
                      </span>
                    </a>
                  </li>
                  <li className="font-medium">
                    <a href="#">
                      <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                        <FaLinkedin className="size-6" />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="mb-3 font-bold">Mobile App</p>
                <ul className="flex items-center gap-2 text-muted-foreground">
                  <li className="font-medium">
                    <a href="#">
                      <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                        <FaAndroid className="size-6" />
                      </span>
                    </a>
                  </li>
                  <li className="font-medium">
                    <a href="#">
                      <span className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary">
                        <FaApple className="size-6" />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-24 border-t pt-8">
            <p className="text-center text-sm font-medium text-muted-foreground">
              © 2024 Shadcnblocks.com. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer5 };

‘’’


‘’’tsx

import { cn } from "@/lib/utils";

const sitemap = [
  {
    title: "Company",
    links: [
      {
        title: "About Us",
        href: "#",
      },
      {
        title: "Careers",
        href: "#",
      },
      {
        title: "Contact",
        href: "#",
      },
      {
        title: "Press",
        href: "#",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        title: "Help Center",
        href: "#",
      },
      {
        title: "Community",
        href: "#",
      },
      {
        title: "Status",
        href: "#",
      },
      {
        title: "API Docs",
        href: "#",
      },
    ],
  },
];

interface Footer6Props {
  className?: string;
}

const Footer6 = ({ className }: Footer6Props) => {
  return (
    <section className={cn("py-16", className)}>
      <div className="container">
        <footer>
          <div className="relative mb-8 flex w-full flex-col gap-x-28 gap-y-8 md:flex-row md:justify-between md:gap-y-0">
            <div className="max-w-96">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-lg border border-border bg-accent p-2">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                    alt="placeholder logo"
                    className="size-12 h-full w-full object-contain object-center"
                  />
                </div>
                <h3 className="text-xl font-bold">Shadcnblocks.com</h3>
              </div>
              <p className="text-base font-medium text-muted-foreground">
                Components made easy.
              </p>
            </div>
            <div className="flex flex-col items-start gap-x-20 gap-y-14 xl:flex-row">
              <div className="inline-grid w-fit grid-cols-1 gap-x-20 gap-y-14 sm:grid-cols-2">
                {sitemap.map((section) => (
                  <div key={section.title} className="h-fit w-min">
                    <h4 className="mb-6 text-base font-semibold whitespace-nowrap">
                      {section.title}
                    </h4>
                    <ul className="space-y-3 text-base font-medium text-muted-foreground">
                      {section.links.map((link) => (
                        <li key={link.title}>
                          <a
                            href={link.href}
                            className="text-base whitespace-nowrap hover:text-accent-foreground"
                          >
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-baseline justify-between gap-8 border-t border-border pt-8 md:flex-row md:gap-16">
            <div className="text-xs text-muted-foreground sm:text-sm">
              &copy; Shadcnblocks.com 2024
            </div>
            <div className="flex flex-col items-start gap-4 text-xs text-muted-foreground sm:text-sm md:flex-row lg:items-center">
              <a href="#" className="hover:text-accent-foreground">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-accent-foreground">
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer6 };

‘’’


‘’’tsx

import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import { cn } from "@/lib/utils";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const Footer7 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  sections = defaultSections,
  description = "A collection of components for your startup business or side project.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2024 Shadcnblocks.com. All rights reserved.",
  legalLinks = defaultLegalLinks,
  className,
}: Footer7Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <a href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-8"
                />
              </a>
              <h2 className="text-xl font-semibold">{logo.title}</h2>
            </div>
            <p className="max-w-[70%] text-sm text-muted-foreground">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Footer7 };

‘’’


‘’’tsx

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
      { name: "Integrations", href: "#" },
      { name: "Marketing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
];

interface Footer8Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
}
const Footer8 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  className,
}: Footer8Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <div className="grid grid-cols-4 justify-between gap-10 lg:grid-cols-6 lg:text-left">
            <div className="col-span-4 flex w-full flex-col gap-6 lg:col-span-2">
              {/* Logo */}
              <div className="flex items-center gap-2 lg:justify-start">
                <a href="https://shadcnblocks.com">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-8"
                  />
                </a>
                <h2 className="text-xl font-semibold">{logo.title}</h2>
              </div>
              <p className="text-muted-foreground">
                A collection of 100+ responsive HTML templates for your startup
                business or side project.
              </p>
              <ul className="flex items-center space-x-6">
                <li className="font-medium duration-200 hover:scale-110 hover:text-muted-foreground">
                  <a href="#">
                    <FaInstagram className="size-6" />
                  </a>
                </li>
                <li className="font-medium duration-200 hover:scale-110 hover:text-muted-foreground">
                  <a href="#">
                    <FaFacebook className="size-6" />
                  </a>
                </li>
                <li className="font-medium duration-200 hover:scale-110 hover:text-muted-foreground">
                  <a href="#">
                    <FaTwitter className="size-6" />
                  </a>
                </li>
                <li className="font-medium duration-200 hover:scale-110 hover:text-muted-foreground">
                  <a href="#">
                    <FaLinkedin className="size-6" />
                  </a>
                </li>
              </ul>
            </div>
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="col-span-2 md:col-span-1">
                <h3 className="mb-5 font-medium">{section.title}</h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-4 md:col-span-2">
              <h3 className="mb-5 font-medium">Newsletter</h3>
              <div className="grid gap-1.5">
                <div className="flex w-full items-center space-x-2">
                  <Input type="email" placeholder="Email" />
                  <Button type="submit">Subscribe</Button>
                </div>
              </div>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                By submitting, you agree to our
                <a href="#" className="ml-1 text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
            <p>
              <span className="mr-1 font-bold text-primary">
                Shadcnblocks.com
              </span>
              © All rights reserved.
            </p>
            <p>
              Made with ❤️ by{" "}
              <a href="https://x.com/ausrobdev" className="text-primary">
                @ausrobdev
              </a>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer8 };

‘’’


‘’’tsx

import { CircleCheck, LifeBuoy, Linkedin } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Tasks", href: "#" },
      { name: "Calendar", href: "#" },
      { name: "Conferencing", href: "#" },
      { name: "Invoicing", href: "#" },
      { name: "Security", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Roadmap", href: "#" },
      { name: "Changelog", href: "#" },
      { name: "Resources", href: "#" },
    ],
  },
  {
    title: "Case Studies",
    links: [
      { name: "Shadcn", href: "#" },
      { name: "React", href: "#" },
      { name: "Tailwind", href: "#" },
    ],
  },
  {
    title: "Integrations",
    links: [
      { name: "Hubspot", href: "#" },
      { name: "Slack", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About ", href: "#" },
      { name: "Company", href: "#" },
      { name: "Support", href: "#" },
      { name: "Book a demo", href: "#" },
    ],
  },
];

interface Footer9Props {
  className?: string;
}

const Footer9 = ({ className }: Footer9Props) => {
  return (
    <section className={cn("bg-gray-100 py-32", className)}>
      <div className="container">
        <footer>
          <div className="mb-14 flex flex-col justify-between gap-11 md:items-start xl:flex-row xl:items-center xl:gap-6">
            <div>
              <h1 className="mb-4 text-4xl font-semibold">Get More Done.</h1>
              <p className="mb-8 text-xl text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
              <div className="flex items-center gap-3">
                <Button>Start for free</Button>
                <Button variant="outline">Compare plans</Button>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6 rounded-2xl bg-background p-6 shadow-lg md:flex-row">
              <div className="flex flex-col items-center justify-center p-10">
                <div className="flex text-6xl font-semibold">
                  0<div className="h-full text-xl">€</div>
                </div>
                <div className="text-sm">Free forever</div>
              </div>
              <div className="h-[1px] w-full bg-muted-foreground/30 md:h-auto md:w-[1px]" />
              <ul className="flex flex-col justify-center space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2 font-medium hover:text-primary">
                  <CircleCheck className="h-5 w-5 text-primary" />
                  <p className="text-gray-400">1 Team Member</p>
                </li>
                <li className="flex items-center gap-2 font-medium hover:text-primary">
                  <CircleCheck className="h-5 w-5 text-primary" />
                  <p className="text-gray-400">Unlimited Downloads</p>
                </li>
                <li className="flex items-center gap-2 font-medium hover:text-primary">
                  <CircleCheck className="h-5 w-5 text-primary" />
                  <p className="text-gray-400">100GB Space</p>
                </li>
                <li className="flex items-center gap-2 font-medium hover:text-primary">
                  <CircleCheck className="h-5 w-5 text-primary" />
                  <p className="text-gray-400">Basic Support</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 border-t pt-20 lg:grid-cols-5">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center">
            <ul className="flex justify-center gap-4 lg:justify-start">
              <li className="hover:text-primary">
                <a href="#">Privacy</a>
              </li>
              <li className="hover:text-primary">
                <a href="#">Terms</a>
              </li>
              <li className="hover:text-primary">
                <a href="#">Imprint</a>
              </li>
              <li>
                <p className="text-gray-400">
                  © 2024 Shadcnblocks.com. All rights reserved.
                </p>
              </li>
            </ul>
            <ul className="flex items-center justify-center gap-4 lg:justify-start">
              <li>
                <p className="text-black">Follow us:</p>
              </li>
              <li>
                <Button className="gap-2 rounded-full" variant="outline">
                  <Linkedin className="h-4 w-4" />
                  Linkedin
                </Button>
              </li>
              <li>
                <Button className="gap-2 rounded-full" variant="outline">
                  <LifeBuoy className="h-4 w-4" />
                  Product Hunt
                </Button>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer9 };

‘’’


‘’’tsx

import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navigation = [
  {
    title: "Product",
    links: [
      { name: "Home", href: "#" },
      { name: "Feature1", href: "#" },
      { name: "Feature2", href: "#" },
      { name: "Feature3", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Pricing", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "FAQ", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    title: "Service",
    links: [
      { name: "Terms of service", href: "#" },
      { name: "Privacy policy", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

interface Footer13Props {
  className?: string;
}

const Footer13 = ({ className }: Footer13Props) => {
  return (
    <section
      className={cn(
        "bg-primary py-16 text-primary-foreground md:py-24 lg:py-32",
        className,
      )}
    >
      <div className="container">
        <footer>
          <div className="mb-16 rounded-2xl bg-primary-foreground/5 p-8 backdrop-blur-sm md:p-12 lg:p-16">
            <div className="flex flex-col items-center text-center">
              <h2 className="max-w-[800px] text-4xl leading-tight font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
                Start your free trial today.
                <span className="text-sand-600 relative inline-block">
                  Your future won&apos;t wait.
                  <span className="bg-sand-600/30 absolute bottom-1 left-0 h-1 w-full rounded-full"></span>
                </span>
              </h2>
              <p className="mt-4 max-w-[600px] text-lg text-primary-foreground/80">
                Join thousands of users already leveraging our platform to
                achieve more.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild variant="secondary" size="lg" className="group">
                  <a href="/get-started" className="flex items-center gap-2">
                    Get started with 7 days free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-sand-600/20 mb-14 border-b pb-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div>
                <h3 className="mb-2 text-2xl font-medium">Stay connected</h3>
                <p className="max-w-md text-primary-foreground/70">
                  Subscribe to our newsletter for the latest updates, resources,
                  and exclusive offers.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative grow">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="h-12 border-primary-foreground/20 bg-primary-foreground/10 pl-10"
                  />
                </div>
                <Button variant="secondary" type="submit" className="h-12 px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <nav className="border-sand-600/20 grid grid-cols-2 gap-x-6 gap-y-10 border-b py-10 sm:grid-cols-4 lg:py-16">
            {navigation.map((section) => (
              <div key={section.title}>
                <h3 className="mb-5 text-lg font-semibold">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="inline-block text-primary-foreground/80 transition-colors duration-200 hover:text-primary-foreground"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="mx-auto mt-4 py-8">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <p className="font-medium text-primary-foreground/80">
                © {new Date().getFullYear()} Streamline -{" "}
                <a
                  href="https://shadcnblocks.com"
                  className="underline transition-colors hover:text-primary-foreground"
                  target="_blank"
                >
                  Shadcnblocks.com
                </a>
              </p>
              <div className="flex items-center gap-6">
                {socialLinks.map((link) => (
                  <a
                    aria-label={link.label}
                    key={link.href}
                    href={link.href}
                    className="text-primary-foreground/70 transition-colors hover:text-primary-foreground/100"
                  >
                    <link.icon
                      size={20}
                      className="transition-transform hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer13 };

‘’’


‘’’tsx

import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const navigation = [
  {
    title: "Products",
    links: [
      { name: "VAR", href: "#" },
      { name: "Credit Transfers", href: "#" },
      { name: "Credit Accounts", href: "#" },
      { name: "Loan Origination", href: "#" },
      { name: "Loan Purchase", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Pricing", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Demo", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

const socialLinks = [
  { name: "Twitter", icon: FaXTwitter, href: "https://twitter.com" },
  { name: "Facebook", icon: FaFacebook, href: "https://facebook.com" },
  { name: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com" },
];

export const Footer14 = () => {
  return (
    <section className="bg-background py-12 sm:py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-5 md:px-6">
        {/* Logo and newsletter section */}
        <div className="mb-10 flex flex-col items-start justify-between gap-10 border-b pb-10 sm:mb-16 sm:pb-12 md:flex-row">
          <div className="w-full max-w-full sm:max-w-sm">
            <a href="https://shadcnblocks.com">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                alt="Charter logo"
                className="mb-6 h-8 dark:invert"
              />
            </a>
            <p className="mb-8 text-base text-muted-foreground">
              Building financial solutions for businesses and individuals around
              the globe.
            </p>

            {/* Newsletter subscription */}
            <div className="flex w-full max-w-full flex-col gap-3 sm:max-w-md sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="flex h-12 flex-1 rounded-md border border-input bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:text-sm"
              />
              <button className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 py-2 text-base font-medium whitespace-nowrap text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:h-10 sm:px-4 sm:text-sm">
                Subscribe
              </button>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="w-full border-t pt-8 sm:border-t-0 sm:pt-0">
            <nav className="grid w-full grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 md:w-auto md:grid-cols-3">
              {navigation.map((section) => (
                <div key={section.title} className="min-w-[140px]">
                  <h2 className="mb-4 text-lg font-semibold">
                    {section.title}
                  </h2>
                  <ul className="space-y-3.5">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="inline-block py-1 text-muted-foreground transition-colors duration-200 hover:text-foreground active:text-primary"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="order-1 mb-6 flex w-full items-center justify-center gap-6 sm:justify-start md:order-2 md:mb-0 md:w-auto">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-label={`Visit our ${link.name} page`}
                className="rounded-full p-3 text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground active:bg-accent/70"
                rel="noopener noreferrer"
                target="_blank"
              >
                <link.icon className="h-6 w-6 sm:h-5 sm:w-5" />
              </a>
            ))}
          </div>

          {/* Copyright - Below on mobile, left on desktop */}
          <p className="order-2 text-center text-sm text-muted-foreground sm:text-left md:order-1">
            © {new Date().getFullYear()} Charter. All rights reserved.{" "}
            <a
              href="https://shadcnblocks.com"
              className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
              target="_blank"
            >
              Shadcnblocks.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

‘’’

‘’’tsx

import { Facebook, Github, Linkedin, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "#",
  },
  {
    icon: Linkedin,
    href: "#",
  },
  {
    icon: Facebook,
    href: "#",
  },
  {
    icon: Twitter,
    href: "#",
  },
];

const NAVIGATION = [
  {
    title: "Tools",
    links: [
      { name: "Plans", href: "#" },
      { name: "Safety", href: "#" },
      { name: "Partners", href: "#" },
    ],
  },
  {
    title: "Docs",
    links: [
      { name: "Help", href: "#" },
      { name: "API", href: "#" },
      { name: "Guide", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Updates", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "DPA", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Trust", href: "#" },
      { name: "Prefs", href: "#" },
    ],
  },
];

interface Footer16Props {
  className?: string;
}

const Footer16 = ({ className }: Footer16Props) => {
  return (
    <section className={cn("dark bg-background pt-32", className)}>
      <footer className="container">
        <div className="grid gap-10 pb-6 md:grid-cols-2 md:pb-0">
          <div className="flex flex-col justify-start gap-8">
            {/* Logo */}
            <a href="https://shadcnblocks.com">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark-white.svg"
                alt="Shadcnblocks"
                title="Shadcnblocks"
                className="h-11"
              />
            </a>
            <div className="flex items-center justify-start gap-4 md:flex-row">
              {SOCIAL_LINKS.map((item, i) => (
                <Button
                  key={`social-link-${i}`}
                  size="icon"
                  variant="secondary"
                >
                  <a href={item.href}>
                    <item.icon className="size-4 lg:size-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <div className="hidden md:flex md:gap-10 lg:gap-24 xl:gap-32">
              {NAVIGATION.map((section) => (
                <div className="flex flex-col gap-4" key={section.title}>
                  <h6 className="mb-2 text-sm font-semibold text-foreground uppercase">
                    {section.title}
                  </h6>
                  {section.links.map((link) => (
                    <a
                      className="text-sm font-medium text-muted-foreground transition-colors duration-200 ease-in-out hover:text-foreground"
                      key={link.name}
                      href={link.href}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              ))}
            </div>
            <div className="md:hidden">
              <Accordion type="single" collapsible className="w-full">
                {NAVIGATION.map((section, i) => (
                  <AccordionItem value={`item-${i}`} key={section.title}>
                    <AccordionTrigger className="py-4 text-sm text-foreground uppercase hover:no-underline">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                      {section.links.map((link) => (
                        <a
                          className="text-sm font-medium text-muted-foreground transition-colors duration-200 ease-in-out hover:text-foreground"
                          key={link.name}
                          href={link.href}
                        >
                          {link.name}
                        </a>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <img
            className="w-full translate-y-2 opacity-10 md:translate-y-4 lg:translate-y-6 xl:translate-y-8"
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/shadcnblocks-giant-white-text.svg"
            alt=""
          />
        </div>
      </footer>
    </section>
  );
};

export { Footer16 };

‘’’


‘’’tsx

"use client";
import {
  ChevronDown,
  ExternalLink,
  Facebook,
  Github,
  Linkedin,
  MonitorCog,
  Moon,
  Sun,
  Twitter,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type linkType = "DROPDOWN" | "LINK" | "EXTERNAL_LINK";

interface NavigationLink {
  type?: linkType;
  name: string;
  href?: string;
  links?: Omit<NavigationLink, "type">[];
}

interface Navigation {
  title: string;
  links: NavigationLink[];
}

const NAVIGATION: Array<Navigation> = [
  {
    title: "Solutions",
    links: [
      {
        type: "LINK",
        name: "Machine Learning",
        href: "#",
      },
      {
        type: "LINK",
        name: "Cloud Services",
        href: "#",
      },
      {
        type: "LINK",
        name: "Edge Computing",
        href: "#",
      },
      {
        type: "LINK",
        name: "Web Frameworks",
        href: "#",
      },
      {
        type: "LINK",
        name: "Data Analytics",
        href: "#",
      },
      {
        type: "LINK",
        name: "CI/CD",
        href: "#",
      },
      {
        type: "LINK",
        name: "Load Balancing",
        href: "#",
      },
      {
        type: "LINK",
        name: "Encryption",
        href: "#",
      },
      {
        type: "LINK",
        name: "Performance Boost",
        href: "#",
      },
      {
        type: "EXTERNAL_LINK",
        name: "API",
        href: "#",
      },
    ],
  },
  {
    title: "Help",
    links: [
      {
        type: "EXTERNAL_LINK",
        name: "Community Forum",
        href: "#",
      },
      {
        type: "LINK",
        name: "API Docs",
        href: "#",
      },
      {
        type: "LINK",
        name: "Setup Guide",
        href: "#",
      },
      {
        type: "LINK",
        name: "FAQ",
        href: "#",
      },
      {
        type: "LINK",
        name: "Partners",
        href: "#",
      },
      {
        type: "LINK",
        name: "Contact Support",
        href: "#",
      },
      {
        type: "LINK",
        name: "Pricing Info",
        href: "#",
      },
      {
        type: "LINK",
        name: "System Status",
        href: "#",
      },
      {
        type: "LINK",
        name: "Security Notices",
        href: "#",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        type: "LINK",
        name: "About Us",
        href: "#",
      },
      {
        type: "LINK",
        name: "Newsroom",
        href: "#",
      },
      {
        type: "LINK",
        name: "Jobs",
        href: "#",
      },
      {
        type: "LINK",
        name: "Events",
        href: "#",
      },
      {
        type: "LINK",
        name: "Press Releases",
        href: "#",
      },
      {
        type: "LINK",
        name: "Partners",
        href: "#",
      },
      {
        type: "LINK",
        name: "Investor Relations",
        href: "#",
      },
      {
        type: "DROPDOWN",
        name: "Legal",
        links: [
          {
            name: "Cookie Preferences",
            href: "#",
          },
          {
            name: "Terms of Use",
            href: "#",
          },
          {
            name: "GDPR Compliance",
            href: "#",
          },
          {
            name: "Data Protection",
            href: "#",
          },
          {
            name: "Accessibility Statement",
            href: "#",
          },
        ],
      },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    icon: Github,
    name: "Github",
    href: "#",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    href: "#",
  },
  {
    icon: Facebook,
    name: "Facebook",
    href: "#",
  },
  {
    icon: Twitter,
    name: "Twitter",
    href: "#",
  },
];

const HOME_LINK = "#";

const getLink = ({ type, href, name, links }: NavigationLink) => {
  if (type == "EXTERNAL_LINK") {
    return (
      <a
        href={href}
        className="inline-flex cursor-pointer items-center gap-0.5 text-sm leading-5 text-muted-foreground hover:text-foreground"
      >
        <div>{name}</div>
        <ExternalLink className="size-3.5" />
      </a>
    );
  }

  if (type == "DROPDOWN") {
    return (
      <>
        <div className="block md:hidden">
          <Drawer>
            <DrawerTrigger className="inline-flex cursor-pointer items-center gap-0.5 text-sm leading-5 text-muted-foreground hover:text-foreground">
              {name}
              <ChevronDown className="size-3.5" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{name}</DrawerTitle>
                <div>
                  {links?.map((link) => (
                    <a
                      href={link.href}
                      className="block cursor-pointer rounded-lg px-2 py-2.5 text-sm! hover:bg-muted"
                      key={`drawer-footer-1-${link.name}`}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex cursor-pointer items-center gap-0.5 text-sm leading-5 text-muted-foreground hover:text-foreground">
                {name}
                <ChevronDown className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {links?.map((link) => (
                <DropdownMenuItem
                  className="cursor-pointer rounded-lg py-2.5 text-sm!"
                  asChild
                  key={`dropdown-footer-1-${link.name}`}
                >
                  <a href={link.href}>{link.name}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    );
  }

  return (
    <a
      href={href}
      className="cursor-pointer text-sm leading-5 text-muted-foreground hover:text-foreground"
    >
      {name}
    </a>
  );
};

interface Footer17Props {
  className?: string;
}

const Footer17 = ({ className }: Footer17Props) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const onThemeChange = (value: "light" | "dark" | "system") => {
    if (value == "system") {
      if (window.matchMedia) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }
    } else {
      setTheme(value);
    }
  };

  return (
    <section className={cn(`py-32 ${theme} bg-background`, className)}>
      <footer className="container">
        <div className="flex w-full flex-col gap-8">
          <div className="grid w-full grid-cols-[repeat(2,minmax(auto,15rem))] gap-8 md:grid-cols-[repeat(4,1fr)_5rem] md:gap-0">
            {NAVIGATION.map((section) => (
              <div key={`${section.title}`}>
                <h2 className="mb-3 text-sm font-medium text-foreground">
                  {section.title}
                </h2>
                <ul>
                  {section.links.map((link, i) => (
                    <li key={`${link.name}-${i}`} className="py-1.5">
                      {getLink({
                        name: link.name,
                        href: link.href,
                        type: link?.type,
                        links: link?.links,
                      })}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="mb-3 text-sm font-medium text-foreground">
                Social
              </h2>
              <ul>
                {SOCIAL_LINKS.map((link, i) => (
                  <li className="py-1.5" key={`social-links-footer-${i}`}>
                    <a
                      href={link.href}
                      className="inline-flex cursor-pointer items-center gap-2 text-sm leading-5 text-muted-foreground hover:text-foreground"
                    >
                      <link.icon className="size-3.5" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={HOME_LINK}
              className="col-[1/3] row-1 block size-9 md:col-[5/6] md:justify-self-end"
            >
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt=""
                className="size-full object-cover object-center"
                style={
                  theme === "dark" ? { filter: "invert(100%)" } : undefined
                }
              />
            </a>
          </div>
          <div className="mt-8 flex w-full flex-wrap items-center justify-between gap-4">
            <div>
              <Button asChild variant="ghost" className="text-foreground">
                <a href="#">
                  <div className="relative size-[0.4375rem]">
                    <span className="absolute top-1/2 left-1/2 z-10 size-[0.6875rem] -translate-1/2 animate-pulse rounded-full bg-green-400/50" />
                    <span className="absolute top-1/2 left-1/2 z-20 size-full -translate-1/2 rounded-full bg-green-500" />
                  </div>
                  All systems normal
                </a>
              </Button>
            </div>
            <div>
              <ToggleGroup
                value={theme}
                onValueChange={onThemeChange}
                type="single"
                className="rounded-full border"
              >
                <ToggleGroupItem
                  value="system"
                  aria-label="Toggle system"
                  className="size-6 rounded-full!"
                >
                  <MonitorCog className="size-3 stroke-foreground" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="light"
                  aria-label="Toggle light"
                  className="size-6 rounded-full"
                >
                  <Sun className="size-3 stroke-foreground" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="dark"
                  aria-label="Toggle dark"
                  className="size-6 rounded-full!"
                >
                  <Moon className="size-3 stroke-foreground" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export { Footer17 };

‘’’

‘’’tsx

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  ChevronDown,
  Cookie,
  Facebook,
  Github,
  Languages,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
interface LanguageOption {
  label: string;
  description: string;
  link: string;
}

interface CookiesOption {
  title: string;
  description: string;
  id: string;
}

interface PrivacyDialog {
  trigger: string;
  title: string;
  text: string;
}

interface LanguagesSelectProps {
  languages: Array<LanguageOption>;
}

const HOME_LINK = "https://shadcnblocks.com";
const LOGO = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg";

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "#",
  },
  {
    icon: Linkedin,
    href: "#",
  },
  {
    icon: Facebook,
    href: "#",
  },
  {
    icon: Twitter,
    href: "#",
  },
];

const LANGUAGES: Array<LanguageOption> = [
  {
    label: "English",
    description: "English (US)",
    link: "#",
  },
  {
    label: "Français (France)",
    description: "French",
    link: "#",
  },
  {
    label: "Deutsch",
    description: "German",
    link: "#",
  },
  {
    label: "日本語",
    description: "Japanese",
    link: "#",
  },
  {
    label: "한국어",
    description: "Korean",
    link: "#",
  },
];

const COOKIES_OPTIONS: Array<CookiesOption> = [
  {
    id: "1",
    title: "Essential for functionality",
    description: "Necessary for site functionality. Always enabled.",
  },
  {
    id: "2",
    title: "Functional",
    description: "Stores preferences and enables enhanced features.",
  },
  {
    id: "3",
    title: "Analytics",
    description: "Tracks usage to enhance your experience.",
  },
  {
    id: "4",
    title: "Marketing",
    description: "Enables personalized advertising.",
  },
];

const NAVIGATION = [
  {
    title: "About",
    links: [
      {
        name: "Our Story",
        href: "#",
      },
      {
        name: "Join Us",
        href: "#",
      },
      {
        name: "Security Info",
        href: "#",
      },
      {
        name: "System Status",
        href: "#",
      },
      {
        name: "Legal & Privacy",
        href: "#",
      },
    ],
  },
  {
    title: "Get Started",
    links: [
      {
        name: "Mobile (iOS & Android)",
        href: "#",
      },
      {
        name: "Desktop (Mac & Windows)",
        href: "#",
      },
      {
        name: "Browser Extension",
        href: "#",
      },
    ],
  },
  {
    title: "Learn More",
    links: [
      {
        name: "Support Center",
        href: "#",
      },
      {
        name: "Pricing Plans",
        href: "#",
      },
      {
        name: "Articles",
        href: "#",
      },
      {
        name: "User Groups",
        href: "#",
      },
      {
        name: "App Integrations",
        href: "#",
      },
      {
        name: "Design Resources",
        href: "#",
      },
      {
        name: "Partners Program",
        href: "#",
      },
    ],
  },
  {
    title: "Solutions for",
    links: [
      {
        name: "Large Enterprises",
        href: "#",
      },
      {
        name: "Small Businesses",
        href: "#",
      },
      {
        name: "Individual Users",
        href: "#",
      },
    ],
  },
];

const PRIVACY_DIALOG: PrivacyDialog = {
  trigger: "Do Not Sell or Share My Info",
  title:
    "You've chosen to opt out of sharing your information with our online advertising partners.",
  text: `
    Our app enables partners to use cookies and pixels to
    collect data, helping deliver more relevant ads and
    track ad performance. These practices may be classified
    as "selling" or "sharing/processing" for targeted
    advertising under applicable laws. Even if you opt out,
    you may still see ads about our app, but they won’t be
    as personalized.
  `,
};

const FormSchema = z.object({
  cookies: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "",
  }),
});

interface CookiesPanelProps {
  cookiesOptions: Array<CookiesOption>;
}
const CookiesPanel = ({ cookiesOptions }: CookiesPanelProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cookies: ["1"],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.cookies);
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Cookie className="size-4" />
          Cookie settings
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container overflow-auto pb-4"
          >
            <DrawerHeader>
              <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <DrawerTitle className="text-sm leading-normal font-normal">
                  We use cookies to enhance your experience. Check our{" "}
                  <Button
                    variant="link"
                    className="px-0 text-sm leading-normal font-normal underline"
                  >
                    Cookie Notice
                  </Button>{" "}
                  for more details.
                </DrawerTitle>
                <DrawerClose asChild className="w-full md:w-fit">
                  <Button type="submit">Done</Button>
                </DrawerClose>
              </div>
            </DrawerHeader>
            <FormField
              control={form.control}
              name="cookies"
              render={() => (
                <FormItem className="grid gap-5 pt-4 lg:grid-cols-4">
                  {cookiesOptions.map((opt) => (
                    <FormField
                      key={opt.id}
                      control={form.control}
                      name="cookies"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={opt.id}
                            className="flex w-full items-start justify-between rounded-xl border bg-background p-3"
                          >
                            <FormLabel className="flex w-full flex-col gap-1">
                              <p className="text-sm leading-normal font-medium text-foreground">
                                {opt.title}
                              </p>
                              <p className="text-sm leading-normal text-muted-foreground">
                                {opt.description}
                              </p>
                            </FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value?.includes(opt.id)}
                                disabled={opt.id == "1"}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, opt.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== opt.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

const LanguagesSelect = ({ languages }: LanguagesSelectProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Languages />
          English
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {languages.map((lang, i) => (
          <DropdownMenuItem asChild key={`footer-lang-${i}`}>
            <a
              href={lang.link}
              className="flex cursor-pointer flex-col items-start rounded-md px-4 py-2"
            >
              <div className="text-base leading-normal text-foreground">
                {lang.label}
              </div>
              <div className="text-sm leading-normal text-muted-foreground">
                {lang.description}
              </div>
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const PrivacyDialog = ({ trigger, title, text }: PrivacyDialog) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{trigger}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[26.5625rem]">
        <DialogHeader>
          <DialogTitle className="leading-normal">{title}</DialogTitle>
          <DialogDescription className="leading-normal">
            {text}
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button variant="outline">Okay</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

interface Footer18Props {
  className?: string;
}

const Footer18 = ({ className }: Footer18Props) => {
  return (
    <section className={cn("py-20", className)}>
      <footer className="container">
        <nav className="flex flex-col gap-[2.25rem] lg:flex-row">
          <div className="flex w-full flex-col gap-9 lg:w-1/4">
            {/* Logo */}
            <a href={HOME_LINK}>
              <img
                src={LOGO}
                alt="Shadcnblocks"
                title="Shadcnblocks"
                className="h-11"
              />
            </a>
            <div className="flex w-full flex-col gap-6">
              <ul className="flex w-full items-center gap-0.5">
                {SOCIAL_LINKS.map((link, i) => (
                  <li key={`social-link-${i}`}>
                    <Button size="icon" className="size-8" variant="ghost">
                      <link.icon className="size-4.5" />
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col items-start gap-2">
                <CookiesPanel cookiesOptions={COOKIES_OPTIONS} />
                <LanguagesSelect languages={LANGUAGES} />
                <PrivacyDialog {...PRIVACY_DIALOG} />
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-4">
            {NAVIGATION.map((section) => (
              <ul
                key={`${section.title}`}
                className="flex flex-col items-start gap-[.4rem]"
              >
                <li>
                  <p className="text-[0.9375rem] leading-normal font-semibold text-foreground">
                    {section.title}
                  </p>
                </li>
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.name}`}>
                    <a
                      href={link.href}
                      className="text-[0.9375rem] leading-normal text-muted-foreground hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </nav>
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm leading-normal font-medium text-foreground">
              © 2025 shadcnblocks.com
            </p>
          </div>
          <Button variant="link" className="px-0!">
            Explore more
            <ArrowRight />
          </Button>
        </div>
      </footer>
    </section>
  );
};

export { Footer18 };

‘’’

‘’’tsx

import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

const footerData = {
  heading: "Shadcnblocks",
  email: {
    label: "example@shadcnblocks.com",
    href: "#",
  },
  phone: {
    label: "(123) 456 789",
    href: "tel:+1234567890",
  },
  socialLinks: [
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "Facebook", href: "#" },
  ],
  navLinks: [
    { label: "Home", href: "#" },
    { label: "Photos", href: "#" },
    { label: "Videos", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};

interface Footer24Props {
  className?: string;
}

const Footer24 = ({ className }: Footer24Props) => {
  return (
    <section className={cn("py-16 md:py-32", className)}>
      <div className="container px-4 md:px-6">
        <div className="rounded-lg bg-muted p-8 md:p-16">
          <div className="mb-6 border-b border-border pb-6 text-left md:mb-8 md:pb-8 md:text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl">
              {footerData.heading}
            </h1>
          </div>

          <div className="mb-12 flex flex-col gap-8 md:mb-16 lg:flex-row lg:justify-between lg:gap-4 xl:gap-8">
            {/* Email Section */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-sm font-medium tracking-wide text-primary uppercase">
                Email
              </h3>
              <a
                href={footerData.email.href}
                className="flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-primary md:text-lg"
              >
                {footerData.email.label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Social Links Section */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-sm font-medium tracking-wide text-primary uppercase">
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {footerData.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base text-muted-foreground transition-colors hover:text-primary md:text-lg"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Phone Section */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-sm font-medium tracking-wide text-primary uppercase">
                Phone
              </h3>
              <a
                href={footerData.phone.href}
                className="flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-primary md:text-lg"
              >
                {footerData.phone.label}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between md:py-4">
          <nav className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {footerData.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="text-sm text-muted-foreground md:text-right md:text-xs">
            Designed in <strong>San Francisco</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Footer24 };

‘’’

‘’’tsx

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const data = {
  logo: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "blocks for shadcn/ui",
    title: "Shadcnblocks.com",
    url: "https://www.shadcnblocks.com",
  },
  tagline: "Let's Connect",
  personalMessage:
    "I'm passionate about creating beautiful, functional components that make your projects shine. Let's work together to bring your vision to life.",
  ctaText: "Schedule a call",
  contact: {
    phone: "+1 (555) 123-4567",
    email: "hello@artiststudio.com",
    location: "NYC",
    timezone: "EST",
  },
  menuItems: [
    {
      title: "Portfolio",
      links: [
        { text: "Overview", url: "#" },
        { text: "Projects", url: "#" },
        { text: "Pricing", url: "#" },
        { text: "About", url: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
  ],
  copyright: "© 2025 Shadcnblocks.com. All rights reserved.",
  bottomLinks: [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
};

interface Footer25Props {
  className?: string;
}

const Footer25 = ({ className }: Footer25Props) => {
  return (
    <section
      className={cn("bg-cover bg-center bg-no-repeat py-32", className)}
      style={{
        backgroundImage:
          "url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/daniel-leone-g30P1zcOzXo-unsplash.jpg')",
      }}
    >
      <div className="container">
        <div className="mx-auto max-w-7xl rounded-lg bg-background p-8 shadow-lg md:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            <div className="lg:col-span-1">
              <div className="mb-4 flex items-center gap-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/cool-dude.jpg"
                  alt="Artist profile"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <h3 className="text-2xl font-medium">Let's Chat</h3>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {data.personalMessage}
              </p>
              <Button>{data.ctaText}</Button>
            </div>
            {data.menuItems.map((menu, idx) => (
              <div key={idx}>
                <h3 className="mb-4 text-sm font-medium tracking-wider text-primary uppercase">
                  {menu.title}
                </h3>
                <ul className="space-y-3">
                  {menu.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        className="border-b border-transparent text-muted-foreground transition-all duration-300 ease-in-out hover:border-primary hover:text-primary"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="mb-4 text-sm font-medium tracking-wider text-primary uppercase">
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="text-muted-foreground">{data.contact.phone}</li>
                <li className="text-muted-foreground">{data.contact.email}</li>
                <li className="text-muted-foreground">
                  {data.contact.location} • {data.contact.timezone}
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">{data.copyright}</p>
            <div className="flex gap-4">
              {data.bottomLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Footer25 };

‘’’

‘’’tsx

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Footer27Props {
  className?: string;
}

const Footer27 = ({ className }: Footer27Props) => {
  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "X (Twitter)", href: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <footer>
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col justify-between md:flex-row md:items-center"
            >
              <div className="space-y-8">
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-4xl leading-tight font-bold text-foreground lg:text-5xl">
                    Connect with Me
                  </h2>
                  <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                    No commitments. Just a quick chat to see if we click.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button size="lg">Get in Touch</Button>
                </motion.div>
              </div>

              <div className="mt-5 space-y-8 md:mt-0">
                <motion.div variants={itemVariants}>
                  <div className="space-y-6">
                    {socialLinks.map((link) => (
                      <motion.div
                        key={link.name}
                        variants={itemVariants}
                        whileHover={{ x: 4 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <a
                          href={link.href}
                          className="group flex items-center gap-2 py-2 text-foreground transition-colors hover:text-foreground/80"
                        >
                          <span className="text-xl font-medium">
                            {link.name}
                          </span>
                          <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16"
            >
              <motion.div variants={itemVariants}>
                <Separator className="mb-8" />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
              >
                <p className="text-sm text-muted-foreground">
                  © Copyright 2025. All rights Reserved.
                </p>

                <div className="flex items-center gap-6 text-sm">
                  <span className="text-muted-foreground">
                    Made by{" "}
                    <motion.a
                      href="https://x.com/shadcnblocks"
                      className="underline underline-offset-4 transition-colors hover:text-foreground"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      shadcnblocks
                    </motion.a>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer27 };

‘’’

‘’’tsx

"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NAVIGATION = [
  { label: "Home", href: "#" },
  { label: "Collection", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Login", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "Linkedin", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
];

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

interface Footer31Props {
  className?: string;
}

const Footer31 = ({ className }: Footer31Props) => {
  return (
    <section
      className={cn("dark bg-background py-32 text-foreground", className)}
    >
      <div className="container">
        <div className="flex flex-col justify-between gap-15 lg:flex-row">
          <div className="flex flex-col gap-10">
            <p className="relative text-4xl font-medium tracking-tight lg:text-5xl">
              Unlock 800+ blocks now
            </p>
            <div className="space-y-1 text-sm font-light tracking-tight lg:text-base">
              <p>Get Support : </p>
              <a href="#">hi@shadcnblocks.com</a>
            </div>
          </div>
          <div className="grid w-full max-w-xs grid-cols-2 gap-10 text-sm font-light lg:text-base">
            <ul className="space-y-1">
              {NAVIGATION.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="tracking-tight text-foreground hover:text-foreground/30"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-1">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-1 tracking-tight text-foreground hover:text-foreground/30"
                  >
                    {item.label}{" "}
                    <ArrowUpRight className="size-3.5 text-foreground group-hover:text-muted-foreground/50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-20 flex flex-col justify-between gap-15 lg:flex-row">
          <div className="flex w-full max-w-md flex-col gap-10">
            <div className="space-y-1 text-sm font-light tracking-tight lg:text-base">
              <p>Sign up for newsletter : </p>
              <form className="flex w-full items-end border-b border-b-foreground/10">
                <Input
                  type="text"
                  placeholder="Name*"
                  className="mt-10 rounded-none border-0 !bg-transparent p-0 uppercase shadow-none placeholder:text-foreground/20 focus-visible:ring-0 lg:text-base"
                />
                <Button type="submit" variant="ghost">
                  <ArrowRight />
                </Button>
              </form>
            </div>
          </div>
          <div className="grid w-full max-w-xs grid-cols-2 gap-10 text-sm font-light lg:text-base">
            <div className="w-32">Punjab, 141421 India, Asia</div>
            <ul className="space-y-1">
              {FOOTER_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-1 tracking-tight text-foreground hover:text-foreground/30"
                  >
                    {item.label}{" "}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-20 w-full lg:mt-32">
          <LogoSvg />
        </div>
      </div>
    </section>
  );
};

export { Footer31 };

const LogoSvg = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const pathVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <motion.svg
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      width="1339"
      height="370"
      viewBox="0 0 1339 370"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <motion.path
        variants={pathVariants}
        d="M1333.13 163.608L1274.65 169.988C1272.99 164.08 1270.1 158.527 1265.96 153.329C1261.94 148.13 1256.51 143.936 1249.66 140.745C1242.8 137.555 1234.42 135.96 1224.49 135.96C1211.14 135.96 1199.92 138.855 1190.82 144.644C1181.84 150.434 1177.41 157.937 1177.53 167.152C1177.41 175.068 1180.3 181.508 1186.21 186.47C1192.24 191.432 1202.16 195.509 1215.98 198.699L1262.42 208.624C1288.17 214.177 1307.32 222.979 1319.84 235.03C1332.48 247.082 1338.86 262.855 1338.98 282.35C1338.86 299.482 1333.84 314.606 1323.92 327.72C1314.11 340.717 1300.46 350.878 1282.98 358.204C1265.49 365.529 1245.4 369.192 1222.72 369.192C1189.4 369.192 1162.58 362.221 1142.26 348.279C1121.94 334.219 1109.82 314.665 1105.93 289.617L1168.49 283.591C1171.32 295.879 1177.35 305.153 1186.56 311.415C1195.78 317.678 1207.77 320.809 1222.54 320.809C1237.78 320.809 1250.01 317.678 1259.23 311.415C1268.56 305.153 1273.23 297.415 1273.23 288.199C1273.23 280.401 1270.22 273.961 1264.19 268.881C1258.28 263.8 1249.07 259.901 1236.54 257.184L1190.11 247.436C1164 242.001 1144.68 232.845 1132.16 219.966C1119.63 206.969 1113.43 190.546 1113.55 170.697C1113.43 153.919 1117.98 139.387 1127.19 127.099C1136.53 114.693 1149.46 105.123 1166.01 98.3881C1182.67 91.5353 1201.86 88.1089 1223.6 88.1089C1255.51 88.1089 1280.61 94.9026 1298.93 108.49C1317.36 122.077 1328.76 140.45 1333.13 163.608Z"
        fill="currentColor"
      />
      <motion.path
        variants={pathVariants}
        d="M932.249 278.451L932.072 201.003H942.351L1040.18 91.6535H1115.15L994.81 225.637H981.518L932.249 278.451ZM873.764 363.875V0.913086H937.92V363.875H873.764ZM1044.61 363.875L955.997 239.993L999.241 194.8L1121.35 363.875H1044.61Z"
        fill="currentColor"
      />
      <motion.path
        variants={pathVariants}
        d="M744.393 369.192C717.218 369.192 693.883 363.225 674.388 351.292C655.011 339.358 640.065 322.876 629.549 301.845C619.152 280.696 613.953 256.357 613.953 228.827C613.953 201.18 619.27 176.782 629.904 155.633C640.537 134.365 655.543 117.824 674.919 106.009C694.414 94.0755 717.454 88.1089 744.038 88.1089C766.132 88.1089 785.687 92.1851 802.7 100.338C819.832 108.372 833.479 119.774 843.64 134.542C853.801 149.193 859.59 166.325 861.008 185.938H799.688C797.206 172.824 791.299 161.895 781.965 153.151C772.749 144.29 760.402 139.859 744.924 139.859C731.809 139.859 720.29 143.404 710.365 150.493C700.44 157.464 692.701 167.507 687.148 180.622C681.713 193.736 678.996 209.451 678.996 227.764C678.996 246.314 681.713 262.264 687.148 275.616C692.583 288.849 700.204 299.069 710.01 306.276C719.935 313.365 731.573 316.91 744.924 316.91C754.376 316.91 762.824 315.137 770.268 311.593C777.829 307.93 784.151 302.672 789.231 295.819C794.312 288.967 797.797 280.637 799.688 270.83H861.008C859.472 290.089 853.801 307.162 843.994 322.049C834.188 336.818 820.837 348.397 803.941 356.786C787.045 365.056 767.196 369.192 744.393 369.192Z"
        fill="currentColor"
      />
      <motion.path
        variants={pathVariants}
        d="M480.684 369.192C454.099 369.192 431.06 363.343 411.565 351.646C392.07 339.949 376.946 323.585 366.195 302.554C355.561 281.523 350.244 256.948 350.244 228.827C350.244 200.707 355.561 176.073 366.195 154.924C376.946 133.774 392.07 117.351 411.565 105.654C431.06 93.9574 454.099 88.1089 480.684 88.1089C507.268 88.1089 530.307 93.9574 549.802 105.654C569.297 117.351 584.362 133.774 594.995 154.924C605.747 176.073 611.123 200.707 611.123 228.827C611.123 256.948 605.747 281.523 594.995 302.554C584.362 323.585 569.297 339.949 549.802 351.646C530.307 363.343 507.268 369.192 480.684 369.192ZM481.038 317.796C495.452 317.796 507.504 313.838 517.192 305.921C526.881 297.887 534.088 287.135 538.814 273.666C543.658 260.197 546.08 245.191 546.08 228.65C546.08 211.991 543.658 196.927 538.814 183.457C534.088 169.87 526.881 159.059 517.192 151.025C507.504 142.99 495.452 138.973 481.038 138.973C466.269 138.973 453.981 142.99 444.175 151.025C434.486 159.059 427.22 169.87 422.376 183.457C417.65 196.927 415.287 211.991 415.287 228.65C415.287 245.191 417.65 260.197 422.376 273.666C427.22 287.135 434.486 297.887 444.175 305.921C453.981 313.838 466.269 317.796 481.038 317.796Z"
        fill="currentColor"
      />
      <motion.path
        variants={pathVariants}
        d="M335.895 0.913086V363.875H271.738V0.913086H335.895Z"
        fill="currentColor"
      />
      <motion.path
        variants={pathVariants}
        d="M0.142578 363.875V0.913086H64.2989V136.669H66.9573C70.2656 130.053 74.9326 123.023 80.9583 115.579C86.984 108.018 95.1365 101.578 105.416 96.2615C115.695 90.8265 128.81 88.109 144.76 88.109C165.791 88.109 184.755 93.4849 201.65 104.237C218.664 114.87 232.133 130.644 242.058 151.556C252.101 172.351 257.122 197.872 257.122 228.119C257.122 258.011 252.219 283.414 242.413 304.326C232.606 325.239 219.255 341.19 202.359 352.178C185.463 363.166 166.323 368.66 144.937 368.66C129.341 368.66 116.404 366.061 106.125 360.862C95.8454 355.663 87.5748 349.401 81.3128 342.076C75.1689 334.632 70.3837 327.602 66.9573 320.986H63.2356V363.875H0.142578ZM63.0583 227.764C63.0583 245.369 65.5395 260.788 70.5019 274.021C75.5824 287.254 82.8487 297.592 92.3009 305.035C101.871 312.361 113.45 316.023 127.037 316.023C141.216 316.023 153.09 312.243 162.66 304.681C172.23 297.001 179.438 286.545 184.282 273.312C189.244 259.961 191.725 244.778 191.725 227.764C191.725 210.869 189.303 195.863 184.459 182.748C179.615 169.634 172.408 159.354 162.837 151.911C153.267 144.467 141.334 140.746 127.037 140.746C113.332 140.746 101.694 144.349 92.1236 151.556C82.5533 158.764 75.287 168.866 70.3247 181.862C65.4804 194.859 63.0583 210.16 63.0583 227.764Z"
        fill="currentColor"
      />
    </motion.svg>
  );
};

‘’’

‘’’tsx

import { ArrowUpRight, Facebook, Instagram, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

import { RainbowButton } from "@/components/magicui/rainbow-button";

interface Footer32Props {
  preHeading: string;
  heading1: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  email: string;
  socialLinks: {
    link1: {
      url: string;
      label: string;
    };
    link2: {
      url: string;
      label: string;
    };
    link3: {
      url: string;
      label: string;
    };
  };
  className?: string;
}

const Footer32 = ({
  preHeading = "Let's connect",
  heading1 = "You want to scale faster? Try Shadcnblocks today.",
  description = "Join thousands of companies already using our platform to scale their operations",
  buttonText = "Get Started Now",
  buttonUrl = "#",
  email = "hello@company.com",
  socialLinks = {
    link1: {
      url: "#",
      label: "Twitter",
    },
    link2: {
      url: "#",
      label: "Instagram",
    },
    link3: {
      url: "#",
      label: "Facebook",
    },
  },
  className,
}: Footer32Props) => {
  return (
    <section className={cn("relative py-32", className)}>
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
          {/* Pre-heading with decorative lines */}
          <div className="flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-[linear-gradient(270deg,var(--primary,rgb(255,255,255))_0%,var(--secondary,rgb(0,0,0))_100%)] opacity-50" />
            <p className="text-sm text-muted-foreground italic md:text-base">
              {preHeading}
            </p>
            <div className="h-px flex-1 bg-[linear-gradient(270deg,var(--secondary,rgb(0,0,0))_0%,var(--primary,rgb(255,255,255))_100%)] opacity-50" />
          </div>

          {/* Main heading */}
          <h2 className="md:text-65xl py-6 text-6xl">{heading1}</h2>

          {/* Description */}
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            {description}
          </p>

          <RainbowButton asChild variant="outline">
            <a
              href={buttonUrl}
              className="group relative mt-4 block rounded-lg border bg-white px-8 py-6 text-base transition-all"
            >
              <span className="text-secondary-foreground">{buttonText}</span>
              <ArrowUpRight className="h-4 w-4 text-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </RainbowButton>

          {/* Social Media Links */}
          <div className="flex items-center gap-6 pt-8">
            <a
              href={socialLinks.link1.url}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={socialLinks.link1.label}
            >
              <Twitter className="h-5 w-5" />
            </a>
            <div className="h-4 w-px bg-border" />
            <a
              href={socialLinks.link2.url}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={socialLinks.link2.label}
            >
              <Instagram className="h-5 w-5" />
            </a>
            <div className="h-4 w-px bg-border" />
            <a
              href={socialLinks.link3.url}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={socialLinks.link3.label}
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>

          {/* Support Email */}
          <p className="pt-2 text-sm text-muted-foreground md:text-base">
            <a
              href={`mailto:${email}`}
              className="transition-colors hover:text-foreground"
            >
              {email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export { Footer32 };

‘’’


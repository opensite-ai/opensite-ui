```tsx
import { Book, Download, Share2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Resource1Props {
  className?: string;
}

const Resource1 = ({ className }: Resource1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="order-last md:order-0 md:col-span-4 lg:col-span-3">
          <aside className="flex flex-col gap-2">
            <div className="mb-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="border-b border-border bg-muted/50 px-5 py-4">
                <h3 className="flex items-center text-sm font-semibold">
                  <Book className="mr-2.5 size-3.5 text-muted-foreground" />
                  Whitepaper
                </h3>
              </div>
              <div className="p-5">
                <div className="gap-4 text-lg leading-snug font-semibold text-foreground">
                  <p>The Complete Guide to Launching Your Startup</p>
                </div>
              </div>
            </div>

            <div className="mb-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="border-b border-border bg-muted/50 px-5 py-4">
                <h3 className="flex items-center text-sm font-semibold">
                  <Download className="mr-2.5 size-3.5 text-muted-foreground" />
                  Download Options
                </h3>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Enjoy this guide? Download it for offline reading or
                    sharing.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Button
                      className="w-full justify-between"
                      variant="default"
                    >
                      PDF Format
                      <Download className="ml-2 size-4" />
                    </Button>
                    <Button
                      className="w-full justify-between"
                      variant="outline"
                    >
                      Print Version
                      <Download className="ml-2 size-4" />
                    </Button>
                  </div>
                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Read time: 5 minutes
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="border-b border-border bg-muted/50 px-5 py-4">
                <h3 className="flex items-center text-sm font-semibold">
                  <Share2 className="mr-2.5 size-3.5 text-muted-foreground" />
                  Share this guide
                </h3>
              </div>
              <div className="p-5">
                <ul className="flex items-center gap-2">
                  <li>
                    <a
                      href="#"
                      className="flex size-10 items-center justify-center rounded-full border border-border bg-muted/50 transition-colors hover:bg-muted"
                      aria-label="Share on Instagram"
                    >
                      <img
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/instagram-icon.svg"
                        alt="Instagram"
                        className="size-5"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex size-10 items-center justify-center rounded-full border border-border bg-muted/50 transition-colors hover:bg-muted"
                      aria-label="Share on LinkedIn"
                    >
                      <img
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/linkedin-icon.svg"
                        alt="LinkedIn"
                        className="size-5"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex size-10 items-center justify-center rounded-full border border-border bg-muted/50 transition-colors hover:bg-muted"
                      aria-label="Share on Product Hunt"
                    >
                      <img
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/producthunt-icon.svg"
                        alt="Product Hunt"
                        className="size-5"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex size-10 items-center justify-center rounded-full border border-border bg-muted/50 transition-colors hover:bg-muted"
                      aria-label="Share on Twitter"
                    >
                      <img
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/twitter-icon.svg"
                        alt="Twitter"
                        className="size-5"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
        <div className="md:col-span-7 md:col-start-5 lg:col-start-6">
          <article className="prose prose-sm dark:prose-invert">
            <h1>White Paper: The Complete Guide to Launching Your Startup</h1>
            <p>
              Once upon a time, in a far-off land, there was a very lazy king
              who spent all day lounging on his throne. One day, his advisors
              came to him with a problem: the kingdom was running out of money.
            </p>
            <h2>The King&apos;s Plan</h2>
            <p>
              The king thought long and hard, and finally came up with{" "}
              <a href="#">a brilliant plan</a>: he would tax the jokes in the
              kingdom.
            </p>
            <blockquote>
              &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good
              joke, so it&apos;s only fair that they should pay for the
              privilege.&rdquo;
            </blockquote>
            <h3>The Joke Tax</h3>
            <p>
              The king&apos;s subjects were not amused. They grumbled and
              complained, but the king was firm:
            </p>
            <ul>
              <li>1st level of puns: 5 gold coins</li>
              <li>2nd level of jokes: 10 gold coins</li>
              <li>3rd level of one-liners : 20 gold coins</li>
            </ul>
            <p>
              As a result, people stopped telling jokes, and the kingdom fell
              into a gloom. But there was one person who refused to let the
              king&apos;s foolishness get him down: a court jester named
              Jokester.
            </p>
            <h3>Jokester&apos;s Revolt</h3>
            <p>
              Jokester began sneaking into the castle in the middle of the night
              and leaving jokes all over the place: under the king&apos;s
              pillow, in his soup, even in the royal toilet. The king was
              furious, but he couldn&apos;t seem to stop Jokester.
            </p>
            <p>
              And then, one day, the people of the kingdom discovered that the
              jokes left by Jokester were so funny that they couldn&apos;t help
              but laugh. And once they started laughing, they couldn&apos;t
              stop.
            </p>
            <h3>The People&apos;s Rebellion</h3>
            <p>
              The people of the kingdom, feeling uplifted by the laughter,
              started to tell jokes and puns again, and soon the entire kingdom
              was in on the joke.
            </p>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>King&apos;s Treasury</th>
                    <th>People&apos;s happiness</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Empty</td>
                    <td>Overflowing</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td>Modest</td>
                    <td>Satisfied</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td>Full</td>
                    <td>Ecstatic</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The king, seeing how much happier his subjects were, realized the
              error of his ways and repealed the joke tax. Jokester was declared
              a hero, and the kingdom lived happily ever after.
            </p>
            <p>
              The moral of the story is: never underestimate the power of a good
              laugh and always be careful of bad ideas.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export { Resource1 };

```

```tsx
import { ArrowLeft, Facebook, Link, Linkedin, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Resource2Props {
  navigation: {
    backText: string;
    backHref: string;
    className?: string;
  };
  blog: {
    title: string;
    author: string;
    role: string;
    date: string;
    readTime: string;
    imageSrc: string;
    content: React.ReactNode; // HTML content for rich text
  };
  social: {
    heading: string;
    links: Array<{
      icon: "link" | "linkedin" | "twitter" | "facebook";
      href: string;
      label: string;
    }>;
  };
  illustration: {
    imageSrc: string;
    imageAlt: string;
  };
  className?: string;
}

const Resource2 = ({
  className,
  navigation = {
    backText: "All Articles",
    backHref: "/resources",
  },
  blog = {
    title:
      "Building Sustainable Web Applications: A Developer's Guide to Green Coding",
    author: "Sarah Chen",
    date: "December 15, 2024",
    readTime: "8 min read",
    role: "Senior Developer",
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    content: (
      <>
        <p>
          The digital world consumes more energy than the entire aviation
          industry. As developers, we have a responsibility to build
          applications that are not only functional and beautiful, but also
          sustainable for our planet.
        </p>

        <h2>The Carbon Footprint of Code</h2>
        <p>
          Every line of code we write has an environmental impact. From the
          energy consumed by servers to the resources used in manufacturing
          devices, our digital choices matter more than we think.
        </p>

        <h3>Understanding the Impact</h3>
        <p>
          Modern web applications are incredibly resource-intensive. Consider
          these staggering facts:
        </p>
        <ul>
          <li>
            <strong>Data centers</strong> consume 1% of global electricity
          </li>
          <li>
            <strong>Video streaming</strong> accounts for 3% of global carbon
            emissions
          </li>
          <li>
            <strong>Email spam</strong> generates 17 million tons of CO2
            annually
          </li>
        </ul>

        <blockquote>
          <p>
            "The most sustainable code is the code you don't write. The second
            most sustainable is the code that runs efficiently."
          </p>
        </blockquote>

        <h2>Green Coding Principles</h2>
        <p>
          Here are the fundamental principles every developer should follow:
        </p>
        <ol>
          <li>
            <strong>Optimize for performance:</strong> Faster code uses less
            energy
          </li>
          <li>
            <strong>Minimize dependencies:</strong> Every package adds to the
            bundle size
          </li>
          <li>
            <strong>Use efficient algorithms:</strong> Better complexity means
            less computation
          </li>
          <li>
            <strong>Implement caching strategies:</strong> Reduce redundant
            operations
          </li>
          <li>
            <strong>Choose green hosting:</strong> Renewable energy-powered
            servers
          </li>
        </ol>

        <h3>Practical Implementation</h3>
        <p>
          Let's look at some concrete examples of how to implement these
          principles:
        </p>

        <h4>1. Image Optimization</h4>
        <p>
          Images often account for 60-80% of a webpage's size. Use modern
          formats like WebP or AVIF, implement lazy loading, and serve
          appropriately sized images.
        </p>

        <h4>2. Code Splitting</h4>
        <p>
          Load only the JavaScript that users actually need. This reduces
          initial bundle size and improves performance.
        </p>

        <h4>3. Database Optimization</h4>
        <p>
          Write efficient queries, use proper indexing, and implement connection
          pooling to reduce database load.
        </p>

        <h2>The Future of Sustainable Development</h2>
        <p>
          As we move forward, sustainability must become a core consideration in
          every development decision. Tools like <strong>WebPageTest</strong>{" "}
          and <strong>Lighthouse</strong> can help measure the environmental
          impact of our applications.
        </p>

        <p>
          The journey to sustainable web development is ongoing, but every small
          optimization contributes to a greener digital future. Start with one
          principle, measure the impact, and gradually incorporate more
          sustainable practices into your development workflow.
        </p>
      </>
    ),
  },
  social = {
    heading: "Share this article",
    links: [
      { icon: "link", href: "#", label: "Copy link" },
      { icon: "linkedin", href: "#", label: "Share on LinkedIn" },
      { icon: "twitter", href: "#", label: "Share on X" },
      { icon: "facebook", href: "#", label: "Share on Facebook" },
    ],
  },
  illustration = {
    imageSrc: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
    imageAlt:
      "Sustainable web development illustration showing green coding practices and environmental impact",
  },
}: Resource2Props) => {
  const getIcon = (icon: string, className: string) => {
    switch (icon) {
      case "link":
        return <Link className={`size-4 ${className}`} />;
      case "linkedin":
        return <Linkedin className={`size-4 ${className}`} />;
      case "twitter":
        return <Twitter className={`size-4 ${className}`} />;
      case "facebook":
        return <Facebook className={`size-4 ${className}`} />;
      default:
        return null;
    }
  };

  return (
    <section className={cn("", className)}>
      <div className="min-h-128 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Left Section - Content */}
            <div className="flex h-full max-w-md flex-col justify-between gap-8">
              {/* Blog Content */}
              <div className="space-y-6">
                {/* Navigation */}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <a
                    href={navigation.backHref}
                    className="group/nav flex items-center gap-2 transition-all duration-200 hover:gap-4"
                  >
                    <ArrowLeft className="size-4 group-hover/nav:text-primary-foreground" />
                    <span className="transition-colors group-hover/nav:text-primary-foreground group-hover/nav:underline">
                      {navigation.backText}
                    </span>
                  </a>
                </div>
                <h1 className="text-3xl leading-tight font-medium">
                  {blog.title}
                </h1>
              </div>
              <div className="flex flex-col gap-8">
                <div className="space-y-2">
                  <p className="text-lg text-muted-foreground">{blog.author}</p>
                  <p className="text-muted-foreground">
                    {blog.date} • {blog.readTime}
                  </p>
                </div>
                {/* Social Sharing */}
                <div className="space-y-4">
                  <h3 className="">{social.heading}</h3>
                  <div className="flex gap-3">
                    {social.links.map((link, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        className="group/btn h-12 w-12 rounded-full border-border/10 bg-muted/20 transition-colors hover:bg-transparent hover:text-muted"
                        asChild
                      >
                        <a
                          href={link.href}
                          aria-label={link.label}
                          className="flex items-center justify-center"
                        >
                          {getIcon(
                            link.icon,
                            "text-muted/30 group-hover/btn:text-primary-foreground transition-colors",
                          )}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Illustration */}
            <div className="col-span-2 h-full w-full">
              <div className="aspect-video min-h-96 w-full">
                <img
                  src={illustration.imageSrc}
                  alt={illustration.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:max-w-2xl xl:max-w-5xl">
        <div className="prose max-w-none pb-16 prose-headings:text-foreground prose-p:text-muted-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-strong:text-foreground prose-em:text-foreground prose-ol:text-muted-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground">
          {blog.content}
        </div>
        <div className="flex flex-col justify-between gap-8 border-t border-border py-8 md:flex-row">
          <div className="flex items-center gap-3">
            <Avatar className="size-12 border xl:size-16">
              <AvatarImage src={blog.imageSrc} />
              <AvatarFallback>{blog.author}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{blog.author}</p>
              <p className="text-sm text-muted-foreground">{blog.role}</p>
            </div>
          </div>
          {/* Social Sharing */}
          <div className="space-y-4">
            <h3 className="">{social.heading}</h3>
            <div className="flex gap-3">
              {social.links.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="group/btn h-12 w-12 rounded-full border-border bg-muted transition-colors hover:bg-transparent hover:text-muted"
                  asChild
                >
                  <a
                    href={link.href}
                    aria-label={link.label}
                    className="flex items-center justify-center"
                  >
                    {getIcon(
                      link.icon,
                      "text-muted-foreground group-hover/btn:text-primary transition-colors",
                    )}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Resource2 };

```

```tsx
import {
  CheckCircle2,
  Facebook,
  Home,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Resource3Props {
  className?: string;
}

const Resource3 = ({ className }: Resource3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mt-7 text-3xl font-semibold md:text-5xl">
          Professional Service Agreement
        </h1>
        <div className="relative mt-12 grid gap-16 md:grid-cols-2">
          <article className="order-2 mx-auto prose md:order-1 dark:prose-invert">
            <div>
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt="placeholder"
                className="mt-0 mb-8 aspect-video w-full rounded-lg object-cover"
              />
            </div>
            <h1>The Joke Tax Chronicles</h1>
            <p>
              Once upon a time, in a far-off land, there was a very lazy king
              who spent all day lounging on his throne. One day, his advisors
              came to him with a problem: the kingdom was running out of money.
            </p>
            <h2>The King&apos;s Plan</h2>
            <p>
              The king thought long and hard, and finally came up with{" "}
              <a href="#">a brilliant plan</a>: he would tax the jokes in the
              kingdom.
            </p>
            <blockquote>
              &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good
              joke, so it&apos;s only fair that they should pay for the
              privilege.&rdquo;
            </blockquote>
            <h3>The Joke Tax</h3>
            <p>
              The king&apos;s subjects were not amused. They grumbled and
              complained, but the king was firm:
            </p>
            <ul>
              <li>1st level of puns: 5 gold coins</li>
              <li>2nd level of jokes: 10 gold coins</li>
              <li>3rd level of one-liners : 20 gold coins</li>
            </ul>
            <p>
              As a result, people stopped telling jokes, and the kingdom fell
              into a gloom. But there was one person who refused to let the
              king&apos;s foolishness get him down: a court jester named
              Jokester.
            </p>
            <h3>Jokester&apos;s Revolt</h3>
            <p>
              Jokester began sneaking into the castle in the middle of the night
              and leaving jokes all over the place: under the king&apos;s
              pillow, in his soup, even in the royal toilet. The king was
              furious, but he couldn&apos;t seem to stop Jokester.
            </p>
            <p>
              And then, one day, the people of the kingdom discovered that the
              jokes left by Jokester were so funny that they couldn&apos;t help
              but laugh. And once they started laughing, they couldn&apos;t
              stop.
            </p>
            <h3>The People&apos;s Rebellion</h3>
            <p>
              The people of the kingdom, feeling uplifted by the laughter,
              started to tell jokes and puns again, and soon the entire kingdom
              was in on the joke.
            </p>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>King&apos;s Treasury</th>
                    <th>People&apos;s happiness</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Empty</td>
                    <td>Overflowing</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td>Modest</td>
                    <td>Satisfied</td>
                  </tr>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    <td>Full</td>
                    <td>Ecstatic</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The king, seeing how much happier his subjects were, realized the
              error of his ways and repealed the joke tax. Jokester was declared
              a hero, and the kingdom lived happily ever after.
            </p>
            <p>
              The moral of the story is: never underestimate the power of a good
              laugh and always be careful of bad ideas.
            </p>
          </article>
          <div className="order-1 h-fit md:sticky md:top-20 md:order-2">
            <p className="mb-2 text-lg font-semibold">
              Excerpt from the document
            </p>
            <p className="text-muted-foreground">
              A comprehensive service agreement template designed for
              professional service providers and their clients. This document
              outlines the scope of work, deliverables, timelines, and terms of
              service to ensure clear expectations and protect both
              parties&apos; interests.
            </p>
            <Button size="lg" className="mt-6">
              Download the document
            </Button>
            <Separator className="my-6" />
            <div className="flex gap-3">
              <Avatar className="size-10 rounded-full border">
                <AvatarImage
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                  alt="placeholder"
                />
              </Avatar>
              <div>
                <h2 className="text-sm font-medium">Reviewed by John Doe</h2>
                <p className="text-sm text-muted-foreground">
                  Legal Consultant
                </p>
              </div>
            </div>
            <Separator className="my-6" />
            <p className="mb-4 text-sm font-medium">Key Features</p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <p>Customizable Terms</p>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <p>Digital Signatures</p>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <p>Document Tracking</p>
              </li>
            </ul>
            <Separator className="my-6" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Share this template</p>
              <ul className="flex gap-2">
                <li>
                  <a
                    href="#"
                    className="inline-flex rounded-full border p-2 transition-colors hover:bg-muted"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex rounded-full border p-2 transition-colors hover:bg-muted"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex rounded-full border p-2 transition-colors hover:bg-muted"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex rounded-full border p-2 transition-colors hover:bg-muted"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Resource3 };

```


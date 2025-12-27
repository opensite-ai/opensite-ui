```tsx
import { format } from "date-fns";
import { Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const defaultPost = {
  title: "Designing websites faster with shadcn/ui",
  authorName: "John Doe",
  image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  pubDate: new Date(),
  description:
    "A step-by-step guide to building a modern, responsive blog using React and Tailwind CSS.",
  authorImage: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
};

interface BlogPostData {
  title: string;
  authorName: string;
  image: string;
  pubDate: Date;
  description: string;
  authorImage: string;
}

interface Blogpost1Props {
  className?: string;
  post?: BlogPostData;
}

const Blogpost1 = ({ post = defaultPost, className }: Blogpost1Props) => {
  const { title, authorName, image, pubDate, description, authorImage } = post;
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <h1 className="max-w-3xl text-5xl font-semibold text-pretty md:text-6xl">
            {title}
          </h1>
          <h3 className="max-w-3xl text-lg text-muted-foreground md:text-xl">
            {description}
          </h3>
          <div className="flex items-center gap-3 text-sm md:text-base">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src={authorImage} />
              <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>
              <a href="#" className="font-semibold">
                {authorName}
              </a>
              <span className="ml-1">on {format(pubDate, "MMMM d, yyyy")}</span>
            </span>
          </div>
          <img
            src={image}
            alt="placeholder"
            className="mt-4 mb-8 aspect-video w-full rounded-lg border object-cover"
          />
        </div>
      </div>
      <div className="container">
        <div className="mx-auto prose max-w-3xl dark:prose-invert">
          <h2 className="text-3xl font-extrabold">The Great Joke Tax</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            In a kingdom far away, where laughter once flowed freely, a peculiar
            tale unfolded about a king who decided to tax the very essence of
            joy itself - jokes and jest.
          </p>

          <h2>How the Tax System Works</h2>
          <p>
            The king, seeing how much happier his subjects were, realized the
            error of his ways and repealed the joke tax. Jokester was declared a
            hero, and the kingdom lived happily ever after.
          </p>
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Royal Decree!</AlertTitle>
            <AlertDescription>
              Remember, all jokes must be registered at the Royal Jest Office
              before telling them
            </AlertDescription>
          </Alert>
          <h2>The People&apos;s Rebellion</h2>
          <p>
            The people of the kingdom, feeling uplifted by the laughter, started
            to tell jokes and puns again, and soon the entire kingdom was in on
            the joke.
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
            error of his ways and repealed the joke tax. Jokester was declared a
            hero, and the kingdom lived happily ever after.
          </p>

          <h2>The King&apos;s Plan</h2>

          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="my-8 aspect-video w-full rounded-md object-cover"
          />
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
            As a result, people stopped telling jokes, and the kingdom fell into
            a gloom. But there was one person who refused to let the king&apos;s
            foolishness get him down: a court jester named Jokester.
          </p>
        </div>
      </div>
    </section>
  );
};

export { Blogpost1 };

```

```tsx
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface Blogpost2Props {
  className?: string;
}

const Blogpost2 = ({ className }: Blogpost2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative flex flex-col justify-between gap-10 lg:flex-row">
          <aside className="top-10 h-fit flex-shrink-0 lg:sticky lg:w-[300px] xl:w-[400px]">
            <a
              className="mb-5 flex items-center gap-1 text-muted-foreground hover:text-primary"
              href="#"
            >
              <ChevronLeft className="h-full w-4" />
              Return to home
            </a>
            <h1 className="mb-5 text-3xl font-bold text-balance lg:text-4xl">
              10 Best Practices for Building a Large Scale Design System
            </h1>
            <div className="flex gap-3">
              <Avatar className="size-7 rounded-full">
                <AvatarImage
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                  alt="placeholder"
                />
              </Avatar>
              <div>
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </aside>

          <article className="">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="mt-0 mb-8 aspect-video w-full rounded-lg object-cover"
            />
            <div className="prose dark:prose-invert">
              <p>
                Once upon a time, in a far-off land, there was a very lazy king
                who spent all day lounging on his throne. One day, his advisors
                came to him with a problem: the kingdom was running out of
                money.
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
                Jokester began sneaking into the castle in the middle of the
                night and leaving jokes all over the place: under the
                king&apos;s pillow, in his soup, even in the royal toilet. The
                king was furious, but he couldn&apos;t seem to stop Jokester.
              </p>
              <p>
                And then, one day, the people of the kingdom discovered that the
                jokes left by Jokester were so funny that they couldn&apos;t
                help but laugh. And once they started laughing, they
                couldn&apos;t stop.
              </p>
              <h3>The People&apos;s Rebellion</h3>
              <p>
                The people of the kingdom, feeling uplifted by the laughter,
                started to tell jokes and puns again, and soon the entire
                kingdom was in on the joke.
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
                The king, seeing how much happier his subjects were, realized
                the error of his ways and repealed the joke tax. Jokester was
                declared a hero, and the kingdom lived happily ever after.
              </p>
              <p>
                The moral of the story is: never underestimate the power of a
                good laugh and always be careful of bad ideas.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export { Blogpost2 };

```

```tsx
"use client";

import { Lightbulb } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Blogpost3Props {
  className?: string;
}

const Blogpost3 = ({ className }: Blogpost3Props) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const sections = Object.keys(sectionRefs.current);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    let observer: IntersectionObserver | null = new IntersectionObserver(
      observerCallback,
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      },
    );

    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        observer?.observe(element);
      }
    });

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, []);

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5">
          <Badge variant="secondary">Product Update</Badge>
          <h1 className="text-center text-3xl font-medium text-pretty lg:text-5xl">
            New Tools to Help You Work Better - Simple Task Flow Tools
          </h1>
          <p className="text-center text-muted-foreground lg:text-lg">
            Discover how our new automation capabilities can transform your
            team&apos;s productivity. Learn about the latest tools and features
            designed to enhance efficiency, reduce manual tasks, and improve
            collaboration across your organization.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Avatar className="size-12 border">
              <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp" />
            </Avatar>
            <div>
              <p className="text-sm font-medium">John doe</p>
              <p className="text-sm text-muted-foreground">
                Updated on Dec 07, 2024
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-6xl rounded-lg border p-2">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="aspect-video rounded-lg object-cover"
          />
        </div>
        <div className="relative mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-4">
          <div className="sticky top-8 hidden h-fit lg:block">
            <span className="mb-6 text-lg">Content</span>
            <nav className="mt-2">
              <ul className="space-y-2">
                <li>
                  <a
                    href="#section1"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section1"
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    How the Tax System Works
                  </a>
                </li>
                <li>
                  <a
                    href="#section2"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section2"
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    The People&apos;s Rebellion
                  </a>
                </li>
                <li>
                  <a
                    href="#section3"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section3"
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    The King&apos;s Plan
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="lg:col-span-2">
            <div className="lg:col-span-2">
              <div>
                <h1 className="text-3xl font-extrabold">The Great Joke Tax</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  In a kingdom far away, where laughter once flowed freely, a
                  peculiar tale unfolded about a king who decided to tax the
                  very essence of joy itself - jokes and jest.
                </p>
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt="placeholder"
                  className="my-8 aspect-video w-full rounded-md object-cover"
                />
              </div>
              <section
                id="section1"
                ref={(ref) => addSectionRef("section1", ref)}
                className="prose mb-8 dark:prose-invert"
              >
                <h2>How the Tax System Works</h2>
                <p>
                  The king, seeing how much happier his subjects were, realized
                  the error of his ways and repealed the joke tax. Jokester was
                  declared a hero, and the kingdom lived happily ever after.
                </p>
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Royal Decree!</AlertTitle>
                  <AlertDescription>
                    Remember, all jokes must be registered at the Royal Jest
                    Office before telling them
                  </AlertDescription>
                </Alert>
              </section>

              <section
                id="section2"
                ref={(ref) => addSectionRef("section2", ref)}
                className="prose mb-8 dark:prose-invert"
              >
                <h2>The People&apos;s Rebellion</h2>
                <p>
                  The people of the kingdom, feeling uplifted by the laughter,
                  started to tell jokes and puns again, and soon the entire
                  kingdom was in on the joke.
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
                  The king, seeing how much happier his subjects were, realized
                  the error of his ways and repealed the joke tax. Jokester was
                  declared a hero, and the kingdom lived happily ever after.
                </p>
              </section>

              <section
                id="section3"
                ref={(ref) => addSectionRef("section3", ref)}
                className="prose mb-8 dark:prose-invert"
              >
                <h2>The King&apos;s Plan</h2>
                <p>
                  The king thought long and hard, and finally came up with{" "}
                  <a href="#">a brilliant plan</a>: he would tax the jokes in
                  the kingdom.
                </p>
                <blockquote>
                  &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a
                  good joke, so it&apos;s only fair that they should pay for the
                  privilege.&rdquo;
                </blockquote>
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
                  As a result, people stopped telling jokes, and the kingdom
                  fell into a gloom. But there was one person who refused to let
                  the king&apos;s foolishness get him down: a court jester named
                  Jokester.
                </p>
              </section>
            </div>
          </div>
          <div className="sticky top-8 prose hidden h-fit rounded-lg border p-6 lg:block dark:prose-invert">
            <h5 className="text-xl font-semibold">
              Get Started with Our Solution
            </h5>
            <ul className="my-6 text-sm [&>li]:pl-0">
              <li>Save 40% time with task automation</li>
              <li>Real-time team collaboration</li>
              <li>Easy drag-and-drop workflows</li>
            </ul>
            <div className="flex flex-col gap-2">
              <Button>Get started</Button>
              <Button variant="outline">Learn more</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blogpost3 };

```

```tsx
"use client";

import {
  ArrowUp,
  Clock,
  Facebook,
  Home,
  Instagram,
  Lightbulb,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

interface Blogpost4Props {
  className?: string;
}

const Blogpost4 = ({ className }: Blogpost4Props) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const sections = Object.keys(sectionRefs.current);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    let observer: IntersectionObserver | null = new IntersectionObserver(
      observerCallback,
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      },
    );

    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        observer?.observe(element);
      }
    });

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, []);

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };
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
              <BreadcrumbPage>Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mt-7 mb-6 max-w-3xl text-3xl font-semibold md:text-5xl">
          The royal decree that made everyone laugh
        </h1>
        <div className="flex items-center gap-3 text-sm">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
          </Avatar>
          <span>
            <a href="#" className="font-medium">
              John Doe
            </a>
            <span className="ml-1 text-muted-foreground">
              on September 23, 2024
            </span>
          </span>

          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            10 min. read
          </span>
        </div>
        <Separator className="mt-8 mb-16" />
        <div className="relative grid grid-cols-12 gap-6 lg:grid">
          <div className="col-span-12 lg:col-span-8">
            <div>
              <h3 className="mt-3 text-xl font-semibold">
                What is the Royal Decree on Plain Speech?
              </h3>
              <p className="mt-2 text-lg text-muted-foreground">
                Plain speech in royal decrees means writing that&apos;s clear as
                crystal, free of fancy court language, making it easy for every
                subject in the kingdom to understand, from the highest noble to
                the humblest peasant. This approach became essential after the
                Great Confusion of the Western Provinces, where a particularly
                wordy decree about chicken taxes led to three days of farmers
                bringing their chickens to dance at the royal ball.
              </p>
            </div>
            <section
              id="section1"
              ref={(ref) => addSectionRef("section1", ref)}
              className="my-8 prose dark:prose-invert"
            >
              <h2>How Taxes Work and Why They Matter</h2>
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
              <p>
                The king&apos;s subjects were not amused. They grumbled and
                complained, but the king was firm
              </p>
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Royal Decree!</AlertTitle>
                <AlertDescription>
                  Remember, all jokes must be registered at the Royal Jest
                  Office before telling them
                </AlertDescription>
              </Alert>
            </section>

            <section
              id="section2"
              ref={(ref) => addSectionRef("section2", ref)}
              className="prose mb-8 dark:prose-invert"
            >
              <h2>The Great People&apos;s Rebellion</h2>
              <p>
                The people of the kingdom, feeling uplifted by the laughter,
                started to tell jokes and puns again, and soon the entire
                kingdom was in on the joke.
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
                The king, seeing how much happier his subjects were, realized
                the error of his ways and repealed the joke tax. Jokester was
                declared a hero, and the kingdom lived happily ever after.
              </p>
            </section>

            <section
              id="section3"
              ref={(ref) => addSectionRef("section3", ref)}
              className="prose mb-8 dark:prose-invert"
            >
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
            </section>
          </div>
          <div className="sticky top-8 col-span-3 col-start-10 hidden h-fit lg:block">
            <span className="text-lg font-medium">On this page</span>
            <nav className="mt-4 text-sm">
              <ul className="space-y-1">
                <li>
                  <a
                    href="#section1"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section1"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    How Taxes Work and Why They Matter
                  </a>
                </li>
                <li>
                  <a
                    href="#section2"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section2"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    The Great People&apos;s Rebellion
                  </a>
                </li>
                <li>
                  <a
                    href="#section3"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section3"
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    The King&apos;s Plan
                  </a>
                </li>
              </ul>
            </nav>
            <Separator className="my-6" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Share this article</p>
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
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
              >
                <ArrowUp className="h-4 w-4" />
                Back to top
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blogpost4 };

```

```tsx
"use client";

import { Facebook, Home, Lightbulb, Linkedin, Twitter } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

interface Blogpost5Props {
  className?: string;
}

const Blogpost5 = ({ className }: Blogpost5Props) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const sections = Object.keys(sectionRefs.current);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    let observer: IntersectionObserver | null = new IntersectionObserver(
      observerCallback,
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      },
    );

    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        observer?.observe(element);
      }
    });

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, []);

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };
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
              <BreadcrumbPage>Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mt-9 mb-7 max-w-3xl text-4xl font-bold md:mb-10 md:text-7xl">
          The royal decree that made everyone laugh
        </h1>
        <div className="flex items-center gap-3 text-sm md:text-base">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
          </Avatar>
          <span>
            <a href="#" className="font-medium">
              John Doe
            </a>
            <span className="ml-1 text-muted-foreground">
              on September 23, 2024
            </span>
          </span>
        </div>
        <div className="relative mt-12 grid max-w-7xl gap-14 lg:mt-14 lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="order-2 lg:order-none lg:col-span-8">
            <div>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                alt="placeholder"
                className="mt-0 mb-8 aspect-video w-full rounded-lg border object-cover"
              />
              <p className="text-sm text-muted-foreground">
                In a kingdom far away, there lived a ruler who faced a peculiar
                challenge. After much contemplation, he devised an unusual
                solution that would change everything.
              </p>
            </div>
            <section
              id="section1"
              ref={(ref) => addSectionRef("section1", ref)}
              className="my-8 prose dark:prose-invert"
            >
              <h2>How Taxes Work and Why They Matter</h2>
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
              <p>
                The king&apos;s subjects were not amused. They grumbled and
                complained, but the king was firm
              </p>
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Royal Decree!</AlertTitle>
                <AlertDescription>
                  Remember, all jokes must be registered at the Royal Jest
                  Office before telling them
                </AlertDescription>
              </Alert>
            </section>

            <section
              id="section2"
              ref={(ref) => addSectionRef("section2", ref)}
              className="prose mb-8 dark:prose-invert"
            >
              <h2>The Great People&apos;s Rebellion</h2>
              <p>
                The people of the kingdom, feeling uplifted by the laughter,
                started to tell jokes and puns again, and soon the entire
                kingdom was in on the joke.
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
                The king, seeing how much happier his subjects were, realized
                the error of his ways and repealed the joke tax. Jokester was
                declared a hero, and the kingdom lived happily ever after.
              </p>
            </section>

            <section
              id="section3"
              ref={(ref) => addSectionRef("section3", ref)}
              className="prose mb-8 dark:prose-invert"
            >
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
            </section>
          </div>
          <div className="order-1 flex h-fit flex-col text-sm lg:sticky lg:top-8 lg:order-none lg:col-span-3 lg:col-start-10 lg:text-xs">
            <div className="order-3 lg:order-none">
              <span className="text-xs font-medium">ON THIS PAGE</span>
              <nav className="mt-2 lg:mt-4">
                <ul className="space-y-1">
                  <li>
                    <a
                      href="#section1"
                      className={cn(
                        "block py-1 transition-colors duration-200",
                        activeSection === "section1"
                          ? "text-muted-foreground lg:text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      How Taxes Work and Why They Matter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section2"
                      className={cn(
                        "block py-1 transition-colors duration-200",
                        activeSection === "section2"
                          ? "text-muted-foreground lg:text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      The Great People&apos;s Rebellion
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section3"
                      className={cn(
                        "block py-1 transition-colors duration-200",
                        activeSection === "section3"
                          ? "text-muted-foreground lg:text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      The King&apos;s Plan
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <Separator className="order-2 mt-8 mb-11 lg:hidden" />
            <div className="order-1 flex flex-col gap-2 lg:order-none lg:mt-9">
              <p className="font-medium text-muted-foreground">
                Share this article:
              </p>
              <ul className="flex gap-2">
                <li>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="group rounded-full"
                  >
                    <a href="#">
                      <Facebook className="h-4 w-4 fill-muted-foreground text-muted-foreground transition-colors group-hover:fill-primary group-hover:text-primary" />
                    </a>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="group rounded-full"
                  >
                    <a href="#">
                      <Linkedin className="h-4 w-4 fill-muted-foreground text-muted-foreground transition-colors group-hover:fill-primary group-hover:text-primary" />
                    </a>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="group rounded-full"
                  >
                    <a href="#">
                      <Twitter className="h-4 w-4 fill-muted-foreground text-muted-foreground transition-colors group-hover:fill-primary group-hover:text-primary" />
                    </a>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blogpost5 };

```

```tsx
"use client";
import { Linkedin, LucideIcon, Twitter } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  label: string;
  link: string;
}

interface BreadcrumbBlogProps {
  breadcrumb: Array<BreadcrumbItem>;
}

interface AuthorType {
  image?: string;
  name: string;
  job: string;
  description: string;
  socials: {
    icon: LucideIcon;
    url: string;
  }[];
}

const AUTHOR: AuthorType = {
  image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  name: "Jane Doe",
  job: "CEO & Cofounder",
  description:
    "An avid storyteller with a passion for crafting compelling narratives, love to explore the human experience through vivid characters and thought-provoking themes. ",
  socials: [
    {
      icon: Twitter,
      url: "#",
    },
    {
      icon: Linkedin,
      url: "#",
    },
  ],
};

const BREADCRUMB: Array<BreadcrumbItem> = [
  {
    label: "Resources",
    link: "#",
  },
  {
    label: "Blogs",
    link: "#",
  },
];

const SHARE_LINKS = [
  {
    icon: Twitter,
    url: "#",
  },
  {
    icon: Linkedin,
    url: "#",
  },
];

const ARTICLE_DATE = "May 18, 2025";
const ARTICLE_DURATION = "10 min read";

interface Blogpost6Props {
  className?: string;
}

const Blogpost6 = ({ className }: Blogpost6Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // Query all h2 elements with IDs that match the chapter anchors
    const chapterIds = ["heading-1", "heading-2", "heading-3"];
    const headingElements = chapterIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "0px 0px -30% 0px",
        threshold: 0.1,
      },
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={cn("pb-32", className)}>
      <div className="bg-muted bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/dot-pattern-2.svg')] bg-[length:3.125rem_3.125rem] bg-repeat py-20">
        <div className="container flex flex-col items-start justify-start gap-16 py-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex w-full flex-col items-center justify-center gap-12">
            <div className="flex w-full max-w-[36rem] flex-col items-center justify-center gap-8">
              <BreadcrumbBlog breadcrumb={BREADCRUMB} />
              <div className="flex w-full flex-col gap-5">
                <div className="flex items-center justify-center gap-2.5 text-sm font-medium text-foreground/60">
                  <div>{ARTICLE_DURATION}</div>
                  <div>|</div>
                  <div>{ARTICLE_DATE}</div>
                </div>
                <h1 className="text-center text-[2.5rem] leading-[1.2] font-semibold md:text-5xl lg:text-6xl">
                  Building Better Components
                </h1>
                <p className="text-center text-xl leading-[1.4] font-semibold text-foreground">
                  The best blog is one that captivates readers with engaging,
                  well-researched content presented in a clear and relatable
                  way.
                </p>
                <div className="flex items-center justify-center gap-2.5">
                  {SHARE_LINKS.map((link, index) => (
                    <Button asChild key={`share-link-${index}`} size="icon">
                      <a href={link.url}>
                        <link.icon />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-20">
        <div className="relative mx-auto w-full max-w-5xl items-start justify-between gap-20 lg:flex">
          {/* Chapters */}
          <div className="top-20 flex-1 bg-background pb-10 lg:sticky lg:pb-0">
            <div className="text-xl leading-snug font-medium">Chapters</div>
            <div className="flex flex-col gap-2 pt-2 pl-2">
              <a
                href="#heading-1"
                className={`block text-sm leading-normal font-medium text-muted-foreground transition duration-300 ${activeId === "heading-1" ? "lg:rounded-md lg:bg-muted lg:p-2 lg:font-bold lg:!text-primary" : "text-muted-foreground"}`}
              >
                The Role of UI Components in Development
              </a>
              <a
                href="#heading-2"
                className={`block text-sm leading-normal font-medium text-muted-foreground transition duration-300 ${activeId === "heading-2" ? "lg:rounded-md lg:bg-muted lg:p-2 lg:font-bold lg:!text-primary" : "text-muted-foreground"}`}
              >
                Core Types of UI Components
              </a>
              <a
                href="#heading-3"
                className={`block text-sm leading-normal font-medium text-muted-foreground transition duration-300 ${activeId === "heading-3" ? "lg:rounded-md lg:bg-muted lg:p-2 lg:font-bold lg:!text-primary" : "text-muted-foreground"}`}
              >
                End Paragraph
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="flex w-full max-w-[40rem] flex-col gap-10">
            <Author author={AUTHOR} />
            <div className="prose dark:prose-invert">
              <h2>Key Takeaways</h2>
              <p>
                • UI components are foundational, reusable elements in web
                development that encapsulate both design and behavior to promote
                consistency and efficiency.
              </p>
              <p>
                • Leveraging component libraries and frameworks streamlines the
                development process and ensures accessibility and cross-device
                compatibility.
              </p>
              <p>
                • Understanding different types of UI components enables
                developers to create structured, scalable, and maintainable user
                interfaces.
              </p>

              <p>
                In the evolving landscape of modern web development, UI
                components have emerged as indispensable tools for crafting
                user-friendly interfaces. These components, ranging from simple
                buttons to complex data tables, are the building blocks that
                help shape the overall user experience. By modularizing the
                interface into smaller, manageable pieces, UI components not
                only streamline the development process but also promote
                consistency across an application's design. As digital products
                become more complex, the role of well-structured UI components
                becomes even more critical in meeting user expectations and
                maintaining code quality.
              </p>
              <h2 id="heading-1" className="scroll-mt-24">
                The Role of UI Components in Development
              </h2>
              <p>
                UI components serve as self-contained units of functionality and
                presentation, often designed to be reused across multiple parts
                of an application. By encapsulating both logic and styling,
                components reduce duplication and improve the maintainability of
                codebases. For example, a single button component can be reused
                with different props or styles, ensuring a uniform look and feel
                throughout the application. This modular approach also allows
                for parallel development, where teams can work on separate
                components without interfering with each other's work.
              </p>
              <p>
                Popular frameworks like React, Vue, and Angular are built around
                component-based architectures, encouraging developers to think
                in terms of reusable blocks rather than monolithic pages. This
                shift not only enhances scalability but also simplifies testing
                and debugging. Additionally, many UI libraries such as Material
                UI, Chakra UI, and Radix UI provide pre-built, accessible
                components that accelerate development and ensure consistency
                with design systems. Embracing components as first-class
                citizens in frontend architecture leads to better code
                organization, faster prototyping, and a more seamless user
                experience.
              </p>
              <h2 id="heading-2" className="scroll-mt-24">
                Core Types of UI Components
              </h2>
              <h3>1. Input Components</h3>
              <p>
                Input components are interactive elements that allow users to
                provide information. These include text inputs, checkboxes,
                radio buttons, sliders, and file upload fields. They are
                essential in forms and user settings, enabling data collection
                and customization. A well-designed input component handles
                validation, displays feedback, and provides a seamless
                experience across different devices and screen readers, ensuring
                inclusivity and usability.
              </p>
              <a href="#">Explore more</a>
              <div className="w-full max-w-[40rem] overflow-hidden">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <h3>2. Navigation Components</h3>
              <p>
                Navigation components guide users through an application's
                structure. These include elements like top bars, side menus,
                breadcrumbs, tabs, and pagination. Effective navigation improves
                discoverability and helps users find the content they need
                without friction. Good navigation design considers user flow,
                accessibility (such as keyboard navigation and ARIA labels), and
                responsiveness, ensuring the interface is intuitive and adaptive
                to various screen sizes.
              </p>
              <div className="w-full max-w-[40rem] overflow-hidden">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <h3>3. Feedback Components</h3>
              <p>
                Feedback components provide users with visual or textual cues in
                response to their actions. Examples include modals, toast
                notifications, progress bars, and tooltips. These elements
                inform users about the success or failure of their operations or
                alert them to required actions. They enhance interactivity and
                reduce confusion, especially when performing asynchronous
                actions like form submissions or file uploads.
              </p>
              <div className="w-full max-w-[40rem] overflow-hidden">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <h3>4. Layout Components</h3>
              <p>
                Layout components organize content visually on the page. Common
                examples include containers, rows, columns, and grid systems.
                These components help define the structure of a page and control
                the spacing, alignment, and responsiveness of child elements. A
                strong layout system ensures consistency in visual hierarchy and
                supports scalability as the application grows in complexity.
              </p>
              <div className="w-full max-w-[40rem] overflow-hidden">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <h2 id="heading-3" className="scroll-mt-24">
                End Paragraph
              </h2>
              <p>
                Mastering the use of UI components is a key step toward building
                reliable, scalable, and aesthetically consistent web
                applications. By breaking down interfaces into smaller parts,
                developers can achieve greater flexibility, encourage reuse, and
                reduce the likelihood of errors. UI components also bridge the
                gap between design and development, creating a more
                collaborative and efficient workflow that benefits both
                developers and end users.
              </p>
            </div>

            {/* Conclusion */}
            <div className="prose rounded-lg bg-muted p-5 dark:prose-invert [&>h2]:mt-0">
              <h2>Conclusion</h2>
              <p>
                UI components are more than just visual elements—they are
                strategic assets in a modern developer's toolkit. When designed
                thoughtfully and used effectively, they empower teams to deliver
                high-quality interfaces with speed, consistency, and confidence.
                As frontend development continues to evolve, investing in
                reusable, accessible, and well-documented UI components will
                remain essential for building user-centric, maintainable digital
                products.
              </p>
            </div>

            {/* Author */}
            <div className="flex flex-col gap-4 rounded-lg bg-muted p-5">
              <Author author={AUTHOR} />
              <p>{AUTHOR.description}</p>
              <div className="flex items-center gap-2.5">
                {AUTHOR.socials.map((link, index) => (
                  <Button asChild key={`author-socials-${index}`} size="icon">
                    <a href={link.url}>
                      <link.icon />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Author = ({ author }: { author: AuthorType }) => {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar className="size-12 border">
        <AvatarImage src={author.image} alt={author.name} />
        <AvatarFallback>{author.name}</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-sm leading-normal font-normal">{author.name}</div>
        <div className="text-sm leading-normal font-normal text-muted-foreground">
          {author.job}
        </div>
      </div>
    </div>
  );
};

const BreadcrumbBlog = ({ breadcrumb }: BreadcrumbBlogProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, i) => {
          return (
            <Fragment key={`${item.label}`}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
              {i < breadcrumb.length - 1 ? (
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
              ) : null}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { Blogpost6 };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface BlogPost7Props {
  title: string;
  image: string;
  description: string;
  topNote: string;
  author: {
    name: string;
    image: string;
    description: string;
  };
  secondaryDescription: string;
  className?: string;
}

const Blogpost7 = ({
  title = "Sustainable Design in the Digital Age",
  description = "Why eco-conscious practices in digital products matter for the future of technology.",
  image = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  topNote = "Jan 22, 2025",
  author = {
    name: "Avatar",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    description: "Senior Software Engineer",
  },
  secondaryDescription = "At Our Studio, we transform ideas into digital platforms that tell your story with impact and performance.",
  className,
}: BlogPost7Props) => {
  return (
    <section
      className={cn(
        "grid min-h-lvh gap-10 p-6 md:grid-cols-2 lg:gap-20",
        className,
      )}
    >
      <div className="h-full overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid items-center">
        <div className="flex max-w-lg flex-col gap-10">
          {/* top note */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xs text-muted-foreground xl:text-base"
          >
            {topNote}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl font-bold md:text-5xl"
          >
            {title}
          </motion.h1>
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-muted-foreground lg:text-base"
          >
            {description}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <Avatar className="size-14 border">
              <AvatarImage src={author.image} alt={author.name} />
            </Avatar>
            <div className="">
              <h2 className="font-semibold xl:text-lg">{author.name}</h2>
              <p className="font-medium text-muted-foreground xl:text-lg">
                {author.description}
              </p>
            </div>
          </motion.div>

          <Separator />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <p className="text-3xl font-medium">{secondaryDescription}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Blogpost7 };

```

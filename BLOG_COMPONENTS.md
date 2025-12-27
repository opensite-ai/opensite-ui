```tsx
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: "post-1",
    title: "The Future of Web Development: What's Next in 2024",
    summary:
      "Explore the latest trends in web development, from AI-powered tools to new frameworks that are reshaping how we build the web. Discover what developers need to know to stay ahead.",
    label: "Web Development",
    author: "Sarah Chen",
    published: "15 Jan 2024",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    id: "post-2",
    title: "Building Scalable APIs with Modern Architecture Patterns",
    summary:
      "Learn about microservices, GraphQL, and event-driven architectures that are powering today's most successful applications. Practical insights for building robust APIs.",
    label: "Backend",
    author: "Marcus Rodriguez",
    published: "12 Jan 2024",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
  },
  {
    id: "post-3",
    title: "Design Systems: Creating Consistency at Scale",
    summary:
      "How leading companies are implementing design systems to maintain visual consistency across products while enabling rapid development and innovation.",
    label: "Design",
    author: "Emma Thompson",
    published: "10 Jan 2024",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg",
  },
];

interface Blog4Props {
  className?: string;
}

const Blog4 = ({ className }: Blog4Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-8 md:mb-14 lg:mb-16">
          <div className="flex items-start justify-between gap-8">
            <div>
              <h2 className="mb-4 w-full text-4xl font-medium md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">
                Blog
              </h2>
            </div>
          </div>
          <p>
            Insights, tutorials, and thoughts on modern software development
          </p>
        </div>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
          {posts.map((post) => (
            <a key={post.id} href={post.href} className="group flex flex-col">
              <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
                <div className="transition-opacity duration-300 group-hover:opacity-80">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-3/2 h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              <div>
                <Badge variant="secondary">{post.label}</Badge>
              </div>
              <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl">
                {post.title}
              </div>
              <div className="mb-4 line-clamp-2 text-sm text-muted-foreground md:mb-5 md:text-base">
                {post.summary}
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="size-12">
                  <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-px">
                  <span className="text-xs font-medium">{post.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {post.published}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center py-2 md:hidden">
          <Button className="w-full sm:w-fit">View all posts</Button>
        </div>
      </div>
    </section>
  );
};

export { Blog4 };

```

```tsx
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: "post-1",
    title: "The Future of Web Development: What's Next in 2024",
    summary:
      "Explore the latest trends in web development, from AI-powered tools to new frameworks that are reshaping how we build the web. Discover what developers need to know to stay ahead.",
    label: "Web Development",
    author: "Sarah Chen",
    published: "15 Jan 2024",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    id: "post-2",
    title: "Building Scalable APIs with Modern Architecture Patterns",
    summary:
      "Learn about microservices, GraphQL, and event-driven architectures that are powering today's most successful applications. Practical insights for building robust APIs.",
    label: "Backend",
    author: "Marcus Rodriguez",
    published: "12 Jan 2024",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
  },
  {
    id: "post-3",
    title: "Design Systems: Creating Consistency at Scale",
    summary:
      "How leading companies are implementing design systems to maintain visual consistency across products while enabling rapid development and innovation.",
    label: "Design",
    author: "Emma Thompson",
    published: "10 Jan 2024",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg",
  },
  {
    id: "post-4",
    title: "Machine Learning in Production: Best Practices for Deployment",
    summary:
      "From model versioning to monitoring and scaling, learn the essential practices for deploying machine learning models in production environments.",
    label: "Machine Learning",
    author: "Alex Kim",
    published: "8 Jan 2024",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-4.svg",
  },
  {
    id: "post-5",
    title: "The Rise of Edge Computing: Transforming Application Architecture",
    summary:
      "Discover how edge computing is revolutionizing application performance and user experience, and learn strategies for implementing edge-first architectures.",
    label: "Cloud Computing",
    author: "David Park",
    published: "5 Jan 2024",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-5.svg",
  },
  {
    id: "post-6",
    title: "Cybersecurity Essentials for Modern Applications",
    summary:
      "Essential security practices every developer should implement, from authentication and authorization to data encryption and secure coding practices.",
    label: "Security",
    author: "Lisa Wang",
    published: "3 Jan 2024",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-6.svg",
  },
  {
    id: "post-7",
    title: "Performance Optimization: Techniques for Faster Web Applications",
    summary:
      "Advanced techniques for optimizing web application performance, including code splitting, lazy loading, and modern caching strategies.",
    label: "Performance",
    author: "James Wilson",
    published: "1 Jan 2024",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    id: "post-8",
    title: "DevOps Culture: Building Better Software Delivery Pipelines",
    summary:
      "How to foster a DevOps culture in your organization and implement CI/CD pipelines that accelerate development while maintaining quality.",
    label: "DevOps",
    author: "Maria Garcia",
    published: "29 Dec 2023",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
  },
  {
    id: "post-9",
    title: "Mobile App Development: Native vs Cross-Platform Solutions",
    summary:
      "Compare native and cross-platform development approaches, exploring the trade-offs between performance, development speed, and user experience.",
    label: "Mobile Development",
    author: "Ryan Johnson",
    published: "27 Dec 2023",
    href: "#",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg",
  },
];

interface Blog5Props {
  className?: string;
}

const Blog5 = ({ className }: Blog5Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-8 md:mb-14 lg:mb-16">
          <div className="flex items-start justify-between gap-8">
            <div>
              <h2 className="mb-4 w-full text-4xl font-medium md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">
                Blog
              </h2>
            </div>
          </div>
          <p>
            Insights, tutorials, and thoughts on modern software development
          </p>
        </div>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
          {posts.map((post) => (
            <a key={post.id} href={post.href} className="group flex flex-col">
              <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
                <div className="transition-opacity duration-300 group-hover:opacity-80">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-3/2 h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              <div>
                <Badge variant="secondary">{post.label}</Badge>
              </div>
              <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl">
                {post.title}
              </div>
              <div className="mb-4 line-clamp-2 text-sm text-muted-foreground md:mb-5 md:text-base">
                {post.summary}
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="size-12">
                  <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-px">
                  <span className="text-xs font-medium">{post.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {post.published}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center py-2 md:hidden">
          <Button className="w-full sm:w-fit">View all posts</Button>
        </div>
      </div>
    </section>
  );
};

export { Blog5 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface Blog7Props {
  tagline: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  posts: Post[];
  className?: string;
}

const Blog7 = ({
  tagline = "Latest Updates",
  heading = "Blog Posts",
  description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
  buttonText = "View all articles",
  buttonUrl = "https://shadcnblocks.com",
  posts = [
    {
      id: "post-1",
      title: "Getting Started with shadcn/ui Components",
      summary:
        "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
      label: "Tutorial",
      author: "Sarah Chen",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "post-2",
      title: "Building Accessible Web Applications",
      summary:
        "Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
      label: "Accessibility",
      author: "Marcus Rodriguez",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "post-3",
      title: "Modern Design Systems with Tailwind CSS",
      summary:
        "Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
      label: "Design Systems",
      author: "Emma Thompson",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
  ],
  className,
}: Blog7Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            {tagline}
          </Badge>
          <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            {description}
          </p>
          <Button variant="link" className="w-full sm:w-auto" asChild>
            <a href={buttonUrl} target="_blank">
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
            >
              <div className="aspect-16/9 w-full">
                <a
                  href={post.url}
                  target="_blank"
                  className="transition-opacity duration-200 fade-in hover:opacity-70"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover object-center"
                  />
                </a>
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                  <a href={post.url} target="_blank">
                    {post.title}
                  </a>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.summary}</p>
              </CardContent>
              <CardFooter>
                <a
                  href={post.url}
                  target="_blank"
                  className="flex items-center text-foreground hover:underline"
                >
                  Read more
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog7 };

```

```tsx
import { ArrowRight, FileText } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Blog12Props {
  className?: string;
}

const Blog12 = ({ className }: Blog12Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="gap-1 py-1">
            <FileText className="h-full w-4" /> Our Blogs
          </Badge>
          <h1 className="text-4xl font-semibold text-balance">
            Discover the latest trends
          </h1>
          <p className="text-muted-foreground">
            Explore our blog for insightful articles, personal reflections and
            ideas that inspire action on the topics you care about.
          </p>
        </div>
        <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <a className="rounded-xl border" href="#">
            <div className="p-2">
              <img
                src="https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080"
                alt="placeholder"
                className="aspect-video w-full rounded-lg object-cover"
              />
            </div>
            <div className="px-3 pt-2 pb-4">
              <h2 className="mb-1 font-medium">
                How to build a successful brand and business online in 2024
              </h2>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Separator className="my-5" />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-9 rounded-full ring-1 ring-input">
                    <AvatarImage
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp"
                      alt="placeholder"
                    />
                  </Avatar>
                  <span className="text-sm font-medium">John Doe</span>
                </div>
                <Badge variant="secondary" className="h-fit">
                  10 Min Read
                </Badge>
              </div>
            </div>
          </a>
          <a className="rounded-xl border" href="#">
            <div className="p-2">
              <img
                src="https://images.unsplash.com/photo-1653288973812-81d1951b8127?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                className="aspect-video w-full rounded-lg object-cover"
              />
            </div>
            <div className="px-3 pt-2 pb-4">
              <h2 className="mb-1 font-medium">
                The difference between UI and UX and how to design for both
              </h2>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Separator className="my-5" />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-9 rounded-full ring-1 ring-input">
                    <AvatarImage
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                      alt="placeholder"
                    />
                  </Avatar>
                  <span className="text-sm font-medium">Jane Doe</span>
                </div>
                <Badge variant="secondary" className="h-fit">
                  14 Min Read
                </Badge>
              </div>
            </div>
          </a>
          <a className="rounded-xl border" href="#">
            <div className="p-2">
              <img
                src="https://images.unsplash.com/photo-1563952532949-3d1a874ad614?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                className="aspect-video w-full rounded-lg object-cover"
              />
            </div>
            <div className="px-3 pt-2 pb-4">
              <h2 className="mb-1 font-medium">
                Optimizing your website for SEO and getting more traffic
              </h2>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Separator className="my-5" />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-9 rounded-full ring-1 ring-input">
                    <AvatarImage
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"
                      alt="placeholder"
                    />
                  </Avatar>
                  <span className="text-sm font-medium">Jane Smith</span>
                </div>
                <Badge variant="secondary" className="h-fit">
                  9 Min Read
                </Badge>
              </div>
            </div>
          </a>
        </div>
        <div className="mt-10 flex justify-center">
          <Button variant="outline">
            View All Blogs <ArrowRight className="ml-2 h-full w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Blog12 };

```

```tsx
import { Calendar, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Blog13Props {
  className?: string;
}

const Blog13 = ({ className }: Blog13Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Badge variant="outline">Articles</Badge>
          <h1 className="text-4xl font-semibold text-balance">
            Discover the latest trends
          </h1>
          <p className="text-muted-foreground">
            Explore our blog for insightful articles, personal reflections and
            ideas that inspire action on the topics you care about.
          </p>
          <a href="#" className="flex items-center gap-1 text-sm font-semibold">
            View All Blogs
            <ChevronRight className="h-full w-4" />
          </a>
        </div>
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080"
                alt="placeholder"
                className="aspect-video w-full rounded-lg object-cover"
              />
              <Badge
                variant="secondary"
                className="absolute top-4 right-4 bg-background/70 px-3 py-1 text-sm backdrop-blur-sm"
              >
                Business
              </Badge>
            </div>
            <div className="flex h-full flex-col justify-between p-4">
              <h2 className="mb-5 text-xl font-semibold">
                How to build a successful brand and business
              </h2>
              <div className="flex justify-between gap-6 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  September, 23, 2024
                </span>
                <a href="#" className="flex items-center gap-1">
                  Read more
                  <ChevronRight className="h-full w-3" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1653288973812-81d1951b8127?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                className="aspect-video w-full rounded-lg object-cover"
              />
              <Badge
                variant="secondary"
                className="absolute top-4 right-4 bg-background/70 px-3 py-1 text-sm backdrop-blur-sm"
              >
                Design
              </Badge>
            </div>
            <div className="flex h-full flex-col justify-between p-4">
              <h2 className="mb-5 text-xl font-semibold">
                The difference between UI and UX
              </h2>
              <div className="flex justify-between gap-6 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  April, 07, 2024
                </span>
                <a href="#" className="flex items-center gap-1">
                  Read more
                  <ChevronRight className="h-full w-3" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1563952532949-3d1a874ad614?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                className="aspect-video w-full rounded-lg object-cover"
              />
              <Badge
                variant="secondary"
                className="absolute top-4 right-4 bg-background/70 px-3 py-1 text-sm backdrop-blur-sm"
              >
                Marketing
              </Badge>
            </div>
            <div className="flex h-full flex-col justify-between p-4">
              <h2 className="mb-5 text-xl font-semibold">
                Optimizing your website for SEO and getting more traffic
              </h2>
              <div className="flex justify-between gap-6 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  August, 31, 2024
                </span>
                <a href="#" className="flex items-center gap-1">
                  Read more
                  <ChevronRight className="h-full w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blog13 };

```

```tsx
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

type Category =
  | "Technology"
  | "Business"
  | "Health & Wellness"
  | "Productivity"
  | "Innovation";

type Post = {
  title: string;
  category: Category;
  description: string;
  image: string;
};

const posts: Post[] = [
  {
    title: "Exploring the Future of AI in Modern Technology Trends",
    category: "Technology",
    description:
      "Discover how AI is transforming industries and learn about the latest advancements in artificial intelligence. Discover how AI is transforming industries and learn about the latest advancements in artificial intelligence.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    title: "Strategies for Effective Business Growth in 2025",
    category: "Business",
    description:
      "Learn proven strategies to grow your business and stay competitive in the ever-evolving market landscape.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    title: "Top Wellness Trends to Improve Your Health in 2025",
    category: "Health & Wellness",
    description:
      "Explore the top wellness trends that can help you achieve a healthier and more balanced lifestyle.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    title: "Boosting Productivity with Smart Tools and Techniques",
    category: "Productivity",
    description:
      "Find out how to enhance your productivity using the latest tools and techniques for better time management.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
];

interface Blog14Props {
  className?: string;
}

const Blog14 = ({ className }: Blog14Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-medium md:text-6xl">
            Insights and Trends Blog
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Stay updated with the latest insights, trends, and tips across
            various topics to keep ahead of the curve.
          </p>
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="my-16 grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-16">
            <img
              src={posts[0].image}
              alt="placeholder"
              className="aspect-video rounded-lg object-cover"
            />
            <div className="flex flex-col items-start gap-4">
              <Badge variant="secondary" className="shrink">
                {posts[0].category}
              </Badge>
              <h2 className="text-2xl font-semibold text-balance md:max-w-lg lg:text-3xl">
                {posts[0].title}
              </h2>
              <p className="text-muted-foreground md:max-w-lg">
                {posts[0].description}
              </p>
            </div>
          </div>
          <p className="text-2xl font-medium md:text-3xl">Popular Posts</p>
          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
            {posts.slice(1).map((post) => (
              <div key={post.title} className="flex flex-col items-start gap-4">
                <img
                  src={post.image}
                  alt="placeholder"
                  className="aspect-video rounded-lg object-cover"
                />
                <Badge variant="secondary" className="shrink">
                  {post.category}
                </Badge>
                <h3 className="text-xl font-semibold text-balance md:max-w-md">
                  {post.title}
                </h3>
                <p className="text-muted-foreground md:max-w-md">
                  {post.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blog14 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const data = [
  {
    id: 1,
    title: "Getting Started with Modern Web Development",
    description:
      "Discover the essential tools and frameworks needed for modern web development. Learn about the latest technologies, best practices, and workflow optimization techniques for building robust web applications.",
    date: "March 15, 2024",
    category: "Web Development",
    link: "#",
  },
  {
    id: 2,
    title: "Understanding Frontend Design Principles",
    description:
      "Explore fundamental principles of frontend design and development. Learn about responsive layouts, user interface patterns, accessibility standards, and how to create engaging user experiences.",
    date: "March 12, 2024",
    category: "Frontend",
    link: "#",
  },
  {
    id: 3,
    title: "Backend Development Fundamentals Guide",
    description:
      "Master the core concepts of backend development including database design, API architecture, and server management. Learn how to build secure, efficient, and scalable backend systems.",
    date: "March 8, 2024",
    category: "Backend",
    link: "#",
  },
  {
    id: 4,
    title: "Advanced JavaScript Programming Concepts",
    description:
      "Deep dive into advanced JavaScript concepts including async programming, design patterns, and modern ES6+ features. Learn how to write clean, maintainable, and efficient JavaScript code.",
    date: "March 5, 2024",
    category: "Frontend",
    link: "#",
  },
];

interface Blog19Props {
  className?: string;
}

const Blog19 = ({ className }: Blog19Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-1">
          <h1 className="text-2xl font-semibold md:text-4xl">
            Related articles
          </h1>
          <Button
            variant="outline"
            className="md:h-10 md:px-4 md:py-2"
            size="sm"
          >
            See all articles
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {data.map((item) => (
            <a key={item.id} href={item.link} className="flex flex-col gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {item.category}
              </span>
              <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {item.description}
              </p>
              <span className="text-sm font-medium text-muted-foreground">
                {item.date}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog19 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface DataItem {
  title: string;
  content: string;
}

const DATA: DataItem[] = [
  {
    title: "Cloud Computing",
    content:
      "Exploring cost-effective cloud migration patterns and multi-cloud management",
  },
  {
    title: "Cybersecurity",
    content:
      "Implementing adaptive security frameworks for distributed workforces",
  },
  {
    title: "IoT",
    content: "Reducing latency in smart city deployments through fog computing",
  },
  {
    title: "Blockchain",
    content:
      "Enterprise applications of distributed ledger technology in supply chains",
  },
];

interface Blog22Props {
  className?: string;
}

const Blog22 = ({ className }: Blog22Props) => {
  return (
    <section className={cn("dark relative bg-background py-32", className)}>
      <div className="container">
        {/* Title Section - Updated layout */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Tech Insights
          </h1>

          <div className="mt-4 flex justify-start">
            <span className="mt-2 block text-sm text-muted-foreground md:text-base">
              Exploring cutting-edge technologies shaping tomorrow's digital
              landscape
            </span>
            <Button
              variant="outline"
              className="ml-auto rounded-full border-foreground text-foreground"
            >
              Read More
              <ArrowRight className="h-4 w-4 md:h-6 md:w-6" />
            </Button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Main Featured Post */}
          <div className="mb-4">
            <img
              className="w-full rounded-lg object-cover"
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-8-wide.svg"
              alt="AI Revolution"
            />
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
                Next-Gen AI: Transforming Business Operations
              </h1>
            </div>
            <div className="mt-6 flex items-center gap-3 md:mt-8 md:gap-4">
              <Avatar className="h-8 w-8 rounded-md md:h-12 md:w-12">
                <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
              </Avatar>
              <span className="text-sm md:text-base">
                <span className="block text-foreground">Sarah Johnson</span>
                <span className="text-xs text-muted-foreground md:text-sm">
                  AI Researcher
                </span>
              </span>
            </div>
          </div>

          {/* Secondary Posts List */}
          <div className="space-y-6 text-foreground md:space-y-8">
            {DATA.map((post, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border-b pb-6 last:border-b-0"
              >
                <div className="w-1/4 shrink-0 md:w-1/5">
                  <img
                    className="rounded-md"
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-8-wide.svg"
                    alt={post.title}
                  />
                </div>
                <div className="w-3/4 md:w-4/5">
                  <p className="text-sm leading-relaxed md:text-base">
                    {post.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blog22 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface Blog24Props {
  tagline: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  posts: Post[];
  className?: string;
}

const Blog24 = ({
  tagline = "Latest Updates",
  heading = "Blog Posts",
  description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
  buttonText = "View all articles",
  buttonUrl = "https://shadcnblocks.com",
  posts = [
    {
      id: "post-1",
      title: "Getting Started with shadcn/ui Components",
      summary:
        "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
      label: "Tutorial",
      author: "Sarah Chen",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "post-2",
      title: "Building Accessible Web Applications",
      summary:
        "Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
      label: "Accessibility",
      author: "Marcus Rodriguez",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "post-3",
      title: "Modern Design Systems with Tailwind CSS",
      summary:
        "Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
      label: "Design Systems",
      author: "Emma Thompson",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
  ],
  className,
}: Blog24Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6">
            {tagline}
          </Badge>
          <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-5xl lg:mb-6">
            {heading}
          </h2>
          <p className="mb-12 text-muted-foreground md:text-base lg:text-lg">
            {description}
          </p>
        </div>

        <div className="mx-auto max-w-5xl space-y-12">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden border-0 bg-transparent shadow-none"
            >
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="shrink-0">
                  <a
                    href={post.url}
                    target="_blank"
                    className="block transition-opacity duration-200 hover:opacity-90"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="aspect-16/9 w-full rounded-lg object-cover object-center sm:w-[260px]"
                    />
                  </a>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="secondary">{post.label}</Badge>
                    <span>{post.author}</span>
                    <span>{post.published}</span>
                  </div>
                  <h3 className="text-xl leading-tight font-bold lg:text-2xl">
                    <a
                      href={post.url}
                      target="_blank"
                      className="hover:underline"
                    >
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-base text-muted-foreground">
                    {post.summary}
                  </p>
                  <a
                    href={post.url}
                    target="_blank"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            asChild
          >
            <a href={buttonUrl} target="_blank">
              {buttonText}
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Blog24 };

```

```tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Slash } from "lucide-react";
import { Fragment, useCallback, useMemo, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

interface BreadcrumbItem {
  label: string;
  link: string;
}

interface Post {
  category: string;
  title: string;
  summary: string;
  link: string;
  cta: string;
  thumbnail: string;
}

interface Category {
  label: string;
  value: string;
}

interface FilterFormProps {
  categories: Array<Category>;
  onCategoryChange: (selectedCategories: string[]) => void;
}

interface BlogsResultProps {
  posts: Array<Post>;
  categories: Array<Category>;
}

interface BreadcrumbBlogProps {
  breadcrumb: Array<BreadcrumbItem>;
}

const POSTS_PER_PAGE = 6;

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

const CATEGORIES: Array<Category> = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Productivity",
    value: "productivity",
  },
  {
    label: "Accessibility",
    value: "accessibility",
  },
  {
    label: "Performance",
    value: "performance",
  },
];

const PRIMARY_POST: Post = {
  category: "Innovation Spotlight",
  title: "How AI is Transforming Frontend Development",
  summary:
    "Explore how tools like GitHub Copilot, AI design generators, and code assistants are changing the way developers build UIs and ship features faster.",
  link: "#",
  cta: "Discover the Future",
  thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
};

const POSTS: Array<Post> = [
  {
    category: "Productivity",
    title: "5 VS Code Extensions That Will Save You Hours",
    summary:
      "Discover must-have extensions to boost your coding efficiency and streamline your workflow.",
    link: "#",
    cta: "Boost Your Editor",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    category: "Productivity",
    title: "Time Management for Developers: What Really Works",
    summary:
      "Learn proven strategies to avoid burnout and stay on top of your tasks without stress.",
    link: "#",
    cta: "Manage Your Time",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    category: "Productivity",
    title: "Automate Your Workflow with Task Runners",
    summary:
      "Use tools like Gulp, npm scripts, and GitHub Actions to automate repetitive development tasks.",
    link: "#",
    cta: "Automate Now",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    category: "Productivity",
    title: "Effective Daily Routines for Developers",
    summary:
      "Discover routines that top developers follow to stay productive, creative, and focused.",
    link: "#",
    cta: "Find Your Flow",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
  {
    category: "Productivity",
    title: "Master Git Like a Pro with These Shortcuts",
    summary:
      "Speed up your version control workflow with powerful Git aliases and tips.",
    link: "#",
    cta: "Speed Up Git",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  },
  {
    category: "Productivity",
    title: "Reducing Context Switching as a Developer",
    summary:
      "Minimize distractions and deep-dive into your code with focused work practices.",
    link: "#",
    cta: "Stay Focused",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    category: "Productivity",
    title: "Remote Work Setup: Tools for a Distraction-Free Environment",
    summary:
      "Set up your space and software stack for maximum productivity when working from home.",
    link: "#",
    cta: "Upgrade Your Setup",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    category: "Productivity",
    title: "Pomodoro for Coders: Does It Really Work?",
    summary:
      "A practical review of the Pomodoro technique and its effectiveness for software development.",
    link: "#",
    cta: "Try the Method",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    category: "Accessibility",
    title: "Why Accessibility Should Be Part of Your MVP",
    summary:
      "Making your product inclusive from day one improves usability and reach.",
    link: "#",
    cta: "Learn Why",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    category: "Accessibility",
    title: "Using ARIA Roles Correctly in Your Web App",
    summary:
      "Understand how to enhance screen reader support using ARIA roles and landmarks.",
    link: "#",
    cta: "Improve Semantics",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
  {
    category: "Accessibility",
    title: "Color Contrast Tips for Better Readability",
    summary:
      "Learn how to choose accessible color combinations that meet WCAG standards.",
    link: "#",
    cta: "Fix Your Colors",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  },
  {
    category: "Accessibility",
    title: "Keyboard Navigation: The Overlooked User Experience",
    summary:
      "Ensure your website is fully usable with just a keyboard, for accessibility and speed.",
    link: "#",
    cta: "Test Navigation",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    category: "Accessibility",
    title: "Accessible Forms: Labels, Errors & Feedback",
    summary:
      "Improve the usability of your forms by ensuring screen readers and users receive clear instructions.",
    link: "#",
    cta: "Fix Your Forms",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    category: "Accessibility",
    title: "Screen Reader Testing: A Beginner's Guide",
    summary:
      "How to test your site with popular screen readers and what to listen for.",
    link: "#",
    cta: "Start Testing",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    category: "Accessibility",
    title: "Inclusive Design Thinking in UI Development",
    summary:
      "Design interfaces that consider users of all abilities from the start.",
    link: "#",
    cta: "Design for All",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    category: "Accessibility",
    title: "Accessibility Audits: Tools and Checklists",
    summary:
      "Perform thorough accessibility audits with tools like Axe, Lighthouse, and manual checklists.",
    link: "#",
    cta: "Audit Now",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
  {
    category: "Performance",
    title: "Lazy Loading Images with Modern HTML",
    summary:
      "Improve load times by using native lazy-loading and fallback strategies for images.",
    link: "#",
    cta: "Optimize Images",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  },
  {
    category: "Performance",
    title: "Minifying JavaScript Without Breaking Your App",
    summary:
      "Best practices for minifying and tree-shaking your JS bundles to boost speed.",
    link: "#",
    cta: "Shrink Your Code",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    category: "Performance",
    title: "Web Vitals Explained: CLS, LCP, FID",
    summary:
      "Learn how to measure and improve Core Web Vitals for a better user experience.",
    link: "#",
    cta: "Improve Vitals",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    category: "Performance",
    title: "Server-Side Rendering vs Client-Side: Which is Faster?",
    summary:
      "Compare SSR and CSR strategies and when to use each for better performance.",
    link: "#",
    cta: "Explore Options",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    category: "Performance",
    title: "Optimizing Fonts for Faster Page Loads",
    summary:
      "Learn techniques for loading fonts without blocking rendering or causing layout shifts.",
    link: "#",
    cta: "Speed Up Fonts",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  {
    category: "Performance",
    title: "Reduce JavaScript Bundle Size with Code Splitting",
    summary:
      "Use dynamic imports and route-based chunking to reduce initial load time.",
    link: "#",
    cta: "Split It Up",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
  },
  {
    category: "Performance",
    title: "Caching Strategies for Modern Web Apps",
    summary:
      "Leverage HTTP caching, service workers, and CDNs to improve speed and offline support.",
    link: "#",
    cta: "Cache Smarter",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg",
  },
  {
    category: "Performance",
    title: "Analyzing Performance Bottlenecks with Chrome DevTools",
    summary:
      "Use the Performance tab in DevTools to track down and fix runtime issues in your app.",
    link: "#",
    cta: "Analyze Now",
    thumbnail: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
];

const FilterFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.length > 0, {
    message: "At least one category should be selected.",
  }),
});

const FilterForm = ({ categories, onCategoryChange }: FilterFormProps) => {
  const form = useForm<z.infer<typeof FilterFormSchema>>({
    resolver: zodResolver(FilterFormSchema),
    defaultValues: {
      items: [CATEGORIES[0].value],
    },
  });

  const handleCheckboxChange = useCallback(
    (
      checked: boolean | string,
      categoryValue: string,
      field: ControllerRenderProps<z.infer<typeof FilterFormSchema>, "items">,
    ) => {
      let updatedValues = checked
        ? [...field.value, categoryValue]
        : field.value.filter((value: string) => value !== categoryValue);

      // If no categories are checked, add "all"
      if (updatedValues.length === 0) {
        form.setValue("items", ["all"]);
        onCategoryChange(["all"]);
        return;
      }

      // Remove "all" if specific category is checked
      if (updatedValues.includes("all")) {
        updatedValues = updatedValues.filter((v: string) => v !== "all");
      }

      // Avoid unnecessary updates
      if (JSON.stringify(field.value) !== JSON.stringify(updatedValues)) {
        form.setValue("items", updatedValues);
        onCategoryChange(updatedValues);
      }
    },
    [form, onCategoryChange],
  );

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem className="flex w-full flex-wrap items-center gap-2.5">
              {categories.map((category) => {
                const isChecked = field.value?.includes(category.value);
                return (
                  <FormItem
                    key={category.value}
                    className="flex flex-row items-start space-y-0 space-x-3"
                  >
                    <FormControl>
                      <Label className="flex cursor-pointer items-center gap-2.5 rounded-full bg-muted px-2.5 py-1.5">
                        <div>{category.label}</div>
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(checked, category.value, field)
                          }
                        />
                      </Label>
                    </FormControl>
                  </FormItem>
                );
              })}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const BlogsResult = ({ posts, categories }: BlogsResultProps) => {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    CATEGORIES[0].value,
  ]);
  const handleCategoryChange = useCallback((selected: string[]) => {
    setSelectedCategories(selected);
    setVisibleCount(POSTS_PER_PAGE);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE);
  }, []);
  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        selectedCategories.includes(post.category.toLowerCase()) ||
        selectedCategories.includes("all"),
    );
  }, [posts, selectedCategories]);

  const postsToDisplay = filteredPosts.length > 0 ? filteredPosts : posts;

  const hasMore = visibleCount < postsToDisplay.length;

  return (
    <div>
      <FilterForm
        categories={categories}
        onCategoryChange={handleCategoryChange}
      />
      <div className="flex w-full flex-col gap-4 py-8 lg:gap-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {postsToDisplay.slice(0, visibleCount).map((post) => (
            <BlogCard key={post.title} {...post} />
          ))}
        </div>
        <div className="flex justify-center">
          {hasMore && (
            <Button variant="secondary" onClick={handleLoadMore}>
              Load More
            </Button>
          )}
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
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              ) : null}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const BlogCard = ({ category, title, thumbnail, summary, link, cta }: Post) => {
  return (
    <a href={link} className="block h-full w-full">
      <Card className="size-full rounded-lg border py-0">
        <CardContent className="p-0">
          <div className="border-b p-2.5 text-sm leading-[1.2] font-medium text-muted-foreground">
            {category}
          </div>
          <AspectRatio ratio={1.520833333} className="overflow-hidden">
            <img
              src={thumbnail}
              alt={title}
              className="block size-full object-cover object-center"
            />
          </AspectRatio>
          <div className="flex w-full flex-col gap-5 p-5">
            <h2 className="text-lg leading-tight font-medium md:text-xl">
              {title}
            </h2>
            <div className="w-full max-w-[20rem]">
              <p className="text-sm leading-[1.4] font-medium text-muted-foreground">
                {summary}
              </p>
            </div>
            <div>
              <Button size="sm" variant="outline">
                {cta}
                <ArrowRight />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

interface Blog27Props {
  className?: string;
}

const Blog27 = ({ className }: Blog27Props) => {
  return (
    <section className={cn("pb-32", className)}>
      <div className="bg-muted bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/dot-pattern-2.svg')] bg-[length:3.125rem_3.125rem] bg-repeat">
        <div className="container flex flex-col items-start justify-start gap-16 py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col justify-between gap-12">
            <div className="flex w-full max-w-[36rem] flex-col gap-8">
              <BreadcrumbBlog breadcrumb={BREADCRUMB} />
              <div className="flex w-full flex-col gap-5">
                <h1 className="text-[2.5rem] leading-[1.2] font-semibold md:text-5xl lg:text-6xl">
                  Best Blog Articles
                </h1>
                <p className="text-xl leading-[1.4] text-muted-foreground">
                  The best blog is one that captivates readers with engaging,
                  well-researched content presented in a clear and relatable
                  way.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[27.5rem]">
            <BlogCard {...PRIMARY_POST} />
          </div>
        </div>
      </div>
      <div className="py-20">
        <div className="container flex flex-col gap-8">
          <h2 className="text-[1.75rem] leading-none font-medium md:text-[2.25rem] lg:text-[2rem]">
            All Blogs
          </h2>
          <div>
            <BlogsResult posts={POSTS} categories={CATEGORIES} />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Blog27 };

```

```tsx
"use client";

import { cn } from "@/lib/utils";
interface Post {
  date: string;
  author: string;
  title: string;
  image: string;
  link: string;
  description: string;
}

const posts: Post[] = [
  {
    date: "June 15, 2024",
    author: "Alex Johnson",
    title: "The Future of AI: How Machine Learning is Transforming Industries",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    link: "#",
    description:
      "Explore how artificial intelligence and machine learning technologies are revolutionizing various industries, from healthcare to manufacturing, and learn about the latest innovations shaping our future.",
  },
  {
    date: "June 12, 2024",
    author: "Maya Patel",
    title: "Principles of Minimalist Design: Less is More in Modern UX/UI",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    link: "#",
    description:
      "Discover the principles of minimalist design and how they can help you create more intuitive and user-friendly interfaces.",
  },
  {
    date: "June 10, 2024",
    author: "David Chen",
    title:
      "Remote Work Revolution: How Companies are Adapting to the New Normal",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    link: "#",
    description:
      "Explore the benefits and challenges of remote work and how companies are adapting to the new normal.",
  },
  {
    date: "June 8, 2024",
    author: "Sarah Williams",
    title: "Building Scalable Applications with Microservices Architecture",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    link: "#",
    description:
      "Learn how microservices architecture can help you build scalable and maintainable applications.",
  },
  {
    date: "June 5, 2024",
    author: "James Rodriguez",
    title: "Content Marketing Strategies That Drive Organic Traffic in 2024",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    link: "#",
    description:
      "Discover effective content marketing strategies that can help you drive organic traffic and grow your audience in 2024.",
  },
];

interface Blog28Props {
  className?: string;
}

const Blog28 = ({ className }: Blog28Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-12 text-center text-4xl font-medium md:text-7xl">
          Latest Tech Blog
        </h1>

        <div className="xs:grid-cols-1 mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative md:row-span-2 lg:col-span-2">
            <a
              href={posts[0].link}
              className="block h-fit rounded-lg p-3 md:top-0"
            >
              <img
                src={posts[0].image}
                alt={posts[0].title}
                className="h-48 w-full rounded-lg object-cover hover:opacity-80 md:h-80 lg:h-96"
              />
              <div className="mt-5">
                <div className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground">
                  <time>{posts[0].date}</time>·<span>{posts[0].author}</span>
                </div>
                <h3 className="text-lg md:text-3xl lg:text-4xl">
                  {posts[0].title}
                </h3>
                <p className="mt-4 text-muted-foreground">
                  {posts[0].description}
                </p>
              </div>
            </a>
          </div>
          {posts.slice(1).map((post, idx) => (
            <a key={idx} href={post.link} className="rounded-lg p-3">
              <img
                src={post.image}
                alt={post.title}
                className="h-48 w-full rounded-lg object-cover hover:opacity-80"
              />
              <div className="mt-5">
                <div className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground">
                  <time>{post.date}</time>·<span>{post.author}</span>
                </div>
                <h3 className="text-lg">{post.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog28 };

```

```tsx
import { ArrowRightIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    date: "3rd Dec 2024",
    description:
      "Exploring the latest trends in frontend and backend technologies, including AI-powered coding tools and modern frameworks.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nubelson-fernandes-tAJYoec13xk-unsplash.jpg",
    imageAlt: "Developer working on code",
    href: "#",
  },
  {
    id: 2,
    title: "Mastering React Performance Optimization",
    date: "5th Dec 2024",
    description:
      "A deep dive into memoization, lazy loading, and efficient state management techniques for faster React applications.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jason-goodman-ZJlfUi5rTDU-unsplash.jpg",
    imageAlt: "Code on screen",
    href: "#",
  },
  {
    id: 3,
    title: "UI/UX Design Principles for 2025",
    date: "10th Dec 2024",
    description:
      "Key strategies for creating intuitive, beautiful interfaces that delight users and drive engagement in the coming year.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/studio-republic-fotKKqWNMQ4-unsplash.jpg",
    imageAlt: "UI/UX design sketches on paper",
    href: "#",
  },
];

interface Blog30Props {
  className?: string;
}

const Blog30 = ({ className }: Blog30Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <h1 className="mb-12 max-w-lg font-sans text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
          Discover Our Fresh Content
        </h1>

        <div className="flex flex-col">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              className="flex flex-col items-center gap-16 md:flex-row"
            >
              <div className="flex h-80 w-full items-center justify-center overflow-hidden rounded-3xl bg-muted md:w-140">
                <img
                  src={post.image}
                  className="h-full w-full object-cover"
                  alt={post.imageAlt}
                />
              </div>
              <Card className="border-none shadow-none">
                <CardContent className="p-0">
                  <div
                    className={cn(
                      "mb-5 flex h-90 items-start border-b py-10 md:mb-0 lg:gap-32",
                      index == 0 && "md:border-t",
                    )}
                  >
                    <div className="flex h-full w-full flex-col items-start justify-between pr-8">
                      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                        {post.date}
                      </p>
                    </div>
                    <div className="flex h-full w-full flex-col items-start justify-between gap-6">
                      <p className="text-lg leading-relaxed font-normal tracking-tight text-muted-foreground md:text-xl">
                        {post.description}
                      </p>
                      <Button
                        variant="ghost"
                        className="inline-flex items-center justify-center gap-4 px-0 text-primary transition-all ease-in-out hover:gap-6 hover:text-accent-foreground"
                      >
                        <a
                          href={post.href}
                          className="text-lg font-semibold tracking-tight"
                        >
                          Read
                        </a>
                        <ArrowRightIcon />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog30 };

```

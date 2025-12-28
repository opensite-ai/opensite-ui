```tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Slash } from "lucide-react";
import { Fragment, useCallback, useMemo, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
    label: "Reports",
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
  thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
};

const POSTS: Array<Post> = [
  {
    category: "Productivity",
    title: "5 VS Code Extensions That Will Save You Hours",
    summary:
      "Discover must-have extensions to boost your coding efficiency and streamline your workflow.",
    link: "#",
    cta: "Boost Your Editor",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Productivity",
    title: "Time Management for Developers: What Really Works",
    summary:
      "Learn proven strategies to avoid burnout and stay on top of your tasks without stress.",
    link: "#",
    cta: "Manage Your Time",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Productivity",
    title: "Automate Your Workflow with Task Runners",
    summary:
      "Use tools like Gulp, npm scripts, and GitHub Actions to automate repetitive development tasks.",
    link: "#",
    cta: "Automate Now",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Productivity",
    title: "Effective Daily Routines for Developers",
    summary:
      "Discover routines that top developers follow to stay productive, creative, and focused.",
    link: "#",
    cta: "Find Your Flow",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Productivity",
    title: "Master Git Like a Pro with These Shortcuts",
    summary:
      "Speed up your version control workflow with powerful Git aliases and tips.",
    link: "#",
    cta: "Speed Up Git",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Productivity",
    title: "Reducing Context Switching as a Developer",
    summary:
      "Minimize distractions and deep-dive into your code with focused work practices.",
    link: "#",
    cta: "Stay Focused",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Productivity",
    title: "Remote Work Setup: Tools for a Distraction-Free Environment",
    summary:
      "Set up your space and software stack for maximum productivity when working from home.",
    link: "#",
    cta: "Upgrade Your Setup",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Productivity",
    title: "Pomodoro for Coders: Does It Really Work?",
    summary:
      "A practical review of the Pomodoro technique and its effectiveness for software development.",
    link: "#",
    cta: "Try the Method",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Accessibility",
    title: "Why Accessibility Should Be Part of Your MVP",
    summary:
      "Making your product inclusive from day one improves usability and reach.",
    link: "#",
    cta: "Learn Why",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Accessibility",
    title: "Using ARIA Roles Correctly in Your Web App",
    summary:
      "Understand how to enhance screen reader support using ARIA roles and landmarks.",
    link: "#",
    cta: "Improve Semantics",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Accessibility",
    title: "Color Contrast Tips for Better Readability",
    summary:
      "Learn how to choose accessible color combinations that meet WCAG standards.",
    link: "#",
    cta: "Fix Your Colors",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Accessibility",
    title: "Keyboard Navigation: The Overlooked User Experience",
    summary:
      "Ensure your website is fully usable with just a keyboard, for accessibility and speed.",
    link: "#",
    cta: "Test Navigation",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Accessibility",
    title: "Accessible Forms: Labels, Errors & Feedback",
    summary:
      "Improve the usability of your forms by ensuring screen readers and users receive clear instructions.",
    link: "#",
    cta: "Fix Your Forms",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Accessibility",
    title: "Screen Reader Testing: A Beginner's Guide",
    summary:
      "How to test your site with popular screen readers and what to listen for.",
    link: "#",
    cta: "Start Testing",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Accessibility",
    title: "Inclusive Design Thinking in UI Development",
    summary:
      "Design interfaces that consider users of all abilities from the start.",
    link: "#",
    cta: "Design for All",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Accessibility",
    title: "Accessibility Audits: Tools and Checklists",
    summary:
      "Perform thorough accessibility audits with tools like Axe, Lighthouse, and manual checklists.",
    link: "#",
    cta: "Audit Now",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Performance",
    title: "Lazy Loading Images with Modern HTML",
    summary:
      "Improve load times by using native lazy-loading and fallback strategies for images.",
    link: "#",
    cta: "Optimize Images",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Performance",
    title: "Minifying JavaScript Without Breaking Your App",
    summary:
      "Best practices for minifying and tree-shaking your JS bundles to boost speed.",
    link: "#",
    cta: "Shrink Your Code",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Performance",
    title: "Web Vitals Explained: CLS, LCP, FID",
    summary:
      "Learn how to measure and improve Core Web Vitals for a better user experience.",
    link: "#",
    cta: "Improve Vitals",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Performance",
    title: "Server-Side Rendering vs Client-Side: Which is Faster?",
    summary:
      "Compare SSR and CSR strategies and when to use each for better performance.",
    link: "#",
    cta: "Explore Options",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Performance",
    title: "Optimizing Fonts for Faster Page Loads",
    summary:
      "Learn techniques for loading fonts without blocking rendering or causing layout shifts.",
    link: "#",
    cta: "Speed Up Fonts",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Performance",
    title: "Reduce JavaScript Bundle Size with Code Splitting",
    summary:
      "Use dynamic imports and route-based chunking to reduce initial load time.",
    link: "#",
    cta: "Split It Up",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Performance",
    title: "Caching Strategies for Modern Web Apps",
    summary:
      "Leverage HTTP caching, service workers, and CDNs to improve speed and offline support.",
    link: "#",
    cta: "Cache Smarter",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    category: "Performance",
    title: "Analyzing Performance Bottlenecks with Chrome DevTools",
    summary:
      "Use the Performance tab in DevTools to track down and fix runtime issues in your app.",
    link: "#",
    cta: "Analyze Now",
    thumbnail: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
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

const ResourcesResult = ({ posts, categories }: BlogsResultProps) => {
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
      <div className="flex w-full flex-col gap-4 py-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {postsToDisplay.slice(0, visibleCount).map((post) => (
            <ResourcesCard key={post.title} {...post} />
          ))}
        </div>
        {hasMore && (
          <Button
            className="w-full"
            variant="secondary"
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        )}
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

const EmailFormSchema = z
  .object({
    email: z.email({
      error: "Invalid email address",
    }),
  })
  .required({ email: true });

const EmailForm = () => {
  const form = useForm<z.infer<typeof EmailFormSchema>>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof EmailFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="w-full">
                  <div className="relative flex w-full flex-col gap-2 lg:block">
                    <Input
                      {...field}
                      type="email"
                      id="emailInput"
                      placeholder="What's your work email?"
                      className="h-fit bg-background py-4 pr-5 pl-5 lg:pr-[13.75rem]"
                    />
                    <div className="top-1/2 right-2.5 lg:absolute lg:-translate-y-1/2">
                      <Button
                        type="submit"
                        className="w-full rounded-full lg:w-fit"
                      >
                        See Company in action
                        <ArrowRight />
                      </Button>
                    </div>
                  </div>
                  <FormMessage className="py-1" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const ResourcesCard = ({
  category,
  title,
  thumbnail,
  summary,
  link,
  cta,
}: Post) => {
  return (
    <a href={link} className="block h-full w-full">
      <Card className="size-full border py-0">
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
            <h2 className="text-lg leading-none font-bold md:text-2xl">
              {title}
            </h2>
            <div className="w-full max-w-[20rem]">
              <p className="text-sm leading-[1.4] font-medium text-foreground">
                {summary}
              </p>
            </div>
            <div>
              <Badge className="rounded-full">
                {cta}
                <ArrowRight />
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

interface Resources1Props {
  className?: string;
}

const Resources1 = ({ className }: Resources1Props) => {
  return (
    <section className={cn("pb-32", className)}>
      <div className="bg-muted bg-[url('https://cdn.ing/assets/files/record/286189/arez6gd2s7isn9i1o6c7sexdq7bl')] bg-size-[3.125rem_3.125rem] bg-repeat">
        <div className="container flex flex-col items-start justify-start gap-16 py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col justify-between gap-12">
            <div className="flex w-full max-w-xl flex-col gap-8">
              <BreadcrumbBlog breadcrumb={BREADCRUMB} />
              <div className="flex w-full flex-col gap-5">
                <h1 className="text-[2.5rem] leading-[1.2] font-semibold md:text-5xl lg:text-6xl">
                  Explore Reports
                </h1>
                <p className="text-xl leading-[1.4] font-semibold text-foreground">
                  The best Reports is one that captivates readers with engaging,
                  well-researched content presented in a clear and relatable
                  way.
                </p>
              </div>
              <div className="max-w-120">
                <EmailForm />
              </div>
            </div>
          </div>
          <div className="w-full max-w-110">
            <ResourcesCard {...PRIMARY_POST} />
          </div>
        </div>
      </div>
      <div className="py-20">
        <div className="container flex flex-col gap-8">
          <h2 className="text-[1.75rem] leading-none font-medium md:text-[2.25rem] lg:text-[2rem]">
            All Reports
          </h2>
          <div>
            <ResourcesResult posts={POSTS} categories={CATEGORIES} />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Resources1 };

```

```tsx
"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = ["All", "Data", "AI", "Security", "News"];

interface Blog {
  title: string;
  category: Exclude<(typeof categories)[number], "All">;
  date: string;
  author: string[];
  link: string;
}

const blogs: Blog[] = [
  {
    title:
      "Exploring the Depths of Modern Data Analytics Techniques and Applications",
    category: "Data",
    date: "Dec 4, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title:
      "Navigating the Complex Landscape of Artificial Intelligence and Advanced Machine Learning",
    category: "AI",
    date: "Dec 3, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp", "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"],
    link: "#",
  },
  {
    title:
      "Fortifying Digital Defenses: Implementing Advanced Cybersecurity Strategies for Modern Enterprises",
    category: "Security",
    date: "Dec 2, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp", "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"],
    link: "#",
  },
  {
    title:
      "Understanding and Exploring Distributed Computing Architectures and Concepts",
    category: "Data",
    date: "Dec 1, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp"],
    link: "#",
  },
  {
    title:
      "Recent Significant Scientific Breakthroughs in Advanced Quantum Technology Research",
    category: "News",
    date: "Nov 30, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp", "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp"],
    link: "#",
  },
  {
    title:
      "Applying Practical Machine Learning Techniques in Real-World Business Scenarios and Use Cases",
    category: "AI",
    date: "Nov 29, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp", "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"],
    link: "#",
  },
  {
    title:
      "Developing Effective Strategies for Optimal Database Performance Tuning and Optimization",
    category: "Data",
    date: "Nov 28, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp", "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"],
    link: "#",
  },
  {
    title:
      "Implementing and Enforcing Robust Zero Trust Security Principles Across the Entire Organization",
    category: "Security",
    date: "Nov 27, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"],
    link: "#",
  },
  {
    title:
      "A Comprehensive Guide to Modern Serverless Computing Architectures and Development",
    category: "AI",
    date: "Nov 26, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp", "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"],
    link: "#",
  },
  {
    title:
      "Industry News: The Very Latest Updates on Network Innovations and Emerging Technologies",
    category: "News",
    date: "Nov 25, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title:
      "The Evolution of Big Data Analytics: From Historical Insights to Predictive Models",
    category: "Data",
    date: "Nov 24, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp", "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp"],
    link: "#",
  },
  {
    title:
      "Emerging Trends in Natural Language Processing and Conversational AI",
    category: "AI",
    date: "Nov 23, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"],
    link: "#",
  },
  {
    title: "Blockchain Security: Protecting Digital Assets in the Modern Era",
    category: "Security",
    date: "Nov 22, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp", "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp"],
    link: "#",
  },
  {
    title:
      "Breaking News: Revolutionary Advances in Quantum Computing Applications",
    category: "News",
    date: "Nov 21, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
  {
    title: "Real-time Analytics: Processing and Visualizing Streaming Data",
    category: "Data",
    date: "Nov 20, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp", "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"],
    link: "#",
  },
  {
    title: "Deep Learning Architectures for Computer Vision Applications",
    category: "AI",
    date: "Nov 19, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"],
    link: "#",
  },
  {
    title: "Advanced Threat Detection: Using AI for Cybersecurity Defense",
    category: "Security",
    date: "Nov 18, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp", "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"],
    link: "#",
  },
  {
    title: "Latest Developments in Cloud-Native Data Processing Technologies",
    category: "News",
    date: "Nov 17, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp", "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"],
    link: "#",
  },
  {
    title: "Machine Learning Operations: Streamlining AI Development Workflows",
    category: "AI",
    date: "Nov 16, 2024",
    author: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp"],
    link: "#",
  },
  {
    title: "Data Privacy Regulations: Ensuring Compliance in Global Operations",
    category: "Security",
    date: "Nov 15, 2024",
    author: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    ],
    link: "#",
  },
];

interface Resources2Props {
  className?: string;
}

const Resources2 = ({ className }: Resources2Props) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = blogs.filter(
    (blog) => selectedCategory === "All" || blog.category === selectedCategory,
  );

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="text-4xl font-medium sm:text-6xl md:text-7xl">
          Resources & Whitepapers
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our thoughts and perspectives on key topics.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <a
            href="#"
            className="group relative isolate overflow-hidden rounded-2xl border border-border transition-transform duration-300 hover:-translate-y-0.5 lg:col-span-7 lg:row-span-2"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-ba454dc72896-unsplash.jpg"
              alt="placeholder"
              className="size-full max-h-[550px] object-cover grayscale-100 transition-all duration-300 group-hover:grayscale-50"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary to-transparent" />
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
              <Badge className="border border-background/20 bg-background/15 backdrop-blur-sm">
                <Sparkles className="size-4" />
                Featured Article
              </Badge>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-medium text-background">
                  Getting Started With Modern Digital Platforms and
                  Infrastructure
                </h2>
                <div className="flex items-center gap-2">
                  <time className="text-sm text-background/80">
                    Dec 4, 2024
                  </time>
                  <div className="flex items-center -space-x-2">
                    <Avatar className="size-6 border border-primary">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                    </Avatar>
                    <Avatar className="size-6 border border-primary">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp" />
                    </Avatar>
                    <Avatar className="size-6 border border-primary">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp" />
                    </Avatar>
                    <span className="z-10 grid size-6 place-items-center rounded-full border border-primary bg-primary/90 text-xs text-background backdrop-blur-sm">
                      +2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div className="flex flex-col gap-4 lg:col-span-5 lg:row-span-2 lg:flex-col">
            <a
              href="#"
              className="group relative isolate overflow-hidden rounded-2xl border border-border transition-transform duration-300 hover:-translate-y-0.5"
            >
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-duxeKbu9FDE-unsplash.jpg"
                alt="placeholder"
                className="size-full max-h-[267px] object-cover grayscale-100 transition-all duration-300 group-hover:grayscale-50"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary to-transparent" />
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
                <Badge className="border border-background/20 bg-background/15 backdrop-blur-sm">
                  Latest
                </Badge>
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-medium text-background">
                    Streamlining Business Operations Through Effective Workflow
                    Automation
                  </h2>
                  <div className="flex items-center gap-2">
                    <time className="text-sm text-background/80">
                      Feb 12, 2024
                    </time>
                    <Avatar className="size-6 border border-primary">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                    </Avatar>
                  </div>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="group relative isolate overflow-hidden rounded-2xl border border-border transition-transform duration-300 hover:-translate-y-0.5"
            >
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-zr8IvMz0OWk-unsplash.jpg"
                alt="placeholder"
                className="size-full max-h-[267px] object-cover grayscale-100 transition-all duration-300 group-hover:grayscale-50"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary to-transparent" />
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
                <Badge className="border border-background/20 bg-background/15 backdrop-blur-sm">
                  Latest
                </Badge>
                <div className="flex flex-col gap-4">
                  <h2 className="text-xl font-medium text-background">
                    Boosting Overall Efficiency: How We Significantly Improved
                    Search Performance
                  </h2>
                  <div className="flex items-center gap-2">
                    <time className="text-sm text-background/80">
                      Apr 1, 2025
                    </time>
                    <Avatar className="size-6 border border-primary">
                      <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
                    </Avatar>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="mt-24">
          <h2 className="mb-6 text-2xl font-medium md:text-3xl">
            Latest updates
          </h2>
          <Tabs
            defaultValue="All"
            className="border-b border-border"
            onValueChange={setSelectedCategory}
          >
            <TabsList className="flex h-auto gap-2 bg-background p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="group relative py-2.5 uppercase data-[state=active]:shadow-none"
                >
                  {category}
                  <span className="absolute -bottom-px group-data-[state=active]:h-px group-data-[state=active]:w-full group-data-[state=active]:bg-primary" />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="mt-4">
            {filteredBlogs.map((blog, idx) => (
              <a
                key={idx}
                href={blog.link}
                className="flex flex-col justify-between gap-4 border-b border-border py-6 md:flex-row"
              >
                <h3 className="font-medium md:line-clamp-1">{blog.title}</h3>
                <div className="flex w-full shrink-0 grid-cols-3 justify-between gap-2 md:grid md:max-w-80">
                  <p className="text-sm text-muted-foreground">
                    {blog.category}
                  </p>
                  <time className="text-sm text-muted-foreground">
                    {blog.date}
                  </time>
                  <div className="hidden items-center justify-end -space-x-2 md:flex">
                    {blog.author.map((author, idx) => (
                      <Avatar key={idx} className="size-6 border border-border">
                        <AvatarImage src={author} />
                      </Avatar>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Resources2 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturedPostData {
  title: string;
  imageUrl: string;
  link: string;
}
const FEATURED_POST: FeaturedPostData = {
  title: "How to Build Reusable UI Component Blocks for Beginners",
  imageUrl: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  link: "#",
};
const ARTICLES = [
  {
    date: "Jan 02, 2025",
    category: "Design Systems",
    link: "#",
    title: "Mastering Reusable UI Block Patterns in React Applications",
  },
  {
    date: "Jan 03, 2025",
    category: "Best Practices",
    link: "#",
    title: "10 Common Mistakes to Avoid When Building UI Components",
  },
  {
    date: "Jan 04, 2025",
    category: "Components",
    link: "#",
    title: "A Step-by-Step Guide to Creating Flexible Card Blocks",
  },
  {
    date: "Jan 05, 2025",
    category: "Accessibility",
    link: "#",
    title: "Ensuring Accessibility in Custom UI Block Components",
  },
  {
    date: "Jan 06, 2025",
    category: "Performance",
    link: "#",
    title: "How to Optimize UI Blocks for Speed and Efficiency",
  },
  {
    date: "Jan 07, 2025",
    category: "Frameworks",
    link: "#",
    title: "Building Scalable UI Blocks with Tailwind and Headless UI",
  },
  {
    date: "Jan 08, 2025",
    category: "Design Systems",
    link: "#",
    title: "Creating Consistent UI Blocks Across a Shared Design System",
  },
  {
    date: "Jan 09, 2025",
    category: "React",
    link: "#",
    title: "Why React Is the Best Tool for Component-Based UI Blocks",
  },
];

interface Resources3Props {
  className?: string;
}

const Resources3 = ({ className }: Resources3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <FeaturedPost {...FEATURED_POST} />
        <div className="flex w-full flex-col gap-4">
          <h2 className="mt-16 text-xl font-semibold">Resources</h2>
          <div className="">
            {ARTICLES.map((article, index) => (
              <a
                href={article.link}
                key={index}
                className="block w-full hover:bg-foreground/10"
              >
                <div className="flex flex-col items-baseline justify-between gap-2 border-t py-6 text-foreground md:flex-row">
                  <div className="basis-1/4 font-medium">{article.date}</div>
                  <div className="basis-1/4">{article.category}</div>
                  <div className="basis-1/2 text-muted-foreground">
                    {article.title}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedPost = ({ title, imageUrl, link }: FeaturedPostData) => {
  return (
    <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10 xl:flex-row">
      <div className="basis-full lg:basis-1/2">
        <div className="flex flex-col gap-5">
          <Badge variant="outline" className="bg-background">
            Featured Resource
          </Badge>
          <h2 className="text-2xl leading-[1.2] font-normal text-foreground md:text-[2.5rem] xl:text-[3.125rem]">
            {title}
          </h2>
          <div>
            <Button
              asChild
              className="group relative mt-5 !px-6 transition-all hover:!pr-8 hover:!pl-4"
            >
              <a href={link}>
                Read more
                <ArrowRight className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 transition-all group-hover:translate-x-1.5 group-hover:opacity-100" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="basis-full lg:basis-1/2">
        <div className="mx-auto aspect-[1.782729805] w-full max-w-[40rem] overflow-hidden rounded-2xl">
          <img
            src={imageUrl}
            alt={title}
            className="block size-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export { Resources3 };

```

```tsx
import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const news = [
  {
    title: "TechFlow AI Platform now available on Azure Marketplace",
    category: "Partnership",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    date: "June 15, 2024",
    link: "#",
  },
  {
    title: "CodeSphere: the journey behind our latest developer tool",
    category: "Press release",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    date: "June 10, 2024",
    link: "#",
  },
  {
    title:
      "DataViz & CloudNative announce collaboration on next-gen analytics tools",
    category: "Partnership",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    date: "May 28, 2024",
    link: "#",
  },
  {
    title:
      "QuantumByte launches EdgeCompute: a revolutionary edge computing platform",
    category: "News",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    date: "May 12, 2024",
    link: "#",
  },
  {
    title: "Join us at DevCon Global Summit 2024 in Berlin",
    category: "Press release",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    date: "May 5, 2024",
    link: "#",
  },
];

interface Resources4Props {
  className?: string;
}

const Resources4 = ({ className }: Resources4Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:gap-2">
          <div className="flex w-full max-w-56 items-center gap-3 text-sm">
            <span className="size-2 rounded-full bg-primary"></span>
            Resources
          </div>
          <div className="flex-1">
            <h2 className="text-3xl">
              Stay in the loop?
              <br />
              <span className="text-primary/50">
                Discover our recent updates.
              </span>
            </h2>
            <div className="mt-14">
              <Separator />
              {news.map((item, idx) => (
                <Fragment key={idx}>
                  <a
                    href={item.link}
                    className="group flex flex-col justify-between gap-10 py-6 transition-all duration-400 lg:flex-row lg:items-center lg:hover:bg-muted"
                  >
                    <div className="flex items-center gap-2 text-lg transition-all duration-400 lg:group-hover:translate-x-8">
                      <p className="inline text-pretty text-primary">
                        {item.title}
                        <ArrowRight className="ml-2 inline size-4 shrink-0 opacity-0 transition-all duration-400 lg:group-hover:text-primary lg:group-hover:opacity-100" />
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-between transition-all duration-400 lg:max-w-72 lg:group-hover:-translate-x-4 xl:max-w-80">
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-7 rounded-full border border-border">
                          <AvatarImage src={item.avatar} />
                        </Avatar>
                        <time className="text-xs text-muted-foreground">
                          {item.date}
                        </time>
                      </div>
                    </div>
                  </a>
                  <Separator />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Resources4 };

```

```tsx
import { ArrowRight, BookOpen, Play, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Resources5Props {
  courses: Array<{
    badge?: string;
    title: string;
    description: string;
    author: {
      name: string;
      title: string;
      avatar: string;
      className?: string;
    };
    image: string;
    lessons: number;
    videos: number;
    duration: string;
    audience: string[];
    gradient: string;
    cta: {
      text: string;
      url: string;
    };
  }>;
  className?: string;
}

const Resources5 = ({
  className,
  courses = [
    {
      badge: "Course",
      title: "Master Sanity Studio Fundamentals",
      description:
        "Learn the core concepts of Sanity Studio, from schema design to content modeling. Build your first content management system with hands-on exercises and real-world examples.",
      author: {
        name: "Alex Chen",
        title: "Senior Developer at Sanity",
        avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      },
      lessons: 12,
      videos: 15,
      duration: "42:18 minutes",
      audience: ["Developers", "Content creators"],
      gradient: "from-blue-100 to-purple-100",
      image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
      cta: {
        text: "Start",
        url: "https://www.shadcnblocks.com",
      },
    },
    {
      badge: "Course",
      title: "Advanced Content Operations",
      description:
        "Dive deep into advanced Sanity features including custom input components, validation rules, and performance optimization. Learn to build scalable content workflows for enterprise applications.",
      author: {
        name: "Maria Rodriguez",
        title: "Lead Content Strategist",
        avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      },
      lessons: 18,
      videos: 22,
      duration: "58:45 minutes",
      audience: ["Developers", "Content creators", "Designers"],
      gradient: "from-green-100 to-emerald-100",
      image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
      cta: {
        text: "Start",
        url: "https://www.shadcnblocks.com",
      },
    },
  ],
}: Resources5Props) => {
  return (
    <section className={cn("bg-background py-16", className)}>
      <div className="flex flex-col gap-8">
        {courses.map((course) => (
          <div
            key={course.title}
            className="relative flex flex-col gap-8 border-t-1 border-border py-16 md:p-8"
          >
            <div className="container grid grid-cols-1 gap-10 md:grid-cols-2">
              {/* Left Content */}
              <div className="flex flex-col gap-4">
                {/* Course Type Badge */}
                <div className="">
                  <Badge variant="secondary" className="rounded-none uppercase">
                    {course.badge}
                  </Badge>
                </div>

                {/* Course Title */}
                <h3 className="text-2xl font-bold">{course.title}</h3>

                {/* Course Meta */}
                <div className="space-y-2 text-sm text-foreground/90">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{course.audience.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    <span>
                      {course.videos} Videos, {course.duration}
                    </span>
                  </div>
                </div>

                {/* Course Description */}
                <p className="text-lg leading-relaxed">{course.description}</p>

                {/* Author */}
                <div className="">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 border xl:size-12">
                      <AvatarImage src={course.author.avatar} />
                      <AvatarFallback>{course.author.name}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{course.author.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {course.author.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <a
                  href={course.cta.url}
                  className="group/btn flex w-fit items-center gap-2 border-l-1 border-border p-1 hover:bg-accent"
                >
                  <span className="font-medium">{course.cta.text}</span>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>

              {/* Right Visual Element */}
              <div>
                <div
                  className={`group grid aspect-video w-full place-items-center bg-linear-to-br ${course.gradient} rounded-lg pt-6 pr-8 transition duration-200 ease-out hover:scale-[1.03] hover:-rotate-2 dark:from-muted dark:to-muted/50`}
                >
                  <div className="shadow-duo col-start-1 row-start-1 flex aspect-square w-24 origin-top-left rotate-[-6deg] rounded-md border border-border bg-muted/50 transition duration-500 ease-out group-hover:scale-[1.1] group-hover:rotate-[-2deg] lg:w-32"></div>
                  <div className="col-start-1 row-start-1 flex aspect-square w-24 origin-top-left rotate-[-8deg] rounded-md border border-border bg-muted/50 transition duration-500 ease-out group-hover:scale-[1.1] group-hover:rotate-[-8deg] lg:w-32"></div>
                  <div className="shadow-duo col-start-1 row-start-1 flex aspect-square w-24 origin-top-left rotate-[-10deg] rounded-md border border-border bg-card transition duration-500 ease-out group-hover:scale-[1.1] group-hover:rotate-[-14deg] lg:w-32">
                    <div className="m-4 h-4 w-4 rounded-full bg-muted shadow-inner"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export { Resources5 };

```


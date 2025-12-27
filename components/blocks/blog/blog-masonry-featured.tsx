"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface BlogPost {
  date: string;
  author: string;
  title: string;
  image: string;
  link: string;
  description?: string;
}

export interface BlogMasonryFeaturedProps {
  className?: string;
  title?: string;
  posts?: BlogPost[];
  optixFlowConfig?: { apiKey: string; compression?: number };
}

const defaultPosts: BlogPost[] = [
  {
    date: "June 15, 2024",
    author: "Alex Johnson",
    title: "The Future of AI: How Machine Learning is Transforming Industries",
    image: imagePlaceholders[0],
    link: "#",
    description:
      "Explore how artificial intelligence and machine learning technologies are revolutionizing various industries, from healthcare to manufacturing, and learn about the latest innovations shaping our future.",
  },
  {
    date: "June 12, 2024",
    author: "Maya Patel",
    title: "Principles of Minimalist Design: Less is More in Modern UX/UI",
    image: imagePlaceholders[1],
    link: "#",
    description:
      "Discover the principles of minimalist design and how they can help you create more intuitive and user-friendly interfaces.",
  },
  {
    date: "June 10, 2024",
    author: "David Chen",
    title:
      "Remote Work Revolution: How Companies are Adapting to the New Normal",
    image: imagePlaceholders[2],
    link: "#",
    description:
      "Explore the benefits and challenges of remote work and how companies are adapting to the new normal.",
  },
  {
    date: "June 8, 2024",
    author: "Sarah Williams",
    title: "Building Scalable Applications with Microservices Architecture",
    image: imagePlaceholders[3],
    link: "#",
    description:
      "Learn how microservices architecture can help you build scalable and maintainable applications.",
  },
  {
    date: "June 5, 2024",
    author: "James Rodriguez",
    title: "Content Marketing Strategies That Drive Organic Traffic in 2024",
    image: imagePlaceholders[4],
    link: "#",
    description:
      "Discover effective content marketing strategies that can help you drive organic traffic and grow your audience in 2024.",
  },
];

const defaultProps: Partial<BlogMasonryFeaturedProps> = {
  title: "Latest Tech Blog",
  posts: defaultPosts,
};

export function BlogMasonryFeatured({
  className,
  title = defaultProps.title,
  posts = defaultProps.posts,
  optixFlowConfig,
}: BlogMasonryFeaturedProps) {
  const featuredPost = posts?.[0];
  const otherPosts = posts?.slice(1);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-12 text-center text-4xl font-medium md:text-7xl">
          {title}
        </h1>

        <div className="xs:grid-cols-1 mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPost && (
            <div className="relative md:row-span-2 lg:col-span-2">
              <Pressable
                href={featuredPost.link}
                className="block h-fit rounded-lg p-3 md:top-0"
              >
                <Img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-48 w-full rounded-lg object-cover hover:opacity-80 md:h-80 lg:h-96"
                  optixFlowConfig={optixFlowConfig}
                />
                <div className="mt-5">
                  <div className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground">
                    <time>{featuredPost.date}</time>·
                    <span>{featuredPost.author}</span>
                  </div>
                  <h3 className="text-lg md:text-3xl lg:text-4xl">
                    {featuredPost.title}
                  </h3>
                  {featuredPost.description && (
                    <p className="mt-4 text-muted-foreground">
                      {featuredPost.description}
                    </p>
                  )}
                </div>
              </Pressable>
            </div>
          )}
          {otherPosts?.map((post, idx) => (
            <Pressable key={idx} href={post.link} className="rounded-lg p-3">
              <Img
                src={post.image}
                alt={post.title}
                className="h-48 w-full rounded-lg object-cover hover:opacity-80"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="mt-5">
                <div className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground">
                  <time>{post.date}</time>·<span>{post.author}</span>
                </div>
                <h3 className="text-lg">{post.title}</h3>
              </div>
            </Pressable>
          ))}
        </div>
      </div>
    </section>
  );
}

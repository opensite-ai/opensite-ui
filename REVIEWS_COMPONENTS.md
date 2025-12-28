```tsx
import { BadgeCheck } from "lucide-react";

import { cn } from "@/lib/utils";

import { Rating } from "@/components/shadcnblocks/rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  verified?: boolean;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "1",
    rating: 5,
    title: "Exceeded my expectations",
    content:
      "I was a bit skeptical at first, but this product really delivered. The quality is outstanding and it arrived faster than expected. Would definitely recommend to anyone on the fence.",
    author: {
      name: "Sarah M.",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    },
    date: "Dec 10, 2024",
    verified: true,
  },
  {
    id: "2",
    rating: 4,
    title: "Great value for money",
    content:
      "Solid product overall. Does exactly what it's supposed to do. Took off one star because the packaging could be better, but the product itself is great.",
    author: {
      name: "James R.",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    },
    date: "Dec 8, 2024",
    verified: true,
  },
  {
    id: "3",
    rating: 5,
    title: "Perfect for everyday use",
    content:
      "I've been using this daily for a month now and it still looks and works like new. The build quality is impressive at this price point. Already bought one for my sister.",
    author: {
      name: "Emily K.",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    },
    date: "Dec 5, 2024",
    verified: true,
  },
  {
    id: "4",
    rating: 4,
    title: "Good but not perfect",
    content:
      "The product is nice and works well. My only minor complaint is that the color is slightly different from the photos, but it's still a great purchase overall.",
    author: {
      name: "Michael T.",
    },
    date: "Dec 2, 2024",
    verified: false,
  },
  {
    id: "5",
    rating: 5,
    title: "Best purchase I've made this year",
    content:
      "Absolutely love it! The attention to detail is remarkable. Customer service was also very helpful when I had questions. Five stars all around.",
    author: {
      name: "Lisa P.",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    },
    date: "Nov 28, 2024",
    verified: true,
  },
];

interface Reviews1Props {
  reviews?: Review[];
  title?: string;
  className?: string;
}

const Reviews1 = ({
  reviews = DEFAULT_REVIEWS,
  title = "Customer Reviews",
  className,
}: Reviews1Props) => {
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
          <div className="mt-2 flex items-center gap-3">
            <Rating rate={averageRating} className="[&_svg]:size-5" />
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} out of 5 · {reviews.length} reviews
            </span>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-0">
          {reviews.map((review, index) => (
            <div key={review.id}>
              {index > 0 && <Separator className="my-6" />}
              <div className="space-y-3">
                {/* Rating & Title */}
                <div>
                  <Rating rate={review.rating} className="[&_svg]:size-4" />
                  <h3 className="mt-2 font-medium">{review.title}</h3>
                </div>

                {/* Content */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {review.content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={review.author.avatar}
                      alt={review.author.name}
                    />
                    <AvatarFallback className="text-xs">
                      {review.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{review.author.name}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-emerald-600">
                        <BadgeCheck className="size-4" />
                        <span className="text-xs">Verified Purchase</span>
                      </span>
                    )}
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Reviews1 };


```

```tsx
"use client";

import { BadgeCheck, ThumbsUp } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Rating } from "@/components/shadcnblocks/rating";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  verified?: boolean;
  images?: string[];
  helpful?: number;
  variant?: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "1",
    rating: 5,
    title: "Absolutely stunning quality",
    content:
      "The craftsmanship on this is incredible. Photos don't do it justice - it looks even better in person. The material feels premium and the fit is perfect. I've already gotten so many compliments!",
    author: {
      name: "Sarah M.",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    },
    date: "Dec 10, 2024",
    verified: true,
    images: [
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Person-in-Activewear-1.png",
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Fashionable-Woman-in-Monochrome-Attire-1.png",
    ],
    helpful: 24,
    variant: "Size M, Navy Blue",
  },
  {
    id: "2",
    rating: 4,
    title: "Great product, minor sizing issue",
    content:
      "Love the quality and design. Runs slightly small so I'd recommend sizing up. Other than that, it's exactly what I was looking for. Fast shipping too!",
    author: {
      name: "James R.",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    },
    date: "Dec 8, 2024",
    verified: true,
    helpful: 18,
    variant: "Size L, Black",
  },
  {
    id: "3",
    rating: 5,
    title: "My new favorite!",
    content:
      "I've been searching for something like this for months. The attention to detail is amazing - from the stitching to the hardware, everything is top notch. Worth every penny.",
    author: {
      name: "Emily K.",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    },
    date: "Dec 5, 2024",
    verified: true,
    images: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/elegant-peach-scarf.png"],
    helpful: 31,
    variant: "One Size, Cream",
  },
  {
    id: "4",
    rating: 5,
    title: "Exceeded expectations",
    content:
      "Was hesitant to order online but so glad I did. The color is exactly as shown and the quality is exceptional. Customer service was also very responsive when I had questions about care instructions.",
    author: {
      name: "Michael T.",
    },
    date: "Dec 2, 2024",
    verified: false,
    helpful: 12,
  },
  {
    id: "5",
    rating: 4,
    title: "Beautiful but pricey",
    content:
      "The product is gorgeous and well-made. I debated for a while because of the price, but ultimately happy with my purchase. Would love to see more color options in the future.",
    author: {
      name: "Lisa P.",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    },
    date: "Nov 28, 2024",
    verified: true,
    images: ["https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/accessories/Elegant-Gold-Earrings-1.png"],
    helpful: 8,
    variant: "Gold",
  },
];

interface Reviews3Props {
  reviews?: Review[];
  title?: string;
  className?: string;
}

const Reviews3 = ({
  reviews = DEFAULT_REVIEWS,
  title = "Customer Reviews",
  className,
}: Reviews3Props) => {
  const [helpfulClicked, setHelpfulClicked] = useState<Set<string>>(new Set());

  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  const handleHelpful = (reviewId: string) => {
    setHelpfulClicked((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {title}
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <Rating rate={averageRating} className="[&_svg]:size-5" />
              <span className="text-lg font-semibold">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                ({totalReviews} reviews)
              </span>
            </div>
          </div>
          <Button variant="outline">Write a Review</Button>
        </div>

        {/* Reviews */}
        <div className="space-y-0">
          {reviews.map((review, index) => (
            <div key={review.id}>
              {index > 0 && <Separator className="my-6" />}
              <Card className="border-0 p-0 shadow-none">
                <CardContent className="space-y-4 p-0">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage
                          src={review.author.avatar}
                          alt={review.author.name}
                        />
                        <AvatarFallback>
                          {review.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {review.author.name}
                          </span>
                          {review.verified && (
                            <span className="flex items-center gap-1 text-emerald-600">
                              <BadgeCheck className="size-4" />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{review.date}</span>
                          {review.variant && (
                            <>
                              <span>·</span>
                              <span>{review.variant}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Rating
                      rate={review.rating}
                      className="[&_svg]:size-4 [&>div]:size-4"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-medium">{review.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {review.content}
                    </p>
                  </div>

                  {/* Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2">
                      {review.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="size-20 overflow-hidden rounded-lg sm:size-24"
                        >
                          <AspectRatio ratio={1}>
                            <img
                              src={image}
                              alt={`Review image ${imgIndex + 1}`}
                              className="size-full object-cover"
                            />
                          </AspectRatio>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Helpful */}
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 gap-1.5 text-muted-foreground",
                        helpfulClicked.has(review.id) && "text-foreground",
                      )}
                      onClick={() => handleHelpful(review.id)}
                    >
                      <ThumbsUp
                        className={cn(
                          "size-4",
                          helpfulClicked.has(review.id) && "fill-current",
                        )}
                      />
                      Helpful
                      {review.helpful !== undefined && (
                        <span>
                          (
                          {review.helpful +
                            (helpfulClicked.has(review.id) ? 1 : 0)}
                          )
                        </span>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-muted-foreground"
                    >
                      Report
                    </Button>
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

export { Reviews3 };

```

```tsx
"use client";

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const FEATURED_TESTIMONIAL = {
  name: "Alexandra Chen",
  role: "VP of Product",
  company: "TechCorp",
  image:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
  logo: "https://v3.material-tailwind.com/logo/google.svg",
  rating: 5,
  quote:
    "This platform has completely transformed how we build products. Our team's productivity increased by 150% in just three months. The support is exceptional and the features keep getting better.",
};

const TESTIMONIALS = [
  {
    name: "Marcus Johnson",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Best investment we made this year.",
  },
  {
    name: "Emily Rodriguez",
    role: "Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Intuitive, powerful, and beautiful. Perfect combination.",
  },
  {
    name: "David Park",
    role: "Founder",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Game-changer for our startup.",
  },
  {
    name: "Lisa Thompson",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Exceeded all expectations. Highly recommended!",
  },
  {
    name: "Ryan Foster",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Clean API and excellent docs.",
  },
];

export const title = "Bento Testimonials";

export default function TestimonialsBento01() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Trusted by thousands of professionals worldwide
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:auto-rows-fr md:grid-cols-6">
          {/* Featured Large Card */}
          <Card className="sm:col-span-2 md:col-span-3 md:row-span-2 transition-all hover:shadow-lg">
            <CardContent className="flex h-full flex-col justify-between p-6 md:p-8">
              <div>
                <img
                  src={FEATURED_TESTIMONIAL.logo}
                  alt={FEATURED_TESTIMONIAL.company}
                  className="mb-6 h-8 opacity-60"
                />
                <Quote className="text-primary/20 mb-4 h-10 w-10" />
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: FEATURED_TESTIMONIAL.rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    )
                  )}
                </div>
                <blockquote className="text-foreground mb-6 text-lg leading-relaxed md:text-xl">
                  "{FEATURED_TESTIMONIAL.quote}"
                </blockquote>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={FEATURED_TESTIMONIAL.image}
                    alt={FEATURED_TESTIMONIAL.name}
                  />
                  <AvatarFallback>
                    {FEATURED_TESTIMONIAL.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{FEATURED_TESTIMONIAL.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {FEATURED_TESTIMONIAL.role}, {FEATURED_TESTIMONIAL.company}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Small Cards */}
          {TESTIMONIALS.slice(0, 2).map((testimonial, index) => (
            <Card
              key={index}
              className="sm:col-span-1 md:col-span-3 transition-all hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-foreground/90 mb-4 text-sm">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className="text-xs">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Medium Card */}
          <Card className="sm:col-span-1 md:col-span-2 transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-1">
                {Array.from({ length: TESTIMONIALS[2].rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-foreground/90 mb-4 text-sm">
                "{TESTIMONIALS[2].quote}"
              </p>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={TESTIMONIALS[2].image}
                    alt={TESTIMONIALS[2].name}
                  />
                  <AvatarFallback className="text-xs">
                    {TESTIMONIALS[2].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-semibold">
                    {TESTIMONIALS[2].name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {TESTIMONIALS[2].role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Remaining Small Cards */}
          {TESTIMONIALS.slice(3).map((testimonial, index) => (
            <Card
              key={index + 3}
              className="sm:col-span-1 md:col-span-2 transition-all hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-foreground/90 mb-4 text-sm">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className="text-xs">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

```

```tsx
"use client";

import { BadgeCheck, Twitter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    image:
      "https://images.unsplash.com/photo-1641906840000-4b88f1d44de6?auto=format&fit=crop&q=80&w=400&h=400",
    name: "Jessica Devis",
    username: "@jessicadevis",
    quote:
      "The utility-first approach and extensive component library make it a breeze to create beautiful and responsive interfaces. 🎉",
    date: "Jan 17, 2024",
  },
  {
    image:
      "https://images.unsplash.com/photo-1716662318479-a9c0f1cd1a0e?auto=format&fit=crop&q=80&w=400&h=400",
    name: "Lucian Eurel",
    username: "@lucianeurel",
    quote:
      "It's like having a superpower in your toolkit. The ability to craft custom designs quickly and efficiently with simple classes is unparalleled.",
    date: "Jan 18, 2024",
  },
  {
    image:
      "https://images.unsplash.com/photo-1623853434105-8e7a72898180?auto=format&fit=crop&q=80&w=400&h=400",
    name: "Marcell Glock",
    username: "@marcelglock",
    quote:
      "The utility-first approach and extensive component library make it a breeze to create beautiful and responsive interfaces. 😍",
    date: "Jan 19, 2024",
  },
  {
    image: "https://v3.material-tailwind.com/man-profile-2.jpg",
    name: "Linde Michele",
    username: "@lindemichele",
    quote:
      "With its clear and concise classes, I can easily communicate design intentions to my colleagues. It's a must-have tool for any web developer. 👨🏻‍💻",
    date: "Jan 20, 2024",
  },
  {
    image: "https://v3.material-tailwind.com/man-profile-3.jpg",
    name: "Mary Joshiash",
    username: "@maryjoshiash",
    quote:
      "I've tried several CSS frameworks, but this is on a whole different level. It strikes the perfect balance between flexibility and design.",
    date: "Jan 21, 2024",
  },
  {
    image: "https://v3.material-tailwind.com/woman-profile-3.jpg",
    name: "Misha Stam",
    username: "@mishastam",
    quote:
      "Active community support make it easy to get started. It's the ideal framework for achieving design excellence in web applications.",
    date: "Jan 22, 2024",
  },
];

export const title = "Testimonials with Cards";

export default function TestimonialsCards01() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <p className="mb-2 text-sm font-semibold tracking-wide uppercase">
            Testimonials
          </p>
          <h2 className="mb-4 text-3xl font-bold">Think about us</h2>
          <p className="text-muted-foreground max-w-lg text-lg">
            That&apos;s the main thing people are controlled by! Thoughts -
            their perception of themselves!
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map(({ name, image, username, quote, date }, key) => (
            <Card key={key}>
              <CardHeader className="flex flex-row items-center gap-4 px-6">
                <Avatar>
                  <AvatarImage src={image} alt={`${name} image`} />
                  <AvatarFallback>
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold">{name}</p>
                    <BadgeCheck className="h-4 w-4 text-blue-500" />
                  </div>
                  <p className="text-muted-foreground text-sm">{username}</p>
                </div>
              </CardHeader>
              <CardContent className="px-6">
                <blockquote className="text-muted-foreground">
                  {quote}
                </blockquote>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-4 px-6">
                <a
                  href="#"
                  className="flex items-center gap-1.5 text-sm font-semibold hover:underline"
                >
                  See on <Twitter className="h-3.5 w-3.5" />
                </a>
                <p className="text-muted-foreground text-sm">{date}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

```

```tsx
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const TESTIMONIALS = [
  {
    name: "Jessica Martinez",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
    background:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000",
    quote:
      "Working with this team has elevated our brand to new heights. Their creativity and attention to detail are unmatched.",
  },
  {
    name: "Ryan Foster",
    role: "Startup Founder",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    background:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
    quote:
      "From concept to launch, they were with us every step. Our product wouldn't be where it is today without their expertise.",
  },
  {
    name: "Amanda Lee",
    role: "Marketing Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400",
    background:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000",
    quote:
      "The ROI speaks for itself. Our engagement rates have tripled since implementing their strategies.",
  },
];

export const title = "Image Carousel Testimonials";

export default function TestimonialsCarouselImage01() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="relative h-[600px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${current.background})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      </div>

      <div className="relative flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Quote className="mx-auto mb-6 h-16 w-16 text-white/40" />

            <blockquote className="mb-8 text-2xl font-normal leading-relaxed text-white md:text-3xl lg:text-4xl">
              &quot;{current.quote}&quot;
            </blockquote>

            <div className="mb-8 flex items-center justify-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-white/20">
                <AvatarImage src={current.image} alt={current.name} />
                <AvatarFallback>
                  {current.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-lg font-semibold text-white">
                  {current.name}
                </p>
                <p className="text-white/70">{current.role}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous testimonial</span>
              </Button>

              <div className="flex gap-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-white"
                        : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

```

```tsx
"use client";

import { Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    image:
      "https://images.unsplash.com/photo-1716662318479-a9c0f1cd1a0e?auto=format&fit=crop&q=80&w=400&h=400",
    name: "Sarah Johnson",
    role: "Product Designer",
    quote:
      "The attention to detail and component quality is outstanding. These UI blocks have significantly accelerated our design workflow and improved consistency across our products.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1623853434105-8e7a72898180?auto=format&fit=crop&q=80&w=400&h=400",
    name: "Michael Chen",
    role: "Tech Lead at Stripe",
    quote:
      "Exceptional component library with excellent documentation. The customization options and TypeScript support make it perfect for enterprise applications. Highly recommend!",
  },
  {
    image:
      "https://images.unsplash.com/photo-1641906840000-4b88f1d44de6?auto=format&fit=crop&q=80&w=400&h=400",
    name: "Emma Rodriguez",
    role: "Frontend Developer",
    quote:
      "A game-changer for rapid prototyping and production. The components are production-ready, well-tested, and the design system is incredibly cohesive. Love it!",
  },
];

export const title = "Centered Testimonials";

export default function TestimonialsCentered01() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <Badge variant="outline" className="mx-auto mb-8 w-max">
            <Sparkles className="mr-2 h-4 w-4" />
            Testimonials
          </Badge>
          <h2 className="mb-4 text-3xl font-bold">What Clients Say</h2>
          <p className="text-muted-foreground mx-auto max-w-lg text-lg">
            We&apos;re constantly trying to express ourselves and actualize our
            dreams. If you have the opportunity to play.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map(({ name, image, role, quote }, key) => (
            <Card key={key} className="border-0 bg-transparent shadow-none">
              <CardContent className="p-0 text-center">
                <Avatar className="mx-auto mb-4 h-20 w-20">
                  <AvatarImage src={image} alt={`${name} image`} />
                  <AvatarFallback>
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <p className="mb-1 text-lg font-semibold">{name}</p>
                <p className="text-muted-foreground mb-4 text-sm">{role}</p>
                <blockquote className="text-muted-foreground mx-auto max-w-lg">
                  &quot;{quote}&quot;
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

```

```tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export const title = "Company Testimonial";

export default function TestimonialsCompany01() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="grid grid-cols-12 items-center border-0 bg-transparent shadow-none">
          <div className="col-span-full md:col-span-4">
            <img
              src="https://v3.material-tailwind.com/logo/spotify.svg"
              alt="user profile"
              className="h-full max-h-96 w-full max-w-96 rounded-xl object-cover lg:max-h-[30rem] lg:max-w-full"
            />
          </div>
          <CardContent className="col-span-full px-0 py-6 md:col-span-8 md:px-8 lg:px-12">
            <p className="mb-2 text-sm font-semibold tracking-wide uppercase lg:mb-4">
              Client Success Story
            </p>
            <h2 className="mb-6 text-3xl font-bold">
              Transforming Our Design System
            </h2>
            <blockquote className="text-muted-foreground mb-8 text-lg font-normal lg:mb-12">
              &quot;This component library has revolutionized how we build
              products at scale. The quality, consistency, and developer
              experience are exceptional. We've reduced our
              design-to-development time by 60% and our entire team loves
              working with these components.&quot;
            </blockquote>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  alt="Alexandra Martinez"
                  src="https://images.unsplash.com/photo-1623853434105-8e7a72898180?auto=format&fit=crop&q=80&w=400&h=400"
                />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">Alexandra Martinez</p>
                <p className="text-muted-foreground text-sm">
                  Head of Design, Spotify
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

```

```tsx
"use client";

import { Plus, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "This product has completely transformed how our team works. The intuitive design and powerful features make it indispensable.",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "Outstanding support and regular updates. It's rare to find a product that delivers on all its promises.",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "The attention to detail is remarkable. Every interaction feels polished and well thought out.",
  },
  {
    name: "David Park",
    role: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "We've seen a 40% increase in productivity since adopting this solution. Couldn't be happier.",
  },
  {
    name: "Lisa Thompson",
    role: "Freelance Developer",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "As someone who's tried many alternatives, this is by far the best. Worth every penny.",
  },
];

export const title = "Testimonials Grid with Add";

export default function TestimonialsGridAdd01() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Join thousands of satisfied customers who love our product
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <blockquote className="text-foreground mb-6 text-sm leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-dashed hover:border-primary hover:bg-accent/50 cursor-pointer transition-all">
            <CardContent className="flex h-full min-h-[280px] flex-col items-center justify-center p-6 text-center">
              <div className="bg-primary/10 mb-4 rounded-full p-4">
                <Plus className="text-primary h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Add Your Review</h3>
              <p className="text-muted-foreground text-sm">
                Share your experience with our product
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

```

```tsx
"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Game-changer for our workflow. Saved us countless hours.",
  },
  {
    name: "Michael Torres",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Best investment we made this year. Highly recommend!",
  },
  {
    name: "Emily Watson",
    role: "Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Intuitive interface, powerful features. Perfect combination.",
  },
  {
    name: "David Kim",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Scaled with us from startup to enterprise. Incredible support.",
  },
  {
    name: "Jessica Lee",
    role: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "ROI was clear within the first month. Exceeded expectations.",
  },
  {
    name: "Ryan Foster",
    role: "Founder",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Customer support is unmatched. They truly care about success.",
  },
  {
    name: "Amanda Martinez",
    role: "Operations Lead",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Streamlined our entire process. Can't imagine working without it.",
  },
  {
    name: "Chris Anderson",
    role: "CEO",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Revolutionary platform. Set the standard for the industry.",
  },
];

export const title = "Marquee Testimonials";

export default function TestimonialsMarquee01() {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            See what our customers are saying about their experience
          </p>
        </div>

        <div className="relative">
          <div className="flex animate-marquee gap-6 hover:pause">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
              <Card
                key={index}
                className="min-w-[350px] shrink-0 border-border/50"
              >
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <blockquote className="text-foreground/90 mb-4 text-sm leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>

                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            animation: marquee 30s linear infinite;
          }

          .animate-marquee:hover {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-marquee {
              animation: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

```

```tsx
"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "Absolutely love this product! It has completely transformed how our team collaborates.",
  },
  {
    name: "Marcus Chen",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "The best tool we've used in years. Simple, powerful, and exactly what we needed. Highly recommended!",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Game changer! Our productivity has increased by 60%.",
  },
  {
    name: "David Park",
    role: "Startup Founder",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "I was skeptical at first, but this exceeded all my expectations. The support team is amazing, the features are robust, and the pricing is fair. We've been using it for 6 months and couldn't be happier.",
  },
  {
    name: "Lisa Thompson",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "Finally, a solution that just works. No complicated setup, no learning curve.",
  },
  {
    name: "James Wilson",
    role: "Tech Lead",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "Outstanding! The attention to detail is incredible. Every feature feels thoughtfully designed.",
  },
  {
    name: "Amanda Foster",
    role: "UX Researcher",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Brilliant product with even better customer service. Five stars!",
  },
  {
    name: "Ryan Cooper",
    role: "DevOps Engineer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "We evaluated 10+ competitors and this was the clear winner. The integration was seamless and the results were immediate. Our team adoption was 100% within the first week.",
  },
  {
    name: "Jennifer Lee",
    role: "Operations Manager",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "Can't imagine our workflow without it. Worth every penny and then some.",
  },
  {
    name: "Michael Torres",
    role: "CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Best ROI we've seen on any tool. Paid for itself in the first month.",
  },
  {
    name: "Sophie Anderson",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "Elegant, powerful, and reliable. Everything you want in a professional tool.",
  },
  {
    name: "Carlos Martinez",
    role: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote:
      "The analytics features alone are worth it, but combined with everything else, it's unbeatable. We've tried 5 other platforms and this is the only one our entire team actually uses daily.",
  },
];

export const title = "Masonry Testimonials";

export default function TestimonialsMasonry01() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Loved by Thousands
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Don't just take our word for it—hear from our satisfied customers
          </p>
        </div>

        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card
              key={index}
              className="mb-6 break-inside-avoid transition-all hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <blockquote className="text-foreground/90 mb-4 text-sm leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

```

```tsx
"use client";

import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const title = "Large Quote Testimonial";

export default function TestimonialsQuoteLarge01() {
  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <Quote className="text-primary/10 absolute -top-8 left-0 h-24 w-24 md:-left-12 md:h-32 md:w-32" />

            <blockquote className="relative px-4 text-center md:px-12">
              <p className="mb-8 text-2xl font-normal leading-relaxed text-slate-900 dark:text-white md:text-3xl lg:text-4xl">
                "This platform has fundamentally changed how we approach product
                development. The impact on our team's efficiency has been
                remarkable."
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400"
                    alt="Michael Chen"
                  />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    Michael Chen
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Chief Technology Officer, DataFlow
                  </p>
                </div>
              </div>
            </blockquote>

            <Quote className="text-primary/10 absolute -bottom-8 right-0 h-24 w-24 rotate-180 md:-right-12 md:h-32 md:w-32" />
          </div>
        </div>
      </div>
    </section>
  );
}

```

```tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    image:
      "https://images.unsplash.com/photo-1641906840000-4b88f1d44de6?auto=format&fit=crop&q=80&w=400&h=400",
    name: "Jessica Devis",
    role: "CEO @ Marketing Digital LTD",
    quote:
      "The connections you make at Web Summit are unparalleled, we met users all over the world.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1716662318479-a9c0f1cd1a0e?auto=format&fit=crop&q=80&w=400&h=400",
    name: "Mary Joshiash",
    role: "Marketing @ Apple INC",
    quote:
      "Web Summit will increase your appetite, your inspiration, your skills, your motivation and your network.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1641906840000-4b88f1d44de6?auto=format&fit=crop&q=80&w=400&h=400",
    name: "Marcell Glock",
    role: "CFO @ Apple INC",
    quote:
      "The pessimist complains about the wind; the optimist expects it to change; the realist adjusts the sails.",
  },
];

export const title = "Simple Testimonials";

export default function TestimonialsSimple01() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-center text-3xl font-bold">
            Think about us
          </h2>
          <p className="text-muted-foreground mx-auto max-w-lg text-center text-lg">
            That&apos;s the main thing people are controlled by! Thoughts -
            their perception of themselves!
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map(({ name, image, role, quote }, key) => (
            <Card key={key}>
              <CardContent className="p-6 text-center">
                <Avatar className="mx-auto mb-6 h-24 w-24">
                  <AvatarImage src={image} alt={`${name} image`} />
                  <AvatarFallback>
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <p className="mb-1 text-lg font-semibold">{name}</p>
                <p className="text-muted-foreground mb-4 text-sm">{role}</p>
                <blockquote className="text-muted-foreground mx-auto max-w-lg">
                  &quot;{quote}&quot;
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

```

```tsx
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
    quote:
      "This platform has transformed how our team collaborates. The intuitive design and powerful features make it indispensable.",
  },
  {
    name: "Marcus Chen",
    role: "Engineering Lead",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    quote:
      "Outstanding product with exceptional support. Our productivity increased by 60% within the first month.",
  },
  {
    name: "Emily Rodriguez",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400",
    quote:
      "Elegant, powerful, and reliable. Everything we needed in one beautiful package. Highly recommend!",
  },
  {
    name: "David Park",
    role: "CEO",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    quote:
      "Best investment we made this year. The ROI was clear within weeks and the team loves using it daily.",
  },
];

export const title = "Minimal Slider Testimonials";

export default function TestimonialsSliderMinimal01() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Trusted by Teams Worldwide
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              See what our customers are saying
            </p>
          </div>

          <div className="relative min-h-[280px]">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <Avatar className="mb-6 h-20 w-20">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <blockquote className="text-foreground mb-6 text-xl leading-relaxed md:text-2xl">
                    "{testimonial.quote}"
                  </blockquote>

                  <div>
                    <p className="text-lg font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted w-2 hover:bg-muted-foreground/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

```

```tsx
"use client";

import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const title = "Split Testimonial";

export default function TestimonialsSplit01() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800&h=1000"
              alt="Customer testimonial"
              className="h-full w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>

          <div className="order-1 lg:order-2">
            <Badge variant="outline" className="mb-6">
              Customer Success Story
            </Badge>

            <Quote className="text-primary/20 mb-6 h-12 w-12" />

            <blockquote className="mb-8 space-y-4 text-xl leading-relaxed md:text-2xl">
              <p className="text-foreground">
                "Working with this team has been transformative for our
                business. They didn't just deliver a product—they became true
                partners in our success."
              </p>
              <p className="text-muted-foreground text-lg">
                "Within three months of implementation, we saw a 150% increase
                in user engagement and a 60% reduction in operational costs. The
                platform scaled seamlessly as we grew from 10,000 to over
                100,000 users."
              </p>
            </blockquote>

            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=400"
                  alt="Alexandra Martinez"
                />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold">Alexandra Martinez</p>
                <p className="text-muted-foreground text-sm">
                  VP of Product & Engineering
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src="https://v3.material-tailwind.com/logo/spotify.svg"
                    alt="Spotify"
                    className="h-6 opacity-60"
                  />
                  <span className="text-muted-foreground text-xs">
                    Spotify, San Francisco
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

```

```tsx
"use client";

import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1716662318479-a9c0f1cd1a0e?auto=format&fit=crop&q=80&w=400&h=400",
    quote:
      "The attention to detail and user experience is exceptional. This has transformed how we approach design decisions in our team.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Tech Lead",
    image:
      "https://images.unsplash.com/photo-1623853434105-8e7a72898180?auto=format&fit=crop&q=80&w=400&h=400",
    quote:
      "Outstanding component library that saves us countless hours. The quality and customization options are exactly what we needed.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Frontend Developer",
    image:
      "https://images.unsplash.com/photo-1641906840000-4b88f1d44de6?auto=format&fit=crop&q=80&w=400&h=400",
    quote:
      "A game-changer for rapid prototyping and production builds. The documentation is clear and the components are production-ready.",
    rating: 5,
  },
];

export const title = "Testimonials with Stats";

export default function TestimonialsStats01() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Loved by Developers & Designers
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Join thousands of professionals who trust our components for their
            projects
          </p>
        </div>

        <div className="mb-12 flex flex-wrap items-center justify-center gap-8 text-center md:gap-12">
          <div>
            <p className="text-3xl font-bold">1,679,700+</p>
            <p className="text-muted-foreground text-sm">Active Users</p>
          </div>
          <div className="bg-border hidden h-12 w-px md:block"></div>
          <div>
            <p className="text-3xl font-bold">4.9/5</p>
            <p className="text-muted-foreground text-sm">Average Rating</p>
          </div>
          <div className="bg-border hidden h-12 w-px md:block"></div>
          <div>
            <p className="text-3xl font-bold">50K+</p>
            <p className="text-muted-foreground text-sm">Companies</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border/50 hover:border-border transition-all hover:shadow-lg"
            >
              <CardContent className="px-6">
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <Quote className="text-muted-foreground/30 mb-3 h-8 w-8" />

                <blockquote className="text-foreground/90 mb-6 text-sm leading-relaxed">
                  {testimonial.quote}
                </blockquote>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="border-border h-12 w-12 rounded-full border-2 object-cover"
                  />
                  <div>
                    <p className="text-foreground font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

```

```tsx
"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Best decision we made this year. Team loves it!",
    verified: true,
  },
  {
    name: "Marcus J.",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Incredible performance and support.",
    verified: true,
  },
  {
    name: "Emily R.",
    role: "Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Game-changer for our design workflow.",
    verified: true,
  },
  {
    name: "David K.",
    role: "CEO",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "ROI was immediate. Highly recommend!",
    verified: true,
  },
  {
    name: "Lisa T.",
    role: "Marketing",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Intuitive and powerful. Perfect combo.",
    verified: true,
  },
  {
    name: "James W.",
    role: "Engineer",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Exceeded expectations in every way.",
    verified: true,
  },
  {
    name: "Amanda F.",
    role: "Founder",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Can't imagine working without it now.",
    verified: true,
  },
  {
    name: "Ryan C.",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Scales beautifully with our growth.",
    verified: true,
  },
  {
    name: "Jennifer L.",
    role: "Operations",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Support team is absolutely fantastic.",
    verified: true,
  },
  {
    name: "Michael T.",
    role: "Analyst",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Data insights are incredibly valuable.",
    verified: true,
  },
  {
    name: "Sophie A.",
    role: "PM",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Streamlined our entire workflow.",
    verified: true,
  },
  {
    name: "Carlos M.",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Clean API and great documentation.",
    verified: true,
  },
  {
    name: "Rachel P.",
    role: "Designer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Beautiful UI and smooth performance.",
    verified: true,
  },
  {
    name: "Kevin H.",
    role: "Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Team adoption was instant.",
    verified: true,
  },
  {
    name: "Nicole B.",
    role: "Director",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Best tool in our tech stack.",
    verified: true,
  },
  {
    name: "Brandon S.",
    role: "Lead Dev",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Reliable and feature-rich.",
    verified: true,
  },
  {
    name: "Olivia G.",
    role: "Product",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Exactly what we were looking for.",
    verified: true,
  },
  {
    name: "Tyler N.",
    role: "Engineer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Powerful and easy to use.",
    verified: true,
  },
  {
    name: "Grace Y.",
    role: "UX Lead",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Thoughtful design throughout.",
    verified: true,
  },
  {
    name: "Alex D.",
    role: "Consultant",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 5,
    quote: "Recommend to all my clients.",
    verified: true,
  },
];

export const title = "Testimonials Wall";

export default function TestimonialsWall01() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Trusted by 10,000+ Customers
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Join thousands of satisfied customers worldwide
          </p>
        </div>

        <div className="mb-8 flex items-center justify-center gap-4">
          <Badge variant="secondary" className="text-sm">
            All Reviews
          </Badge>
          <Badge variant="outline" className="text-sm">
            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
            5.0 Average
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardContent className="p-4">
                <div className="mb-2 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-foreground/90 mb-3 line-clamp-2 text-sm">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className="text-xs">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                  {testimonial.verified && (
                    <Badge
                      variant="secondary"
                      className="h-5 shrink-0 px-1.5 text-xs"
                    >
                      ✓
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

```

```tsx
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function MiniWithDividersInGrid() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Grid */}
      <div className="divide-border grid grid-cols-1 gap-x-3 divide-y border-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="py-6 sm:-ms-4 sm:px-4">
          {/* Review */}
          <blockquote>
            <span className="text-sm">
              I&apos;m absolutely floored by the level of care and attention to
              detail Eliana has put into this project and for one can guarantee
              that we will be a return customer.
            </span>

            <footer className="mt-3">
              <div className="flex items-center gap-x-2">
                <Avatar className="size-5 shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" />
                </Avatar>
                <div className="grow">
                  <div className="text-muted-foreground text-xs">
                    Josh Grazioso
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
          {/* End Review */}
        </div>

        <div className="py-6 sm:px-4">
          {/* Review */}
          <blockquote>
            <span className="text-sm">
              To say that hiring Eliana has been life-changing is an
              understatement. My business has tripled and I got my life back.
            </span>

            <footer className="mt-3">
              <div className="flex items-center gap-x-2">
                <Avatar className="size-5 shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" />
                </Avatar>
                <div className="grow">
                  <div className="text-muted-foreground text-xs">
                    Nicole Grazioso
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
          {/* End Review */}
        </div>
      </div>
      {/* End Grid */}
    </div>
  );
}

```

```tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Cards() {
  return (
    <>
      {/* Testimonials */}
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card */}
          <Card>
            <CardHeader>
              <svg
                className="text-foreground/65 h-auto w-20 sm:w-24"
                width="140"
                height="47"
                viewBox="0 0 140 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.3991 8.15082C20.3991 9.61789 19.1416 10.8754 17.6745 10.8754C16.2075 10.8754 14.95 9.61789 14.95 8.15082C14.95 6.68375 16.2075 5.42627 17.6745 5.42627C19.1416 5.42627 20.3991 6.68375 20.3991 8.15082ZM17.6745 13.1109C16.0678 13.1109 14.8103 14.3684 14.8103 15.9752C14.8103 17.582 16.0678 18.8394 17.6745 18.8394C19.2813 18.8394 20.5388 17.582 20.5388 15.9752C20.5388 14.2985 19.2813 13.1109 17.6745 13.1109ZM17.6745 20.7257C16.0678 20.7257 14.7404 22.053 14.7404 23.6598C14.7404 25.2666 16.0678 26.5939 17.6745 26.5939C19.2813 26.5939 20.6087 25.2666 20.6087 23.6598C20.6785 22.053 19.2813 20.7257 17.6745 20.7257ZM17.6745 28.4802C16.0678 28.4802 14.8103 29.7376 14.8103 31.3444C14.8103 32.9512 16.0678 34.2087 17.6745 34.2087C19.2813 34.2087 20.5388 32.9512 20.5388 31.3444C20.5388 29.8075 19.2813 28.4802 17.6745 28.4802ZM17.6745 36.3744C16.2075 36.3744 14.95 37.6319 14.95 39.0989C14.95 40.566 16.2075 41.8235 17.6745 41.8235C19.1416 41.8235 20.3991 40.566 20.3991 39.0989C20.3991 37.6319 19.2115 36.3744 17.6745 36.3744ZM25.2195 12.7616C23.4729 12.7616 22.0059 14.2287 22.0059 15.9752C22.0059 17.7217 23.4729 19.1887 25.2195 19.1887C26.966 19.1887 28.433 17.7217 28.433 15.9752C28.433 14.2287 26.966 12.7616 25.2195 12.7616ZM25.2195 20.3764C23.4031 20.3764 21.8662 21.8434 21.8662 23.7297C21.8662 25.546 23.3332 27.083 25.2195 27.083C27.0358 27.083 28.5728 25.6159 28.5728 23.7297C28.5728 21.8434 27.0358 20.3764 25.2195 20.3764ZM25.2195 28.1309C23.4729 28.1309 22.0059 29.5979 22.0059 31.3444C22.0059 33.0909 23.4729 34.558 25.2195 34.558C26.966 34.558 28.433 33.0909 28.433 31.3444C28.433 29.5979 26.966 28.1309 25.2195 28.1309ZM32.9739 19.9572C31.0179 19.9572 29.2714 21.564 29.2714 23.6598C29.2714 25.6159 30.8781 27.3624 32.9739 27.3624C35.0698 27.3624 36.6765 25.7556 36.6765 23.6598C36.5368 21.564 34.93 19.9572 32.9739 19.9572ZM10.0598 13.4602C8.73243 13.4602 7.61466 14.578 7.61466 15.9053C7.61466 17.2327 8.73243 18.3504 10.0598 18.3504C11.3871 18.3504 12.5049 17.2327 12.5049 15.9053C12.5049 14.578 11.457 13.4602 10.0598 13.4602ZM10.0598 21.075C8.59271 21.075 7.47494 22.1927 7.47494 23.6598C7.47494 25.1269 8.59271 26.2446 10.0598 26.2446C11.5268 26.2446 12.6446 25.1269 12.6446 23.6598C12.6446 22.1927 11.5268 21.075 10.0598 21.075ZM10.0598 28.8295C8.73243 28.8295 7.61466 29.9472 7.61466 31.2746C7.61466 32.6019 8.73243 33.7197 10.0598 33.7197C11.3871 33.7197 12.5049 32.6019 12.5049 31.2746C12.5049 29.9472 11.457 28.8295 10.0598 28.8295ZM2.445 21.4941C1.18752 21.4941 0.209473 22.4722 0.209473 23.7297C0.209473 24.9871 1.18752 25.9652 2.445 25.9652C3.70249 25.9652 4.68053 24.9871 4.68053 23.7297C4.68053 22.4722 3.70249 21.4941 2.445 21.4941Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M64.4812 18.9092C64.2018 18.9092 63.9922 19.1886 63.9922 19.3982V38.7495C63.9922 39.0289 64.2716 39.2385 64.4812 39.2385H66.7866C67.066 39.2385 67.2756 38.9591 67.2756 38.7495V19.3982C67.2756 19.1188 66.9962 18.9092 66.7866 18.9092H64.4812Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M65.7389 10.7358C64.4815 10.7358 63.5034 11.7139 63.5034 12.9714C63.5034 14.2289 64.4815 15.2069 65.7389 15.2069C66.9964 15.2069 67.9745 14.2289 67.9745 12.9714C67.9745 11.7139 66.9266 10.7358 65.7389 10.7358Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M114.082 18.9092C113.803 18.9092 113.593 19.1886 113.593 19.3982V38.7495C113.593 39.0289 113.873 39.2385 114.082 39.2385H116.388C116.667 39.2385 116.877 38.9591 116.877 38.7495V19.3982C116.877 19.1188 116.597 18.9092 116.388 18.9092H114.082Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M115.2 10.7358C113.942 10.7358 112.964 11.7139 112.964 12.9714C112.964 14.2289 113.942 15.2069 115.2 15.2069C116.457 15.2069 117.435 14.2289 117.435 12.9714C117.435 11.7139 116.457 10.7358 115.2 10.7358Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M138.603 37.3525C138.743 37.2127 138.743 37.073 138.743 37.0031C138.743 36.8634 138.743 36.8634 138.743 36.8634C138.743 36.8634 138.743 36.7237 138.603 36.7237C138.603 36.7237 138.463 36.584 138.324 36.584C138.184 36.584 138.184 36.584 138.044 36.584H137.416V38.3305H137.695V37.7018H138.044L138.533 38.3305H138.813L138.184 37.562C138.463 37.6319 138.603 37.4922 138.603 37.3525ZM137.765 37.4922V36.8634H138.254C138.394 36.8634 138.533 36.8634 138.603 37.0031C138.743 37.0031 138.743 37.1429 138.743 37.2826C138.743 37.4223 138.743 37.562 138.603 37.562C138.463 37.562 138.324 37.7018 138.254 37.7018H137.765V37.4922Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M138.114 35.8853C137.276 35.8853 136.507 36.6537 136.507 37.492C136.507 38.3304 137.276 39.0988 138.114 39.0988C138.952 39.0988 139.721 38.3304 139.721 37.492C139.721 36.5839 139.022 35.8853 138.114 35.8853ZM138.114 38.9591C137.276 38.9591 136.647 38.3304 136.647 37.492C136.647 36.6537 137.276 36.025 138.114 36.025C138.952 36.025 139.581 36.6537 139.581 37.492C139.581 38.3304 138.883 38.9591 138.114 38.9591Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M83.6928 22.0531C83.9722 22.0531 84.1818 21.7737 84.1818 21.5641V19.2587C84.1818 18.9793 83.9024 18.7697 83.6928 18.7697H78.7327V11.3645C78.7327 11.0851 78.4533 10.8755 78.2437 10.8755H75.9383C75.6588 10.8755 75.4493 11.1549 75.4493 11.3645V18.7697H73.0042C72.7247 18.7697 72.5151 19.0491 72.5151 19.2587V21.5641C72.5151 21.8436 72.7946 22.0531 73.0042 22.0531H75.4493V33.2308C75.4493 36.6539 77.7547 38.8895 81.108 38.8895H83.5531C83.8325 38.8895 84.0421 38.61 84.0421 38.4004V36.0951C84.0421 35.8156 83.7626 35.606 83.5531 35.606H81.4573C79.8505 35.606 78.7327 34.4883 78.7327 32.7418V21.9833L83.6928 22.0531Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M132.735 22.0531C133.014 22.0531 133.224 21.7737 133.224 21.5641V19.2587C133.224 18.9793 132.944 18.7697 132.735 18.7697H127.775V11.3645C127.775 11.0851 127.495 10.8755 127.286 10.8755H124.98C124.701 10.8755 124.491 11.1549 124.491 11.3645V18.7697H122.046C121.767 18.7697 121.557 19.0491 121.557 19.2587V21.5641C121.557 21.8436 121.837 22.0531 122.046 22.0531H124.491V33.2308C124.491 36.6539 126.797 38.8895 130.15 38.8895H132.595C132.874 38.8895 133.084 38.61 133.084 38.4004V36.0951C133.084 35.8156 132.805 35.606 132.595 35.606H130.36C128.753 35.606 127.635 34.4883 127.635 32.7418V21.9833L132.735 22.0531Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M49.8106 22.053V38.5401C49.8106 38.8195 50.09 39.0291 50.2996 39.0291H52.605C52.8844 39.0291 53.094 38.7497 53.094 38.5401V22.053H58.5431C58.8226 22.053 59.0321 21.7736 59.0321 21.564V19.2586C59.0321 18.9792 58.7527 18.7696 58.5431 18.7696H53.094V14.4383C53.094 12.6918 54.3515 11.5041 55.8186 11.5041H58.5431C58.8226 11.5041 59.0321 11.2247 59.0321 11.0151V8.70973C59.0321 8.43028 58.7527 8.2207 58.5431 8.2207H55.9583C52.5351 8.2207 49.8106 11.085 49.8106 14.3684V18.7696H47.3655C47.086 18.7696 46.8765 19.049 46.8765 19.2586V21.564C46.8765 21.8435 47.1559 22.053 47.3655 22.053H49.8106Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M106.258 21.2148C104.442 19.2587 101.857 18.1409 99.1321 18.1409C96.5473 18.1409 93.9625 19.2587 92.3557 20.8655V8.57008C92.3557 8.29064 92.0763 8.08105 91.8667 8.08105H89.5613C89.2818 8.08105 89.0723 8.3605 89.0723 8.57008V28.8994C89.0723 36.4443 94.1022 39.7278 99.0623 39.7278C103.952 39.7278 109.052 36.3745 109.052 28.8994C109.052 25.8954 108.074 23.1709 106.258 21.2148ZM99.0623 36.584C94.1022 36.584 92.2858 32.6719 92.2858 28.9693C92.2858 24.4284 95.0104 21.4244 99.0623 21.4244C103.114 21.4244 105.839 24.4982 105.839 28.9693C105.769 32.6719 104.022 36.584 99.0623 36.584Z"
                  fill="currentColor"
                ></path>
              </svg>
            </CardHeader>
            <CardContent>
              <p className="text-base md:text-xl">
                <em>
                  &quot; I&apos;m absolutely floored by the level of care and
                  attention to detail the team at HS have put into this theme
                  and for one can guarantee that I will be a return customer.
                  &quot;
                </em>
              </p>
            </CardContent>

            <CardFooter className="flex flex-col items-start">
              <h3 className="text-sm font-semibold sm:text-base">
                Nicole Grazioso
              </h3>
              <p className="text-muted-foreground text-sm">
                Director Payments & Risk | HubSpot
              </p>
            </CardFooter>
          </Card>
          {/* End Card */}

          {/* Card */}
          <Card>
            <CardHeader className="flex-auto">
              <svg
                className="text-foreground/65 h-auto w-20 sm:w-24"
                width="200"
                height="67"
                viewBox="0 0 200 67"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M192.914 45.0629C197.106 45.0629 200 42.1687 200 38.1767C200 36.1807 199.401 34.2845 198.403 32.9871C197.305 31.5899 195.709 30.7915 193.812 30.7915C191.317 30.7915 188.922 32.6877 186.627 36.6797L186.427 36.9791L186.327 36.6797C185.729 34.9831 185.23 33.5859 184.93 32.7875C184.731 32.1887 184.631 31.9891 184.631 31.8893C184.531 31.4901 184.132 31.1907 183.633 31.1907C183.333 31.1907 183.034 31.2905 182.735 31.4901C182.435 31.6897 182.236 31.8893 182.236 32.1887C179.94 39.3743 178.044 42.8673 176.447 42.8673C176.248 42.8673 176.048 42.7675 175.948 42.6677C175.549 42.1687 175.649 41.0709 175.749 39.5739C175.848 38.4761 175.948 37.1787 175.948 35.8813C175.848 33.2865 174.451 31.6897 172.156 31.6897C169.261 31.6897 167.365 34.7835 166.467 36.5799L166.168 37.0789L166.068 36.4801C165.868 34.1847 165.07 31.4901 162.675 31.4901C159.88 31.4901 157.685 34.7835 156.387 37.5779L156.088 38.2765V37.4781C156.287 33.7855 156.387 31.5899 156.487 30.9911C156.587 30.3923 156.487 29.9931 156.287 29.6937C156.088 29.4941 155.788 29.3943 155.19 29.3943C154.291 29.4941 153.792 29.9931 153.094 31.7895C151.996 34.7835 149.102 41.8693 146.707 41.8693C146.208 41.8693 145.908 41.6697 145.609 41.3703C144.611 40.2725 145.01 37.2785 145.609 33.0869V32.7875C145.908 30.7915 145.409 30.3923 144.311 30.1927C144.212 30.1927 144.112 30.1927 144.012 30.1927C143.114 30.1927 142.715 30.9911 141.916 33.2865C140.519 37.3783 138.623 41.5699 136.527 41.5699C136.427 41.5699 136.327 41.5699 136.327 41.5699C135.23 41.3703 135.23 39.6737 135.23 37.5779C135.23 36.3803 135.23 35.0829 135.13 33.9851C134.83 31.8893 133.533 30.5919 131.836 30.4921C128.443 30.4921 126.248 34.7835 125.15 37.3783L124.95 37.9771L124.85 37.3783C124.651 35.6817 124.551 34.0849 124.451 32.3883V32.2885C130.739 24.4043 133.533 18.6158 133.633 13.7256C133.633 10.6318 132.236 8.7356 129.741 8.7356C127.944 8.7356 123.752 10.2326 122.255 24.0051C121.956 26.5999 121.856 29.1947 121.856 31.7895C118.962 35.9811 112.774 43.1667 106.786 43.1667C101.297 43.1667 97.006 38.7755 97.006 30.9911C97.006 20.6118 104.391 14.2246 109.88 14.2246C111.078 14.2246 112.076 14.524 112.874 15.2226C113.673 15.9212 114.072 16.8194 114.072 17.8174C114.072 19.2146 113.573 20.013 113.174 20.7116C113.074 20.9112 112.974 21.1108 112.874 21.3104C112.774 21.51 112.675 21.8094 112.774 22.009C112.874 22.3084 113.273 22.4083 113.772 22.4083C115.07 22.4083 117.066 20.512 117.066 17.6178C117.066 14.6238 114.571 11.53 109.98 11.53C103.094 11.53 93.9122 19.015 93.9122 31.2905C93.9122 39.8733 99.3014 45.8613 106.687 45.8613C111.876 45.8613 117.066 42.1687 121.557 35.8813L121.856 35.4821V35.9811C121.956 38.2765 122.156 40.0729 122.255 41.3703C122.355 42.1687 122.355 42.8673 122.355 43.1667C122.355 43.8653 122.455 44.4641 122.754 44.7635C123.054 45.0629 123.453 45.2625 124.052 45.2625C125.05 45.2625 125.25 44.5639 125.649 42.8673L125.749 42.3683C126.248 40.2725 128.144 33.4861 130.938 33.4861C131.437 33.4861 131.737 33.5859 132.036 33.8853C132.635 34.5839 132.535 35.8813 132.535 37.4781C132.535 38.4761 132.435 39.4741 132.535 40.4721C132.834 43.0669 133.932 44.3643 136.028 44.4641C138.124 44.4641 140.419 42.1687 141.617 40.0729L141.816 39.6737L141.916 40.1727C142.116 41.2705 143.114 45.0629 146.108 45.0629C148.902 45.0629 151.198 42.1687 153.792 36.1807L154.092 35.3823V36.2805C153.992 38.5759 153.892 41.2705 153.892 43.4661C153.892 45.1627 154.092 45.7615 154.79 45.7615H154.99C155.689 45.7615 156.188 45.3623 156.487 44.4641C158.483 37.6777 160.08 34.4841 161.776 34.4841C163.373 34.4841 163.573 37.4781 163.673 42.7675V43.1667C163.673 44.9631 163.772 45.8613 164.97 45.8613C165.868 45.8613 166.068 45.1627 166.467 43.4661C166.567 43.1667 166.667 42.7675 166.766 42.3683C168.363 36.8793 169.661 34.6837 171.257 34.6837C172.655 34.6837 172.755 36.0809 172.755 36.5799C172.854 37.5779 172.754 38.6757 172.555 39.6737C172.455 40.6717 172.355 41.5699 172.355 42.5679C172.455 44.6637 173.653 45.8613 175.649 45.9611C178.343 45.9611 180.639 42.8673 182.735 36.7795L182.834 36.3803L183.034 36.7795C183.433 37.7775 183.932 39.0749 184.331 40.5719V40.6717V40.7715C182.335 45.2625 180.838 50.2526 180.838 52.9472C180.838 56.4402 182.435 58.7356 184.93 58.8354C186.327 58.8354 189.421 58.3364 189.521 53.2466C189.521 51.1508 189.022 48.2566 188.024 44.5639L187.924 44.1647L188.323 44.3643C190.02 44.5639 191.517 45.0629 192.914 45.0629ZM124.651 27.8973C124.751 26.5999 124.85 25.4023 124.95 24.2047C125.948 16.7196 127.944 11.4302 129.94 11.4302C130.838 11.4302 131.337 12.1288 131.337 13.526C131.337 16.9192 129.142 21.8094 124.95 27.9971L124.651 28.4961V27.8973ZM186.826 54.9432C186.527 55.3424 186.128 55.542 185.529 55.542C184.93 55.542 184.431 55.3424 184.132 54.9432C183.234 53.7456 183.533 50.9512 184.93 45.8613C185.13 45.2625 185.329 44.6637 185.529 44.0649L185.729 43.5659L185.828 44.0649C187.525 49.8534 187.924 53.546 186.826 54.9432ZM187.425 39.8733L187.325 39.5739V39.4741C189.222 35.4821 191.517 33.1867 193.413 33.1867C195.609 33.1867 197.106 35.1827 197.106 37.9771C197.106 39.8733 196.307 40.8713 195.609 41.4701C194.81 42.1687 193.812 42.4681 192.715 42.4681C190.12 42.5679 188.423 41.1707 187.425 39.8733ZM64.2715 44.3643C67.2655 44.1647 69.6607 40.0729 70.4591 38.3763L70.6587 37.8773L70.7585 38.3763C71.1577 40.7715 72.5549 44.8633 76.6467 44.9631C78.4431 44.9631 80.4391 43.8653 82.5349 41.7695L82.7345 41.5699L82.8343 41.7695C84.2315 44.0649 86.0279 45.3623 88.0239 45.1627C90.9182 44.9631 92.7146 42.9671 92.8144 41.5699C92.8144 41.1707 92.7146 40.8713 92.515 40.6717C92.2156 40.3723 91.9162 40.3723 91.6168 40.5719L91.517 40.6717C90.8184 41.3703 89.6208 42.5679 88.2236 42.5679C86.5269 42.6677 85.3293 41.6697 84.5309 39.5739V39.4741L84.6307 39.3743C89.2216 33.2865 92.515 24.1049 92.2156 17.9172C92.1158 15.023 91.2176 11.6298 88.1238 11.6298H87.8244C86.6267 11.7296 85.5289 12.2286 84.6307 13.3264C81.7365 16.6198 80.2395 24.6039 80.7385 33.6857C80.8383 35.5819 81.1377 37.3783 81.7365 38.9751V39.0749L81.6367 39.1747C79.9401 41.1707 78.2435 42.2685 76.8463 42.2685C73.5529 42.2685 73.6527 36.7795 73.9521 32.1887C74.0519 31.1907 74.0519 30.5919 73.7525 30.1927C73.5529 29.8933 73.1537 29.7935 72.6547 29.7935H72.5549C71.3573 29.7935 71.1577 29.9931 70.5589 31.7895C69.3613 35.3823 66.8663 41.3703 64.3713 41.3703C63.6727 41.3703 63.1737 41.1707 62.7745 40.6717C61.5769 39.1747 62.4751 35.3823 63.1737 32.2885C63.2735 31.7895 63.4731 31.1907 63.5729 30.6917C63.7725 29.9931 63.6727 29.3943 63.4731 29.0949C63.1737 28.7955 62.6747 28.5959 62.0759 28.6957C60.978 28.7955 60.3792 29.1947 59.98 31.1907L59.8802 31.5899V31.6897C59.3812 30.9911 58.483 30.1927 56.8862 30.1927C56.7864 30.1927 56.5868 30.1927 56.3872 30.1927C54.5908 30.2925 52.5948 31.5899 51.0978 33.3863C49.4012 35.5819 48.503 38.2765 48.8024 41.0709C48.8024 41.1707 48.8024 41.3703 48.9022 41.4701V41.5699L48.8024 41.6697C47.8044 42.7675 46.7066 43.3663 45.7086 43.3663C44.1118 43.3663 43.2136 42.1687 43.2136 40.1727C43.2136 36.7795 45.509 26.6997 45.509 23.0071C45.509 19.1148 43.8124 17.019 40.7186 16.9192C36.3273 16.9192 32.8343 21.9092 29.5409 32.1887C29.2415 33.1867 28.9421 34.1847 28.6427 35.1827L28.1437 36.7795L28.2435 35.1827C28.5429 31.6897 28.7425 28.2965 28.8423 24.8035C29.0419 19.8134 28.3433 16.6198 26.7465 15.023C25.9481 14.1248 24.8503 13.7256 23.3533 13.7256C17.9641 13.7256 15.3693 22.8075 13.4731 29.2945C12.8743 31.1907 11.7764 35.5819 11.0778 38.5759L11.477 37.8773C11.7764 34.0849 12.7745 24.7037 12.6747 19.6138C12.5749 14.1248 10.7784 11.6298 6.78643 11.6298C4.59082 11.6298 3.19361 12.7276 2.29541 13.6258C0.798403 14.9232 0 17.019 0 18.8154C0 19.9132 0.698603 20.9112 1.1976 20.9112C1.49701 20.9112 1.69661 20.4122 1.79641 20.2126C3.09381 16.1208 4.69062 14.1248 6.68663 14.1248C7.58483 14.1248 8.18363 14.4242 8.68263 14.9232C10.2794 16.6198 9.98004 21.3104 9.48104 29.8933C9.38124 32.4881 9.18164 35.6817 8.98204 39.1747C8.98204 39.7735 8.88224 40.3723 8.88224 40.9711C8.68263 43.4661 8.58283 45.3623 9.48104 45.4621C10.6786 45.6617 11.477 45.1627 11.8762 43.9651C12.475 42.1687 13.7725 37.2785 16.3673 28.3963C18.8623 19.9132 20.7585 16.7196 23.1537 16.7196C25.9481 16.7196 26.1477 21.51 25.6487 31.5899C25.5489 33.6857 25.3493 36.1807 25.2495 38.7755C25.2495 39.1747 25.2495 39.4741 25.2495 39.8733C25.1497 42.0689 25.0499 43.7655 25.6487 44.4641C25.8483 44.6637 26.1477 44.7635 26.4471 44.7635C27.6447 44.7635 28.0439 43.6657 28.6427 41.9691C28.7425 41.6697 28.8423 41.3703 28.9421 40.9711C33.0339 29.5939 36.1277 19.7136 40.2196 19.7136C41.4172 19.7136 42.4152 20.7116 42.4152 22.7077C42.4152 27.1987 40.2196 35.8813 40.2196 40.2725C40.2196 41.8693 40.7186 43.2665 41.517 44.2645C42.4152 45.2625 43.6128 45.8613 45.1098 45.8613C46.507 45.8613 47.9042 45.1627 49.4012 43.8653L49.501 43.7655L49.6008 43.8653C50.5988 45.1627 52.0958 45.8613 53.7924 45.6617C56.3872 45.4621 58.483 43.1667 59.2814 41.0709L59.481 40.6717L59.6806 41.0709C60.2794 42.6677 61.5769 44.6637 64.2715 44.3643ZM87.7246 14.6238C88.024 14.6238 88.3233 14.7236 88.523 15.023C89.521 16.4202 89.521 21.4102 87.8244 27.0989C86.8263 30.3923 85.5289 33.3863 83.9321 35.9811L83.6327 36.3803L83.5329 35.8813C83.3333 34.4841 83.2335 33.0869 83.2335 31.8893C82.9341 23.3065 85.5289 14.7236 87.7246 14.6238ZM59.481 34.6837C58.5828 38.2765 56.8862 42.5679 53.7924 42.8673H53.493C52.1956 42.8673 51.497 42.0689 51.3972 40.3723C51.1976 38.2765 52.0958 35.8813 53.6926 34.1847C54.6906 33.0869 55.7884 32.4881 56.7864 32.4881C58.1836 32.5879 59.0818 33.5859 59.481 34.6837ZM73.7525 21.51C72.6547 21.51 71.6567 22.4082 71.6567 23.5061C71.6567 24.6039 72.5549 25.5021 73.6527 25.5021V25.7017V25.5021C74.7505 25.5021 75.6487 24.6039 75.7485 23.5061C75.8483 22.4082 74.9501 21.51 73.7525 21.51ZM145.309 21.51C144.212 21.51 143.214 22.4082 143.214 23.5061C143.214 24.6039 144.112 25.5021 145.21 25.5021V25.7017V25.5021C146.307 25.5021 147.305 24.6039 147.305 23.5061C147.405 22.4082 146.507 21.51 145.309 21.51Z"
                  fill="currentColor"
                ></path>
              </svg>
            </CardHeader>
            <CardContent>
              <p className="text-base md:text-xl">
                <em>
                  &quot; With Acme, we&apos;re able to easily track our
                  performance in full detail. It&apos;s become an essential tool
                  for us to grow and engage with our audience. &quot;
                </em>
              </p>
            </CardContent>

            <CardFooter className="flex flex-col items-start">
              <h3 className="text-sm font-semibold sm:text-base">Josh Tyson</h3>
              <p className="text-muted-foreground text-sm">
                Product Manager | Capsule
              </p>
            </CardFooter>
          </Card>
          {/* End Card */}

          {/* Card */}
          <Card>
            <CardHeader>
              <svg
                className="text-foreground/65 h-auto w-20 sm:w-24"
                width="140"
                height="47"
                viewBox="0 0 140 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M96.2674 23.8697C93.7525 23.5204 92.7744 22.8916 92.8443 21.9136C92.984 20.1671 95.1497 19.9575 96.477 20.0274C99.0619 20.2369 99.6207 22.4725 99.6207 22.7519L102.136 22.5423C101.996 20.9355 100.669 17.7918 96.8962 17.5124C94.8004 17.3727 92.984 17.7918 91.7964 18.8397C90.8882 19.6082 90.1197 20.7958 89.98 21.9835C89.7006 25.8258 93.473 26.3847 95.8483 26.734C98.8523 27.1531 99.5509 27.5723 99.481 28.69C99.481 29.2489 99.1317 29.8078 98.7126 30.1571C98.0838 30.6461 96.8263 30.8557 95.5688 30.716C92.7046 30.4365 92.495 28.6202 92.495 28.2709L89.98 28.3407C89.98 29.8777 91.0279 32.8817 95.2894 33.3707C97.5948 33.6501 99.481 32.9515 100.459 32.2529C101.577 31.4146 102.206 30.0174 102.275 28.69C102.485 24.708 98.6427 24.219 96.2674 23.8697Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M110.659 30.7161C114.431 30.7161 114.152 26.4546 114.152 26.4546V17.9316H117.086V26.3847C117.086 26.3847 117.086 26.4546 117.086 26.6642C117.086 27.9217 116.946 33.3009 110.728 33.3009H110.519C104.301 33.3009 104.162 27.9915 104.162 26.6642C104.162 26.5245 104.162 26.3847 104.162 26.3847V17.9316H107.096V26.3847C107.166 26.3847 106.886 30.7161 110.659 30.7161Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M136.926 28.3405C136.088 29.8076 134.411 30.6459 132.595 30.6459C130.08 30.6459 128.054 29.0392 127.705 26.5242H139.93C139.93 26.1749 139.93 25.6859 139.93 25.3366C139.93 20.5861 136.717 17.5122 132.455 17.5122C128.194 17.5122 124.771 20.5162 124.771 25.3366C124.771 30.1569 128.194 33.2308 132.455 33.2308C135.11 33.2308 137.625 32.113 139.022 29.8775L136.926 28.3405ZM132.525 20.2368C134.97 20.2368 136.717 21.7737 137.136 24.2887H127.774C128.124 21.7038 130.01 20.2368 132.525 20.2368Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M80.9681 17.582C78.8723 17.582 76.7066 18.5601 75.7286 20.2367V17.8615H72.7944V40.2168H75.7286V30.7158C76.7066 32.4623 78.8723 33.3006 80.9681 33.3006C85.0898 33.3006 88.513 30.2966 88.513 25.4762C88.513 20.7257 85.0898 17.582 80.9681 17.582ZM80.6886 30.576C78.2435 30.576 75.6587 28.8295 75.6587 25.616C75.6587 22.4024 78.1737 20.3066 80.8284 20.3066C83.5529 20.3066 85.7186 22.3325 85.7186 25.3365C85.6487 28.4104 83.3433 30.576 80.6886 30.576Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M122.605 9.68799H119.67V32.9515H122.605V9.68799Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M64.4113 17.4424C64.3414 17.4424 64.2716 17.4424 64.2017 17.4424C64.2017 17.4424 61.6867 17.4424 59.3115 18.4204L59.5909 19.1889L60.1498 20.7957C60.9881 20.4464 62.3853 20.0272 64.2017 19.9574C64.2716 19.9574 64.3414 19.9574 64.4113 19.9574C67.6249 19.9574 67.6947 22.8915 67.6947 22.8915V23.6599L62.6648 23.5901C62.3155 23.5901 60.2895 23.5901 58.8225 24.9873C58.4732 25.3366 58.1937 25.6859 57.9841 26.1051C57.7047 26.7338 57.4951 27.4324 57.4951 28.2009C57.4951 29.1789 57.7746 30.0871 58.1937 30.8556C58.4033 31.2049 58.6827 31.5542 58.9622 31.8336C59.9402 32.7418 61.3374 33.3007 62.8744 33.3007C63.0141 33.3007 63.1538 33.3007 63.2237 33.3007C64.9702 33.2308 66.577 32.5322 67.6249 30.8556V32.9514H70.2097V23.4504C70.2796 21.0053 68.7426 17.4424 64.4113 17.4424ZM63.1538 30.9254C62.2456 30.9953 60.1498 30.5063 60.1498 28.2009C60.1498 27.5721 60.7087 26.1051 62.5251 26.1051C64.3414 26.1051 67.555 26.1051 67.555 26.1051C67.6249 28.8995 65.9482 30.7857 63.1538 30.9254Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M49.1118 30.3667C44.4311 30.3667 40.8682 26.5942 40.8682 21.9136C40.8682 17.233 44.501 13.3906 49.1118 13.3906C51.3473 13.3906 53.3034 14.2988 54.7704 15.696L56.5169 13.3208C54.6307 11.5743 51.976 10.5264 49.1118 10.5264C42.8243 10.5264 37.8643 15.6262 37.8643 21.9136C37.8643 28.201 42.8243 33.3008 49.1118 33.3008C51.6966 33.3008 54.002 32.4625 55.8183 31.1351L54.8403 28.4106C53.2335 29.5284 51.0678 30.3667 49.1118 30.3667Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M0 30.2965H3.63273V28.061H8.24351V30.2965H11.8064V12.9712H0V30.2965Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M18.0938 8.08105C17.5349 8.08105 17.1157 8.50022 17.1157 9.0591C17.1157 9.61798 17.5349 10.0371 18.0938 10.0371C18.6526 10.0371 19.0718 9.61798 19.0718 9.0591C19.1417 8.57008 18.6526 8.08105 18.0938 8.08105Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M18.0938 12.6221C17.5349 12.6221 17.1157 13.0412 17.1157 13.6001C17.1157 14.159 17.5349 14.5782 18.0938 14.5782C18.6526 14.5782 19.0718 14.159 19.0718 13.6001C19.1417 13.1111 18.6526 12.6221 18.0938 12.6221Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M18.0938 17.2329C17.5349 17.2329 17.1157 17.6521 17.1157 18.211C17.1157 18.7698 17.5349 19.189 18.0938 19.189C18.6526 19.189 19.0718 18.7698 19.0718 18.211C19.1417 17.6521 18.6526 17.2329 18.0938 17.2329Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M22.7744 8.08105C22.2155 8.08105 21.7964 8.50022 21.7964 9.0591C21.7964 9.61798 22.2155 10.0371 22.7744 10.0371C23.3333 10.0371 23.7525 9.61798 23.7525 9.0591C23.7525 8.57008 23.3333 8.08105 22.7744 8.08105Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M22.7744 12.6221C22.2155 12.6221 21.7964 13.0412 21.7964 13.6001C21.7964 14.159 22.2155 14.5782 22.7744 14.5782C23.3333 14.5782 23.7525 14.159 23.7525 13.6001C23.7525 13.1111 23.3333 12.6221 22.7744 12.6221Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M22.7744 17.2329C22.2155 17.2329 21.7964 17.6521 21.7964 18.211C21.7964 18.7698 22.2155 19.189 22.7744 19.189C23.3333 19.189 23.7525 18.7698 23.7525 18.211C23.7525 17.6521 23.3333 17.2329 22.7744 17.2329Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M27.3154 8.08105C26.7566 8.08105 26.3374 8.50022 26.3374 9.0591C26.3374 9.61798 26.7566 10.0371 27.3154 10.0371C27.8743 10.0371 28.2935 9.61798 28.2935 9.0591C28.2935 8.57008 27.8743 8.08105 27.3154 8.08105Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M27.3154 12.6221C26.7566 12.6221 26.3374 13.0412 26.3374 13.6001C26.3374 14.159 26.7566 14.5782 27.3154 14.5782C27.8743 14.5782 28.2935 14.159 28.2935 13.6001C28.2935 13.1111 27.8743 12.6221 27.3154 12.6221Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M27.3154 17.2329C26.7566 17.2329 26.3374 17.6521 26.3374 18.211C26.3374 18.7698 26.7566 19.189 27.3154 19.189C27.8743 19.189 28.2935 18.7698 28.2935 18.211C28.2935 17.6521 27.8743 17.2329 27.3154 17.2329Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M6.07776 24.2885C2.79433 24.2186 0.0697788 26.8035 -8.15348e-05 30.017C-0.0699418 33.2306 2.51489 35.9552 5.79832 36.0949C9.08176 36.1647 11.7364 33.5799 11.8762 30.2965C11.8762 27.0829 9.29134 24.3584 6.07776 24.2885ZM7.89413 32.3224H3.91209V28.3404H7.89413V32.3224Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M6.07776 24.2885C2.79433 24.2186 0.0697788 26.8035 -8.15348e-05 30.017C-0.0699418 33.2306 2.51489 35.9552 5.79832 36.0949C9.08176 36.1647 11.7364 33.5799 11.8762 30.2965C11.8762 27.0829 9.29134 24.3584 6.07776 24.2885ZM7.89413 32.3224H3.91209V28.3404H7.89413V32.3224Z"
                    fill="white"
                    fillOpacity="0.2"
                  ></path>
                  <path
                    d="M5.93812 19.1189C9.21766 19.1189 11.8762 16.4603 11.8762 13.1808C11.8762 9.90126 9.21766 7.24268 5.93812 7.24268C2.65859 7.24268 0 9.90126 0 13.1808C0 16.4603 2.65859 19.1189 5.93812 19.1189Z"
                    fill="white"
                  ></path>
                  <path
                    d="M16.627 23.1709V35.3266H28.7826V23.1709H16.627ZM26.3375 31.9733H19.1419V30.4364H26.3375V31.9733ZM26.3375 27.9913H19.1419V26.4543H26.3375V27.9913Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="140" height="47" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </CardHeader>

            <CardContent>
              <p className="text-base md:text-xl">
                <em>
                  &quot; In September, I will be using this theme for 2 years. I
                  through multiple updates and changes and I&apos;m very glad to
                  see the consistency and effort made by the team. &quot;
                </em>
              </p>
            </CardContent>

            <CardFooter className="flex flex-col items-start">
              <h3 className="text-sm font-semibold sm:text-base">Luisa</h3>
              <p className="text-muted-foreground text-sm">
                Senior Director of Operations | Fitbit
              </p>
            </CardFooter>
          </Card>
          {/* End Card */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Testimonials */}
    </>
  );
}

```

```tsx
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function BigImage() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Grid */}
      <div className="md:grid md:grid-cols-2 md:items-center md:gap-10 lg:gap-16">
        <div className="mb-24 hidden sm:px-6 md:mb-0 md:block">
          <div className="relative">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=500&h=600&q=80"
              alt="Avatar"
              width={500}
              height={600}
            />

            {/* SVG Element */}
            <div className="absolute start-0 bottom-0 -z-[1] -translate-x-14 translate-y-10">
              <svg
                className="text-muted-foreground h-auto max-w-40"
                width="696"
                height="653"
                viewBox="0 0 696 653"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="72.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="171.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="270.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="369.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="468.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="567.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="666.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="29.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="128.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="227.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="326.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="425.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="524.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="623.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="72.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="171.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="270.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="369.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="468.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="567.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="666.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="29.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="128.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="227.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="326.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="425.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="524.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="623.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="72.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="171.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="270.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="369.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="468.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="567.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="666.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="29.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="128.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="227.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="326.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="425.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="524.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="623.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="72.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="171.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="270.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="369.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="468.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="567.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="666.5" cy="623.5" r="29.5" fill="currentColor" />
              </svg>
            </div>
            {/* End SVG Element */}
          </div>
        </div>
        {/* End Col */}

        <div>
          {/* Blockquote */}
          <blockquote className="relative">
            <svg
              className="text-muted-foreground/15 absolute start-0 top-0 size-24 -translate-x-8 -translate-y-4 transform"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3Z"
                fill="currentColor"
              />
            </svg>

            <div className="relative z-10">
              <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wide uppercase">
                Featured client
              </p>

              <p className="text-xl font-medium italic md:text-2xl md:leading-normal xl:text-3xl xl:leading-normal">
                To say that switching to Acme has been life-changing is an
                understatement. My business has tripled and I got my life back.
              </p>
            </div>

            <footer className="mt-6">
              <div className="flex items-center">
                <div className="shrink-0 md:hidden">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                      alt="Avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ms-4 md:ms-0">
                  <div className="text-base font-semibold">Nicole Grazioso</div>
                  <div className="text-muted-foreground text-xs">
                    Director Payments &amp; Risk | Airbnb
                  </div>
                </div>
              </div>
            </footer>

            <div className="mt-8 lg:mt-14">
              <Button>Read the story</Button>
            </div>
          </blockquote>
          {/* End Blockquote */}
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
  );
}

```

```tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "A rare talent who bridges the gap between aesthetics and functionality with remarkable precision.",
    name: "Sarah Chen",
    role: "Design Director",
    company: "Figma",
    image: "https://plus.unsplash.com/premium_photo-1689551671541-31a345ce6ae0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyc3xlbnwwfHwwfHx8MA%3D%3D$0",
  },
  {
    id: 2,
    quote: "Every pixel tells a story. Working together elevated our entire brand experience.",
    name: "Marcus Webb",
    role: "Creative Lead",
    company: "Stripe",
    image: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D$0",
  },
  {
    id: 3,
    quote: "Transforms complex problems into elegant, intuitive solutions that users love.",
    name: "Elena Voss",
    role: "Head of Product",
    company: "Linear",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyc3xlbnwwfHwwfHx8MA%3D%3D$0",
  },
]

export function TestimonialsSplit() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const active = testimonials[activeIndex]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-6">
      <div
        className="relative grid grid-cols-[1fr_auto] gap-12 items-center cursor-pointer group"
        onClick={nextTestimonial}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Left: Quote Content */}
        <div className="space-y-8">
          {/* Company Tag */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.company}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground"
            >
              <span className="w-8 h-px bg-muted-foreground/50" />
              {active.company}
            </motion.div>
          </AnimatePresence>

          {/* Quote */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-4xl font-light leading-[1.3] tracking-tight text-foreground"
              >
                {active.quote}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Author Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="w-10 h-px bg-foreground/20" />
              <div>
                <p className="text-sm font-medium text-foreground">{active.name}</p>
                <p className="text-xs text-muted-foreground">{active.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Visual Element */}
        <div className="relative w-48 h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden border border-border/50">
                <img
                  src={active.image || "/placeholder.svg"}
                  alt={active.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Click indicator */}
          <motion.div
            animate={{
              opacity: isHovering ? 1 : 0,
              scale: isHovering ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground"
          >
            <span>Next</span>
            <ArrowUpRight className="w-3 h-3" />
          </motion.div>
        </div>

        {/* Progress Dots */}
        <div className="absolute -bottom-16 left-0 flex items-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                setActiveIndex(index)
              }}
              className="relative p-1 group/dot"
            >
              <span
                className={`
                  block w-2 h-2 rounded-full transition-all duration-300
                  ${
                    index === activeIndex
                      ? "bg-foreground scale-100"
                      : "bg-muted-foreground/30 scale-75 hover:bg-muted-foreground/50 hover:scale-100"
                  }
                `}
              />
              {index === activeIndex && (
                <motion.span
                  layoutId="activeDot"
                  className="absolute inset-0 border border-foreground/30 rounded-full"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

```

```tsx
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Sun, Moon } from 'lucide-react';

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our business functions improved with a user-friendly design and positive customer feedback.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileFocus={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-lg shadow-black/5 max-w-xs w-full bg-white dark:bg-neutral-900 transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-primary/30" 
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal m-0 transition-colors duration-300">
                      {text}
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-100 dark:ring-neutral-800 group-hover:ring-primary/30 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-neutral-900 dark:text-white transition-colors duration-300">
                          {name}
                        </cite>
                        <span className="text-sm leading-5 tracking-tight text-neutral-500 dark:text-neutral-500 mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-24 relative overflow-hidden"
    >
      <motion.div 
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
          <div className="flex justify-center">
            <div className="border border-neutral-300 dark:border-neutral-700 py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-neutral-600 dark:text-neutral-400 bg-neutral-100/50 dark:bg-neutral-800/50 transition-colors">
              Testimonials
            </div>
          </div>

          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight mt-6 text-center text-neutral-900 dark:text-white transition-colors">
            What our users say
          </h2>
          <p className="text-center mt-5 text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed max-w-sm transition-colors">
            Discover how thousands of teams streamline their operations with our platform.
          </p>
        </div>

        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </motion.div>
    </section>
  );
};

// --- Main App Component ---
export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="w-screen min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300 flex flex-col justify-center relative selection:bg-primary selection:text-white">
      {/* Dark Mode Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 shadow-xl hover:scale-110 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <TestimonialsSection />
    </div>
  );
}

```

```tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    quote: "This changed everything for me.",
    author: "Sarah Chen",
    role: "Designer at Figma",
    avatar: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D$0",
  },
  {
    id: 2,
    quote: "Simply brilliant. Nothing else compares.",
    author: "Marcus Johnson",
    role: "Engineer at Vercel",
    avatar: "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D$0",
  },
  {
    id: 3,
    quote: "The attention to detail is unmatched.",
    author: "Elena Rodriguez",
    role: "Founder at Craft",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D$0",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote)
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    if (index === activeIndex || isAnimating) return
    setIsAnimating(true)

    setTimeout(() => {
      setDisplayedQuote(testimonials[index].quote)
      setDisplayedRole(testimonials[index].role)
      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 400)
    }, 200)
  }

  return (
    <div className="flex flex-col items-center gap-10 py-16">
      {/* Quote Container */}
      <div className="relative px-8">
        <span className="absolute -left-2 -top-6 text-7xl font-serif text-foreground/[0.06] select-none pointer-events-none">
          "
        </span>

        <p
          className={cn(
            "text-2xl md:text-3xl font-light text-foreground text-center max-w-lg leading-relaxed transition-all duration-400 ease-out",
            isAnimating ? "opacity-0 blur-sm scale-[0.98]" : "opacity-100 blur-0 scale-100",
          )}
        >
          {displayedQuote}
        </p>

        <span className="absolute -right-2 -bottom-8 text-7xl font-serif text-foreground/[0.06] select-none pointer-events-none">
          "
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 mt-2">
        {/* Role text */}
        <p
          className={cn(
            "text-xs text-muted-foreground tracking-[0.2em] uppercase transition-all duration-500 ease-out",
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0",
          )}
        >
          {displayedRole}
        </p>

        <div className="flex items-center justify-center gap-2">
          {testimonials.map((testimonial, index) => {
            const isActive = activeIndex === index
            const isHovered = hoveredIndex === index && !isActive
            const showName = isActive || isHovered

            return (
              <button
                key={testimonial.id}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative flex items-center gap-0 rounded-full cursor-pointer",
                  "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isActive ? "bg-foreground shadow-lg" : "bg-transparent hover:bg-muted/80",
                  showName ? "pr-4 pl-2 py-2" : "p-0.5",
                )}
              >
                {/* Avatar with smooth ring animation */}
                <div className="relative flex-shrink-0">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className={cn(
                      "w-8 h-8 rounded-full object-cover",
                      "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isActive ? "ring-2 ring-background/30" : "ring-0",
                      !isActive && "hover:scale-105",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    showName ? "grid-cols-[1fr] opacity-100 ml-2" : "grid-cols-[0fr] opacity-0 ml-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className={cn(
                        "text-sm font-medium whitespace-nowrap block",
                        "transition-colors duration-300",
                        isActive ? "text-background" : "text-foreground",
                      )}
                    >
                      {testimonial.author}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

```

```tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "The attention to detail and creative vision transformed our brand identity completely.",
    author: "Sarah Chen",
    role: "Creative Director",
    company: "Studio Forma",
    image: "https://plus.unsplash.com/premium_photo-1689551671548-79ff30459d2a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D$0",
  },
  {
    id: 2,
    quote: "Working with them felt like a true creative partnership from day one.",
    author: "Marcus Webb",
    role: "Head of Design",
    company: "Minimal Co",
    image: "https://images.unsplash.com/photo-1649123245135-4db6ead931b5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D$0",
  },
  {
    id: 3,
    quote: "They understand that great design is invisible yet unforgettable.",
    author: "Elena Voss",
    role: "Art Director",
    company: "Pixel & Co",
    image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D$0",
  },
]

export default function TestimonialsEditorial() {
  const [active, setActive] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActive(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }

  const handlePrev = () => {
    const newIndex = active === 0 ? testimonials.length - 1 : active - 1
    handleChange(newIndex)
  }

  const handleNext = () => {
    const newIndex = active === testimonials.length - 1 ? 0 : active + 1
    handleChange(newIndex)
  }

  const current = testimonials[active]

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-16">
      {/* Large index number */}
      <div className="flex items-start gap-8">
        <span
          className="text-[120px] font-light leading-none text-foreground/10 select-none transition-all duration-500"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 pt-6">
          {/* Quote */}
          <blockquote
            className={`text-2xl md:text-3xl font-light leading-relaxed text-foreground tracking-tight transition-all duration-300 ${
              isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            }`}
          >
            {current.quote}
          </blockquote>

          {/* Author info with hover reveal */}
          <div
            className={`mt-10 group cursor-default transition-all duration-300 delay-100 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-foreground/10 group-hover:ring-foreground/30 transition-all duration-300">
                <Image
                  src={current.image || "/placeholder.svg"}
                  alt={current.author}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div>
                <p className="font-medium text-foreground">{current.author}</p>
                <p className="text-sm text-muted-foreground">
                  {current.role}
                  <span className="mx-2 text-foreground/20">/</span>
                  <span className="group-hover:text-foreground transition-colors duration-300">{current.company}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - vertical line selector */}
      <div className="mt-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button key={index} onClick={() => handleChange(index)} className="group relative py-4">
                <span
                  className={`block h-px transition-all duration-500 ease-out ${
                    index === active
                      ? "w-12 bg-foreground"
                      : "w-6 bg-foreground/20 group-hover:w-8 group-hover:bg-foreground/40"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

```

```tsx
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// TypeScript interface for a single testimonial object
interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
}

// TypeScript interface for the component's props
interface TestimonialSectionProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

/**
 * A responsive section component to display customer testimonials.
 * It features a title, subtitle, and a grid of animated testimonial cards.
 */
export const TestimonialSection = ({
  title,
  subtitle,
  testimonials,
}: TestimonialSectionProps) => {
  // Animation variants for the container to orchestrate staggered children animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for each testimonial card
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full bg-background py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        {/* Section Header */}
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          {subtitle}
        </p>

        {/* Testimonials Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="relative overflow-hidden rounded-lg bg-card shadow-sm"
              variants={itemVariants}
            >
              <div className="relative">
                <img
                  src={testimonial.imageSrc}
                  alt={testimonial.name}
                  className="h-120 w-full object-cover"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </div>

              {/* Content within the card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white">
                <Quote
                  className="mb-4 h-8 w-8 text-white/40"
                  aria-hidden="true"
                />
                <blockquote className="text-base font-medium leading-relaxed">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-4">
                  <p className="font-semibold text-card-white/100">
                    &mdash; {testimonial.name},
                    <span className="ml-1 text-white/60">
                      {testimonial.role}
                    </span>
                  </p>
                </figcaption>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
```

```tsx
"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"

const testimonials = [
  {
    quote: "Transformed our entire creative process overnight.",
    author: "Sarah Chen",
    role: "Design Director",
    company: "Linear",
  },
  {
    quote: "The most elegant solution we've ever implemented.",
    author: "Marcus Webb",
    role: "Creative Lead",
    company: "Vercel",
  },
  {
    quote: "Pure craftsmanship in every single detail.",
    author: "Elena Frost",
    role: "Head of Product",
    company: "Stripe",
  },
]

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Transform for parallax on the large number
  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = testimonials[activeIndex]

  return (
    <div className="flex items-center justify-center min-h-screen bg-background overflow-hidden">
      <div ref={containerRef} className="relative w-full max-w-5xl" onMouseMove={handleMouseMove}>
        {/* Oversized index number - positioned to bleed off left edge */}
        <motion.div
          className="absolute -left-8 top-1/2 -translate-y-1/2 text-[28rem] font-bold text-foreground/[0.03] select-none pointer-events-none leading-none tracking-tighter"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content - asymmetric layout */}
        <div className="relative flex">
          {/* Left column - vertical text */}
          <div className="flex flex-col items-center justify-center pr-16 border-r border-border">
            <motion.span
              className="text-xs font-mono text-muted-foreground tracking-widest uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Testimonials
            </motion.span>

            {/* Vertical progress line */}
            <div className="relative h-32 w-px bg-border mt-8">
              <motion.div
                className="absolute top-0 left-0 w-full bg-foreground origin-top"
                animate={{
                  height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center - main content */}
          <div className="flex-1 pl-16 py-12">
            {/* Company badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {current.company}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote with character reveal */}
            <div className="relative mb-12 min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="text-4xl md:text-5xl font-light text-foreground leading-[1.15] tracking-tight"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {current.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.3em]"
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.02 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author row */}
            <div className="flex items-end justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  {/* Animated line before name */}
                  <motion.div
                    className="w-8 h-px bg-foreground"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="text-base font-medium text-foreground">{current.author}</p>
                    <p className="text-sm text-muted-foreground">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={goPrev}
                  className="group relative w-12 h-12 rounded-full border border-border flex items-center justify-center overflow-hidden"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-foreground"
                    initial={{ x: "-100%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-foreground group-hover:text-foreground/30 transition-colors"
                  >
                    <path
                      d="M10 12L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>

                <motion.button
                  onClick={goNext}
                  className="group relative w-12 h-12 rounded-full border border-border flex items-center justify-center overflow-hidden"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-foreground"
                    initial={{ x: "100%" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="relative z-10 text-foreground group-hover:text-foreground/30 transition-colors"
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker - subtle repeating company names */}
        <div className="absolute -bottom-20 left-0 right-0 overflow-hidden opacity-[0.08] pointer-events-none">
          <motion.div
            className="flex whitespace-nowrap text-6xl font-bold tracking-tight"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8">
                {testimonials.map((t) => t.company).join(" • ")} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

```

```tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Testimonials() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
                    <h2 className="text-4xl font-medium lg:text-5xl">Build by makers, loved by thousand developers</h2>
                    <p>Gemini is evolving to be more than just the models. It supports an entire to the APIs and platforms helping developers and businesses innovate.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
                    <Card className="grid grid-rows-[auto_1fr] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2">
                        <CardHeader>
                            <img
                                className="h-6 w-fit dark:invert"
                                src="https://html.tailus.io/blocks/customers/nike.svg"
                                alt="Nike Logo"
                                height="24"
                                width="auto"
                            />
                        </CardHeader>
                        <CardContent>
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-xl font-medium">Tailus has transformed the way I develop web applications. Their extensive collection of UI components, blocks, and templates has significantly accelerated my workflow. The flexibility to customize every aspect allows me to create unique user experiences. Tailus is a game-changer for modern web development</p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src="https://tailus.io/images/reviews/shekinah.webp"
                                            alt="Shekinah Tshiokufila"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>ST</AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <cite className="text-sm font-medium">Shekinah Tshiokufila</cite>
                                        <span className="text-muted-foreground block text-sm">Software Ingineer</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p className="text-xl font-medium">Tailus is really extraordinary and very practical, no need to break your head. A real gold mine.</p>

                                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src="https://tailus.io/images/reviews/jonathan.webp"
                                            alt="Jonathan Yombo"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>JY</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium">Jonathan Yombo</cite>
                                        <span className="text-muted-foreground block text-sm">Software Ingineer</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p>Great work on tailfolio template. This is one of the best personal website that I have seen so far!</p>

                                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src="https://tailus.io/images/reviews/yucel.webp"
                                            alt="Yucel Faruksahan"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>YF</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <cite className="text-sm font-medium">Yucel Faruksahan</cite>
                                        <span className="text-muted-foreground block text-sm">Creator, Tailkits</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                    <Card className="card variant-mixed">
                        <CardContent className="h-full pt-6">
                            <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                                <p>Great work on tailfolio template. This is one of the best personal website that I have seen so far!</p>

                                <div className="grid grid-cols-[auto_1fr] gap-3">
                                    <Avatar className="size-12">
                                        <AvatarImage
                                            src="https://tailus.io/images/reviews/rodrigo.webp"
                                            alt="Rodrigo Aguilar"
                                            height="400"
                                            width="400"
                                            loading="lazy"
                                        />
                                        <AvatarFallback>YF</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">Rodrigo Aguilar</p>
                                        <span className="text-muted-foreground block text-sm">Creator, TailwindAwesome</span>
                                    </div>
                                </div>
                            </blockquote>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
```

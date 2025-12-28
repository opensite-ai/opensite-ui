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

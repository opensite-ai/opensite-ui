# Additional Components to Add to Blocks Library

## components/blocks/features

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  PlusCircle,
} from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { Button } from "@/components/ui/button";

interface FeatureItem {
  image: string;
  title: string;
  description: string;
}

interface ControlsProps {
  handleNext: () => void;
  handlePrevious: () => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const Controls = ({
  handleNext,
  handlePrevious,
  isPreviousDisabled,
  isNextDisabled,
}: ControlsProps) => {
  return (
    <div className="hidden flex-col items-start gap-8 lg:flex">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-background/50! hover:bg-background! [&_svg:not([class*='size-'])]:size-6"
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
      >
        <ChevronUp />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-background/50! hover:bg-background! [&_svg:not([class*='size-'])]:size-6"
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        <ChevronDown />
      </Button>
    </div>
  );
};

interface FeatureCardProps {
  feature: FeatureItem;
  isActive: boolean;
  onClick: () => void;
}

const FeatureCard = ({ feature, isActive, onClick }: FeatureCardProps) => {
  const variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        layout
        transition={{
          layout: {
            duration: 0.4,
            ease: "easeOut",
          },
        }}
        style={{
          borderRadius: "24px",
        }}
        className="flex cursor-pointer items-start gap-4 overflow-hidden bg-background md:w-fit md:max-w-sm"
        onClick={onClick}
      >
        {isActive ? (
          <motion.div
            layout
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            key={`feature-description-active-${feature.title}`}
            transition={{
              duration: 0.4,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="p-6 text-sm md:p-8 md:text-base"
          >
            <p>
              <span className="font-semibold">{feature.title}.</span>{" "}
              <span>{feature.description}</span>
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            key={`feature-description-inactive-${feature.title}`}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: "easeOut",
            }}
            className={cn(
              "flex h-fit shrink-0 items-center gap-4 text-sm md:py-3.5 md:pr-6 md:pl-3 md:text-base",
              !isActive && "h-0 w-0 md:h-auto md:w-auto",
            )}
            style={{
              height: "auto",
              lineHeight: "normal",
            }}
          >
            <PlusCircle strokeWidth={1.5} />
            <p className="shrink-0 font-semibold">{feature.title}</p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

interface FeaturesDesktopProps {
  features: FeatureItem[];
  handleNext: () => void;
  handlePrevious: () => void;
  activeIndex: number;
  handleFeatureClick: (index: number) => void;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const FeaturesDesktop = ({
  features,
  handleNext,
  handlePrevious,
  activeIndex,
  handleFeatureClick,
  isPreviousDisabled,
  isNextDisabled,
}: FeaturesDesktopProps) => {
  return (
    <div className="relative z-10 hidden items-center gap-8 md:flex">
      <Controls
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        isPreviousDisabled={isPreviousDisabled}
        isNextDisabled={isNextDisabled}
      />
      <div className="flex flex-col gap-4">
        {features.map((feature, index) => {
          return (
            <FeatureCard
              key={`feature-card-${index}`}
              feature={feature}
              isActive={index === activeIndex}
              onClick={() => handleFeatureClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

interface FeatureMobileProps {
  features: FeatureItem[];
  handleNext: () => void;
  handlePrevious: () => void;
  activeIndex: number;
  direction: 1 | -1;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}

const FeaturesMobile = ({
  features,
  handleNext,
  handlePrevious,
  activeIndex,
  direction,
  isPreviousDisabled,
  isNextDisabled,
}: FeatureMobileProps) => {
  const variants = {
    initial: (direction: 1 | -1) => ({
      opacity: 0,
      scale: 0.6,
      x: direction * 50 + "%",
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (direction: 1 | -1) => ({
      opacity: 0,
      scale: 0.6,
      x: direction * -50 + "%",
    }),
  };

  return (
    <div className="absolute bottom-6 left-0 z-10 flex w-full items-end justify-between gap-6 px-6 md:hidden">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-background! [&_svg:not([class*='size-'])]:size-6"
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
      >
        <ChevronLeft />
      </Button>
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={`feature-mobile-${activeIndex}`}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          className="h-full w-full object-cover"
        >
          <FeatureCard
            feature={features[activeIndex]}
            isActive={true}
            onClick={() => {}}
          />
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-background! [&_svg:not([class*='size-'])]:size-6"
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

interface Feature323Props {
  heading?: string;
  features?: FeatureItem[];
  className?: string;
}

const Feature323 = ({
  className,
  heading = "Discover Our Products",
  features = [
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/klim-musalimov-DAGss-dkVOs-unsplash-2.jpg",
      title: "Smart Watches",
      description:
        "Stay connected and track your health with advanced fitness monitoring. Customizable watch faces for every lifestyle.",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/klim-musalimov-IGO10LkxP_g-unsplash-2.jpg",
      title: "Fitness Tracking",
      description:
        "Monitor your daily activity, sleep patterns, and workout performance. Water-resistant design with week-long battery life.",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/dennis-cortes-cL7xovIO7sw-unsplash-3.jpg",
      title: "Gaming Consoles",
      description:
        "Next-generation gaming with stunning 4K graphics, lightning-fast load times, and an expansive library of exclusive titles.",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Sleek-Laptop-Silhouette-1.png",
      title: "Premium Laptops",
      description:
        "Powerful performance in a sleek design. Latest processors, all-day battery life, and stunning displays for work and play.",
    },
    {
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/other/jascent-leung-fCO3tBcnkhg-unsplash-1.jpg",
      title: "Phone Cases & Accessories",
      description:
        "Protect your device with premium cases, wireless charging stands, and accessories that combine style with functionality.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/electronics/Hands-Typing-on-Laptop-1.png",
      title: "Work From Anywhere",
      description:
        "High-performance laptops built for professionals. Reliable computing power, comfortable keyboards, and enterprise-grade security.",
    },
  ],
}: Feature323Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleNext = () => {
    setDirection(1);
    if (activeIndex !== features.length - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    setDirection(-1);
    if (activeIndex !== 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleFeatureClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const xOffset = !isMobile ? 50 : 15;
  const yOffset = !isMobile ? 15 : 5;
  const scale = !isMobile ? 0.6 : 0.8;

  const variants = {
    initial: (direction: 1 | -1) => ({
      opacity: 0,
      scale: scale,
      filter: "blur(20px)",
      x: direction * xOffset + "%",
      y: direction * yOffset + "%",
    }),
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
    },
    exit: (direction: 1 | -1) => ({
      opacity: 0,
      scale: scale,
      x: direction * -xOffset + "%",
      y: direction * -yOffset + "%",
      filter: "blur(20px)",
    }),
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container space-y-20">
        <div className="relative left-1/2 max-w-5xl -translate-x-1/2">
          <h2 className="text-2xl font-semibold sm:text-5xl">{heading}</h2>
        </div>
        <div className="relative h-full min-h-[60vh] w-full overflow-hidden rounded-4xl bg-muted px-8 py-8 md:min-h-full md:py-20">
          <FeaturesDesktop
            features={features}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            activeIndex={activeIndex}
            handleFeatureClick={handleFeatureClick}
            isPreviousDisabled={activeIndex === 0}
            isNextDisabled={activeIndex === features.length - 1}
          />
          <FeaturesMobile
            features={features}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            activeIndex={activeIndex}
            direction={direction}
            isPreviousDisabled={activeIndex === 0}
            isNextDisabled={activeIndex === features.length - 1}
          />

          <div className="absolute top-0 right-0 z-0 flex h-full w-full items-center justify-center lg:w-2/3 lg:mask-[linear-gradient(to_right,transparent,black_30%,black)]">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.img
                key={`feature-image-${activeIndex}`}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={direction}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                src={features[activeIndex].image}
                alt={features[activeIndex].title}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature323 };
```

## components/blocks/about

```tsx
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface SplitPageHeroProps {
  className?: string;
}

const SplitPageHero = ({ className }: SplitPageHeroProps) => {
  return (
    <section className={cn("dark flex", className)}>
      <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
        <div className="container my-10 flex w-[500px] flex-col gap-24">
          <h1 className="text-4xl text-foreground">
            Business{" "}
            <span className="bg-linear-to-tr from-foreground to-muted bg-clip-text text-transparent">
              PRO
            </span>
          </h1>
          <div>
            <h2 className="text-4xl text-foreground lg:text-6xl">
              Achieve More with Elite Access Pro
            </h2>
            <p className="mt-2.5 text-foreground lg:text-xl">
              Enhance your career hunt with increased visibility, first-look
              opportunities and monetary incentives!
            </p>
            <Button className="mt-10 flex h-fit items-center gap-2.5 rounded-xl px-5 py-4 font-bold">
              <span>Upgrade to premium </span>
              <ChevronRight className="size-5!" />
            </Button>
          </div>
        </div>
      </div>
      <img
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
        alt=""
        className="hidden h-screen w-1/2 object-cover lg:block"
      />
    </section>
  );
};

export { SplitPageHero };
```

```tsx
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const principles = [
  {
    number: '01',
    title: 'Customer-Centric',
    description:
      'We place our customers at the center of everything we do, designing products and services that solve real problems and create lasting value.',
  },
  {
    number: '02',
    title: 'Innovation-Driven',
    description:
      'We continuously explore new ideas and technologies to push boundaries and create better solutions for evolving challenges.',
  },
  {
    number: '03',
    title: 'Quality-Focused',
    description:
      'We are committed to excellence in every aspect of our work, from the products we build to the experiences we create and the support we provide.',
  },
  {
    number: '04',
    title: 'Inclusive by Design',
    description:
      'We embrace diversity of thought, background, and perspective, creating solutions that work for everyone and building teams that reflect the communities we serve.',
  },
];

export default function AboutSectionMissionStatement() {
  return (
    <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="space-y-8">
          <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
            Our Mission
          </div>

          <h2 className="text-4xl leading-tight font-bold tracking-tight lg:text-5xl">
            To empower people through technology that&apos;s intuitive,
            accessible, and transformative.
          </h2>

          <p className="text-muted-foreground text-xl">
            We believe technology should serve humanity, not the other way
            around. Our mission drives us to create solutions that enhance
            people&apos;s lives, expand their capabilities, and help them
            achieve their goals.
          </p>

          <div className="pt-2">
            <Button asChild className="group">
              <a href="#" className="inline-flex items-center">
                See our impact
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {principles.map((principle) => (
            <div
              key={principle.number}
              className="hover:bg-accent/50 relative rounded-lg border p-6 transition-colors"
            >
              <div className="text-primary/20 absolute top-4 right-4 text-3xl font-bold">
                {principle.number}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">{principle.title}</h3>
                <p className="text-muted-foreground">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-accent mt-24 rounded-lg p-8 lg:p-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
            <p className="text-muted-foreground mb-4">
              We envision a world where technology enhances human potential,
              enabling everyone to achieve more, connect meaningfully, and
              contribute to a better future. We strive to be the company that
              makes this vision a reality through thoughtful innovation and an
              unwavering commitment to our core principles.
            </p>
          </div>
          <div className="flex justify-center lg:col-span-1 lg:justify-end">
            <Button asChild size="lg" variant="outline" className="group">
              <a href="#" className="inline-flex items-center">
                View our strategy
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```tsx
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const principles = [
  {
    number: '01',
    title: 'Customer-Centric',
    description:
      'We place our customers at the center of everything we do, designing products and services that solve real problems and create lasting value.',
  },
  {
    number: '02',
    title: 'Innovation-Driven',
    description:
      'We continuously explore new ideas and technologies to push boundaries and create better solutions for evolving challenges.',
  },
  {
    number: '03',
    title: 'Quality-Focused',
    description:
      'We are committed to excellence in every aspect of our work, from the products we build to the experiences we create and the support we provide.',
  },
  {
    number: '04',
    title: 'Inclusive by Design',
    description:
      'We embrace diversity of thought, background, and perspective, creating solutions that work for everyone and building teams that reflect the communities we serve.',
  },
];

export default function AboutSectionMissionStatement() {
  return (
    <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="space-y-8">
          <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
            Our Mission
          </div>

          <h2 className="text-4xl leading-tight font-bold tracking-tight lg:text-5xl">
            To empower people through technology that&apos;s intuitive,
            accessible, and transformative.
          </h2>

          <p className="text-muted-foreground text-xl">
            We believe technology should serve humanity, not the other way
            around. Our mission drives us to create solutions that enhance
            people&apos;s lives, expand their capabilities, and help them
            achieve their goals.
          </p>

          <div className="pt-2">
            <Button asChild className="group">
              <a href="#" className="inline-flex items-center">
                See our impact
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {principles.map((principle) => (
            <div
              key={principle.number}
              className="hover:bg-accent/50 relative rounded-lg border p-6 transition-colors"
            >
              <div className="text-primary/20 absolute top-4 right-4 text-3xl font-bold">
                {principle.number}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">{principle.title}</h3>
                <p className="text-muted-foreground">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-accent mt-24 rounded-lg p-8 lg:p-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
            <p className="text-muted-foreground mb-4">
              We envision a world where technology enhances human potential,
              enabling everyone to achieve more, connect meaningfully, and
              contribute to a better future. We strive to be the company that
              makes this vision a reality through thoughtful innovation and an
              unwavering commitment to our core principles.
            </p>
          </div>
          <div className="flex justify-center lg:col-span-1 lg:justify-end">
            <Button asChild size="lg" variant="outline" className="group">
              <a href="#" className="inline-flex items-center">
                View our strategy
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```tsx
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  Heart,
  Shield,
  Zap,
  Users,
  Brain,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const values = [
  {
    id: 'integrity',
    icon: Shield,
    title: 'Integrity',
    shortDescription: "Doing what's right, even when no one is watching.",
    longDescription:
      "We believe that honesty and strong moral principles are the foundation of any successful business. We are transparent in our practices, accountable for our actions, and committed to doing what's right in all situations.",
    examples: [
      'Transparent pricing with no hidden fees',
      'Honest communication with clients, even when delivering difficult news',
      'Ethical sourcing and business practices',
    ],
  },
  {
    id: 'innovation',
    icon: Zap,
    title: 'Innovation',
    shortDescription:
      'Constantly exploring new ideas to create better solutions.',
    longDescription:
      'We embrace change and continuously seek new ways to solve problems. We encourage creative thinking, experimentation, and calculated risk-taking to drive our industry forward and deliver exceptional value to our clients.',
    examples: [
      'Dedicated time for all team members to explore new ideas',
      'Regular hackathons and innovation challenges',
      'Investment in research and emerging technologies',
    ],
  },
  {
    id: 'collaboration',
    icon: Users,
    title: 'Collaboration',
    shortDescription: 'Achieving more by working together effectively.',
    longDescription:
      'We believe the best results come from diverse teams working together toward common goals. We foster an inclusive environment where all voices are heard, different perspectives are valued, and collective success is celebrated.',
    examples: [
      'Cross-functional teams with diverse backgrounds and expertise',
      'Open workspaces and collaboration tools',
      'Recognition programs that celebrate team achievements',
    ],
  },
  {
    id: 'empathy',
    icon: Heart,
    title: 'Empathy',
    shortDescription: 'Understanding and sharing the feelings of others.',
    longDescription:
      "We prioritize understanding our customers' and colleagues' perspectives and experiences. By putting ourselves in others' shoes, we build stronger relationships, create better products, and foster a supportive work environment.",
    examples: [
      'User research and feedback sessions that inform our decisions',
      'Comprehensive support for employees during difficult times',
      'Products designed with accessibility and inclusion in mind',
    ],
  },
  {
    id: 'excellence',
    icon: Brain,
    title: 'Excellence',
    shortDescription: 'Striving for the highest quality in everything we do.',
    longDescription:
      'We are committed to delivering exceptional quality and exceeding expectations. We continuously raise our standards, refine our processes, and develop our skills to achieve outstanding results in all areas of our business.',
    examples: [
      'Rigorous quality assurance processes',
      'Continuous professional development opportunities',
      'Recognition and celebration of exceptional work',
    ],
  },
  {
    id: 'sustainability',
    icon: Globe,
    title: 'Sustainability',
    shortDescription:
      'Creating long-term value while minimizing environmental impact.',
    longDescription:
      'We recognize our responsibility to future generations and the planet. We make business decisions that balance economic growth with environmental protection and social well-being, aiming to create positive impact beyond profitability.',
    examples: [
      'Carbon neutrality commitment and tracking',
      'Eco-friendly office practices and remote work options',
      'Community involvement and social responsibility initiatives',
    ],
  },
];

export default function AboutSectionBrandValues() {
  const [expandedValue, setExpandedValue] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedValue(expandedValue === id ? null : id);
  };

  return (
    <section className="container mx-auto space-y-12 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
          Our Core Values
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          The Principles That Guide Us
        </h2>
        <p className="text-muted-foreground">
          Our values define who we are, how we work together, and what we strive
          for. They are the foundation of our culture and drive every decision
          we make.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {values.map((value) => (
          <div
            key={value.id}
            className={cn(
              'group bg-card text-card-foreground overflow-hidden rounded-xl border transition-all duration-300',
              expandedValue === value.id
                ? 'col-span-1 shadow-lg md:col-span-2 lg:col-span-3'
                : ''
            )}
          >
            <button
              onClick={() => toggleExpand(value.id)}
              className="flex w-full items-start justify-between p-6 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 flex-shrink-0 rounded-md p-3">
                  <value.icon className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{value.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {value.shortDescription}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  'text-muted-foreground mt-1 h-5 w-5 flex-shrink-0 transition-transform duration-300',
                  expandedValue === value.id ? 'rotate-180' : ''
                )}
              />
            </button>

            {expandedValue === value.id && (
              <div className="animate-in slide-in-from-top-2 space-y-6 px-6 pb-6 duration-150">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-muted-foreground">
                    {value.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-muted-foreground mb-2 text-sm font-semibold">
                    How we put this into practice:
                  </h4>
                  <ul className="space-y-2">
                    {value.examples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="bg-primary/10 mt-0.5 flex-shrink-0 rounded-full p-1">
                          <value.icon className="text-primary h-3 w-3" />
                        </div>
                        <span className="text-sm">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-accent/50 relative mt-8 rounded-lg p-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <h3 className="text-2xl font-bold">Living Our Values Every Day</h3>
          <p className="text-muted-foreground">
            These aren&apos;t just words on our website—our values are
            integrated into our hiring processes, performance reviews,
            decision-making frameworks, and daily interactions. They&apos;re how
            we show up for our team, our customers, and our community.
          </p>
          <Button asChild>
            <a href="#">Learn about our culture</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  UsersIcon,
  GlobeIcon,
  HeartHandshakeIcon,
  MedalIcon,
  UserPlusIcon,
  BarChartIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Define types for DEI initiatives
type Initiative = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  metrics?: {
    value: string;
    label: string;
  }[];
  image?: string;
};

// Define categories
type Category = {
  id: string;
  title: string;
  description: string;
  initiatives: Initiative[];
};

const categories: Category[] = [
  {
    id: 'workplace',
    title: 'Inclusive Workplace',
    description:
      'Creating an environment where everyone feels welcome, respected, and able to contribute their best work.',
    initiatives: [
      {
        id: 'hiring',
        title: 'Inclusive Hiring',
        description:
          'We&apos;ve implemented structured interviewing and blind resume reviews to minimize bias in our hiring process. Our job descriptions are crafted to be inclusive, and we partner with organizations focused on underrepresented groups in tech.',
        icon: UserPlusIcon,
        metrics: [
          { value: '45%', label: 'Women in leadership' },
          { value: '38%', label: 'Employees from underrepresented groups' },
          { value: '30+', label: 'Countries represented' },
        ],
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200',
      },
      {
        id: 'education',
        title: 'Ongoing Education',
        description:
          'Regular workshops, training sessions, and open discussions that help our team understand the importance of diversity and how to be more inclusive in their daily interactions.',
        icon: GlobeIcon,
        metrics: [
          { value: '100%', label: 'Employees trained in DEI' },
          { value: '12', label: 'DEI workshops per year' },
          { value: '4.8/5', label: 'Average workshop rating' },
        ],
      },
      {
        id: 'ergs',
        title: 'Employee Resource Groups',
        description:
          'We support and fund employee-led groups that foster a diverse, inclusive workplace aligned with our organizational values. These groups serve as resources for employees and the company.',
        icon: UsersIcon,
        metrics: [
          { value: '9', label: 'Active ERGs' },
          { value: '68%', label: 'Employee participation' },
          { value: '$150K', label: 'Annual ERG funding' },
        ],
        image:
          'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=1200',
      },
    ],
  },
  {
    id: 'product',
    title: 'Inclusive Products',
    description:
      'Designing products and services that work for everyone, regardless of background or ability.',
    initiatives: [
      {
        id: 'accessibility',
        title: 'Accessibility Standards',
        description:
          'Our product teams adhere to WCAG 2.1 AA standards at minimum. We regularly conduct accessibility audits and include people with disabilities in our user testing to ensure our products work for everyone.',
        icon: HeartHandshakeIcon,
        metrics: [
          { value: '100%', label: 'WCAG 2.1 AA compliance' },
          { value: 'Quarterly', label: 'Accessibility audits' },
          { value: '15+', label: 'Inclusive design patterns' },
        ],
        image:
          'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200',
      },
      {
        id: 'localization',
        title: 'Global Localization',
        description:
          'We design our products with global audiences in mind, accounting for cultural differences, language nuances, and regional preferences to create truly inclusive experiences.',
        icon: GlobeIcon,
        metrics: [
          { value: '24', label: 'Supported languages' },
          { value: '95%', label: 'Translation coverage' },
          { value: '12', label: 'Localization specialists' },
        ],
      },
      {
        id: 'diverse-testing',
        title: 'Diverse User Testing',
        description:
          'We ensure our user research and testing includes diverse participants across demographics, abilities, and backgrounds to capture a wide range of perspectives and needs.',
        icon: UsersIcon,
        metrics: [
          { value: '500+', label: 'Diverse testers' },
          { value: '40+', label: 'Countries represented' },
          { value: '20%', label: 'Testers with disabilities' },
        ],
        image:
          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200',
      },
    ],
  },
  {
    id: 'community',
    title: 'Community Impact',
    description:
      'Extending our commitment beyond our company to create positive change in the broader community.',
    initiatives: [
      {
        id: 'partnerships',
        title: 'Strategic Partnerships',
        description:
          'We collaborate with organizations that promote diversity in tech and education, providing funding, volunteer hours, and expertise to support their important work.',
        icon: HeartHandshakeIcon,
        metrics: [
          { value: '15+', label: 'Partner organizations' },
          { value: '$2M', label: 'Annual contributions' },
          { value: '5,000+', label: 'Volunteer hours' },
        ],
        image:
          'https://images.unsplash.com/photo-1556484687-30636164638b?q=80&w=1200',
      },
      {
        id: 'education',
        title: 'Education Initiatives',
        description:
          'We run programs that introduce technology careers to underrepresented groups, including coding camps, mentorship programs, and scholarships for promising students.',
        icon: UsersIcon,
        metrics: [
          { value: '250', label: 'Annual scholarships' },
          { value: '1,200+', label: 'Students mentored' },
          { value: '85%', label: 'Program graduation rate' },
        ],
      },
      {
        id: 'supplier-diversity',
        title: 'Supplier Diversity',
        description:
          'We actively seek to work with diverse suppliers and vendors, ensuring our procurement practices reflect our commitment to economic inclusion.',
        icon: BarChartIcon,
        metrics: [
          { value: '32%', label: 'Diverse suppliers' },
          { value: '$12M+', label: 'Annual diverse spend' },
          { value: '4×', label: 'Growth in 3 years' },
        ],
        image:
          'https://images.unsplash.com/photo-1566669437687-7040a6926753?q=80&w=1200',
      },
    ],
  },
  {
    id: 'transparency',
    title: 'Transparency & Progress',
    description:
      'Measuring our progress, holding ourselves accountable, and sharing our journey openly.',
    initiatives: [
      {
        id: 'reporting',
        title: 'Public Reporting',
        description:
          'We publish annual diversity reports that share our demographics, goals, successes, and areas for improvement. We believe transparency drives accountability and progress.',
        icon: BarChartIcon,
        metrics: [
          { value: '5', label: 'Years of public reporting' },
          { value: '12', label: 'Tracked metrics' },
          { value: 'Quarterly', label: 'Internal updates' },
        ],
        image:
          'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=1200',
      },
      {
        id: 'goals',
        title: 'Measurable Goals',
        description:
          'We set specific, measurable goals for diversity, equity, and inclusion across all aspects of our business, with executive accountability for progress.',
        icon: MedalIcon,
        metrics: [
          { value: '15%', label: 'YoY diversity growth' },
          { value: '100%', label: 'Pay equity achieved' },
          { value: '90%', label: 'Belonging index score' },
        ],
      },
      {
        id: 'recognition',
        title: 'External Recognition',
        description:
          "While we don't pursue DEI work for awards, we're proud to be recognized for our efforts by independent organizations that evaluate workplace equality.",
        icon: MedalIcon,
        metrics: [
          { value: 'Top 10', label: 'Most inclusive employers' },
          { value: '100%', label: 'HRC equality index' },
          { value: '5 Stars', label: 'Disability equality index' },
        ],
        image:
          'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200',
      },
    ],
  },
];

export default function AboutSectionDiversityInclusion() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const currentCategory =
    categories.find((category) => category.id === activeCategory) ||
    categories[0];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
            Diversity & Inclusion
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Building a More Equitable Future Together
          </h2>
          <p className="text-muted-foreground">
            Our commitment to diversity, equity, and inclusion runs deep in
            everything we do—from how we build our teams to how we build our
            products.
          </p>
        </div>

        <Tabs
          defaultValue={categories[0].id}
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="space-y-8"
        >
          {/* Category selection - Tabs for md+ screens, Dropdown for smaller screens */}
          <div className="flex justify-center">
            {/* Dropdown for small screens */}
            <div className="mb-6 w-full md:hidden">
              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tabs for medium screens and above */}
            <TabsList className="hidden h-auto grid-cols-4 p-1 md:grid">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2.5"
                >
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Category description */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-muted-foreground">
              {currentCategory.description}
            </p>
          </div>

          {/* Initiatives */}
          {categories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="space-y-12"
            >
              {category.initiatives.map((initiative, index) => {
                const Icon = initiative.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={initiative.id}
                    className="grid items-center gap-8 md:grid-cols-12"
                  >
                    {/* Initiative details */}
                    <div
                      className={cn(
                        'space-y-6 md:col-span-7',
                        isEven ? 'md:order-1' : 'md:order-2'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 rounded-md p-2">
                          <Icon className="text-primary h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold">
                          {initiative.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground">
                        {initiative.description}
                      </p>

                      {initiative.metrics && (
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          {initiative.metrics.map((metric, i) => (
                            <div key={i} className="text-center">
                              <div className="text-primary text-2xl font-bold">
                                {metric.value}
                              </div>
                              <div className="text-muted-foreground mt-1 text-xs">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Initiative image (if available) */}
                    {initiative.image ? (
                      <div
                        className={cn(
                          'md:col-span-5',
                          isEven ? 'md:order-2' : 'md:order-1'
                        )}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                          <img
                            src={initiative.image}
                            alt={initiative.title}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className={cn(
                          'flex h-full items-center justify-center md:col-span-5',
                          isEven ? 'md:order-2' : 'md:order-1'
                        )}
                      >
                        <Card className="bg-muted/30 flex h-full min-h-[280px] w-full items-center justify-center">
                          <CardContent className="p-6 text-center">
                            <Icon className="text-muted-foreground/50 mx-auto mb-4 h-16 w-16" />
                            <Badge variant="secondary" className="mx-auto">
                              Learn more about our{' '}
                              {initiative.title.toLowerCase()} initiative
                            </Badge>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA section */}
        <div className="mt-20 text-center">
          <div className="bg-muted mb-8 inline-flex items-center justify-center rounded-full p-1">
            <Badge className="bg-primary text-primary-foreground rounded-full px-4 py-1">
              Join us in making a difference
            </Badge>
          </div>

          <h3 className="mb-4 text-2xl font-bold">
            Become Part of Our Inclusive Community
          </h3>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
            We&apos;re always looking for passionate individuals who share our
            commitment to diversity, equity, and inclusion to join our team.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <a href="/careers">Join Our Team</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/about/dei-report">Read Our Annual Report</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuoteIcon } from 'lucide-react';

// Define types for culture aspects
type CultureAspect = {
  id: string;
  title: string;
  description: string;
  images: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
};

// Company culture data
const cultureAspects: CultureAspect[] = [
  {
    id: 'innovation',
    title: 'Innovation First',
    description:
      'We believe in challenging the status quo and constantly pushing boundaries to create new solutions. Our innovation-driven approach encourages experimentation, learning from failures, and celebrating breakthrough successes.',
    images: [
      'https://images.unsplash.com/photo-1536148935331-408321065b18?q=80&w=800',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800',
    ],
    testimonial: {
      quote:
        'I&apos;ve never worked anywhere that so actively encourages creative thinking. We&apos;re given the time and resources to explore new ideas, even if they might not work out. That freedom to innovate without fear has led to our most successful products.',
      author: 'Sarah Chen',
      role: 'Product Designer',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&fit=crop&crop=faces',
    },
  },
  {
    id: 'collaboration',
    title: 'Collaborative Spirit',
    description:
      'Our collaborative culture fosters open communication and cross-functional teamwork. We believe that diverse perspectives drive better outcomes, and we create intentional spaces for sharing ideas and working together across departments.',
    images: [
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800',
      'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=800',
    ],
    testimonial: {
      quote:
        "The walls between teams simply don't exist here. Developers, designers, marketers—we all work together with mutual respect. I've seen ideas transform when people from different backgrounds contribute their unique perspectives.",
      author: 'Marcus Johnson',
      role: 'Engineering Lead',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&fit=crop&crop=faces',
    },
  },
  {
    id: 'wellbeing',
    title: 'Wellbeing & Balance',
    description:
      'We prioritize the holistic wellbeing of our team, recognizing that the best work happens when people feel supported in all aspects of their lives. Our flexible policies and wellness initiatives reflect our commitment to sustainable work practices.',
    images: [
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800',
      'https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?q=80&w=800',
      'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800',
    ],
    testimonial: {
      quote:
        "I joined from a company where burnout was considered a badge of honor. Here, I'm encouraged to take time off, pursue hobbies, and bring my whole self to work. The result? I'm happier, healthier, and doing the best work of my career.",
      author: 'Elena Rodriguez',
      role: 'Customer Success Manager',
      avatar:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=150&h=150&fit=crop&crop=faces',
    },
  },
  {
    id: 'growth',
    title: 'Continuous Growth',
    description:
      "Learning is embedded in our culture. We invest in our team's professional development through mentorship programs, learning budgets, and career pathing that nurtures both technical expertise and leadership skills.",
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800',
    ],
    testimonial: {
      quote:
        "In three years, I've grown from a junior role to leading a team, supported every step of the way with training, challenges that stretched my abilities, and leaders who saw potential in me before I saw it in myself.",
      author: 'James Wilson',
      role: 'Marketing Director',
      avatar:
        'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&h=150&fit=crop&crop=faces',
    },
  },
];

export default function AboutSectionCompanyCulture() {
  const [activeTab, setActiveTab] = useState('innovation');

  return (
    <section className="bg-muted/25 py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
          <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
            Our Culture
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What Makes Us Different
          </h2>
          <p className="text-muted-foreground">
            Our culture defines how we work together and the values that guide
            our decisions. It&apos;s what makes our company a special place to
            work and grow.
          </p>
        </div>

        <Tabs
          defaultValue="innovation"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          {/* Tabs navigation */}
          <div className="flex justify-center">
            <TabsList className="grid h-auto grid-cols-2 p-1 md:grid-cols-4">
              {cultureAspects.map((aspect) => (
                <TabsTrigger
                  key={aspect.id}
                  value={aspect.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2.5"
                >
                  {aspect.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab content */}
          {cultureAspects.map((aspect) => (
            <TabsContent
              key={aspect.id}
              value={aspect.id}
              className="space-y-8"
            >
              {/* Description */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {aspect.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {aspect.description}
                  </p>
                </div>

                {/* Testimonial */}
                <Card className="from-primary/5 to-primary/10 border-0 bg-gradient-to-br p-0">
                  <CardContent className="space-y-4 p-6 pt-6">
                    <QuoteIcon className="text-primary/40 h-8 w-8" />
                    <p className="text-muted-foreground italic">
                      &quot;{aspect.testimonial.quote}&quot;
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <img
                          src={aspect.testimonial.avatar}
                          alt={aspect.testimonial.author}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">
                          {aspect.testimonial.author}
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          {aspect.testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Images */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {aspect.images.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg"
                  >
                    <img
                      src={image}
                      alt={`${aspect.title} culture`}
                      className="transform object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Bottom CTA */}
        <div className="bg-background relative mt-16 rounded-xl border p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">Join Our Team</h3>
              <p className="text-muted-foreground mb-6">
                We&apos;re always looking for talented individuals who share our
                values and want to be part of building something meaningful.
                Explore our open positions and find where you might fit in.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="/careers">View Open Positions</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/about/values">Our Values</a>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=300',
                'https://images.unsplash.com/photo-1603201667141-5a2d4c673378?q=80&w=300',
                'https://images.unsplash.com/photo-1596079890744-c1a0462d0975?q=80&w=300',
              ].map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-md"
                >
                  <img src={src} alt="Team culture" className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Decorative shapes */}
          <div className="bg-primary/10 absolute -top-5 -left-5 h-10 w-10 rounded-full" />
          <div className="bg-primary/10 absolute -right-5 -bottom-5 h-10 w-10 rounded-full" />
        </div>
      </div>
    </section>
  );
}
```

## components/blocks/footers

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronUp, Clock, LucideIcon, MapPin, Phone } from "lucide-react";
import { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { siFacebook, siInstagram, SimpleIcon, siX } from "simple-icons";
import z from "zod";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type NewsletterData = {
  title?: string;
  description?: string;
};

type NewsletterFormProps = NewsletterData;

type FooterLink = {
  text: string;
  link: string;
};

type FooterLinksSection = {
  title: string;
  items: FooterLink[];
};

interface FooterLinksSectionProps {
  sections: FooterLinksSection[];
}

type SocialLink = {
  link: string;
  icon: SimpleIcon;
};

type ContactLink = {
  icon: LucideIcon;
  text: string;
  type: LinkTypes;
  link?: string;
};

type ContactLinks = {
  contactDetails: ContactLink[];
  socialMedia: SocialLink[];
};

interface ContactSectionProps {
  links: ContactLinks;
}

interface EcommerceFooter1Props {
  newsletter: NewsletterData;
  footerLinks: FooterLinksSection[];
  contactLinks: ContactLinks;
  className?: string;
}

const LINK_TYPES = {
  NO_LINK: "NO_LINK",
  PHONE_LINK: "PHONE_LINK",
  EMAIL_LINK: "EMAIL_LINK",
};

type LinkTypes = keyof typeof LINK_TYPES;

const NEWSLETTER_DATA = {
  title: "Newsletter",
  description:
    "Join our newsletter to receive exclusive deals, tech tips, product launches, and early access to the latest electronics.",
};

const FOOTER_LINKS: FooterLinksSection[] = [
  {
    title: "Information",
    items: [
      {
        text: "Terms and Conditions",
        link: "#",
      },
      {
        text: "Privacy Policy",
        link: "#",
      },
      {
        text: "Warranty Policy",
        link: "#",
      },
      {
        text: "Terms of Service",
        link: "#",
      },
    ],
  },
  {
    title: "Collections",
    items: [
      {
        text: "New Arrivals",
        link: "#",
      },
      {
        text: "Best Sellers",
        link: "#",
      },
      {
        text: "Seasonal Edits",
        link: "#",
      },
      {
        text: "Wardrobe Essentials",
        link: "#",
      },
    ],
  },
];

const CONTACT_LINKS: ContactLinks = {
  contactDetails: [
    {
      icon: MapPin,
      text: "support@store.com",
      link: "support@store.com",
      type: LINK_TYPES.EMAIL_LINK as LinkTypes,
    },
    {
      icon: Phone,
      text: "+12345678910",
      link: "+12345678910",
      type: LINK_TYPES.PHONE_LINK as LinkTypes,
    },
    {
      icon: Clock,
      text: "Monday - Friday, 9 am - 9 pm",
      type: LINK_TYPES.NO_LINK as LinkTypes,
    },
  ],
  socialMedia: [
    {
      icon: siFacebook,
      link: "#",
    },
    {
      icon: siX,
      link: "#",
    },
    {
      icon: siInstagram,
      link: "#",
    },
  ],
};

const EcommerceFooter1 = ({
  newsletter = NEWSLETTER_DATA,
  footerLinks = FOOTER_LINKS,
  contactLinks = CONTACT_LINKS,
  className,
}: EcommerceFooter1Props) => {
  return (
    <section className={cn("pt-8 pb-8 xl:pt-12", className)}>
      <div className="container space-y-10">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <NewsletterSection {...newsletter} />
          </div>
          <FooterLinksSection sections={footerLinks} />
          <ContactSection links={contactLinks} />
        </div>
        <div className="flex justify-between pt-4">
          <div>
            <Select defaultValue="english">
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Select a Language..." />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="français">Français</SelectItem>
                  <SelectItem value="arabic">Arabic</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between gap-4 md:gap-12.5">
            <Separator className="flex-1" />
            <div className="basis-30 md:basis-37.5">
              <a href="/">
                <img
                  className="block dark:hidden"
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark-black.svg"
                  alt="Logo"
                />
                <img
                  className="hidden dark:block"
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark-white.svg"
                  alt="Logo"
                />
              </a>
            </div>
            <Separator className="flex-1" />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <p className="text-muted-foreground max-md:text-xs">
            Copyright © 2026
          </p>
          <Separator
            orientation="vertical"
            className="h-4.5! bg-foreground/60 max-sm:hidden"
          />
          <p className="max-md:text-xs">Powered by Shadcnblocks</p>
          <Button size="icon" variant="outline">
            <ChevronUp />
          </Button>
        </div>
      </div>
    </section>
  );
};

const newsletterFormSchema = z.object({
  email: z.string().email(),
});

type newsletterFormType = z.infer<typeof newsletterFormSchema>;

const NewsletterSection = ({ title, description }: NewsletterFormProps) => {
  const form = useForm({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: newsletterFormType) => {
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-serif text-3xl leading-none font-medium">
          {title}
        </h3>
        <p className="leading-normal font-light">{description}</p>
      </div>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Email Address"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button className="w-full">Subscribe</Button>
      </form>
    </div>
  );
};

const FooterLinksSection = ({ sections }: FooterLinksSectionProps) => {
  return (
    <Fragment>
      {sections.map(({ title, items }) => (
        <div key={crypto.randomUUID()}>
          <h2 className="mb-6 text-sm leading-tight font-medium text-muted-foreground uppercase">
            {title}
          </h2>
          <ul className="space-y-3">
            {items.map(({ text, link }) => (
              <li key={crypto.randomUUID()}>
                <a href={link} className="underline-offset-4 hover:underline">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Fragment>
  );
};

const ContactSection = ({ links }: ContactSectionProps) => {
  const { socialMedia, contactDetails } = links;

  return (
    <div>
      <h2 className="mb-6 text-sm leading-tight font-medium text-muted-foreground uppercase">
        Contact
      </h2>
      <div className="space-y-6">
        <ul className="space-y-3">
          {contactDetails.map((item) => (
            <li className="flex items-center gap-3" key={crypto.randomUUID()}>
              <item.icon className="size-4 shrink-0 basis-4" />
              <div className="flex-1">
                {item.type === LINK_TYPES.NO_LINK ? (
                  <p>{item.text}</p>
                ) : (
                  <a
                    href={
                      LINK_TYPES.EMAIL_LINK
                        ? `mailto:${item.link}`
                        : `tel:${item.link}`
                    }
                    className="underline-offset-4 hover:underline"
                  >
                    {item.text}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-3">
          {socialMedia.map(({ icon, link }) => (
            <li key={crypto.randomUUID()}>
              <Button size="icon-lg" variant="outline" asChild>
                <a href={link}>
                  <img
                    className="size-5 dark:hidden"
                    alt={icon.title}
                    src={`https://cdn.simpleicons.org/${icon.slug}/black`}
                  />
                  <img
                    className="hidden size-5 dark:block"
                    alt={icon.title}
                    src={`https://cdn.simpleicons.org/${icon.slug}/white`}
                  />
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { EcommerceFooter1 };
```

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Plus } from "lucide-react";
import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { siFacebook, siInstagram, type SimpleIcon, siX } from "simple-icons";
import z from "zod";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";

type NewsletterData = {
  title?: string;
};

type NewsletterFormProps = NewsletterData;

type SocialLink = {
  link: string;
  icon: SimpleIcon;
};

type FooterLink = {
  text: string;
  link?: string;
};

type FooterLinksSection = {
  title: string;
  id: string;
  items: FooterLink[];
};

interface SocialMediaSectionProps {
  links: SocialLink[];
}

interface FooterLinksSectionProps {
  sections: FooterLinksSection[];
}

interface EcommerceFooter20Props {
  newsletter: NewsletterData;
  socialLinks: SocialLink[];
  footerLinks: FooterLinksSection[];
  paymentMethods: string[];
  submenuLinks: {
    text: string;
    link: string;
  }[];
  footerData: {
    image: {
      src: string;
      alt: string;
    };
    homeLink: {
      logo: {
        light: string;
        dark: string;
      };
      link: string;
    };
    title: string;
    description: string;
  };
  className?: string;
}

const NEWSLETTER_DATA = {
  title: "Get updates on offers and products and save 20% on your first order",
};

const SOCIAL_MEDIA_LINKS = [
  {
    icon: siFacebook,
    link: "#",
  },
  {
    icon: siX,
    link: "#",
  },
  {
    icon: siInstagram,
    link: "#",
  },
];

const FOOTER_LINKS: FooterLinksSection[] = [
  {
    title: "Collections",
    id: "collections",
    items: [
      {
        text: "New Arrivals",
        link: "#",
      },
      {
        text: "Best Sellers",
        link: "#",
      },
      {
        text: "Seasonal Edits",
        link: "#",
      },
      {
        text: "Wardrobe Essentials",
        link: "#",
      },
    ],
  },
  {
    title: "Help",
    id: "help",
    items: [
      {
        text: "Contact Us",
        link: "#",
      },
      {
        text: "FAQs",
        link: "#",
      },
      {
        text: "Shipping & Tracking",
        link: "#",
      },
      {
        text: "Returns & Exchanges",
        link: "#",
      },
    ],
  },
  {
    title: "Information",
    id: "information",
    items: [
      {
        text: "Terms and Conditions",
        link: "#",
      },
      {
        text: "Privacy Policy",
        link: "#",
      },
      {
        text: "Warranty Policy",
        link: "#",
      },
      {
        text: "Terms of Service",
        link: "#",
      },
    ],
  },
];

const SUBMENU = [
  {
    text: "Shipping Policy",
    link: "#",
  },
  {
    text: "Returns Policy",
    link: "#",
  },
  {
    text: "Terms Of Service",
    link: "#",
  },
  {
    text: "Privacy Policy",
    link: "#",
  },
  {
    text: "Sustainability",
    link: "#",
  },
];

const FOOTER_DATA = {
  image: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/Modern-Portrait-of-a-Woman-and-Man-2.png",
    alt: "",
  },
  homeLink: {
    logo: {
      light: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
      dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark-white.svg",
    },
    link: "#",
  },
  title: "Where Modern Fashion Meets Comfort",
  description:
    "We design clothing that empowers women to express their individuality through thoughtful details, flattering fits, and beautifully crafted essentials.",
};

const PAYMENT_METHODS = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/amazonpay.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/applepay.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/mastercard.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/paypal.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/visa.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/discover.svg",
];

const EcommerceFooter20 = ({
  newsletter = NEWSLETTER_DATA,
  socialLinks = SOCIAL_MEDIA_LINKS,
  footerLinks = FOOTER_LINKS,
  paymentMethods = PAYMENT_METHODS,
  submenuLinks = SUBMENU,
  footerData = FOOTER_DATA,
  className,
}: EcommerceFooter20Props) => {
  return (
    <footer className={cn("bg-muted", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="overflow-hidden max-lg:aspect-square">
          <img
            className="block size-full object-cover object-center"
            src={footerData.image.src}
            alt={footerData.image.alt}
          />
        </div>
        <div>
          <div className="px-6 py-8 md:p-12 lg:px-20 lg:pt-8 lg:pb-20">
            <div className="space-y-12">
              <div className="mt-12 max-w-125">
                <NewsletterSection {...newsletter} />
              </div>
              <div className="space-y-6">
                <a href="#" className="block">
                  <img
                    className="h-12 w-auto dark:hidden"
                    src={footerData.homeLink.logo.light}
                    alt="Logo"
                  />
                  <img
                    className="hidden h-12 w-auto dark:inline-block"
                    src={footerData.homeLink.logo.dark}
                    alt="Logo"
                  />
                </a>
                <div className="space-y-1">
                  <h3 className="font-bold">{footerData.title}</h3>
                  <p className="leading-relaxed text-balance">
                    {footerData.description}
                  </p>
                </div>
              </div>
              <SocialMediaSection links={socialLinks} />
              <Separator className="max-lg:hidden" />
              <FooterLinksSection sections={footerLinks} />
              <Separator className="max-lg:hidden" />
              <PaymentMethods cards={paymentMethods} />
              <Separator />
              <div className="space-y-8">
                <FooterSubMenu links={submenuLinks} />
                <p className="text-sm font-light">© 2025 Shadcnblocks.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-10 lg:px-20">
        <img
          className="w-full dark:hidden"
          src={footerData.homeLink.logo.light}
          alt="Logo"
        />
        <img
          className="hidden w-full dark:inline-block"
          src={footerData.homeLink.logo.dark}
          alt="Logo"
        />
      </div>
    </footer>
  );
};

const newsletterFormSchema = z.object({
  email: z.string().email(),
});

type newsletterFormType = z.infer<typeof newsletterFormSchema>;

const NewsletterSection = ({ title }: NewsletterFormProps) => {
  const form = useForm({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: newsletterFormType) => {
    console.log(data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-light">{title}</h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <InputGroup
                className="rounded-none border-x-0 border-t-0 border-b! border-foreground shadow-none"
                aria-invalid={fieldState.invalid}
              >
                <InputGroupInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Email Address"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton type="submit" size="icon-xs">
                    <ArrowRight />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </form>
    </div>
  );
};

const SocialMediaSection = ({ links }: SocialMediaSectionProps) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {links.map(({ icon, link }) => (
        <li key={crypto.randomUUID()}>
          <Button size="icon" variant="ghost" asChild className="rounded-full">
            <a href={link}>
              <img
                className="hidden size-6 dark:block"
                alt={icon.title}
                src={`https://cdn.simpleicons.org/${icon.slug}/white`}
              />
              <img
                className="size-6 dark:hidden"
                alt={icon.title}
                src={`https://cdn.simpleicons.org/${icon.slug}/black`}
              />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
};

const FooterLinksSection = ({ sections }: FooterLinksSectionProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [value, setValue] = useState("");

  if (!sections) return;

  const allAccordionIds = sections.map(({ id }) => id);
  const handleOnValueChange = (value: string) => {
    setValue(value);
  };

  if (isDesktop) {
    return (
      <Accordion
        value={allAccordionIds}
        type="multiple"
        className="grid grid-cols-3 gap-4"
      >
        <AccordionItems sections={sections} />
      </Accordion>
    );
  } else {
    return (
      <Accordion
        value={value}
        type="single"
        collapsible={true}
        onValueChange={handleOnValueChange}
        className="border-y"
      >
        <AccordionItems sections={sections} />
      </Accordion>
    );
  }
};

const AccordionItems = ({ sections }: { sections: FooterLinksSection[] }) => {
  return (
    <Fragment>
      {sections.map(({ id, title, items }) => (
        <AccordionItem
          key={id}
          value={id}
          className="border-b lg:border-transparent"
        >
          <AccordionTrigger className="cursor-auto rounded-none pt-0 pb-2 text-base leading-normal font-bold hover:no-underline max-lg:py-4 [&>svg]:hidden">
            {title}
            <div className="lg:hidden">
              <Plus className="size-5" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-1 max-lg:py-4">
            <ul className="space-y-4 lg:space-y-2">
              {items.map(({ link, text }) => (
                <li
                  className="text-sm leading-tight font-light"
                  key={crypto.randomUUID()}
                >
                  <a
                    href={link}
                    className="hover:underline hover:underline-offset-3"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Fragment>
  );
};

const PaymentMethods = ({ cards }: { cards: string[] }) => {
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {cards.map((card) => (
        <li key={crypto.randomUUID()}>
          <img className="w-9.5" src={card} alt="card" />
        </li>
      ))}
    </ul>
  );
};

const FooterSubMenu = ({ links }: { links: FooterLink[] }) => {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-4">
      {links.map(({ link, text }) => (
        <li key={crypto.randomUUID()}>
          <a href={link} className="text-sm font-light">
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export { EcommerceFooter20 };
```

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Plus } from "lucide-react";
import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { siFacebook, siInstagram, type SimpleIcon, siX } from "simple-icons";
import z from "zod";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldTitle,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

type NewsletterData = {
  title?: string;
  description?: string;
};

type NewsletterFormProps = NewsletterData;

type FooterLink = {
  text: string;
  type?: string;
  link?: string;
  email?: string;
};

type FooterLinksSection = {
  title: string;
  id: string;
  items: FooterLink[];
};

type SocialLink = {
  link: string;
  icon: SimpleIcon;
};

interface EcommerceFooter2Props {
  newsletter: NewsletterData;
  footerLinks: FooterLinksSection[];
  socialLinks: SocialLink[];
  description: string;
  className?: string;
}

interface FooterLinksSectionProps {
  sections: FooterLinksSection[];
}

interface SocialMediaSectionProps {
  links: SocialLink[];
}

const NEWSLETTER_DATA = {
  title: "Subscribe & Get 10% Off Your First Gadget",
  description:
    "Join our newsletter to receive exclusive deals, tech tips, product launches, and early access to the latest electronics.",
};

const FOOTER_LINKS: FooterLinksSection[] = [
  {
    title: "The Brand",
    id: "the-brand",
    items: [
      {
        text: "Our Story",
        link: "#",
      },
      {
        text: "Sustainability",
        link: "#",
      },
      {
        text: "Customer Reviews",
        link: "#",
      },
      {
        text: "Store Locator",
        link: "#",
      },
      {
        text: "Refer a Friend",
        link: "#",
      },
    ],
  },
  {
    title: "Help",
    id: "help",
    items: [
      {
        text: "Contact Us",
        link: "#",
      },
      {
        text: "FAQs",
        link: "#",
      },
      {
        text: "Shipping & Tracking",
        link: "#",
      },
      {
        text: "Returns & Exchanges",
        link: "#",
      },
    ],
  },
  {
    title: "Information",
    id: "information",
    items: [
      {
        text: "Terms and Conditions",
        link: "#",
      },
      {
        text: "Privacy Policy",
        link: "#",
      },
      {
        text: "Warranty Policy",
        link: "#",
      },
      {
        text: "Terms of Service",
        link: "#",
      },
    ],
  },
  {
    title: "Contact",
    id: "contact",
    items: [
      {
        type: "email",
        text: "support@techstore.com",
        email: "support@techstore.com",
      },
    ],
  },
];

const SOCIAL_MEDIA_LINKS = [
  {
    icon: siFacebook,
    link: "#",
  },
  {
    icon: siX,
    link: "#",
  },
  {
    icon: siInstagram,
    link: "#",
  },
];

const DESCRIPTION =
  "Get the latest tech updates, exclusive discounts, product launches, and expert tips delivered straight to your inbox. Stay ahead with smarter gadgets.";

const EcommerceFooter2 = ({
  newsletter = NEWSLETTER_DATA,
  footerLinks = FOOTER_LINKS,
  socialLinks = SOCIAL_MEDIA_LINKS,
  description = DESCRIPTION,
  className,
}: EcommerceFooter2Props) => {
  return (
    <footer className={cn("px-0 py-10 md:px-7.5 md:py-12 lg:px-20", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-12.5 lg:grid-cols-2 xl:grid-cols-3">
          <div>
            <NewsletterSection {...newsletter} />
          </div>
          <div>
            <FooterLinksSection sections={footerLinks} />
          </div>
          <div className="space-y-10">
            <p className="leading-normal font-light max-lg:text-center">
              {description}
            </p>
            <SocialMediaSection links={socialLinks} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const newsletterFormSchema = z.object({
  email: z.string().email(),
});

type newsletterFormType = z.infer<typeof newsletterFormSchema>;

const NewsletterSection = ({ title, description }: NewsletterFormProps) => {
  const form = useForm({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: newsletterFormType) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="space-y-5">
              <div className="space-y-4">
                <FieldTitle className="text-lg leading-none font-bold">
                  {title}
                </FieldTitle>
                <FieldDescription className="text-sm leading-normal font-light">
                  {description}
                </FieldDescription>
              </div>
              <InputGroup
                aria-invalid={fieldState.invalid}
                className="rounded-full"
              >
                <InputGroupInput
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Email Address"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="submit"
                    size="icon-xs"
                    variant="default"
                    className="rounded-full"
                  >
                    <ArrowRight />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
};

const FooterLinksSection = ({ sections }: FooterLinksSectionProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [value, setValue] = useState("");

  if (!sections) return;

  const allAccordionIds = sections.map(({ id }) => id);
  const handleOnValueChange = (value: string) => {
    setValue(value);
  };

  if (isDesktop) {
    return (
      <Accordion
        value={allAccordionIds}
        type="multiple"
        className="lg:grid lg:grid-cols-2 lg:gap-x-17 lg:gap-y-4"
      >
        <AccordionItems sections={sections} />
      </Accordion>
    );
  } else {
    return (
      <Accordion
        value={value}
        type="single"
        collapsible={true}
        onValueChange={handleOnValueChange}
        className="lg:grid lg:grid-cols-2 lg:gap-x-17 lg:gap-y-4"
      >
        <AccordionItems sections={sections} />
      </Accordion>
    );
  }
};

const AccordionItems = ({ sections }: { sections: FooterLinksSection[] }) => {
  return (
    <Fragment>
      {sections.map(({ id, title, items }) => (
        <AccordionItem key={id} value={id} className="border-none">
          <AccordionTrigger className="cursor-auto rounded-none pt-0 text-lg leading-none font-bold hover:no-underline max-lg:border-b max-lg:py-4 [&>svg]:hidden">
            {title}
            <div className="lg:hidden">
              <Plus className="size-5" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0 max-lg:py-4 max-lg:pl-4">
            <ul className="space-y-4 lg:space-y-2">
              {items.map(({ link, text, type, email }) => (
                <li
                  className="text-sm leading-tight font-light"
                  key={crypto.randomUUID()}
                >
                  {type === "email" && <p className="mb-1.5">Email us at:</p>}
                  <a
                    data-type={type}
                    href={type === "email" ? `mailto:${email}` : link}
                    className="data-[type=email]:underline data-[type=email]:underline-offset-2"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Fragment>
  );
};

const SocialMediaSection = ({ links }: SocialMediaSectionProps) => {
  return (
    <ul className="flex flex-wrap gap-4 max-lg:justify-center">
      {links.map(({ icon, link }) => (
        <li key={crypto.randomUUID()}>
          <Button size="icon-lg" asChild className="rounded-full">
            <a href={link}>
              <img
                className="size-5 dark:hidden"
                alt={icon.title}
                src={`https://cdn.simpleicons.org/${icon.slug}/white`}
              />
              <img
                className="hidden size-5 dark:block"
                alt={icon.title}
                src={`https://cdn.simpleicons.org/${icon.slug}/black`}
              />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export { EcommerceFooter2 };
```

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  LucideIcon,
  MapPin,
  MessageSquareMore,
  Phone,
  Plus,
  Send,
} from "lucide-react";
import { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { siFacebook, siInstagram, SimpleIcon, siX } from "simple-icons";
import z from "zod";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type NewsletterData = {
  title?: string;
  description?: string;
};

type InfoItem = {
  text: string;
  title: string;
  link?: string;
  icon: LucideIcon;
};

type FooterLink = {
  text: string;
  link?: string;
};

type SocialLink = {
  link: string;
  icon: SimpleIcon;
};

type FooterLinksSection = {
  title: string;
  id: string;
  items: FooterLink[];
};

type FooterDetailsType = {
  image: {
    src: string;
    alt: string;
  };
  homeLink: {
    logo: {
      light: string;
      dark: string;
    };
    link: string;
  };
  title: string;
  description: string;
};

type NewsletterFormProps = NewsletterData;

interface EcommerceFooter19Props {
  newsletter: NewsletterData;
  infoSectionList: InfoItem[];
  footerLinks: FooterLinksSection[];
  footerDetails: FooterDetailsType;
  paymentMethods: string[];
  socialLinks: SocialLink[];
  submenuLinks: {
    text: string;
    link: string;
  }[];
  className?: string;
}

interface FooterLinksSectionProps {
  sections: FooterLinksSection[];
}

interface SocialMediaSectionProps {
  links: SocialLink[];
}

const NEWSLETTER_DATA: NewsletterData = {
  title: "Newsletter",
  description:
    "Join our newsletter for self-care tips, skincare routines, exclusive offers, and early access to our latest clean-beauty essentials.",
};

const INFO_SECTION_DATA: InfoItem[] = [
  {
    title: "Customer Support",
    text: "Mon–Fri, 8am–7pm EST.",
    icon: MessageSquareMore,
  },
  {
    title: "Call Us",
    text: "+1 855-987-4420 (toll-free)",
    link: "tel:+18559874420",
    icon: Phone,
  },
  {
    title: "Email Us",
    text: "support@lumiskin.co",
    link: "mailto:support@lumiskin.co",
    icon: Send,
  },
  {
    title: "Address",
    text: "125 Bloom Avenue, Suite 210, CA",
    icon: MapPin,
  },
];

const FOOTER_LINKS: FooterLinksSection[] = [
  {
    title: "Shop",
    id: "shop",
    items: [
      {
        text: "New Launches",
        link: "#",
      },
      {
        text: "Best Sellers",
        link: "#",
      },
      {
        text: "Skin Type Routines",
        link: "#",
      },
      {
        text: "Gifts & Sets",
        link: "#",
      },
    ],
  },
  {
    title: "Support",
    id: "support",
    items: [
      {
        text: "Contact Us",
        link: "#",
      },
      {
        text: "FAQs",
        link: "#",
      },
      {
        text: "Order Tracking",
        link: "#",
      },
      {
        text: "Returns & Exchanges",
        link: "#",
      },
    ],
  },
  {
    title: "About",
    id: "about",
    items: [
      {
        text: "Our Story",
        link: "#",
      },
      {
        text: "Ingredients",
        link: "#",
      },
      {
        text: "Sustainability",
        link: "#",
      },
      {
        text: "Press",
        link: "#",
      },
    ],
  },
];

const FOOTER_DETAILS = {
  image: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/promotional/Luxurious-Cosmetic-Display-2.png",
    alt: "",
  },
  homeLink: {
    logo: {
      light: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
      dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark-white.svg",
    },
    link: "#",
  },
  title: "Where Modern Fashion Meets Comfort",
  description:
    "We design clothing that empowers women to express their individuality through thoughtful details, flattering fits, and beautifully crafted essentials.",
};

const PAYMENT_METHODS = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/amazonpay.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/applepay.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/mastercard.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/paypal.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/visa.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/payment-methods/discover.svg",
];

const SOCIAL_MEDIA_LINKS = [
  {
    icon: siFacebook,
    link: "#",
  },
  {
    icon: siX,
    link: "#",
  },
  {
    icon: siInstagram,
    link: "#",
  },
];

const SUBMENU = [
  {
    text: "Shipping Policy",
    link: "#",
  },
  {
    text: "Returns Policy",
    link: "#",
  },
  {
    text: "Terms Of Service",
    link: "#",
  },
  {
    text: "Privacy Policy",
    link: "#",
  },
];

const EcommerceFooter19 = ({
  newsletter = NEWSLETTER_DATA,
  infoSectionList = INFO_SECTION_DATA,
  footerLinks = FOOTER_LINKS,
  footerDetails = FOOTER_DETAILS,
  paymentMethods = PAYMENT_METHODS,
  socialLinks = SOCIAL_MEDIA_LINKS,
  submenuLinks = SUBMENU,
  className,
}: EcommerceFooter19Props) => {
  return (
    <section className={cn("pt-12.5 pb-30", className)}>
      <div className="container space-y-10">
        <div className="grid items-center gap-x-20 gap-y-5 lg:grid-cols-2">
          <div>
            <AspectRatio ratio={2} className="overflow-hidden rounded-2xl">
              <img
                className="block size-full object-cover object-center"
                src={footerDetails.image.src}
                alt={footerDetails.image.alt}
              />
            </AspectRatio>
          </div>
          <div>
            <NewsletterSection {...newsletter} />
          </div>
        </div>
        <InfoSection list={infoSectionList} />
        <div className="grid grid-cols-1 gap-7.5 lg:grid-cols-5 xl:grid-cols-2">
          <div className="space-y-5 lg:max-xl:col-span-2">
            <a
              href={footerDetails.homeLink.link}
              className="inline-block w-full max-w-80"
            >
              <img
                className="w-full dark:hidden"
                src={footerDetails.homeLink.logo.light}
                alt="Logo"
              />
              <img
                className="hidden w-full dark:inline-block"
                src={footerDetails.homeLink.logo.dark}
                alt="Logo"
              />
            </a>
            <p className="max-w-100 text-sm leading-relaxed text-muted-foreground">
              {footerDetails.description}
            </p>
          </div>
          <div className="lg:max-xl:col-span-3">
            <FooterLinksSection sections={footerLinks} />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-6">
          <div className="space-y-5">
            <Select defaultValue="english">
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Select a Language..." />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="français">Français</SelectItem>
                  <SelectItem value="arabic">Arabic</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <PaymentMethods cards={paymentMethods} />
          </div>
          <div>
            <SocialMediaSection links={socialLinks} />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-6">
          <p className="text-sm">© 2026 Made with ❤️ by shadcnblocks.com</p>
          <FooterSubMenu links={submenuLinks} />
        </div>
      </div>
    </section>
  );
};

const newsletterFormSchema = z.object({
  email: z.string().email(),
});

type newsletterFormType = z.infer<typeof newsletterFormSchema>;

const NewsletterSection = ({ title, description }: NewsletterFormProps) => {
  const form = useForm({
    resolver: zodResolver(newsletterFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: newsletterFormType) => {
    console.log(data);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h3 className="text-4xl leading-snug font-semibold">{title}</h3>
        <p className="leading-normal">{description}</p>
      </div>
      <div className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-start gap-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex-1" data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Email Address"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button>Subscribe</Button>
          </div>
        </form>
        <p className="text-sm text-muted-foreground">
          By subscribing you agree to the{" "}
          <a className="underline underline-offset-2" href="#">
            Terms of Use
          </a>{" "}
          &{" "}
          <a className="underline underline-offset-2" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

const InfoSection = ({ list }: { list: InfoItem[] }) => {
  if (!list) return;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      {list.map(({ icon: Icon, title, link, text }) => (
        <Card className="rounded-lg px-5 py-6" key={crypto.randomUUID()}>
          <CardContent className="flex items-start gap-3 p-0">
            <div className="shrink-0 basis-7">
              <Icon />
            </div>
            <div className="flex-1 space-y-1">
              <div className="text-sm leading-relaxed">
                <CardTitle className="text-base leading-relaxed font-semibold">
                  {title}
                </CardTitle>
                {link ? (
                  <a
                    className="break-all text-muted-foreground underline"
                    href={link}
                  >
                    {text}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{text}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const FooterLinksSection = ({ sections }: FooterLinksSectionProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!sections) return;

  const allAccordionIds = sections.map(({ id }) => id);

  if (isDesktop) {
    return (
      <Accordion
        value={allAccordionIds}
        type="multiple"
        className="grid grid-cols-3 gap-4"
      >
        <AccordionItems sections={sections} />
      </Accordion>
    );
  } else {
    return (
      <Accordion type="multiple">
        <AccordionItems sections={sections} />
      </Accordion>
    );
  }
};

const AccordionItems = ({ sections }: { sections: FooterLinksSection[] }) => {
  return (
    <Fragment>
      {sections.map(({ id, title, items }) => (
        <AccordionItem
          key={id}
          value={id}
          className="border-b lg:border-transparent"
        >
          <AccordionTrigger className="cursor-auto rounded-none pt-0 pb-4 text-base leading-normal font-bold hover:no-underline max-lg:py-4 [&>svg]:hidden">
            {title}
            <div className="lg:hidden">
              <Plus className="size-5" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-1 max-lg:py-4">
            <ul className="space-y-4 lg:space-y-3">
              {items.map(({ link, text }) => (
                <li
                  className="text-sm leading-tight font-light"
                  key={crypto.randomUUID()}
                >
                  <a
                    href={link}
                    className="hover:underline hover:underline-offset-3"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Fragment>
  );
};

const PaymentMethods = ({ cards }: { cards: string[] }) => {
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {cards.map((card) => (
        <li key={crypto.randomUUID()}>
          <img className="w-9.5" src={card} alt="card" />
        </li>
      ))}
    </ul>
  );
};

const SocialMediaSection = ({ links }: SocialMediaSectionProps) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {links.map(({ icon, link }) => (
        <li key={crypto.randomUUID()}>
          <Button size="icon-lg" asChild className="rounded-full">
            <a href={link}>
              <img
                className="size-4.5 dark:hidden"
                alt={icon.title}
                src={`https://cdn.simpleicons.org/${icon.slug}/white`}
              />
              <img
                className="hidden size-4.5 dark:block"
                alt={icon.title}
                src={`https://cdn.simpleicons.org/${icon.slug}/black`}
              />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
};

const FooterSubMenu = ({ links }: { links: FooterLink[] }) => {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-4">
      {links.map(({ link, text }) => (
        <li key={crypto.randomUUID()}>
          <a href={link} className="text-sm font-light">
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export { EcommerceFooter19 };
```

## components/blocks/faq

```tsx
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface SplitPageHeroFaqsProps {
  className?: string;
}

const SplitPageHeroFaqs = ({ className }: SplitPageHeroFaqsProps) => {
  return (
    <section className={cn("dark flex", className)}>
      <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
        <div className="container my-10 flex w-[500px] flex-col gap-24">
        // TODO
        // h2 heading
        // subheading
        // animated accordion faqs
        </div>
      </div>
      <img
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
        alt=""
        className="hidden h-screen w-1/2 object-cover lg:block"
      />
    </section>
  );
};

export { SplitPageHeroFaqs };
```

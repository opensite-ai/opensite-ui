```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const heroImage =
  "https://images.unsplash.com/photo-1530099486328-e021101a494a?q=80&w=2147&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const gridImages = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=900&q=90",
];

const gridImages2 = [
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const projectDetails = [
  { label: "Team", value: "Collaboration Crew" },
  { label: "Focus", value: "Seamless Communication" },
  { label: "Year", value: "2025" },
  {
    label: "Key Strengths",
    value: "Cross-functional Skills, Open Communication, Shared Goals",
  },
] as const;

const FadeUpOnScroll = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

interface Project1Props {
  className?: string;
}

const Project1 = ({ className }: Project1Props) => {
  return (
    <section className={cn("lg:py-32", className)}>
      <div className="container space-y-6">
        <FadeUpOnScroll>
          <header className="border-b border-border pb-6 md:pb-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <h1 className="text-xl font-bold text-foreground md:text-2xl lg:text-5xl">
                Team Collaboration
              </h1>
              <p className="max-w-3xl text-base leading-relaxed font-medium text-muted-foreground md:text-lg lg:text-base">
                Discover how effective teamwork and open communication drive
                innovation and success.
              </p>
            </div>
          </header>
        </FadeUpOnScroll>

        <div className="flex justify-end text-base font-medium md:text-lg">
          Explore our collaboration journey{" "}
          <MoveUpRight className="ml-2 h-4 w-5" />
        </div>

        <FadeUpOnScroll delay={0.15}>
          <div className="overflow-hidden rounded-sm border border-border">
            <img
              src={heroImage}
              alt="Team collaborating in a modern workspace, sharing ideas and working together."
              className="aspect-[16/7] w-full object-cover"
            />
          </div>
        </FadeUpOnScroll>

        <FadeUpOnScroll delay={0.25}>
          <div className="flex flex-col items-end justify-end">
            <div className="space-y-6 lg:w-1/2">
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base lg:text-lg">
                Our team thrives on collaboration—whether brainstorming new
                ideas, solving challenges, or celebrating wins. Every member
                brings unique strengths, and together we create solutions that
                are greater than the sum of their parts.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base lg:text-lg">
                Through open dialogue, trust, and a shared vision, we turn
                challenges into opportunities. Our collaborative culture
                empowers everyone to contribute, learn, and grow, making
                teamwork our greatest asset.
              </p>
              <div className="space-y-4">
                {projectDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex flex-col border-b-2 border-border py-3 text-sm sm:flex-row sm:items-center sm:justify-between md:text-base"
                  >
                    <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase md:text-sm">
                      {detail.label}
                    </span>
                    <span className="font-semibold text-foreground">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUpOnScroll>

        <div className="grid grid-cols-1 gap-6 md:gap-6">
          {gridImages.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-sm border border-border"
            >
              <img
                src={src}
                alt={
                  i === 0
                    ? "Team brainstorming with sticky notes, generating creative ideas."
                    : "Three people sitting on a couch with laptops, collaborating in a modern workspace."
                }
                className="aspect-[4/3] w-full object-cover transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-6">
          {gridImages2.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-sm border border-border"
            >
              <img
                src={src}
                alt={
                  i === 0
                    ? "Group of people in a meeting room with laptops, discussing a project."
                    : "People collaborating at a table with laptops in a modern office."
                }
                className="aspect-[4/3] w-full object-cover transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Project1 };

```

```tsx
"use client";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Project2Props {
  title: string;
  title2?: string;
  year: string;
  category: string;
  client: string;
  imageSrc: string;
  imageAlt: string;
  overviewHeading: string;
  mainDescription: string;
  detailDescription: string;
  buttonText: string;
  className?: string;
}

const Project2 = ({
  title = "DIGITAL",
  title2 = "ARTISANS",
  year = "[2024]",
  category = "[BRAND IDENTITY]",
  client = "[CREATIVE STUDIO]",
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
  imageAlt = "Creative workspace with coffee and design elements",
  overviewHeading = "PROJECT OVERVIEW",
  mainDescription = "A VIBRANT PHOTOGRAPHY SHOOT CAPTURES THE ESSENCE OF MODERN BRAND IDENTITY, BLENDING ARTISTIC EXPRESSION WITH BOLD VISUAL STORYTELLING.",
  detailDescription = "This project centers on a creative portrait session designed to reflect the innovative and dynamic spirit of the brand. The shoot features ethereal lighting and glitch-inspired color overlays, evoking a sense of movement and digital artistry. The subject's confident gaze and contemporary styling embody the brand's forward-thinking identity, while the interplay of cyan and magenta tones creates a memorable, immersive visual experience. This imagery will be used across brand touchpoints to communicate a unique blend of creativity, technology, and authenticity.",
  buttonText = "Contact Us",
  className,
}: Project2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="py-12">
          <div>
            <h1 className="font-serif text-6xl leading-none font-light tracking-tight text-foreground md:text-8xl lg:text-9xl">
              {title}
              {title2 && (
                <>
                  <br />
                  {title2}
                </>
              )}
            </h1>
          </div>

          <div className="mt-12 grid grid-cols-3 text-sm tracking-wider text-muted-foreground uppercase md:grid-cols-6">
            <div>
              <span className="block">YEAR</span>
              <span className="text-foreground">{year}</span>
            </div>
            <div>
              <span className="block">CATEGORY</span>
              <span className="text-foreground">{category}</span>
            </div>
            <div className="ml-16">
              <span className="block">CLIENT</span>
              <span className="text-foreground">{client}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-16 md:px-12 lg:px-24">
          <div>
            <h2 className="mb-8 text-sm tracking-wider text-foreground uppercase">
              {overviewHeading}
            </h2>
          </div>

          <div>
            <h2 className="mb-8 text-xl leading-relaxed font-light text-foreground md:text-2xl">
              {mainDescription}
            </h2>

            <p className="mb-12 text-base leading-relaxed text-muted-foreground">
              {detailDescription}
            </p>

            <div>
              <Button variant="outline">
                {buttonText}
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Project2 };

```

```tsx
"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Project10Props {
  className?: string;
}

const Project10 = ({ className }: Project10Props) => {
  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg",
      alt: "Creative design mockup",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg",
      alt: "Brand identity showcase",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg",
      alt: "Product photography",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw4.jpeg",
      alt: "Digital interface design",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw5.jpeg",
      alt: "Marketing campaign visual",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={cn("py-32", className)}>
      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
          variants={itemVariants}
        >
          <div className="flex-1">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Ubran Photography
            </h1>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Capturing the beauty of the urban world through the lens, from the
              streets to the buildings.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end lg:gap-6">
            <Button
              variant="outline"
              size="sm"
              className="w-fit gap-2 border-muted-foreground/20 bg-transparent hover:bg-muted/10"
            >
              View Portfolio <ArrowUpRight className="h-4 w-4" />
            </Button>

            <div className="flex gap-8 sm:gap-12">
              <div className="text-sm">
                <p className="mb-1 text-muted-foreground">Category</p>
                <p className="font-medium">Architecture</p>
              </div>
              <div className="text-sm">
                <p className="mb-1 text-muted-foreground">Medium</p>
                <p className="font-medium">Photography</p>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.div
          className="mb-16 overflow-hidden rounded-2xl bg-muted/20"
          variants={imageVariants}
        >
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw14.jpeg"
            alt="Arcane Hero Project"
            className="h-auto w-full object-cover"
          />
        </motion.div>

        {/* Content Sections */}
        <div className="mb-20 space-y-12 lg:space-y-16">
          <motion.section variants={itemVariants}>
            <div className="grid items-start gap-8 border-b border-border pb-8 lg:grid-cols-2 lg:gap-12 lg:pb-12">
              <div>
                <span className="text-4xl font-light text-muted-foreground sm:text-5xl lg:text-6xl">
                  01.
                </span>
                <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                  Inspiration.
                </h2>
              </div>
              <div className="space-y-4">
                <p className="leading-relaxed text-muted-foreground">
                  Nature photography is inspired by the ever-changing
                  landscapes, vibrant flora, and diverse wildlife that surround
                  us. Each moment in nature is unique, offering endless
                  opportunities to capture its essence.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  From the golden light of sunrise to the tranquil calm of dusk,
                  every photograph tells a story of the natural world.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants}>
            <div className="grid items-start gap-8 border-b border-border pb-8 lg:grid-cols-2 lg:gap-12 lg:pb-12">
              <div>
                <span className="text-4xl font-light text-muted-foreground sm:text-5xl lg:text-6xl">
                  02.
                </span>
                <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                  Challenges.
                </h2>
              </div>
              <div className="space-y-4">
                <p className="leading-relaxed text-muted-foreground">
                  Capturing the perfect shot in nature often means waiting
                  patiently for the right light, weather, or animal behavior. It
                  requires adaptability, respect for the environment, and a keen
                  eye for detail.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  The unpredictability of the outdoors makes every photo a
                  rewarding challenge.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants}>
            <div className="grid items-start gap-8 border-b border-border pb-8 lg:grid-cols-2 lg:gap-12 lg:pb-12">
              <div>
                <span className="text-4xl font-light text-muted-foreground sm:text-5xl lg:text-6xl">
                  03.
                </span>
                <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Reward.</h2>
              </div>
              <div className="space-y-4">
                <p className="leading-relaxed text-muted-foreground">
                  The reward of nature photography lies in sharing the beauty of
                  our planet with others. Each image can inspire appreciation,
                  conservation, and a deeper connection to the world around us.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Through the lens, we discover the extraordinary in the
                  ordinary, and the magic in the mundane.
                </p>
              </div>
            </div>
          </motion.section>
        </div>

        <motion.section className="space-y-4" variants={itemVariants}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {images.slice(0, 2).map((image, index) => (
              <motion.div
                key={index}
                className="overflow-hidden rounded-xl bg-muted/20"
                variants={imageVariants}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-80 lg:h-96"
                />
              </motion.div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-xl">
            <motion.div
              className="flex gap-4"
              animate={{
                x: [0, -400, -800, 0],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {images.slice(2, 5).map((image, index) => (
                <motion.div
                  key={index}
                  className="w-80 flex-shrink-0 overflow-hidden rounded-xl bg-muted/20 sm:w-96"
                  variants={imageVariants}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="h-48 w-full object-cover sm:h-64"
                  />
                </motion.div>
              ))}

              {images.slice(2, 5).map((image, index) => (
                <motion.div
                  key={`duplicate-${index}`}
                  className="w-80 flex-shrink-0 overflow-hidden rounded-xl bg-muted/20 sm:w-96"
                  variants={imageVariants}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="h-48 w-full object-cover sm:h-64"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </section>
  );
};

export { Project10 };

```

```tsx
"use client";

import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const headingLines = [
  "Embracing the Wild",
  "A Visual Storytelling Experience",
  "Through Nature",
];

const maskReveal = {
  hidden: { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

interface Project12Props {
  className?: string;
}

const Project12 = ({ className }: Project12Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container space-y-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="flex-1 lg:max-w-2xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              <Button
                variant="secondary"
                className="mb-6 h-auto p-1 font-normal text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </motion.div>

            <div className="space-y-2 overflow-hidden">
              {headingLines.map((line, i) => (
                <motion.h1
                  key={i}
                  className="text-3xl leading-tight font-bold text-foreground md:text-4xl lg:text-5xl"
                  initial="hidden"
                  animate="visible"
                  variants={maskReveal}
                  transition={{
                    delay: i * 0.3,
                    duration: 0.9,
                    ease: "easeInOut",
                  }}
                >
                  {line}
                </motion.h1>
              ))}
            </div>
          </div>

          <motion.div
            className="mt-1 flex-shrink-0 lg:w-80"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                This project explores the serene beauty of forests, rivers, and
                mountains through immersive photography and design. It's a
                celebration of Earth’s untouched wonders — aiming to reconnect
                people with the natural world.
              </p>

              <div className="space-y-4">
                {[
                  ["Year", "2025"],
                  ["Project", "Nature Documentary Web Experience"],
                  ["Photographer", "Lummi Trails"],
                ].map(([label, value], i) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    transition={{
                      delay: 0.9 + i * 0.2,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    <p className="mb-1 text-xs tracking-wide text-muted-foreground uppercase">
                      {label}
                    </p>
                    <p className="font-medium text-foreground">{value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 40, scale: 1.02 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
        >
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pat-whelen-gWfpmH0H2bM-unsplash.jpg"
            alt="Nature Landscape"
            className="w-full rounded-xl border border-border object-cover shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export { Project12 };

```

```tsx
"use client";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const images = {
  hero: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pat-whelen-gWfpmH0H2bM-unsplash.jpg",
};

const gridImages = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-hqnUYXsN5oY-unsplash.jpg",
    alt: "Chromatic exploration 1",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/kevin-charit-1fL2Q1JcbNc-unsplash.jpg",
    alt: "Chromatic exploration 2",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ines-alvarez-fdez-VjRc6HDXJ5s-unsplash.jpg",
    alt: "Chromatic exploration 3",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-Kj2tYAl4HZg-unsplash.jpg",
    alt: "Chromatic exploration 4",
  },
];

interface Project13Props {
  className?: string;
}

const Project13 = ({ className }: Project13Props) => {
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 100, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: "easeInOut",
        delay: 0.2,
      },
    },
  };

  return (
    <section className={cn("min-h-screen", className)}>
      <motion.section
        className="relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="relative flex h-[60vh] items-center justify-center md:h-[70vh] md:border-[50px] md:border-white lg:h-[100vh]"
          style={{ y: heroY, scale: heroScale }}
        >
          <motion.img
            src={images.hero}
            alt="Luminous Depths Hero"
            className="absolute inset-0 h-full w-full object-cover"
            variants={imageVariants}
          />
          <div className="absolute inset-0 bg-black/30" />
          <motion.h1
            className="relative z-10 px-4 text-center text-4xl font-semibold text-white md:text-6xl lg:text-7xl xl:text-8xl"
            variants={titleVariants}
          >
            Luminous Depths
          </motion.h1>
        </motion.div>
      </motion.section>

      <motion.section
        className="px-4 py-12 md:px-8 md:py-16 lg:px-16 lg:py-20 xl:px-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl">
          <motion.p
            className="mb-12 max-w-7xl border-b pb-7 text-lg leading-relaxed md:mb-16 md:text-xl lg:mb-20 lg:text-2xl"
            variants={itemVariants}
          >
            An immersive journey through the depths of color psychology, where
            each hue tells a story of emotion, memory, and human connection
            through carefully orchestrated visual narratives.
          </motion.p>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12 lg:grid-cols-3 lg:gap-16">
            <motion.div variants={itemVariants}>
              <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                Project
              </h3>
              <p className="text-base md:text-lg">Luminous Depths</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                Studio
              </h3>
              <p className="text-base md:text-lg">Prism Collective</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                Year
              </h3>
              <p className="text-base md:text-lg">2025</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                Role
              </h3>
              <p className="mb-4 text-base md:text-lg">Creative Director</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                Tools
              </h3>
              <p className="text-base md:text-lg">
                Photoshop, Illustrator, Figma
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="pb-12 md:pb-16 lg:pb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {gridImages.map((image, index) => (
            <motion.div
              key={index}
              className="md:col-span-1 lg:col-span-1"
              variants={imageVariants}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="px-4 py-5 md:px-8 md:py-5 md:pb-22 lg:px-16 xl:px-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div variants={itemVariants}>
              <h3 className="mb-4 text-sm tracking-wider text-muted-foreground uppercase">
                Concept
              </h3>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="mb-6 text-2xl font-medium md:mb-8 md:text-3xl lg:text-4xl">
                The Language of Light
              </h2>

              <div className="space-y-4 leading-relaxed font-medium text-muted-foreground md:space-y-6">
                <p>
                  This exploration delves into the profound relationship between
                  color, emotion, and human perception, creating a visual
                  language that speaks directly to the subconscious mind.
                </p>

                <p>
                  Through meticulous attention to chromatic harmony and
                  contrast, each composition becomes a meditation on the power
                  of color to evoke memory, trigger emotion, and create lasting
                  impressions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </section>
  );
};

export { Project13 };

```

```tsx
"use client";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const images = {
  hero: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pat-whelen-gWfpmH0H2bM-unsplash.jpg",
};

const galleryImages = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-hqnUYXsN5oY-unsplash.jpg",
    alt: "Chromatic exploration 1",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/kevin-charit-1fL2Q1JcbNc-unsplash.jpg",
    alt: "Chromatic exploration 2",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ines-alvarez-fdez-VjRc6HDXJ5s-unsplash.jpg",
    alt: "Chromatic exploration 3",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-Kj2tYAl4HZg-unsplash.jpg",
    alt: "Chromatic exploration 4",
  },
];

interface Project13aProps {
  className?: string;
}

const Project13a = ({ className }: Project13aProps) => {
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 150 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3,
      },
    },
  };

  return (
    <section className={cn("min-h-screen", className)}>
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="relative flex h-screen items-center justify-center"
          style={{ y: heroY }}
        >
          <motion.img
            src={images.hero}
            alt="Luminous Depths Hero"
            className="absolute inset-0 h-full w-full object-cover"
            variants={imageVariants}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
          <motion.div
            className="relative z-10 px-4 text-center"
            style={{ y: textY }}
          >
            <motion.h1
              className="mb-6 text-5xl font-bold text-white md:text-7xl lg:text-8xl xl:text-9xl"
              variants={titleVariants}
            >
              Luminous
              <br />
              Depths
            </motion.h1>
            <motion.p
              className="mx-auto max-w-2xl text-lg text-white/90 md:text-xl"
              variants={itemVariants}
            >
              A chromatic journey through emotion and perception
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Project Info Section */}
      <motion.section
        className="-mt-1 px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32 xl:px-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20"
            variants={itemVariants}
          >
            <div>
              <h2 className="mb-8 text-3xl font-semibold md:text-4xl lg:text-5xl">
                Project Overview
              </h2>
              <p className="text-lg leading-relaxed md:text-xl">
                An immersive exploration of color psychology and human emotion,
                crafted through deliberate visual storytelling and chromatic
                harmony.
              </p>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                  Studio
                </h3>
                <p className="text-lg md:text-xl">Prism Collective</p>
              </div>
              <div>
                <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                  Year & Role
                </h3>
                <p className="text-lg md:text-xl">2025 — Creative Director</p>
              </div>
              <div>
                <h3 className="mb-2 text-sm tracking-wider text-muted-foreground uppercase">
                  Tools
                </h3>
                <p className="text-lg md:text-xl">
                  Photoshop, Illustrator, Figma
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Full-width Images */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div>
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden"
              variants={imageVariants}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="relative aspect-auto overflow-hidden lg:aspect-video">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Concept Section */}
      <motion.section
        className="px-4 py-5 md:px-8 md:py-5 lg:px-16 xl:px-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl py-24">
          <div className="grid grid-cols-1 items-start gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div variants={itemVariants}>
              <h3 className="mb-4 text-sm tracking-wider text-muted-foreground uppercase">
                Concept
              </h3>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="mb-6 text-2xl font-medium md:mb-8 md:text-3xl lg:text-4xl">
                The Language of Light
              </h2>

              <div className="space-y-4 leading-relaxed font-medium text-muted-foreground md:space-y-6">
                <p>
                  This exploration delves into the profound relationship between
                  color, emotion, and human perception, creating a visual
                  language that speaks directly to the subconscious mind.
                </p>

                <p>
                  Through meticulous attention to chromatic harmony and
                  contrast, each composition becomes a meditation on the power
                  of color to evoke memory, trigger emotion, and create lasting
                  impressions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </section>
  );
};

export { Project13a };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Project14Props {
  className?: string;
}

const Project14 = ({ className }: Project14Props) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <motion.div
          className="mb-16 text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <motion.p
            className="mb-4 text-sm tracking-widest uppercase"
            variants={fadeInUp}
          >
            Project
          </motion.p>
          <motion.h1
            className="text-2xl font-bold tracking-wider uppercase md:text-5xl lg:text-7xl"
            variants={fadeInUp}
          >
            AUSTIN MOTORS
          </motion.h1>
        </motion.div>

        <motion.div
          className="mb-24 grid gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="relative overflow-hidden rounded-md"
            variants={fadeInUp}
          >
            <motion.div
              className="relative h-[400px] w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg"
                alt="Luxury sports car in motion blur"
                className="h-full w-full object-cover grayscale filter transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="relative overflow-hidden rounded-md"
            variants={fadeInUp}
          >
            <motion.div
              className="relative h-[400px] w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg"
                alt="Close-up of car wheel and brake system"
                className="h-full w-full object-cover grayscale filter transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mb-16 text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="mb-12 flex items-center justify-evenly gap-4"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <p className="mb-2 text-xs tracking-widest uppercase">CATEGORY</p>
              <p className="font-medium tracking-wide uppercase md:text-lg">
                AUTOMOTIVE
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <p className="mb-2 text-xs tracking-widest uppercase">YEAR</p>
              <p className="font-medium tracking-wide uppercase md:text-lg">
                2025
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <p className="mb-2 text-xs tracking-widest uppercase">BRAND</p>
              <p className="font-medium tracking-wide uppercase md:text-lg">
                AUSTIN LIFESTYLE
              </p>
            </motion.div>
          </motion.div>
          <motion.div className="mx-auto max-w-4xl" variants={fadeInUp}>
            <p className="leading-relaxed">
              Austin Motors brings decades of British automotive heritage into
              the modern era with this groundbreaking project. Every element
              reflects our commitment to precision engineering and timeless
              design, where traditional craftsmanship meets innovative
              technology. This concept embodies Austin's legacy of creating
              vehicles that deliver exceptional performance while honoring the
              sophisticated elegance that has defined the brand for generations.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="relative overflow-hidden rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative h-[600px] w-full">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw7.jpeg"
                alt="Front view of luxury supercar with dramatic lighting"
                className="h-full w-full object-cover grayscale filter duration-500 hover:scale-105"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="relative overflow-hidden rounded-md"
            variants={fadeInUp}
          >
            <motion.div
              className="relative h-[400px] w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw9.jpeg"
                alt="Side profile of sports car against urban backdrop"
                className="h-full w-full object-cover grayscale filter transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="relative overflow-hidden rounded-md"
            variants={fadeInUp}
          >
            <motion.div
              className="relative h-[400px] w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw5.jpeg"
                alt="Interior dashboard with premium materials and technology"
                className="h-full w-full object-cover grayscale filter transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export { Project14 };

```

```tsx
"use client";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Project2aProps {
  title: string;
  title2?: string;
  year: string;
  category: string;
  client: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
  mainDescription: string;
  detailDescription: string;
  buttonText: string;
  className?: string;
}

const Project2a = ({
  title = "DIGITAL",
  title2 = "ARTISANS",
  year = "[2024]",
  category = "[BRAND IDENTITY]",
  client = "[CREATIVE STUDIO]",
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
  imageAlt = "Creative workspace with coffee and design elements",
  imageCaption = "Artistic portrait with glitch-inspired overlays and ethereal lighting",
  mainDescription = "A VIBRANT PHOTOGRAPHY SHOOT CAPTURES THE ESSENCE OF MODERN BRAND IDENTITY, BLENDING ARTISTIC EXPRESSION WITH BOLD VISUAL STORYTELLING.",
  detailDescription = "This project centers on a creative portrait session designed to reflect the innovative and dynamic spirit of the brand. The shoot features ethereal lighting and glitch-inspired color overlays, evoking a sense of movement and digital artistry. The subject's confident gaze and contemporary styling embody the brand's forward-thinking identity, while the interplay of cyan and magenta tones creates a memorable, immersive visual experience. This imagery will be used across brand touchpoints to communicate a unique blend of creativity, technology, and authenticity.",
  buttonText = "Contact Us",
  className,
}: Project2aProps) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto px-8 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-20 flex flex-col items-center justify-center gap-6">
            <Label className="text-sm tracking-wider text-foreground uppercase">
              Project
            </Label>
            <h1 className="text-center font-serif text-7xl leading-none font-light tracking-tight text-foreground md:text-8xl lg:text-9xl">
              {title}
              {title2 && (
                <>
                  <br />
                  {title2}
                </>
              )}
            </h1>
            <div className="mx-auto mt-12 h-px w-24 bg-border"></div>
          </div>

          <div className="mb-24 grid grid-cols-3 justify-items-center text-sm tracking-wider text-muted-foreground uppercase">
            <div>
              <span className="block">YEAR</span>
              <span className="text-foreground">{year}</span>
            </div>
            <div>
              <span className="block">CATEGORY</span>
              <span className="text-foreground">{category}</span>
            </div>
            <div>
              <span className="block">CLIENT</span>
              <span className="text-foreground">{client}</span>
            </div>
          </div>

          <div className="mb-24">
            <div className="aspect-[16/10] overflow-hidden bg-muted">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-6 text-center text-xs tracking-widest text-muted-foreground">
              <em>{imageCaption}</em>
            </div>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="space-y-8">
              <h2 className="mb-8 text-xl leading-relaxed font-light text-foreground md:text-2xl">
                {mainDescription}
              </h2>

              <p className="mb-12 text-base leading-relaxed text-muted-foreground">
                {detailDescription}
              </p>

              <div>
                <Button variant="outline">
                  {buttonText}
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Project2a };

```

```tsx
"use client";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Project2bProps {
  title: string;
  title2?: string;
  year: string;
  category: string;
  client: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption?: string;
  overviewHeading: string;
  mainDescription: string;
  detailDescription: string;
  buttonText: string;
  className?: string;
}

const Project2b = ({
  title = "DIGITAL",
  title2 = "ARTISANS",
  year = "[2024]",
  category = "[BRAND IDENTITY]",
  client = "[CREATIVE STUDIO]",
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
  imageAlt = "Creative workspace with coffee and design elements",
  imageCaption = "Artistic portrait with glitch-inspired overlays and ethereal lighting",
  overviewHeading = "PROJECT OVERVIEW",
  mainDescription = "A VIBRANT PHOTOGRAPHY SHOOT CAPTURES THE ESSENCE OF MODERN BRAND IDENTITY, BLENDING ARTISTIC EXPRESSION WITH BOLD VISUAL STORYTELLING.",
  detailDescription = "This project centers on a creative portrait session designed to reflect the innovative and dynamic spirit of the brand. The shoot features ethereal lighting and glitch-inspired color overlays, evoking a sense of movement and digital artistry. The subject's confident gaze and contemporary styling embody the brand's forward-thinking identity, while the interplay of cyan and magenta tones creates a memorable, immersive visual experience. This imagery will be used across brand touchpoints to communicate a unique blend of creativity, technology, and authenticity.",
  buttonText = "Contact Us",
  className,
}: Project2bProps) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-24 grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8">
              <h1 className="font-mono text-4xl leading-tight font-normal tracking-wider text-foreground md:text-6xl lg:text-7xl">
                {title}
                {title2 && (
                  <>
                    <br />
                    {title2}
                  </>
                )}
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="space-y-6 border-l border-border pl-8">
                <div className="space-y-2">
                  <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    Year
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {year}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    Category
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {category}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    Client
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {client}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-24">
            <div className="aspect-[3/2] overflow-hidden bg-muted">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-cover"
              />
            </div>
            {imageCaption && (
              <div className="mt-4 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {imageCaption}
              </div>
            )}
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3">
              <h2 className="text-xs font-medium tracking-wider text-foreground uppercase">
                {overviewHeading}
              </h2>
            </div>
            <div className="col-span-12 md:col-span-9">
              <div className="space-y-8">
                <h3 className="text-xl leading-relaxed font-light text-foreground md:text-2xl">
                  {mainDescription}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {detailDescription}
                </p>
                <div className="pt-4">
                  <Button variant="outline">
                    {buttonText}
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Project2b };

```

```tsx
"use client";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Project2cProps {
  title: string;
  title2?: string;
  year: string;
  category: string;
  client: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption?: string;
  overviewHeading: string;
  mainDescription: string;
  detailDescription: string;
  buttonText: string;
  className?: string;
}

const Project2c = ({
  title = "DIGITAL",
  title2 = "ARTISANS",
  year = "[2024]",
  category = "[BRAND IDENTITY]",
  client = "[CREATIVE STUDIO]",
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
  imageAlt = "Creative workspace with coffee and design elements",
  imageCaption = "Artistic portrait with glitch-inspired overlays and ethereal lighting",
  overviewHeading = "PROJECT OVERVIEW",
  mainDescription = "A VIBRANT PHOTOGRAPHY SHOOT CAPTURES THE ESSENCE OF MODERN BRAND IDENTITY, BLENDING ARTISTIC EXPRESSION WITH BOLD VISUAL STORYTELLING.",
  detailDescription = "This project centers on a creative portrait session designed to reflect the innovative and dynamic spirit of the brand. The shoot features ethereal lighting and glitch-inspired color overlays, evoking a sense of movement and digital artistry. The subject's confident gaze and contemporary styling embody the brand's forward-thinking identity, while the interplay of cyan and magenta tones creates a memorable, immersive visual experience. This imagery will be used across brand touchpoints to communicate a unique blend of creativity, technology, and authenticity.",
  buttonText = "Contact Us",
  className,
}: Project2cProps) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto px-6 py-16 lg:px-8">
        <div className="mb-20">
          <div className="mb-16">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-2 w-2 bg-foreground"></div>
              <span className="text-sm font-medium text-muted-foreground">
                PROJECT SHOWCASE
              </span>
            </div>
            <h1 className="font-serif text-6xl leading-[0.85] font-light tracking-tight text-foreground md:text-8xl lg:text-9xl">
              {title}
              {title2 && (
                <>
                  <br />
                  {title2}
                </>
              )}
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group">
              <div className="h-[1px] w-full bg-border"></div>
              <div className="mt-4 text-sm font-medium text-muted-foreground">
                YEAR
              </div>
              <div className="mt-1 text-lg text-foreground">{year}</div>
            </div>
            <div className="group">
              <div className="h-[1px] w-full bg-border"></div>
              <div className="mt-4 text-sm font-medium text-muted-foreground">
                CATEGORY
              </div>
              <div className="mt-1 text-lg text-foreground">{category}</div>
            </div>
            <div className="group">
              <div className="h-[1px] w-full bg-border"></div>
              <div className="mt-4 text-sm font-medium text-muted-foreground">
                CLIENT
              </div>
              <div className="mt-1 text-lg text-foreground">{client}</div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover"
            />
          </div>
          {imageCaption && (
            <div className="mt-6">
              <p className="text-sm font-medium text-muted-foreground">
                {imageCaption}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-16">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            <div className="mb-8 lg:mb-0 lg:w-1/3">
              <div className="sticky top-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-3 w-3 bg-foreground"></div>
                  <h2 className="text-lg font-medium text-foreground">
                    {overviewHeading}
                  </h2>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="space-y-12">
                <div className="relative">
                  <h3 className="text-3xl leading-tight font-light text-foreground md:text-4xl">
                    {mainDescription}
                  </h3>
                </div>

                <div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {detailDescription}
                  </p>
                </div>

                <div className="flex justify-start">
                  <Button variant="outline">
                    {buttonText}
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Project2c };

```

```tsx
"use client";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Project2dProps {
  title: string;
  title2?: string;
  year: string;
  category: string;
  client: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption?: string;
  overviewHeading: string;
  mainDescription: string;
  detailDescription: string;
  buttonText: string;
  className?: string;
}

const Project2d = ({
  title = "DIGITAL",
  title2 = "ARTISANS",
  year = "[2024]",
  category = "[BRAND IDENTITY]",
  client = "[CREATIVE STUDIO]",
  imageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/artistic-portrait-glitch-yqp6z.png",
  imageAlt = "Creative workspace with coffee and design elements",
  imageCaption = "Artistic portrait with glitch-inspired overlays and ethereal lighting",
  overviewHeading = "PROJECT OVERVIEW",
  mainDescription = "A VIBRANT PHOTOGRAPHY SHOOT CAPTURES THE ESSENCE OF MODERN BRAND IDENTITY, BLENDING ARTISTIC EXPRESSION WITH BOLD VISUAL STORYTELLING.",
  detailDescription = "This project centers on a creative portrait session designed to reflect the innovative and dynamic spirit of the brand. The shoot features ethereal lighting and glitch-inspired color overlays, evoking a sense of movement and digital artistry. The subject's confident gaze and contemporary styling embody the brand's forward-thinking identity, while the interplay of cyan and magenta tones creates a memorable, immersive visual experience. This imagery will be used across brand touchpoints to communicate a unique blend of creativity, technology, and authenticity.",
  buttonText = "Contact Us",
  className,
}: Project2dProps) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto px-6 py-20 lg:px-12">
        <div className="mb-40">
          <div className="grid grid-cols-12 gap-8 lg:gap-16">
            <div className="col-span-12 lg:col-span-7">
              <div className="mb-12">
                <div className="mb-6 inline-flex items-center space-x-4">
                  <div className="h-px w-16 bg-foreground"></div>
                  <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                    Project
                  </span>
                </div>
                <h1 className="font-serif text-5xl leading-[0.95] font-light tracking-tight text-foreground md:text-7xl lg:text-8xl xl:text-9xl">
                  {title}
                  {title2 && (
                    <>
                      <br />
                      {title2}
                    </>
                  )}
                </h1>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5">
              <div className="h-full lg:pt-32">
                <div className="space-y-8">
                  <div className="rounded-lg bg-muted/50 p-8">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="flex items-center justify-between border-b border-border pb-4">
                        <span className="text-sm font-medium text-muted-foreground">
                          Year
                        </span>
                        <span className="font-medium text-foreground">
                          {year}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-border pb-4">
                        <span className="text-sm font-medium text-muted-foreground">
                          Category
                        </span>
                        <span className="font-medium text-foreground">
                          {category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                          Client
                        </span>
                        <span className="font-medium text-foreground">
                          {client}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-32">
          <div className="relative">
            <div className="aspect-[5/3] overflow-hidden rounded-2xl">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-cover"
              />
            </div>
            {imageCaption && (
              <div className="absolute -right-4 bottom-8 max-w-xs rounded-lg bg-background/95 p-4 lg:-right-8">
                <p className="text-sm font-medium text-muted-foreground">
                  {imageCaption}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-8">
              <h2 className="mb-6 text-sm font-medium tracking-widest text-muted-foreground uppercase">
                {overviewHeading}
              </h2>
              <div className="h-px w-12 bg-foreground"></div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-12">
              <h3 className="text-3xl leading-relaxed font-light text-foreground md:text-4xl">
                {mainDescription}
              </h3>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {detailDescription}
                </p>
              </div>

              <div className="pt-8">
                <Button variant="outline" size="lg">
                  {buttonText}
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Project2d };

```

```tsx
import React from "react";

import { cn } from "@/lib/utils";

interface Project4Props {
  className?: string;
}

const Project4 = ({ className }: Project4Props) => {
  return (
    <section className={cn("py-16", className)}>
      <div className="container max-w-4xl">
        {/* Header Section */}
        <div className="mb-20">
          <div className="mb-12">
            <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              Brand Identity Design
            </p>
            <h1 className="mt-4 text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
              Pure Pressed
            </h1>
            <p className="mt-6 text-2xl text-muted-foreground md:text-3xl">
              Crafting a fresh, authentic brand identity for a premium
              cold-pressed juice company that celebrates natural wellness.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 text-sm">
            <div>
              <p className="font-semibold tracking-wider text-muted-foreground uppercase">
                Creative Director
              </p>
              <p className="mt-2 text-lg font-medium">Maya Chen</p>
            </div>
            <div>
              <p className="font-semibold tracking-wider text-muted-foreground uppercase">
                Industry
              </p>
              <p className="mt-2 text-lg font-medium">Food & Beverage</p>
            </div>
            <div>
              <p className="font-semibold tracking-wider text-muted-foreground uppercase">
                Year
              </p>
              <p className="mt-2 text-lg font-medium">2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image - Full Width */}
      <div className="mb-20">
        <div className="container max-w-7xl">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-BRVqq2uak4E-unsplash.jpg"
            alt="Fresh cold-pressed juice bottles"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl">
        <div className="prose prose-lg mb-16 max-w-none">
          <p className="lead">
            Pure Pressed approached us to create a brand identity that would
            differentiate them in the competitive wellness market. Our challenge
            was to convey authenticity, premium quality, and the raw vitality of
            fresh ingredients through every touchpoint.
          </p>
        </div>

        <div className="mb-16">
          <div className="prose prose-lg max-w-none">
            <h2>The Challenge</h2>

            <p>
              The cold-pressed juice market is saturated with brands claiming to
              be "natural" and "healthy." Pure Pressed needed to stand out by
              communicating genuine authenticity and premium quality while
              remaining approachable to everyday consumers.
            </p>

            <h3>Market differentiation</h3>
            <p>
              With numerous competitors using similar messaging around health
              and wellness, we needed to find a unique positioning that
              highlighted Pure Pressed's commitment to quality ingredients and
              sustainable practices.
            </p>

            <h3>Premium accessibility</h3>
            <p>
              The brand needed to feel premium enough to justify higher price
              points while remaining accessible and not intimidating to
              health-conscious consumers from all backgrounds.
            </p>

            <div className="not-prose -mx-8 my-12 sm:-mx-16 lg:-mx-32">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-jcHO600npH8-unsplash.jpg"
                alt="Colorful array of fresh pressed juices"
                className="w-full rounded-lg"
              />
              <p className="mt-4 text-center text-sm text-muted-foreground italic">
                The vibrant color palette of Pure Pressed juices became a key
                brand differentiator, showcasing the natural beauty of fresh
                ingredients.
              </p>
            </div>

            <h2>Process</h2>

            <p>
              Our approach began with extensive market research and consumer
              interviews to understand the wellness landscape. We developed a
              brand strategy that positioned Pure Pressed as the intersection of
              premium quality and authentic simplicity.
            </p>

            <h3>Our design methodology</h3>
            <ol>
              <li>Brand strategy & positioning research</li>
              <li>Visual identity exploration & concepts</li>
              <li>Logo design & typography selection</li>
              <li>Color palette & packaging design</li>
              <li>Brand guidelines & rollout strategy</li>
            </ol>

            <h2>Outcome</h2>

            <p>
              The new brand identity successfully positioned Pure Pressed as a
              premium yet approachable wellness brand. The clean, natural
              aesthetic resonated with target consumers, resulting in a 40%
              increase in brand recognition and strong retail partnerships.
            </p>

            <p>
              The packaging design became a key differentiator on shelves, with
              the minimalist approach allowing the vibrant colors of the juices
              to shine through while maintaining a premium feel.
            </p>

            <p>
              Through thoughtful brand development and strategic visual
              storytelling, Pure Pressed now stands as a authentic leader in the
              wellness space, building lasting connections with health-conscious
              consumers.
            </p>

            <div className="not-prose -mx-8 my-12 sm:-mx-16 lg:-mx-32">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-2tuH5dIqQEc-unsplash.jpg"
                alt="Pure Pressed brand identity showcase"
                className="w-full rounded-lg"
              />
              <p className="mt-4 text-center text-sm text-muted-foreground italic">
                The final brand identity system emphasizes clean, minimal design
                that allows the product's natural appeal to take center stage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Project4 };

```

```tsx
import React from "react";

import { cn } from "@/lib/utils";

interface Project4aProps {
  className?: string;
}

const Project4a = ({ className }: Project4aProps) => {
  return (
    <section className={cn("py-16", className)}>
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8 lg:sticky lg:top-8">
              {/* Project Info */}
              <div>
                <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Brand Identity Design
                </p>
                <h1 className="mb-4 text-4xl font-bold">Pure Pressed</h1>
                <p className="leading-relaxed text-muted-foreground">
                  Crafting a fresh, authentic brand identity for a premium
                  cold-pressed juice company.
                </p>
              </div>

              {/* Metadata */}
              <div className="space-y-6 border-t pt-8">
                <div>
                  <p className="mb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Creative Director
                  </p>
                  <p className="font-medium">Maya Chen</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Industry
                  </p>
                  <p className="font-medium">Food & Beverage</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Year
                  </p>
                  <p className="font-medium">2024</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="border-t pt-8">
                <p className="mb-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Sections
                </p>
                <div className="space-y-2">
                  <a
                    href="#challenge"
                    className="block text-sm transition-colors hover:text-primary"
                  >
                    The Challenge
                  </a>
                  <a
                    href="#process"
                    className="block text-sm transition-colors hover:text-primary"
                  >
                    Process
                  </a>
                  <a
                    href="#outcome"
                    className="block text-sm transition-colors hover:text-primary"
                  >
                    Outcome
                  </a>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Image */}
            <div className="mb-16">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-BRVqq2uak4E-unsplash.jpg"
                alt="Fresh cold-pressed juice bottles"
                className="w-full rounded-lg"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="lead">
                Pure Pressed approached us to create a brand identity that would
                differentiate them in the competitive wellness market. Our
                challenge was to convey authenticity, premium quality, and the
                raw vitality of fresh ingredients through every touchpoint.
              </p>

              <h2 id="challenge">The Challenge</h2>

              <p>
                The cold-pressed juice market is saturated with brands claiming
                to be "natural" and "healthy." Pure Pressed needed to stand out
                by communicating genuine authenticity and premium quality while
                remaining approachable to everyday consumers.
              </p>

              <h3>Market differentiation</h3>
              <p>
                With numerous competitors using similar messaging around health
                and wellness, we needed to find a unique positioning that
                highlighted Pure Pressed's commitment to quality ingredients and
                sustainable practices.
              </p>

              <h3>Premium accessibility</h3>
              <p>
                The brand needed to feel premium enough to justify higher price
                points while remaining accessible and not intimidating to
                health-conscious consumers from all backgrounds.
              </p>

              <div className="not-prose my-16">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-jcHO600npH8-unsplash.jpg"
                  alt="Colorful array of fresh pressed juices"
                  className="w-full rounded-lg"
                />
                <p className="mt-4 text-center text-sm text-muted-foreground italic">
                  The vibrant color palette of Pure Pressed juices became a key
                  brand differentiator, showcasing the natural beauty of fresh
                  ingredients.
                </p>
              </div>

              <h2 id="process">Process</h2>

              <p>
                Our approach began with extensive market research and consumer
                interviews to understand the wellness landscape. We developed a
                brand strategy that positioned Pure Pressed as the intersection
                of premium quality and authentic simplicity.
              </p>

              <h3>Our design methodology</h3>
              <ol>
                <li>Brand strategy & positioning research</li>
                <li>Visual identity exploration & concepts</li>
                <li>Logo design & typography selection</li>
                <li>Color palette & packaging design</li>
                <li>Brand guidelines & rollout strategy</li>
              </ol>

              <h2 id="outcome">Outcome</h2>

              <p>
                The new brand identity successfully positioned Pure Pressed as a
                premium yet approachable wellness brand. The clean, natural
                aesthetic resonated with target consumers, resulting in a 40%
                increase in brand recognition and strong retail partnerships.
              </p>

              <p>
                The packaging design became a key differentiator on shelves,
                with the minimalist approach allowing the vibrant colors of the
                juices to shine through while maintaining a premium feel.
              </p>

              <p>
                Through thoughtful brand development and strategic visual
                storytelling, Pure Pressed now stands as a authentic leader in
                the wellness space, building lasting connections with
                health-conscious consumers.
              </p>

              <div className="not-prose my-16">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-2tuH5dIqQEc-unsplash.jpg"
                  alt="Pure Pressed brand identity showcase"
                  className="w-full rounded-lg"
                />
                <p className="mt-4 text-center text-sm text-muted-foreground italic">
                  The final brand identity system emphasizes clean, minimal
                  design that allows the product's natural appeal to take center
                  stage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Project4a };

```

```tsx
import React from "react";

import { cn } from "@/lib/utils";

interface Project4bProps {
  className?: string;
}

const Project4b = ({ className }: Project4bProps) => {
  return (
    <section className={cn("py-16", className)}>
      {/* Header */}
      <div className="container mb-20 max-w-6xl">
        <div className="text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            Brand Identity Design
          </p>
          <h1 className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl">
            Pure Pressed
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
            Crafting a fresh, authentic brand identity for a premium
            cold-pressed juice company that celebrates natural wellness.
          </p>

          <div className="mt-12 flex justify-center gap-12 text-sm">
            <div>
              <p className="mb-1 font-semibold tracking-wider text-muted-foreground uppercase">
                Creative Director
              </p>
              <p className="font-medium">Maya Chen</p>
            </div>
            <div>
              <p className="mb-1 font-semibold tracking-wider text-muted-foreground uppercase">
                Industry
              </p>
              <p className="font-medium">Food & Beverage</p>
            </div>
            <div>
              <p className="mb-1 font-semibold tracking-wider text-muted-foreground uppercase">
                Year
              </p>
              <p className="font-medium">2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="mb-20">
        <div className="container max-w-7xl">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-BRVqq2uak4E-unsplash.jpg"
            alt="Fresh cold-pressed juice bottles"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Introduction */}
      <div className="container mb-20 max-w-4xl">
        <div className="prose prose-lg mb-16 max-w-none text-center">
          <p className="lead">
            Pure Pressed approached us to create a brand identity that would
            differentiate them in the competitive wellness market. Our challenge
            was to convey authenticity, premium quality, and the raw vitality of
            fresh ingredients through every touchpoint.
          </p>
        </div>
        <div className="container max-w-5xl">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-3XSkkuic3Pg-unsplash.jpg"
            alt="Pure Pressed ingredients"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Challenge Section */}
      <div className="container mb-20 max-w-4xl">
        <div className="prose prose-lg mb-16 max-w-none">
          <h2>The Challenge</h2>

          <p>
            The cold-pressed juice market is saturated with brands claiming to
            be "natural" and "healthy." Pure Pressed needed to stand out by
            communicating genuine authenticity and premium quality while
            remaining approachable to everyday consumers.
          </p>

          <h3>Market differentiation</h3>
          <p>
            With numerous competitors using similar messaging around health and
            wellness, we needed to find a unique positioning that highlighted
            Pure Pressed's commitment to quality ingredients and sustainable
            practices.
          </p>

          <h3>Premium accessibility</h3>
          <p>
            The brand needed to feel premium enough to justify higher price
            points while remaining accessible and not intimidating to
            health-conscious consumers from all backgrounds.
          </p>
        </div>

        <div className="container max-w-5xl">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-jcHO600npH8-unsplash.jpg"
            alt="Colorful array of fresh pressed juices"
            className="w-full rounded-lg"
          />
          <p className="mt-4 text-center text-sm text-muted-foreground italic">
            The vibrant color palette of Pure Pressed juices became a key brand
            differentiator, showcasing the natural beauty of fresh ingredients.
          </p>
        </div>
      </div>

      {/* Process Section */}
      <div className="container mb-20 max-w-4xl">
        <div className="prose prose-lg mb-16 max-w-none">
          <h2>Process</h2>

          <p>
            Our approach began with extensive market research and consumer
            interviews to understand the wellness landscape. We developed a
            brand strategy that positioned Pure Pressed as the intersection of
            premium quality and authentic simplicity.
          </p>

          <h3>Our design methodology</h3>
          <ol>
            <li>Brand strategy & positioning research</li>
            <li>Visual identity exploration & concepts</li>
            <li>Logo design & typography selection</li>
            <li>Color palette & packaging design</li>
            <li>Brand guidelines & rollout strategy</li>
          </ol>
        </div>

        <div className="container max-w-5xl">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-dxIzIveffLE-unsplash.jpg"
            alt="Pure Pressed design process"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Outcome Section */}
      <div className="container mb-20 max-w-4xl">
        <div className="prose prose-lg mb-16 max-w-none">
          <h2>Outcome</h2>

          <p>
            The new brand identity successfully positioned Pure Pressed as a
            premium yet approachable wellness brand. The clean, natural
            aesthetic resonated with target consumers, resulting in a 40%
            increase in brand recognition and strong retail partnerships.
          </p>

          <p>
            The packaging design became a key differentiator on shelves, with
            the minimalist approach allowing the vibrant colors of the juices to
            shine through while maintaining a premium feel.
          </p>

          <p>
            Through thoughtful brand development and strategic visual
            storytelling, Pure Pressed now stands as a authentic leader in the
            wellness space, building lasting connections with health-conscious
            consumers.
          </p>
        </div>

        <div className="container max-w-5xl">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-2tuH5dIqQEc-unsplash.jpg"
            alt="Pure Pressed brand identity showcase"
            className="w-full rounded-lg"
          />
          <p className="mt-4 text-center text-sm text-muted-foreground italic">
            The final brand identity system emphasizes clean, minimal design
            that allows the product's natural appeal to take center stage.
          </p>
        </div>
      </div>
    </section>
  );
};

export { Project4b };

```

```tsx
import React from "react";

import { cn } from "@/lib/utils";

interface Project4cProps {
  className?: string;
}

const Project4c = ({ className }: Project4cProps) => {
  return (
    <section className={cn("py-16", className)}>
      {/* Hero Section with Overlay */}
      <div className="relative mb-20">
        <div className="relative h-screen max-h-[80vh] overflow-hidden">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-BRVqq2uak4E-unsplash.jpg"
            alt="Fresh cold-pressed juice bottles"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div className="max-w-4xl px-8">
              <p className="mb-4 text-sm font-semibold tracking-widest uppercase opacity-90">
                Brand Identity Design
              </p>
              <h1 className="mb-6 text-6xl font-bold md:text-8xl lg:text-9xl">
                Pure Pressed
              </h1>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed opacity-90 md:text-2xl">
                Crafting a fresh, authentic brand identity for a premium
                cold-pressed juice company that celebrates natural wellness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Article */}
      <div className="container max-w-4xl">
        {/* Article Header */}
        <div className="mb-16 border-b pb-12">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="space-y-6">
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Creative Direction
                </p>
                <p className="text-lg font-medium">Maya Chen</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Industry & Category
                </p>
                <p className="text-lg font-medium">
                  Food & Beverage — Brand Identity
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Project Year
                </p>
                <p className="text-lg font-medium">2024</p>
              </div>
            </div>
            <div className="text-right">
              <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Reading Time
              </p>
              <p className="text-lg font-medium">5 minutes</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <article className="prose prose-lg max-w-none prose-gray">
          <p className="lead text-2xl leading-relaxed">
            Pure Pressed approached us to create a brand identity that would
            differentiate them in the competitive wellness market. Our challenge
            was to convey authenticity, premium quality, and the raw vitality of
            fresh ingredients through every touchpoint.
          </p>

          <h2>The Challenge</h2>

          <p>
            The cold-pressed juice market is saturated with brands claiming to
            be "natural" and "healthy." Pure Pressed needed to stand out by
            communicating genuine authenticity and premium quality while
            remaining approachable to everyday consumers.
          </p>

          <blockquote>
            <p>
              "We needed to find a unique positioning that highlighted Pure
              Pressed's commitment to quality ingredients and sustainable
              practices."
            </p>
          </blockquote>

          <p>
            With numerous competitors using similar messaging around health and
            wellness, the brand needed to feel premium enough to justify higher
            price points while remaining accessible and not intimidating to
            health-conscious consumers from all backgrounds.
          </p>

          <figure className="not-prose -mx-8 my-16 sm:-mx-16">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-3XSkkuic3Pg-unsplash.jpg"
              alt="Pure Pressed ingredients"
              className="w-full rounded-lg"
            />
            <figcaption className="mt-4 px-8 text-center text-sm text-muted-foreground italic sm:px-16">
              Fresh, vibrant ingredients form the foundation of Pure Pressed's
              authentic brand promise.
            </figcaption>
          </figure>

          <h2>Strategic Approach</h2>

          <p>
            Our process began with extensive market research and consumer
            interviews to understand the wellness landscape. We developed a
            brand strategy that positioned Pure Pressed as the intersection of
            premium quality and authentic simplicity.
          </p>

          <h3>Design Methodology</h3>

          <p>
            We followed a systematic approach to ensure every brand touchpoint
            reinforced Pure Pressed's core values and market positioning:
          </p>

          <ol>
            <li>
              <strong>Brand strategy & positioning research</strong> —
              Understanding market landscape and consumer needs
            </li>
            <li>
              <strong>Visual identity exploration & concepts</strong> —
              Developing multiple creative directions
            </li>
            <li>
              <strong>Logo design & typography selection</strong> — Crafting the
              core brand elements
            </li>
            <li>
              <strong>Color palette & packaging design</strong> — Creating
              cohesive visual system
            </li>
            <li>
              <strong>Brand guidelines & rollout strategy</strong> — Ensuring
              consistent implementation
            </li>
          </ol>

          <div className="not-prose my-16 grid gap-8 sm:-mx-8">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-dxIzIveffLE-unsplash.jpg"
              alt="Pure Pressed design process"
              className="w-full rounded-lg"
            />
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-gf8m6ffBG5s-unsplash.jpg"
              alt="Pure Pressed brand development"
              className="w-full rounded-lg"
            />
          </div>

          <h2>Results & Impact</h2>

          <p>
            The new brand identity successfully positioned Pure Pressed as a
            premium yet approachable wellness brand. The clean, natural
            aesthetic resonated with target consumers, resulting in measurable
            business impact.
          </p>

          <div className="not-prose my-12 grid grid-cols-3 gap-8 rounded-lg bg-muted p-8 text-center">
            <div>
              <div className="text-3xl font-bold">40%</div>
              <div className="text-sm text-muted-foreground">
                Brand recognition increase
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm text-muted-foreground">
                New retail partnerships
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">85%</div>
              <div className="text-sm text-muted-foreground">
                Positive consumer feedback
              </div>
            </div>
          </div>

          <p>
            The packaging design became a key differentiator on shelves, with
            the minimalist approach allowing the vibrant colors of the juices to
            shine through while maintaining a premium feel.
          </p>

          <figure className="not-prose -mx-8 my-16 sm:-mx-16">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pressed-juice/devin-avery-2tuH5dIqQEc-unsplash.jpg"
              alt="Pure Pressed brand identity showcase"
              className="w-full rounded-lg"
            />
            <figcaption className="mt-4 px-8 text-center text-sm text-muted-foreground italic sm:px-16">
              The final brand identity system emphasizes clean, minimal design
              that allows the product's natural appeal to take center stage,
              creating a cohesive and memorable brand experience.
            </figcaption>
          </figure>
        </article>
      </div>
    </section>
  );
};

export { Project4c };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Project5Props {
  className?: string;
}

const Project5 = ({ className }: Project5Props) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container space-y-8">
        <motion.header
          className="pb-8 md:pb-12"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="flex flex-col gap-y-12 lg:flex-row lg:items-start lg:justify-between">
            <motion.div variants={fadeInUp} className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Organic Resonance
              </h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-xl text-lg leading-relaxed font-medium text-muted-foreground"
              >
                A contemporary exploration of nature's abstract forms through
                sculptural artistry. This piece challenges the boundaries
                between natural organic structures and human interpretation,
                creating a dialogue between the viewer and the raw beauty of
                environmental textures and forms.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="w-full max-w-md space-y-4"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-medium text-muted-foreground">
                  STUDIO
                </span>
                <span className="font-medium text-foreground">
                  NEXUS STUDIOS
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-medium text-muted-foreground">
                  MUSEUM
                </span>
                <span className="font-medium text-foreground">MOMA NYC</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-medium text-muted-foreground">YEAR</span>
                <span className="font-medium text-foreground">2024</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-medium text-muted-foreground">
                  CATEGORY
                </span>
                <span className="font-medium text-foreground">SCULPTURE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-muted-foreground">
                  EXHIBITION
                </span>
                <Button
                  variant="link"
                  className="h-auto p-0 font-medium text-foreground hover:text-primary"
                >
                  VIEW DETAILS
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.header>

        <motion.main
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="relative aspect-video overflow-hidden rounded-lg bg-muted/30"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Tree Trunk Art Piece.jpg"
              alt="Organic Resonance - Modern abstract nature sculpture featuring organic tree trunk forms"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-background/5" />
          </motion.div>
        </motion.main>

        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted/30">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Display.jpg"
                alt="Modern Terrarium Display - Contemporary presentation of the abstract nature sculpture"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-background/5" />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted/30">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Design.jpg"
                alt="Tree Trunk Resin Art - Detail view showing resin and organic material integration"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-background/5" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="py-12 md:py-16"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="flex flex-col gap-y-8 md:flex-row md:items-start md:justify-between">
            <motion.div variants={fadeInUp}>
              <h2 className="text-lg font-semibold tracking-wide text-foreground">
                ARTISTIC VISION
              </h2>
            </motion.div>
            <motion.div variants={fadeInUp} className="max-w-2xl">
              <p className="text-lg leading-relaxed font-medium text-muted-foreground">
                This sculptural piece emerges from our deep exploration of
                nature's inherent abstract qualities. Through careful
                observation and artistic interpretation, we've captured the
                essence of organic growth patterns, bark textures, and the
                interplay between light and shadow that defines natural forms.
                The work invites viewers to reconsider their relationship with
                the natural world through a contemporary lens.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { Project5 };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Project5aProps {
  className?: string;
}

const Project5a = ({ className }: Project5aProps) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container">
        <motion.header
          className="pb-12 md:pb-16"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-0.5 w-8 bg-primary"></div>
                  <span className="text-sm font-medium tracking-wider text-muted-foreground">
                    NEXUS STUDIOS PRESENTS
                  </span>
                </div>
                <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                  Organic Resonance
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  A contemporary exploration of nature's abstract forms through
                  sculptural artistry. This piece challenges the boundaries
                  between natural organic structures and human interpretation.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex h-full flex-col justify-end"
            >
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Museum</span>
                  <span className="text-sm font-medium text-foreground">
                    MOMA NYC
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Year</span>
                  <span className="text-sm font-medium text-foreground">
                    2024
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Medium</span>
                  <span className="text-sm font-medium text-foreground">
                    Sculpture
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.header>

        <motion.main
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-12 md:space-y-16"
        >
          <motion.div variants={fadeInUp}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted/30">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Tree Trunk Art Piece.jpg"
                alt="Organic Resonance - Modern abstract nature sculpture"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-background/5" />
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 gap-12 lg:grid-cols-2"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-0.5 w-6 bg-primary"></div>
                  <span className="text-sm font-medium tracking-wider text-muted-foreground">
                    ARTISTIC VISION
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                  Creative Process
                </h2>
              </div>
              <div className="space-y-4">
                <p className="leading-relaxed text-muted-foreground">
                  This sculptural piece emerges from our deep exploration of
                  nature's inherent abstract qualities. Through careful
                  observation and artistic interpretation, we've captured the
                  essence of organic growth patterns, bark textures, and the
                  interplay between light and shadow.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  The work invites viewers to reconsider their relationship with
                  the natural world through a contemporary lens, creating a
                  dialogue between the viewer and the raw beauty of
                  environmental textures and forms.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/30">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Design.jpg"
                  alt="Modern Terrarium Display - Contemporary presentation"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-background/5" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/30">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Display.jpg"
                  alt="Modern Terrarium Display - Contemporary presentation"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-background/5" />
              </div>
            </div>
          </motion.div>
        </motion.main>
      </div>
    </section>
  );
};

export { Project5a };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Project5bProps {
  className?: string;
}

const Project5b = ({ className }: Project5bProps) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container">
        <motion.header
          className="pb-16 md:pb-20"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-foreground"></div>
                <span className="text-sm font-medium tracking-wider text-muted-foreground">
                  NEXUS STUDIOS
                </span>
              </div>
              <h1 className="text-6xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
                Organic
                <br />
                Resonance
              </h1>
            </motion.div>
            <div className="flex justify-start pt-16">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Exhibition Details
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    MOMA NYC • 2024
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Contemporary Sculpture
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.main
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-8 md:space-y-20"
        >
          <motion.div variants={fadeInUp} className="relative">
            <div className="relative aspect-[21/9] overflow-hidden rounded-lg bg-muted/30">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Tree Trunk Art Piece.jpg"
                alt="Organic Resonance - Main sculpture view"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-background/5" />
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16"
          >
            <div className="space-y-6">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/30">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Design.jpg"
                  alt="Detail view of the sculpture"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-background/5" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/30">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Display.jpg"
                  alt="Detail view of the sculpture"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-background/5" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 gap-8 md:gap-16 lg:grid-cols-2"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-px w-16 bg-foreground"></div>
                  <span className="text-sm font-medium tracking-wider text-muted-foreground">
                    CONCEPT
                  </span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                  Artistic Vision
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  This sculptural piece emerges from our deep exploration of
                  nature's inherent abstract qualities. Through careful
                  observation and artistic interpretation, we've captured the
                  essence of organic growth patterns.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  The work invites viewers to reconsider their relationship with
                  the natural world through a contemporary lens, exploring bark
                  textures and the interplay between light and shadow.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    Materials & Process
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-2 h-1 w-1 rounded-full bg-foreground"></div>
                      <p className="text-sm text-muted-foreground">
                        Reclaimed wood and organic resins
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-2 h-1 w-1 rounded-full bg-foreground"></div>
                      <p className="text-sm text-muted-foreground">
                        Hand-carved details with natural patina
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-2 h-1 w-1 rounded-full bg-foreground"></div>
                      <p className="text-sm text-muted-foreground">
                        Sustainable terrarium ecosystem
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    Dimensions
                  </h3>
                  <div className="overflow-hidden">
                    <table className="w-full border-t border-b border-muted-foreground/20">
                      <tbody>
                        <tr className="border-b border-muted-foreground/10">
                          <td className="bg-muted/5 px-4 py-3 text-sm font-medium text-muted-foreground">
                            Height
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground">
                            180 cm
                          </td>
                        </tr>
                        <tr className="border-b border-muted-foreground/10">
                          <td className="bg-muted/5 px-4 py-3 text-sm font-medium text-muted-foreground">
                            Width
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground">
                            95 cm
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-muted/5 px-4 py-3 text-sm font-medium text-muted-foreground">
                            Depth
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground">
                            45 cm
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.main>
      </div>
    </section>
  );
};

export { Project5b };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Project5cProps {
  className?: string;
}

const Project5c = ({ className }: Project5cProps) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container">
        <motion.header
          className="pb-12 md:pb-16"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
                Organic Resonance
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                A contemporary exploration of nature's abstract forms through
                sculptural artistry. This piece challenges the boundaries
                between natural organic structures and human interpretation,
                creating a dialogue between the viewer and the raw beauty of
                environmental textures and forms.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 bg-muted/50 p-6">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    ARTIST
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    NEXUS STUDIOS
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    YEAR
                  </p>
                  <p className="text-sm font-semibold text-foreground">2024</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    VENUE
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    MOMA NYC
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    MEDIUM
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    SCULPTURE
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.header>

        <motion.main
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-12"
        >
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 gap-6 md:grid-cols-4"
          >
            <div className="md:col-span-3">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted/30">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Tree Trunk Art Piece.jpg"
                  alt="Organic Resonance - Main sculpture view"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-background/5" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative h-full overflow-hidden rounded-lg bg-muted/30">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Futuristic Tree Artwork.jpg"
                  alt="Minimalist art blocks"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-background/5" />
              </div>
            </div>
          </motion.div>
        </motion.main>

        <motion.section
          className="py-12 md:py-16"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="flex flex-col gap-y-8 md:flex-row md:items-start md:justify-between">
            <motion.div variants={fadeInUp}>
              <h2 className="text-lg font-semibold tracking-wide text-foreground">
                ARTISTIC VISION
              </h2>
            </motion.div>
            <motion.div variants={fadeInUp} className="max-w-2xl">
              <p className="text-lg leading-relaxed font-medium text-muted-foreground">
                This sculptural piece emerges from our deep exploration of
                nature's inherent abstract qualities. Through careful
                observation and artistic interpretation, we've captured the
                essence of organic growth patterns, bark textures, and the
                interplay between light and shadow that defines natural forms.
                The work invites viewers to reconsider their relationship with
                the natural world through a contemporary lens.
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export { Project5c };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Project5dProps {
  className?: string;
}

const Project5d = ({ className }: Project5dProps) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container max-w-4xl">
        <motion.header
          className="pb-16 md:pb-20"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-8 bg-foreground"></div>
              <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                NEXUS STUDIOS
              </span>
            </div>
            <h1 className="text-4xl font-normal tracking-tight text-foreground md:text-5xl">
              Organic Resonance
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              A contemporary exploration of nature's abstract forms through
              sculptural artistry. This piece challenges the boundaries between
              natural organic structures and human interpretation.
            </p>
          </motion.div>
        </motion.header>

        <motion.main
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-12"
        >
          <motion.div
            variants={fadeInUp}
            className="relative aspect-[4/3] overflow-hidden bg-muted/30"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Tree Trunk Art Piece.jpg"
              alt="Organic Resonance - Main sculpture view"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-background/5" />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Museum
              </p>
              <p className="text-sm text-foreground">MOMA NYC</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Year
              </p>
              <p className="text-sm text-foreground">2024</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Medium
              </p>
              <p className="text-sm text-foreground">Sculpture</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Status
              </p>
              <p className="text-sm text-foreground">On Display</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative aspect-[3/2] overflow-hidden bg-muted/30"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Display.jpg"
              alt="Modern Terrarium Display"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-background/5" />
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-xl font-medium text-foreground">
              Artistic Vision
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              This sculptural piece emerges from our deep exploration of
              nature's inherent abstract qualities. Through careful observation
              and artistic interpretation, we've captured the essence of organic
              growth patterns, bark textures, and the interplay between light
              and shadow that defines natural forms.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative aspect-[16/9] overflow-hidden bg-muted/30"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Design.jpg"
              alt="Modern Terrarium Design"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-background/5" />
          </motion.div>

          <motion.div variants={fadeInUp} className="pt-8">
            <Button
              variant="default"
              className="w-full bg-foreground py-6 font-medium text-background hover:bg-foreground/90"
            >
              VIEW FULL EXHIBITION
            </Button>
          </motion.div>
        </motion.main>
      </div>
    </section>
  );
};

export { Project5d };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Project5eProps {
  className?: string;
}

const Project5e = ({ className }: Project5eProps) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Tree Trunk Art Piece.jpg",
      alt: "Abstract Organic Form",
      title: "Abstract Organic Form",
      description: "Natural patterns in contemporary art",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Abstract Fluid Composition.jpg",
      alt: "Abstract Textured Art",
      title: "Abstract Textured Art",
      description: "Textural exploration of natural forms",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Futuristic Tree Artwork.jpg",
      alt: "Futuristic Tree Artwork",
      title: "Futuristic Tree Artwork",
      description: "Modern interpretation of organic growth",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Minimalist Art Blocks.jpg",
      alt: "Minimalist Art Blocks",
      title: "Minimalist Art Blocks",
      description: "Geometric abstraction meets nature",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Design.jpg",
      alt: "Modern Terrarium Design",
      title: "Modern Terrarium Design",
      description: "Contemporary ecosystem design",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Display.jpg",
      alt: "Modern Terrarium Display",
      title: "Modern Terrarium Display",
      description: "Installation and exhibition space",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Moss-Covered Log with Yellow Lichen.jpg",
      alt: "Moss-Covered Log with Yellow Lichen",
      title: "Moss-Covered Log with Yellow Lichen",
      description: "Natural textures and organic patterns",
    },
  ];

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container">
        <motion.header
          className="pb-16 md:pb-24"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="space-y-8 text-center">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-24 bg-foreground"></div>
                <span className="text-sm font-medium tracking-wider text-muted-foreground">
                  NEXUS STUDIOS
                </span>
                <div className="h-px w-24 bg-foreground"></div>
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Organic Resonance
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                A comprehensive exploration of nature's abstract forms through
                contemporary sculptural artistry. This collection challenges the
                boundaries between natural organic structures and human
                interpretation.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="outline" size="lg">
                VISIT EXHIBITION
              </Button>
              <div className="text-sm text-muted-foreground">
                MOMA NYC • 2024 • Contemporary Sculpture
              </div>
            </div>
          </motion.div>
        </motion.header>

        <motion.main
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-16"
        >
          {/* Main Grid */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`group relative overflow-hidden rounded-lg bg-muted/20 ${
                  index === 0 ? "md:col-span-2 lg:col-span-1" : ""
                } ${index === 3 ? "lg:col-span-2" : ""} ${
                  index === 6 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/0 transition-all duration-300 group-hover:bg-background/10" />
                </div>

                <div className="absolute right-0 bottom-0 left-0 translate-y-full bg-gradient-to-t from-background/90 to-transparent p-6 transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {image.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {image.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Description Section */}
          <motion.div
            variants={fadeInUp}
            className="mx-auto max-w-4xl space-y-8 text-center"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Artistic Vision
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                This collection emerges from our deep exploration of nature's
                inherent abstract qualities. Through careful observation and
                artistic interpretation, we've captured the essence of organic
                growth patterns, bark textures, and the interplay between light
                and shadow that defines natural forms.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Each piece invites viewers to reconsider their relationship with
                the natural world through a contemporary lens, creating a
                dialogue between the viewer and the raw beauty of environmental
                textures and forms. The work spans from minimalist
                interpretations to complex organic abstractions.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">7</div>
                <div className="text-sm text-muted-foreground">ARTWORKS</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">2024</div>
                <div className="text-sm text-muted-foreground">
                  EXHIBITION YEAR
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">MOMA</div>
                <div className="text-sm text-muted-foreground">
                  NEW YORK CITY
                </div>
              </div>
            </div>
          </motion.div>
        </motion.main>
      </div>
    </section>
  );
};

export { Project5e };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Project5fProps {
  className?: string;
}

const Project5f = ({ className }: Project5fProps) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container">
        <motion.header
          className="pb-12 md:pb-16"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="rounded-xl bg-muted/20 p-8 md:p-12"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 rounded-full bg-muted/50 px-4 py-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-foreground"></div>
                  <span className="text-sm font-medium text-muted-foreground">
                    NEXUS STUDIOS
                  </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  Organic Resonance
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  A contemporary exploration of nature's abstract forms through
                  sculptural artistry. This piece challenges the boundaries
                  between natural organic structures and human interpretation.
                </p>
              </div>
              <div className="rounded-lg bg-background/50 p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground uppercase">
                      Museum
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      MOMA NYC
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground uppercase">
                      Year
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      2024
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground uppercase">
                      Medium
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      Sculpture
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-muted-foreground uppercase">
                      Status
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      Active
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.header>

        <motion.main
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div
            variants={fadeInUp}
            className="relative aspect-[21/9] overflow-hidden rounded-xl bg-muted/30"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Tree Trunk Art Piece.jpg"
              alt="Organic Resonance - Main sculpture view"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-background/5" />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted/30"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Display.jpg"
              alt="Modern Terrarium Design"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-background/5" />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted/30"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Design.jpg"
              alt="Modern Terrarium Design"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-background/5" />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="rounded-xl bg-muted/20 p-8 md:p-12"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">
                  Visit the Exhibition
                </h3>
                <p className="text-muted-foreground">
                  Experience Organic Resonance at MOMA NYC
                </p>
              </div>
              <Button
                variant="default"
                className="bg-foreground px-8 py-4 font-medium text-background hover:bg-foreground/90"
              >
                BOOK TICKETS
              </Button>
            </div>
          </motion.div>
        </motion.main>
      </div>
    </section>
  );
};

export { Project5f };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Project5gProps {
  className?: string;
}

const Project5g = ({ className }: Project5gProps) => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container">
        <motion.header
          className="pb-16 md:pb-24"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                    NEXUS STUDIOS / 2024
                  </span>
                  <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                    Organic
                    <span className="text-muted-foreground">
                      <br />
                      Resonance
                    </span>
                  </h1>
                </div>
                <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
                  A contemporary exploration of nature's abstract forms through
                  sculptural artistry. This piece challenges the boundaries
                  between natural organic structures and human interpretation.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted/30">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Display.jpg"
                  alt="Modern Terrarium Display"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-background/5" />
              </div>
            </motion.div>
          </div>
        </motion.header>

        <motion.main
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-16"
        >
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted/30">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Tree Trunk Art Piece.jpg"
                  alt="Organic Resonance - Main sculpture view"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-background/5" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Exhibition
                </h2>
                <div className="space-y-4">
                  <div className="border-l-2 border-border pl-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      MUSEUM
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      MOMA NYC
                    </p>
                  </div>
                  <div className="border-l-2 border-border pl-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      MEDIUM
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      SCULPTURE
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/30">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/modern-terrarium/Modern Terrarium Design.jpg"
                  alt="Modern Terrarium Design"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-background/5" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 gap-16 lg:grid-cols-2"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                Artistic Vision
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                This sculptural piece emerges from our deep exploration of
                nature's inherent abstract qualities. Through careful
                observation and artistic interpretation, we've captured the
                essence of organic growth patterns, bark textures, and the
                interplay between light and shadow that defines natural forms.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                The work invites viewers to reconsider their relationship with
                the natural world through a contemporary lens, creating a
                dialogue between the viewer and the raw beauty of environmental
                textures and forms.
              </p>
            </div>

            <div className="flex items-end justify-end">
              <div className="space-y-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Available for viewing
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    Daily 10AM - 6PM
                  </p>
                </div>
                <Button
                  variant="default"
                  className="bg-foreground px-8 py-4 font-medium text-background hover:bg-foreground/90"
                >
                  PLAN YOUR VISIT
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.main>
      </div>
    </section>
  );
};

export { Project5g };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";

interface Project6Props {
  title?: string;
  subtitle?: string;
  category?: string;
  year?: string;
  description?: string;
  images?: Array<{ src?: string; alt: string }>;
  src: string;
  alt: string;
  index: number;
}

const ImageBlock = ({
  src,
  alt,
  index,
}: {
  src?: string;
  alt: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-100px" }}
    className="group relative mb-8 last:mb-0"
  >
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
      {src ? (
        <motion.img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <span className="text-sm">Image placeholder</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 via-transparent to-transparent" />
      <motion.div
        className="absolute inset-0 bg-muted/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </motion.div>
);

const StickySection = ({
  title,
  subtitle,
  category,
  year,
  description,
}: {
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
}) => (
  <div className="top-20 flex flex-col self-start lg:sticky lg:min-h-screen lg:justify-between">
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-3">
        <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground">{subtitle}</p>
        <div className="flex items-center gap-4">
          <Badge
            variant="secondary"
            className="rounded-3xl bg-muted px-4 py-1 text-xs font-medium text-foreground"
          >
            {category}
          </Badge>
          <span className="rounded-3xl border border-border px-3 text-sm text-muted-foreground">
            {year}
          </span>
        </div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-5 space-y-3 md:sticky md:bottom-9"
    >
      <h3 className="text-sm font-medium tracking-wider text-foreground uppercase">
        ABOUT
      </h3>
      <p className="max-w-sm text-sm leading-relaxed tracking-wide text-muted-foreground uppercase">
        {description}
      </p>
    </motion.div>
  </div>
);

const ProjectCard = ({ title, category, src, alt, index }: Project6Props) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group relative cursor-pointer"
  >
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-muted/40 transition-all duration-300 group-hover:bg-muted/20" />
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <Badge
          variant="secondary"
          className="self-start border border-muted bg-background text-xs font-medium text-foreground"
        >
          {category}
        </Badge>
        <h3 className="text-2xl font-semibold text-foreground opacity-70">
          {title}
        </h3>
      </div>
    </div>
  </motion.div>
);

export const Project6 = ({
  title = "Urban Lens",
  subtitle = "Street Photography Collection",
  category = "PHOTOGRAPHY",
  year = "2025",
  description = "A CAPTIVATING SERIES OF STREET PHOTOGRAPHY THAT CAPTURES THE ESSENCE OF URBAN LIFE THROUGH THE LENS OF CONTEMPORARY PHOTOGRAPHERS WORKING IN MONOCHROME.",
  images = [
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg", alt: "Street Scene 1" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg", alt: "Street Scene 2" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg", alt: "Street Scene 3" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw4.jpeg", alt: "Street Scene 4" },
  ],
}: Partial<ReturnType<typeof StickySection>["props"]> & {
  images?: Array<{ src?: string; alt: string }>;
}) => {
  const projectCards = [
    {
      title: "Portrait",
      category: "STREET",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg",
      alt: "Street Portrait",
    },
    {
      title: "Architecture",
      category: "URBAN",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw8.jpeg",
      alt: "Urban Architecture",
    },
    {
      title: "Documentary",
      category: "LIFESTYLE",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw9.jpeg",
      alt: "Lifestyle Documentary",
    },
  ];

  return (
    <section className="py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <StickySection
            title={title!}
            subtitle={subtitle!}
            category={category!}
            year={year!}
            description={description!}
          />
          <div className="space-y-10">
            {images?.map((img, index) => (
              <ImageBlock
                key={index}
                src={img.src}
                alt={img.alt}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="mt-32">
          <h3 className="mb-6 text-sm font-bold font-medium tracking-wider text-foreground uppercase">
            MORE COLLECTIONS
          </h3>
          <div className="grid gap-6 pb-16 md:grid-cols-3">
            {projectCards.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

```

```tsx
"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";

interface Project6aProps {
  title?: string;
  subtitle?: string;
  category?: string;
  year?: string;
  description?: string;
  images?: Array<{ src?: string; alt: string }>;
  src: string;
  alt: string;
  index: number;
}

const ImageBlock = ({
  src,
  alt,
  index,
}: {
  src?: string;
  alt: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-100px" }}
    className="group relative mb-8 last:mb-0"
  >
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
      {src ? (
        <motion.img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <span className="text-sm">Image placeholder</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 via-transparent to-transparent" />
      <motion.div
        className="absolute inset-0 bg-muted/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </motion.div>
);

const ProjectRow = ({ title, category, src, alt, index }: Project6aProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group flex cursor-pointer items-center gap-4 rounded-lg p-3 transition-all duration-300 hover:bg-muted/20"
  >
    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-muted/40 transition-all duration-300 group-hover:bg-muted/20" />
    </div>
    <div className="flex-1 space-y-1">
      <h4 className="text-lg leading-tight font-semibold text-foreground">
        {title}
      </h4>
      <Badge
        variant="secondary"
        className="h-6 bg-muted text-xs font-medium text-foreground"
      >
        {category}
      </Badge>
    </div>
  </motion.div>
);

export const Project6a = ({
  title = "Urban Lens",
  subtitle = "Street Photography Collection",
  category = "PHOTOGRAPHY",
  year = "2025",
  description = "A CAPTIVATING SERIES OF STREET PHOTOGRAPHY THAT CAPTURES THE ESSENCE OF URBAN LIFE THROUGH THE LENS OF CONTEMPORARY PHOTOGRAPHERS WORKING IN MONOCHROME.",
  images = [
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg", alt: "Street Scene 1" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg", alt: "Street Scene 2" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg", alt: "Street Scene 3" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw4.jpeg", alt: "Street Scene 4" },
  ],
}: Partial<Project6aProps> & {
  images?: Array<{ src?: string; alt: string }>;
}) => {
  const projectRows = [
    {
      title: "Portrait",
      category: "STREET",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg",
      alt: "Street Portrait",
    },
    {
      title: "Architecture",
      category: "URBAN",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw8.jpeg",
      alt: "Urban Architecture",
    },
    {
      title: "Documentary",
      category: "LIFESTYLE",
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw9.jpeg",
      alt: "Lifestyle Documentary",
    },
  ];

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 space-y-6"
          >
            <div className="space-y-3">
              <h1 className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground">{subtitle}</p>
              <div className="flex items-center gap-4">
                <Badge
                  variant="secondary"
                  className="rounded-3xl bg-muted px-4 py-1 text-xs font-medium text-foreground"
                >
                  {category}
                </Badge>
                <span className="rounded-3xl border border-border px-3 text-sm text-muted-foreground">
                  {year}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Images */}
          <div className="mb-16 space-y-10">
            {images?.map((img, index) => (
              <ImageBlock
                key={index}
                src={img.src}
                alt={img.alt}
                index={index}
              />
            ))}
          </div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 space-y-6"
          >
            <h3 className="text-sm font-medium tracking-wider text-foreground uppercase">
              ABOUT
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed tracking-wide text-muted-foreground uppercase">
              {description}
            </p>
          </motion.div>

          {/* More Collections */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-sm font-bold tracking-wider text-foreground uppercase">
              MORE COLLECTIONS
            </h3>
            <div className="space-y-2">
              {projectRows.map((project, index) => (
                <ProjectRow key={project.title} {...project} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

```

```tsx
"use client";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = {
  hero: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg",
  carousel: [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw17.jpeg",

    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw7.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw8.jpeg",
  ],
  dayOne: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg",
  dayTwo: [
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg",
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw4.jpeg",
  ],
};

interface Project7Props {
  className?: string;
}

const Project7 = ({ className }: Project7Props) => {
  return (
    <section className={cn("", className)}>
      <section className="relative flex h-[700px] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${images.hero})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
          <p className="mb-6 text-sm tracking-[0.2em] text-white/80 uppercase">
            Modern Architecture Studio
          </p>
          <h1 className="mb-6 text-4xl leading-tight font-semibold md:text-6xl lg:text-7xl">
            The Meridian
            <br />
            Tower Project
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/80 md:text-xl">
            A groundbreaking 47-story residential tower that redefines urban
            living through innovative design, sustainable materials, and
            thoughtful integration with the city's architectural heritage.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="mb-12">
          <h2 className="mb-8 text-2xl font-light text-foreground md:text-3xl">
            Design Philosophy & Vision
          </h2>
          <div className="prose max-w-none text-muted-foreground prose-gray">
            <p>
              The Meridian Tower represents a new chapter in contemporary
              residential design. Our approach centered on creating a vertical
              neighborhood that fosters community while providing residents with
              unparalleled privacy and luxury.
            </p>
            <p>
              Every detail, from the building's distinctive angular facade to
              its integrated green spaces, was meticulously planned to enhance
              both the resident experience and the surrounding urban fabric. The
              tower serves as a landmark that respects its context while boldly
              looking toward the future.
            </p>
            <p>
              Through careful material selection and innovative structural
              solutions, we've created not just a building, but a living,
              breathing extension of the city itself.
            </p>
          </div>
        </div>

        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {images.carousel.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-[5/3] overflow-hidden">
                    <img
                      src={image}
                      alt={`Project process ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="mb-12">
          <h2 className="mb-8 text-2xl font-light text-foreground md:text-3xl">
            Architectural Innovation
          </h2>
          <div className="prose max-w-none text-muted-foreground prose-gray">
            <p>
              The tower's most striking feature is its crystalline facade
              system—a double-skin envelope that maximizes natural light while
              providing superior energy performance. Each unit benefits from
              floor-to-ceiling windows that frame panoramic city views.
            </p>
            <p>
              Our structural innovation includes a hybrid concrete-steel system
              that reduces material usage by 30% while enabling the tower's
              distinctive cantilevers and terraced setbacks. These architectural
              gestures create outdoor spaces at multiple levels, bringing the
              ground plane experience to the sky.
            </p>
            <p>
              Sustainability is woven into every aspect of the design, from
              rainwater harvesting systems to integrated photovoltaic panels
              that generate clean energy for common areas.
            </p>
          </div>
        </div>

        <div className="aspect-[16/9] overflow-hidden md:aspect-[21/9]">
          <img
            src={images.dayOne}
            alt="Meridian Tower main facade"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="mb-12">
          <h2 className="mb-8 text-2xl font-light text-foreground md:text-3xl">
            Construction & Materiality
          </h2>
          <div className="prose max-w-none text-muted-foreground prose-gray">
            <p>
              The construction process showcased advanced prefabrication
              techniques, with facade elements manufactured off-site to exacting
              specifications. This approach reduced construction time by 40% and
              minimized disruption to the surrounding neighborhood.
            </p>
            <p>
              Material selection focused on durability and timeless
              aesthetics—charcoal-toned concrete, bronze-finished aluminum, and
              high-performance glass create a palette that shifts throughout the
              day, revealing different moods and textures as light conditions
              change.
            </p>
            <p>
              Interior common spaces feature locally sourced stone and reclaimed
              wood, connecting residents to the region's natural heritage while
              maintaining a sophisticated, contemporary atmosphere.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {images.dayTwo.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden">
              <img
                src={image}
                alt={`Construction detail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <h2 className="mb-8 text-2xl font-light text-foreground md:text-3xl">
          Project Impact & Recognition
        </h2>
        <div className="prose max-w-none text-muted-foreground prose-gray">
          <p>
            The Meridian Tower has been recognized with multiple design awards,
            including the International Architecture Prize and the Sustainable
            Design Excellence Award. The project demonstrates how thoughtful
            architecture can enhance urban density while creating meaningful
            spaces for human connection.
          </p>
          <p>
            Beyond its architectural merits, the tower has become a catalyst for
            neighborhood revitalization, inspiring additional investment in
            public spaces and cultural amenities that benefit the entire
            community.
          </p>
          <p>
            This project represents the future of residential high-rise
            design—where innovation, sustainability, and human-centered thinking
            converge to create environments that truly enhance the urban
            experience.
          </p>
        </div>
      </section>
    </section>
  );
};

export { Project7 };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Project8Props {
  className?: string;
}

const Project8 = ({ className }: Project8Props) => {
  return (
    <section className={cn("py-32", className)}>
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-16 text-center">
          <motion.h1
            className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            TYRELL FASHION
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Capturing a neo-noir future aesthetic.
          </motion.p>
        </div>

        <motion.div
          className="relative mb-16 w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/glitch-portrait-pir7z.jpg"
              alt="Creative portrait with dynamic lighting"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          className="grid w-full grid-cols-1 md:grid-cols-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Creative</h3>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between">
              <p className="text-2xl text-muted-foreground">2025</p>
              <h4 className="text-sm font-semibold text-foreground">
                SF Bay Area
              </h4>
            </div>

            {/* Content */}

            <p className="text-base leading-relaxed text-foreground">
              Exploring the intersection of technology and couture, this neo
              future collection pushes the boundaries of traditional fashion
              photography. Holographic textures, metallic fabrics, and geometric
              patterns create a cyberpunk aesthetic that reflects our digital
              age. The shoot incorporates LED lighting and reflective surfaces
              to enhance the futuristic narrative, transforming each garment
              into a statement of tomorrow's elegance.
            </p>

            <p className="text-base leading-relaxed text-foreground">
              Set against minimalist backdrops with strategic neon accents, the
              photography captures the essence of neo future fashion - where
              sustainability meets innovation, and where each piece tells a
              story of technological advancement wrapped in artistic expression.
              The result is a visual manifesto that challenges conventional
              beauty standards while celebrating the evolution of style.
            </p>

            <div className="space-y-1 text-base text-muted-foreground">
              <h5 className="font-medium text-foreground">Credits</h5>
              <p>Creative Director: Maya Chen</p>
              <p>Fashion Stylist: Alex Rivera</p>
              <p>Makeup Artist: Jordan Kim</p>
              <p>Hair Stylist: Taylor Brooks</p>
              <p>Set Designer: Sam Patel</p>
              <p>Retoucher: Casey Wong</p>
              <p>Lighting Assistant: Riley Martinez</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export { Project8 };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Project8aProps {
  className?: string;
}

const Project8a = ({ className }: Project8aProps) => {
  return (
    <section className={cn("py-32", className)}>
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-16 text-center">
          <motion.h1
            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            TYRELL FASHION
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Capturing a neo-noir future aesthetic.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="relative mb-16 w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/glitch-portrait-pir7z.jpg"
            alt="Creative portrait with dynamic lighting"
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      <motion.div
        className="container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="grid w-full grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Creative</h3>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between">
              <p className="text-2xl text-muted-foreground">2024</p>
              <h4 className="text-sm font-semibold text-foreground">
                SF Bay Area
              </h4>
            </div>

            {/* Content */}

            <p className="text-base leading-relaxed text-foreground">
              Exploring the intersection of technology and couture, this neo
              future collection pushes the boundaries of traditional fashion
              photography. Holographic textures, metallic fabrics, and geometric
              patterns create a cyberpunk aesthetic that reflects our digital
              age. The shoot incorporates LED lighting and reflective surfaces
              to enhance the futuristic narrative, transforming each garment
              into a statement of tomorrow's elegance.
            </p>

            <p className="text-base leading-relaxed text-foreground">
              Set against minimalist backdrops with strategic neon accents, the
              photography captures the essence of neo future fashion - where
              sustainability meets innovation, and where each piece tells a
              story of technological advancement wrapped in artistic expression.
              The result is a visual manifesto that challenges conventional
              beauty standards while celebrating the evolution of style.
            </p>

            <div className="space-y-1 text-base text-muted-foreground">
              <h5 className="font-medium text-foreground">Credits</h5>
              <p>Creative Director: Maya Chen</p>
              <p>Fashion Stylist: Alex Rivera</p>
              <p>Makeup Artist: Jordan Kim</p>
              <p>Hair Stylist: Taylor Brooks</p>
              <p>Set Designer: Sam Patel</p>
              <p>Retoucher: Casey Wong</p>
              <p>Lighting Assistant: Riley Martinez</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export { Project8a };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Project8bProps {
  className?: string;
}

const Project8b = ({ className }: Project8bProps) => {
  return (
    <section className={cn("py-32", className)}>
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-16 text-center">
          <motion.h1
            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            TYRELL FASHION
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Capturing a neo-noir future aesthetic.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/glitch-portrait-pir7z.jpg"
                alt="Creative portrait with dynamic lighting"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Creative
              </h3>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between">
                <p className="text-2xl text-muted-foreground">2024</p>
                <h4 className="text-sm font-semibold text-foreground">
                  SF Bay Area
                </h4>
              </div>

              <p className="text-base leading-relaxed text-foreground">
                Exploring the intersection of technology and couture, this neo
                future collection pushes the boundaries of traditional fashion
                photography. Holographic textures, metallic fabrics, and
                geometric patterns create a cyberpunk aesthetic that reflects
                our digital age. The shoot incorporates LED lighting and
                reflective surfaces to enhance the futuristic narrative,
                transforming each garment into a statement of tomorrow's
                elegance.
              </p>

              <p className="text-base leading-relaxed text-foreground">
                Set against minimalist backdrops with strategic neon accents,
                the photography captures the essence of neo future fashion -
                where sustainability meets innovation, and where each piece
                tells a story of technological advancement wrapped in artistic
                expression. The result is a visual manifesto that challenges
                conventional beauty standards while celebrating the evolution of
                style.
              </p>

              <div className="space-y-1 text-base text-muted-foreground">
                <h5 className="font-medium text-foreground">Credits</h5>
                <p>Creative Director: Maya Chen</p>
                <p>Fashion Stylist: Alex Rivera</p>
                <p>Makeup Artist: Jordan Kim</p>
                <p>Hair Stylist: Taylor Brooks</p>
                <p>Set Designer: Sam Patel</p>
                <p>Retoucher: Casey Wong</p>
                <p>Lighting Assistant: Riley Martinez</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export { Project8b };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Project8cProps {
  className?: string;
}

const Project8c = ({ className }: Project8cProps) => {
  return (
    <section className={cn("py-32", className)}>
      <motion.div
        className="container max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-16 text-center">
          <motion.h1
            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            TYRELL FASHION
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Capturing a neo-noir future aesthetic.
          </motion.p>
        </div>

        <motion.div
          className="relative mx-auto mb-12 max-w-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/glitch-portrait-pir7z.jpg"
              alt="Creative portrait with dynamic lighting"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Creative
              </h3>
            </div>
            <div className="text-right">
              <p className="text-2xl text-muted-foreground">2024</p>
              <h4 className="text-sm font-semibold text-foreground">
                SF Bay Area
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-foreground">
                Exploring the intersection of technology and couture, this neo
                future collection pushes the boundaries of traditional fashion
                photography. Holographic textures, metallic fabrics, and
                geometric patterns create a cyberpunk aesthetic that reflects
                our digital age.
              </p>

              <p className="text-base leading-relaxed text-foreground">
                Set against minimalist backdrops with strategic neon accents,
                the photography captures the essence of neo future fashion -
                where sustainability meets innovation, and where each piece
                tells a story of technological advancement wrapped in artistic
                expression.
              </p>
            </div>

            <div className="space-y-1 text-base text-muted-foreground">
              <h5 className="mb-3 font-medium text-foreground">Credits</h5>
              <p>Creative Director: Maya Chen</p>
              <p>Fashion Stylist: Alex Rivera</p>
              <p>Makeup Artist: Jordan Kim</p>
              <p>Hair Stylist: Taylor Brooks</p>
              <p>Set Designer: Sam Patel</p>
              <p>Retoucher: Casey Wong</p>
              <p>Lighting Assistant: Riley Martinez</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export { Project8c };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Project8dProps {
  className?: string;
}

const Project8d = ({ className }: Project8dProps) => {
  return (
    <section className={cn("py-32", className)}>
      <motion.div
        className="container max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-20 text-center">
          <motion.h1
            className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            TYRELL FASHION
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Capturing a neo-noir future aesthetic.
          </motion.p>
        </div>

        <motion.div
          className="relative mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/glitch-portrait-pir7z.jpg"
              alt="Creative portrait with dynamic lighting"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Creative
              </h3>
              <p className="text-2xl text-muted-foreground">2024</p>
              <h4 className="mt-1 text-sm font-semibold text-foreground">
                SF Bay Area
              </h4>
            </div>

            <div className="space-y-6 md:col-span-3">
              <p className="text-lg leading-relaxed text-foreground">
                Exploring the intersection of technology and couture, this neo
                future collection pushes the boundaries of traditional fashion
                photography. Holographic textures, metallic fabrics, and
                geometric patterns create a cyberpunk aesthetic that reflects
                our digital age. The shoot incorporates LED lighting and
                reflective surfaces to enhance the futuristic narrative,
                transforming each garment into a statement of tomorrow's
                elegance.
              </p>

              <p className="text-lg leading-relaxed text-foreground">
                Set against minimalist backdrops with strategic neon accents,
                the photography captures the essence of neo future fashion -
                where sustainability meets innovation, and where each piece
                tells a story of technological advancement wrapped in artistic
                expression. The result is a visual manifesto that challenges
                conventional beauty standards while celebrating the evolution of
                style.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <div className="space-y-2 text-base text-muted-foreground">
              <h5 className="mb-4 font-medium text-foreground">Credits</h5>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                <p>Creative Director: Maya Chen</p>
                <p>Fashion Stylist: Alex Rivera</p>
                <p>Makeup Artist: Jordan Kim</p>
                <p>Hair Stylist: Taylor Brooks</p>
                <p>Set Designer: Sam Patel</p>
                <p>Retoucher: Casey Wong</p>
                <p>Lighting Assistant: Riley Martinez</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export { Project8d };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface Project8eProps {
  className?: string;
}

const Project8e = ({ className }: Project8eProps) => {
  return (
    <section className={cn("py-32", className)}>
      {/* Hero section with background image */}
      <div className="relative min-h-screen">
        {/* Fullwidth Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/glitch-portrait-pir7z.jpg')",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex min-h-screen items-center justify-center py-32">
          <motion.div
            className="container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <motion.h1
                className="mb-4 text-3xl font-bold tracking-tight text-white md:text-8xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                TYRELL FASHION
              </motion.h1>
              <motion.p
                className="text-xl text-white/80 md:text-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Capturing a neo-noir future aesthetic.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content section on white background */}
      <div className="bg-white py-32">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="grid w-full grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Creative
              </h3>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between">
                <p className="text-2xl text-muted-foreground">2024</p>
                <h4 className="text-sm font-semibold text-foreground">
                  SF Bay Area
                </h4>
              </div>

              {/* Content */}

              <p className="text-base leading-relaxed text-foreground">
                Exploring the intersection of technology and couture, this neo
                future collection pushes the boundaries of traditional fashion
                photography. Holographic textures, metallic fabrics, and
                geometric patterns create a cyberpunk aesthetic that reflects
                our digital age. The shoot incorporates LED lighting and
                reflective surfaces to enhance the futuristic narrative,
                transforming each garment into a statement of tomorrow's
                elegance.
              </p>

              <p className="text-base leading-relaxed text-foreground">
                Set against minimalist backdrops with strategic neon accents,
                the photography captures the essence of neo future fashion -
                where sustainability meets innovation, and where each piece
                tells a story of technological advancement wrapped in artistic
                expression. The result is a visual manifesto that challenges
                conventional beauty standards while celebrating the evolution of
                style.
              </p>

              <div className="space-y-1 text-base text-muted-foreground">
                <h5 className="font-medium text-foreground">Credits</h5>
                <p>Creative Director: Maya Chen</p>
                <p>Fashion Stylist: Alex Rivera</p>
                <p>Makeup Artist: Jordan Kim</p>
                <p>Hair Stylist: Taylor Brooks</p>
                <p>Set Designer: Sam Patel</p>
                <p>Retoucher: Casey Wong</p>
                <p>Lighting Assistant: Riley Martinez</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { Project8e };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

interface Project9Props {
  className?: string;
}

const Project9 = ({ className }: Project9Props) => {
  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg",
      alt: "Motion blur street photography",
    },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg", alt: "Natural landscape portrait" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw4.jpeg", alt: "Misty mountain valley" },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw5.jpeg",
      alt: "Contemplative lakeside moment",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw6.jpeg",
      alt: "Motion blur street photography",
    },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw7.jpeg", alt: "Natural landscape portrait" },
    { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw8.jpeg", alt: "Misty mountain valley" },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw9.jpeg",
      alt: "Contemplative lakeside moment",
    },
  ];

  return (
    <section className={cn("py-20", className)}>
      <div className="container flex flex-col gap-8 lg:flex-row">
        <motion.div
          className="top-0 flex h-auto w-full flex-col justify-start p-6 sm:p-8 lg:sticky lg:h-screen lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <nav className="mb-12">
            <div className="flex flex-wrap items-center space-x-2 text-sm text-muted-foreground uppercase">
              <span className="cursor-pointer transition-colors hover:text-foreground">
                Portfolio
              </span>
              <span>/</span>
              <span className="cursor-pointer transition-colors hover:text-foreground">
                Photography
              </span>
              <span>/</span>
              <span className="text-foreground">Monochrome Stories</span>
            </div>
          </nav>

          <motion.h1
            className="mb-12 text-4xl leading-tight font-light sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Monochrome Stories
          </motion.h1>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">Captured</h3>
                <span className="text-muted-foreground">Feb 2, 2025</span>
              </div>
              <Separator />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">Location</h3>
                <span className="text-muted-foreground">
                  Northern Hemisphere
                </span>
              </div>
              <Separator />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="mb-4">
                <h3 className="mb-4 text-lg font-medium">Project Overview</h3>
                <p className="leading-relaxed text-muted-foreground">
                  A journey through silent city mornings, fog-laced valleys, and
                  fleeting moments of solitude. Each frame captures the poetry
                  of light and shadow, revealing stories hidden in the grayscale
                  tapestry of everyday life.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="w-full lg:w-1/2">
          <motion.div
            className="p-6 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg"
                className="max-h-[30rem] w-full object-cover transition-transform duration-700 hover:scale-105"
                alt="Featured project"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-6 px-6 pb-16 sm:grid-cols-2 sm:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Project9 };

```

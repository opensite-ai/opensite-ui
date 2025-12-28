```tsx
"use client";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const projects1prop = [
  {
    title: "Skyline Room",
    description:
      "Designing cutting-edge architectural visualizations for modern cityscapes and towers.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ali-moradi-qNic6LXHw-w-unsplash.jpg",
    tag: "Architecture",
  },
  {
    title: "Interior Bloom",
    description:
      "Crafting serene and elegant interior layouts that balance functionality with aesthetic harmony.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/israel-andrade-YI_9SivVt_s-unsplash.jpg",
    tag: "Interior Design",
  },
  {
    title: "Modular Nest",
    description:
      "Exploring compact and modular housing concepts for sustainable living.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nastuh-abootalebi-eHD8Y1Znfpk-unsplash.jpg",
    tag: "Design Concept",
  },
  {
    title: "Urban Visions",
    description:
      "Shaping urban identity through 3D exterior models and concept layouts for public spaces.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-lISGL8VWpPE-unsplash.jpg",
    tag: "Urban Planning",
  },
  {
    title: "Form + Flow",
    description:
      "Redefining open floor plans for residential interiors with seamless transitions and space utility.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg",
    tag: "Interior Architecture",
  },
];

interface Projects1Props {
  className?: string;
}

const Projects1 = ({ className }: Projects1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-10 flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-2xl font-semibold sm:text-lg">
            Architectural Highlights
          </h2>
        </div>
        <div className="space-y-12">
          {projects1prop.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col-reverse gap-6 md:grid md:grid-cols-2 md:pt-10"
            >
              <div className="flex flex-col justify-between">
                <h3 className="mb-2 text-lg font-medium sm:text-4xl">
                  {project.title}
                </h3>
                <div>
                  <p className="mb-3 max-w-sm text-sm font-medium text-foreground">
                    {project.description}
                  </p>
                  <Badge variant="outline" className="px-3 py-2">
                    {project.tag}
                  </Badge>
                </div>
              </div>

              <motion.div
                className="aspect-[3/2] w-full overflow-hidden rounded-sm"
                initial={{ y: -80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full rounded-sm object-cover"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Projects1 };

```

```tsx
import { cn } from "@/lib/utils";

interface Projects10Props {
  className?: string;
}

const Projects10 = ({ className }: Projects10Props) => {
  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw6.jpeg",
      alt: "Woman reading in a sunlit meadow",
      title: "Morning Reflections",
      description: "A peaceful start as sunlight filters through the grass.",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw7.jpeg",
      alt: "Majestic sandstone cliffs at dusk",
      title: "Twilight Cliffs",
      description: "Golden hour paints the rocks in warm hues.",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw8.jpeg",
      alt: "Rolling hills under a cloudy sky",
      title: "Misty Highlands",
      description: "Clouds drift lazily over emerald slopes.",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw5.jpeg",
      alt: "Smiling woman with a bouquet",
      title: "Joyful Gathering",
      description: "Laughter and flowers fill the afternoon air.",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw19.jpeg",
      alt: "a handsome man with a cold stare",
      title: "Cold Stare",
      description: "Water carves its story through ancient stone.",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw18.jpeg",
      alt: "a beautiful woman turned to the side",
      title: "Turned to the Side",
      description: "First light awakens the silent mountains.",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw15.jpeg",
      alt: "Vibrant torii gates in a forest path",
      title: "Path of Vermilion",
      description: "A journey marked by tradition and color.",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw9.jpeg",
      alt: "Serene Japanese rock garden",
      title: "Zen Harmony",
      description: "Stones and sand arranged for mindful balance.",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw17.jpeg",
      alt: "Crackling campfire under stars",
      title: "Starlit Stories",
      description: "Tales and warmth shared by the firelight.",
    },
  ];

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/0 transition-all duration-300 group-hover:bg-background/10" />
              <div className="absolute right-0 bottom-0 left-0 translate-y-full transform p-6 transition-transform duration-300 group-hover:translate-y-0">
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-semibold text-muted">
                    {image.title}
                  </h3>
                  <p className="text-sm text-muted">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Projects10 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

interface ImageData {
  src: string;
  alt: string;
}

const images: ImageData[] = [
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg", alt: "Image 1" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg", alt: "Image 2" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg", alt: "Image 3" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw4.jpeg", alt: "Image 4" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw5.jpeg", alt: "Image 5" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw6.jpeg", alt: "Image 6" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw7.jpeg", alt: "Image 7" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw8.jpeg", alt: "Image 8" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw9.jpeg", alt: "Image 9" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw10.jpeg", alt: "Image 10" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw11.jpeg", alt: "Image 11" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg", alt: "Image 12" },
];

interface Projects11Props {
  className?: string;
}

const Projects11 = ({ className }: Projects11Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="columns-1 gap-4 space-y-4 md:columns-2 md:gap-6 md:space-y-6 lg:columns-3">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="mb-4 break-inside-avoid md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <div className="group relative overflow-hidden border-border transition-all duration-300">
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="h-auto w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Projects11 };

```

```tsx
"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Modern Concrete Pavilion",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9jsQcDsxyqA-unsplash.jpg",
    year: "2025",
    type: "Architecture",
  },
  {
    title: "Colorful Urban Living",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw17.jpeg",
    year: "2025",
    type: "Urban Design",
  },
  {
    title: "Minimalist Home Retreat",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg",
    year: "2025",
    type: "Interior",
  },
  {
    title: "Rustic Cabin Glow",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw13.jpeg",
    year: "2025",
    type: "Product Design",
  },
  {
    title: "Luxury Concrete Box",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw14.jpeg",
    year: "2025",
    type: "Residential",
  },
  {
    title: "Glasshouse in Nature",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw16.jpeg",
    year: "2025",
    type: "Sustainable Design",
  },
];

interface Projects12Props {
  className?: string;
}

const Projects12 = ({ className }: Projects12Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  });
  const springY = useSpring(mouseY, {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  });

  const handleContainerMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;

      mouseX.set(x - 50);
      mouseY.set(y + 30);
    },
    [mouseX, mouseY],
  );

  const handleProjectMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
    setIsHovering(true);
  }, []);

  const handleContainerMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setIsHovering(false);
  }, []);

  return (
    <section className={cn("py-20", className)}>
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Studio Gallery</h2>
        </div>

        <div
          ref={containerRef}
          className="relative grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3"
          onMouseMove={handleContainerMouseMove}
          onMouseLeave={handleContainerMouseLeave}
        >
          {projects.map((project, index) => (
            <div key={index} className="group relative">
              <div
                className="relative cursor-pointer overflow-hidden rounded-xl"
                onMouseEnter={() => handleProjectMouseEnter(index)}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="h-[400px] w-full rounded-lg object-cover transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05] group-hover:brightness-110"
                />

                <div className="absolute inset-0 rounded-lg bg-black/0 transition-all duration-500 group-hover:bg-black/10" />
              </div>

              <div className="mt-4 flex justify-between gap-0.5">
                <h3 className="text-sm leading-tight font-medium transition-colors duration-300 group-hover:text-neutral-800 md:text-base">
                  {project.title}
                </h3>
                <div className="flex flex-col items-end">
                  <p className="text-sm text-neutral-600">{project.year}</p>
                  <p className="text-sm text-muted-foreground">
                    {project.type}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <AnimatePresence>
            {isHovering && hoveredIndex !== null && (
              <motion.div
                style={{
                  x: springX,
                  y: springY,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  mass: 0.5,
                }}
                className="pointer-events-none absolute top-0 left-0 z-[9999] select-none"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl border border-white/10 bg-black/95 shadow-2xl shadow-black/30 backdrop-blur-md" />

                  <div className="relative flex items-center gap-3 px-3 py-3 text-sm font-medium whitespace-nowrap text-white">
                    <span className="text-base">Explore</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 bg-white/10">
                      <motion.span
                        animate={{ x: [0, 2, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="text-xs"
                      >
                        →
                      </motion.span>
                    </div>
                  </div>

                  <div className="absolute inset-0 scale-105 rounded-2xl bg-white/5 blur-sm" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export { Projects12 };

```

```tsx
import React from "react";

import { cn } from "@/lib/utils";

interface Projects13Props {
  className?: string;
}

const Projects13 = ({ className }: Projects13Props) => {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "Designed and developed a fully scalable e-commerce platform from scratch, focusing on simplicity and performance, which transformed workflows for over 10,000 users across multiple industries.",
      launchDate: "04.17.2025",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img1.png",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description:
        "Built a secure and intuitive mobile banking application with real-time transaction processing, biometric authentication, and seamless user experience for financial institutions.",
      launchDate: "03.15.2025",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img2.png",
    },
    {
      id: 3,
      title: "AI Content Generator",
      description:
        "Developed an AI-powered content generation platform that helps marketers create engaging content, with advanced NLP capabilities and customizable templates.",
      launchDate: "02.28.2025",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img3.png",
    },
    {
      id: 4,
      title: "Project Management Tool",
      description:
        "Created a comprehensive project management solution with real-time collaboration, task tracking, and analytics dashboard for remote teams and enterprises.",
      launchDate: "01.20.2025",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img10.png",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <ul className="relative w-full">
          <li className="hidden justify-between gap-10 border-b pt-15 pb-2 text-sm tracking-tight text-foreground/40 uppercase lg:flex lg:text-base">
            <p className="w-1/4">PROJECTS</p>
            <p className="w-2/4">DESCRIPTION</p>
            <p className="w-1/4 text-right">GALLERY</p>
          </li>
          {projects.map((project, index) => (
            <li
              key={project.id}
              className="flex w-full flex-col justify-between gap-10 border-b py-10 lg:flex-row lg:py-15"
            >
              <div className="flex gap-4 text-xl font-medium tracking-tighter uppercase lg:w-1/4">
                <p className="">0{index + 1}</p>
                <div className="flex flex-col gap-1">
                  <p>{project.title}</p>
                  <p>({project.launchDate})</p>
                </div>
              </div>
              <div className="text-2xl lg:w-2/4 lg:text-3xl">
                {project.description}
              </div>
              <div className="w-full text-right text-sm text-foreground/50 uppercase lg:h-30 lg:w-1/4 lg:pl-20 lg:text-base">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export { Projects13 };

```

```tsx
"use client";

import { AudioLines } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface Projects15Props {
  className?: string;
}

interface VideoSectionProps {
  videoSrc: string;
  thumbnailSrc: string;
  studioName: string;
  projectTitle: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  thumbnailSrc,
  studioName,
  projectTitle,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="group relative h-[50vh] w-full cursor-pointer overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail Image */}
      <img
        src={thumbnailSrc}
        alt={projectTitle}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/20" />

      <div className="absolute inset-0 bottom-12 flex items-end">
        <div className="px-6 text-left text-white sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <p className="mb-2 text-xs font-medium tracking-wider uppercase opacity-80 sm:mb-3 sm:text-sm md:mb-4 md:text-base">
            {studioName}
          </p>
          <h2 className="max-w-md text-2xl font-light tracking-tight sm:text-3xl md:text-4xl lg:max-w-lg">
            {projectTitle}
          </h2>
        </div>
      </div>
    </div>
  );
};

const Projects15: React.FC<Projects15Props> = ({ className }) => {
  const videoSections = [
    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/3571264-hd_1280_720_30fps.mp4",
      studioName: "MERIDIAN FILMS",
      projectTitle: "Coastal Reflections",
    },

    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/carles-rabada-f7UprkNqi08-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/1448735-hd_1366_720_24fps.mp4",
      studioName: "ZENITH VISUALS",
      projectTitle: "Ethereal Moments",
    },
    {
      thumbnailSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/sam-wermut-FiUuNWxnb3k-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/19348567-hd_1280_720_25fps.mp4",
      studioName: "NEXUS CREATIVE",
      projectTitle: "Deserted Frontiers",
    },
    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ines-alvarez-fdez-VjRc6HDXJ5s-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/9882072-hd_1280_720_30fps.mp4",
      studioName: "PRISM STUDIOS",
      projectTitle: "Nature's Symphony",
    },
  ];

  return (
    <section className={cn("min-h-screen bg-background", className)}>
      {/* Header Section */}
      <div className="relative h-[50vh] bg-background">
        <div className="absolute inset-0 bottom-12 flex items-end">
          <div className="px-6 text-left text-foreground sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:mb-8 lg:text-8xl">
              Explore Our Projects
            </h1>

            <div className="flex items-center">
              <p className="mr-4 text-sm font-medium tracking-wider uppercase opacity-80">
                Our Work
              </p>
              <div className="opacity-60">
                <AudioLines className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Sections */}
      <div className="w-full">
        {videoSections.map((section, index) => (
          <VideoSection
            key={index}
            videoSrc={section.videoSrc}
            thumbnailSrc={section.thumbnailSrc}
            studioName={section.studioName}
            projectTitle={section.projectTitle}
          />
        ))}
      </div>
    </section>
  );
};

export { Projects15 };

```

```tsx
"use client";

import { AudioLines } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface Projects15aProps {
  className?: string;
}

interface VideoSectionProps {
  videoSrc: string;
  thumbnailSrc: string;
  studioName: string;
  projectTitle: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  thumbnailSrc,
  studioName,
  projectTitle,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="group relative h-[50vh] w-full cursor-pointer overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail Image */}
      <img
        src={thumbnailSrc}
        alt={projectTitle}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/20" />

      <div className="absolute inset-0 bottom-12 flex items-end">
        <div className="px-6 text-left text-white sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <p className="mb-2 text-xs font-medium tracking-wider uppercase opacity-80 sm:mb-3 sm:text-sm md:mb-4 md:text-base">
            {studioName}
          </p>
          <h2 className="max-w-md text-2xl font-light tracking-tight sm:text-3xl md:text-4xl lg:max-w-lg">
            {projectTitle}
          </h2>
        </div>
      </div>
    </div>
  );
};

const Projects15a: React.FC<Projects15aProps> = ({ className }) => {
  const videoSections = [
    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/3571264-hd_1280_720_30fps.mp4",
      studioName: "MERIDIAN FILMS",
      projectTitle: "Coastal Reflections",
    },

    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/carles-rabada-f7UprkNqi08-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/1448735-hd_1366_720_24fps.mp4",
      studioName: "ZENITH VISUALS",
      projectTitle: "Ethereal Moments",
    },
    {
      thumbnailSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/sam-wermut-FiUuNWxnb3k-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/19348567-hd_1280_720_25fps.mp4",
      studioName: "NEXUS CREATIVE",
      projectTitle: "Deserted Frontiers",
    },
    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ines-alvarez-fdez-VjRc6HDXJ5s-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/9882072-hd_1280_720_30fps.mp4",
      studioName: "PRISM STUDIOS",
      projectTitle: "Nature's Symphony",
    },
  ];

  return (
    <section className={cn("min-h-screen bg-background", className)}>
      {/* Header Section */}
      <div className="relative h-[50vh] bg-background">
        <div className="absolute inset-0 bottom-12 flex items-end">
          <div className="px-6 text-left text-foreground sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:mb-8 lg:text-8xl">
              Explore Our Projects
            </h1>

            <div className="flex items-center">
              <p className="mr-4 text-sm font-medium tracking-wider uppercase opacity-80">
                Our Work
              </p>
              <div className="opacity-60">
                <AudioLines className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Sections - 2 Column Grid */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2">
        {videoSections.map((section, index) => (
          <VideoSection
            key={index}
            videoSrc={section.videoSrc}
            thumbnailSrc={section.thumbnailSrc}
            studioName={section.studioName}
            projectTitle={section.projectTitle}
          />
        ))}
      </div>
    </section>
  );
};

export { Projects15a };

```

```tsx
"use client";

import { AudioLines } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface Projects15bProps {
  className?: string;
}

interface VideoSectionProps {
  videoSrc: string;
  thumbnailSrc: string;
  studioName: string;
  projectTitle: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  thumbnailSrc,
  studioName,
  projectTitle,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="group relative h-[50vh] w-full cursor-pointer overflow-hidden md:h-[60vh]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail Image */}
      <img
        src={thumbnailSrc}
        alt={projectTitle}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/20" />

      <div className="absolute inset-0 bottom-12 flex items-end">
        <div className="px-6 text-left text-white sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <p className="mb-2 text-xs font-medium tracking-wider uppercase opacity-80 sm:mb-3 sm:text-sm md:mb-4 md:text-base">
            {studioName}
          </p>
          <h2 className="max-w-md text-2xl font-light tracking-tight sm:text-3xl md:text-4xl lg:max-w-lg">
            {projectTitle}
          </h2>
        </div>
      </div>
    </div>
  );
};

const Projects15b: React.FC<Projects15bProps> = ({ className }) => {
  const videoSections = [
    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/3571264-hd_1280_720_30fps.mp4",
      studioName: "MERIDIAN FILMS",
      projectTitle: "Coastal Reflections",
    },

    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/carles-rabada-f7UprkNqi08-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/1448735-hd_1366_720_24fps.mp4",
      studioName: "ZENITH VISUALS",
      projectTitle: "Ethereal Moments",
    },
    {
      thumbnailSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/sam-wermut-FiUuNWxnb3k-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/19348567-hd_1280_720_25fps.mp4",
      studioName: "NEXUS CREATIVE",
      projectTitle: "Deserted Frontiers",
    },
    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ines-alvarez-fdez-VjRc6HDXJ5s-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/9882072-hd_1280_720_30fps.mp4",
      studioName: "PRISM STUDIOS",
      projectTitle: "Nature's Symphony",
    },
  ];

  return (
    <section className={cn("min-h-screen bg-background", className)}>
      {/* All Sections in 2 Column Grid */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2">
        {/* Header Section */}
        <div className="relative h-[50vh] bg-background md:h-[60vh]">
          <div className="absolute inset-0 bottom-12 flex items-end">
            <div className="px-6 text-left text-foreground sm:px-8 md:px-12 lg:px-16 xl:px-20">
              <h1 className="mb-4 max-w-1/2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:mb-8 lg:text-8xl">
                Explore Our Projects
              </h1>

              <div className="flex items-center">
                <p className="mr-4 text-sm font-medium tracking-wider uppercase opacity-80">
                  Our Work
                </p>
                <div className="opacity-60">
                  <AudioLines className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Sections */}
        {videoSections.map((section, index) => (
          <VideoSection
            key={index}
            videoSrc={section.videoSrc}
            thumbnailSrc={section.thumbnailSrc}
            studioName={section.studioName}
            projectTitle={section.projectTitle}
          />
        ))}
      </div>
    </section>
  );
};

export { Projects15b };

```

```tsx
"use client";

import { AudioLines } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface Projects15cProps {
  className?: string;
}

interface VideoSectionProps {
  videoSrc: string;
  thumbnailSrc: string;
  studioName: string;
  projectTitle: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  thumbnailSrc,
  studioName,
  projectTitle,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="group relative h-[50vh] w-full cursor-pointer overflow-hidden rounded-lg md:h-[60vh]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail Image */}
      <img
        src={thumbnailSrc}
        alt={projectTitle}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/20" />

      <div className="absolute inset-0 bottom-12 flex items-end">
        <div className="px-6 text-left text-white sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <p className="mb-2 text-xs font-medium tracking-wider uppercase opacity-80 sm:mb-3 sm:text-sm md:mb-4 md:text-base">
            {studioName}
          </p>
          <h2 className="max-w-md text-2xl font-light tracking-tight sm:text-3xl md:text-4xl lg:max-w-lg">
            {projectTitle}
          </h2>
        </div>
      </div>
    </div>
  );
};

const Projects15c: React.FC<Projects15cProps> = ({ className }) => {
  const videoSections = [
    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/3571264-hd_1280_720_30fps.mp4",
      studioName: "MERIDIAN FILMS",
      projectTitle: "Coastal Reflections",
    },

    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/carles-rabada-f7UprkNqi08-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/1448735-hd_1366_720_24fps.mp4",
      studioName: "ZENITH VISUALS",
      projectTitle: "Ethereal Moments",
    },
    {
      thumbnailSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/sam-wermut-FiUuNWxnb3k-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/19348567-hd_1280_720_25fps.mp4",
      studioName: "NEXUS CREATIVE",
      projectTitle: "Deserted Frontiers",
    },
    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ines-alvarez-fdez-VjRc6HDXJ5s-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/9882072-hd_1280_720_30fps.mp4",
      studioName: "PRISM STUDIOS",
      projectTitle: "Nature's Symphony",
    },
  ];

  return (
    <section className={cn("bg-background py-8 md:py-32", className)}>
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-left text-foreground">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:mb-8 lg:text-8xl">
            Explore Our Projects
          </h1>

          <div className="flex items-center">
            <p className="mr-4 text-sm font-medium tracking-wider uppercase opacity-80">
              Our Work
            </p>
            <div className="opacity-60">
              <AudioLines className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Video Sections with Padding */}
        <div className="space-y-8 md:space-y-12">
          {videoSections.map((section, index) => (
            <div key={index}>
              <VideoSection
                videoSrc={section.videoSrc}
                thumbnailSrc={section.thumbnailSrc}
                studioName={section.studioName}
                projectTitle={section.projectTitle}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Projects15c };

```

```tsx
"use client";

import { AudioLines } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface Projects15dProps {
  className?: string;
}

interface VideoSectionProps {
  videoSrc: string;
  thumbnailSrc: string;
  studioName: string;
  projectTitle: string;
  className?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  thumbnailSrc,
  studioName,
  projectTitle,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`group relative w-full cursor-pointer overflow-hidden rounded-lg ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail Image */}
      <img
        src={thumbnailSrc}
        alt={projectTitle}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/20" />

      <div className="absolute inset-0 bottom-12 flex items-end">
        <div className="px-6 text-left text-white sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <p className="mb-2 text-xs font-medium tracking-wider uppercase opacity-80 sm:mb-3 sm:text-sm md:mb-4 md:text-base">
            {studioName}
          </p>
          <h2 className="max-w-md text-2xl font-light tracking-tight sm:text-3xl md:text-4xl lg:max-w-lg">
            {projectTitle}
          </h2>
        </div>
      </div>
    </div>
  );
};

const Projects15d = ({ className }: Projects15dProps) => {
  const videoSections = [
    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/3571264-hd_1280_720_30fps.mp4",
      studioName: "MERIDIAN FILMS",
      projectTitle: "Coastal Reflections",
    },

    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/carles-rabada-f7UprkNqi08-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/1448735-hd_1366_720_24fps.mp4",
      studioName: "ZENITH VISUALS",
      projectTitle: "Ethereal Moments",
    },
    {
      thumbnailSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/sam-wermut-FiUuNWxnb3k-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/19348567-hd_1280_720_25fps.mp4",
      studioName: "NEXUS CREATIVE",
      projectTitle: "Deserted Frontiers",
    },
    {
      thumbnailSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ines-alvarez-fdez-VjRc6HDXJ5s-unsplash.jpg",
      videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/9882072-hd_1280_720_30fps.mp4",
      studioName: "PRISM STUDIOS",
      projectTitle: "Nature's Symphony",
    },
  ];

  return (
    <section className={cn("bg-background py-8 md:py-32", className)}>
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-left text-foreground">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:mb-8 lg:text-8xl">
            Explore Our Projects
          </h1>

          <div className="flex items-center">
            <p className="mr-4 text-sm font-medium tracking-wider uppercase opacity-80">
              Our Work
            </p>
            <div className="opacity-60">
              <AudioLines className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Simple 2x2 Grid Layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {videoSections.map((section, index) => (
            <VideoSection
              key={index}
              videoSrc={section.videoSrc}
              thumbnailSrc={section.thumbnailSrc}
              studioName={section.studioName}
              projectTitle={section.projectTitle}
              className="aspect-video"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Projects15d };

```

```tsx
"use client";

import { AudioLines } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface VideoSectionProps {
  videoSrc: string;
  thumbnailSrc: string;
  studioName: string;
  projectTitle: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  thumbnailSrc,
  studioName,
  projectTitle,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="group relative h-[60vh] w-full cursor-pointer overflow-hidden md:h-[70vh]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail Image */}
      <img
        src={thumbnailSrc}
        alt={projectTitle}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/30 transition-all duration-500 group-hover:bg-black/20" />

      <div className="absolute inset-0 bottom-12 flex items-end">
        <div className="px-6 text-left text-white sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <p className="mb-2 text-xs font-medium tracking-wider uppercase opacity-80 sm:mb-3 sm:text-sm md:mb-4 md:text-base">
            {studioName}
          </p>
          <h2 className="max-w-md text-2xl font-light tracking-tight sm:text-3xl md:text-4xl lg:max-w-lg">
            {projectTitle}
          </h2>
        </div>
      </div>
    </div>
  );
};

const videoSections = [
  {
    thumbnailSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
    videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/3571264-hd_1280_720_30fps.mp4",
    studioName: "MERIDIAN FILMS",
    projectTitle: "Coastal Reflections",
  },

  {
    thumbnailSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/carles-rabada-f7UprkNqi08-unsplash.jpg",
    videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/1448735-hd_1366_720_24fps.mp4",
    studioName: "ZENITH VISUALS",
    projectTitle: "Ethereal Moments",
  },
  {
    thumbnailSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/sam-wermut-FiUuNWxnb3k-unsplash.jpg",
    videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/19348567-hd_1280_720_25fps.mp4",
    studioName: "NEXUS CREATIVE",
    projectTitle: "Deserted Frontiers",
  },
  {
    thumbnailSrc:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ines-alvarez-fdez-VjRc6HDXJ5s-unsplash.jpg",
    videoSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/9882072-hd_1280_720_30fps.mp4",
    studioName: "PRISM STUDIOS",
    projectTitle: "Nature's Symphony",
  },
];

interface Projects15eProps {
  className?: string;
}

const Projects15e = ({ className }: Projects15eProps) => {
  return (
    <section className={cn("w-full bg-background", className)}>
      {/* Header Section */}
      <div className="container py-16">
        <div className="text-left text-foreground">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:mb-8 lg:text-8xl">
            Explore Our Projects
          </h1>

          <div className="flex items-center">
            <p className="mr-4 text-sm font-medium tracking-wider uppercase opacity-80">
              Our Work
            </p>
            <div className="opacity-60">
              <AudioLines className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Carousel */}
      <div className="w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {videoSections.map((section, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:basis-4/5 md:pl-4 lg:basis-3/4 xl:basis-2/3"
              >
                <VideoSection
                  videoSrc={section.videoSrc}
                  thumbnailSrc={section.thumbnailSrc}
                  studioName={section.studioName}
                  projectTitle={section.projectTitle}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 md:left-8" />
          <CarouselNext className="right-4 md:right-8" />
        </Carousel>
      </div>
    </section>
  );
};

export { Projects15e };

```

```tsx
import { cn } from "@/lib/utils";

interface Projects2type {
  title: string;
  description: string;
  imagePath: string;
  imageAlt: string;
}

const projects2prop: Projects2type[] = [
  {
    title: "MOSAIC",
    description:
      "A vibrant fusion of city lights and digital artistry, this installation transforms urban landscapes into interactive canvases, inviting viewers to become part of the evolving masterpiece.",
    imagePath: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg",
    imageAlt: "Modern digital art installation",
  },
  {
    title: "IDENTITY REIMAGINED",
    description:
      "A bold rebranding journey, where classic design principles meet contemporary flair. This project breathes new life into established brands, crafting visual stories that resonate across every platform.",
    imagePath: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg",
    imageAlt: "Brand design mockups and materials",
  },
  {
    title: "SERENITY SPACES",
    description:
      "An exploration of harmony between architecture and human experience. This concept blends natural materials and open layouts to create environments that inspire calm and creativity.",
    imagePath: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg",
    imageAlt: "Architectural interior design concept",
  },
];

interface Projects2Props {
  className?: string;
}

const Projects2 = ({ className }: Projects2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-16 font-serif text-4xl font-normal tracking-wide text-foreground md:mb-24 md:text-6xl lg:text-7xl">
          PROJECT SHOWCASE
        </h1>

        <div className="space-y-16 md:space-y-24 lg:space-y-32">
          {projects2prop.map((project, index) => (
            <div
              key={index}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="order-2 lg:order-1 lg:col-span-4">
                <h2 className="mb-4 font-sans text-base font-bold tracking-wider text-foreground uppercase md:text-base">
                  {project.title}
                </h2>
                <p className="max-w-sm font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.description}
                </p>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-8">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg border border-border">
                  <img
                    src={project.imagePath}
                    alt={project.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Projects2 };

```

```tsx
"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "Design Workflow Optimization",
    category: "UI/UX",
    date: "06/20/25",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/studio-republic-fotKKqWNMQ4-unsplash.jpg",
  },
  {
    id: 2,
    title: "Seamless Global Access",
    category: "Cloud Tech",
    date: "06/18/25",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/israel-andrade-YI_9SivVt_s-unsplash.jpg",
  },
];

const ProjectItem = ({
  project,
  index,
  containerRef,
  hoveredIndex,
  setHoveredIndex,
  mousePos,
  setMousePos,
}: {
  project: {
    id: number;
    title: string;
    category: string;
    date: string;
    image: string;
  };
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  mousePos: { x: number; y: number };
  setMousePos: (pos: { x: number; y: number }) => void;
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 1.05],
  );
  const scrollY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.7, 1, 1, 0.7],
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <motion.div
      key={project.id}
      className="group relative cursor-pointer"
      variants={{
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl"
        style={{
          scale: scrollScale,
          y: scrollY,
          opacity: scrollOpacity,
        }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="h-full w-full rounded-xl object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: hoveredIndex === index ? 1.15 : 1.1 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: hoveredIndex === index ? 0.8 : 0.6 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.div
            className="flex items-center gap-2 text-sm text-white/80 lg:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: hoveredIndex === index ? -5 : 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <p className="text-lg font-medium">{project.date}</p>
            <span>|</span>
            <p>{project.category}</p>
          </motion.div>
          <motion.h2
            className="px-4 text-center text-xl font-semibold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: hoveredIndex === index ? -10 : 0,
              scale: hoveredIndex === index ? 1.05 : 1,
            }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            {project.title}
          </motion.h2>
        </div>
      </motion.div>

      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.div
            key={`icon-${project.id}`}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.3,
            }}
            style={{
              top: mousePos.y - 24,
              left: mousePos.x - 24,
              position: "absolute",
              pointerEvents: "none",
            }}
            className="z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-sm"
          >
            <motion.div
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Plus size={20} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface Projects3Props {
  className?: string;
}

const Projects3 = ({ className }: Projects3Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className={cn("py-32", className)}>
      <div className="container space-y-16">
        <h1 className="text-center text-4xl font-semibold md:text-6xl">
          Our Projects
        </h1>

        <motion.div
          ref={containerRef}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:gap-12"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              containerRef={containerRef}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              mousePos={mousePos}
              setMousePos={setMousePos}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export { Projects3 };

```

```tsx
"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const projects5prop = [
  {
    title: "Modern Concrete Pavilion",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/Modern Architectural Elegance at Twilight.png",
    year: "2025",
    type: "Architecture",
  },
  {
    title: "Colorful Urban Living",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/Modernist Architecture in Lush Forest.png",

    year: "2025",
    type: "Urban Design",
  },
  {
    title: "Minimalist Home Retreat",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg",
    year: "2025",
    type: "Interior",
  },
  {
    title: "Urban Concrete House",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/Modern Minimalist House.png",
    year: "2025",
    type: "Product Design",
  },
  {
    title: "Luxury Concrete Box",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw14.jpeg",
    year: "2025",
    type: "Residential",
  },
  {
    title: "Glasshouse in Nature",
    img: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw16.jpeg",
    year: "2025",
    type: "Sustainable Design",
  },
];

interface Projects5Props {
  className?: string;
}

const Projects5 = ({ className }: Projects5Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="text-7xl leading-tight font-bold uppercase">Our Work</h1>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects5prop.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-lg border border-border bg-background"
            >
              <div className="overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="h-96 w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <h2 className="text-lg font-semibold">{project.title}</h2>
                  <p className="text-muted-foreground">{project.type}</p>
                </div>
                <div className="rounded-2xl border border-border px-5 py-2 text-sm font-semibold">
                  {project.year}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Projects5 };

```

```tsx
"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

const projects6Props = [
  {
    id: 1,
    category: "NATURE",
    title: "Puma",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg",
    description: "Capturing the essence of wildlife in their habitat.",
  },
  {
    id: 2,
    category: "CULTURE",
    title: "Afterparty",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw5.jpeg",
    description: "What a party!",
  },
  {
    id: 3,
    category: "CULTURE",
    title: "Rider",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg",
    description: "Artistic movements that define our generation.",
  },
  {
    id: 4,
    category: "FASHION",
    title: "Elegance",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg",
    description: "Bold statements and timeless style.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const ProjectCard = ({
  project,
}: {
  project: (typeof projects6Props)[0];
  index: number;
}) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative cursor-pointer overflow-hidden rounded-3xl bg-black shadow-2xl"
    >
      <div className="relative aspect-[5/5] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="inline-block rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        <div className="absolute top-4 right-4 translate-x-2 transform opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>
        </div>

        <div className="absolute right-4 bottom-4 left-4">
          <h3 className="mb-1 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {project.title}
          </h3>
          <p className="text-sm text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

interface Projects6Props {
  className?: string;
}

const Projects6 = ({ className }: Projects6Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-foreground"></div>
              PROJECT SHOWCASE
            </span>
          </div>
          <h1 className="text-6xl leading-none font-black tracking-tight md:text-8xl lg:text-9xl">
            <span className="block">CAPTURING</span>
            <span className="block">MOMENTS</span>
          </h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2"
        >
          {projects6Props.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export { Projects6 };

```

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface Projects7Type {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const Projects7Data: Projects7Type[] = [
  {
    id: 1,
    title: "Minimalist Geometry",
    category: "MINIMAL",
    description:
      "A clean composition focusing on simple shapes and negative space, evoking calm and clarity.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random1.jpeg",
    tags: ["minimal", "geometry"],
  },
  {
    id: 2,
    title: "Abstract Color Flow",
    category: "ABSTRACT",
    description:
      "Vivid colors blend and swirl in an abstract pattern, creating a sense of movement and energy.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random2.jpeg",
    tags: ["abstract", "color"],
  },
  {
    id: 3,
    title: "Editorial Portrait",
    category: "EDITORIAL",
    description:
      "A striking editorial portrait with dramatic lighting and a focus on expression and mood.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random3.jpeg",
    tags: ["editorial", "portrait"],
  },
  {
    id: 4,
    title: "Studio Still Life",
    category: "STUDIO SHOT",
    description:
      "A carefully arranged studio shot featuring everyday objects, highlighting texture and form.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random4.jpeg",
    tags: ["studio", "still-life"],
  },
  {
    id: 5,
    title: "Minimal Shadows",
    category: "MINIMAL",
    description:
      "Soft shadows and subtle gradients create a tranquil, minimalist scene with a modern touch.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random5.jpeg",
    tags: ["minimal", "shadows"],
  },
  {
    id: 6,
    title: "Abstract Studio",
    category: "ABSTRACT",
    description:
      "Studio lighting meets abstract forms in this experimental composition, blending art and photography.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/random6.jpeg",
    tags: ["abstract", "studio"],
  },
];

const filterCategories = [
  "ALL",
  "MINIMAL",
  "ABSTRACT",
  "EDITORIAL",
  "STUDIO SHOT",
];

interface Projects7Props {
  className?: string;
}

const Projects7 = ({ className }: Projects7Props) => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [filteredItems, setFilteredItems] = useState(Projects7Data);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);

    if (category === "ALL") {
      setFilteredItems(Projects7Data);
    } else {
      const filtered = Projects7Data.filter(
        (item) =>
          item.category === category ||
          item.tags.includes(category.toLowerCase().replace(" ", "-")),
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-wrap justify-center gap-8">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`text-sm font-medium tracking-wider transition-colors duration-300 hover:text-foreground ${
                  activeFilter === category
                    ? "border-b-2 border-border pb-1 text-foreground"
                    : "text-gray-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <AnimatePresence mode="wait">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-lg"
                >
                  <div className="relative aspect-4/3 h-96 w-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover transition-transform duration-300"
                    />

                    <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-8 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <motion.div className="translate-y-5 text-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="mb-4 text-xs font-medium tracking-widest text-gray-300">
                          {item.category}
                        </p>
                        <h3 className="mb-4 text-2xl font-light tracking-wide">
                          {item.title}
                        </h3>
                        <p className="max-w-xs text-sm leading-relaxed text-gray-200">
                          {item.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <p className="text-lg text-gray-500">
                No items found for "{activeFilter}" category.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Projects7 };

```

```tsx
import { cn } from "@/lib/utils";

interface Projects9Props {
  className?: string;
}

const Projects9 = ({ className }: Projects9Props) => {
  const images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg",
      alt: "Woman with flowers",
      title: "Spring Blossoms",
      description: "A moment of tranquility captured in nature's embrace",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg",
      alt: "Red rock formations",
      title: "Desert Canyon",
      description: "Ancient stones carved by time and wind",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg",
      alt: "Mountain landscape",
      title: "Highland Vista",
      description: "Where earth meets sky in perfect harmony",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw4.jpeg",
      alt: "Torii gates",
      title: "Sacred Path",
      description: "Traditional gates leading to spiritual awakening",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw5.jpeg",
      alt: "Zen garden",
      title: "Meditation Garden",
      description: "Raked sand patterns creating inner peace",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw6.jpeg",
      alt: "Campfire flames",
      title: "Evening Fire",
      description: "Warmth and light dancing in the darkness",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/0 transition-all duration-300 group-hover:bg-background/10" />
              <div className="absolute right-0 bottom-0 left-0 translate-y-full transform p-6 transition-transform duration-300 group-hover:translate-y-0">
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-semibold text-muted">
                    {image.title}
                  </h3>
                  <p className="text-sm text-muted">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Projects9 };

```

```tsx
"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const imgPaths = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vasilis-karkalas-qOaeVSKyhhE-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vasilis-karkalas-LadCWrSL7X8-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vanessa-werder-LjFEoGuj5eY-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vanessa-werder-4G228Duzmn8-unsplash.jpg",
];

interface Projects16Props {
  className?: string;
}

const Projects16 = ({ className }: Projects16Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-12 text-xl leading-tight font-medium md:text-3xl">
          Exploring the wonders of nature,
          <br />
          capturing moments of serenity and
          <br />
          beauty from forests to mountains.
        </h1>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <img
              src={imgPaths[0]}
              alt="Sunlight streaming through forest trees"
              className="aspect-4/3 w-full rounded-lg object-cover"
            />
            <img
              src={imgPaths[2]}
              alt="Majestic mountain peak at sunrise"
              className="aspect-4/5 w-full rounded-lg object-cover"
            />
          </div>

          <div className="space-y-4">
            <img
              src={imgPaths[1]}
              alt="Crystal clear lake surrounded by pines"
              className="aspect-4/5 w-full rounded-lg object-cover"
            />
            <img
              src={imgPaths[3]}
              alt="Wildflowers blooming in a green meadow"
              className="aspect-4/3 w-full rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="max-w-md">
          <p className="mb-4 text-muted-foreground">
            Nature's beauty is ever-changing and endlessly inspiring. From the
            gentle rustle of leaves to the grandeur of mountain vistas, each day
            brings a new story to capture and cherish.
          </p>
          <Button variant="link" className="h-auto px-0 text-sm font-medium">
            Discover More →
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Projects16 };

```

```tsx
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const projects17Prop = [
  {
    id: 1,
    title: "Crystal Clear Tropical Waters",
    location: "Maldives",
    year: "2023",
    category: "Seascape",
    description:
      "Aerial view of pristine turquoise waters revealing the intricate patterns of coral formations and sandy ocean floor through crystal clear tropical seas.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
  },
  {
    id: 2,
    title: "Aerial View of Rice Terraces",
    location: "Southeast Asia",
    year: "2023",
    category: "Agriculture",
    description:
      "Stunning aerial perspective of terraced rice fields showcasing intricate geometric patterns and vibrant green landscapes carved into the hillsides.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-hqnUYXsN5oY-unsplash.jpg",
  },
  {
    id: 3,
    title: "Desert Canyon Formations",
    location: "Southwestern United States",
    year: "2022",
    category: "Landscape",
    description:
      "Dramatic aerial view of layered sandstone formations revealing millions of years of geological history through deep canyons and weathered rock strata.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-3QqzCTIfUJI-unsplash.jpg",
  },
  {
    id: 4,
    title: "Golden Terraced Fields",
    location: "Yunnan, China",
    year: "2022",
    category: "Agriculture",
    description:
      "Mesmerizing aerial view of golden terraced agricultural fields displaying intricate contour patterns carved into the mountainous landscape during harvest season.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/kevin-charit-1fL2Q1JcbNc-unsplash.jpg",
  },
  {
    id: 5,
    title: "Tidal Sand Patterns",
    location: "Iceland",
    year: "2023",
    category: "Landscape",
    description:
      "Mesmerizing aerial view of flowing water patterns carved into dark volcanic sand, creating organic sculptural forms shaped by tidal forces.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ines-alvarez-fdez-VjRc6HDXJ5s-unsplash.jpg",
  },
  {
    id: 6,
    title: "Red Rock Canyon Labyrinth",
    location: "Utah, United States",
    year: "2022",
    category: "Landscape",
    description:
      "Breathtaking aerial view of red sandstone canyon formations displaying deep gorges, weathered rock layers, and intricate geological patterns carved over millennia.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/john-murphey-ZWUWSEY6OGk-unsplash.jpg",
  },
];

interface Projects17Props {
  className?: string;
}

const Projects17 = ({ className }: Projects17Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className={cn("py-16", className)}>
      <div className="w-full">
        <div className="mb-16 px-8">
          <h1 className="text-3xl font-medium tracking-tight lg:text-6xl">
            Projects
          </h1>
        </div>
        <div className="relative w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: false,
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects17Prop.map((project) => (
                <CarouselItem key={project.id} className="basis-auto pl-8">
                  <div className="w-[500px] space-y-6">
                    <div className="aspect-4/3 overflow-hidden rounded-md">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h2 className="text-2xl tracking-tight">
                          {project.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {project.location}
                        </p>
                      </div>

                      <Button variant="secondary">View Project</Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 top-40 right-4 left-4 z-10 flex justify-between">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="pointer-events-auto ml-4 h-10 w-10 rounded-full border-gray-200 bg-white/90 hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="pointer-events-auto mr-4 h-10 w-10 rounded-full border-gray-200 bg-white/90 hover:bg-white"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Projects17 };

```

```tsx
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const projects17aProp = [
  {
    id: 1,
    title: "Crystal Clear Tropical Waters",
    location: "Maldives",
    year: "2023",
    category: "Seascape",
    description:
      "Aerial view of pristine turquoise waters revealing the intricate patterns of coral formations and sandy ocean floor through crystal clear tropical seas.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
  },
  {
    id: 2,
    title: "Aerial View of Rice Terraces",
    location: "Southeast Asia",
    year: "2023",
    category: "Agriculture",
    description:
      "Stunning aerial perspective of terraced rice fields showcasing intricate geometric patterns and vibrant green landscapes carved into the hillsides.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-hqnUYXsN5oY-unsplash.jpg",
  },
  {
    id: 3,
    title: "Desert Canyon Formations",
    location: "Southwestern United States",
    year: "2022",
    category: "Landscape",
    description:
      "Dramatic aerial view of layered sandstone formations revealing millions of years of geological history through deep canyons and weathered rock strata.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-3QqzCTIfUJI-unsplash.jpg",
  },
  {
    id: 4,
    title: "Golden Terraced Fields",
    location: "Yunnan, China",
    year: "2022",
    category: "Agriculture",
    description:
      "Mesmerizing aerial view of golden terraced agricultural fields displaying intricate contour patterns carved into the mountainous landscape during harvest season.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/kevin-charit-1fL2Q1JcbNc-unsplash.jpg",
  },
  {
    id: 5,
    title: "Tidal Sand Patterns",
    location: "Iceland",
    year: "2023",
    category: "Landscape",
    description:
      "Mesmerizing aerial view of flowing water patterns carved into dark volcanic sand, creating organic sculptural forms shaped by tidal forces.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ines-alvarez-fdez-VjRc6HDXJ5s-unsplash.jpg",
  },
  {
    id: 6,
    title: "Red Rock Canyon Labyrinth",
    location: "Utah, United States",
    year: "2022",
    category: "Landscape",
    description:
      "Breathtaking aerial view of red sandstone canyon formations displaying deep gorges, weathered rock layers, and intricate geological patterns carved over millennia.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/john-murphey-ZWUWSEY6OGk-unsplash.jpg",
  },
];

interface Projects17aProps {
  className?: string;
}

const Projects17a = ({ className }: Projects17aProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className={cn("py-16", className)}>
      <div className="w-full">
        <div className="mb-16 px-8">
          <h1 className="text-3xl font-medium tracking-tight lg:text-6xl">
            Projects
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Minimal showcase with cinematic aspect ratio
          </p>
        </div>
        <div className="relative w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: false,
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects17aProp.map((project) => (
                <CarouselItem key={project.id} className="basis-auto pl-8">
                  <div className="w-[700px] space-y-4">
                    <div className="aspect-video overflow-hidden rounded-xl">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-normal tracking-tight">
                          {project.title}
                        </h2>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 top-52 right-4 left-4 z-10 flex justify-between">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="pointer-events-auto ml-4 h-12 w-12 rounded-full border-gray-200 bg-white/90 hover:bg-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="pointer-events-auto mr-4 h-12 w-12 rounded-full border-gray-200 bg-white/90 hover:bg-white"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Projects17a };

```

```tsx
"use client";

import { ArrowLeft, ArrowRight, Calendar, MapPin, Tag } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const projects17bProp = [
  {
    id: 1,
    title: "Crystal Clear Tropical Waters",
    location: "Maldives",
    year: "2023",
    category: "Seascape",
    description:
      "Aerial view of pristine turquoise waters revealing the intricate patterns of coral formations and sandy ocean floor through crystal clear tropical seas.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
  },
  {
    id: 2,
    title: "Aerial View of Rice Terraces",
    location: "Southeast Asia",
    year: "2023",
    category: "Agriculture",
    description:
      "Stunning aerial perspective of terraced rice fields showcasing intricate geometric patterns and vibrant green landscapes carved into the hillsides.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-hqnUYXsN5oY-unsplash.jpg",
  },
  {
    id: 3,
    title: "Desert Canyon Formations",
    location: "Southwestern United States",
    year: "2022",
    category: "Landscape",
    description:
      "Dramatic aerial view of layered sandstone formations revealing millions of years of geological history through deep canyons and weathered rock strata.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-3QqzCTIfUJI-unsplash.jpg",
  },
  {
    id: 4,
    title: "Golden Terraced Fields",
    location: "Yunnan, China",
    year: "2022",
    category: "Agriculture",
    description:
      "Mesmerizing aerial view of golden terraced agricultural fields displaying intricate contour patterns carved into the mountainous landscape during harvest season.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/kevin-charit-1fL2Q1JcbNc-unsplash.jpg",
  },
  {
    id: 5,
    title: "Tidal Sand Patterns",
    location: "Iceland",
    year: "2023",
    category: "Landscape",
    description:
      "Mesmerizing aerial view of flowing water patterns carved into dark volcanic sand, creating organic sculptural forms shaped by tidal forces.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ines-alvarez-fdez-VjRc6HDXJ5s-unsplash.jpg",
  },
  {
    id: 6,
    title: "Red Rock Canyon Labyrinth",
    location: "Utah, United States",
    year: "2022",
    category: "Landscape",
    description:
      "Breathtaking aerial view of red sandstone canyon formations displaying deep gorges, weathered rock layers, and intricate geological patterns carved over millennia.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/john-murphey-ZWUWSEY6OGk-unsplash.jpg",
  },
];

interface Projects17bProps {
  className?: string;
}

const Projects17b = ({ className }: Projects17bProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className={cn("py-16", className)}>
      <div className="w-full">
        <div className="mb-16 px-8">
          <h1 className="text-3xl font-medium tracking-tight lg:text-6xl">
            Projects
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Detailed showcase with complete metadata
          </p>
        </div>
        <div className="relative w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: false,
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects17bProp.map((project) => (
                <CarouselItem key={project.id} className="basis-auto pl-8">
                  <div className="w-[450px]">
                    <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="space-y-4 p-6">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <h2 className="text-xl leading-tight font-semibold">
                              {project.title}
                            </h2>
                            <Badge variant="secondary" className="shrink-0">
                              <Tag className="mr-1 h-3 w-3" />
                              {project.category}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {project.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {project.year}
                            </div>
                          </div>
                        </div>

                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>

                        <div className="pt-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 top-60 right-4 left-4 z-10 flex justify-between">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="pointer-events-auto ml-4 h-10 w-10 rounded-full border-gray-200 bg-white/90 shadow-lg hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="pointer-events-auto mr-4 h-10 w-10 rounded-full border-gray-200 bg-white/90 shadow-lg hover:bg-white"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Projects17b };

```

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface Projects8type {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const Projects8Data: Projects8type[] = [
  {
    id: 1,
    title: "Kinetic Flow",
    category: "MOONLIGHT VISIONS",
    description:
      "A minimal line illustration capturing the dynamic movement of human posture in motion.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vanessa-werder-LjFEoGuj5eY-unsplash.jpg",
    tags: ["line-art", "artwork"],
  },
  {
    id: 2,
    title: "Echoes of the Canyon",
    category: "PIXEL PARADE",
    description:
      "Breathtaking photo series highlighting the textures and tones of majestic canyon walls.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vasilis-karkalas-qOaeVSKyhhE-unsplash.jpg",
    tags: ["photos", "nature"],
  },
  {
    id: 3,
    title: "Serenity in the Highlands",
    category: "WANDER SKETCHES",
    description:
      "A tranquil landscape painting inspired by the rolling hills and cloudy skies of northern Scotland.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vanessa-werder-PrsQ3hfBFTI-unsplash.jpg",
    tags: ["paintings", "landscape"],
  },
  {
    id: 4,
    title: "Visual Tales",
    category: "ECHO FIELDS",
    description:
      "A bold exploration of modern storytelling through layered textures and abstract elements.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pat-whelen-gWfpmH0H2bM-unsplash.jpg",
    tags: ["artwork", "digital"],
  },
  {
    id: 5,
    title: "Quiet Garden",
    category: "NEON TAPESTRY",
    description:
      "A meditative pencil sketch inspired by the harmony and simplicity of Japanese zen gardens.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vanessa-werder-4G228Duzmn8-unsplash.jpg",
    tags: ["sketches", "traditional"],
  },
  {
    id: 6,
    title: "STARDUST STORIES",
    category: "VIDEOS",
    description:
      "A short cinematic video capturing the interplay of sunlight through crystal at golden hour.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vasilis-karkalas-1LT5DG5BD6Q-unsplash.jpg",

    tags: ["videos", "cinematic"],
  },
];

const filterCategories = [
  "ALL",
  "MOONLIGHT VISIONS",
  "PIXEL PARADE",
  "WANDER SKETCHES",
  "ECHO FIELDS",
  "NEON TAPESTRY",
];

interface Projects8Props {
  className?: string;
}

const Projects8 = ({ className }: Projects8Props) => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [filteredItems, setFilteredItems] = useState(Projects8Data);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);

    if (category === "ALL") {
      setFilteredItems(Projects8Data);
    } else {
      const filtered = Projects8Data.filter(
        (item) =>
          item.category === category ||
          item.tags.includes(category.toLowerCase().replace(" ", "-")),
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-wrap justify-center gap-8">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`text-sm font-medium tracking-wider transition-colors duration-300 hover:text-foreground ${
                  activeFilter === category
                    ? "border-b-2 border-border pb-1 text-foreground"
                    : "text-gray-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <AnimatePresence mode="wait">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-lg"
                >
                  <div className="relative aspect-4/3 h-96 w-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover transition-transform duration-300"
                    />

                    <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-8 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <motion.div className="translate-y-5 text-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="mb-4 text-xs font-medium tracking-widest text-gray-300">
                          {item.category}
                        </p>
                        <h3 className="mb-4 text-2xl font-light tracking-wide">
                          {item.title}
                        </h3>
                        <p className="max-w-xs text-sm leading-relaxed text-gray-200">
                          {item.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <p className="text-lg text-gray-500">
                No items found for "{activeFilter}" category.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Projects8 };

```

```tsx
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const projects = [
  {
    heading: "Modern Living Space",
    subheading: "Residential design",
    description:
      "This project involves the complete transformation of a contemporary apartment, focusing on creating an open, minimalist aesthetic with warm accents. The goal is to maximize natural light, optimize space flow.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/alvin-engler-bIhpiQA009k-unsplash.jpg",
    url: "#",
  },
  {
    heading: "Creative Workspace",
    subheading: "Office interior",
    description:
      "In this project, we designed a dynamic office environment that fosters creativity and collaboration. This includes creating flexible work zones, incorporating biophilic design elements, comfortable breakout areas.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/michel-isamuna-kL-EAXnMAp0-unsplash.jpg",
    url: "#",
  },
  {
    heading: "Cozy Bistro Interior",
    subheading: "Restaurant design",
    description:
      "In this project, we crafted an intimate dining atmosphere for a local bistro. This includes designing custom seating arrangements, selecting warm lighting fixtures, creating feature walls.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/michal-balog-HTNB1UDJ4Hg-unsplash.jpg",
    url: "#",
  },
  {
    heading: "Boutique Showroom",
    subheading: "Retail space",
    description:
      "The objective here is to create an immersive retail environment that enhances the customer shopping experience. The focus is on strategic product placement, ambient lighting.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-lopatin-w2DMtHixE5o-unsplash.jpg",
    url: "#",
  },
];

interface Projects18Props {
  className?: string;
}

const Projects18 = ({ className }: Projects18Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div>
          <p className="mb-1 text-muted-foreground uppercase md:text-lg">
            Transform Ideas Into Reality
          </p>
          <h1 className="text-3xl font-bold uppercase md:text-7xl">Projects</h1>
          <p className="mt-7 max-w-2xl text-muted-foreground">
            Where creativity, craftsmanship, and vision unite to create stunning
            interior spaces. Discover our comprehensive portfolio of projects,
            each thoughtfully designed to transform spaces and enhance the lives
            of our clients worldwide.
          </p>
          <Button variant="outline" size="lg" className="mt-7">
            View All Projects
            <ArrowDownRight className="size-4" />
          </Button>
        </div>
        <div className="mt-24 flex flex-col gap-5 md:mt-36">
          {projects.map((project, idx) => (
            <a
              key={idx}
              href={project.url}
              className="group relative isolate min-h-72 bg-cover bg-center px-5 py-14 lg:px-12 lg:py-24"
              style={{
                backgroundImage: `url(${project.image})`,
              }}
            >
              <div className="relative z-10 flex flex-col gap-7 text-white/80 transition-colors duration-300 ease-out group-hover:text-white lg:flex-row">
                <div className="flex gap-1 text-2xl font-bold">
                  <span>/</span>
                  <span>{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex flex-1 flex-col gap-2.5">
                  <h3 className="text-2xl font-bold lg:text-4xl">
                    {project.heading}
                  </h3>
                  <p className="text-sm font-medium uppercase">
                    {project.subheading}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col">
                    <p>{project.description}</p>
                    <div className="mt-2.5 h-0 overflow-hidden transition-all duration-300 ease-out group-hover:h-10">
                      <div>
                        <Button
                          variant="outline"
                          size="lg"
                          className="dark w-fit opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                        >
                          View project
                          <ArrowUpRight className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 z-0 bg-black/80 backdrop-blur-xs transition-all duration-300 ease-out group-hover:bg-black/50 group-hover:backdrop-blur-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Projects18 };

```


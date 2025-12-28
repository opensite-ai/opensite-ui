```tsx
"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Plus,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

// Custom Navigation Buttons Component
const CustomCarouselNavigation = () => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();

  return (
    <>
      <button
        className={cn(
          "absolute left-0 top-1/2 flex size-10 -translate-x-full -translate-y-1/2 cursor-pointer justify-end active:scale-95",
          !canScrollPrev && "opacity-0",
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ChevronLeft className="size-5" />
        <span className="sr-only">Previous slide</span>
      </button>

      <button
        className={cn(
          "absolute right-0 top-1/2 flex size-10 -translate-y-1/2 translate-x-full cursor-pointer active:scale-95",
          !canScrollNext && "opacity-0",
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <ChevronRight className="size-5" />
        <span className="sr-only">Next slide</span>
      </button>
    </>
  );
};

// Carousel component that syncs with isActive state
const CarouselWithActiveSync = ({
  isActive,
  setIsActive,
  FEATURES,
  colors,
  activeColor,
  setActiveColor,
}: {
  isActive: number | null;
  setIsActive: (index: number | null) => void;
  FEATURES: {
    id: number;
    name: string;
    desc: string;
    src: string;
  }[];
  colors: {
    id: number;
    color: string;
    src: string;
  }[];
  activeColor: number | null;
  setActiveColor: (index: number) => void;
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Listen to carousel slide changes and update isActive
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const currentIndex = api.selectedScrollSnap();
      setIsActive(currentIndex);
    };

    api.on("select", onSelect);
    onSelect(); // Set initial state

    return () => {
      api.off("select", onSelect);
    };
  }, [api, setIsActive]);

  // Scroll to active slide when isActive changes externally
  useEffect(() => {
    if (!api || isActive === null) return;

    const currentIndex = api.selectedScrollSnap();
    if (currentIndex !== isActive) {
      api.scrollTo(isActive);
    }
  }, [api, isActive]);

  return (
    <>
      {isActive === null ? (
        <ul className="no-scroll z-1 relative flex gap-3 overflow-scroll px-5 lg:hidden lg:flex-col lg:items-start">
          {FEATURES.map((feature, index) => (
            <motion.li
              key={index}
              layout
              transition={{
                type: "spring",
                duration: 0.7,
                bounce: 0.3,
              }}
              style={{
                borderRadius: "25px",
              }}
              className="hover:bg-foreground/14 bg-foreground/10 flex h-fit w-fit items-center justify-center backdrop-blur-sm"
            >
              <motion.button
                key="btn"
                initial={{ opacity: 0, filter: "blur(2px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(2px)" }}
                transition={{ duration: 0.3, delay: 0.25 }}
                onClick={() => setIsActive(index)}
                className="flex h-14 cursor-pointer items-center justify-center gap-3.5 rounded-full pl-3.5 pr-8"
              >
                {!index ? (
                  <div
                    style={{
                      backgroundColor: activeColor
                        ? colors[activeColor].color
                        : "white",
                    }}
                    className="size-6 rounded-full border-b border-white"
                  />
                ) : (
                  <PlusAdd />
                )}
                <span className="whitespace-nowrap text-lg font-semibold capitalize">
                  {feature.name}
                </span>
              </motion.button>
            </motion.li>
          ))}
        </ul>
      ) : (
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent className="-ml-1 flex items-end">
            {FEATURES.map((feature, index) => (
              <CarouselItem
                key={index}
                className="w-full basis-[85%] pl-2 first:ml-10 last:mr-10"
              >
                <motion.div
                  layout
                  transition={{
                    type: "spring",
                    duration: 0.7,
                    bounce: 0.3,
                  }}
                  style={{
                    borderRadius: "25px",
                  }}
                  className={cn(
                    "hover:bg-foreground/14 bg-foreground/10 flex h-fit w-full items-center justify-center backdrop-blur-sm",
                  )}
                >
                  {isActive === index ? (
                    <motion.div
                      key="name"
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.5,
                        delay: 0.25,
                        y: {
                          duration: 0.5,
                          delay: 0.25,
                        },
                      }}
                      className="p-6 text-lg"
                    >
                      <div>
                        <b className="capitalize">{feature.name}.</b>{" "}
                        {feature.desc}
                      </div>
                      {!index && (
                        <div className="mt-4 flex items-center justify-center gap-2">
                          {colors.map((color, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveColor(color.id)}
                              style={{ backgroundColor: color.color }}
                              className="size-6 cursor-pointer rounded-full border-b border-white"
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(2px)" }}
                      transition={{ duration: 0.3, delay: 0.25 }}
                      onClick={() => setIsActive(index)}
                      className={cn(
                        "flex h-14 w-full cursor-pointer items-center justify-start gap-3.5 rounded-full",
                        index > isActive
                          ? "justify-start pl-3 lg:justify-center"
                          : "justify-end pr-3 lg:justify-center",
                      )}
                    >
                      {index > isActive ? <ChevronRight /> : <ChevronLeft />}
                    </motion.button>
                  )}
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CustomCarouselNavigation />
        </Carousel>
      )}
    </>
  );
};

const Skiper76 = () => {
  const FEATURES = [
    {
      id: 1,
      name: "colors",
      desc: "Choose from three bold finishes. iPhone 17 Pro shown in Cosmic Orange",
      src: "/images/oct25Coll/iphone17pro/1a.jpg",
    },
    {
      id: 2,
      name: "aluminum unibody",
      desc: "Optimized for performance and battery. Aluminum alloy is remarkably light and has exceptional thermal conductivity.",
      src: "/images/oct25Coll/iphone17pro/2.jpg",
    },
    {
      id: 3,
      name: "vapor chamber",
      desc: "Deionized water sealed inside moves heat away from the A19 Pro chip, allowing for even higher sustained performance.",
      src: "/images/oct25Coll/iphone17pro/3.jpg",
    },
    {
      id: 4,
      name: "ceramic shield",
      desc: "Protects the back of iPhone 17 Pro, making it 4x more resistant to cracks.4 New Ceramic Shield 2 on the front has 3x better scratch resistance.5",
      src: "/images/oct25Coll/iphone17pro/4.jpg",
    },
    {
      id: 5,
      name: "immersive pro display",
      desc: "Our best‑ever 6.3‑inch and 6.9‑inch Super Retina XDR displays.6 Brighter. Better anti‑reflection. ProMotion up to 120Hz.",
      src: "/images/oct25Coll/iphone17pro/5.jpg",
    },
    {
      id: 6,
      name: "camera control",
      desc: "Instantly take a photo, record video, adjust settings, and more. So you never miss a moment.",
      src: "/images/oct25Coll/iphone17pro/6.jpg",
    },
    {
      id: 7,
      name: "Action button",
      desc: "A customizable fast track to your favorite feature. Long press to launch the action you want — Silent mode, Translation, Shortcuts, and more.",
      src: "/images/oct25Coll/iphone17pro/7.jpg",
    },
  ];

  const [isActive, setIsActive] = useState<number | null>(null);

  const colors = [
    {
      id: 0,
      color: "#fff",
      src: "/images/oct25Coll/iphone17pro/1a.jpg",
    },
    {
      id: 1,
      color: "#F77313",
      src: "/images/oct25Coll/iphone17pro/1c.jpg",
    },
    {
      id: 2,
      color: "#2B3145",
      src: "/images/oct25Coll/iphone17pro/1b.jpg",
    },
  ];

  const [activeColor, setActiveColor] = useState<number | null>(null);

  const { isMobile, isLoading } = useIsMobile();

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
      }}
    >
      <div className="from-muted to-muted text-foreground dark flex h-full w-screen items-center justify-center bg-linear-to-t p-4">
        <div className="rounded-4xl relative flex h-[745px] w-full max-w-360 flex-col justify-end overflow-hidden bg-black pb-5 shadow md:justify-center">
          <div className="relative flex items-center md:px-10 lg:px-24">
            <AnimatePresence>
              {isActive !== null && (
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                  className="absolute left-8 hidden flex-col gap-2 lg:flex"
                >
                  <button
                    onClick={() => {
                      if (isActive === null) {
                        setIsActive(0);
                      } else if (isActive > 0) {
                        setIsActive(isActive - 1);
                      }
                    }}
                    disabled={isActive === 0}
                    className={cn(
                      "z-3 bg-foreground/10 top-5 flex size-10 items-center justify-center rounded-full active:scale-95",
                      isActive === 0
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer",
                    )}
                  >
                    <ChevronUp className="stroke-3 size-6" />
                  </button>
                  <button
                    onClick={() => {
                      if (isActive === null) {
                        setIsActive(0);
                      } else if (isActive < FEATURES.length - 1) {
                        setIsActive(isActive + 1);
                      }
                    }}
                    disabled={isActive === FEATURES.length - 1}
                    className={cn(
                      "z-3 bg-foreground/10 top-5 flex size-10 items-center justify-center rounded-full transition-all ease-out active:scale-95",
                      isActive === FEATURES.length - 1
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer",
                    )}
                  >
                    <ChevronDown className="stroke-3 size-6" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* desktop */}
            <ul className="z-1 relative hidden flex-col justify-center gap-3 md:flex">
              {FEATURES.map((feature, index) => (
                <motion.li
                  key={index}
                  layout
                  transition={{
                    type: "spring",
                    duration: 0.7,
                    bounce: 0.3,
                  }}
                  style={{
                    borderRadius: "25px",
                  }}
                  className="hover:bg-foreground/14 bg-foreground/10 flex h-fit w-fit items-center justify-center backdrop-blur-sm"
                >
                  {isActive === index ? (
                    <motion.div
                      key="name"
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.5,
                        delay: 0.25,
                        y: {
                          duration: 0.5,
                          delay: 0.25,
                        },
                      }}
                      className="max-w-106 p-6 text-lg"
                    >
                      {" "}
                      <div>
                        <b className="capitalize">{feature.name}.</b>{" "}
                        {feature.desc}
                      </div>
                      {!index && (
                        <div className="mt-4 flex items-center justify-center gap-2">
                          {colors.map((color, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveColor(color.id)}
                              style={{ backgroundColor: color.color }}
                              className="size-6 cursor-pointer rounded-full border-b border-white"
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(2px)" }}
                      transition={{ duration: 0.3, delay: 0.25 }}
                      onClick={() => setIsActive(index)}
                      className="flex h-14 cursor-pointer items-center justify-center gap-3.5 rounded-full pl-3.5 pr-8"
                    >
                      {!index ? (
                        <div
                          style={{
                            backgroundColor: activeColor
                              ? colors[activeColor].color
                              : "white",
                          }}
                          className="size-6 rounded-full border-b border-white"
                        />
                      ) : (
                        <PlusAdd />
                      )}
                      <span className="whitespace-nowrap text-lg font-semibold capitalize">
                        {feature.name}
                      </span>
                    </motion.button>
                  )}
                </motion.li>
              ))}
            </ul>
            {/* mobile */}
            {isMobile && (
              <div className="relative z-10 flex w-full lg:hidden">
                <CarouselWithActiveSync
                  isActive={isActive}
                  setIsActive={setIsActive}
                  FEATURES={FEATURES}
                  colors={colors}
                  activeColor={activeColor}
                  setActiveColor={setActiveColor}
                />
              </div>
            )}
          </div>
          <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
            <AnimatePresence mode="popLayout">
              {isActive === null ? (
                <motion.div
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1.2,
                    transition: {
                      delay: 0.25,
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    },
                  }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  key={isActive}
                  className="h-full w-full"
                >
                  <img
                    src="/images/oct25Coll/iphone17pro/1.jpg"
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isActive !== null ? "15%" : 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1.2,
                    transition: {
                      delay: 0.2,
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  exit={{
                    opacity: 0,
                    x: isActive !== null ? "-15%" : 0,
                    scale: 0.9,
                  }}
                  key={isActive}
                  className="h-full w-full"
                >
                  {!isActive && activeColor !== null ? (
                    <img
                      src={colors[activeColor].src}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <img
                      src={FEATURES[isActive].src}
                      alt=""
                      className="lg:translate-0 h-full w-full -translate-x-[9%] object-contain"
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {isActive !== null && (
              <motion.button
                initial={{ y: "100%", opacity: 0, scale: 0 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: "100%", opacity: 0, scale: 0 }}
                onClick={() => setIsActive(null)}
                className="z-3 bg-foreground/10 absolute right-5 top-5 flex size-10 cursor-pointer items-center justify-center rounded-full active:scale-95"
              >
                <Plus className="stroke-3 size-6 rotate-45" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
};

export { Skiper76 };

const PlusAdd = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      version="1.1"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="11.3"
        fill="none"
        stroke="var(--foreground)"
      ></circle>
      <g transform="translate(7 7)" fill="var(--foreground)" stroke="none">
        <path d="m9 4h-3v-3c0-0.553-0.447-1-1-1s-1 0.447-1 1v3h-3c-0.553 0-1 0.447-1 1s0.447 1 1 1h3v3c0 0.553 0.447 1 1 1s1-0.447 1-1v-3h3c0.553 0 1-0.447 1-1s-0.447-1-1-1"></path>
      </g>
    </svg>
  );
};

interface UseIsMobileReturn {
  isMobile: boolean;
  isLoading: boolean;
}

export const useIsMobile = (): UseIsMobileReturn => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => {
      // Check using media query
      const mediaQuery = window.matchMedia("(max-width: 768px)");

      // Check using user agent (additional detection)
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        "android",
        "webos",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
        "mobile",
      ];

      const isMobileUA = mobileKeywords.some((keyword) =>
        userAgent.includes(keyword),
      );

      // Combine both checks - prioritize media query but consider user agent
      const isMobileDevice =
        mediaQuery.matches || (isMobileUA && window.innerWidth <= 768);

      setIsMobile(isMobileDevice);
      setIsLoading(false);
    };

    // Initial check
    checkIsMobile();

    // Listen for media query changes
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleChange = () => checkIsMobile();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Listen for window resize
    window.addEventListener("resize", checkIsMobile);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return {
    isMobile,
    isLoading,
  };
};

export default useIsMobile;
```

```tsx
"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const Skiper78 = () => {
  const carouselItems = [
    {
      src: "/images/oct25Coll/skiperpro/shoreel-1.png",
      label: "Share meeting takeaways in a fraction of the time",
    },
    {
      src: "/images/oct25Coll/skiperpro/shoreel-9.png",
      label: "Share meeting takeaways in a fraction of the time",
    },
    {
      src: "/images/oct25Coll/skiperpro/shoreel.png",
      label: "Share meeting takeaways in a fraction of the time",
    },
    {
      src: "/images/oct25Coll/skiperpro/shoreel-5.png",
      label: "Share meeting takeaways in a fraction of the time",
    },
    {
      src: "/images/oct25Coll/skiperpro/shoreel-6.png",
      label: "Share meeting takeaways in a fraction of the time",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useMotionValue(100);
  const [direction, setDirection] = useState(1);

  const clipPath = useMotionTemplate`inset(0 ${progress}%  0 0 round 10px )`;

  useEffect(() => {
    const interval = setInterval(() => {
      const currentProgress = progress.get();
      if (currentProgress > 0) {
        progress.set(currentProgress - 1);
      } else {
        clearInterval(interval);
        progress.set(100);
        if (currentIndex < carouselItems.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setDirection(1);
        } else {
          setCurrentIndex(0);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [progress, currentIndex]);

  return (
    <div className="font-satoshi relative flex h-full w-screen flex-col items-center justify-center gap-12 overflow-hidden">
      <div className="text-center">
        <h1 className="text-6xl tracking-tighter">UI for future</h1>
        <p className="text-foreground/50 mt-4 text-2xl">
          Collection of unsual UI components
        </p>
      </div>

      {/* Navigation Button */}
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={() => {
            progress.set(100);
            currentIndex > 0
              ? setCurrentIndex(currentIndex - 1)
              : setCurrentIndex(carouselItems.length - 1);
            setDirection(-1);
          }}
          className="bg-foreground/10 hover:bg-foreground/20 text-foreground/50 flex size-6 cursor-pointer items-center justify-center rounded-full p-0.5 active:scale-95"
        >
          <ChevronLeft />
        </button>
        <div className="flex items-center justify-center gap-1">
          {carouselItems.map((item, index) => (
            <motion.button
              initial={false}
              onClick={() => {
                progress.set(100);
                setCurrentIndex(index);
                if (index > currentIndex) {
                  setDirection(1);
                } else {
                  setDirection(-1);
                }
              }}
              animate={{
                width: index === currentIndex ? "30px" : "8px",
              }}
              className="bg-foreground/15 text-foreground/50 relative flex h-2 cursor-pointer items-center justify-center overflow-hidden rounded-full p-0.5"
              key={index}
            >
              {currentIndex === index && (
                <motion.div
                  style={{ clipPath }}
                  className="bg-foreground absolute left-0 top-0 h-full w-full origin-left rounded-full"
                ></motion.div>
              )}
              <div></div>
            </motion.button>
          ))}
        </div>
        <button
          onClick={() => {
            progress.set(100);
            currentIndex < carouselItems.length - 1
              ? setCurrentIndex(currentIndex + 1)
              : setCurrentIndex(0);

            setDirection(1);
          }}
          className="bg-foreground/10 hover:bg-foreground/20 flex size-6 cursor-pointer items-center justify-center rounded-full p-0.5 text-neutral-400 active:scale-95"
        >
          <ChevronRight />
        </button>
      </div>

      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        {currentIndex !== null && (
          <motion.div
            key={currentIndex}
            variants={variants as Variants}
            initial="initial"
            animate="active"
            exit="exit"
            custom={direction}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
            className="flex w-full max-w-3xl flex-col items-center justify-center"
          >
            <p className="text-foreground/50 mb-6 text-2xl">
              Availble with shadcn CLI 3.0
            </p>
            <div className="bg-foreground/10 rounded-4xl h-[550px] w-full overflow-hidden p-1">
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={`${carouselItems[currentIndex].src}`}
                alt=""
                className="rounded-4xl h-full w-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Skiper78 };

const variants = {
  initial: (direction: number) => {
    return { opacity: 0, filter: "blur(4)" };
  },
  active: {
    x: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: 0.3, duration: 0.3, ease: "easeOut" },
  },
  exit: (direction: number) => {
    return {
      x: `${-30 * direction}%`,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.25, ease: "easeOut" },
    };
  },
};
```

```tsx
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Feature() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-end items-end  gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Platform</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                This is the start of something new
              </h2>
              <p className="text-lg  max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground  text-left">
                Managing a small business today is already tough. Avoid further
                complications by ditching outdated, tedious trade methods. Our
                goal is to streamline SMB trade, making it easier and faster than
                ever.
              </p>
            </div>
          </div>
          <div className="w-full max-w-full px-6">
            <Carousel>
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="flex rounded-md aspect-video bg-muted items-center justify-center p-6">
                      <span className="text-sm">
                        Platform Screenshot {index + 1}
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
```

```tsx
"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react"
import clsx from "clsx"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from "framer-motion"

// --- Helper Functions and Fallbacks ---

// A simple utility for class names, similar to cn/clsx
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

// Placeholder for image assets if they are not found.
const placeholderImage = (text = "Image") =>
  `https://placehold.co/600x400/1a1a1a/ffffff?text=${text}`

// --- Types ---
type StaticImageData = string;

type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
}

interface CardProps {
  bgClass?: string
}

interface ImageSet {
  step1img1: StaticImageData
  step1img2: StaticImageData
  step2img1: StaticImageData
  step2img2: StaticImageData
  step3img: StaticImageData
  step4img: StaticImageData
  alt: string
}

interface FeatureCarouselProps extends CardProps {
  step1img1Class?: string
  step1img2Class?: string
  step2img1Class?: string
  step2img2Class?: string
  step3imgClass?: string
  step4imgClass?: string
  image: ImageSet
}

interface StepImageProps {
  src: StaticImageData
  alt: string
  className?: string
  style?: React.CSSProperties
  width?: number
  height?: number
}

interface Step {
  id: string
  name: string
  title: string
  description: string
}

// --- Constants ---
const TOTAL_STEPS = 4

const steps: readonly Step[] = [
  {
    id: "1",
    name: "Step 1",
    title: "Seamless Integration",
    description: "Connect your tools and workflows effortlessly. Our platform integrates with hundreds of popular apps.",
  },
  {
    id: "2",
    name: "Step 2",
    title: "Powerful Analytics",
    description: "Gain deep insights with our advanced analytics dashboard. Track your performance and make data-driven decisions.",
  },
  {
    id: "3",
    name: "Step 3",
    title: "Collaborative Workspace",
    description: "Work together in real-time. Share, comment, and edit with your team from anywhere in the world.",
  },
  {
    id: "4",
    name: "Step 4",
    title: "Automated Workflows",
    description: "Put your tasks on autopilot. Create custom automations to save time and reduce manual work.",
  },
]

const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
} as const

type AnimationPreset = keyof typeof ANIMATION_PRESETS

interface AnimatedStepImageProps extends StepImageProps {
  preset?: AnimationPreset
  delay?: number
  onAnimationComplete?: () => void
}

// --- Hooks ---
function useNumberCycler(totalSteps: number = TOTAL_STEPS, interval: number = 5000) {
  const [currentNumber, setCurrentNumber] = useState(0);

  // This effect handles the automatic cycling.
  // It depends on `currentNumber`, so every time the step changes,
  // it will clear the old timer and set a new one for the next step.
  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps);
    }, interval);

    // Cleanup function to clear the timer if the component unmounts
    // or if the dependencies of the effect change (e.g., user clicks a step).
    return () => clearTimeout(timerId);
  }, [currentNumber, totalSteps, interval]);

  // This function allows manual setting of the step.
  // When called, it updates `currentNumber`, which will trigger the useEffect
  // to reset the timer for the next cycle.
  const setStep = useCallback((stepIndex: number) => {
      setCurrentNumber(stepIndex % totalSteps);
  }, [totalSteps]);

  return { currentNumber, setStep };
}


function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    }
    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])
  return isMobile
}

// --- Components ---
function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className={cn("h-4 w-4", className)} {...props} >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

const stepVariants: Variants = {
  inactive: { scale: 0.9, opacity: 0.7 },
  active: { scale: 1, opacity: 1 },
}

const StepImage = forwardRef<HTMLImageElement, StepImageProps>(
  ({ src, alt, className, style, ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={className}
        src={src}
        style={{ position: "absolute", userSelect: "none", maxWidth: "unset", ...style }}
        onError={(e) => (e.currentTarget.src = placeholderImage(alt))}
        {...props}
      />
    )
  }
)
StepImage.displayName = "StepImage"

const MotionStepImage = motion(StepImage)

const AnimatedStepImage = ({ preset = "fadeInScale", delay = 0, ...props }: AnimatedStepImageProps) => {
  const presetConfig = ANIMATION_PRESETS[preset]
  return <MotionStepImage {...props} {...presetConfig} transition={{ ...presetConfig.transition, delay }} />
}

function FeatureCard({ children, step }: { children: React.ReactNode; step: number }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()
  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }
  return (
    <motion.div
      className="animated-cards group relative w-full rounded-2xl"
      onMouseMove={handleMouseMove}
      style={{ "--x": useMotionTemplate`${mouseX}px`, "--y": useMotionTemplate`${mouseY}px` } as WrapperStyle}
    >
      <div className="relative w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="m-10 min-h-[450px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-full flex-col gap-4 md:w-3/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="text-sm font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
              >
                  {steps[step].name}
              </motion.div>
              <motion.h2
                className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-3xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
              >
                {steps[step].title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
              >
                <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-400">
                  {steps[step].description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {children}
        </div>
      </div>
    </motion.div>
  )
}

function StepsNav({ steps: stepItems, current, onChange }: { steps: readonly Step[]; current: number; onChange: (index: number) => void; }) {
    return (
        <nav aria-label="Progress" className="flex justify-center px-4">
            <ol className="flex w-full flex-wrap items-center justify-center gap-2" role="list">
                {stepItems.map((step, stepIdx) => {
                    const isCompleted = current > stepIdx;
                    const isCurrent = current === stepIdx;
                    return (
                        <motion.li key={step.name} initial="inactive" animate={isCurrent ? "active" : "inactive"} variants={stepVariants} transition={{ duration: 0.3 }} className="relative" >
                            <button
                                type="button"
                                className={cn(
                                    "group flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-black",
                                    isCurrent 
                                        ? "bg-sky-600 text-white dark:bg-sky-500" 
                                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                )}
                                onClick={() => onChange(stepIdx)}
                            >
                                <span className={cn(
                                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                                    isCompleted 
                                        ? "bg-sky-600 text-white dark:bg-sky-500" 
                                        : isCurrent 
                                            ? "bg-sky-400 text-sky-900 dark:bg-sky-400 dark:text-sky-900" 
                                            : "bg-neutral-200 text-neutral-700 group-hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:group-hover:bg-neutral-600"
                                )}>
                                    {isCompleted ? (
                                        <IconCheck className="h-3.5 w-3.5" />
                                    ) : (
                                        <span>{stepIdx + 1}</span>
                                    )}
                                </span>
                                <span className="hidden sm:inline-block">{step.name}</span>
                            </button>
                        </motion.li>
                    );
                })}
            </ol>
        </nav>
    );
}

const defaultClasses = {
  img: "rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-2xl shadow-black/10 dark:shadow-neutral-950/50",
  step1img1: "w-[50%] left-0 top-[15%]",
  step1img2: "w-[60%] left-[40%] top-[35%]",
  step2img1: "w-[50%] left-[5%] top-[20%]",
  step2img2: "w-[40%] left-[55%] top-[45%]",
  step3img: "w-[90%] left-[5%] top-[25%]",
  step4img: "w-[90%] left-[5%] top-[25%]",
} as const

export function FeatureCarousel({
  image,
  step1img1Class = defaultClasses.step1img1,
  step1img2Class = defaultClasses.step1img2,
  step2img1Class = defaultClasses.step2img1,
  step2img2Class = defaultClasses.step2img2,
  step3imgClass = defaultClasses.step3img,
  step4imgClass = defaultClasses.step4img,
  ...props
}: FeatureCarouselProps) {
  const { currentNumber: step, setStep } = useNumberCycler()
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="relative w-full h-full">
            <AnimatedStepImage alt={image.alt} className={cn(defaultClasses.img, step1img1Class)} src={image.step1img1} preset="slideInLeft" />
            <AnimatedStepImage alt={image.alt} className={cn(defaultClasses.img, step1img2Class)} src={image.step1img2} preset="slideInRight" delay={0.1} />
          </div>
        )
      case 1:
        return (
          <div className="relative w-full h-full">
            <AnimatedStepImage alt={image.alt} className={cn(defaultClasses.img, step2img1Class)} src={image.step2img1} preset="fadeInScale" />
            <AnimatedStepImage alt={image.alt} className={cn(defaultClasses.img, step2img2Class)} src={image.step2img2} preset="fadeInScale" delay={0.1} />
          </div>
        )
      case 2:
        return <AnimatedStepImage alt={image.alt} className={cn(defaultClasses.img, step3imgClass)} src={image.step3img} preset="fadeInScale" />
      case 3:
        return <AnimatedStepImage alt={image.alt} className={cn(defaultClasses.img, step4imgClass)} src={image.step4img} preset="fadeInScale" />
      default: return null
    }
  }
  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto p-4">
        <FeatureCard {...props} step={step}>
            <AnimatePresence mode="wait">
                <motion.div key={step} {...ANIMATION_PRESETS.fadeInScale} className="w-full h-full absolute">
                    {renderStepContent()}
                </motion.div>
            </AnimatePresence>
        </FeatureCard>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <StepsNav current={step} onChange={setStep} steps={steps} />
        </motion.div>
    </div>
  )
}
```

```tsx
import React, {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Section = {
  id?: string;
  background: string;
  leftLabel?: ReactNode;
  title: string | ReactNode;
  rightLabel?: ReactNode;
  renderBackground?: (active: boolean, previous: boolean) => ReactNode;
};

type Colors = Partial<{
  text: string;
  overlay: string;
  pageBg: string;
  stageBg: string;
}>;

type Durations = Partial<{
  change: number; // section change animation
  snap: number;   // programmatic scroll duration (ms)
}>;

export type FullScreenFXAPI = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  getIndex: () => number;
  refresh: () => void;
};

export type FullScreenFXProps = {
  sections: Section[];
  className?: string;
  style?: CSSProperties;

  // Layout
  fontFamily?: string;
  header?: ReactNode;
  footer?: ReactNode;
  gap?: number;           // rem
  gridPaddingX?: number;  // rem

  showProgress?: boolean;
  debug?: boolean;

  // Motion
  durations?: Durations;
  reduceMotion?: boolean;
  smoothScroll?: boolean; // if you use Lenis, set to true and install lenis

  // Background transition
  bgTransition?: "fade" | "wipe"; // default "fade"
  parallaxAmount?: number;        // % for outgoing bg (fade mode uses a tiny y drift)

  // Controlled index
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;

  // Colors
  colors?: Colors;

  // Imperative API
  apiRef?: React.Ref<FullScreenFXAPI>;
  ariaLabel?: string;
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(
  (
    {
      sections,
      className,
      style,

      fontFamily = '"Rubik Wide", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
      header,
      footer,
      gap = 1,
      gridPaddingX = 2,

      showProgress = true,
      debug = false,

      durations = { change: 0.7, snap: 800 },
      reduceMotion,
      smoothScroll = false, // enable if you install Lenis

      bgTransition = "fade",
      parallaxAmount = 4,

      currentIndex,
      onIndexChange,
      initialIndex = 0,

      colors = {
        text: "rgba(245,245,245,0.92)",
        overlay: "rgba(0,0,0,0.35)",
        pageBg: "#ffffff",
        stageBg: "#000000",
      },

      apiRef,
      ariaLabel = "Full screen scroll slideshow",
    },
    ref
  ) => {
    const total = sections.length;
    const [localIndex, setLocalIndex] = useState(clamp(initialIndex, 0, Math.max(0, total - 1)));
    const isControlled = typeof currentIndex === "number";
    const index = isControlled ? clamp(currentIndex!, 0, Math.max(0, total - 1)) : localIndex;

    const rootRef = useRef<HTMLDivElement | null>(null);
    const fixedRef = useRef<HTMLDivElement | null>(null);
    const fixedSectionRef = useRef<HTMLDivElement | null>(null);

    const bgRefs = useRef<HTMLImageElement[]>([]);
    const wordRefs = useRef<HTMLSpanElement[][]>([]);

    const leftTrackRef = useRef<HTMLDivElement | null>(null);
    const rightTrackRef = useRef<HTMLDivElement | null>(null);
    const leftItemRefs = useRef<HTMLDivElement[]>([]);
    const rightItemRefs = useRef<HTMLDivElement[]>([]);

    const progressFillRef = useRef<HTMLDivElement | null>(null);
    const currentNumberRef = useRef<HTMLSpanElement | null>(null);

    const stRef = useRef<ScrollTrigger | null>(null);
    const lastIndexRef = useRef(index);
    const isAnimatingRef = useRef(false);
    const isSnappingRef = useRef(false);
    const sectionTopRef = useRef<number[]>([]);

    // prefers-reduced-motion
    const prefersReduced = useMemo(() => {
      if (typeof window === "undefined") return false;
      return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);
    const motionOff = reduceMotion ?? prefersReduced;

    // Split words for center title
    const tempWordBucket = useRef<HTMLSpanElement[]>([]);
    const splitWords = (text: string) => {
      const words = text.split(/\s+/).filter(Boolean);
      return words.map((w, i) => (
        <span className="fx-word-mask" key={i}>
          <span className="fx-word" ref={(el) => el && tempWordBucket.current.push(el)}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ));
    };
    const WordsCollector = ({ onReady }: { onReady: () => void }) => {
      useEffect(() => onReady(), []); // eslint-disable-line
      return null;
    };

    // Compute scroll snap positions
    const computePositions = () => {
      const el = fixedSectionRef.current;
      if (!el) return;
      const top = el.offsetTop;
      const h = el.offsetHeight;
      const arr: number[] = [];
      for (let i = 0; i < total; i++) arr.push(top + (h * i) / total);
      sectionTopRef.current = arr;
    };

    // Align lists: center active row
    const measureAndCenterLists = (toIndex = index, animate = true) => {
      const centerTrack = (
        container: HTMLDivElement | null,
        items: HTMLDivElement[],
        isRight: boolean
      ) => {
        if (!container || items.length === 0) return;
        const first = items[0];
        const second = items[1];
        const contRect = container.getBoundingClientRect();
        let rowH = first.getBoundingClientRect().height;
        if (second) {
          // more accurate: distance between rows includes gap
          rowH = second.getBoundingClientRect().top - first.getBoundingClientRect().top;
        }
        // center math
        const targetY = contRect.height / 2 - rowH / 2 - toIndex * rowH;
        const prop = isRight ? rightTrackRef : leftTrackRef;
        if (!prop.current) return;
        if (animate) {
          gsap.to(prop.current, {
            y: targetY,
            duration: (durations.change ?? 0.7) * 0.9,
            ease: "power3.out",
          });
        } else {
          gsap.set(prop.current, { y: targetY });
        }
      };

      measureRAF(() => {
        measureRAF(() => {
          centerTrack(leftTrackRef.current, leftItemRefs.current, false);
          centerTrack(rightTrackRef.current, rightItemRefs.current, true);
        });
      });
    };

    const measureRAF = (fn: () => void) => {
      if (typeof window === "undefined") return;
      requestAnimationFrame(() => requestAnimationFrame(fn));
    };

    // ScrollTrigger for pinning + index step detection
    useLayoutEffect(() => {
      if (typeof window === "undefined") return;
      const fixed = fixedRef.current;
      const fs = fixedSectionRef.current;
      if (!fixed || !fs || total === 0) return;

      // initial bg states
      gsap.set(bgRefs.current, { opacity: 0, scale: 1.04, yPercent: 0 });
      if (bgRefs.current[0]) gsap.set(bgRefs.current[0], { opacity: 1, scale: 1 });

      // initial center words
      wordRefs.current.forEach((words, sIdx) => {
        words.forEach((w) => {
          gsap.set(w, {
            yPercent: sIdx === index ? 0 : 100,
            opacity: sIdx === index ? 1 : 0,
          });
        });
      });

      computePositions();
      measureAndCenterLists(index, false);

      const st = ScrollTrigger.create({
        trigger: fs,
        start: "top top",
        end: "bottom bottom",
        pin: fixed,
        pinSpacing: true,
        onUpdate: (self) => {
          if (motionOff || isSnappingRef.current) return;
          const prog = self.progress;
          const target = Math.min(total - 1, Math.floor(prog * total));
          if (target !== lastIndexRef.current && !isAnimatingRef.current) {
            const next = lastIndexRef.current + (target > lastIndexRef.current ? 1 : -1);
            // programmatic one-step snap without extra sound
            goTo(next, false);
          }
          if (progressFillRef.current) {
            const p = (lastIndexRef.current / (total - 1 || 1)) * 100;
            progressFillRef.current.style.width = `${p}%`;
          }
        },
      });

      stRef.current = st;

      // initial jump if needed
      if (initialIndex && initialIndex > 0 && initialIndex < total) {
        requestAnimationFrame(() => goTo(initialIndex, false));
      }

      // handle resize
      const ro = new ResizeObserver(() => {
        computePositions();
        measureAndCenterLists(lastIndexRef.current, false);
        ScrollTrigger.refresh();
      });
      ro.observe(fs);

      return () => {
        ro.disconnect();
        st.kill();
        stRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total, initialIndex, motionOff, bgTransition, parallaxAmount]);

    // Section change visuals
    const changeSection = (to: number) => {
      if (to === lastIndexRef.current || isAnimatingRef.current) return;
      const from = lastIndexRef.current;
      const down = to > from;
      isAnimatingRef.current = true;

      if (!isControlled) setLocalIndex(to);
      onIndexChange?.(to);

      // progress numbers
      if (currentNumberRef.current) {
        currentNumberRef.current.textContent = String(to + 1).padStart(2, "0");
      }
      if (progressFillRef.current) {
        const p = (to / (total - 1 || 1)) * 100;
        progressFillRef.current.style.width = `${p}%`;
      }

      const D = durations.change ?? 0.7;

      // center title word animation (mask slide)
      const outWords = wordRefs.current[from] || [];
      const inWords = wordRefs.current[to] || [];
      if (outWords.length) {
        gsap.to(outWords, {
          yPercent: down ? -100 : 100,
          opacity: 0,
          duration: D * 0.6,
          stagger: down ? 0.03 : -0.03,
          ease: "power3.out",
        });
      }
      if (inWords.length) {
        gsap.set(inWords, { yPercent: down ? 100 : -100, opacity: 0 });
        gsap.to(inWords, {
          yPercent: 0,
          opacity: 1,
          duration: D,
          stagger: down ? 0.05 : -0.05,
          ease: "power3.out",
        });
      }

      // backgrounds — FADE mode (requested)
      const prevBg = bgRefs.current[from];
      const newBg = bgRefs.current[to];
      if (bgTransition === "fade") {
        if (newBg) {
          gsap.set(newBg, { opacity: 0, scale: 1.04, yPercent: down ? 1 : -1 });
          gsap.to(newBg, { opacity: 1, scale: 1, yPercent: 0, duration: D, ease: "power2.out" });
        }
        if (prevBg) {
          gsap.to(prevBg, {
            opacity: 0,
            yPercent: down ? -parallaxAmount : parallaxAmount,
            duration: D,
            ease: "power2.out",
          });
        }
      } else {
        // optional wipe mode
        if (newBg) {
          gsap.set(newBg, {
            opacity: 1,
            clipPath: down ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
            scale: 1,
            yPercent: 0,
          });
          gsap.to(newBg, { clipPath: "inset(0 0 0 0)", duration: D, ease: "power3.out" });
        }
        if (prevBg) {
          gsap.to(prevBg, { opacity: 0, duration: D * 0.8, ease: "power2.out" });
        }
      }

      // lists — center active row and animate active state
      measureAndCenterLists(to, true);

      leftItemRefs.current.forEach((el, i) => {
        el.classList.toggle("active", i === to);
        gsap.to(el, {
          opacity: i === to ? 1 : 0.35,
          x: i === to ? 10 : 0,
          duration: D * 0.6,
          ease: "power3.out",
        });
      });
      rightItemRefs.current.forEach((el, i) => {
        el.classList.toggle("active", i === to);
        gsap.to(el, {
          opacity: i === to ? 1 : 0.35,
          x: i === to ? -10 : 0,
          duration: D * 0.6,
          ease: "power3.out",
        });
      });

      gsap.delayedCall(D, () => {
        lastIndexRef.current = to;
        isAnimatingRef.current = false;
      });
    };

    // programmatic navigation
    const goTo = (to: number, withScroll = true) => {
      const clamped = clamp(to, 0, total - 1);
      isSnappingRef.current = true;
      changeSection(clamped);

      const pos = sectionTopRef.current[clamped];
      const snapMs = durations.snap ?? 800;

      if (withScroll && typeof window !== "undefined") {
        // If you installed Lenis, you can integrate here
        window.scrollTo({ top: pos, behavior: "smooth" });
        setTimeout(() => (isSnappingRef.current = false), snapMs);
      } else {
        setTimeout(() => (isSnappingRef.current = false), 10);
      }
    };

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    useImperativeHandle(apiRef, () => ({
      next,
      prev,
      goTo,
      getIndex: () => index,
      refresh: () => ScrollTrigger.refresh(),
    }));

    // click/hover on list items
    const handleJump = (i: number) => goTo(i);
    const handleLoadedStagger = () => {
      // soft entrance for lists at mount
      leftItemRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: i === index ? 1 : 0.35, y: 0, duration: 0.5, delay: i * 0.06, ease: "power3.out" }
        );
      });
      rightItemRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: i === index ? 1 : 0.35, y: 0, duration: 0.5, delay: 0.2 + i * 0.06, ease: "power3.out" }
        );
      });
    };

    // mount entrance
    useEffect(() => {
      handleLoadedStagger();
      measureAndCenterLists(index, false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // CSS vars
    const cssVars: CSSProperties = {
      ["--fx-font" as any]: fontFamily,
      ["--fx-text" as any]: colors.text ?? "rgba(245,245,245,0.92)",
      ["--fx-overlay" as any]: colors.overlay ?? "rgba(0,0,0,0.35)",
      ["--fx-page-bg" as any]: colors.pageBg ?? "#fff",
      ["--fx-stage-bg" as any]: colors.stageBg ?? "#000",
      ["--fx-gap" as any]: `${gap}rem`,
      ["--fx-grid-px" as any]: `${gridPaddingX}rem`,
      ["--fx-row-gap" as any]: "10px",
    };

    return (
      <div
        ref={(node) => {
          (rootRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={["fx", className].filter(Boolean).join(" ")}
        style={{ ...cssVars, ...style }}
        aria-label={ariaLabel}
      >
        {debug && <div className="fx-debug">Section: {index}</div>}

        <div className="fx-scroll">
          <div className="fx-fixed-section" ref={fixedSectionRef}>
            <div className="fx-fixed" ref={fixedRef}>
              {/* Backgrounds */}
              <div className="fx-bgs" aria-hidden="true">
                {sections.map((s, i) => (
                  <div className="fx-bg" key={s.id ?? i}>
                    {s.renderBackground ? (
                      s.renderBackground(index === i, lastIndexRef.current === i)
                    ) : (
                      <>
                        <img
                          ref={(el) => el && (bgRefs.current[i] = el)}
                          src={s.background}
                          alt=""
                          className="fx-bg-img"
                        />
                        <div className="fx-bg-overlay" />
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="fx-grid">
                {/* Header */}
                {header && <div className="fx-header">{header}</div>}

                {/* Content (lists + center) */}
                <div className="fx-content">
                  {/* Left list */}
                  <div className="fx-left" role="list">
                    <div className="fx-track" ref={leftTrackRef}>
                      {sections.map((s, i) => (
                        <div
                          key={`L-${s.id ?? i}`}
                          className={`fx-item fx-left-item ${i === index ? "active" : ""}`}
                          ref={(el) => el && (leftItemRefs.current[i] = el)}
                          onClick={() => handleJump(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={i === index}
                        >
                          {s.leftLabel}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Center title (masked words if string) */}
                  <div className="fx-center">
                    {sections.map((s, sIdx) => {
                      tempWordBucket.current = [];
                      const isString = typeof s.title === "string";
                      return (
                        <div key={`C-${s.id ?? sIdx}`} className={`fx-featured ${sIdx === index ? "active" : ""}`}>
                          <h3 className="fx-featured-title">
                            {isString ? splitWords(s.title as string) : s.title}
                          </h3>
                          <WordsCollector
                            onReady={() => {
                              if (tempWordBucket.current.length) {
                                wordRefs.current[sIdx] = [...tempWordBucket.current];
                              }
                              tempWordBucket.current = [];
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Right list */}
                  <div className="fx-right" role="list">
                    <div className="fx-track" ref={rightTrackRef}>
                      {sections.map((s, i) => (
                        <div
                          key={`R-${s.id ?? i}`}
                          className={`fx-item fx-right-item ${i === index ? "active" : ""}`}
                          ref={(el) => el && (rightItemRefs.current[i] = el)}
                          onClick={() => handleJump(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={i === index}
                        >
                          {s.rightLabel}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer + progress */}
                <div className="fx-footer">
                  {footer && <div className="fx-footer-title">{footer}</div>}
                  {showProgress && (
                    <div className="fx-progress">
                      <div className="fx-progress-numbers">
                        <span ref={currentNumberRef}>{String(index + 1).padStart(2, "0")}</span>
                        <span>{String(total).padStart(2, "0")}</span>
                      </div>
                      <div className="fx-progress-bar">
                        <div className="fx-progress-fill" ref={progressFillRef} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* End spacer */}
          <div className="fx-end">
            <p className="fx-fin">fin</p>
          </div>
        </div>

        <style jsx>{`
          .fx {
            width: 100%;
            overflow: hidden;
            background: var(--fx-page-bg);
            color: #000;
            font-family: var(--fx-font);
            text-transform: uppercase;
            letter-spacing: -0.02em;
          }

          .fx-debug {
            position: fixed; bottom: 10px; right: 10px; z-index: 9999;
            background: rgba(255,255,255,0.8); color: #000; padding: 6px 8px; font: 12px/1 monospace; border-radius: 4px;
          }

          .fx-fixed-section { height: ${Math.max(1, total + 1)}00vh; position: relative; }
          .fx-fixed { position: sticky; top: 0; height: 100vh; width: 100%; overflow: hidden; background: var(--fx-page-bg); }

          .fx-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: var(--fx-gap);
            padding: 0 var(--fx-grid-px);
            position: relative;
            height: 100%;
            z-index: 2;
          }

          .fx-bgs { position: absolute; inset: 0; background: var(--fx-stage-bg); z-index: 1; }
          .fx-bg { position: absolute; inset: 0; }
          .fx-bg-img {
            position: absolute; inset: -10% 0 -10% 0;
            width: 100%; height: 120%; object-fit: cover;
            filter: brightness(0.8);
            opacity: 0;
            will-change: transform, opacity;
          }
          .fx-bg-overlay { position: absolute; inset: 0; background: var(--fx-overlay); }

          .fx-header {
            grid-column: 1 / 13; align-self: start; padding-top: 6vh;
            font-size: clamp(2rem, 9vw, 9rem); line-height: 0.86; text-align: center; color: var(--fx-text);
          }
          .fx-header > * { display: block; }

          .fx-content {
            grid-column: 1 / 13;
            position: absolute; inset: 0;
            display: grid; grid-template-columns: 1fr 1.3fr 1fr; /* L 30% / C 40% / R 30% vibe */
            align-items: center;
            height: 100%;
            padding: 0 var(--fx-grid-px);
          }

          .fx-left, .fx-right {
            height: 60vh; /* gives us room to center the active row */
            overflow: hidden;
            display: grid; align-content: center;
          }
          .fx-left { justify-items: start; }
          .fx-right { justify-items: end; }
          .fx-track { will-change: transform; }

          .fx-item {
            color: var(--fx-text);
            font-weight: 800;
            letter-spacing: 0em;
            line-height: 1;
            margin: calc(var(--fx-row-gap) / 2) 0;
            opacity: 0.35;
            transition: opacity 0.3s ease, transform 0.3s ease;
            position: relative;
            font-size: clamp(1rem, 2.4vw, 1.8rem);
            user-select: none;
            cursor: pointer;
          }
          .fx-left-item.active, .fx-right-item.active { opacity: 1; }
          .fx-left-item.active { transform: translateX(10px); padding-left: 16px; }
          .fx-right-item.active { transform: translateX(-10px); padding-right: 16px; }

          .fx-left-item.active::before,
          .fx-right-item.active::after {
            content: "";
            position: absolute; top: 50%; transform: translateY(-50%);
            width: 6px; height: 6px; background: var(--fx-text); border-radius: 50%;
          }
          .fx-left-item.active::before { left: 0; }
          .fx-right-item.active::after { right: 0; }

          .fx-center {
            display: grid; place-items: center; text-align: center; height: 60vh; overflow: hidden;
          }
          .fx-featured { position: absolute; opacity: 0; visibility: hidden; }
          .fx-featured.active { opacity: 1; visibility: visible; }
          .fx-featured-title {
            margin: 0; color: var(--fx-text);
            font-weight: 900; letter-spacing: -0.01em;
            font-size: clamp(2rem, 7.5vw, 6rem);
          }
          .fx-word-mask { display: inline-block; overflow: hidden; vertical-align: middle; }
          .fx-word { display: inline-block; vertical-align: middle; }

          .fx-footer {
            grid-column: 1 / 13; align-self: end; padding-bottom: 5vh; text-align: center;
          }
          .fx-footer-title { color: var(--fx-text); font-size: clamp(1.6rem, 7vw, 7rem); font-weight: 900; letter-spacing: -0.01em; line-height: 0.9; }
          .fx-progress { width: 200px; height: 2px; margin: 1rem auto 0; background: rgba(245,245,245,0.28); position: relative; }
          .fx-progress-fill { position: absolute; inset: 0 auto 0 0; width: 0%; background: var(--fx-text); height: 100%; transition: width 0.3s ease; }
          .fx-progress-numbers { position: absolute; inset: auto 0 100% 0; display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--fx-text); }

          .fx-end { height: 100vh; display: grid; place-items: center; }
          .fx-fin { transform: rotate(90deg); color: #111; }

          @media (max-width: 900px) {
            .fx-content {
              grid-template-columns: 1fr; row-gap: 3vh;
              place-items: center;
            }
            .fx-left, .fx-right, .fx-center { height: auto; }
            .fx-left, .fx-right { justify-items: center; }
            .fx-track { transform: none !important; }
          }
        `}</style>
      </div>
    );
  }
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";
```

```tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  FC,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

// Define the type for the context value
interface ProgressSliderContextType {
  active: string;
  progress: number;
  handleButtonClick: (value: string) => void;
  vertical: boolean;
}

// Define the type for the component props
interface ProgressSliderProps {
  children: ReactNode;
  duration?: number;
  fastDuration?: number;
  vertical?: boolean;
  activeSlider: string;
  className?: string;
}

interface SliderContentProps {
  children: ReactNode;
  className?: string;
}

interface SliderWrapperProps {
  children: ReactNode;
  value: string;
  className?: string;
}

interface ProgressBarProps {
  children: ReactNode;
  className?: string;
}

interface SliderBtnProps {
  children: ReactNode;
  value: string;
  className?: string;
  progressBarClass?: string;
}

// Create the context with an undefined initial value
const ProgressSliderContext = createContext<
  ProgressSliderContextType | undefined
>(undefined);

export const useProgressSliderContext = (): ProgressSliderContextType => {
  const context = useContext(ProgressSliderContext);
  if (!context) {
    throw new Error(
      'useProgressSliderContext must be used within a ProgressSlider'
    );
  }
  return context;
};

export const ProgressSlider: FC<ProgressSliderProps> = ({
  children,
  duration = 5000,
  fastDuration = 400,
  vertical = false,
  activeSlider,
  className,
}) => {
  const [active, setActive] = useState<string>(activeSlider);
  const [progress, setProgress] = useState<number>(0);
  const [isFastForward, setIsFastForward] = useState<boolean>(false);
  const frame = useRef<number>(0);
  const firstFrameTime = useRef<number>(performance.now());
  const targetValue = useRef<string | null>(null);
  const [sliderValues, setSliderValues] = useState<string[]>([]);

  useEffect(() => {
    const getChildren = React.Children.toArray(children).find(
      (child) => (child as React.ReactElement).type === SliderContent
    ) as React.ReactElement | undefined;

    if (getChildren) {
      const values = React.Children.toArray(getChildren.props.children).map(
        (child) => (child as React.ReactElement).props.value as string
      );
      setSliderValues(values);
    }
  }, [children]);

  useEffect(() => {
    if (sliderValues.length > 0) {
      firstFrameTime.current = performance.now();
      frame.current = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, [sliderValues, active, isFastForward]);

  const animate = (now: number) => {
    const currentDuration = isFastForward ? fastDuration : duration;
    const elapsedTime = now - firstFrameTime.current;
    const timeFraction = elapsedTime / currentDuration;

    if (timeFraction <= 1) {
      setProgress(
        isFastForward
          ? progress + (100 - progress) * timeFraction
          : timeFraction * 100
      );
      frame.current = requestAnimationFrame(animate);
    } else {
      if (isFastForward) {
        setIsFastForward(false);
        if (targetValue.current !== null) {
          setActive(targetValue.current);
          targetValue.current = null;
        }
      } else {
        // Move to the next slide
        const currentIndex = sliderValues.indexOf(active);
        const nextIndex = (currentIndex + 1) % sliderValues.length;
        setActive(sliderValues[nextIndex]);
      }
      setProgress(0);
      firstFrameTime.current = performance.now();
    }
  };

  const handleButtonClick = (value: string) => {
    if (value !== active) {
      const elapsedTime = performance.now() - firstFrameTime.current;
      const currentProgress = (elapsedTime / duration) * 100;
      setProgress(currentProgress);
      targetValue.current = value;
      setIsFastForward(true);
      firstFrameTime.current = performance.now();
    }
  };

  return (
    <ProgressSliderContext.Provider
      value={{ active, progress, handleButtonClick, vertical }}
    >
      <div className={cn('relative', className)}>{children}</div>
    </ProgressSliderContext.Provider>
  );
};

export const SliderContent: FC<SliderContentProps> = ({
  children,
  className,
}) => {
  return <div className={cn('', className)}>{children}</div>;
};

export const SliderWrapper: FC<SliderWrapperProps> = ({
  children,
  value,
  className,
}) => {
  const { active } = useProgressSliderContext();

  return (
    <AnimatePresence mode='popLayout'>
      {active === value && (
        <motion.div
          key={value}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn('', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SliderBtnGroup: FC<ProgressBarProps> = ({
  children,
  className,
}) => {
  return <div className={cn('', className)}>{children}</div>;
};

export const SliderBtn: FC<SliderBtnProps> = ({
  children,
  value,
  className,
  progressBarClass,
}) => {
  const { active, progress, handleButtonClick, vertical } =
    useProgressSliderContext();

  return (
    <button
      className={cn(
        `relative ${active === value ? 'opacity-100' : 'opacity-50'}`,
        className
      )}
      onClick={() => handleButtonClick(value)}
    >
      {children}
      <div
        className='absolute inset-0 overflow-hidden -z-10 max-h-full max-w-full '
        role='progressbar'
        aria-valuenow={active === value ? progress : 0}
      >
        <span
          className={cn('absolute left-0 ', progressBarClass)}
          style={{
            [vertical ? 'height' : 'width']:
              active === value ? `${progress}%` : '0%',
          }}
        />
      </div>
    </button>
  );
};
```

```tsx
import React, { useState, useEffect, useRef } from 'react';

// --- Data for each slide ---
const slidesData = [
  {
    title: "Generate Code with AI",
    description: "Describe your logic in plain English and watch as the AI generates clean, efficient code in seconds. From Python scripts to complex algorithms.",
    image: "https://images.unsplash.com/photo-1564865878688-9a244444042a?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#fff100",
    textColor: "#000000",
  },
  {
    title: "Debug and Refactor Smarter",
    description: "Paste your buggy code and let the AI identify errors, suggest improvements, and refactor for better readability and performance.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#fff100",
    textColor: "#000000",
  },
  {
    title: "Learn New Languages, Instantly",
    description: "Translate code snippets between languages. Understand syntax and paradigms of a new language by seeing familiar code transformed.",
    image: "https://images.unsplash.com/photo-1608306448197-e83633f1261c?q=80&w=1974&auto=format&fit=crop",
    bgColor: "#fff100",
    textColor: "#000000",
  },
  {
    title: "Automate Your Workflow",
    description: "From writing documentation to generating unit tests, let AI handle the repetitive tasks so you can focus on building great things.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    bgColor: "#fff100",
    textColor: "#000000",
  },
];

// --- Main App Component ---
export function ScrollingFeatureShowcase() {
  // State to track the currently active slide index
  const [activeIndex, setActiveIndex] = useState(0);
  // Ref to the main scrollable container
  const scrollContainerRef = useRef(null);
  // Ref to the sticky content panel
  const stickyPanelRef = useRef(null);

  // --- Scroll Handler ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollableHeight = container.scrollHeight - window.innerHeight;
      const stepHeight = scrollableHeight / slidesData.length;
      const newActiveIndex = Math.min(
        slidesData.length - 1,
        Math.floor(container.scrollTop / stepHeight)
      );
      setActiveIndex(newActiveIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Dynamic styles for the background and text color transitions
  const dynamicStyles = {
    backgroundColor: slidesData[activeIndex].bgColor,
    color: slidesData[activeIndex].textColor,
    transition: 'background-color 0.7s ease, color 0.7s ease',
  };

  // Styles for the grid pattern on the right side
  const gridPatternStyle = {
    '--grid-color': 'rgba(0, 0, 0, 0.12)',
    backgroundImage: `
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
    `,
    backgroundSize: '3.5rem 3.5rem',
  };

  return (
    <div 
      ref={scrollContainerRef}
      className="h-screen w-full overflow-y-auto"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div style={{ height: `${slidesData.length * 100}vh` }}>
        <div ref={stickyPanelRef} className="sticky top-0 h-screen w-full flex flex-col items-center justify-center" style={dynamicStyles}>
          <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full max-w-7xl mx-auto">
            
            {/* Left Column: Text Content, Pagination & Button */}
            <div className="relative flex flex-col justify-center p-8 md:p-16 border-r border-black/10">
              {/* Pagination Bars */}
              <div className="absolute top-16 left-16 flex space-x-2">
                {slidesData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                        const container = scrollContainerRef.current;
                        if(container){
                            const scrollableHeight = container.scrollHeight - window.innerHeight;
                            const stepHeight = scrollableHeight / slidesData.length;
                            container.scrollTo({ top: stepHeight * index, behavior: 'smooth' });
                        }
                    }}
                    className={`h-1 rounded-full transition-all duration-500 ease-in-out ${
                      index === activeIndex ? 'w-12 bg-black/80' : 'w-6 bg-black/20'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="relative h-64 w-full">
                {slidesData.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === activeIndex
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    }`}
                  >
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">{slide.title}</h2>
                    <p className="mt-6 text-lg md:text-xl max-w-md">{slide.description}</p>
                  </div>
                ))}
              </div>

              {/* Get Started Button */}
              <div className="absolute bottom-16 left-16">
                <a
                  href="#get-started"
                  className="px-10 py-4 bg-black text-white font-semibold rounded-full uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Right Column: Image Content with Grid Background */}
            <div className="hidden md:flex items-center justify-center p-8" style={gridPatternStyle}>
              <div className="relative w-[50%] h-[80vh] rounded-2xl overflow-hidden shadow-2xl border-4 border-black/5">
                <div 
                  className="absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateY(-${activeIndex * 100}%)` }}
                >
                  {slidesData.map((slide, index) => (
                    <div key={index} className="w-full h-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                        onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src = `https://placehold.co/800x1200/e2e8f0/4a5568?text=Image+Not+Found`; 
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

```tsx
'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(Observer, SplitText);

interface SectionData {
  text: string;
  img: string;
}

interface AnimatedSectionsProps {
  sections?: SectionData[];
  className?: string;
  headerTitle?: string;
}

const defaultSections: SectionData[] = [
  {
    text: "Whispers of Radiance",
    img: "https://raw.githubusercontent.com/66HEX/free-photos/main/img1.jpeg"
  },
  {
    text: "Ethereal Moments",
    img: "https://raw.githubusercontent.com/66HEX/free-photos/main/img3.jpeg"
  },
  {
    text: "Silent Beauty",
    img: "https://raw.githubusercontent.com/66HEX/free-photos/main/img5.jpeg"
  }
];

const AnimatedSections: React.FC<AnimatedSectionsProps> = ({
  sections = defaultSections,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<any>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const splitHeadingsRef = useRef<SplitText[]>([]);
  const currentIndexRef = useRef<number>(-1);
  const animatingRef = useRef<boolean>(false);
  const sectionsRefs = useRef<HTMLElement[]>([]);
  const imagesRefs = useRef<HTMLDivElement[]>([]);
  const outerRefs = useRef<HTMLDivElement[]>([]);
  const innerRefs = useRef<HTMLDivElement[]>([]);
  const headingRefs = useRef<HTMLHeadingElement[]>([]);
  const counterCurrentRef = useRef<HTMLSpanElement | null>(null);
  const counterNextRef = useRef<HTMLSpanElement | null>(null);
  const counterCurrentSplitRef = useRef<SplitText | null>(null);
  const counterNextSplitRef = useRef<SplitText | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  let loaded = 0;
  sections.forEach((section) => {
    const img = new Image();
    img.src = section.img;
    img.onload = () => {
      loaded++;
      if (loaded === sections.length) {
        setImagesLoaded(true);
      }
    };
    img.onerror = () => {
      loaded++;
      if (loaded === sections.length) {
        setImagesLoaded(true);
      }
    };
  });
}, [sections]);

  const gotoSection = useCallback((index: number, direction: number) => {
    if (!containerRef.current || animatingRef.current) return;

    const sectionsElements = sectionsRefs.current as Element[];
    const images = imagesRefs.current as Element[];
    const outerWrappers = outerRefs.current as Element[];
    const innerWrappers = innerRefs.current as Element[];

    const wrap = gsap.utils.wrap(0, sectionsElements.length);
    index = wrap(index);
    animatingRef.current = true;

    const fromTop = direction === -1;
    const dFactor = fromTop ? -1 : 1;

    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: 'power1.inOut' },
      onComplete: () => {
        animatingRef.current = false;
      }
    });

    timelineRef.current = tl;

    if (currentIndexRef.current >= 0) {
      gsap.set(sectionsElements[currentIndexRef.current], { zIndex: 0 });
      tl.to(images[currentIndexRef.current], { xPercent: -15 * dFactor })
        .set(sectionsElements[currentIndexRef.current], { autoAlpha: 0 });
    }

    gsap.set(sectionsElements[index], { autoAlpha: 1, zIndex: 1 });

    tl.fromTo(
      [outerWrappers[index], innerWrappers[index]],
      {
        xPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor)
      },
      { xPercent: 0 },
      0
    )
      .fromTo(
        images[index],
        { xPercent: 15 * dFactor },
        { xPercent: 0 },
        0
      );

    if (splitHeadingsRef.current[index] && splitHeadingsRef.current[index].lines) {
      const lines = splitHeadingsRef.current[index].lines;

      gsap.set(lines, {
        opacity: 0,
        yPercent: 100
      });

      tl.to(
        lines,
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: {
            each: 0.1,
            from: 'start'
          }
        },
        0.4
      );
    }

    if (counterCurrentRef.current && counterNextRef.current) {
      if (!counterCurrentSplitRef.current) {
        counterCurrentSplitRef.current = new SplitText(counterCurrentRef.current, {
          type: 'lines',
          linesClass: 'line',
          mask: 'lines'
        });
      }

      counterNextRef.current.textContent = String(index + 1);
      gsap.set(counterNextRef.current, { opacity: 1 });

      if (counterNextSplitRef.current) {
        counterNextSplitRef.current.revert();
        counterNextSplitRef.current = null;
      }
      counterNextSplitRef.current = new SplitText(counterNextRef.current, {
        type: 'lines',
        linesClass: 'line',
        mask: 'lines'
      });

      const currentLines = counterCurrentSplitRef.current?.lines || [];
      const nextLines = counterNextSplitRef.current?.lines || [];

      gsap.set(currentLines, { opacity: 1, yPercent: 0 });
      gsap.set(nextLines, { opacity: 1, yPercent: 100 * dFactor });

      tl.to(
        currentLines,
        {
          yPercent: -100 * dFactor,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: { each: 0.1, from: 'start' }
        },
        0.4
      );
      tl.to(
        nextLines,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: { each: 0.1, from: 'start' }
        },
        0.4
      ).add(() => {
        if (counterCurrentSplitRef.current) {
          counterCurrentSplitRef.current.revert();
          counterCurrentSplitRef.current = null;
        }
        if (counterNextSplitRef.current) {
          counterNextSplitRef.current.revert();
          counterNextSplitRef.current = null;
        }
        if (counterCurrentRef.current && counterNextRef.current) {
          counterCurrentRef.current.textContent = counterNextRef.current.textContent;
        }
        gsap.set(counterNextRef.current, { opacity: 0, clearProps: 'all' });
      });
    }

    currentIndexRef.current = index;
    setCurrentIndex(index);
  }, []);

  useGSAP(() => {
  if (!containerRef.current || !imagesLoaded) return;

    gsap.registerPlugin(Observer, SplitText);

    const headings = headingRefs.current as HTMLElement[];
    const outerWrappers = outerRefs.current as Element[];
    const innerWrappers = innerRefs.current as Element[];

    splitHeadingsRef.current = headings.map(
      (heading) =>
        new SplitText(heading, {
          type: 'lines',
          linesClass: 'line',
          mask: 'lines'
        })
    );

    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });

    observerRef.current = Observer.create({
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      onDown: () => {
        if (!animatingRef.current) {
          gotoSection(currentIndexRef.current - 1, -1);
        }
      },
      onUp: () => {
        if (!animatingRef.current) {
          gotoSection(currentIndexRef.current + 1, 1);
        }
      },
      tolerance: 10,
      preventDefault: true
    });

    gotoSection(0, 1);

    return () => {
      if (observerRef.current) {
        observerRef.current.kill();
        observerRef.current = null;
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      splitHeadingsRef.current.forEach((split) => {
        if (split && typeof split.revert === 'function') {
          split.revert();
        }
      });
      splitHeadingsRef.current = [];
      if (counterCurrentSplitRef.current && typeof counterCurrentSplitRef.current.revert === 'function') {
        counterCurrentSplitRef.current.revert();
        counterCurrentSplitRef.current = null;
      }
      if (counterNextSplitRef.current && typeof counterNextSplitRef.current.revert === 'function') {
        counterNextSplitRef.current.revert();
        counterNextSplitRef.current = null;
      }
    };
  }, { scope: containerRef, dependencies: [sections.length, imagesLoaded] });

  return (
    <div 
      ref={containerRef}
      className={`h-screen w-screen overflow-hidden bg-black text-white uppercase font-sans ${className}`}
    >
      {/* Section preview thumbnails */}
      <div className="fixed bottom-4 right-6 z-30 flex items-center gap-4">
        <div className="flex gap-2">
          {sections.map((section, i) => (
            <div
              key={`thumb-${i}`}
              className="w-12 h-8 rounded overflow-hidden relative cursor-pointer transition-transform duration-300"
              onClick={() => {
                if (currentIndex !== i && !animatingRef.current) {
                  const direction = i > currentIndex ? 1 : -1;
                  gotoSection(i, direction);
                }
              }}
            >
              <img
                src={section.img}
                alt={`Section ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div 
                 className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-in-out ${
                   currentIndex !== i ? 'opacity-50' : 'opacity-0'
                 }`} 
               />
            </div>
          ))}
        </div>
        
        {/* Counter */}
        <div className="text-xs md:text-sm tracking-wider flex items-center gap-1">
          <div className="relative overflow-hidden h-[1em] leading-[1em] min-w-[0.8em]">
            <span ref={counterCurrentRef} className="block">1</span>
            <span ref={counterNextRef} className="block absolute left-0 top-0 opacity-0">2</span>
          </div>
          <span className="opacity-70">/ {sections.length}</span>
        </div>
      </div>

      {sections.map((section, i) => (
        <section 
          key={`section-${i}`} 
          className="fixed top-0 h-full w-full invisible"
          ref={(el) => { if (el) sectionsRefs.current[i] = el; }}
        >
          <div className="outer w-full h-full overflow-hidden" ref={(el) => { if (el) outerRefs.current[i] = el; }}>
            <div className="inner w-full h-full overflow-hidden" ref={(el) => { if (el) innerRefs.current[i] = el; }}>
              <div
                className="bg flex items-center justify-center absolute top-0 h-full w-full bg-cover bg-center"
                ref={(el) => { if (el) imagesRefs.current[i] = el; }}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%), url("${section.img}")`
                }}
              >
                <h2 className="section-heading text-white text-center font-semibold w-[90vw] max-w-[1200px] text-[clamp(1rem,4vw,9rem)] normal-case leading-none z-10" ref={(el) => { if (el) headingRefs.current[i] = el; }}>
                  {section.text}
                </h2>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default AnimatedSections;
```

```tsx
// components/ui/sparks-carousel.tsx
import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

// Define the type for a single item in the carousel
export interface SparkItem {
  id: string | number;
  imageSrc: string;
  title: string;
  count: number;
  countLabel: string;
}

// Define the props for the main component
export interface SparksCarouselProps {
  title: string;
  subtitle: string;
  items: SparkItem[];
}

export const SparksCarousel = React.forwardRef<
  HTMLDivElement,
  SparksCarouselProps
>(({ title, subtitle, items }, ref) => {
  const controls = useAnimation();
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [isAtEnd, setIsAtEnd] = React.useState(false);

  // Function to scroll the carousel
  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.8; // Scroll by 80% of the visible width
      const newScrollLeft =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };
  
  // Effect to check scroll position and update button states
  React.useEffect(() => {
    const checkScrollPosition = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setIsAtStart(scrollLeft < 10);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
      }
    };

    const currentRef = carouselRef.current;
    if (currentRef) {
        // Initial check
        checkScrollPosition();
        currentRef.addEventListener("scroll", checkScrollPosition);
    }
    
    // Check again on window resize
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [items]);

  return (
    <section ref={ref} className="w-full py-8" aria-labelledby="sparks-title">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <a href="#" className="group inline-flex items-center">
              <h2 id="sparks-title" className="text-2xl md:text-3xl font-bold tracking-tight text-card-foreground">
                {title}
              </h2>
              <ChevronRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="mt-1 text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex w-full space-x-4 overflow-x-auto pb-4 scrollbar-hide"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className="group w-[280px] flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
                  <img
                    alt={item.title}
                    className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
                    height="160"
                    src={item.imageSrc}
                    width="280"
                  />
                  <div className="p-4">
                    <h3 className="text-md font-semibold leading-tight text-card-foreground">
                      {item.title}
                    </h3>
                    <div className="mt-4">
                      <p className="text-xl font-bold">{item.count}</p>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {item.countLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {!isAtStart && (
            <button
              onClick={() => scroll("left")}
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/60 backdrop-blur-sm border text-foreground shadow-md transition-opacity hover:bg-background/80 disabled:opacity-0"
              )}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {!isAtEnd && (
            <button
              onClick={() => scroll("right")}
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/60 backdrop-blur-sm border text-foreground shadow-md transition-opacity hover:bg-background/80 disabled:opacity-0"
              )}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

SparksCarousel.displayName = "SparksCarousel";
```

```tsx
"use client";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const progressNode = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]); 

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(
    emblaApi,
    progressNode as React.RefObject<HTMLElement>
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom ml-auto mr-3">
          {slides.map((slideContent, index) => (
            <div className="flex-[0_0_70%]  pl-3 transform-gpu" key={index}>
              {slideContent}
            </div>
          ))}
        </div>
      </div>

      <div className="flex mx-auto max-w-80 justify-between items-center gap-3 mt-7">
        <div className="flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() =>
                onAutoplayButtonClick(() => onDotButtonClick(index))
              }
              className={`w-3 h-3 rounded-full border-2 border-border transition-colors duration-200 ${
                index === selectedIndex
                  ? "bg-foreground"
                  : "bg-transparent hover:bg-muted"
              }`}
            />
          ))}
        </div>

        <div
          className={`rounded-[1.8rem] border-2 border-border bg-background relative h-2 justify-self-center self-center w-40 max-w-[90%] overflow-hidden transition-opacity duration-300 ease-in-out ${
            showAutoplayProgress ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="bg-foreground absolute w-full top-0 bottom-0 -left-full animate-[autoplay-progress_linear_1] [animation-play-state:running]"
            ref={progressNode}
            style={{
              animationPlayState: showAutoplayProgress ? "running" : "paused",
            }}
          />
        </div>

        <Button size={'icon'} variant={"secondary"} onClick={toggleAutoplay} type="button">
          {autoplayIsPlaying ? (
            <Pause fill="currentColor" />
          ) : (
            <Play fill="currentColor" />
          )}
        </Button>
      </div>
    </div>
  );
};

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

export const DotButton: React.FC<PropTypeButton> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

type UseAutoplayProgressType = {
  showAutoplayProgress: boolean;
};

export const useAutoplayProgress = <ProgressElement extends HTMLElement>(
  emblaApi: EmblaCarouselType | undefined,
  progressNode: React.RefObject<ProgressElement>
): UseAutoplayProgressType => {
  const [showAutoplayProgress, setShowAutoplayProgress] = useState(false);
  const animationName = useRef("");
  const timeoutId = useRef(0);
  const rafId = useRef(0);

  const startProgress = useCallback((timeUntilNext: number | null) => {
    const node = progressNode.current;

    if (!node) return;
    if (timeUntilNext === null) return;

    if (!animationName.current) {
      const style = window.getComputedStyle(node);
      animationName.current = style.animationName;
    }

    node.style.animationName = "none";
    node.style.transform = "translate3d(0,0,0)";

    rafId.current = window.requestAnimationFrame(() => {
      timeoutId.current = window.setTimeout(() => {
        node.style.animationName = animationName.current;
        node.style.animationDuration = `${timeUntilNext}ms`;
      }, 0);
    });

    setShowAutoplayProgress(true);
  }, []);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    emblaApi
      .on("autoplay:timerset", () => startProgress(autoplay.timeUntilNext()))
      .on("autoplay:timerstopped", () => setShowAutoplayProgress(false));
  }, [emblaApi]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(timeoutId.current);
    };
  }, []);

  return {
    showAutoplayProgress,
  };
};

type UseAutoplayType = {
  autoplayIsPlaying: boolean;
  toggleAutoplay: () => void;
  onAutoplayButtonClick: (callback: () => void) => void;
};

export const useAutoplay = (
  emblaApi: EmblaCarouselType | undefined
): UseAutoplayType => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

  const onAutoplayButtonClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    setAutoplayIsPlaying(autoplay.isPlaying());
    emblaApi
      .on("autoplay:play", () => setAutoplayIsPlaying(true))
      .on("autoplay:stop", () => setAutoplayIsPlaying(false))
      .on("reInit", () => setAutoplayIsPlaying(autoplay.isPlaying()));
  }, [emblaApi]);

  return {
    autoplayIsPlaying,
    toggleAutoplay,
    onAutoplayButtonClick,
  };
};

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropTypeButton = React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const PrevButton: React.FC<PropTypeButton> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-border bg-transparent text-foreground disabled:text-muted-foreground"
      type="button"
      {...restProps}
    >
      <ChevronLeft />
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropTypeButton> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-border bg-transparent text-foreground disabled:text-muted-foreground"
      type="button"
      {...restProps}
    >
      <ChevronRight />
      {children}
    </button>
  );
};

export { Carousel };
```

```tsx
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageCarouselHero() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      alt: 'Team collaborating in a modern office space',
    },
    {
      src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      alt: 'Designer working on a digital interface',
    },
    {
      src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      alt: 'Modern workspace with digital devices',
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPreviousImage}
          className="bg-background/30 hover:bg-background/50 absolute top-1/2 left-4 z-20 hidden -translate-y-1/2 rounded-full p-2 backdrop-blur-sm transition-colors md:block"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>

        <button
          onClick={goToNextImage}
          className="bg-background/30 hover:bg-background/50 absolute top-1/2 right-4 z-20 hidden -translate-y-1/2 rounded-full p-2 backdrop-blur-sm transition-colors md:block"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2.5 w-2.5 rounded-full ${
                index === currentImageIndex
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/80'
              } transition-colors`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex min-h-[600px] flex-col items-center justify-center px-4 py-24 text-center md:px-6 md:py-32 2xl:max-w-[1400px]">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
              <span>Launching Soon</span>
            </div>
            <h1 className="text-primary-foreground dark:text-primary text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Build exceptional digital experiences
            </h1>
            <p className="text-primary-foreground dark:text-primary text-xl">
              Our platform helps you create stunning websites and applications
              with ease, designed to engage your audience and drive results.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              variant="secondary"
              className="bg-primary-foreground text-primary dark:bg-primary dark:text-primary-foreground"
            >
              <a href="#">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

```tsx

```

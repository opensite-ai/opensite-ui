```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface PromoBanner2Props {
  message?: string;
  discount?: string;
  link?: string;
  linkText?: string;
  className?: string;
}

const PromoBanner2 = ({
  message = "Winter Sale",
  discount = "Up to 50% off",
  link = "#",
  linkText = "Shop Now",
  className,
}: PromoBanner2Props) => {
  return (
    <div
      className={cn(
        "w-full bg-primary text-primary-foreground",
        className,
      )}
    >
      <div className="container py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-sm">
          <span className="font-semibold">{message}</span>
          <span className="hidden sm:inline">·</span>
          <span>{discount}</span>
          <a
            href={link}
            className="inline-flex items-center gap-1 font-medium underline underline-offset-4 hover:no-underline"
          >
            {linkText}
            <ArrowRight className="size-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export { PromoBanner2 };


```

```tsx
"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

interface PromoBanner5Props {
  endTime?: Date;
  message?: string;
  description?: string;
  className?: string;
}

const PromoBanner5 = ({
  endTime,
  message = "Flash Sale Ends In",
  description = "Up to 50% off on selected items",
  className,
}: PromoBanner5Props) => {
  const defaultEndTime = useMemo(
    () => new Date(Date.now() + 24 * 60 * 60 * 1000),
    [],
  );
  const targetTime = endTime ?? defaultEndTime;

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetTime.getTime();
      const diff = target - now;

      if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div
      className={cn(
        "w-full bg-red-600 text-white",
        className,
      )}
    >
      <div className="container py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
          <span className="font-medium">{message}</span>
          <div className="flex items-center gap-1 font-mono text-lg font-bold">
            <span className="rounded bg-red-700 px-2 py-0.5">
              {pad(timeLeft.hours)}
            </span>
            <span>:</span>
            <span className="rounded bg-red-700 px-2 py-0.5">
              {pad(timeLeft.minutes)}
            </span>
            <span>:</span>
            <span className="rounded bg-red-700 px-2 py-0.5">
              {pad(timeLeft.seconds)}
            </span>
          </div>
          <span className="text-red-100">{description}</span>
        </div>
      </div>
    </div>
  );
};

export { PromoBanner5 };


```

```tsx
"use client";

import { Gift } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

interface PromoBanner3Props {
  deliveryDate?: string;
  cutoffTime?: Date;
  className?: string;
}

const PromoBanner3 = ({
  deliveryDate = "Dec 24",
  cutoffTime,
  className,
}: PromoBanner3Props) => {
  const defaultCutoffTime = useMemo(
    () => new Date(Date.now() + 4 * 60 * 60 * 1000),
    [],
  );
  const targetTime = cutoffTime ?? defaultCutoffTime;

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetTime.getTime();
      const diff = target - now;

      if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className={cn("w-full bg-amber-500 text-amber-950", className)}>
      <div className="container py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Gift className="size-4" />
            <span>
              Order within{" "}
              <span className="font-mono font-bold">
                {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:
                {pad(timeLeft.seconds)}
              </span>{" "}
              for delivery by{" "}
              <span className="font-semibold">{deliveryDate}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PromoBanner3 };

```

```tsx
import { Button } from "@/components/ui/button";
import { Boat, X } from "@mynaui/icons-react";

export default function Banner1() {
  return (
    <div className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <Boat className="size-5 stroke-2 shrink-0" />
          <span className="font-medium text-sm">
            🚀 Introducing our new AI-powered dashboard - Now available!
          </span>
          <Button variant="secondary" size="sm">
            Learn More
          </Button>
        </div>
        <Button variant="outline" className="size-8">
          <X className="size-4 stroke-2" />
          <span className="sr-only">Dismiss banner</span>
        </Button>
      </div>
    </div>
  );
}

```

```tsx
import { Button } from "@/components/ui/button";
import { Shield, X } from "@mynaui/icons-react";

export default function Banners2() {
  return (
    <div className="bg-background border-t absolute bottom-0 left-0 right-0 z-50">
      <div className="flex items-start justify-between gap-4 max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-start gap-4">
          <Shield className="size-5 mt-0.5 stroke-2 shrink-0" />
          <div>
            <h3 className="font-semibold text-sm">
              Privacy Policy Updated
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              We&apos;ve updated our privacy policy to better protect your data.
              Please review the changes.
            </p>
            <Button variant="link" className="text-primary px-0 h-auto mt-2">
              Review Changes →
            </Button>
          </div>
        </div>
        <Button variant={"outline"} className="size-8">
          <X className="size-4 stroke-2" />
          <span className="sr-only">Dismiss banner</span>
        </Button>
      </div>
    </div>
  );
}

```


```tsx
import { Button } from "@/components/ui/button";
import { ShoppingBag, X } from "@mynaui/icons-react";

export default function Banners2() {
  return (
    <div className="bg-background border-b text-sm">
      <div className="flex md:items-center justify-between max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="size-5 stroke-2 shrink-0 hidden md:block" />
          <div className="flex flex-col md:flex-row gap-1">
            <span className="font-medium">
              Help us improve!
            </span>
            <span className="text-muted-foreground">
              Take our 2-minute survey and get 20% off your next purchase.
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm">
            Take Survey
          </Button>
          <Button variant="outline" className="size-8">
            <X className="size-4 stroke-2" />
            <span className="sr-only">Dismiss banner</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

```

```tsx
import { Button } from "@/components/ui/button";
import { Users, X } from "@mynaui/icons-react";

export default function Banners2() {
  return (
    <div className="bg-linear-to-r from-pink-500 to-rose-500 text-white">
      <div className="max-w-7xl mx-auto px-3 py-3 flex items-center justify-center text-left md:text-center gap-2">
        <Users className="size-5 stroke-2 shrink-0" />
        <span className="font-medium">
          Follow us on social media for the latest updates and tips!
        </span>
        <Button variant="secondary" size="sm" className="ml-4">
          Follow Us
        </Button>
        <Button variant="ghost" className="size-8">
          <X className="size-4 stroke-2" />
          <span className="sr-only">Dismiss banner</span>
        </Button>
      </div>
    </div>
  );
}

```

```tsx
import { Button } from "@/components/ui/button";
import { Globe, X } from "@mynaui/icons-react";

export default function Banners2() {
  return (
    <div className="bg-background border-t absolute bottom-0 left-0 right-0 z-50">
      <div className="flex items-start justify-between gap-4 max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-start gap-3">
          <Globe className="size-5 stroke-2 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-sm">
              Your Privacy Rights
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Under GDPR, you have the right to access, update, or delete your
              personal data.
              <Button
                variant="link"
                className="p-0 h-auto ml-1"
              >
                Manage your data →
              </Button>
            </p>
          </div>
        </div>
        <Button variant="ghost" className="size-8">
          <X className="size-4 stroke-2" />
          <span className="sr-only">Dismiss banner</span>
        </Button>
      </div>
    </div>
  );
}

```

```tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function WithAction() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex items-center justify-between gap-x-6 p-4">
          <div className="flex flex-wrap justify-between w-full items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6">
              <strong className="font-semibold">GeneriCon 2024</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              Join us in Denver from June 7 - 9 to see what&apos;s coming next.
            </p>
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center gap-x-1"
            >
              Register now <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

```

```tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Floating() {
  return (
    <>
      {/* Container */}
      <div className="container mx-auto relative py-24 lg:py-32">
        {/* Floating Banner */}
        <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
          <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-primary px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
            <p className="text-sm leading-6 text-primary-foreground">
              <strong className="font-semibold">Limited time offer</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              Get 50% off for your first month
            </p>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-x-1"
            >
              Get started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* End of Floating Banner */}
      </div>
      {/* End of Container */}
    </>
  );
}

```

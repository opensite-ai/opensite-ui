```tsx
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

// Features for each pricing tier
const freeFeatures = [
  "Live Collaboration",
  "1 GB Storage",
  "2 Projects",
  "Basic Support",
  "Limited Customization",
  "Limited Integration",
  "Limited API Access",
];

const proFeatures = [
  "2 Team Members",
  "10 GB Storage",
  "10 Projects",
  "Priority Support",
  "Full Customization",
  "Full Integration",
  "Full API Access",
];

const premiumFeatures = [
  "5 Team Members",
  "50 GB Storage",
  "50 Projects",
  "Dedicated Support",
  "Advanced Customization",
  "Analytics",
  "Reports",
];

const entrepriseFeatures = [
  "10+ Team Members",
  "100+ GB Storage",
  "100+ Projects",
  "Dedicated Account Manager",
  "Custom Features",
  "Custom Support",
  "Custom Integration",
];

// Pricing tier type definition
type PricingTier = {
  name: string;
  description: string;
  price: string;
  bgClass: string;
  interval: string;
  buttonText: string;
  buttonVariant:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
  features: string[];
  comparison: string;
  hasPurchaseOption: boolean;
};

// Pricing tier data
const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    description: "For personal use only with limited features and support",
    price: "0",
    bgClass: "",
    interval: "Includes 1 user.",
    buttonText: "Get Started",
    buttonVariant: "outline",
    features: freeFeatures,
    comparison: "Features",
    hasPurchaseOption: false,
  },
  {
    name: "Pro",
    description: "For small businesses with all the features and support",
    price: "29",
    bgClass: "bg-muted",
    interval: "Per user, per month.",
    buttonText: "Purchase",
    buttonVariant: "default",
    features: proFeatures,
    comparison: "Everything in Free, and:",
    hasPurchaseOption: true,
  },
  {
    name: "Premium",
    description:
      "For teams and organizations with advanced features and support",
    price: "59",
    bgClass: "",
    interval: "Per user, per month.",
    buttonText: "Purchase",
    buttonVariant: "outline",
    features: premiumFeatures,
    comparison: "Everything in Pro, and:",
    hasPurchaseOption: true,
  },
  {
    name: "Entreprise",
    description:
      "For large companies with custom features and support and a dedicated account manager",
    price: "",
    bgClass: "",
    interval: "",
    buttonText: "Contact sales",
    buttonVariant: "outline",
    features: entrepriseFeatures,
    comparison: "Everything in Premium, and:",
    hasPurchaseOption: false,
  },
];

const PricingCard = ({
  tier,
  className,
}: {
  tier: PricingTier;
  className?: string;
}) => {
  return (
    <div className={cn("flex h-full flex-col", tier.bgClass, className)}>
      {/* Card top part with fixed height */}
      <div className="h-[360px] flex-none">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="px-8 pt-8 pb-3">
            <h3 className="text-3xl font-semibold">{tier.name}</h3>
          </div>

          {/* Description */}
          <div className="px-8 pb-6">
            <p className="line-clamp-2 text-balance text-muted-foreground">
              {tier.description}
            </p>
          </div>

          {/* Price */}
          <div className="flex grow flex-col justify-start px-8 pb-6">
            {tier.price && (
              <div className="mb-4 flex items-start justify-center">
                <div className="text-center">
                  <div className="flex items-start justify-center">
                    <span className="mt-2 text-lg font-semibold">$</span>
                    <span className="text-6xl font-semibold">{tier.price}</span>
                  </div>
                  {tier.interval && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {tier.interval}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="mt-auto px-8 pb-8">
            <Button variant={tier.buttonVariant} className="w-full py-6">
              {tier.buttonText}
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grow border-t p-8 text-left">
        <p className="mb-4 text-lg font-semibold">{tier.comparison}</p>
        <ul className="space-y-4">
          {tier.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center gap-3">
              <Check className="size-5 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface Pricing1Props {
  className?: string;
}

const Pricing1 = ({ className }: Pricing1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto mb-20 max-w-5xl text-center">
          <h2 className="mb-3 text-4xl font-bold text-pretty lg:text-6xl">
            Pricing
          </h2>
          <p className="text-muted-foreground lg:text-xl">
            Check out our affordable pricing plans below and choose the one that
            suits you best. If you need a custom plan, please contact us.
          </p>
        </div>

        {/* Grid layout for pricing tiers */}
        <div className="mx-auto grid max-w-xl rounded-md border lg:max-w-none lg:grid-cols-4 lg:divide-x">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className={`${tier.bgClass} h-full`}>
              <PricingCard tier={tier} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Pricing1 };

```

```tsx
"use client";

import { CircleCheck } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  button: {
    text: string;
    url: string;
  };
}

interface Pricing2Props {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
  className?: string;
}

const Pricing2 = ({
  heading = "Pricing",
  description = "Check out our affordable pricing plans",
  plans = [
    {
      id: "plus",
      name: "Plus",
      description: "For personal use",
      monthlyPrice: "$19",
      yearlyPrice: "$179",
      features: [
        { text: "Up to 5 team members" },
        { text: "Basic components library" },
        { text: "Community support" },
        { text: "1GB storage space" },
      ],
      button: {
        text: "Purchase",
        url: "https://shadcnblocks.com",
      },
    },
    {
      id: "pro",
      name: "Pro",
      description: "For professionals",
      monthlyPrice: "$49",
      yearlyPrice: "$359",
      features: [
        { text: "Unlimited team members" },
        { text: "Advanced components" },
        { text: "Priority support" },
        { text: "Unlimited storage" },
      ],
      button: {
        text: "Purchase",
        url: "https://shadcnblocks.com",
      },
    },
  ],
  className,
}: Pricing2Props) => {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-semibold text-pretty lg:text-6xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-xl">{description}</p>
          <div className="flex items-center gap-3 text-lg">
            Monthly
            <Switch
              checked={isYearly}
              onCheckedChange={() => setIsYearly(!isYearly)}
            />
            Yearly
          </div>
          <div className="flex flex-col items-stretch gap-6 md:flex-row">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className="flex w-80 flex-col justify-between text-left"
              >
                <CardHeader>
                  <CardTitle>
                    <p>{plan.name}</p>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="flex items-end">
                    <span className="text-4xl font-semibold">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-2xl font-semibold text-muted-foreground">
                      {isYearly ? "/yr" : "/mo"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-6" />
                  {plan.id === "pro" && (
                    <p className="mb-3 font-semibold">
                      Everything in Plus, and:
                    </p>
                  )}
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CircleCheck className="size-4" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full">
                    <a href={plan.button.url} target="_blank">
                      {plan.button.text}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing2 };

```

```tsx
"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface Pricing3Props {
  className?: string;
}

const Pricing3 = ({ className }: Pricing3Props) => {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-6 text-4xl font-bold text-pretty lg:text-6xl">
            Our affordable pricing
          </h2>
          <p className="text-muted-foreground lg:text-xl">
            Check out our pricing plans to find the best fit for you.
          </p>
          <div className="mt-10 flex items-center gap-3 font-medium">
            <Switch
              onCheckedChange={() => setIsYearly(!isYearly)}
              checked={isYearly}
            />
            Annual billing
          </div>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex flex-col justify-between gap-10 rounded-lg border p-6">
              <div>
                <p className="mb-2 text-lg font-semibold">Basic Plan</p>
                <p className="mb-4 text-4xl font-semibold">$0</p>
                <p className="text-sm text-muted-foreground">
                  Ideal for individuals getting started with our service. No
                  credit card required.
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Start for Free
              </Button>
            </div>
            <ul className="mt-8 px-6">
              <li className="flex gap-2">
                <Check className="w-4" />
                <p className="text-sm text-muted-foreground">
                  <span className="mr-1 font-semibold text-primary">
                    Limited access to features:
                  </span>
                  3 users, 1 project, 1GB storage
                </p>
              </li>
              <Separator className="my-4" />
              <li className="flex gap-2">
                <Check className="w-4" />
                <p className="text-sm text-muted-foreground">
                  <span className="mr-1 font-semibold text-primary">
                    Basic support:
                  </span>
                  Email support only for 30 days after signup
                </p>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex flex-col justify-between gap-10 rounded-lg border p-6">
              <div>
                <p className="mb-2 text-lg font-semibold">Standard Plan</p>
                <p className="mb-4 text-4xl font-semibold">
                  {isYearly ? "$199" : "$20"}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    per user
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Perfect for small businesses looking to grow. Start with a
                  30-day free trial.
                </p>
              </div>
              <Button className="w-full">Try for Free</Button>
            </div>
            <ul className="mt-8 px-6">
              <li className="flex gap-2">
                <Check className="w-4" />
                <p className="text-sm text-muted-foreground">
                  <span className="mr-1 font-semibold text-primary">
                    Access to all standard features:
                  </span>
                  10 users, 5 projects, 5GB storage
                </p>
              </li>
              <Separator className="my-4" />
              <li className="flex gap-2">
                <Check className="w-4" />
                <p className="text-sm text-muted-foreground">
                  <span className="mr-1 font-semibold text-primary">
                    Priority support:
                  </span>
                  Email and phone support for 30 days after signup
                </p>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex flex-col justify-between gap-10 rounded-lg border p-6">
              <div>
                <p className="mb-2 text-lg font-semibold">Premium Plan</p>
                <p className="mb-4 text-4xl font-semibold">Custom</p>
                <p className="text-sm text-muted-foreground">
                  Best for large organizations with advanced needs. Contact us
                  for a custom quote.
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
            <ul className="mt-8 px-6">
              <li className="flex gap-2">
                <Check className="w-4" />
                <p className="text-sm text-muted-foreground">
                  <span className="mr-1 font-semibold text-primary">
                    Dedicated support:
                  </span>
                  24/7 email and phone support
                </p>
              </li>
              <Separator className="my-4" />
              <li className="flex gap-2">
                <Check className="w-4" />
                <p className="text-sm text-muted-foreground">
                  <span className="mr-1 font-semibold text-primary">
                    Custom integrations:
                  </span>
                  Tailored to your organization&apos;s needs
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing3 };

```

```tsx
"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

interface PricingPlan {
  name: string;
  badge: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

interface Pricing4Props {
  title?: string;
  description?: string;
  plans?: PricingPlan[];
  className?: string;
}

const Pricing4 = ({
  title = "Pricing",
  description = "Check out our affordable pricing plans.",
  plans = [
    {
      name: "Free",
      badge: "Free",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      features: [
        "Unlimited Integrations",
        "Windows, Linux, Mac support",
        "24/7 Support",
        "Free updates",
      ],
      buttonText: "Get Started",
    },
    {
      name: "Pro",
      badge: "Pro",
      monthlyPrice: "$29",
      yearlyPrice: "$249",
      features: [
        "Everything in FREE",
        "Live call suport every month",
        "Unlimited Storage",
      ],
      buttonText: "Purchase",
    },
    {
      name: "Elite",
      badge: "Elite",
      monthlyPrice: "$59",
      yearlyPrice: "$549",
      features: [
        "Everything in PRO",
        "Advanced analytics",
        "Custom branding",
        "Unlimited users",
      ],
      buttonText: "Purchase",
      isPopular: true,
    },
  ],
  className,
}: Pricing4Props) => {
  const [isAnnually, setIsAnnually] = useState(false);
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <h2 className="text-4xl font-bold text-pretty lg:text-6xl">
            {title}
          </h2>
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <p className="max-w-3xl text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex h-11 w-fit shrink-0 items-center rounded-md bg-muted p-1 text-lg">
              <RadioGroup
                defaultValue="monthly"
                className="h-full grid-cols-2"
                onValueChange={(value) => {
                  setIsAnnually(value === "annually");
                }}
              >
                <div className='h-full rounded-md transition-all has-[button[data-state="checked"]]:bg-background'>
                  <RadioGroupItem
                    value="monthly"
                    id="monthly"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="monthly"
                    className="flex h-full cursor-pointer items-center justify-center px-7 font-semibold text-muted-foreground peer-data-[state=checked]:text-primary"
                  >
                    Monthly
                  </Label>
                </div>
                <div className='h-full rounded-md transition-all has-[button[data-state="checked"]]:bg-background'>
                  <RadioGroupItem
                    value="annually"
                    id="annually"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="annually"
                    className="flex h-full cursor-pointer items-center justify-center gap-1 px-7 font-semibold text-muted-foreground peer-data-[state=checked]:text-primary"
                  >
                    Yearly
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="flex w-full flex-col items-stretch gap-6 md:flex-row">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`flex w-full flex-col rounded-lg border p-6 text-left ${
                  plan.isPopular ? "bg-muted" : ""
                }`}
              >
                <Badge className="mb-8 block w-fit uppercase">
                  {plan.badge}
                </Badge>
                <span className="text-4xl font-medium">
                  {isAnnually ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <p
                  className={`text-muted-foreground ${plan.monthlyPrice === "$0" ? "invisible" : ""}`}
                >
                  {isAnnually ? "Per year" : "Per month"}
                </p>
                <Separator className="my-6" />
                <div className="flex h-full flex-col justify-between gap-20">
                  <ul className="space-y-4 text-muted-foreground">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <Check className="size-4" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">{plan.buttonText}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing4 };

```

```tsx
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PlanFeature = {
  feature: string;
  pro: string | boolean;
  entreprise: string | boolean;
};

const planData: PlanFeature[] = [
  {
    feature: "Projects",
    pro: "Unlimited",
    entreprise: "Unlimited",
  },
  {
    feature: "Integrations",
    pro: "Unlimited",
    entreprise: "Unlimited",
  },
  { feature: "Live Collaboration", pro: true, entreprise: true },
  {
    feature: "Custom permissions",
    pro: true,
    entreprise: true,
  },
  {
    feature: "Team members",
    pro: "$5/month per member",
    entreprise: "$5/month per member",
  },
  {
    feature: "Basic reports",
    pro: true,
    entreprise: true,
  },
  { feature: "Advanced reports", pro: false, entreprise: true },
  { feature: "Export data", pro: false, entreprise: true },
];
interface Pricing5Props {
  className?: string;
}

const Pricing5 = ({ className }: Pricing5Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-5xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="mb-2 text-3xl font-semibold lg:text-5xl">Pricing</h2>
          <p className="text-muted-foreground lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:gap-0">
          <Card className="flex w-full flex-col justify-between gap-8 text-center lg:rounded-r-none lg:border-r-0">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <p className="text-muted-foreground">Lorem ipsum dolor sit.</p>
            </CardHeader>
            <CardContent>
              <span className="text-5xl font-bold">$10</span>
              <p className="mt-3 text-muted-foreground">per user per month</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          <Separator
            orientation="vertical"
            className="hidden h-auto lg:block"
          />
          <Card className="flex w-full flex-col justify-between gap-8 rounded-l-none border-l-0 text-center">
            <CardHeader>
              <CardTitle>Entreprise</CardTitle>
              <p className="text-muted-foreground">Lorem ipsum dolor sit.</p>
            </CardHeader>
            <CardContent>
              <span className="text-4xl font-bold">Contact us</span>
              <p className="mt-3 text-muted-foreground">Get in touch with us</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Table className="mt-10 min-w-[420px]">
          <TableHeader>
            <TableRow className="hover:bg-background">
              <TableHead></TableHead>
              <TableHead className="font-bold text-primary">Pro</TableHead>
              <TableHead className="font-bold text-primary">
                Entreprise
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {planData.map((item) => (
              <TableRow key={item.feature} className="hover:bg-background">
                <TableCell>{item.feature}</TableCell>
                <TableCell>
                  {typeof item.pro === "boolean" ? (
                    item.pro ? (
                      <Check className="size-6" />
                    ) : (
                      <Minus className="size-6" />
                    )
                  ) : (
                    item.pro
                  )}
                </TableCell>
                <TableCell>
                  {typeof item.entreprise === "boolean" ? (
                    item.entreprise ? (
                      <Check className="size-6" />
                    ) : (
                      <Minus className="size-6" />
                    )
                  ) : (
                    item.entreprise
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export { Pricing5 };

```

```tsx
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Pricing6Props {
  heading: string;
  description?: string;
  price?: string | number;
  priceSuffix?: string;
  features?: string[][];
  buttonText?: string;
  className?: string;
}

const defaultFeatures = [
  ["Unlimited", "Integrations", "24/7 support"],
  ["Live collaborations", "Unlimited storage", "30-day money back"],
  ["Unlimited members", "Customization", "Unlimited users"],
];

const Pricing6 = ({
  heading = "Pricing",
  description = "Simple pricing with a free 7 day trial.",
  price = 29,
  priceSuffix = "/mo",
  features = defaultFeatures,
  buttonText = "Start free trial",
  className,
}: Pricing6Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-semibold text-pretty lg:text-6xl">
            {heading}
          </h2>
          <p className="max-w-md text-muted-foreground lg:text-xl">
            {description}
          </p>
          <div className="mx-auto flex w-full flex-col rounded-lg border p-6 sm:w-fit sm:min-w-80">
            <div className="flex justify-center">
              <span className="text-lg font-semibold">$</span>
              <span className="text-6xl font-semibold">{price}</span>
              <span className="self-end text-muted-foreground">
                {priceSuffix}
              </span>
            </div>
            <div className="my-6">
              {features.map((featureGroup, idx) => (
                <div key={idx}>
                  <ul className="flex flex-col gap-3">
                    {featureGroup.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-2 text-sm font-medium"
                      >
                        {feature} <Check className="inline size-4 shrink-0" />
                      </li>
                    ))}
                  </ul>
                  {idx < features.length - 1 && <Separator className="my-6" />}
                </div>
              ))}
            </div>
            <Button>{buttonText}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing6 };

```

```tsx
"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Pricing7Props {
  className?: string;
}

const Pricing7 = ({ className }: Pricing7Props) => {
  const [isAnnually, setIsAnnually] = useState(false);
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-semibold lg:text-5xl">Pricing</h2>
          <p className="text-muted-foreground lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
            dignissimos aliquam delectus, quasi earum veniam?
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-muted-foreground">Billing cycle</span>
          <div className="flex h-12 items-center rounded-md bg-muted p-1 text-lg">
            <RadioGroup
              defaultValue="monthly"
              className="h-full grid-cols-2"
              onValueChange={(value) => {
                setIsAnnually(value === "annually");
              }}
            >
              <div className='h-full rounded-md transition-all has-[button[data-state="checked"]]:bg-background'>
                <RadioGroupItem
                  value="monthly"
                  id="monthly"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="monthly"
                  className="flex h-full cursor-pointer items-center justify-center px-7 font-semibold text-muted-foreground peer-data-[state=checked]:text-primary"
                >
                  Monthly
                </Label>
              </div>
              <div className='h-full rounded-md transition-all has-[button[data-state="checked"]]:bg-background'>
                <RadioGroupItem
                  value="annually"
                  id="annually"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="annually"
                  className="flex h-full cursor-pointer items-center justify-center gap-1 px-7 font-semibold text-muted-foreground peer-data-[state=checked]:text-primary"
                >
                  Yearly
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-100 px-1.5 text-green-600"
                  >
                    -20%
                  </Badge>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
            <div className="rounded-lg border p-6">
              <div className="flex h-full flex-col justify-between gap-5">
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Basic Plan</h3>
                  <span className="text-5xl font-semibold">
                    {isAnnually ? "$63" : "$79"}
                  </span>
                  <span className="mb-4 block font-semibold">per month</span>
                  <p className="text-muted-foreground">
                    Good for small teams, or small businesses just starting out.
                  </p>
                  <p className="mt-6 mb-3 font-semibold">Includes</p>
                  <ul className="flex flex-col gap-3">
                    <li className="flex gap-2">
                      <Check className="mt-1 size-4 shrink-0" />5 projects limit
                    </li>
                    <li className="flex gap-2">
                      <Check className="mt-1 size-4 shrink-0" />
                      5GB storage
                    </li>
                    <li className="flex gap-2">
                      <Check className="mt-1 size-4 shrink-0" />
                      Up to 3 users
                    </li>
                    <li className="flex gap-2">
                      <Check className="mt-1 size-4 shrink-0" />
                      Support by email only
                    </li>
                    <li className="flex gap-2">
                      <Check className="mt-1 size-4 shrink-0" />
                      No time tracking feature
                    </li>
                  </ul>
                </div>
                <Button>Start a free trial</Button>
              </div>
            </div>
            <div className="rounded-lg border p-6">
              <div className="flex h-full flex-col justify-between gap-5">
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Pro Plan</h3>
                  <span className="text-5xl font-semibold">
                    {isAnnually ? "$239" : "$299"}
                  </span>
                  <span className="mb-4 block font-semibold">per month</span>
                  <p className="text-muted-foreground">
                    Good for medium to large businesses. Get all the features
                    you need.
                  </p>
                  <p className="mt-6 mb-3 font-semibold">
                    Everything in Basic, plus
                  </p>
                  <ul className="flex flex-col gap-3">
                    <li className="flex gap-2">
                      <Check className="mt-1 size-4 shrink-0" />
                      Unlimited projects
                    </li>
                    <li className="flex gap-2">
                      <Check className="mt-1 size-4 shrink-0" />
                      50GB storage
                    </li>
                    <li className="flex gap-2">
                      <Check className="mt-1 size-4 shrink-0" />
                      Unlimited users
                    </li>
                    <li className="flex gap-2">
                      <Check className="mt-1 size-4 shrink-0" />
                      Priority support
                    </li>
                  </ul>
                </div>
                <Button>Start a free trial</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing7 };

```

```tsx
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  "Automated backups",
  "24/7 support",
  "Unlimited projects",
  "Unlimited users",
  "Custom domain",
  "Custom branding",
  "Advanced analytics",
  "Custom permissions",
  "Advanced reports",
];

interface Pricing8Props {
  className?: string;
}

const Pricing8 = ({ className }: Pricing8Props) => {
  return (
    <section className={cn("bg-muted py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="mb-2 text-3xl font-medium lg:text-5xl">Pricing</h2>
          <p className="max-w-lg text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ipsum
            dolorem asperiores expedita!
          </p>
        </div>
        <div className="mt-10">
          <Card className="mx-auto flex w-full max-w-sm flex-col justify-between gap-10 rounded-lg p-6 text-center">
            <p className="text-2xl">Starting at</p>
            <div>
              <div className="flex justify-center">
                <span className="text-lg">$</span>
                <span className="text-4xl font-medium lg:text-5xl">
                  16/month
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                With a 7-day free trial
              </p>
            </div>
            <Button className="w-full" size="lg">
              TRY FOR FREE
            </Button>
          </Card>
          <p className="lg:text-1xl mt-8 text-center text-xl font-medium lg:mt-10">
            What&apos;s included in the plan
          </p>
          <ul className="mx-auto mt-4 grid w-fit md:w-auto md:max-w-2xl md:grid-cols-2 md:pl-14 lg:max-w-4xl lg:grid-cols-3">
            {features.map((feature, index) => (
              <li
                key={index}
                className="mt-4 flex items-center gap-2 text-sm font-medium"
              >
                <Check className="size-5" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Pricing8 };

```

```tsx
"use client";

import { CheckIcon, Info, MinusIcon } from "lucide-react";
import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TierName = "Free" | "Pro" | "Premium";

interface Tier {
  name: string;
  price: string;
  annualPrice: string;
  description: string;
}

interface Feature {
  name: string;
  tiers: Partial<Record<TierName, boolean>>;
  tooltip?: string;
}

interface Section {
  name: string;
  features: Feature[];
}

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    annualPrice: "$0",
    description: "Quis suspendisse ut fermentum neque vivamus.",
  },
  {
    name: "Pro",
    price: "$10",
    annualPrice: "$100",
    description: "Quis eleifend a tincidunt pellentesque.",
  },
  {
    name: "Premium",
    price: "$15",
    annualPrice: "$150",
    description: "Orci volutpat ut sed sed neque, dui eget.",
  },
];
const sections: Section[] = [
  {
    name: "Key Features",
    features: [
      {
        name: "Live Collaboration",
        tiers: { Free: true, Pro: true, Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        name: "Unlimited projects",
        tiers: { Free: true, Pro: true, Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        name: "Custom permissions",
        tiers: { Pro: true, Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        name: "Team members",
        tiers: {
          Premium: true,
        },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
    ],
  },
  {
    name: "Reporting",
    features: [
      {
        name: "Basic reports",
        tiers: { Free: true, Pro: true, Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        name: "Advanced reports",
        tiers: { Pro: true, Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        name: "Custom reports",
        tiers: { Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        name: "Export data",
        tiers: { Premium: true },
        tooltip: "Lorem ipsum dolor sit amet, consectetur",
      },
    ],
  },
];

interface Pricing9Props {
  className?: string;
}

const Pricing9 = ({ className }: Pricing9Props) => {
  const [isAnnual, setIsAnnual] = useState(false);
  return (
    <section className={cn("py-24 sm:py-32", className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Choose Your Plan
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
          quasi.
        </p>
        <div className="mt-10 flex flex-col items-center gap-2 lg:hidden">
          <span className="flex items-center gap-3 text-base font-medium">
            Annual
            <Switch
              checked={isAnnual}
              onCheckedChange={() => setIsAnnual(!isAnnual)}
            />
            Monthly
          </span>
        </div>

        <div className="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
          {tiers.map((tier) => (
            <Card key={tier.name} className="p-8">
              <CardHeader className="p-0">
                <div className="flex flex-col gap-2 text-center">
                  <span className="text-xl leading-7 font-bold uppercase">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {tier.description}
                  </span>
                </div>
                <div className="flex flex-col justify-center gap-x-1 pt-8 text-center">
                  <span className="text-4xl font-bold">
                    {isAnnual ? tier.annualPrice : tier.price}
                  </span>
                  <span className="text-sm leading-6 text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardHeader>
              <Button className="mt-8 w-full">Buy plan</Button>
              <CardContent className="p-0">
                <ul className="mt-10 space-y-4 text-sm leading-6">
                  <TooltipProvider>
                    {sections.map((section) => (
                      <li key={section.name}>
                        <ul role="list" className="space-y-4">
                          {section.features.map(
                            (feature) =>
                              feature.tiers[tier.name as TierName] && (
                                <li
                                  key={feature.name}
                                  className="flex items-center justify-between"
                                >
                                  <span className="flex items-center gap-3">
                                    <CheckIcon className="h-5 w-5 flex-none" />
                                    <span>{feature.name}</span>
                                  </span>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      {feature.tooltip}
                                    </TooltipContent>
                                  </Tooltip>
                                </li>
                              ),
                          )}
                        </ul>
                      </li>
                    ))}
                  </TooltipProvider>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="isolate mt-20 hidden lg:block">
          <div className="relative -mx-8">
            {tiers.map((tier, idx) => (
              <div
                className="absolute inset-x-4 inset-y-0 -z-10 flex"
                key={tier.name}
              >
                <div
                  className="flex w-1/4 px-4"
                  style={{
                    marginLeft: `${(idx + 1) * 25}%`,
                  }}
                >
                  <div className="w-full border-x" />
                </div>
              </div>
            ))}
            <table className="w-full table-fixed border-separate border-spacing-x-8 text-left">
              <thead>
                <tr>
                  <td />
                  {tiers.map((tier) => (
                    <th key={tier.name} className="px-6 pt-6 xl:px-8 xl:pt-8">
                      <div className="flex flex-col gap-2 text-center">
                        <span className="text-xl leading-7 font-bold uppercase">
                          {tier.name}
                        </span>
                        <span className="text-sm font-normal text-muted-foreground">
                          {tier.description}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-normal text-muted-foreground">
                        Billings
                      </p>
                      <span className="flex items-center gap-3 text-base font-medium">
                        Annual
                        <Switch
                          checked={isAnnual}
                          onCheckedChange={() => setIsAnnual(!isAnnual)}
                        />
                        Monthly
                      </span>
                    </div>
                  </th>
                  {tiers.map((tier) => (
                    <td key={tier.name} className="px-6 pt-10 xl:px-8">
                      <div className="flex flex-col justify-center gap-x-1 text-center">
                        <span className="text-4xl font-bold">
                          {isAnnual ? tier.annualPrice : tier.price}
                        </span>
                        <span className="text-sm leading-6 text-muted-foreground">
                          /month
                        </span>
                      </div>
                      <Button className="mt-8 w-full">Get Started</Button>
                    </td>
                  ))}
                </tr>
                {sections.map((section, sectionIdx) => (
                  <Fragment key={section.name}>
                    <tr>
                      <th
                        className={cn(
                          "pb-4 text-sm leading-6 font-semibold",
                          sectionIdx === 0 ? "pt-8" : "pt-16",
                        )}
                      >
                        {section.name}
                      </th>
                    </tr>
                    <TooltipProvider delayDuration={200}>
                      {section.features.map((feature) => (
                        <tr key={feature.name}>
                          <th className="flex items-center justify-between py-4 text-sm leading-6 font-normal">
                            {feature.name}
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="ml-1 h-4 w-4 text-muted-foreground hover:text-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>{feature.tooltip}</TooltipContent>
                            </Tooltip>
                          </th>
                          {tiers.map((tier) => (
                            <td key={tier.name} className="px-6 py-4 xl:px-8">
                              <>
                                {feature.tiers[tier.name as TierName] ? (
                                  <CheckIcon className="mx-auto h-5 w-5" />
                                ) : (
                                  <MinusIcon className="mx-auto h-5 w-5 text-muted-foreground" />
                                )}
                              </>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </TooltipProvider>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
export { Pricing9 };

```

```tsx
"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const plans = [
  {
    title: "Free",
    description: "For open source projects",
    price: { monthly: "$9", annually: "$9" },
    href: "#",
    recommended: false,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    featureGroups: [
      {
        title: "Overview",
        features: [
          {
            title: "3 users",
            icon: Check,
          },
        ],
      },
      {
        title: "Highlights",
        features: [
          {
            title: "Included feature",
            icon: Check,
          },
          {
            title: "Not included feature",
            icon: X,
          },
        ],
      },
    ],
  },
  {
    title: "Basic",
    description: "For open source projects",
    price: {
      monthly: "$50",
      annually: (
        <span className="flex items-center">
          $45<Badge className="ml-1">-10%</Badge>
        </span>
      ),
    },
    href: "#",
    recommended: false,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
    featureGroups: [
      {
        title: "Overview",
        features: [
          {
            title: "10 users",
            icon: Check,
          },
        ],
      },
      {
        title: "Highlights",
        features: [
          {
            title: "Included feature",
            icon: Check,
          },
          {
            title: "Not included feature",
            icon: X,
          },
        ],
      },
    ],
  },
  {
    title: "Team",
    description: "For open source projects",
    price: {
      monthly: "$100",
      annually: (
        <span className="flex items-center">
          $90<Badge className="ml-1">-10%</Badge>
        </span>
      ),
    },
    href: "#",
    recommended: true,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg",
    featureGroups: [
      {
        title: "Overview",
        features: [
          {
            title: "50 users",
            icon: Check,
          },
        ],
      },
      {
        title: "Highlights",
        features: [
          {
            title: "Included feature",
            icon: Check,
          },
          {
            title: "Not included feature",
            icon: X,
          },
        ],
      },
    ],
  },
  {
    title: "Enterprise",
    description: "For open source projects",
    price: {
      monthly: "$200",
      annually: (
        <span className="flex items-center">
          $160<Badge className="ml-1">-20%</Badge>
        </span>
      ),
    },
    href: "#",
    recommended: false,
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg",
    featureGroups: [
      {
        title: "Overview",
        features: [
          {
            title: "Unlimited users",
            icon: Check,
          },
        ],
      },
      {
        title: "Highlights",
        features: [
          {
            title: "Included feature",
            icon: Check,
          },
          {
            title: "Not included feature",
            icon: X,
          },
        ],
      },
    ],
  },
];

interface Pricing10Props {
  className?: string;
}

const Pricing10 = ({ className }: Pricing10Props) => {
  const [annualBilling, setAnnualBilling] = useState(false);
  return (
    <section className={cn("py-32", className)}>
      <div className="container mb-8 lg:mb-0">
        <div className="flex flex-col gap-y-12 md:gap-y-16">
          <div className="flex flex-col">
            <h1 className="my-6 text-3xl font-bold text-pretty md:text-4xl xl:text-5xl">
              Pricing Plans
            </h1>
            <p className="text-muted-foreground lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="lg:mb-8">
            <div className="flex h-full flex-col justify-end">
              <div className="flex items-center space-x-2">
                <Switch
                  id="annual-billing"
                  checked={annualBilling}
                  onCheckedChange={setAnnualBilling}
                />
                <Label htmlFor="annual-billing">Annual billing</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-col gap-6 gap-y-8 xl:grid xl:grid-cols-4">
        {plans.map((plan) => (
          <article
            key={plan.title}
            className={`rounded-xl border ${plan.recommended ? "border-primary" : "border-border lg:mt-7"} overflow-clip`}
          >
            {plan.recommended && (
              <div className="flex h-7 items-center justify-center bg-primary text-center text-xs font-semibold text-primary-foreground">
                Recommended
              </div>
            )}
            <header className="p-4 sm:p-6 xl:pt-12">
              <div className="mb-6 md:flex md:items-center xl:block">
                <div className="mb-1 flex md:flex-1 md:flex-row-reverse md:items-center xl:mb-6 xl:flex-col-reverse xl:items-start xl:gap-y-4">
                  <div className="flex-1 md:ml-6 xl:ml-0">
                    <p className="mb-1 text-xl font-medium sm:text-2xl">
                      {plan.title}
                    </p>
                    <p className="text-xs text-muted-foreground sm:text-sm 2xl:min-h-10">
                      {plan.description}
                    </p>
                  </div>
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="size-16 sm:size-20"
                  />
                </div>
                <div>
                  <h2 className="mb-1 flex items-start text-2xl font-medium md:text-3xl 2xl:text-4xl">
                    {annualBilling ? plan.price.annually : plan.price.monthly}
                  </h2>
                  <p className="text-xs font-medium text-muted-foreground">
                    / monthly
                  </p>
                </div>
              </div>
              <div>
                <Button
                  variant={plan.recommended ? "default" : "outline"}
                  className="w-full"
                >
                  Get started for free
                </Button>
              </div>
            </header>
            <main className="space-y-6 border-t border-border p-4 sm:p-6 md:grid md:grid-cols-2 md:space-y-0 xl:block xl:space-y-6">
              {plan.featureGroups.map((group) => (
                <div key={group.title}>
                  <h2 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    {group.title}
                  </h2>
                  <ul className="space-y-3">
                    {group.features.map((feature) => (
                      <li
                        key={feature.title}
                        className="flex items-center gap-x-2 text-xs font-medium text-muted-foreground"
                      >
                        <feature.icon className="size-4" />
                        {feature.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </main>
          </article>
        ))}
      </div>
    </section>
  );
};

export { Pricing10 };

```

```tsx
"use client";

import { Check, ChevronDown, Info, X } from "lucide-react";
import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const plans = [
  {
    title: "Free",
    price: { monthly: "$9", annually: "$9" },
    href: "#",
    recommended: false,
  },
  {
    title: "Basic",
    price: { monthly: "$50", annually: "$45" },
    href: "#",
    recommended: false,
  },
  {
    title: "Team",
    price: { monthly: "$100", annually: "$90" },
    href: "#",
    recommended: true,
  },
  {
    title: "Enterprise",
    price: { monthly: "$200", annually: "$160" },
    href: "#",
    recommended: false,
  },
];

const featureMatrix = [
  {
    title: "Overview",
    features: [
      {
        title: "Always included reature",
        inclusions: [
          {
            plan: "Free",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
          {
            plan: "Basic",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
          {
            plan: "Teams",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
          {
            plan: "Enterprise",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
        ],
      },
      {
        title: "Number of products",
        info: "Help text",
        inclusions: [
          { plan: "Free", content: "1" },
          { plan: "Basic", content: "1" },
          { plan: "Teams", content: "3" },
          { plan: "Enterprise", content: "5" },
        ],
      },
      {
        title: "Number of transactions",
        info: "Help text",
        inclusions: [
          { plan: "Free", content: "30 monthly" },
          { plan: "Basic", content: "Unlimited" },
          { plan: "Teams", content: "Unlimited" },
          { plan: "Enterprise", content: "Unlimited" },
        ],
      },
    ],
  },
  {
    title: "Other features",
    features: [
      {
        title: "Basic feature",
        inclusions: [
          {
            plan: "Free",
            content: <Check className="size-4 lg:size-5" />,
          },
          {
            plan: "Basic",
            content: <Check className="size-4 lg:size-5" />,
          },
          {
            plan: "Teams",
            content: <Check className="size-4 lg:size-5" />,
          },
          {
            plan: "Enterprise",
            content: <Check className="size-4 lg:size-5" />,
          },
        ],
      },
      {
        title: "Enterprise feature",
        info: "Hello",
        inclusions: [
          {
            plan: "Free",
            content: <X className="size-4 text-muted-foreground lg:size-5" />,
          },
          {
            plan: "Basic",
            content: <X className="size-4 text-muted-foreground lg:size-5" />,
          },
          {
            plan: "Teams",
            content: <X className="size-4 text-muted-foreground lg:size-5" />,
          },
          {
            plan: "Enterprise",
            content: <Check className="size-5" />,
          },
        ],
      },
      {
        title: "Optional feature",
        info: "Hello",
        inclusions: [
          {
            plan: "Free",
            content: <X className="size-4 text-muted-foreground lg:size-5" />,
          },
          {
            plan: "Basic",
            content: <X className="size-4 text-muted-foreground lg:size-5" />,
          },
          {
            plan: "Teams",
            content: <Badge>Add-on</Badge>,
          },
          {
            plan: "Enterprise",
            content: <Badge>Add-on</Badge>,
          },
        ],
      },
    ],
  },
];

interface Pricing11Props {
  className?: string;
}

const Pricing11 = ({ className }: Pricing11Props) => {
  const [billing, setBilling] = useState<"monthly" | "annually">("monthly");
  return (
    <section className={cn("py-32", className)}>
      <div className="container mb-8 lg:mb-0">
        <div className="grid grid-cols-2 gap-y-12 md:gap-y-16">
          <div className="col-span-2 flex flex-col lg:col-span-1">
            <h1 className="my-6 text-3xl font-bold text-pretty md:text-4xl xl:text-5xl">
              Pricing Plans
            </h1>
            <p className="text-muted-foreground lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="bg-background lg:sticky lg:top-16">
          <div className="mb-8 pt-8">
            <div className="grid items-end gap-6 border-b border-border pb-8 lg:grid-cols-6">
              <div className="col-span-2">
                <div className="flex h-full flex-col justify-end">
                  <span className="mb-2 text-xs font-medium text-muted-foreground">
                    Billing
                  </span>
                  <Tabs
                    value={billing}
                    onValueChange={setBilling as (value: string) => void}
                  >
                    <TabsList>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="annually">Annually</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              {plans.map((plan) => (
                <div
                  key={plan.title}
                  className="rounded-lg border border-border p-3 2xl:p-4"
                >
                  <h3 className="mb-1 text-xl font-medium xl:text-2xl">
                    {plan.title}
                  </h3>
                  <p className="mb-4 text-sm font-medium text-muted-foreground">
                    {plan.price[billing]}
                    <span className="hidden 2xl:inline"> / monthly</span>
                  </p>
                  <Button
                    variant={plan.recommended ? "default" : "outline"}
                    className="w-full"
                  >
                    <span className="2xl:hidden">Register</span>
                    <span className="hidden 2xl:inline">
                      Get started for free
                    </span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-8 lg:space-y-14">
          {featureMatrix.map((category) => (
            <div key={category.title}>
              <h3 className="mb-6 text-lg font-medium lg:mb-3">
                {category.title}
              </h3>
              <div className="space-y-4 lg:space-y-0">
                <TooltipProvider delayDuration={150}>
                  {category.features.map((feature) => (
                    <Fragment key={feature.title}>
                      <dl className="hidden grid-cols-6 gap-6 border-b border-border lg:grid">
                        <dt className="col-span-2 justify-between py-4 pb-4">
                          <Tooltip>
                            <h4 className="group flex min-h-6 items-center gap-x-1 font-medium">
                              {feature.title}{" "}
                              {feature.info && (
                                <TooltipTrigger asChild>
                                  <Info className="ml-2 size-4 cursor-pointer text-muted-foreground group-hover:text-accent-foreground" />
                                </TooltipTrigger>
                              )}
                            </h4>
                            {feature.info && (
                              <TooltipContent>{feature.info}</TooltipContent>
                            )}
                          </Tooltip>
                        </dt>
                        {feature.inclusions.map((inclusion) => (
                          <dd
                            key={inclusion.plan}
                            className="hidden py-4 text-sm text-muted-foreground lg:block"
                          >
                            {inclusion.content}
                          </dd>
                        ))}
                      </dl>
                      <Collapsible
                        className="group lg:hidden"
                        defaultOpen={false}
                      >
                        <dl
                          key={feature.title}
                          className="border-b border-border"
                        >
                          <CollapsibleTrigger className="w-full">
                            <dt className="flex items-center justify-between pb-4">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <h4 className="group flex items-center gap-x-1 text-sm font-medium md:text-base">
                                    {feature.title}
                                    {feature.info && (
                                      <Info className="ml-2 size-4 cursor-pointer text-muted-foreground group-hover:text-accent-foreground" />
                                    )}
                                  </h4>
                                </TooltipTrigger>
                                {feature.info && (
                                  <TooltipContent>
                                    {feature.info}
                                  </TooltipContent>
                                )}
                              </Tooltip>

                              <ChevronDown className='size-5 transition-transform group-data-[state="open"]:rotate-180' />
                            </dt>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {feature.inclusions.map((inclusion) => (
                              <dd
                                key={inclusion.plan}
                                className="flex items-center border-b border-border py-3 text-xs text-muted-foreground last:border-b-0 md:py-3.5"
                              >
                                <div className="w-1/2 md:w-1/4">
                                  {inclusion.plan}
                                </div>
                                {inclusion.content}
                              </dd>
                            ))}
                          </CollapsibleContent>
                        </dl>
                      </Collapsible>
                    </Fragment>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 hidden text-xs text-muted-foreground md:block">
          * Caveats and other conditions
        </p>
      </div>
    </section>
  );
};

export { Pricing11 };

```

```tsx
import { cn } from "@/lib/utils";

const featuredAddons = [
  {
    id: "addon-1",
    title: "Add-on option 1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "$199",
  },
  {
    id: "addon-2",
    title: "Add-on option 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "$199",
  },
  {
    id: "addon-3",
    title: "Add-on option 3",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "$199",
  },
];

const otherAddons = [
  {
    id: "addon-4",
    title: "Add-on option 4",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "$9",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
  },
  {
    id: "addon-5",
    title: "Add-on option 5",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "$19",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg",
  },
  {
    id: "addon-6",
    title: "Add-on option 6",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: "$19",
    priceFootnote: "This is a footnote.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg",
  },
];

interface Pricing12Props {
  className?: string;
}

const Pricing12 = ({ className }: Pricing12Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="rounded-xl border border-border py-6 md:py-8 lg:pt-16 lg:pb-12">
          <div className="px-6 md:px-8 lg:px-12">
            <div className="mb-8 md:mb-10 md:flex md:justify-between lg:mb-9">
              <div className="lg:w-2/3">
                <h1 className="mb-4 text-2xl font-medium md:text-3xl lg:text-4xl">
                  Additional add-ons
                </h1>
                <p className="text-xs text-muted-foreground md:text-sm lg:text-base">
                  Curabitur egestas risus risus, consectetur vestibulum ante
                  commodo quis. Duis aliquam elit sapien, porttitor vehicula
                  purus convallis in.
                </p>
              </div>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="placeholder"
                className="hidden size-24 md:block lg:size-32"
              />
            </div>
            <div className="flex flex-col gap-x-8 gap-y-3 xl:flex-row">
              {featuredAddons.map((addon) => (
                <div
                  key={addon.id}
                  className="flex flex-1 flex-col rounded-lg bg-accent p-6 lg:py-8"
                >
                  <h2 className="mb-1.5 text-base font-medium lg:mb-2 lg:text-lg">
                    {addon.title}
                  </h2>
                  <div className="grid flex-1 grid-cols-1 gap-x-10 md:grid-cols-3 lg:grid-cols-1">
                    <p className="mb-8 max-w-xs text-xs text-muted-foreground md:col-span-2 md:mb-0 lg:mb-10 lg:text-base">
                      {addon.description}
                    </p>
                    <div className="col-span-1 md:mt-auto md:ml-auto lg:ml-0">
                      <p>
                        <span className="font-medium lg:text-2xl">
                          {addon.price}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          {" "}
                          / Month
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 border-t border-border md:mt-8 lg:mt-10">
            <div className="divide-y divide-border px-6 md:px-8 lg:px-12">
              {otherAddons.map((addon) => (
                <div
                  key={addon.id}
                  className="flex flex-col space-y-4 py-6 last:pb-0 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-12 lg:py-10"
                >
                  <div className="flex items-center md:max-w-md md:space-x-4 lg:max-w-full lg:space-x-6">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                      alt="placeholder"
                      className="hidden shrink-0 md:block md:size-16 lg:size-20"
                    />
                    <div className="max-w-md space-y-1 lg:max-w-md lg:space-y-2">
                      <p className="mb-1.5 text-lg font-medium md:text-xl lg:mb-2 lg:text-2xl">
                        {addon.title}
                      </p>
                      <p className="text-xs text-muted-foreground md:text-xs lg:text-base">
                        {addon.description}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 md:self-end md:text-end">
                    <span className="text-2xl font-medium md:text-3xl lg:text-4xl">
                      {addon.price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      / Month
                    </span>
                    {addon.priceFootnote && (
                      <div className="mt-1 text-xs font-medium text-muted-foreground md:max-w-[8rem] lg:max-w-full">
                        * {addon.priceFootnote}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing12 };

```

```tsx
import { cn } from "@/lib/utils";

interface Pricing13Props {
  className?: string;
}

const Pricing13 = ({ className }: Pricing13Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="rounded-xl border border-border py-6 md:py-8 lg:pt-16 lg:pb-12">
          <div className="px-6 md:px-8 lg:px-12">
            <div className="mb-8 md:mb-10 md:flex md:justify-between lg:mb-9">
              <div className="lg:w-2/3">
                <h1 className="mb-4 text-2xl font-medium md:text-3xl lg:text-4xl">
                  Additional add-ons
                </h1>
                <p className="text-xs text-muted-foreground md:text-sm lg:text-base">
                  Curabitur egestas risus risus, consectetur vestibulum ante
                  commodo quis. Duis aliquam elit sapien, porttitor vehicula
                  purus convallis in.
                </p>
              </div>
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="placeholder"
                className="hidden size-24 md:block lg:size-32"
              />
            </div>
            <div className="flex flex-col gap-x-8 gap-y-3 xl:flex-row">
              <div className="flex flex-1 flex-col rounded-lg bg-accent p-6 lg:py-8">
                <h2 className="mb-1.5 text-base font-medium lg:mb-2 lg:text-lg">
                  Addon Option 1
                </h2>
                <div className="grid flex-1 grid-cols-1 gap-x-10 md:grid-cols-3 lg:grid-cols-1">
                  <p className="mb-8 max-w-xs text-xs text-muted-foreground md:col-span-2 md:mb-0 lg:mb-10 lg:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <div className="col-span-1 md:mt-auto md:ml-auto lg:ml-0">
                    <p>
                      <span className="font-medium lg:text-2xl">9</span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {" "}
                        / Month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col rounded-lg bg-accent p-6 lg:py-8">
                <h2 className="mb-1.5 text-base font-medium lg:mb-2 lg:text-lg">
                  Addon Option 2
                </h2>
                <div className="grid flex-1 grid-cols-1 gap-x-10 md:grid-cols-3 lg:grid-cols-1">
                  <p className="mb-8 max-w-xs text-xs text-muted-foreground md:col-span-2 md:mb-0 lg:mb-10 lg:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <div className="col-span-1 md:mt-auto md:ml-auto lg:ml-0">
                    <p>
                      <span className="font-medium lg:text-2xl">99</span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {" "}
                        / Month
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col rounded-lg bg-accent p-6 lg:py-8">
                <h2 className="mb-1.5 text-base font-medium lg:mb-2 lg:text-lg">
                  Addon Option 3
                </h2>
                <div className="grid flex-1 grid-cols-1 gap-x-10 md:grid-cols-3 lg:grid-cols-1">
                  <p className="mb-8 max-w-xs text-xs text-muted-foreground md:col-span-2 md:mb-0 lg:mb-10 lg:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <div className="col-span-1 md:mt-auto md:ml-auto lg:ml-0">
                    <p>
                      <span className="font-medium lg:text-2xl">
                        Contact Sales
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing13 };

```

```tsx
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Pricing14Props {
  className?: string;
}

const Pricing14 = ({ className }: Pricing14Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-5xl rounded-lg bg-muted p-6 md:p-10">
          <div className="mb-12 flex items-center gap-3">
            <span className="text-2xl font-bold">Standard Plan</span>
            <Badge
              variant="outline"
              className="border-green-200 bg-green-100 text-green-600"
            >
              20% off
            </Badge>
          </div>
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <h2 className="max-w-xl text-3xl font-bold md:text-4xl">
              Launch your idea in minutes with this plan
            </h2>
            <div className="md:text-right">
              <span className="text-3xl font-bold md:text-5xl">$1999</span>
              <p className="text-muted-foreground">
                Starting price per project
              </p>
            </div>
          </div>
          <Separator className="my-8" />
          <div>
            <p className="mb-5 text-muted-foreground">
              Launch your project with the following features:
            </p>
            <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-20">
              <ul className="grid gap-x-20 gap-y-4 font-medium md:grid-cols-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4" />
                  Unlimited projects
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4" />
                  Live chat support
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4" />
                  Live Collaboration
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4" />
                  Custom domain
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4" />
                  Unlimited users
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4" />
                  Unlimited storage
                </li>
              </ul>
              <div className="flex flex-col gap-4">
                <Button size="lg">Book a demo</Button>
                <Button variant="outline" size="lg">
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing14 };

```

```tsx
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const features = [
  "Unlimited projects and tasks",
  "Unlimited users and collaborators",
  "100GB of storage",
  "Priority support and assistance",
  "Custom domain and branding",
];

interface Pricing15Props {
  className?: string;
}

const Pricing15 = ({ className }: Pricing15Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="w-auto md:w-1/2 lg:w-2/3">
            <h2 className="mb-4 text-4xl font-bold text-balance md:text-5xl">
              One Plan, Unlimited Access
            </h2>
            <p className="mb-4 text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              ad eveniet esse id ipsa. Tempore voluptatum magni magnam vitae
              aperiam, explicabo hic asperiores enim quibusdam, tenetur
              repellendus.
            </p>
            <Button variant="default" size="lg">
              Subscribe
            </Button>
          </div>
          <div className="w-auth rounded-md border bg-muted p-11 md:w-1/2 lg:w-1/3">
            <p className="text-5xl font-bold">
              $199<span className="text-lg">/mo</span>
            </p>
            <ul className="space-y-4 pt-5 font-medium">
              {features.map((feature, index) => (
                <li key={index} className="flex">
                  <Check className="mr-2" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing15 };

```

```tsx
"use client";

import { CheckCircle2, Zap } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Pricing16Props {
  className?: string;
}

const Pricing16 = ({ className }: Pricing16Props) => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section className={cn("bg-muted/50 py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <Badge variant="outline">Pricing</Badge>
          <h1 className="text-center text-4xl font-semibold text-balance sm:text-5xl lg:text-7xl">
            Simple pricing for everyone, start for free today
          </h1>
          <Tabs
            value={isMonthly ? "monthly" : "yearly"}
            onValueChange={(value) => setIsMonthly(value === "monthly")}
            className="w-80"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Billed Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Billed Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="mx-auto mt-4 grid w-full max-w-5xl gap-6 lg:grid-cols-3">
            <div className="w-full rounded-lg border bg-background p-8 shadow-sm lg:max-w-96">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Free</h3>
                <p className="text-sm text-muted-foreground">Free forever</p>
              </div>
              <Separator className="my-6" />
              <div className="flex items-start font-semibold">
                <p className="text-xl">$</p>
                <p className="text-5xl leading-none">0</p>
              </div>
              <p className="text-sm text-muted-foreground">
                per user/month, billed {isMonthly ? "monthly" : "yearly"}
              </p>
              <Button variant="outline" className="mt-4 mb-2 w-full">
                Start for free
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                No credit card required
              </p>
              <Separator className="my-6" />
              <div>
                <p className="mb-3 text-sm font-semibold">Key features: </p>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Up to 5 projects</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Up to 5 users</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Up to 50 tasks</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Task management</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Analytics & reports</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full rounded-lg border bg-background p-8 shadow-sm lg:max-w-96">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">Starter</h3>
                  <Badge className="flex items-center gap-1">
                    <Zap className="size-3" />
                    Popular
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  For small teams and startups
                </p>
              </div>
              <Separator className="my-6" />
              <div className="flex items-center gap-2">
                <div className="flex items-start font-semibold">
                  <p className="text-xl">$</p>
                  <p className="text-5xl leading-none">
                    {isMonthly ? "20" : "15"}
                  </p>
                </div>
                {!isMonthly && (
                  <div className="flex flex-col text-sm">
                    <p className="font-semibold text-destructive">25% off</p>
                    <p className="text-muted-foreground line-through">$20</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                per user/month, billed {isMonthly ? "monthly" : "yearly"}
              </p>
              <Button className="mt-4 mb-2 w-full">Try for 14 days</Button>
              <p className="text-center text-sm text-muted-foreground">
                No credit card required
              </p>
              <Separator className="my-6" />
              <div>
                <p className="mb-3 text-sm font-semibold">Key features: </p>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Unlimited projects</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Unlimited users</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Unlimited tasks</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>File storage</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Customizable workflows</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full rounded-lg border bg-background p-8 shadow-sm lg:max-w-96">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Enterprise</h3>
                <p className="text-sm text-muted-foreground">
                  For large teams and enterprises
                </p>
              </div>
              <Separator className="my-6" />
              <div className="flex items-center gap-2">
                <div className="flex items-start font-semibold">
                  <p className="text-xl">$</p>
                  <p className="text-5xl leading-none">
                    {isMonthly ? "40" : "30"}
                  </p>
                </div>
                {!isMonthly && (
                  <div className="flex flex-col text-sm">
                    <p className="font-semibold text-destructive">25% off</p>
                    <p className="text-muted-foreground line-through">$40</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                per user/month, billed {isMonthly ? "monthly" : "yearly"}
              </p>
              <Button variant="outline" className="mt-4 mb-2 w-full">
                Try for 14 days
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                No credit card required
              </p>
              <Separator className="my-6" />
              <div>
                <p className="mb-3 text-sm font-semibold">Key features: </p>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Unlimited integrations</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Webhooks</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>API access</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>SAML authentication</p>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <p>Dedicated support</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing16 };

```

```tsx
"use client";

import {
  BadgeCheck,
  BadgeDollarSign,
  Briefcase,
  Building,
  Rocket,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    icon: Rocket,
    name: "Basic plan",
    price: {
      monthly: 19,
      yearly: 199,
    },
    features: [
      "Basic task management tools",
      "Calendar sync with limited integrations",
      "Access to 1 dashboard for tracking tasks",
      "Limited AI suggestions and insights",
      "Basic support and community access",
    ],
  },
  {
    icon: Briefcase,
    name: "Business plan",
    price: {
      monthly: 29,
      yearly: 299,
    },
    features: [
      "All Free Plan features, plus:",
      "Unlimited task lists",
      "Advanced calendar sync",
      "AI-driven insights",
      "Access to custom dashboards",
      "Priority email support",
    ],
  },
  {
    icon: Building,
    name: "Enterprise plan",
    price: {
      monthly: 49,
      yearly: 499,
    },
    features: [
      "All Pro Plan features, plus:",
      "Dedicated account manager",
      "Custom integrations",
      "Real-time collaboration",
      "Role-based permissions",
      "24/7 priority support",
    ],
  },
];

interface Pricing20Props {
  className?: string;
}

const Pricing20 = ({ className }: Pricing20Props) => {
  const [isMonthly] = useState(true);

  return (
    <section className={cn("py-32", className)}>
      <div className="border-y">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <BadgeDollarSign className="size-4" />
            <span>Spenders Lounge</span>
          </Badge>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Pricing for everyone
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Choose the Plan that Fits Your Productivity Need
          </p>
        </div>
      </div>

      <div className="container mt-10 lg:mt-14">
        <section className="grid border max-lg:divide-y lg:grid-cols-3 lg:divide-x">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="flex flex-col justify-between p-6">
              <div className="space-y-2 border-b pb-6">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <plan.icon className="size-4" />
                  <h3 className="text-xl tracking-[-0.8px]">{plan.name}</h3>
                </div>

                <>
                  <div className="flex items-baseline font-medium">
                    <span className="text-[3.5rem] leading-[120%] tracking-[-3.92px]">
                      ${isMonthly ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="text-muted-foreground-subtle text-2xl tracking-[-0.96px]">
                      {isMonthly ? "/mo" : "/yr"}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {isMonthly
                      ? `or $${plan.price.yearly} yearly`
                      : `or $${plan.price.monthly}/mo monthly`}
                  </p>
                </>
              </div>

              <div className="pt-6">
                <h4 className="text-muted-foreground-subtle">
                  Features Included
                </h4>
                <ul className="mt-4 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <BadgeCheck className="size-6 text-muted-foreground" />
                      <span className="tracking-[-0.32px] text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={index === 1 ? "default" : "secondary"}
                className="mt-12"
              >
                Get started
              </Button>
            </div>
          ))}
        </section>
      </div>

      <div className="mt-12 h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

export { Pricing20 };

```

```tsx
"use client";

import { BadgeCheck, BadgeDollarSign, Briefcase, Building } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeatureSection {
  category: string;
  features: {
    name: string;
    basic: string | boolean;
    business: string | boolean;
    enterprise: string | boolean;
  }[];
}

const pricingPlans = [
  {
    icon: "Rocket",
    name: "Basic plan",
    price: {
      monthly: 19,
      yearly: 199,
    },
    features: [
      "Basic task management tools",
      "Calendar sync with limited integrations",
      "Access to 1 dashboard for tracking tasks",
      "Limited AI suggestions and insights",
      "Basic support and community access",
    ],
  },
  {
    icon: Briefcase,
    name: "Business plan",
    price: {
      monthly: 29,
      yearly: 299,
    },
    features: [
      "All Free Plan features, plus:",
      "Unlimited task lists",
      "Advanced calendar sync",
      "AI-driven insights",
      "Access to custom dashboards",
      "Priority email support",
    ],
  },
  {
    icon: Building,
    name: "Enterprise plan",
    price: {
      monthly: 49,
      yearly: 499,
    },
    features: [
      "All Pro Plan features, plus:",
      "Dedicated account manager",
      "Custom integrations",
      "Real-time collaboration",
      "Role-based permissions",
      "24/7 priority support",
    ],
  },
];

const comparisonFeatures: FeatureSection[] = [
  {
    category: "Core Tools",
    features: [
      {
        name: "Task Management",
        basic: "10",
        business: "25",
        enterprise: "Unlimited",
      },
      {
        name: "Calendar Sync",
        basic: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Reminders",
        basic: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Collaboration",
        basic: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Notifications",
        basic: false,
        business: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Productivity Insights",
    features: [
      {
        name: "Analytics",
        basic: "10 25 Unlimited",
        business: "10 25 Unlimited",
        enterprise: "10 25 Unlimited",
      },
      {
        name: "Reports",
        basic: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Time Tracking",
        basic: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Goal Tracking",
        basic: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Trends",
        basic: false,
        business: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Workflow Automation",
    features: [
      {
        name: "Task Automation",
        basic: "10",
        business: "25",
        enterprise: "Unlimited",
      },
      {
        name: "Recurring Tasks",
        basic: true,
        business: true,
        enterprise: true,
      },
      {
        name: "Integrations",
        basic: true,
        business: true,
        enterprise: true,
      },
      {
        name: "API Access",
        basic: false,
        business: true,
        enterprise: true,
      },
      {
        name: "Workflow Templates",
        basic: false,
        business: false,
        enterprise: true,
      },
    ],
  },
];

interface Pricing21Props {
  className?: string;
}

const Pricing21 = ({ className }: Pricing21Props) => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section className={cn("py-32", className)}>
      <div className="border-y">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <BadgeDollarSign className="size-4" />
            <span>Spenders Lounge</span>
          </Badge>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Pricing for everyone
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Choose the Plan that Fits Your Productivity Need
          </p>
        </div>
      </div>

      <div className="container">
        <section className="py-14 md:py-20 lg:py-24">
          <div className="flex justify-center">
            <div className="inline-flex gap-[2px] rounded-md border p-[2px]">
              <Button
                variant={isMonthly ? "default" : "outline"}
                onClick={() => setIsMonthly(true)}
                className="transition-colors"
              >
                Monthly
              </Button>
              <Button
                variant={!isMonthly ? "default" : "outline"}
                onClick={() => setIsMonthly(false)}
                className="transition-colors"
              >
                Yearly
              </Button>
            </div>
          </div>
          <div className="mt-12 overflow-x-auto">
            <PlanHeaders isMonthly={isMonthly} />
            <FeatureSections />
          </div>
        </section>
      </div>

      <div className="mt-12 h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

const PlanHeaders = ({ isMonthly }: { isMonthly: boolean }) => (
  <div className="grid grid-cols-4">
    <div className="col-span-1 max-lg:hidden max-lg:border"></div>
    <div className="col-span-4 grid gap-4 border-t max-lg:divide-y max-lg:border lg:col-span-3 lg:grid-cols-3 lg:divide-x">
      {pricingPlans.map((plan, index) => (
        <div key={index} className="flex flex-col p-6">
          <div className="space-y-2 pb-6">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <plan.icon className="size-4" />
              <h3 className="text-xl tracking-[-0.8px]">{plan.name}</h3>
            </div>
            <>
              <div className="flex items-baseline font-medium">
                <span className="text-[3.5rem] leading-[120%] tracking-[-3.92px]">
                  ${isMonthly ? plan.price.monthly : plan.price.yearly}
                </span>
                <span className="text-muted-foreground-subtle text-2xl tracking-[-0.96px]">
                  {isMonthly ? "/mo" : "/yr"}
                </span>
              </div>
              <p className="text-muted-foreground">
                {isMonthly
                  ? `or $${plan.price.yearly} yearly`
                  : `or $${plan.price.monthly}/mo monthly`}
              </p>
            </>
          </div>
          <Button className="mt-auto">Get started</Button>
        </div>
      ))}
    </div>
  </div>
);

const FeatureSections = () => (
  <>
    {comparisonFeatures.map((section, sectionIndex) => (
      <div
        key={sectionIndex}
        className={`border-b first:border-t ${sectionIndex === 0 ? "border-t" : ""}`}
      >
        <div className="py-4">
          <h3 className="text-lg tracking-[-0.36px]">{section.category}</h3>
        </div>
        {section.features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="grid border-t tracking-[-0.32px] text-muted-foreground max-lg:grid-rows-[auto_1fr] lg:grid-cols-4"
          >
            <span className="inline-flex items-center py-4">
              {feature.name}
            </span>
            <div className="col-span-3 grid grid-cols-3 divide-x text-center max-lg:border-t">
              {[feature.basic, feature.business, feature.enterprise].map(
                (value, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center py-4"
                  >
                    {typeof value === "boolean" ? (
                      value ? (
                        <BadgeCheck className="mx-auto size-5 text-muted-foreground" />
                      ) : null
                    ) : (
                      <span className="text-muted-foreground-subtle font-semibold">
                        {value}
                      </span>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    ))}
  </>
);

export { Pricing21 };

```

```tsx
"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const plans = [
  {
    name: "Free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    description: "Free for everyone",
    features: [
      "Unlimited members",
      "2 teams",
      "500 issues",
      "Slack and Github integrations",
    ],
  },
  {
    name: "Startup",
    monthlyPrice: "$8",
    yearlyPrice: "$6",
    features: [
      "All free plan features and...",
      "Mainline AI",
      "Unlimited teams",
      "Unlimited issues and file uploads",
      "Mainline Insights",
      "Admin roles",
    ],
  },
  {
    name: "Enterprise",
    monthlyPrice: "$8",
    yearlyPrice: "$6",
    features: [
      "All free plan features and...",
      "Mainline AI",
      "Supermainline AGI",
      "Free daily catered lunch",
      "random HIPPA audits",
    ],
  },
];

interface Pricing22Props {
  className?: string;
}

const Pricing22 = ({ className }: Pricing22Props) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Pricing
          </h2>
          <p className="mx-auto max-w-xl leading-snug font-medium text-balance text-muted-foreground">
            Use Mainline for free with your whole team. Upgrade to enable
            unlimited issues, enhanced security controls, and additional
            features.
          </p>
        </div>

        <div className="mt-8 grid gap-6 text-start md:mt-12 lg:mt-20 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`${
                plan.name === "Startup"
                  ? "border-4 border-primary lg:h-[110%]"
                  : ""
              }`}
            >
              <CardContent className="flex h-full flex-col justify-between gap-2 p-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">{plan.name}</h3>
                  <div className="space-y-1">
                    <div className="text-lg font-medium text-muted-foreground">
                      {isAnnual ? plan.yearlyPrice : plan.monthlyPrice}{" "}
                      {plan.name !== "Free" && (
                        <span className="text-muted-foreground">
                          per user/
                          {isAnnual ? "year" : "month"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {plan.name !== "Free" ? (
                  <div className="mt-4 flex items-center gap-2">
                    <Switch
                      checked={isAnnual}
                      onCheckedChange={() => setIsAnnual(!isAnnual)}
                    />
                    <span className="text-sm font-medium">Billed annually</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {plan.description}
                  </span>
                )}

                <div className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-1.5 text-muted-foreground"
                    >
                      <Check className="size-5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-fit"
                  variant={plan.name === "Startup" ? "default" : "outline"}
                >
                  Get started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Pricing22 };

```

```tsx
"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FeatureSection {
  category: string;
  features: {
    name: string;
    free: string | boolean;
    startup: string | boolean;
    enterprise: string | boolean;
  }[];
}

const pricingPlans = [
  {
    name: "Free",
    button: {
      text: "Get started",
      variant: "outline" as const,
    },
  },
  {
    name: "Startup",
    button: {
      text: "Get started",
      variant: "outline" as const,
    },
  },
  {
    name: "Enterprise",
    button: {
      text: "Get a demo",
      variant: "outline" as const,
    },
  },
];

const comparisonFeatures: FeatureSection[] = [
  {
    category: "Usage",
    features: [
      {
        name: "Members",
        free: "Unlimited",
        startup: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "Transactions",
        free: "250",
        startup: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "Teams",
        free: "2",
        startup: "Unlimited",
        enterprise: "Unlimited",
      },
    ],
  },
  {
    category: "Features",
    features: [
      {
        name: "Reporting",
        free: true,
        startup: true,
        enterprise: true,
      },
      {
        name: "Analytics",
        free: true,
        startup: true,
        enterprise: true,
      },
      {
        name: "Import and export",
        free: true,
        startup: true,
        enterprise: true,
      },
      {
        name: "Integrations",
        free: true,
        startup: true,
        enterprise: true,
      },
      {
        name: "Mainline AI",
        free: false,
        startup: true,
        enterprise: true,
      },
      {
        name: "Admin roles",
        free: false,
        startup: false,
        enterprise: false,
      },
      {
        name: "Audit log",
        free: false,
        startup: false,
        enterprise: false,
      },
    ],
  },
  {
    category: "Support",
    features: [
      {
        name: "Priority Support",
        free: true,
        startup: true,
        enterprise: true,
      },
      {
        name: "Account Manager",
        free: false,
        startup: false,
        enterprise: true,
      },
      {
        name: "Uptime SLA",
        free: false,
        startup: false,
        enterprise: true,
      },
    ],
  },
];

interface Pricing23Props {
  className?: string;
}

const Pricing23 = ({ className }: Pricing23Props) => {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to Startup plan

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <PlanHeaders
          selectedPlan={selectedPlan}
          onPlanChange={setSelectedPlan}
        />
        <FeatureSections selectedPlan={selectedPlan} />
      </div>
    </section>
  );
};

const PlanHeaders = ({
  selectedPlan,
  onPlanChange,
}: {
  selectedPlan: number;
  onPlanChange: (index: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      {/* Mobile View */}
      <div className="md:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
          <div className="flex items-center justify-between border-b py-4">
            <CollapsibleTrigger className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold">
                {pricingPlans[selectedPlan].name}
              </h3>
              <ChevronsUpDown
                className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <Button
              variant={pricingPlans[selectedPlan].button.variant}
              className="w-fit"
            >
              {pricingPlans[selectedPlan].button.text}
            </Button>
          </div>
          <CollapsibleContent className="flex flex-col space-y-2 p-2">
            {pricingPlans.map(
              (plan, index) =>
                index !== selectedPlan && (
                  <Button
                    size="lg"
                    variant="secondary"
                    key={index}
                    onClick={() => {
                      onPlanChange(index);
                      setIsOpen(false);
                    }}
                  >
                    {plan.name}
                  </Button>
                ),
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop View */}
      <div className="grid grid-cols-4 gap-4 max-md:hidden">
        <div className="col-span-1 max-md:hidden"></div>

        {pricingPlans.map((plan, index) => (
          <div key={index} className="">
            <h3 className="mb-3 text-2xl font-semibold">{plan.name}</h3>
            <Button variant={plan.button.variant} className="">
              {plan.button.text}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureSections = ({ selectedPlan }: { selectedPlan: number }) => (
  <>
    {comparisonFeatures.map((section, sectionIndex) => (
      <div key={sectionIndex} className="">
        <div className="border-b border-primary/40 py-4">
          <h3 className="text-lg font-semibold">{section.category}</h3>
        </div>
        {section.features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="grid grid-cols-2 font-medium text-primary max-md:border-b md:grid-cols-4"
          >
            <span className="inline-flex items-center py-4">
              {feature.name}
            </span>
            {/* Mobile View - Only Selected Plan */}
            <div className="md:hidden">
              <div className="flex items-center gap-1 py-4 md:border-b">
                {(() => {
                  const value = [
                    feature.free,
                    feature.startup,
                    feature.enterprise,
                  ][selectedPlan];
                  return typeof value === "boolean" ? (
                    value ? (
                      <Check className="size-5" />
                    ) : null
                  ) : (
                    <div className="flex items-center gap-1">
                      <Check className="size-4" />
                      <span>{value}</span>
                    </div>
                  );
                })()}
              </div>
            </div>
            {/* Desktop View - All Plans */}
            <div className="hidden md:col-span-3 md:grid md:grid-cols-3 md:gap-4">
              {[feature.free, feature.startup, feature.enterprise].map(
                (value, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 border-b py-4"
                  >
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check className="size-5" />
                      ) : null
                    ) : (
                      <div className="flex items-center gap-1">
                        <Check className="size-4" />
                        <span>{value}</span>
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    ))}
  </>
);

export { Pricing23 };

```

```tsx
"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const plans = [
  {
    name: "Free",
    monthlyPrice: "$0",
    annualPrice: "$0",
    features: [
      "Unlimited members",
      "2 teams",
      "500 issues",
      "Slack and Github integrations",
    ],
    cta: "Get started",
  },
  {
    name: "Startup",
    monthlyPrice: "$8",
    annualPrice: "$60",
    monthlyPerUnit: "per user/month",
    annualPerUnit: "per user/annum",
    features: [
      "All free plan features and...",
      "Streamline AI",
      "Unlimited teams",
      "Unlimited issues and file uploads",
      "Streamline Insights",
      "Admin roles",
    ],
    cta: "7 day free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: "$15",
    annualPrice: "$120",
    monthlyPerUnit: "per user/month",
    annualPerUnit: "per user/annum",
    features: [
      "All free plan features and...",
      "Streamline AI",
      "Unlimited teams",
      "Unlimited issues and file uploads",
      "Streamline Insights",
      "Admin roles",
    ],
    cta: "Get started",
  },
];

interface Pricing24Props {
  className?: string;
}

const Pricing24 = ({ className }: Pricing24Props) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Pricing
          </h2>
          <p className="text-lg text-balance text-muted-foreground">
            Use Streamline for free with your whole team. Upgrade to enable
            unlimited issues, enhanced security controls, and additional
            features.
          </p>
          <div className="inline-flex items-center gap-2">
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              aria-label="Toggle annual billing"
            />
            <span className="text-sm font-medium">Billed annually</span>
          </div>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 md:mt-12 lg:mt-20 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(plan.popular && "scale-[1.075] rounded-3xl")}
            >
              <Card
                className={cn(
                  "h-full border-none bg-zinc-100 dark:bg-zinc-900",
                  plan.popular && "relative ring-2 ring-black",
                )}
              >
                <CardHeader>
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <div className="mt-2">
                    <p className="text-lg font-medium text-muted-foreground">
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      {(plan.monthlyPerUnit || plan.annualPerUnit) &&
                        " " +
                          (isAnnual ? plan.annualPerUnit : plan.monthlyPerUnit)}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col space-y-6">
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check className="size-4 shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
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

export { Pricing24 };

```

```tsx
"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Pricing27Props {
  className?: string;
}

const Pricing27 = ({ className }: Pricing27Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {/* Main Card */}
          <li className="md:order-1 lg:col-span-1 xl:col-span-2">
            <div className="flex h-full flex-col-reverse rounded-lg border bg-muted md:flex-row">
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <div>
                    <p className="text-lg font-semibold">Glide Solutions</p>
                    <p className="mt-3 text-muted-foreground">
                      Get a premium custom solution built by a top Agency
                      Partner, with Glide helping manage development.
                    </p>
                  </div>
                  <p className="mt-6 text-sm font-semibold text-muted-foreground">
                    Starting at
                  </p>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-semibold">$10,000</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      per project
                    </span>
                  </div>
                  <Button size="lg" className="mt-5 w-fit rounded-3xl">
                    Get a free quote
                  </Button>
                </div>

                <div className="mt-8">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 size-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Work with Glide and an Agency Partner
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 size-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Import data from 100+ sources
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 size-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Glide Priority Support
                      </span>
                    </li>
                  </ul>
                  <Button variant="link" className="mt-4 px-0">
                    Learn more
                  </Button>
                </div>
              </div>

              <div className="hidden p-6 md:p-8 xl:block xl:w-[800px] 2xl:w-[960px]">
                <div className="h-full rounded-lg">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
                    alt="Glide Solutions"
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </li>

          {/* Secondary Card */}
          <li className="rounded-lg border bg-card p-6 md:p-8">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-lg font-semibold">Hire an Expert</p>
                <p className="mt-3 text-muted-foreground">
                  Browse the Expert Directory to find a Glide Certified Expert
                  who best fits your project needs and preferences.
                </p>
                <p className="mt-6 text-sm font-semibold text-muted-foreground">
                  Starting at
                </p>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-semibold">$2,000</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    per project
                  </span>
                </div>
                <Button
                  size="lg"
                  variant="secondary"
                  className="mt-5 w-fit rounded-3xl"
                >
                  Browse Experts
                </Button>
              </div>

              <div className="mt-8">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="mr-2 size-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Hire hourly or by project
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 size-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Work with a Certified Expert
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 size-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Glide Support
                    </span>
                  </li>
                </ul>
                <Button variant="link" className="mt-4 px-0">
                  Learn more
                </Button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export { Pricing27 };

```

```tsx
"use client";

import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Clock,
  Clock11Icon,
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Eye,
  FileInput,
  FilePlus,
  FileSearch,
  FileText,
  HardDrive,
  Key,
  LifeBuoy,
  Lock,
  Mail,
  Palette,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldPlus,
  ShieldQuestion,
  Star,
  UserCheck,
  UserCog,
  UserPlus,
  Users,
  VoicemailIcon,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Interface for Pricing Package Data
interface PricingPackage {
  title: string;
  monthlyPrice: string;
  annualPrice: string;
  description: string;
  features: {
    title: string;
    items: { icon: LucideIcon; text: string }[];
  }[];
  isPopular?: boolean; // Optional flag for popular plan
}

interface Pricing28Props {
  className?: string;
}

const Pricing28 = ({ className }: Pricing28Props) => {
  const [isAnnually, setIsAnnually] = useState(false);

  // Pricing packages data
  const packages: PricingPackage[] = [
    {
      title: "Basic Plan",
      monthlyPrice: "$79",
      annualPrice: "$63",
      description: "10 credit total",
      features: [
        {
          title: "Security",
          items: [
            { icon: ShieldCheck, text: "Standard security" },
            { icon: Lock, text: "Basic encryption" },
            { icon: Key, text: "Two-factor authentication" },
          ],
        },
        {
          title: "Style",
          items: [
            { icon: Palette, text: "Basic branding" },
            { icon: Eye, text: "Limited style customization" },
          ],
        },
        {
          title: "Storage",
          items: [
            { icon: HardDrive, text: "5GB storage" },
            { icon: FileText, text: "File versioning" },
          ],
        },
        {
          title: "Support",
          items: [
            { icon: Mail, text: "Support by email only" },
            { icon: Clock, text: "Basic time tracking" },
          ],
        },
        {
          title: "Collaboration",
          items: [
            { icon: Users, text: "Up to 3 users" },
            { icon: UserPlus, text: "Basic team collaboration" },
          ],
        },
      ],
    },
    {
      title: "Pro Plan",
      monthlyPrice: "$299",
      annualPrice: "$239",
      description: "50 credit total",
      features: [
        {
          title: "Security",
          items: [
            { icon: ShieldPlus, text: "Enhanced security" },
            { icon: Shield, text: "Advanced encryption" },
            { icon: Key, text: "Two-factor authentication" },
            { icon: ShieldAlert, text: "Data loss prevention" },
          ],
        },
        {
          title: "Style",
          items: [
            { icon: Palette, text: "Custom branding" },
            { icon: Eye, text: "Advanced style customization" },
            { icon: Star, text: "Custom themes" },
          ],
        },
        {
          title: "Storage",
          items: [
            { icon: HardDrive, text: "50GB storage" },
            { icon: FilePlus, text: "File versioning" },
            { icon: Cloud, text: "Backup and restore" },
          ],
        },
        {
          title: "Support",
          items: [
            { icon: Bell, text: "Priority support" },
            { icon: Clock, text: "24/7 priority support" },
            { icon: Mail, text: "Email and chat support" },
          ],
        },
        {
          title: "Collaboration",
          items: [
            { icon: Users, text: "Unlimited users" },
            { icon: UserCheck, text: "Advanced team collaboration" },
            { icon: UserCog, text: "Role-based access control" },
          ],
        },
      ],
    },
    {
      title: "Business Plan",
      monthlyPrice: "$599",
      annualPrice: "$479",
      description: "100 credit total",
      features: [
        {
          title: "Security",
          items: [
            { icon: ShieldPlus, text: "Advanced security" },
            { icon: ShieldCheck, text: "Enterprise-grade encryption" },
            { icon: Key, text: "Two-factor authentication" },
            { icon: ShieldAlert, text: "Data loss prevention" },
            { icon: LifeBuoy, text: "Dedicated security team" },
          ],
        },
        {
          title: "Style",
          items: [
            { icon: Palette, text: "Custom branding" },
            { icon: Eye, text: "Advanced style customization" },
            { icon: Star, text: "Custom themes" },
            { icon: Star, text: "White-labeling" },
          ],
        },
        {
          title: "Storage",
          items: [
            { icon: HardDrive, text: "500GB storage" },
            { icon: FileSearch, text: "File versioning" },
            { icon: CloudRain, text: "Backup and restore" },
            { icon: CloudSnow, text: "Unlimited file uploads" },
          ],
        },
        {
          title: "Support",
          items: [
            { icon: Bell, text: "Priority support" },
            { icon: Clock, text: "24/7 priority support" },
            { icon: Mail, text: "Email, chat, and phone support" },
            { icon: Star, text: "Dedicated account manager" },
          ],
        },
        {
          title: "Collaboration",
          items: [
            { icon: Users, text: "Unlimited team members" },
            { icon: UserCheck, text: "Advanced team collaboration" },
            { icon: UserCog, text: "Role-based access control" },
            { icon: Clock11Icon, text: "Custom workflows" },
          ],
        },
      ],
      isPopular: true, // Mark as popular
    },
    {
      title: "Enterprise Plan",
      monthlyPrice: "$1199",
      annualPrice: "$959",
      description: "Unlimited credits",
      features: [
        {
          title: "Security",
          items: [
            { icon: ShieldPlus, text: "Enterprise-grade security" },
            { icon: ShieldCheck, text: "Advanced encryption" },
            { icon: Key, text: "Two-factor authentication" },
            { icon: ShieldAlert, text: "Data loss prevention" },
            { icon: LifeBuoy, text: "Dedicated security team" },
            { icon: ShieldQuestion, text: "Compliance certifications" },
          ],
        },
        {
          title: "Style",
          items: [
            { icon: Palette, text: "Custom branding" },
            { icon: Eye, text: "Advanced style customization" },
            { icon: Star, text: "Custom themes" },
            { icon: Star, text: "White-labeling" },
            { icon: Star, text: "Custom animations" },
          ],
        },
        {
          title: "Storage",
          items: [
            { icon: HardDrive, text: "1TB storage" },
            { icon: FileInput, text: "File versioning" },
            { icon: CloudLightning, text: "Backup and restore" },
            { icon: CloudDrizzle, text: "Unlimited file uploads" },
            { icon: CloudSun, text: "Custom storage solutions" },
          ],
        },
        {
          title: "Support",
          items: [
            { icon: Bell, text: "24/7 premium support" },
            { icon: Clock, text: "Dedicated account manager" },
            { icon: Mail, text: "Email, chat, and phone support" },
            { icon: Star, text: "Custom SLA agreements" },
          ],
        },
        {
          title: "Collaboration",
          items: [
            { icon: Users, text: "Unlimited users" },
            { icon: UserCheck, text: "Advanced team collaboration" },
            { icon: UserCog, text: "Role-based access control" },
            { icon: Clock11Icon, text: "Custom workflows" },
            { icon: VoicemailIcon, text: "Unlimited integrations" },
          ],
        },
      ],
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-semibold lg:text-5xl">
            Choose the right plan for you
          </h2>
        </div>

        {/* Avatars and Additional Info */}
        <div className="mx-auto mb-12 flex max-w-3xl items-center justify-center gap-4">
          <div className="relative mr-2 flex items-center">
            <Avatar className="size-8 border border-primary">
              <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" />
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <Avatar className="absolute left-6 size-8 border border-primary">
              <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <Avatar className="absolute left-12 size-8 border border-primary">
              <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp" />
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>
          </div>

          {/* Sub title */}
          <div className="ml-8 flex items-center gap-4">
            <span className="text-sm font-medium">
              50K+ developers trust us
            </span>
            <div className="h-8 w-px bg-border" />
            <span className="text-sm font-medium">
              Cancel any time, without any hassle
            </span>
          </div>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-12 items-center rounded-full bg-muted p-1">
            <RadioGroup
              defaultValue="monthly"
              className="h-full grid-cols-2"
              onValueChange={(value) => {
                setIsAnnually(value === "annually");
              }}
            >
              <div className='h-full rounded-full transition-all has-[button[data-state="checked"]]:bg-background'>
                <RadioGroupItem
                  value="monthly"
                  id="monthly"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="monthly"
                  className="flex h-full cursor-pointer items-center justify-center px-7 text-xl font-semibold text-muted-foreground peer-data-[state=checked]:text-primary"
                >
                  Monthly
                </Label>
              </div>
              <div className='h-full rounded-full transition-all has-[button[data-state="checked"]]:bg-background'>
                <RadioGroupItem
                  value="annually"
                  id="annually"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="annually"
                  className="flex h-full cursor-pointer items-center justify-center gap-1 px-7 text-xl font-semibold text-muted-foreground peer-data-[state=checked]:text-primary"
                >
                  Yearly
                  <Badge
                    variant="outline"
                    className="ml-2 bg-primary px-1.5 text-secondary"
                  >
                    Save 20%
                  </Badge>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Pricing Packages */}
        <div className="mt-10 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg, idx) => (
            <div key={idx} className="rounded-2xl border p-6">
              <div className="flex h-full flex-col justify-between gap-5">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl">{pkg.title}</h3>
                    {pkg.isPopular && <Badge>Popular</Badge>}
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-5xl font-semibold">
                      {isAnnually ? pkg.annualPrice : pkg.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground">
                      {isAnnually ? "/mo, billed annually" : "/mo"}
                    </span>
                  </div>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-pointer border-b border-dashed border-muted-foreground">
                          {pkg.description}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="">
                        Credits can be used for premium features and services.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button className="mt-6 w-full rounded-full">
                    {pkg.title === "Enterprise Plan"
                      ? "Contact Sale"
                      : "Get " + pkg.title}
                  </Button>
                  <div className="mt-6">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="mb-6">
                        <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                          {feature.title}
                        </h4>
                        <ul className="flex flex-col gap-3">
                          {feature.items.map((item, j) => (
                            <li key={j} className="flex gap-2">
                              <item.icon className="mt-1 size-4 shrink-0 text-primary" />
                              {item.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center text-muted-foreground">
          <Lock className="size-4" />
          <span className="ml-2 text-sm">
            Secure payment. Powered by{" "}
            <a href="https://shadcnblocks.com" className="underline">
              shadcnblocks.com
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export { Pricing28 };

```

```tsx
import { Check, ChevronRight } from "lucide-react";
import { type SVGProps, useId } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type PricingTier = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: {
    text: string;
    href: string;
  };
};
const ITEMS: PricingTier[] = [
  {
    name: "STARTER",
    price: "$0",
    description: "Free for everyone",
    features: ["Unlimited members", "250 transactions", "No support"],
    cta: {
      text: "Start for free",
      href: "/signup",
    },
  },
  {
    name: "BASIC",
    price: "$29.99",
    description: "per user per month",
    features: [
      "All free plan features and...",
      "Mainline AI",
      "Unlimited teams",
    ],
    cta: {
      text: "7 days free",
      href: "/signup",
    },
  },
  {
    name: "ENTERPRISE",
    price: "$ENT",
    description: "Custom pricing",
    features: [
      "All basic plan features and...",
      "Advanced security controls",
      "Migration support",
    ],
    cta: {
      text: "Book a demo",
      href: "/",
    },
  },
];
export const Pricing29 = () => {
  return (
    <section className="relative overflow-hidden py-32 text-center">
      <div className="container">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          Pricing
        </h1>
        <div className="mx-auto mt-4 max-w-[45rem] space-y-2">
          <p className="text-2xl text-muted-foreground md:text-3xl">
            Use Charter for free with your whole team. Upgrade to enable
            enhanced features.
          </p>
        </div>

        <div className="relative mt-8 overflow-hidden md:mt-12 lg:mt-20">
          {/* Background and layout wrapper */}
          <div className="absolute inset-0 hidden rounded-3xl bg-linear-to-r from-primary to-primary/80 md:block">
            <PlusSigns className="h-full w-full text-foreground/[0.05]" />
          </div>

          <div className="relative space-y-6 md:grid md:grid-cols-3 md:space-y-0 md:divide-x md:divide-background/20 md:p-6 lg:p-8">
            {ITEMS.map((tier, index) => (
              <PricingCard
                key={tier.name}
                tier={tier}
                isHighlighted={index === 1}
              />
            ))}
          </div>
        </div>
        <div className="absolute -inset-40 z-[-1] [mask-image:radial-gradient(circle_at_center,black_0%,black_20%,transparent_75%)]">
          <PlusSigns className="size-full text-foreground/[0.05]" />
        </div>
      </div>
    </section>
  );
};

function PricingCard({
  tier,
  isHighlighted,
}: {
  tier: PricingTier;
  isHighlighted: boolean;
}) {
  const styles = {
    card: cn(
      "flex flex-col gap-6 rounded-xl p-6 sm:rounded-2xl md:rounded-none lg:p-8",
      // Mobile styles
      isHighlighted
        ? "max-md:from-primary max-md:to-primary/80 max-md:bg-linear-to-r"
        : "bg-background max-md:border",
      // Desktop styles
      "md:bg-transparent",
    ),
    title: cn(
      "font-mono text-sm tracking-widest",
      // Mobile styles
      isHighlighted ? "text-background/70" : "text-foreground/70",
      // Desktop styles
      "md:text-background/70",
    ),
    price: cn(
      "text-5xl font-semibold tracking-tight",
      // Mobile styles
      isHighlighted ? "text-background" : "text-foreground",
      // Desktop styles
      "md:text-background",
    ),
    description: cn(
      "mt-2 text-xl font-medium",
      // Mobile styles
      isHighlighted ? "text-background/70" : "text-foreground/70",
      // Desktop styles
      "md:text-background/70",
    ),
    features: cn(
      "space-y-3 text-sm",
      // Mobile styles
      isHighlighted ? "text-background/70" : "text-foreground/70",
      // Desktop styles
      "md:text-background/70",
    ),
    button: cn(
      "group border-foreground/20 relative w-full",
      // inset shadow
      "after:from-border after:via-border after:absolute after:inset-0 after:bg-linear-to-t after:to-transparent after:content-[''] after:group-hover:opacity-100 isolate after:z-[-1]",
      // Desktop styles
      "md:border-background/40 md:text-background md:bg-transparent md:after:opacity-0",
      isHighlighted &&
        "md:bg-background md:text-primary hover:md:bg-background/90",
    ),
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{tier.name}</h3>
      <div>
        <p className={styles.price}>{tier.price}</p>
        <p className={styles.description}>{tier.description}</p>
      </div>
      <ul className={styles.features}>
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Check className="size-4 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-1 items-end">
        <Button
          asChild
          variant={isHighlighted ? "secondary" : "outline"}
          size="lg"
          className={styles.button}
        >
          <a href={tier.cta.href}>
            {tier.cta.text}
            <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Button>
      </div>
    </div>
  );
}

interface PlusSignsProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const PlusSigns = ({ className, ...props }: PlusSignsProps) => {
  const GAP = 16;
  const STROKE_WIDTH = 1;
  const PLUS_SIZE = 6;
  const id = useId();
  const patternId = `plus-pattern-${id}`;

  return (
    <svg width={GAP * 2} height={GAP * 2} className={className} {...props}>
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={GAP}
          height={GAP}
          patternUnits="userSpaceOnUse"
        >
          <line
            x1={GAP / 2}
            y1={(GAP - PLUS_SIZE) / 2}
            x2={GAP / 2}
            y2={(GAP + PLUS_SIZE) / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
          <line
            x1={(GAP - PLUS_SIZE) / 2}
            y1={GAP / 2}
            x2={(GAP + PLUS_SIZE) / 2}
            y2={GAP / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

```

```tsx
"use client";
import {
  ArrowRight,
  Bell,
  Book,
  Brush,
  CalendarCheck2,
  CheckSquare,
  ClipboardList,
  Code,
  Database,
  FileText,
  GitBranch,
  GitPullRequest,
  LayoutGrid,
  LifeBuoy,
  LucideIcon,
  MonitorSmartphone,
  PhoneCall,
  Server,
  Settings2,
  Slack,
  Users,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface FeatureItem {
  icon: LucideIcon;
  text: string;
}

interface PricingPlan {
  name: string;
  priceMonthly: string;
  description: string;
  bestFor: string;
  features?: FeatureItem[];
  mostPopular?: boolean;
  cta: {
    text: string;
    href: string;
  };
}

const PLANS: PricingPlan[] = [
  {
    name: "Starter",
    priceMonthly: "$9",
    description: "Great for solo developers",
    bestFor: "Freelancers just starting out",
    features: [
      { icon: Code, text: "Access to core components" },
      { icon: LayoutGrid, text: "Basic layout blocks" },
      { icon: MonitorSmartphone, text: "Responsive design templates" },
      { icon: FileText, text: "Starter documentation" },
      { icon: GitBranch, text: "Version history" },
      { icon: LifeBuoy, text: "Community support" },
      { icon: Book, text: "UI guidebook PDF" },
    ],
    cta: {
      text: "Get started",
      href: "#",
    },
  },
  {
    name: "Pro",
    priceMonthly: "$29",
    description: "Best for growing teams",
    bestFor: "Small dev teams and startups",
    features: [
      { icon: Code, text: "Advanced UI block library" },
      { icon: Brush, text: "Custom themes support" },
      { icon: Settings2, text: "Design system tools" },
      { icon: CheckSquare, text: "Component tests included" },
      { icon: Zap, text: "Performance enhancements" },
      { icon: Server, text: "Shared components hosting" },
      { icon: PhoneCall, text: "Email + chat support" },
    ],
    cta: {
      text: "Get started",
      href: "#",
    },
  },
  {
    name: "Team",
    mostPopular: true,
    priceMonthly: "$59",
    description: "Collaborate and scale fast",
    bestFor: "Product teams with multiple projects",
    features: [
      { icon: Users, text: "Team access control" },
      { icon: GitPullRequest, text: "Merge & review UI blocks" },
      { icon: CalendarCheck2, text: "Priority feature roadmap" },
      { icon: Bell, text: "Update notifications" },
      { icon: Database, text: "Component usage analytics" },
      { icon: Slack, text: "Slack integration" },
      { icon: ClipboardList, text: "Project templates library" },
    ],
    cta: {
      text: "Get started",
      href: "#",
    },
  },
];

interface Pricing31Props {
  className?: string;
}

const Pricing31 = ({ className }: Pricing31Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-9.5">
          <h1 className="text-center font-serif text-5xl leading-none text-foreground md:text-6xl lg:text-7xl">
            A plan for any project you undertake
          </h1>
          <div className="mt-3 grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
            {PLANS.map((plan, index) => (
              <PlanCard key={index} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PlanCard = ({ plan }: { plan: PricingPlan }) => {
  return (
    <div
      className={`relative h-full w-full rounded-lg border px-6 py-5 ${plan?.mostPopular ? "border-primary" : "border-border"} bg-background`}
    >
      <div className="text-2xl">{plan.name}</div>
      <div className="text-[2.875rem] leading-[1.05] font-semibold">
        {plan.priceMonthly}
      </div>
      <div className="text-xs text-foreground/60">
        <div>per person / month</div>
        <div>{plan.bestFor}</div>
      </div>
      <div className="mt-4 mb-6 text-lg font-medium text-foreground">
        {plan.description}
      </div>
      <Button
        asChild
        className="w-full"
        variant={plan.mostPopular ? "default" : "outline"}
        size="lg"
      >
        <a href={plan.cta.href}>
          {plan.cta.text}
          <ArrowRight />
        </a>
      </Button>
      <div className="mt-6 flex flex-col gap-4">
        {plan.features?.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 text-foreground">
            <feature.icon className="size-5 stroke-1" />
            {feature.text}
          </div>
        ))}
      </div>
      {plan.mostPopular && (
        <div className="absolute top-0 left-1/2 w-fit -translate-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
          Most popular
        </div>
      )}
    </div>
  );
};

export { Pricing31 };

```

```tsx
"use client";
import {
  ArrowRight,
  Bell,
  Book,
  Brush,
  CalendarCheck2,
  CheckSquare,
  ClipboardList,
  Code,
  Database,
  FileText,
  GitBranch,
  GitPullRequest,
  LayoutGrid,
  LifeBuoy,
  LucideIcon,
  MonitorSmartphone,
  PhoneCall,
  Server,
  Settings2,
  Slack,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FeatureItem {
  icon: LucideIcon;
  text: string;
}

interface PricingPlan {
  name: string;
  priceMonthly: string;
  priceYearly: string;
  description: string;
  bestFor: string;
  features?: FeatureItem[];
  mostPopular?: boolean;
  cta: {
    text: string;
    href: string;
  };
}

const PLANS: PricingPlan[] = [
  {
    name: "Starter",
    priceMonthly: "$9",
    priceYearly: "$90",
    description: "Great for solo developers",
    bestFor: "Freelancers just starting out",
    features: [
      { icon: Code, text: "Access to core components" },
      { icon: LayoutGrid, text: "Basic layout blocks" },
      { icon: MonitorSmartphone, text: "Responsive design templates" },
      { icon: FileText, text: "Starter documentation" },
      { icon: GitBranch, text: "Version history" },
      { icon: LifeBuoy, text: "Community support" },
      { icon: Book, text: "UI guidebook PDF" },
    ],
    cta: {
      text: "Get started",
      href: "#",
    },
  },
  {
    name: "Pro",
    mostPopular: true,
    priceMonthly: "$29",
    priceYearly: "$290",
    description: "Best for growing teams",
    bestFor: "Small dev teams and startups",
    features: [
      { icon: Code, text: "Advanced UI block library" },
      { icon: Brush, text: "Custom themes support" },
      { icon: Settings2, text: "Design system tools" },
      { icon: CheckSquare, text: "Component tests included" },
      { icon: Zap, text: "Performance enhancements" },
      { icon: Server, text: "Shared components hosting" },
      { icon: PhoneCall, text: "Email + chat support" },
    ],
    cta: {
      text: "Get started",
      href: "#",
    },
  },
  {
    name: "Team",
    priceMonthly: "$59",
    priceYearly: "$590",
    description: "Collaborate and scale fast",
    bestFor: "Product teams with multiple projects",
    features: [
      { icon: Users, text: "Team access control" },
      { icon: GitPullRequest, text: "Merge & review UI blocks" },
      { icon: CalendarCheck2, text: "Priority feature roadmap" },
      { icon: Bell, text: "Update notifications" },
      { icon: Database, text: "Component usage analytics" },
      { icon: Slack, text: "Slack integration" },
      { icon: ClipboardList, text: "Project templates library" },
    ],
    cta: {
      text: "Get started",
      href: "#",
    },
  },
  {
    name: "Business",
    priceMonthly: "$99",
    priceYearly: "$990",
    description: "Full control and support",
    bestFor: "Agencies and large-scale teams",
    cta: {
      text: "Get started",
      href: "#",
    },
  },
  {
    name: "Enterprise",
    priceMonthly: "$199",
    priceYearly: "$1,990",
    description: "Custom solutions at scale",
    bestFor: "Large enterprises and SaaS platforms",
    cta: {
      text: "Get started",
      href: "#",
    },
  },
];

interface Pricing32Props {
  className?: string;
}

const Pricing32 = ({ className }: Pricing32Props) => {
  const [checked, setChecked] = useState(true);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-9.5">
          <h1 className="text-center font-serif text-5xl leading-none text-foreground md:text-6xl lg:text-7xl">
            A plan for any project you undertake
          </h1>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-4">
              <Label
                htmlFor="plan-duration"
                className={`${!checked ? "text-foreground" : "text-muted-foreground"} text-sm`}
              >
                Annual
              </Label>
              <Switch
                id="plan-duration"
                checked={checked}
                onCheckedChange={setChecked}
              />
              <Label
                htmlFor="plan-duration"
                className={`${checked ? "text-foreground" : "text-muted-foreground"} text-sm`}
              >
                Monthly
              </Label>
            </div>
            <div className="text-center text-green-600">
              Save as much as 40% with annual billing
            </div>
          </div>
          <div className="mt-3 grid w-full grid-cols-1 gap-5 lg:grid-cols-6">
            {PLANS.map((plan, index) => (
              <PlanCard
                key={index}
                plan={plan}
                monthly={checked}
                className={
                  index > PLANS.length - 3 ? "lg:col-span-3" : "lg:col-span-2"
                }
              />
            ))}
          </div>
        </div>
        <div className="m-9.5 flex items-center justify-center">
          <Button size="lg">Compare all plans</Button>
        </div>
      </div>
    </section>
  );
};

const PlanCard = ({
  plan,
  monthly,
  className,
}: {
  plan: PricingPlan;
  monthly: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`relative h-full w-full rounded-lg border px-6 py-5 ${className} ${plan?.mostPopular ? "border-primary" : "border-border"} bg-background`}
    >
      <div className="text-2xl">{plan.name}</div>
      <div className="h-[2.875rem] overflow-hidden">
        <div
          className={`text-[2.875rem] leading-none font-semibold transition-transform duration-500 ${monthly ? "translate-y-0" : "translate-y-[-3rem]"}`}
        >
          <div>{plan.priceMonthly}</div>
          <div>{plan.priceYearly}</div>
        </div>
      </div>
      <div className="text-xs text-foreground/60">
        <div>per person / {monthly ? "month" : "year"}</div>
        <div>{plan.bestFor}</div>
      </div>
      <div className="mt-4 mb-6 text-lg font-medium text-foreground">
        {plan.description}
      </div>
      <Button
        asChild
        className="w-full"
        variant={plan.mostPopular ? "default" : "outline"}
        size="lg"
      >
        <a href={plan.cta.href}>
          {plan.cta.text}
          <ArrowRight />
        </a>
      </Button>
      <div className="mt-6 flex flex-col gap-4">
        {plan.features?.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 text-foreground">
            <feature.icon className="size-5 stroke-1" />
            {feature.text}
          </div>
        ))}
      </div>
      {plan.mostPopular && (
        <div className="absolute top-0 left-1/2 w-fit -translate-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
          Most popular
        </div>
      )}
    </div>
  );
};

export { Pricing32 };

```

```tsx
import {
  CalendarSync,
  Globe,
  MessageCircle,
  MessagesSquare,
  PlusCircle,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ADDONS = [
  {
    icon: CalendarSync,
    name: "Automatically refill your credits",
    description:
      "Set your threshold, and we'll auto-refill your credits—no expiration, no interruptions!",
    price: {
      unit: "Total per 1000 message credits",
      amount: "$14",
    },
    link: "#",
  },
  {
    icon: MessageCircle,
    name: "Bonus message credits",
    description: "$12 per 1000 credits / month",
    price: {
      unit: "Total per month",
      amount: "$12",
    },
    link: "#",
  },
  {
    icon: MessagesSquare,
    name: "Additional agents",
    description: "$7 per AI agent / month",
    price: {
      unit: "Total per month",
      amount: "$7",
    },
    link: "#",
  },
  {
    icon: Globe,
    name: "Personalized domains",
    description:
      "Use your custom domains for the AI agent’s embed script, iframe, and shareable link—fully branded and seamless!",
    price: {
      unit: "Total per month",
      amount: "$59",
    },
    link: "#",
  },
  {
    icon: Sparkles,
    name: "Remove Watermark",
    description: "Remove the branding from the iframe and widget",
    price: {
      unit: "Total per month",
      amount: "$39",
    },
    link: "#",
  },
];

interface Pricing33Props {
  className?: string;
}

const Pricing33 = ({ className }: Pricing33Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col items-center gap-4">
          <Badge className="flex items-center gap-2 rounded-full border border-muted bg-background px-4 py-1.5">
            <PlusCircle className="size-2 text-primary" />
            <p className="text-sm leading-5 font-medium text-foreground">
              Add-ons
            </p>
          </Badge>
          <h2 className="max-w-full text-center text-3xl font-semibold md:max-w-[42.5rem] md:text-5xl">
            Enhance your plan with powerful add-ons!
          </h2>
          <div className="flex w-full flex-col items-center gap-4 pt-10">
            {ADDONS.map((addon, i) => (
              <div
                className="grid w-full rounded-2xl border border-muted shadow-xs xl:grid-cols-[minmax(36.25rem,48.125rem)_1fr]"
                key={`addon-${i}`}
              >
                <div className="flex w-full flex-col gap-4 p-6 md:flex-row">
                  <div className="relative flex size-12 after:absolute after:top-1/2 after:left-1/2 after:z-10 after:block after:size-full after:-translate-1/2 after:rounded-full after:content-['']">
                    <div className="relative z-20 m-auto flex size-11.5 shrink-0 rounded-full bg-black">
                      <addon.icon className="m-auto size-5 stroke-white" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-medium">{addon.name}</h3>
                    <p className="text-base text-muted-foreground">
                      {addon.description}
                    </p>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center gap-2 p-6 md:flex-row">
                  <div className="flex w-full flex-wrap items-center gap-4 md:flex-nowrap">
                    <div className="text-lg font-semibold">
                      {addon.price.amount}
                    </div>
                    <div className="text-xs text-foreground/60">
                      {addon.price.unit}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="block h-12 w-full px-4 md:max-w-[10.625rem]"
                  >
                    <a href={addon.link}>Get Add-on</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing33 };

```

```tsx
"use client";

import { BadgeCheck } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const PRICING_PLANS = [
  {
    name: "Basic Plan",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    period: {
      monthly: "Per month/user",
      yearly: "Per year/user",
    },
    description: {
      monthly:
        "Ideal for individuals getting started with our service. No credit card required.",
      yearly:
        "Ideal for individuals getting started with our service. No credit card required.",
    },
    buttonText: "Start for Free",
    highlighted: false,
    features: [
      "Limited Access Features",
      "Basic Support",
      "Weekly Blogs",
      "100GB Drive",
      "All framework support",
    ],
  },
  {
    name: "Standard Plan",
    monthlyPrice: "$20",
    yearlyPrice: "$200",
    period: {
      monthly: "Per month/user",
      yearly: "Per year/user",
    },
    description: {
      monthly:
        "Perfect for small businesses looking to grow. Start with a 30-day free trial.",
      yearly:
        "Perfect for small businesses looking to grow. Save 16% compared to monthly billing.",
    },
    buttonText: "Get Started",
    highlighted: true,
    features: [
      "Limited Access Features",
      "Basic Support",
      "Weekly Blogs",
      "100GB Drive",
      "All framework support",
    ],
  },
  {
    name: "Premium Plan",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    period: {
      monthly: "Per month/user",
      yearly: "Per year/user",
    },
    description: {
      monthly:
        "Best for large organizations with advanced needs. Contact us for a custom quote.",
      yearly:
        "Best for large organizations with advanced needs. Contact us for a custom quote.",
    },
    buttonText: "Get Started",
    highlighted: false,
    features: [
      "Limited Access Features",
      "Basic Support",
      "Weekly Blogs",
      "100GB Drive",
      "All framework support",
    ],
  },
];

interface Pricing34Props {
  className?: string;
}

const Pricing34 = ({ className }: Pricing34Props) => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container flex flex-col gap-13">
        <h1 className="text-center text-6xl font-bold tracking-tighter text-foreground">
          Simple Pricing Plans
        </h1>

        <div className="flex justify-center">
          <ToggleGroup
            type="single"
            value={billingCycle}
            onValueChange={(value) => {
              if (value && value !== billingCycle) {
                setBillingCycle(value);
              }
            }}
            className="rounded-lg bg-muted p-1"
          >
            <ToggleGroupItem
              value="monthly"
              className="h-8 w-32 rounded-md data-[state=on]:bg-background"
            >
              Monthly
            </ToggleGroupItem>
            <ToggleGroupItem
              value="yearly"
              className="h-8 w-32 rounded-md data-[state=on]:bg-background"
            >
              Yearly
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-wrap justify-center gap-7">
          {PRICING_PLANS.map((plan, index) => (
            <Card
              key={index}
              className={`max-w-sm rounded-3xl border ${
                plan.highlighted ? "border-2 border-primary" : "border-border"
              } shadow-sm`}
            >
              <CardHeader>
                <CardTitle className="text-lg font-medium text-foreground">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <div className="text-5xl font-semibold tracking-tight text-muted-foreground">
                    {billingCycle === "monthly"
                      ? plan.monthlyPrice
                      : plan.yearlyPrice}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {billingCycle === "monthly"
                      ? plan.period.monthly
                      : plan.period.yearly}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-7 pt-6">
                <p className="text-sm text-muted-foreground">
                  {billingCycle === "monthly"
                    ? plan.description.monthly
                    : plan.description.yearly}
                </p>

                <Button className="mt-6 w-full">{plan.buttonText}</Button>

                <div className="relative mt-12 mb-4 flex items-center justify-center overflow-hidden">
                  <Separator />
                  <span className="px-3 text-xs text-muted-foreground opacity-50">
                    FEATURES
                  </span>
                  <Separator />
                </div>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <BadgeCheck className="size-5 text-muted-foreground" />
                      <span className="ml-3 text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Pricing34 };

```

```tsx
"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Pricing35Props {
  className?: string;
}

const Pricing35 = ({ className }: Pricing35Props) => {
  const pricingPlans = [
    {
      id: "standard",
      type: "standard",
      prices: {
        quarterly: "$15/mo",
        yearly: "$12/mo",
      },

      isDark: false,
      hasToggle: true,
      badge: "nulldfs",
      ctaText: "Start with standard",
      Description:
        "Ideal for individuals Or Freelancers getting started with our service. No credit card required.",
    },
    {
      id: "premium",
      type: "premium",
      prices: {
        quarterly: "Custom",
        yearly: "Custom",
      },
      isDark: true,
      hasToggle: false,
      badge: "10/300 Spots Availble",
      ctaText: "Become a Vip Member",
      Description:
        "Ideal for individuals Or Freelancers getting started with our service. No credit card required.",
    },
  ];

  const [billingPeriods, setBillingPeriods] = useState({
    standard: "quarterly",
    premium: "quarterly",
  });

  const updateBillingPeriod = (
    planId: string,
    period: "quarterly" | "yearly",
  ) => {
    setBillingPeriods((prev) => ({
      ...prev,
      [planId]: period,
    }));
  };

  return (
    <section className={cn("bg-background", className)}>
      <div className="container py-32">
        <header className="mb-10 flex flex-col items-center gap-6 md:mb-20">
          <h1 className="text-center text-5xl font-bold tracking-tighter text-foreground md:text-7xl">
            Flexible Pricing Plans
          </h1>
          <p className="w-full max-w-lg px-4 text-center text-base font-normal tracking-tight text-muted-foreground opacity-70 md:px-0 md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipiasicing elit.Lorem ipsum
            dolor sit amet consectetur
          </p>
        </header>

        {/* Pricing Cards */}
        <div className="flex flex-col justify-center gap-8 px-4 md:flex-row">
          {pricingPlans.map((plan) => {
            const currentPeriod = billingPeriods[
              plan.id as keyof typeof billingPeriods
            ] as "quarterly" | "yearly";

            return (
              <Card
                key={plan.id}
                className={`h-auto w-full overflow-hidden rounded-4xl border border-border shadow-sm ${plan.isDark ? "bg-foreground text-background" : "bg-background text-foreground"} md:max-w-md`}
              >
                <CardContent className="p-6">
                  {/* Price Section */}
                  <div className="mt-8 mb-8 md:mt-10 md:mb-10">
                    <div className="flex items-end">
                      <span className="w-full text-center text-5xl font-semibold tracking-tighter md:text-7xl">
                        {plan.prices[currentPeriod]}
                      </span>
                    </div>
                  </div>

                  {/* Divider with text */}
                  <div className="mb-8 flex items-center gap-4 md:mb-10">
                    <div className="h-px flex-1 bg-muted" />
                    <span className="text-center text-xs font-normal whitespace-nowrap uppercase opacity-50">
                      {plan.prices.yearly !== "Custom" &&
                      currentPeriod === "quarterly"
                        ? "BILLED QUARTERLY"
                        : plan.prices.yearly !== "Custom" &&
                            currentPeriod === "yearly"
                          ? "BILLED YEARLY"
                          : "Flexible billing"}
                    </span>
                    <div className="h-px flex-1 bg-muted" />
                  </div>

                  {/* Toggle or Badge */}
                  <div className="mb-8 flex justify-center md:mb-10">
                    {plan.hasToggle ? (
                      <ToggleGroup
                        type="single"
                        value={currentPeriod}
                        onValueChange={(value) => {
                          if (value)
                            updateBillingPeriod(
                              plan.id,
                              value as "quarterly" | "yearly",
                            );
                        }}
                        className="rounded-xl bg-muted p-1"
                      >
                        <ToggleGroupItem
                          value="quarterly"
                          className="h-8 w-20 rounded-lg data-[state=on]:bg-background"
                        >
                          <span className="text-center text-xs font-semibold text-foreground">
                            Quarterly
                          </span>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="yearly"
                          className="h-8 w-20 rounded-lg data-[state=on]:bg-background"
                        >
                          <span className="text-center text-xs font-semibold text-foreground">
                            Yearly
                          </span>
                        </ToggleGroupItem>
                      </ToggleGroup>
                    ) : plan.badge ? (
                      <Badge
                        className={`rounded-xl border bg-muted/20 ${plan.isDark ? "text-background" : "text-foreground"} px-3 py-2 text-xs font-semibold`}
                      >
                        {plan.badge}
                      </Badge>
                    ) : null}
                  </div>

                  {/* Annual Plan Text */}
                  <div className="mb-8 flex justify-center md:mb-10">
                    <span className="text-center text-xs font-normal whitespace-nowrap opacity-50">
                      {currentPeriod === "yearly"
                        ? "YOU'RE SAVING 20% WITH ANNUAL BILLING"
                        : "SAVE 20% ON AN ANNUAL PLAN"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mb-8 w-full text-center text-sm font-normal tracking-tight md:mb-10 md:text-base">
                    Ideal for individuals Or Freelancers getting started with
                    our service. No credit card required.
                  </p>

                  {/* CTA Button */}
                  <Button
                    variant={plan.isDark ? "secondary" : "default"}
                    className="h-10 w-full"
                  >
                    <span className="text-center text-sm font-normal md:text-base">
                      {plan.ctaText}
                    </span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Pricing35 };

```

```tsx
import { BadgeCheck, Clock, Handshake, Snowflake, Star } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { CardSpotlight } from "@/components/aceternity/card-spotlight";
import { Button } from "@/components/ui/button";

interface Pricing37Props {
  className?: string;
}

const Pricing37 = ({ className }: Pricing37Props) => {
  const PremiumPlan = {
    price: 125,
    features: [
      { icon: Snowflake, label: " All Premium components" },
      { icon: Handshake, label: "Early access" },
      { icon: Star, label: "Component Request" },
      { icon: Clock, label: "Free Lifetime updates" },
      { icon: BadgeCheck, label: "Shadcnblocks support" },
    ],
  };

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container flex w-full flex-col items-center justify-center px-4">
        <p className="rounded-full bg-muted px-2 py-1 text-xs uppercase">
          PRICING
        </p>
        <h2 className="relative py-2 text-center font-sans text-5xl font-semibold tracking-tighter lg:text-6xl">
          The Ultimate Block Toolkit
        </h2>
        <p className="text-md mx-auto max-w-xl px-5 text-center text-muted-foreground lg:text-lg">
          Perfectly balanced between performance and customization.
        </p>

        <CardSpotlight className="relative mt-14 w-full max-w-md overflow-hidden rounded-3xl text-background">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="text-md font-semibold"> Super Premium </p>
              <h3 className="mt-[11px] text-4xl font-semibold tracking-tight">
                ${PremiumPlan.price}
              </h3>
              <ul className="mt-[30px] space-y-[10px]">
                {PremiumPlan.features.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <item.icon className="size-4" />
                    <p className="text-[15px] font-medium tracking-tight opacity-50">
                      {item.label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              className="mt-20 w-full rounded-xl font-semibold"
              variant="secondary"
            >
              Get Instant Access
            </Button>
          </div>
        </CardSpotlight>
      </div>
    </section>
  );
};

export { Pricing37 };

```

```tsx
import { Check, Info, TrendingUp, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const starterFeatures = [
  "Social Media Management",
  "Content Creation",
  "Basic Analytics",
  "Monthly Reports",
];

const professionalFeatures = [
  "Advanced SEO Optimization",
  "Google Ads Management",
  "Facebook & Instagram Ads",
  "Email Marketing Campaigns",
  "Content Strategy",
  "Competitor Analysis",
  "Conversion Optimization",
  "Landing Page Design",
  "Video Content Creation",
  "Influencer Partnerships",
  "500+ Marketing Templates",
  "All Starter features included",
];

const enterpriseFeatures = [
  "Unlimited Campaign Management",
  "Dedicated Account Manager",
  "Priority Support 24/7",
  "All Professional features included",
];

interface Pricing38Props {
  className?: string;
}

const Pricing38 = ({ className }: Pricing38Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container px-4">
        <div className="rounded-lg border border-border bg-muted/40 p-1">
          <div className="grid gap-12 rounded-sm border border-border p-4 md:p-6 lg:grid-cols-2">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  SERVICE PACKAGES
                </p>
                <h2 className="text-2xl font-medium tracking-tight">
                  Grow your business with proven strategies.
                </h2>
                <p className="text-muted-foreground">
                  Choose from our comprehensive marketing packages designed to
                  scale your business from startup to enterprise level success.
                </p>
                <Alert className="w-fit items-center bg-muted/50 has-[>svg]:gap-x-2 [&>svg]:translate-y-0">
                  <Info />
                  <AlertTitle className="line-clamp-none text-xs">
                    All packages include a free consultation and strategy
                    session.
                  </AlertTitle>
                </Alert>
              </div>
              <Separator className="data-[orientation=horizontal]:w-12" />
              <div className="flex flex-col gap-4">
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  CUSTOM SOLUTIONS
                </p>
                <h2 className="text-2xl font-medium tracking-tight">
                  Need a tailored approach?
                </h2>
                <p className="text-muted-foreground">
                  <a href="#" className="transition-colors hover:text-primary">
                    Contact us
                  </a>{" "}
                  for custom marketing solutions or to discuss specific campaign
                  requirements that align with your business goals.
                </p>
              </div>
              <Separator className="data-[orientation=horizontal]:w-12" />
              <div className="flex flex-col gap-4">
                <p className="text-xs font-medium text-muted-foreground uppercase">
                  SUPPORT
                </p>
                <h2 className="text-2xl font-medium tracking-tight">
                  Ongoing optimization
                </h2>
                <p className="text-muted-foreground">
                  We continuously monitor and optimize your campaigns for
                  maximum ROI. Need adjustments? We're here to help.{" "}
                  <a href="#" className="transition-colors hover:text-primary">
                    Contact us
                  </a>
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <RadioGroup defaultValue="starter">
                <label
                  htmlFor="starter"
                  className="group relative flex cursor-pointer flex-col gap-4 rounded-lg border border-border p-8 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-background"
                >
                  <RadioGroupItem
                    value="starter"
                    id="starter"
                    className="hidden"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold">Starter</h3>
                      <p className="text-sm text-muted-foreground">
                        Perfect for small businesses
                      </p>
                    </div>
                    <span className="text-2xl font-bold">
                      $0
                      <span className="text-base font-normal text-muted-foreground">
                        /month
                      </span>
                    </span>
                  </div>
                  <Separator />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <p className="text-sm text-primary/80">
                        3 social media platforms
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <p className="text-sm text-primary/80">
                        Basic performance tracking
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {starterFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <p className="text-sm text-primary/80">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <span className="absolute -top-2 -right-2 z-10 flex size-5 items-center justify-center rounded-full bg-primary opacity-0 group-has-[[data-state=checked]]:opacity-100">
                    <Check className="size-3 text-background" />
                  </span>
                  <div className="max-h-0 overflow-hidden transition-all duration-300 ease-out group-has-[[data-state=checked]]:max-h-20">
                    <Button className="mt-4 w-full opacity-0 transition-opacity duration-300 group-has-[[data-state=checked]]:opacity-100">
                      Get Started
                    </Button>
                  </div>
                </label>
                <label
                  htmlFor="pro"
                  className="group relative flex cursor-pointer flex-col gap-4 rounded-lg border border-border p-8 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-background"
                >
                  <RadioGroupItem value="pro" id="pro" className="hidden" />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold">Pro</h3>
                      <p className="text-sm text-muted-foreground">
                        Complete marketing solution
                      </p>
                    </div>
                    <span className="text-2xl font-bold">
                      $20
                      <span className="text-base font-normal text-muted-foreground">
                        /month
                      </span>
                    </span>
                  </div>
                  <Separator />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <p className="text-sm text-primary/80">
                        All major platforms included
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <p className="text-sm text-primary/80">
                        Advanced analytics & reporting
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {professionalFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <p className="text-sm text-primary/80">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <span className="absolute -top-2 -right-2 z-10 flex size-5 items-center justify-center rounded-full bg-primary opacity-0 group-has-[[data-state=checked]]:opacity-100">
                    <Check className="size-3 text-background" />
                  </span>
                  <div className="max-h-0 overflow-hidden transition-all duration-300 ease-out group-has-[[data-state=checked]]:max-h-20">
                    <Button className="mt-4 w-full opacity-0 transition-opacity duration-300 group-has-[[data-state=checked]]:opacity-100">
                      Get Started
                    </Button>
                  </div>
                </label>
                <label
                  htmlFor="enterprise"
                  className="group relative flex cursor-pointer flex-col gap-4 rounded-lg border border-border p-8 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-background"
                >
                  <RadioGroupItem
                    value="enterprise"
                    id="enterprise"
                    className="hidden"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold">Enterprise</h3>
                      <p className="text-sm text-muted-foreground">
                        Unlimited growth potential
                      </p>
                    </div>
                    <span className="text-2xl font-bold">
                      $99
                      <span className="text-base font-normal text-muted-foreground">
                        /month
                      </span>
                    </span>
                  </div>
                  <Separator />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <p className="text-sm text-primary/80">
                        Unlimited platform management
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <p className="text-sm text-primary/80">
                        Real-time performance monitoring
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {enterpriseFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <p className="text-sm text-primary/80">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <span className="absolute -top-2 -right-2 z-10 flex size-5 items-center justify-center rounded-full bg-primary opacity-0 group-has-[[data-state=checked]]:opacity-100">
                    <Check className="size-3 text-background" />
                  </span>
                  <div className="max-h-0 overflow-hidden transition-all duration-300 ease-out group-has-[[data-state=checked]]:max-h-20">
                    <Button className="mt-4 w-full opacity-0 transition-opacity duration-300 group-has-[[data-state=checked]]:opacity-100">
                      Get Started
                    </Button>
                  </div>
                </label>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing38 };

```

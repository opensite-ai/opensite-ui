```tsx
import { BarChart3, Briefcase, Cloud, Shield } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    icon: <Shield strokeWidth={2} />,
    category: "Security",
    description:
      "Enterprise security solution providing advanced threat protection and monitoring",
    year: 2024,
    offer: "Free",
    segment: "Business",
  },
  {
    icon: <Cloud strokeWidth={2} />,
    category: "Technology",
    description:
      "Cloud-based platform offering scalable solutions for modern businesses",
    year: 2023,
    offer: "Professional",
    segment: "Business",
  },
  {
    icon: <Briefcase strokeWidth={2} />,
    category: "Services",
    description:
      "Comprehensive business management suite for growing organizations",
    year: 2022,
    offer: "Enterprise",
    segment: "Enterprise",
  },
  {
    icon: <BarChart3 strokeWidth={2} />,
    category: "Analytics",
    description:
      "Real-time data analytics platform with customizable dashboards and reporting",
    year: 2024,
    offer: "Professional",
    segment: "Business",
  },
  {
    icon: <Shield strokeWidth={2} />,
    category: "Security",
    description:
      "Advanced endpoint protection system with AI-powered threat detection",
    year: 2023,
    offer: "Professional",
    segment: "Enterprise",
  },
  {
    icon: <Cloud strokeWidth={2} />,
    category: "Technology",
    description:
      "Serverless computing platform with automatic scaling capabilities",
    year: 2024,
    offer: "Enterprise",
    segment: "Business",
  },
  {
    icon: <Briefcase strokeWidth={2} />,
    category: "Services",
    description:
      "Professional consulting services for digital transformation initiatives",
    year: 2023,
    offer: "Free",
    segment: "Business",
  },
];

interface List1Props {
  className?: string;
}

const List1 = ({ className }: List1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="hidden font-bold text-primary md:table-cell">
                Category
              </TableHead>
              <TableHead>
                <span className="hidden font-bold text-primary md:block">
                  Description
                </span>
                <span className="block font-bold text-primary md:hidden">
                  Project
                </span>
              </TableHead>
              <TableHead className="hidden text-right font-bold text-primary md:table-cell">
                Year
              </TableHead>
              <TableHead className="hidden font-bold text-primary md:table-cell">
                Offer
              </TableHead>
              <TableHead className="hidden font-bold text-primary md:table-cell">
                Segment
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.category}>
                <TableCell className="">
                  <div className="flex items-center gap-2 align-top">
                    {item.icon}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.category}
                </TableCell>
                <TableCell className="pl-0 align-top md:pl-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-1 md:hidden">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">
                          {item.category}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          - {item.segment}
                        </span>
                        <span
                          className={cn(
                            "ml-1 block h-1.5 w-4 rounded-full md:hidden",
                            item.offer === "Free" && "bg-yellow-400",
                            item.offer === "Professional" && "bg-green-400",
                            item.offer === "Enterprise" && "bg-blue-400",
                          )}
                        ></span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground md:text-primary">
                      {item.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden text-right md:table-cell">
                  {item.year}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "block h-6 w-1.5 rounded-full",
                        item.offer === "Free" && "bg-yellow-400",
                        item.offer === "Professional" && "bg-green-400",
                        item.offer === "Enterprise" && "bg-blue-400",
                      )}
                    ></span>
                    {item.offer}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.segment}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export { List1 };

```

```tsx
import {
  ArrowRight,
  Award,
  Building2,
  HeartHandshake,
  Leaf,
  Lightbulb,
  Trophy,
} from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ListItem {
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
  link: string;
}

interface List2Props {
  heading?: string;
  items?: ListItem[];
  className?: string;
}

const List2 = ({
  heading = "Our Achievements & Recognition",
  items = [
    {
      icon: <Trophy />,
      title: "Industry Recognition",
      category: "Achievement",
      description: "Outstanding Performance Award.",
      link: "#",
    },
    {
      icon: <Award />,
      title: "Excellence Award",
      category: "Recognition",
      description: "Best in Category Winner.",
      link: "#",
    },
    {
      icon: <Lightbulb />,
      title: "Innovation Prize",
      category: "Technology",
      description: "Breakthrough Solution of the Year.",
      link: "#",
    },
    {
      icon: <HeartHandshake />,
      title: "Customer Success",
      category: "Service",
      description: "Top-Rated Solution Provider.",
      link: "#",
    },
    {
      icon: <Building2 />,
      title: "Global Leadership",
      category: "Management",
      description: "Executive Team of the Year.",
      link: "#",
    },
    {
      icon: <Leaf />,
      title: "Sustainability Impact",
      category: "Environmental",
      description: "Green Initiative Excellence.",
      link: "#",
    },
  ],
  className,
}: List2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container px-0 md:px-8">
        <h1 className="mb-10 px-4 text-3xl font-semibold md:mb-14 md:text-4xl">
          {heading}
        </h1>
        <div className="flex flex-col">
          <Separator />
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-4">
                <div className="order-2 flex items-center gap-2 md:order-none">
                  <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-md bg-muted">
                    {item.icon}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                </div>
                <p className="order-1 text-2xl font-semibold md:order-none md:col-span-2">
                  {item.description}
                </p>
                <Button variant="outline" asChild>
                  <a
                    className="order-3 ml-auto w-fit gap-2 md:order-none"
                    href={item.link}
                  >
                    <span>View project</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <Separator />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export { List2 };

```

```tsx
import React from "react";

import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

const experiences = [
  {
    year: "2019 - PRESENT",
    role: "SENIOR SOFTWARE ENGINEER",
    company: "TECHNOLOGY INNOVATIONS CORP",
  },
  {
    year: "2018 - 2020",
    role: "FULL-STACK DEVELOPER",
    company: "DIGITAL SOLUTIONS & STARTUP COLLABORATIONS",
  },
  {
    year: "2017 - 2018",
    role: "FRONTEND DEVELOPER",
    company: "WEB CRAFT STUDIO",
  },
  {
    year: "2015 - 2016",
    role: "JUNIOR DEVELOPER",
    company: "CODE FORGE LABS",
  },
  {
    year: "2014 - 2015",
    role: "INTERN DEVELOPER",
    company: "INNOVATION TECH",
  },
];

const awards = [
  {
    year: "2015",
    title: "BEST NEWCOMER DEVELOPER",
    organization: "TECH EXCELLENCE AWARDS",
  },
  {
    year: "2015",
    title: "INNOVATION IN WEB DEVELOPMENT",
    organization: "DIGITAL CREATORS UK",
  },
  {
    year: "2016",
    title: "OUTSTANDING CODE QUALITY",
    organization: "BRITISH SOFTWARE ASSOCIATION",
  },
  {
    year: "2017",
    title: "RISING STAR IN TECH",
    organization: "GLOBAL DEVELOPER AWARDS",
  },
  {
    year: "2018",
    title: "DEVELOPER OF THE YEAR",
    organization: "CODE EXCELLENCE AWARDS",
  },
  {
    year: "2019",
    title: "BEST TECH TEAM LEADER",
    organization: "UK SOFTWARE GUILD",
  },
  {
    year: "2020",
    title: "INNOVATION IN SOFTWARE ARCHITECTURE",
    organization: "DIGITAL INNOVATION AWARDS",
  },
  {
    year: "2021",
    title: "EMERGING TECH LEADER",
    organization: "LONDON TECH COUNCIL",
  },
  {
    year: "2022",
    title: "EXCELLENCE IN FULL-STACK DEVELOPMENT",
    organization: "DEVELOPER WEEKLY",
  },
  {
    year: "2023",
    title: "BEST SOFTWARE ENGINEER",
    organization: "EUROPEAN TECH & MEDIA",
  },
];

interface List3Props {
  className?: string;
}

const List3 = ({ className }: List3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-5">
            <span className="text-sm text-muted-foreground">/ CAREER PATH</span>
            <h1 className="text-4xl md:text-6xl">
              BUILDING SOLUTIONS,
              <br /> SHAPING THE FUTURE
            </h1>
          </div>
          <div className="flex flex-col gap-7">
            <h2 className="text-xl">/ EXPERIENCE</h2>
            <div>
              {experiences.map((experience, idx) => (
                <React.Fragment key={idx}>
                  <Separator />
                  <div className="my-2.5 grid gap-2.5 text-sm sm:grid-cols-3">
                    <p className="text-muted-foreground">{experience.year}</p>
                    <p>{experience.role}</p>
                    <p className="text-muted-foreground">
                      {experience.company}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <h2 className="text-xl">/ ACHIEVEMENTS</h2>
            <div>
              {awards.map((award, idx) => (
                <React.Fragment key={idx}>
                  <Separator />
                  <div className="my-2.5 grid gap-2.5 text-sm sm:grid-cols-3">
                    <p className="text-muted-foreground">{award.year}</p>
                    <p>{award.title}</p>
                    <p className="text-muted-foreground">
                      {award.organization}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { List3 };

```
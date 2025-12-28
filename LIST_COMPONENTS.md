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


```tsx
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronDown, ChevronUp, Menu } from 'lucide-react';

import {
  AlertCircle,
  BarChart3,
  CreditCard,
  Globe,
  HardDrive,
  Info,
  LineChart,
  RefreshCw,
  Server,
  Shield,
  Users,
  Zap,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CompactMetric {
  id: string;
  icon: React.ReactNode;
  name: string;
  value: string;
  previousValue?: string;
  changePercentage?: number;
  status?: 'positive' | 'negative' | 'neutral' | 'warning';
  category: string;
  info?: string;
}

export default function CompactMetricList() {
  const [activeTab, setActiveTab] = useState('all');

  const metrics: CompactMetric[] = [
    // Performance Metrics - Reduced to 3
    {
      id: 'response-time',
      icon: <Zap className="h-4 w-4" />,
      name: 'Response Time',
      value: '32ms',
      previousValue: '39ms',
      changePercentage: -18,
      status: 'positive',
      category: 'performance',
      info: 'Average API response time across all endpoints',
    },
    {
      id: 'uptime',
      icon: <Server className="h-4 w-4" />,
      name: 'System Uptime',
      value: '99.99%',
      previousValue: '99.97%',
      changePercentage: 0.02,
      status: 'positive',
      category: 'performance',
      info: 'Service availability over the past 30 days',
    },
    {
      id: 'requests',
      icon: <RefreshCw className="h-4 w-4" />,
      name: 'Requests/Sec',
      value: '45K',
      previousValue: '34K',
      changePercentage: 32,
      status: 'neutral',
      category: 'performance',
      info: 'Peak request rate during high traffic periods',
    },

    // Security Metrics - Reduced to 2
    {
      id: 'blocked-threats',
      icon: <Shield className="h-4 w-4" />,
      name: 'Threats Blocked',
      value: '1.2M+',
      previousValue: '970K',
      changePercentage: 24,
      status: 'positive',
      category: 'security',
      info: 'Malicious requests blocked monthly',
    },
    {
      id: '2fa-adoption',
      icon: <AlertCircle className="h-4 w-4" />,
      name: '2FA Adoption',
      value: '78%',
      previousValue: '65%',
      changePercentage: 20,
      status: 'positive',
      category: 'security',
      info: 'Percentage of users with 2FA enabled',
    },

    // User Metrics - Reduced to 2
    {
      id: 'active-users',
      icon: <Users className="h-4 w-4" />,
      name: 'Active Users',
      value: '2.4M',
      previousValue: '2.05M',
      changePercentage: 17,
      status: 'positive',
      category: 'users',
      info: 'Monthly active users',
    },
    {
      id: 'retention',
      icon: <BarChart3 className="h-4 w-4" />,
      name: '30d Retention',
      value: '84%',
      previousValue: '79%',
      changePercentage: 6.3,
      status: 'positive',
      category: 'users',
      info: 'User retention rate after 30 days',
    },

    // Infrastructure Metrics - Reduced to 2
    {
      id: 'data-processed',
      icon: <HardDrive className="h-4 w-4" />,
      name: 'Data Processed',
      value: '8.7 PB',
      previousValue: '6.1 PB',
      changePercentage: 42,
      status: 'neutral',
      category: 'infrastructure',
      info: 'Total data processed monthly',
    },
    {
      id: 'bandwidth',
      icon: <Globe className="h-4 w-4" />,
      name: 'Bandwidth Usage',
      value: '240 TB',
      previousValue: '190 TB',
      changePercentage: 26,
      status: 'warning',
      category: 'infrastructure',
      info: 'Total bandwidth consumption this month',
    },

    // Business Metrics - Reduced to 2
    {
      id: 'transactions',
      icon: <CreditCard className="h-4 w-4" />,
      name: 'Transactions',
      value: '$740M',
      previousValue: '$578M',
      changePercentage: 28,
      status: 'positive',
      category: 'business',
      info: 'Total transaction volume processed',
    },
    {
      id: 'mrr',
      icon: <LineChart className="h-4 w-4" />,
      name: 'MRR',
      value: '$4.2M',
      previousValue: '$3.6M',
      changePercentage: 16.7,
      status: 'positive',
      category: 'business',
      info: 'Monthly recurring revenue',
    },
  ];

  // Filter metrics based on active tab
  const filteredMetrics =
    activeTab === 'all'
      ? metrics
      : metrics.filter((metric) => metric.category === activeTab);

  // Function to handle tab change via dropdown
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <section className="bg-background w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">System Metrics</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Platform Health & Performance
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-lg">
            Key metrics across our infrastructure, security, and business
            operations.
          </p>
        </div>

        <Card className="border p-0 shadow-sm">
          <CardContent className="p-0">
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full gap-0"
            >
              {/* Mobile view: Dropdown for categories */}
              <div className="border-b p-3 md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span>
                        {activeTab === 'all'
                          ? 'All Metrics'
                          : activeTab.charAt(0).toUpperCase() +
                            activeTab.slice(1)}
                      </span>
                      <Menu className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[200px]">
                    <DropdownMenuItem onClick={() => handleTabChange('all')}>
                      All Metrics
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleTabChange('performance')}
                    >
                      Performance
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleTabChange('security')}
                    >
                      Security
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTabChange('users')}>
                      Users
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleTabChange('infrastructure')}
                    >
                      Infrastructure
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleTabChange('business')}
                    >
                      Business
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Desktop view: Horizontal tabs */}
              <div className="hidden border-b px-4 md:block">
                <TabsList className="h-12 bg-transparent">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-muted rounded-none data-[state=active]:shadow-none"
                  >
                    All Metrics
                  </TabsTrigger>
                  <TabsTrigger
                    value="performance"
                    className="data-[state=active]:bg-muted rounded-none data-[state=active]:shadow-none"
                  >
                    Performance
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="data-[state=active]:bg-muted rounded-none data-[state=active]:shadow-none"
                  >
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    className="data-[state=active]:bg-muted rounded-none data-[state=active]:shadow-none"
                  >
                    Users
                  </TabsTrigger>
                  <TabsTrigger
                    value="infrastructure"
                    className="data-[state=active]:bg-muted rounded-none data-[state=active]:shadow-none"
                  >
                    Infrastructure
                  </TabsTrigger>
                  <TabsTrigger
                    value="business"
                    className="data-[state=active]:bg-muted rounded-none data-[state=active]:shadow-none"
                  >
                    Business
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value={activeTab} className="mt-0 p-0">
                <div className="grid grid-cols-1 divide-y">
                  {filteredMetrics.length === 0 ? (
                    <div className="text-muted-foreground py-8 text-center">
                      No metrics available for this category.
                    </div>
                  ) : (
                    filteredMetrics.map((metric) => (
                      <div
                        key={metric.id}
                        className="hover:bg-muted/50 flex items-center justify-between px-4 py-4 transition-colors md:px-6"
                      >
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <div
                            className={cn(
                              'flex h-8 w-8 items-center justify-center rounded-full',
                              metric.status === 'positive' &&
                                'bg-green-100 text-green-600',
                              metric.status === 'negative' &&
                                'bg-red-100 text-red-600',
                              metric.status === 'warning' &&
                                'bg-amber-100 text-amber-600',
                              metric.status === 'neutral' &&
                                'bg-blue-100 text-blue-600'
                            )}
                          >
                            {metric.icon}
                          </div>

                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <span className="text-sm font-medium">
                                {metric.name}
                              </span>
                              {metric.info && (
                                <div className="group relative ml-1.5">
                                  <Info className="text-muted-foreground h-3.5 w-3.5 cursor-help" />
                                  <div className="bg-background invisible absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 transform rounded border p-2 text-xs opacity-0 shadow-md transition-all group-hover:visible group-hover:opacity-100">
                                    {metric.info}
                                  </div>
                                </div>
                              )}
                            </div>
                            <span className="text-muted-foreground text-xs capitalize">
                              {metric.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 md:space-x-4">
                          {metric.previousValue && (
                            <span className="text-muted-foreground hidden text-sm md:inline-block">
                              {metric.previousValue}
                            </span>
                          )}

                          <div className="flex flex-col items-end">
                            <span className="font-bold">{metric.value}</span>

                            {metric.changePercentage !== undefined && (
                              <div
                                className={cn(
                                  'flex items-center text-xs',
                                  metric.status === 'positive' &&
                                    'text-green-600',
                                  metric.status === 'negative' &&
                                    'text-red-600',
                                  metric.status === 'warning' &&
                                    'text-amber-600',
                                  metric.status === 'neutral' && 'text-blue-600'
                                )}
                              >
                                {metric.changePercentage > 0 ? (
                                  <ChevronUp className="mr-0.5 h-3 w-3" />
                                ) : metric.changePercentage < 0 ? (
                                  <ChevronDown className="mr-0.5 h-3 w-3" />
                                ) : null}
                                {Math.abs(metric.changePercentage)}%
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-muted-foreground order-2 text-sm sm:order-1">
            <span className="font-medium">Last updated:</span> Today at 15:42
            UTC
          </div>

          <Button
            variant="outline"
            size="sm"
            className="group order-1 sm:order-2"
            asChild
          >
            <a href="#">
              View complete dashboard
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

```

```tsx
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRightIcon,
  CheckIcon,
  ShieldCheckIcon,
  UsersIcon,
  XIcon,
} from 'lucide-react';

export default function HeroSectionFeatureComparison() {
  return (
    <>
      {/* Hero */}
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        {/* Announcement */}
        <div className="mb-8 flex justify-center">
          <Badge variant="outline" className="text-sm">
            New Enterprise Plan Available
          </Badge>
        </div>

        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-primary mx-auto mb-4 max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
            Choose the perfect plan for your needs
          </h1>
          <p className="text-foreground mx-auto max-w-4xl text-base text-balance sm:text-lg">
            From startups to enterprises, we have a plan that scales with your
            business. Compare features and find your fit.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-lg border">
              <table className="divide-border min-w-full divide-y">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-foreground px-6 py-3 text-left text-sm font-semibold">
                      Feature
                    </th>
                    <th className="text-foreground px-6 py-3 text-center text-sm font-semibold">
                      Basic
                    </th>
                    <th className="text-foreground px-6 py-3 text-center text-sm font-semibold">
                      Pro
                    </th>
                    <th className="text-foreground px-6 py-3 text-center text-sm font-semibold">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-border bg-background divide-y">
                  {features.map((feature, index) => (
                    <tr key={index}>
                      <td className="text-foreground px-6 py-4 text-sm whitespace-nowrap">
                        {feature.name}
                      </td>
                      <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                        {feature.basic ? (
                          <CheckIcon className="mx-auto h-5 w-5 text-green-600" />
                        ) : (
                          <XIcon className="mx-auto h-5 w-5 text-red-600" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                        {feature.pro ? (
                          <CheckIcon className="mx-auto h-5 w-5 text-green-600" />
                        ) : (
                          <XIcon className="mx-auto h-5 w-5 text-red-600" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm whitespace-nowrap">
                        <CheckIcon className="mx-auto h-5 w-5 text-green-600" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" variant="outline">
            Compare All Features
          </Button>
          <Button size="lg">
            Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <UsersIcon className="text-primary mx-auto mb-4 h-8 w-8" />
            <h3 className="mb-2 text-xl font-semibold">50,000+ Users</h3>
            <p className="text-muted-foreground">Join our growing community</p>
          </div>
          <div className="text-center">
            <CheckIcon className="text-primary mx-auto mb-4 h-8 w-8" />
            <h3 className="mb-2 text-xl font-semibold">99.9% Uptime</h3>
            <p className="text-muted-foreground">Reliable service guaranteed</p>
          </div>
          <div className="text-center">
            <ShieldCheckIcon className="text-primary mx-auto mb-4 h-8 w-8" />
            <h3 className="mb-2 text-xl font-semibold">Secure & Compliant</h3>
            <p className="text-muted-foreground">GDPR and SOC 2 certified</p>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}

const features = [
  { name: 'Unlimited Projects', basic: false, pro: true, enterprise: true },
  { name: 'Team Collaboration', basic: false, pro: true, enterprise: true },
  { name: 'Advanced Analytics', basic: false, pro: false, enterprise: true },
  { name: 'Priority Support', basic: false, pro: true, enterprise: true },
  { name: 'Custom Integrations', basic: false, pro: false, enterprise: true },
  { name: 'API Access', basic: true, pro: true, enterprise: true },
  { name: 'Data Export', basic: true, pro: true, enterprise: true },
  { name: 'Mobile App', basic: false, pro: true, enterprise: true },
];

```
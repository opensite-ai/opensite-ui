```tsx
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface Team1Props {
  heading?: string;
  subheading?: string;
  description?: string;
  members?: TeamMember[];
  className?: string;
}

const Team1 = ({
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  members = [
    {
      id: "member-1",
      name: "Sarah Chen",
      role: "CEO & Founder",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    },
    {
      id: "member-2",
      name: "Marcus Rodriguez",
      role: "CTO",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    },
    {
      id: "member-3",
      name: "Emily Watson",
      role: "Head of Design",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    },
    {
      id: "member-4",
      name: "David Kim",
      role: "Lead Engineer",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    },
    {
      id: "member-5",
      name: "Lisa Thompson",
      role: "Product Manager",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    },
    {
      id: "member-6",
      name: "Alex Johnson",
      role: "UX Designer",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    },
  ],
  className,
}: Team1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col items-center text-center">
        <h2 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
          {heading}
        </h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
          {description}
        </p>
      </div>
      <div className="container mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div key={member.id} className="flex flex-col items-center">
            <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
              <AvatarImage src={member.avatar} />
              <AvatarFallback>{member.name}</AvatarFallback>
            </Avatar>
            <p className="text-center font-medium">{member.name}</p>
            <p className="text-center text-muted-foreground">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { Team1 };

```

```tsx
import { Github, Linkedin, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
}

interface Team1Props {
  heading?: string;
  subheading?: string;
  description?: string;
  members?: TeamMember[];
  className?: string;
}

const Team2 = ({
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  members = [
    {
      id: "member-1",
      name: "Sarah Chen",
      role: "CEO & Founder",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
    {
      id: "member-2",
      name: "Marcus Rodriguez",
      role: "CTO",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
    {
      id: "member-3",
      name: "Emily Watson",
      role: "Head of Design",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
    {
      id: "member-4",
      name: "David Kim",
      role: "Lead Engineer",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
    {
      id: "member-5",
      name: "Lisa Thompson",
      role: "Product Manager",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
    {
      id: "member-6",
      name: "Alex Johnson",
      role: "UX Designer",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  ],
  className,
}: Team1Props) => {
  return (
    <section className={cn("py-24 lg:py-32", className)}>
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-5xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div key={member.id} className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <Avatar className="size-20 lg:size-24">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="text-lg font-semibold">
                      {member.name}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="mb-6">
                  <h3 className="mb-1 text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm font-medium text-primary">
                    {member.role}
                  </p>
                </div>

                <div className="flex gap-3">
                  {member.github && (
                    <a
                      href={member.github}
                      className="rounded-lg bg-muted/50 p-2"
                    >
                      <Github className="size-4 text-muted-foreground" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      className="rounded-lg bg-muted/50 p-2"
                    >
                      <Twitter className="size-4 text-muted-foreground" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="rounded-lg bg-muted/50 p-2"
                    >
                      <Linkedin className="size-4 text-muted-foreground" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Team2 };

```

```tsx
import { Github, Linkedin, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
}

interface Team3Props {
  heading?: string;
  subheading?: string;
  description?: string;
  members?: TeamMember[];
  className?: string;
}

const Team3 = ({
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  members = [
    {
      id: "member-1",
      name: "Sarah Chen",
      role: "CEO & Founder",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
    {
      id: "member-2",
      name: "Marcus Rodriguez",
      role: "CTO",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
    {
      id: "member-3",
      name: "Emily Watson",
      role: "Head of Design",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
    {
      id: "member-4",
      name: "David Kim",
      role: "Lead Engineer",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
    {
      id: "member-5",
      name: "Lisa Thompson",
      role: "Product Manager",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
    {
      id: "member-6",
      name: "Alex Johnson",
      role: "UX Designer",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  ],
  className,
}: Team3Props) => {
  return (
    <section
      className={cn(
        "bg-gradient-to-b from-background to-muted/20 py-24 lg:py-32",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <h2 className="mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-bold tracking-tight text-transparent lg:text-6xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 blur-xl transition-all duration-300 group-hover:blur-2xl" />
                  <Avatar className="relative size-24 shadow-lg ring-4 ring-background transition-all duration-300 group-hover:ring-primary/20 lg:size-28">
                    <AvatarImage src={member.avatar} className="object-cover" />
                    <AvatarFallback className="bg-gradient-to-br from-primary/10 to-primary/5 text-xl font-semibold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="mb-6">
                  <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                    {member.name}
                  </h3>
                  <p className="inline-block rounded-full bg-muted/50 px-4 py-1.5 text-sm font-medium text-muted-foreground">
                    {member.role}
                  </p>
                </div>

                <div className="flex gap-3">
                  {member.github && (
                    <a
                      href={member.github}
                      className="rounded-xl bg-muted/80 p-3 transition-all duration-300 hover:scale-110 hover:bg-primary/10 hover:shadow-lg"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github className="size-5 text-muted-foreground transition-colors duration-300 hover:text-primary" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      className="rounded-xl bg-muted/80 p-3 transition-all duration-300 hover:scale-110 hover:bg-primary/10 hover:shadow-lg"
                      aria-label={`${member.name}'s twitter`}
                    >
                      <Twitter className="size-5 text-muted-foreground transition-colors duration-300 hover:text-primary" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="rounded-xl bg-muted/80 p-3 transition-all duration-300 hover:scale-110 hover:bg-primary/10 hover:shadow-lg"
                      aria-label={`${member.name}'s linkedin`}
                    >
                      <Linkedin className="size-5 text-muted-foreground transition-colors duration-300 hover:text-primary" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Team3 };

```

```tsx
import { Github, Twitter, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",

    bio: "With a background in software development and a vision for productivity, Alex leads the team with passion on user-first innovation.",
    social: {
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Jamie Lee",
    role: "Chief Product Officer",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",

    bio: "Jamie brings years of experience in product design and strategy, ensuring each feature meets the highest standards of functionality and design. ",
    social: {
      twitter: "#",
    },
  },
  {
    name: "Taylor Smith",
    role: "Head of Engineering",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",

    bio: "Taylor drives the technical vision, overseeing development and ensuring the product is robust, secure, and scalable for users worldwide.",
    social: {
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Morgan Davis",
    role: "Marketing Lead",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",

    bio: "With a knack for storytelling and a deep understanding of the market, Morgan communicates our mission and product benefits to the world.",
    social: {
      twitter: "#",
    },
  },
];

interface Team4Props {
  className?: string;
}

const Team4 = ({ className }: Team4Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-6 py-4 lg:py-8">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <Users className="size-4" />
            <span>Team up!</span>
          </Badge>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            The Minds Behind the Mission
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            A dedicated team passionate about shaping the future of
            productivity.
          </p>
        </div>

        <div className="mt-10 grid gap-x-12 gap-y-16 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="group flex flex-col">
              <img
                src={member.image}
                alt={member.name}
                width={80}
                height={80}
                className="rounded-full object-contain"
              />
              <div className="mt-6 flex flex-col tracking-[-0.32px]">
                <h3 className="text-lg">{member.name}</h3>
                <p className="text-muted-foreground-subtle">{member.role}</p>
                <p className="mt-4 text-sm tracking-[-0.36px] text-muted-foreground">
                  {member.bio}
                </p>
                <div className="mt-6 flex gap-2">
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="hover:text-foreground"
                    >
                      <Twitter />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="hover:text-foreground"
                    >
                      <Github />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Team4 };

```

```tsx
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const team = [
  {
    id: "person-1",
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    department: "Leadership",
    description:
      "Former Google PM with 10+ years building products that millions use daily. Passionate about creating meaningful impact through technology.",
    expertise: ["Product Strategy", "Team Leadership", "Growth"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
  {
    id: "person-2",
    name: "Marcus Rodriguez",
    role: "CTO & Co-founder",
    department: "Engineering",
    description:
      "Ex-Meta engineer who led teams building infrastructure that served billions of users. Loves solving complex technical challenges.",
    expertise: ["System Architecture", "AI/ML", "Scalability"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
  },
  {
    id: "person-3",
    name: "Priya Patel",
    role: "Head of Design",
    department: "Design",
    description:
      "Design leader with experience at Airbnb and Figma. Believes great design should be invisible and solve real user problems.",
    expertise: ["UX Design", "Design Systems", "User Research"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
  },
  {
    id: "person-4",
    name: "David Kim",
    role: "VP of Engineering",
    department: "Engineering",
    description:
      "Built and scaled engineering teams at Stripe and Uber. Focuses on creating high-performing teams and robust systems.",
    expertise: ["Team Building", "Backend Systems", "DevOps"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
  },
  {
    id: "person-5",
    name: "Emma Thompson",
    role: "Head of Marketing",
    department: "Marketing",
    description:
      "Marketing strategist who grew multiple startups from 0 to millions in revenue. Expert in growth marketing and brand building.",
    expertise: ["Growth Marketing", "Brand Strategy", "Content"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
  },
  {
    id: "person-6",
    name: "Alex Johnson",
    role: "Head of Sales",
    department: "Sales",
    description:
      "Sales leader with a track record of building high-performing teams and exceeding revenue targets in competitive markets.",
    expertise: ["Enterprise Sales", "Team Management", "Customer Success"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
  },
];

interface Team5Props {
  className?: string;
}

const Team5 = ({ className }: Team5Props) => {
  return (
    <section
      className={cn(
        "bg-gradient-to-b from-background to-muted/20 py-24",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
            Team
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
            Our diverse team of experts brings together decades of experience in
            design, engineering, and product development.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <Card
              key={member.id}
              className="group border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                {/* Avatar Placeholder */}
                <div className="relative mb-6">
                  <Avatar className="mx-auto h-20 w-20">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-2xl font-bold text-primary">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Member Info */}
                <div className="mb-4 text-center">
                  <h3 className="mb-1 text-lg font-semibold transition-colors group-hover:text-primary">
                    {member.name}
                  </h3>
                  <p className="mb-2 text-sm font-medium text-primary">
                    {member.role}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {member.department}
                  </Badge>
                </div>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {member.description}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1">
                  {member.expertise.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-muted/50 px-2 py-1 text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 border-t pt-16 text-center">
          <h3 className="mb-4 text-2xl font-semibold">
            Ready to build the future with us?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            We're always looking for talented individuals who share our passion
            for innovation and making a difference. Check out our current
            openings.
          </p>
          <Button size="lg" className="px-8">
            Explore Careers
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Team5 };

```

```tsx
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const team = [
  {
    id: "person-1",
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    department: "Leadership",
    description:
      "Former Google PM with 10+ years building products that millions use daily. Passionate about creating meaningful impact through technology.",
    expertise: ["Product Strategy", "Team Leadership", "Growth"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
  {
    id: "person-2",
    name: "Marcus Rodriguez",
    role: "CTO & Co-founder",
    department: "Engineering",
    description:
      "Ex-Meta engineer who led teams building infrastructure that served billions of users. Loves solving complex technical challenges.",
    expertise: ["System Architecture", "AI/ML", "Scalability"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
  },
  {
    id: "person-3",
    name: "Priya Patel",
    role: "Head of Design",
    department: "Design",
    description:
      "Design leader with experience at Airbnb and Figma. Believes great design should be invisible and solve real user problems.",
    expertise: ["UX Design", "Design Systems", "User Research"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
  },
  {
    id: "person-4",
    name: "David Kim",
    role: "VP of Engineering",
    department: "Engineering",
    description:
      "Built and scaled engineering teams at Stripe and Uber. Focuses on creating high-performing teams and robust systems.",
    expertise: ["Team Building", "Backend Systems", "DevOps"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
  },
  {
    id: "person-5",
    name: "Emma Thompson",
    role: "Head of Marketing",
    department: "Marketing",
    description:
      "Marketing strategist who grew multiple startups from 0 to millions in revenue. Expert in growth marketing and brand building.",
    expertise: ["Growth Marketing", "Brand Strategy", "Content"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
  },
  {
    id: "person-6",
    name: "Alex Johnson",
    role: "Head of Sales",
    department: "Sales",
    description:
      "Sales leader with a track record of building high-performing teams and exceeding revenue targets in competitive markets.",
    expertise: ["Enterprise Sales", "Team Management", "Customer Success"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
  },
  {
    id: "person-7",
    name: "Priya Patel",
    role: "Head of Design",
    department: "Design",
    description:
      "Marketing strategist who grew multiple startups from 0 to millions in revenue. Expert in growth marketing and brand building.",
    expertise: ["Growth Marketing", "Brand Strategy", "Content"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp",
  },
  {
    id: "person-8",
    name: "Emma Thompson",
    role: "Head of Marketing",
    department: "Marketing",
    description:
      "Sales leader with a track record of building high-performing teams and exceeding revenue targets in competitive markets.",
    expertise: ["Enterprise Sales", "Team Management", "Customer Success"],
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-8.webp",
  },
];

interface Team6Props {
  className?: string;
}

const Team6 = ({ className }: Team6Props) => {
  return (
    <section
      className={cn(
        "bg-gradient-to-b from-background to-muted/20 py-24",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
            Team
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
            Our diverse team of experts brings together decades of experience in
            design, engineering, and product development.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="group rounded-lg border border-muted bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-muted"
            >
              {/* Avatar Placeholder */}
              <div className="relative mb-6">
                <Avatar className="mx-auto h-20 w-20">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-2xl font-bold text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Member Info */}
              <div className="text-center">
                <h3 className="mb-1 text-lg font-semibold transition-colors group-hover:text-primary">
                  {member.name}
                </h3>
                <p className="mb-2 text-sm font-medium text-primary">
                  {member.role}
                </p>
                <Badge variant="outline" className="text-xs">
                  {member.department}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 border-t pt-16 text-center">
          <h3 className="mb-4 text-2xl font-semibold">
            Ready to build the future with us?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            We're always looking for talented individuals who share our passion
            for innovation and making a difference. Check out our current
            openings.
          </p>
          <Button size="lg" className="px-8">
            Explore Careers
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Team6 };

```

```tsx
import { cn } from "@/lib/utils";

const team = [
  {
    name: "Dennis Bouvard",
    company: "Blackbird Ventures",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
  },
  {
    name: "Renatus Gerard",
    company: "Center Studies",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
  },
  {
    name: "Leslie Alexander",
    company: "TechNexus",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
  },
  {
    name: "Matthew Stephens",
    company: "Etymol Cap",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
  },
  {
    name: "Josephine Newman",
    company: "Vandenberg",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
  },
];

interface Team7Props {
  className?: string;
}

const Team7 = ({ className }: Team7Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="text-4xl font-medium tracking-wide text-primary">
          Our investors
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {team.map((investor) => (
            <div key={investor.name} className="">
              <img
                src={investor.image}
                alt={investor.name}
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
              <h3 className="mt-3 font-semibold">{investor.name}</h3>
              <p className="text-muted-foreground">{investor.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Team7 };

```

```tsx
import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

const members = [
  {
    name: "John Smith",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    role: "CEO",
    yearsOfExperience: 15,
  },
  {
    name: "Sarah Johnson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    role: "Lead Designer",
    yearsOfExperience: 8,
  },
  {
    name: "Michael Chen",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    role: "Senior Engineer",
    yearsOfExperience: 10,
  },
  {
    name: "Emily Brown",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    role: "Marketing Director",
    yearsOfExperience: 12,
  },
  {
    name: "David Wilson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    role: "Sales Manager",
    yearsOfExperience: 7,
  },
  {
    name: "Jessica Lee",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    role: "Customer Success Lead",
    yearsOfExperience: 5,
  },
  {
    name: "Robert Taylor",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp",
    role: "CTO",
    yearsOfExperience: 20,
  },
  {
    name: "Amanda Martinez",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-8.webp",
    role: "Product Designer",
    yearsOfExperience: 6,
  },
  {
    name: "James Anderson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    role: "Frontend Engineer",
    yearsOfExperience: 4,
  },
  {
    name: "Lisa Wong",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    role: "Marketing Specialist",
    yearsOfExperience: 3,
  },
  {
    name: "Kevin Park",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    role: "Sales Representative",
    yearsOfExperience: 5,
  },
  {
    name: "Rachel Green",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    role: "Support Specialist",
    yearsOfExperience: 2,
  },
  {
    name: "Thomas Wright",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    role: "Backend Engineer",
    yearsOfExperience: 8,
  },
  {
    name: "Michelle Kim",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    role: "UI Designer",
    yearsOfExperience: 4,
  },
  {
    name: "Daniel Garcia",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp",
    role: "Marketing Manager",
    yearsOfExperience: 9,
  },
  {
    name: "Jennifer Lopez",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-8.webp",
    role: "Sales Director",
    yearsOfExperience: 11,
  },
  {
    name: "Andrew Wilson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    role: "Support Manager",
    yearsOfExperience: 6,
  },
  {
    name: "Patricia Moore",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    role: "COO",
    yearsOfExperience: 18,
  },
  {
    name: "Ryan Thompson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    role: "Systems Engineer",
    yearsOfExperience: 7,
  },
  {
    name: "Sophie Turner",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    role: "UX Designer",
    yearsOfExperience: 5,
  },
];

interface Team8Props {
  className?: string;
}

const Team8 = ({ className }: Team8Props) => {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <h2 className="text-5xl font-medium md:text-6xl">
          Tech Pioneers <br />
          <span className="text-primary/50">building the future</span>
        </h2>
        <p className="mt-6 max-w-md text-muted-foreground">
          We bring together brilliant developers, engineers, and tech innovators
          to create groundbreaking digital solutions.
        </p>
        <Carousel>
          <div className="mt-4 hidden items-center justify-end gap-4 md:flex">
            <CarouselPrevious className="static size-11 translate-x-0 translate-y-0" />
            <CarouselNext className="static size-11 translate-x-0 translate-y-0" />
          </div>
          <div className="mt-16 [&>div[data-slot=carousel-content]]:overflow-visible">
            <CarouselContent className="max-w-[min(calc(100vw-4rem),24rem)] select-none">
              {members.map((member, idx) => (
                <CarouselItem key={idx} className="max-w-72">
                  <div className="rounded-2xl border border-border bg-background p-7 text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="mx-auto size-20 rounded-full border border-border"
                    />
                    <div className="mt-6 flex flex-col justify-center">
                      <p className="text-lg font-medium text-primary">
                        {member.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                    <Separator className="my-6 bg-linear-to-r from-background via-border to-background" />
                    <p className="text-sm text-muted-foreground">
                      {member.yearsOfExperience}+ years of experience
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { Team8 };

```

```tsx
"use client";

import { TabsTrigger } from "@radix-ui/react-tabs";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList } from "@/components/ui/tabs";

const categories = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Support",
  "Leadership",
] as const;

interface Member {
  name: string;
  image: string;
  role: string;
  yearsOfExperience: number;
  categories: (typeof categories)[number];
}

const members: Member[] = [
  {
    name: "John Smith",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    role: "CEO",
    yearsOfExperience: 15,
    categories: "Leadership",
  },
  {
    name: "Sarah Johnson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    role: "Lead Designer",
    yearsOfExperience: 8,
    categories: "Design",
  },
  {
    name: "Michael Chen",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    role: "Senior Engineer",
    yearsOfExperience: 10,
    categories: "Engineering",
  },
  {
    name: "Emily Brown",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    role: "Marketing Director",
    yearsOfExperience: 12,
    categories: "Marketing",
  },
  {
    name: "David Wilson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    role: "Sales Manager",
    yearsOfExperience: 7,
    categories: "Sales",
  },
  {
    name: "Jessica Lee",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    role: "Customer Success Lead",
    yearsOfExperience: 5,
    categories: "Support",
  },
  {
    name: "Robert Taylor",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp",
    role: "CTO",
    yearsOfExperience: 20,
    categories: "Leadership",
  },
  {
    name: "Amanda Martinez",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-8.webp",
    role: "Product Designer",
    yearsOfExperience: 6,
    categories: "Design",
  },
  {
    name: "James Anderson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    role: "Frontend Engineer",
    yearsOfExperience: 4,
    categories: "Engineering",
  },
  {
    name: "Lisa Wong",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    role: "Marketing Specialist",
    yearsOfExperience: 3,
    categories: "Marketing",
  },
  {
    name: "Kevin Park",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    role: "Sales Representative",
    yearsOfExperience: 5,
    categories: "Sales",
  },
  {
    name: "Rachel Green",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    role: "Support Specialist",
    yearsOfExperience: 2,
    categories: "Support",
  },
  {
    name: "Thomas Wright",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    role: "Backend Engineer",
    yearsOfExperience: 8,
    categories: "Engineering",
  },
  {
    name: "Michelle Kim",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    role: "UI Designer",
    yearsOfExperience: 4,
    categories: "Design",
  },
  {
    name: "Daniel Garcia",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp",
    role: "Marketing Manager",
    yearsOfExperience: 9,
    categories: "Marketing",
  },
  {
    name: "Jennifer Lopez",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-8.webp",
    role: "Sales Director",
    yearsOfExperience: 11,
    categories: "Sales",
  },
  {
    name: "Andrew Wilson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    role: "Support Manager",
    yearsOfExperience: 6,
    categories: "Support",
  },
  {
    name: "Patricia Moore",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    role: "COO",
    yearsOfExperience: 18,
    categories: "Leadership",
  },
  {
    name: "Ryan Thompson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    role: "Systems Engineer",
    yearsOfExperience: 7,
    categories: "Engineering",
  },
  {
    name: "Sophie Turner",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    role: "UX Designer",
    yearsOfExperience: 5,
    categories: "Design",
  },
  {
    name: "Chris Evans",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    role: "Content Marketing",
    yearsOfExperience: 4,
    categories: "Marketing",
  },
  {
    name: "Maria Rodriguez",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    role: "Sales Team Lead",
    yearsOfExperience: 8,
    categories: "Sales",
  },
  {
    name: "Steven Clark",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp",
    role: "Technical Support",
    yearsOfExperience: 3,
    categories: "Support",
  },
  {
    name: "Elizabeth Chen",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-8.webp",
    role: "CFO",
    yearsOfExperience: 16,
    categories: "Leadership",
  },
  {
    name: "Alex Turner",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    role: "DevOps Engineer",
    yearsOfExperience: 6,
    categories: "Engineering",
  },
  {
    name: "Nina Patel",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    role: "Motion Designer",
    yearsOfExperience: 4,
    categories: "Design",
  },
  {
    name: "Sam Roberts",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    role: "Cloud Engineer",
    yearsOfExperience: 5,
    categories: "Engineering",
  },
  {
    name: "Julia Zhang",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    role: "Security Engineer",
    yearsOfExperience: 7,
    categories: "Engineering",
  },
  {
    name: "Marcus Johnson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    role: "Mobile Engineer",
    yearsOfExperience: 6,
    categories: "Engineering",
  },
];

interface Team9Props {
  className?: string;
}

const Team9 = ({ className }: Team9Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0],
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter((member) => {
    const matchesCategory = selectedCategory === member.categories;
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl md:text-5xl">Meet Our Team</h2>
          <p className="max-w-2xl text-muted-foreground">
            Our diverse group of professionals brings together expertise from
            design, engineering, and technology to deliver innovative solutions
            that transform ideas into reality.
          </p>
        </div>
        <div className="mt-14">
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <Tabs
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="-mx-8 overflow-x-auto px-8"
            >
              <TabsList className="flex h-auto justify-start gap-4 bg-background md:flex-wrap">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="relative flex flex-col items-center gap-2 overflow-visible whitespace-nowrap data-[state=active]:text-foreground"
                  >
                    {category}
                    <span
                      className={cn(
                        "absolute -bottom-1 h-0.5 w-full bg-primary opacity-0",
                        selectedCategory === category && "opacity-100",
                      )}
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="relative h-fit">
              <Input
                className="pl-9"
                placeholder="Search members"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 flex items-center justify-center pl-3 text-muted-foreground/80">
                <SearchIcon className="size-4" />
              </div>
            </div>
          </div>
          <div className="mt-9 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMembers.map((member, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-background p-7 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="mx-auto size-28 rounded-full border border-border"
                />
                <div className="mt-6 flex flex-col justify-center">
                  <p className="text-xl font-medium text-primary">
                    {member.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
                <Separator className="my-6 bg-linear-to-r from-background via-border to-background" />
                <p className="text-sm text-muted-foreground">
                  {member.yearsOfExperience} years of experience
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Team9 };

```

```tsx
import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const members = [
  {
    name: "Jane Doe",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    role: "CEO",
  },
  {
    name: "John Doe",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    role: "CTO",
  },
  {
    name: "Sarah Smith",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    role: "Head of Product",
  },
  {
    name: "Michael John",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    role: "Lead Engineer",
  },
  {
    name: "James Taylor",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    role: "UX Designer",
  },
  {
    name: "David Wilson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    role: "Data Engineer",
  },
  {
    name: "Lisa Anderson",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp",
    role: "UI Designer",
  },
  {
    name: "Emily Brown",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-8.webp",
    role: "DevOps Engineer",
  },
  {
    name: "Emma Davis",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    role: "Product Manager",
  },
  {
    name: "Robert Martin",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    role: "General Director",
  },
  {
    name: "Jennifer White",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    role: "HR Manager",
  },
  {
    name: "William Clark",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
    role: "Sales Director",
  },
  {
    name: "Patricia Moore",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
    role: "Social media",
  },
  {
    name: "Thomas Lee",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
    role: "Security Engineer",
  },
  {
    name: "Mike Garcia",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp",
    role: "Data Scientist",
  },
  {
    name: "Richard Tom",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-8.webp",
    role: "QA Engineer",
  },
];

interface Team10Props {
  className?: string;
}

const Team10 = ({ className }: Team10Props) => {
  return (
    <section className={cn("bg-muted/50 py-32", className)}>
      <div className="container">
        <div className="max-w-xl">
          <h2 className="mb-5 text-4xl md:text-5xl">Meet Our Experts</h2>
          <p className="mb-12 text-muted-foreground md:text-lg">
            Join our team of talented professionals and be part of an innovative
            company that's shaping the future of technology through creative
            solutions.
          </p>
          <Button size="lg">Join Our Team</Button>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {members.map((member, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Avatar className="size-10 border border-border">
                <AvatarImage src={member.image} />
              </Avatar>
              <div>
                <h3 className="text-sm font-medium">{member.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Team10 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import React, { memo, useState } from "react";

import { cn } from "@/lib/utils";

interface TeamMember {
  image: string;
  name: string;
  role: string;
  description: string; // a short 1-3 lines about the member's personality, background, or a fun fact
}

interface TeamMemberCardProps {
  member: TeamMember;
  highlighted?: boolean;
}

const TeamMemberCard = memo(
  ({ member, highlighted = false }: TeamMemberCardProps) => {
    return (
      <div
        className={cn(
          "flex flex-col gap-4 px-2 md:px-5 md:pt-8",
          highlighted && "md:py-0 md:pb-4",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-2 pt-4 md:flex-row md:items-center",
            !highlighted && "border-b pb-4 md:border-b-2",
          )}
        >
          <img
            src={member.image}
            alt={`${member.name} Profile Picture`}
            className="size-full rounded border object-cover md:size-12"
          />

          <div className="flex flex-col gap-1 tracking-tight">
            <p className="line-clamp-1">{member.name}</p>
            <p className="line-clamp-1 text-sm text-muted-foreground">
              {member.role}
            </p>
          </div>
        </div>
        {highlighted && (
          <>
            <span className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500" />
            <p className="line-clamp-2 text-xs">{member.description}</p>
          </>
        )}
      </div>
    );
  },
);
TeamMemberCard.displayName = "TeamMemberCard";

interface Team11Props {
  heading?: string;
  description?: string;
  members?: TeamMember[];
  className?: string;
}

const Team11 = ({
  className,
  heading = "Meet Our Tech Team",
  description = "The innovative minds building the future of technology",
  members = [
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar1.jpg",
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      description:
        "Former Google engineer with 12 years in cloud architecture.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar2.jpg",
      name: "Marcus Rodriguez",
      role: "Lead Software Engineer",
      description: "Full-stack developer specializing in React and Node.js.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar3.jpg",
      name: "Emily Watson",
      role: "Product Manager",
      description: "Data-driven product strategist with UX design background.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar4.jpg",
      name: "David Kim",
      role: "DevOps Engineer",
      description:
        "Infrastructure automation expert making deployments seamless.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar5.jpg",
      name: "Lisa Thompson",
      role: "UX/UI Designer",
      description: "Creative designer passionate about user-centered design.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar6.jpg",
      name: "Alex Johnson",
      role: "Data Scientist",
      description: "Machine learning specialist turning data into insights.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar7.jpg",
      name: "Maria Garcia",
      role: "Frontend Developer",
      description:
        "React and TypeScript expert creating smooth user experiences.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar8.jpg",
      name: "James Wilson",
      role: "Backend Developer",
      description: "API architect and database optimization specialist.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar9.jpg",
      name: "Rachel Park",
      role: "QA Engineer",
      description: "QA specialist ensuring products meet highest standards.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar10.jpg",
      name: "Ryan Foster",
      role: "Mobile Developer",
      description: "iOS and Android expert creating smooth mobile experiences.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar11.jpg",
      name: "Alexander Chen",
      role: "Security Engineer",
      description: "Cybersecurity expert protecting systems from threats.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar12.jpg",
      name: "Christian Mueller",
      role: "Technical Writer",
      description:
        "Documentation specialist making technical concepts accessible.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar13.jpg",
      name: "Sophie Anderson",
      role: "Marketing Manager",
      description: "Growth marketing expert driving user acquisition.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar13.jpg",
      name: "Joseph Gonzalez",
      role: "Sales Engineer",
      description:
        "Technical sales specialist helping clients understand solutions.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar14.jpg",
      name: "Michelle Dam",
      role: "Customer Success Manager",
      description: "Customer advocate ensuring clients achieve their goals.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar15.jpg",
      name: "Nima Motaghian",
      role: "Business Analyst",
      description:
        "Data analyst translating business requirements into solutions.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar16.jpg",
      name: "Jessica Liu",
      role: "HR Manager",
      description: "People operations specialist building company culture.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar17.jpg",
      name: "Kevin O'Brien",
      role: "Finance Manager",
      description: "Financial planning expert keeping business on track.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar18.jpg",
      name: "Amanda Torres",
      role: "Content Strategist",
      description: "Content marketing expert creating engaging tech stories.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar19.jpg",
      name: "Robert Kim",
      role: "Legal Counsel",
      description: "Technology lawyer navigating regulatory landscapes.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar20.jpg",
      name: "Jennifer Walsh",
      role: "Operations Manager",
      description: "Operations specialist ensuring smooth business functions.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar21.jpg",
      name: "Daniel Patel",
      role: "Research Engineer",
      description: "R&D specialist exploring cutting-edge technologies.",
    },
  ],
}: Team11Props) => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-4 border-b-2 pb-6">
            <h3 className="text-3xl font-light tracking-tight lg:text-6xl">
              {heading}
            </h3>
            <p className="text-sm tracking-tight text-muted-foreground lg:text-lg">
              {description}
            </p>
          </div>
          <ul
            onMouseLeave={() => setHoveredMember(null)}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {members.map((member, index) => {
              return (
                <li
                  key={`team-11-member-${index}`}
                  onMouseEnter={() => setHoveredMember(index)}
                  className="relative"
                >
                  <TeamMemberCard member={member} />

                  {hoveredMember === index && (
                    <motion.div
                      layoutId="team-11-member-card"
                      transition={{
                        layout: {
                          duration: 0.2,
                          type: "spring",
                          bounce: 0.1,
                        },
                      }}
                      className="pointer-events-none absolute inset-0 z-10 hidden h-max rounded-2xl bg-background shadow-lg md:block dark:border"
                    >
                      <TeamMemberCard member={member} highlighted />
                    </motion.div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Team11 };

```

```tsx
import { Instagram, Linkedin, Twitter, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  social: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface Team15Props {
  label: string;
  title1: string;
  title2: string;
  subtitle: string;
  members: TeamMember[];
  className?: string;
}

const Team15 = ({
  className,
  label = "MEET OUR CREATORS",
  title1 = "Building the Future",
  title2 = "Together",
  subtitle = "Our diverse team of innovators, designers, and engineers work together to create exceptional digital experiences that make a difference.",
  members = [
    {
      id: "sophia-chen",
      name: "Sophia Chen",
      role: "Creative Director",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar1.webp",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: "marcus-rodriguez",
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar2.webp",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: "elena-petrov",
      name: "Elena Petrov",
      role: "UX Designer",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar3.webp",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: "david-kim",
      name: "David Kim",
      role: "Product Manager",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar4.webp",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: "amara-singh",
      name: "Amara Singh",
      role: "Marketing Lead",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar5.webp",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: "alex-thompson",
      name: "Alex Thompson",
      role: "Data Scientist",
      avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar6.webp",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
  ],
}: Team15Props) => {
  return (
    <section className={cn("bg-background py-24", className)}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-16 text-center">
          {/* Label with icon */}
          <div className="mb-4 flex items-center justify-center gap-2">
            <Users className="h-4 w-4 text-foreground" />
            <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
              {label}
            </p>
          </div>

          {/* Main Title */}
          <h2 className="mb-4 text-4xl md:text-5xl lg:text-6xl">
            <span className="font-semibold text-foreground">{title1}</span>{" "}
            <span className="font-medium text-muted-foreground italic">
              {title2}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
        </div>

        {/* Team Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <Card
              key={member.id}
              className="border-border/50 bg-card/50 p-6 backdrop-blur-sm"
            >
              <div className="grid grid-cols-2 items-start gap-4">
                {/* Content */}
                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <h3 className="font-medium text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {member.role}
                    </p>
                  </div>

                  {/* Social Media Buttons */}
                  <div className="flex gap-2">
                    {member.social.twitter && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 rounded-md border-border/50 bg-background/50 p-0 transition-all duration-200"
                      >
                        <Twitter className="h-3 w-3" />
                      </Button>
                    )}
                    {member.social.instagram && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 rounded-md border-border/50 bg-background/50 p-0 transition-all duration-200"
                      >
                        <Instagram className="h-3 w-3" />
                      </Button>
                    )}
                    {member.social.linkedin && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 rounded-md border-border/50 bg-background/50 p-0 transition-all duration-200"
                      >
                        <Linkedin className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Avatar */}
                <div className="">
                  <div className="h-full">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Team15 };

```

```tsx
// components/ui/team-section.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class concatenation

// Define interfaces for props
interface SocialLink {
  icon: React.ElementType; // For Shadcn icons or any SVG component
  href: string;
}

interface TeamMember {
  name: string;
  designation: string;
  imageSrc: string;
  socialLinks?: SocialLink[];
}

interface TeamSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  members: TeamMember[];
  registerLink?: string;
  logo?: React.ReactNode; // For a custom logo, or you can use a string src
  socialLinksMain?: SocialLink[]; // Main social links for the company/section
}

// TeamSection Component
export const TeamSection = React.forwardRef<HTMLDivElement, TeamSectionProps>(
  (
    {
      title,
      description,
      members,
      registerLink,
      logo,
      socialLinksMain,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden bg-background py-12 md:py-24 lg:py-32",
          className
        )}
        {...props}
      >
        <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
          {/* Background Grid - for visual appeal */}
          <div className="absolute inset-0 z-0 opacity-5">
            <svg className="h-full w-full" fill="none">
              <defs>
                <pattern
                  id="grid"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M20 0L0 0 0 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-muted-foreground"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Header Section */}
          <div className="relative z-10 flex w-full flex-col items-center justify-between gap-4 md:flex-row md:items-start md:text-left lg:gap-8">
            <div className="grid gap-2 text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-muted-foreground">
                <span className="text-primary block text-xl sm:text-2xl md:text-3xl font-medium">
                  O U R
                </span>
                {title}
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {description}
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 md:items-end">
              {logo && <div className="text-2xl font-bold">{logo}</div>}
              {registerLink && (
                <a
                  href={registerLink}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  REGISTER NOW
                </a>
              )}
            </div>
          </div>

          {/* Main Social Links */}
          {socialLinksMain && socialLinksMain.length > 0 && (
            <div className="relative z-10 flex w-full items-center justify-center gap-4 py-4 md:justify-center">
              {socialLinksMain.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
              <span className="text-muted-foreground text-sm">
                www.website.com
              </span>{" "}
              {/* This can also be a prop */}
            </div>
          )}

          {/* Team Members Grid */}
          <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {members.map((member, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-end overflow-hidden rounded-xl bg-card p-6 text-center shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  // Dynamic background color based on index or theme
                  backgroundColor:
                    index === 0
                      ? "hsl(var(--destructive)/0.1)" // Example: using destructive as pinkish
                      : index === 1
                      ? "hsl(var(--muted))" // Example: using muted for grey
                      : "hsl(var(--warning)/0.2)", // Example: using warning as yellowish
                  color: "hsl(var(--foreground))",
                }}
              >
                {/* Background wave animation */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 transform rounded-t-full bg-gradient-to-t from-primary/20 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
                  style={{ transitionDelay: `${index * 50}ms` }}
                />

                {/* Member Image with mask and border animation */}
                <div
                  className="relative z-10 h-36 w-36 overflow-hidden rounded-full border-4 border-transparent bg-background/20 transition-all duration-500 ease-out group-hover:border-primary group-hover:scale-105"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <h3 className="relative z-10 mt-4 text-xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="relative z-10 text-sm text-muted-foreground">
                  {member.designation}
                </p>

                {/* Social Links for individual members */}
                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="relative z-10 mt-4 flex gap-3 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    {member.socialLinks.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <link.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

TeamSection.displayName = "TeamSection";
```

```tsx
const members = [
    {
        name: 'Méschac Irung',
        role: 'Creator',
        avatar: 'https://avatars.githubusercontent.com/u/47919550?v=4',
    },
    {
        name: 'Théo Balick',
        role: 'Frontend Dev',
        avatar: 'https://avatars.githubusercontent.com/u/68236786?v=4',
    },
    {
        name: 'Glodie Lukose',
        role: 'Frontend Dev',
        avatar: 'https://avatars.githubusercontent.com/u/99137927?v=4',
    },
    {
        name: 'Bernard Ngandu',
        role: 'Backend Dev',
        avatar: 'https://avatars.githubusercontent.com/u/31113941?v=4',
    },
]

export default function TeamSection() {
    return (
        <section className="py-12 md:py-32">
            <div className="mx-auto max-w-3xl px-8 lg:px-0">
                <h2 className="mb-8 text-4xl font-bold md:mb-16 lg:text-5xl">Our team</h2>

                <div>
                    <h3 className="mb-6 text-lg font-medium">Leadership</h3>
                    <div className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
                        {members.map((member, index) => (
                            <div key={index}>
                                <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5">
                                    <img className="aspect-square rounded-full object-cover" src={member.avatar} alt={member.name} height="460" width="460" loading="lazy" />
                                </div>
                                <span className="mt-2 block text-sm">{member.name}</span>
                                <span className="text-muted-foreground block text-xs">{member.role}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="mb-6 text-lg font-medium">Engineering</h3>
                    <div data-rounded="full" className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
                        {members.map((member, index) => (
                            <div key={index}>
                                <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5">
                                    <img className="aspect-square rounded-full object-cover" src={member.avatar} alt={member.name} height="460" width="460" loading="lazy" />
                                </div>
                                <span className="mt-2 block text-sm">{member.name}</span>
                                <span className="text-muted-foreground block text-xs">{member.role}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="mb-6 text-lg font-medium">Marketing</h3>
                    <div data-rounded="full" className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
                        {members.map((member, index) => (
                            <div key={index}>
                                <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5">
                                    <img className="aspect-square rounded-full object-cover" src={member.avatar} alt={member.name} height="460" width="460" loading="lazy" />
                                </div>
                                <span className="mt-2 block text-sm">{member.name}</span>
                                <span className="text-muted-foreground block text-xs">{member.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
```

```tsx
import { Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const team = [
  {
    name: 'David Forren',
    role: 'Founder / CEO',
    bio: 'David has been in the tech industry for over 12 years, founding multiple successful startups. His vision and leadership have been instrumental in our growth.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
  },
  {
    name: 'Amil Evara',
    role: 'UI/UX Designer',
    bio: 'With a background in psychology and design, Amil brings a unique perspective to our product development process, ensuring our solutions are both beautiful and functional.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
  },
];

export default function AlternatingSections() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          Leadership team
        </h2>
        <p className="text-muted-foreground mt-1 text-lg">
          Meet the people shaping our future
        </p>
      </div>
      {/* End Title */}

      {/* Alternating Sections */}
      <div className="space-y-24">
        {team.map((member, index) => (
          <div
            key={member.name}
            className="grid items-center gap-8 md:grid-cols-2 lg:gap-12"
          >
            <div
              className={`relative ${index % 2 === 1 ? 'md:order-last' : ''}`}
            >
              <div className="relative aspect-[4/3]">
                <img
                  className="rounded-xl object-cover"
                  src={member.image}
                  alt={member.name}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Background Pattern */}
              <div
                className={`absolute -z-10 size-48 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] ${
                  index % 2 === 1 ? '-bottom-6 -left-6' : '-right-6 -bottom-6'
                }`}
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground mt-1 text-lg">
                  {member.role}
                </p>
              </div>

              <p className="text-muted-foreground">{member.bio}</p>

              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <Twitter className="size-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Github className="size-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Linkedin className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* End Alternating Sections */}
    </div>
  );
}

```

```tsx
import { Twitter, Github, Linkedin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const team = [
  {
    name: 'David Forren',
    role: 'Founder / CEO',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80',
  },
  {
    name: 'Amil Evara',
    role: 'UI/UX Designer',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80',
  },
  {
    name: 'Ebele Egbuna',
    role: 'Support Consultant',
    image:
      'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80',
  },
  {
    name: 'Maria Powers',
    role: 'Director of sales',
    image:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80',
  },
];

export default function SimpleCards() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          Meet the crew
        </h2>
        <p className="text-muted-foreground mt-1 text-lg">Creative people</p>
      </div>
      {/* End Title */}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <div key={member.name} className="flex flex-col items-center">
            <Avatar className="size-20">
              <AvatarImage src={member.image} alt={member.name} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center">
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {member.role}
              </p>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="icon" variant="ghost">
                <Twitter className="size-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Github className="size-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Linkedin className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* End Grid */}
    </div>
  );
}

```

```tsx
import { Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const team = [
  {
    name: 'David Forren',
    role: 'Founder / CEO',
    bio: 'I am an ambitious workaholic, but apart from that, pretty simple person.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=533&q=80',
  },
  {
    name: 'Amil Evara',
    role: 'UI/UX Designer',
    bio: 'I am an ambitious workaholic, but apart from that, pretty simple person.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=533&q=80',
  },
  {
    name: 'Ebele Egbuna',
    role: 'Support Consultant',
    bio: 'I am an ambitious workaholic, but apart from that, pretty simple person.',
    image:
      'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=533&q=80',
  },
  {
    name: 'Maria Powers',
    role: 'Director of sales',
    bio: 'I am an ambitious workaholic, but apart from that, pretty simple person.',
    image:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=533&q=80',
  },
];

export default function WithHoverCards() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          Meet our team
        </h2>
        <p className="text-muted-foreground mt-1 text-lg">
          The amazing people behind the scenes
        </p>
      </div>
      {/* End Title */}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <Card
            key={member.name}
            className="group relative overflow-hidden p-0 transition-shadow hover:shadow-lg"
          >
            <CardContent className="!p-0">
              <div className="relative">
                <img
                  className="aspect-[3/4] w-full object-cover"
                  src={member.image}
                  alt={member.name}
                  width={320}
                  height={420}
                />
                <div className="from-background/80 to-background/0 absolute inset-0 bg-gradient-to-t opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 left-0 translate-y-4 p-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm">{member.bio}</p>
                  <div className="mt-3 flex gap-1">
                    <Button size="icon" variant="secondary">
                      <Twitter className="size-4" />
                    </Button>
                    <Button size="icon" variant="secondary">
                      <Github className="size-4" />
                    </Button>
                    <Button size="icon" variant="secondary">
                      <Linkedin className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {member.role}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* End Grid */}
    </div>
  );
}

```

```tsx
import { Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

const team = [
  {
    name: 'David Forren',
    role: 'Leadership',
    position: 'Founder / CEO',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    name: 'Amil Evara',
    role: 'Design',
    position: 'UI/UX Designer',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    name: 'Ebele Egbuna',
    role: 'Support',
    position: 'Support Lead',
    image:
      'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80',
  },
  {
    name: 'Maria Powers',
    role: 'Leadership',
    position: 'Director of Sales',
    image:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80',
  },
];

const roles = ['All', 'Leadership', 'Design', 'Support'];

export default function WithFilters() {
  const [selectedRole, setSelectedRole] = useState('All');

  const filteredTeam = team.filter((member) =>
    selectedRole === 'All' ? true : member.role === selectedRole
  );

  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          Our team
        </h2>
        <p className="text-muted-foreground mt-1 text-lg">
          The people behind the scenes
        </p>
      </div>
      {/* End Title */}

      {/* Filters */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {roles.map((role) => (
          <Button
            key={role}
            variant={selectedRole === role ? 'default' : 'outline'}
            onClick={() => setSelectedRole(role)}
          >
            {role}
          </Button>
        ))}
      </div>
      {/* End Filters */}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredTeam.map((member) => (
          <Card key={member.name} className="pt-0 text-center">
            <CardContent className="pt-6">
              <div className="relative inline-block">
                <img
                  className="size-24 rounded-full object-cover"
                  src={member.image}
                  alt={member.name}
                  width={96}
                  height={96}
                />
              </div>
              <div className="mt-4">
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {member.position}
                </p>
              </div>
              <div className="mt-3 flex justify-center gap-2">
                <Button size="icon" variant="ghost">
                  <Twitter className="size-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Github className="size-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Linkedin className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* End Grid */}
    </div>
  );
}

```

```tsx
import { Twitter, Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const team = [
  {
    name: 'David Forren',
    role: 'Founder / CEO',
    bio: 'Available for strategic partnerships and speaking engagements.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80',
    contact: {
      email: 'david@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
    },
    availability: 'Available for meetings',
    status: 'active',
  },
  {
    name: 'Amil Evara',
    role: 'UI/UX Designer',
    bio: 'Open to freelance projects and consulting.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80',
    contact: {
      email: 'amil@example.com',
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
    },
    availability: 'Available next month',
    status: 'busy',
  },
];

export default function WithContact() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          Get in touch
        </h2>
        <p className="text-muted-foreground mt-1 text-lg">
          Connect with our team members
        </p>
      </div>
      {/* End Title */}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {team.map((member) => (
          <Card key={member.name} className="p-0">
            <CardContent className="!p-6">
              <div className="flex gap-6">
                <div className="relative shrink-0">
                  <img
                    className="size-24 rounded-xl object-cover"
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                  />
                  <span
                    className={`border-background absolute -top-2 -right-2 size-4 rounded-full border-2 ${
                      member.status === 'active'
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-4">
                    <h3 className="truncate text-lg font-medium">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {member.role}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">
                      {member.bio}
                    </p>
                    <p className="text-sm font-medium">{member.availability}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t pt-6">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Mail className="size-4" />
                  {member.contact.email}
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Phone className="size-4" />
                  {member.contact.phone}
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MapPin className="size-4" />
                  {member.contact.location}
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button size="icon" variant="ghost">
                  <Twitter className="size-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Github className="size-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Linkedin className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* End Grid */}
    </div>
  );
}

```

```tsx
import { Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const team = [
  {
    name: 'David Forren',
    role: 'Founder / CEO',
    bio: 'I am an ambitious workaholic, but apart from that, pretty simple person.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80',
  },
  {
    name: 'Amil Evara',
    role: 'UI/UX Designer',
    bio: 'I am an ambitious workaholic, but apart from that, pretty simple person.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80',
  },
  {
    name: 'Ebele Egbuna',
    role: 'Support Consultant',
    bio: 'I am an ambitious workaholic, but apart from that, pretty simple person.',
    image:
      'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80',
  },
];

export default function WithLargeImages() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          Our leadership
        </h2>
        <p className="text-muted-foreground mt-1 text-lg">
          The talented people behind the scenes
        </p>
      </div>
      {/* End Title */}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <div key={member.name} className="flex flex-col">
            <img
              className="aspect-[4/3] rounded-xl object-cover"
              src={member.image}
              alt={member.name}
              width={320}
              height={320}
            />
            <div className="mt-4">
              <h3 className="text-lg font-medium">{member.name}</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {member.role}
              </p>
              <p className="text-muted-foreground mt-3 text-sm">{member.bio}</p>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="icon" variant="ghost">
                <Twitter className="size-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Github className="size-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Linkedin className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* End Grid */}
    </div>
  );
}

```

```tsx
import { Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const team = [
  {
    name: 'David Forren',
    role: 'Founder / CEO',
    bio: 'Leading innovation and strategic growth initiatives.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80',
    skills: ['Leadership', 'Strategy', 'Innovation', 'Product Vision'],
  },
  {
    name: 'Amil Evara',
    role: 'UI/UX Designer',
    bio: 'Creating beautiful and intuitive user experiences.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80',
    skills: ['UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
  },
  {
    name: 'Ebele Egbuna',
    role: 'Lead Developer',
    bio: 'Building scalable and maintainable applications.',
    image:
      'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80',
    skills: ['React', 'Node.js', 'TypeScript', 'Cloud Architecture'],
  },
];

export default function WithSkillBadges() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          Meet our experts
        </h2>
        <p className="text-muted-foreground mt-1 text-lg">
          The skilled professionals behind our success
        </p>
      </div>
      {/* End Title */}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <Card key={member.name} className="group relative pt-0">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="border-background ring-primary/10 size-32 rounded-full border-4 ring-4">
                    <img
                      className="rounded-full"
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-medium">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {member.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 flex justify-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Twitter className="size-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Github className="size-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Linkedin className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* End Grid */}
    </div>
  );
}

```

```tsx
import { Twitter, Github, Linkedin, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const team = [
  {
    name: 'David Forren',
    role: 'Founder / CEO',
    testimonial:
      'Building great products with an amazing team is what drives me every day.',
    image:
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=320&q=80',
    stats: {
      years: '12+',
      projects: '140+',
      clients: '50+',
    },
  },
  {
    name: 'Amil Evara',
    role: 'UI/UX Designer',
    testimonial:
      "Design is not just what it looks like, it's how it works. I strive to make both perfect.",
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=320&q=80',
    stats: {
      years: '8+',
      projects: '200+',
      awards: '15',
    },
  },
];

export default function WithTestimonials() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
          Meet our leadership
        </h2>
        <p className="text-muted-foreground mt-1 text-lg">
          The talented individuals guiding our vision
        </p>
      </div>
      {/* End Title */}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {team.map((member) => (
          <Card key={member.name} className="overflow-hidden p-0">
            <CardContent className="!p-0">
              <div className="grid sm:grid-cols-2">
                <div className="relative h-full">
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={member.image}
                    alt={member.name}
                    width={320}
                    height={420}
                  />
                </div>
                <div className="p-6">
                  <div className="flex h-full flex-col">
                    <div>
                      <h3 className="text-lg font-medium">{member.name}</h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {member.role}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 py-6">
                      {Object.entries(member.stats).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-2xl font-semibold">{value}</p>
                          <p className="text-muted-foreground mt-1 text-xs capitalize">
                            {key}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-muted-foreground mt-4 border-l-2 pl-4 italic">
                      <Quote className="text-primary mb-2 size-4" />
                      {member.testimonial}
                    </blockquote>

                    <div className="mt-6 flex gap-2">
                      <Button size="icon" variant="ghost">
                        <Twitter className="size-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Github className="size-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Linkedin className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* End Grid */}
    </div>
  );
}

```

```tsx
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  className?: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
  className?: string;
}

const Faq1 = ({
  heading = "Frequently asked questions",
  items = [
    {
      id: "faq-1",
      question: "What is a FAQ?",
      answer:
        "A FAQ is a list of frequently asked questions and answers on a particular topic.",
    },
    {
      id: "faq-2",
      question: "What is the purpose of a FAQ?",
      answer:
        "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
    },
    {
      id: "faq-3",
      question: "How do I create a FAQ?",
      answer:
        "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
    },
    {
      id: "faq-4",
      question: "What are the benefits of a FAQ?",
      answer:
        "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
    },
    {
      id: "faq-5",
      question: "How should I organize my FAQ?",
      answer:
        "You should organize your FAQ in a logical manner, grouping related questions together and ordering them from most basic to more advanced topics.",
    },
    {
      id: "faq-6",
      question: "How long should FAQ answers be?",
      answer:
        "FAQ answers should be concise and to the point, typically a few sentences or a short paragraph is sufficient for most questions.",
    },
    {
      id: "faq-7",
      question: "Should I include links in my FAQ?",
      answer:
        "Yes, including links to more detailed information or related resources can be very helpful for users who want to learn more about a particular topic.",
    },
  ],
  className,
}: Faq1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-3xl">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h1>
        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq1 };

```

```tsx
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface Faq2Props {
  heading?: string;
  items?: FaqItem[];
  className?: string;
}

const Faq2 = ({
  heading = "Frequently asked questions",
  items = [
    {
      question: "What is a FAQ?",
      answer:
        "A FAQ is a list of frequently asked questions and answers on a particular topic.",
    },
    {
      question: "What is the purpose of a FAQ?",
      answer:
        "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
    },
    {
      question: "How do I create a FAQ?",
      answer:
        "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
    },
    {
      question: "What are the benefits of a FAQ?",
      answer:
        "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
    },
    {
      question: "How should I organize my FAQ?",
      answer:
        "You should organize your FAQ in a logical manner, grouping related questions together and ordering them from most basic to more advanced topics.",
    },
    {
      question: "How long should FAQ answers be?",
      answer:
        "FAQ answers should be concise and to the point, typically a few sentences or a short paragraph is sufficient for most questions.",
    },
    {
      question: "Should I include links in my FAQ?",
      answer:
        "Yes, including links to more detailed information or related resources can be very helpful for users who want to learn more about a particular topic.",
    },
  ],
  className,
}: Faq2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-3xl">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h1>
        <div className="space-y-8">
          {items.map((item, index) => (
            <div key={index} className="border-b pb-6">
              <h3 className="mb-2 font-semibold">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Faq2 };

```

```tsx
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq3Props {
  heading: string;
  description: string;
  items?: FaqItem[];
  supportHeading: string;
  supportDescription: string;
  supportButtonText: string;
  supportButtonUrl: string;
  className?: string;
}

const faqItems = [
  {
    id: "faq-1",
    question: "What is a FAQ?",
    answer:
      "A FAQ is a list of frequently asked questions and answers on a particular topic.",
  },
  {
    id: "faq-2",
    question: "What is the purpose of a FAQ?",
    answer:
      "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
  },
  {
    id: "faq-3",
    question: "How do I create a FAQ?",
    answer:
      "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
  },
  {
    id: "faq-4",
    question: "What are the benefits of a FAQ?",
    answer:
      "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
  },
  {
    id: "faq-5",
    question: "How should I organize my FAQ?",
    answer:
      "You should organize your FAQ in a logical manner, grouping related questions together and ordering them from most basic to more advanced topics.",
  },
  {
    id: "faq-6",
    question: "How long should FAQ answers be?",
    answer:
      "FAQ answers should be concise and to the point, typically a few sentences or a short paragraph is sufficient for most questions.",
  },
  {
    id: "faq-7",
    question: "Should I include links in my FAQ?",
    answer:
      "Yes, including links to more detailed information or related resources can be very helpful for users who want to learn more about a particular topic.",
  },
];

const Faq3 = ({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = faqItems,
  className,
}: Faq3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq3 };

```

```tsx
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const faqs = [
  {
    question: "What is a FAQ and why is it important?",
    answer:
      "FAQ stands for Frequently Asked Questions. It is a list that provides answers to common questions people may have about a specific product, service, or topic. Having a well-structured FAQ section is important because it allows users to quickly find information they need without the hassle of contacting customer support.",
  },
  {
    question: "Why should I use a FAQ on my website or app?",
    answer:
      "Utilizing a FAQ section on your website or app is a practical way to offer instant assistance to your users or customers. Instead of waiting for customer support responses, they can find quick answers to commonly asked questions. ",
  },
  {
    question: "How do I effectively create a FAQ section?",
    answer:
      "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
  },
  {
    question: "What are the benefits of having a well-maintained FAQ section?",
    answer:
      "There are numerous advantages to maintaining a robust FAQ section. Firstly, it provides immediate answers to common queries, which improves the user experience. Secondly, it reduces the number of support tickets or inquiries, freeing up time for your support team to focus on more unique or complicated issues.",
  },
  {
    question: "How should I organize my FAQ for optimal usability?",
    answer:
      'An organized FAQ is critical for user-friendliness. Start by grouping similar questions into categories, such as "Billing," "Account Setup," or "Technical Support." This way, users can quickly find the section that addresses their specific concerns.',
  },
  {
    question: "How often should I update my FAQ, and why is it necessary?",
    answer:
      "Regular updates to your FAQ are essential to keeping the information accurate and relevant. As your product or service evolves, so will the types of questions your users ask.",
  },
  {
    question: "Is it possible to customize my FAQ section to match my brand?",
    answer:
      "Yes, your FAQ section can and should be customized to align with your brand’s identity. This includes matching the visual design, such as fonts, colors, and layout, to the rest of your site or app. You can also enhance the section with additional media like images, videos, or links to other relevant resources.",
  },
  {
    question: "How can I make sure users know about my FAQ section?",
    answer:
      "Promoting your FAQ section is key to ensuring that users take advantage of it. You can do this by adding links to the FAQ on your website’s navigation bar, footer, or help pages.",
  },
];

interface Faq4Props {
  className?: string;
}

const Faq4 = ({ className }: Faq4Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div>
          <Badge className="text-xs font-medium">FAQ</Badge>
          <h1 className="mt-4 text-4xl font-semibold">
            Common Questions & Answers
          </h1>
          <p className="mt-6 font-medium text-muted-foreground">
            Find out all the essential details about our platform and how it can
            serve your needs.
          </p>
        </div>
        <div className="mt-12">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b-0"
              >
                <AccordionTrigger className="hover:text-foreground/60 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <Separator className="my-12" />
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div className="lg:col-span-2">
            <h1 className="mt-4 text-2xl font-semibold">
              Still have questions?
            </h1>
            <p className="mt-6 font-medium text-muted-foreground">
              We&apos;re here to provide clarity and assist with any queries you
              may have.
            </p>
          </div>
          <div className="flex md:justify-end">
            <a href="#" className="flex items-center gap-2 hover:underline">
              Contact Support
              <ChevronRight className="h-auto w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Faq4 };

```

```tsx
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Faq5Props {
  badge?: string;
  heading?: string;
  description?: string;
  faqs?: FaqItem[];
  className?: string;
}

const defaultFaqs: FaqItem[] = [
  {
    question: "What is a FAQ and why is it important?",
    answer:
      "FAQ stands for Frequently Asked Questions. It is a list that provides answers to common questions people may have about a specific product, service, or topic.",
  },
  {
    question: "Why should I use a FAQ on my website or app?",
    answer:
      "Utilizing a FAQ section on your website or app is a practical way to offer instant assistance to your users or customers. Instead of waiting for customer support responses, they can find quick answers to commonly asked questions. ",
  },
  {
    question: "How do I effectively create a FAQ section?",
    answer:
      "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
  },
  {
    question: "What are the benefits of having a well-maintained FAQ section?",
    answer:
      "There are numerous advantages to maintaining a robust FAQ section. Firstly, it provides immediate answers to common queries, which improves the user experience.",
  },
];

const Faq5 = ({
  badge = "FAQ",
  heading = "Common Questions & Answers",
  description = "Find out all the essential details about our platform and how it can serve your needs.",
  faqs = defaultFaqs,
  className,
}: Faq5Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="text-center">
          <Badge className="text-xs font-medium">{badge}</Badge>
          <h1 className="mt-4 text-4xl font-semibold">{heading}</h1>
          <p className="mt-6 font-medium text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-xl">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-8 flex gap-4">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-xs text-primary">
                {index + 1}
              </span>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{faq.question}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Faq5 };

```

```tsx
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    question: "What is a FAQ and why is it important?",
    answer:
      "FAQ stands for Frequently Asked Questions. It is a list that provides answers to common questions people may have about a specific product, service, or topic.",
  },
  {
    question: "Why should I use a FAQ on my website or app?",
    answer:
      "Utilizing a FAQ section on your website or app is a practical way to offer instant assistance to your users or customers. Instead of waiting for customer support responses, they can find quick answers to commonly asked questions. ",
  },
  {
    question: "How do I effectively create a FAQ section?",
    answer:
      "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
  },
  {
    question: "What are the benefits of having a well-maintained FAQ section?",
    answer:
      "There are numerous advantages to maintaining a robust FAQ section. Firstly, it provides immediate answers to common queries, which improves the user experience.",
  },
  {
    question: "How should I organize my FAQ for optimal usability?",
    answer:
      'An organized FAQ is critical for user-friendliness. Start by grouping similar questions into categories, such as "Billing," "Account Setup," or "Technical Support." This way, users can quickly find the section that addresses their specific concerns.',
  },
  {
    question: "How often should I update my FAQ, and why is it necessary?",
    answer:
      "Regular updates to your FAQ are essential to keeping the information accurate and relevant. As your product or service evolves, so will the types of questions your users ask.",
  },
];

interface Faq6Props {
  className?: string;
}

const Faq6 = ({ className }: Faq6Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="text-center">
          <Badge className="text-xs font-medium">FAQ</Badge>
          <h1 className="mt-4 text-4xl font-semibold">
            Common Questions & Answers
          </h1>
          <p className="mt-6 font-medium text-muted-foreground">
            Find out all the essential details about our platform and how it can
            serve your needs.
          </p>
        </div>
        <div className="mx-auto mt-14 grid gap-8 md:grid-cols-2 md:gap-12">
          {faqs.map((faq, index) => (
            <div key={index} className="flex gap-4">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-xs text-primary">
                {index + 1}
              </span>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{faq.question}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Faq6 };

```

```tsx
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What is a FAQ and why is it important?",
    answer:
      "FAQ stands for Frequently Asked Questions. It is a list that provides answers to common questions people may have about a specific product, service, or topic.",
  },
  {
    question: "Why should I use a FAQ on my website or app?",
    answer:
      "Utilizing a FAQ section on your website or app is a practical way to offer instant assistance to your users or customers. Instead of waiting for customer support responses, they can find quick answers to commonly asked questions. ",
  },
  {
    question: "How do I effectively create a FAQ section?",
    answer:
      "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
  },
  {
    question: "What are the benefits of having a well-maintained FAQ section?",
    answer:
      "There are numerous advantages to maintaining a robust FAQ section. Firstly, it provides immediate answers to common queries, which improves the user experience.",
  },
  {
    question: "How do I effectively create a FAQ section?",
    answer:
      "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
  },
];

interface Faq7Props {
  className?: string;
}

const Faq7 = ({ className }: Faq7Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-semibold">
              Need Help?
              <br />
              <span className="text-muted-foreground/70">
                We&apos;re here to assist.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              Still have questions? Feel free to contact our friendly
              <a href="#" className="mx-1 whitespace-nowrap underline">
                support team
              </a>
              specialists.
            </p>
            <Button size="lg" variant="outline" className="w-fit">
              View all FAQs
            </Button>
          </div>
          <Accordion type="multiple">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export { Faq7 };

```

```tsx
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = {
  general: [
    {
      question: "What is a FAQ and why is it important?",
      answer:
        "FAQ stands for Frequently Asked Questions. It is a list that provides answers to common questions people may have about a specific product, service, or topic.",
    },
    {
      question: "Why should I use a FAQ on my website or app?",
      answer:
        "Utilizing a FAQ section on your website or app is a practical way to offer instant assistance to your users or customers. Instead of waiting for customer support responses, they can find quick answers to commonly asked questions. ",
    },
    {
      question: "How do I effectively create a FAQ section?",
      answer:
        "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
    },
    {
      question:
        "What are the benefits of having a well-maintained FAQ section?",
      answer:
        "There are numerous advantages to maintaining a robust FAQ section. Firstly, it provides immediate answers to common queries, which improves the user experience.",
    },
    {
      question: "How do I effectively create a FAQ section?",
      answer:
        "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
    },
  ],
  billing: [
    {
      question: "How do I change my billing information?",
      answer:
        "You can change your billing information by logging into your account and navigating to the billing section.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription by logging into your account and navigating to the billing section.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "We offer a 30-day refund policy. If you are not satisfied with our product, you can request a refund within 30 days of purchase.",
    },
    {
      question: "How do I update my payment method?",
      answer:
        "You can update your payment method by logging into your account and navigating to the billing section.",
    },
  ],
};

interface Faq8Props {
  className?: string;
}

const Faq8 = ({ className }: Faq8Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mb-8 text-3xl font-semibold md:mb-11 md:text-5xl">
          Frequently asked questions.
        </h2>
        <div className="grid gap-4 border-t pt-4 md:grid-cols-3 md:gap-10">
          <h3 className="text-xl font-medium">General</h3>
          <Accordion type="multiple" className="md:col-span-2">
            {faqs.general.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-10 grid gap-4 border-t pt-4 md:grid-cols-3 md:gap-10">
          <h3 className="text-xl font-medium">Billing</h3>
          <Accordion type="multiple" className="md:col-span-2">
            {faqs.billing.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export { Faq8 };

```

```tsx
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is a FAQ and why is it important?",
    answer:
      "FAQ stands for Frequently Asked Questions. It is a list that provides answers to common questions people may have about a specific product, service, or topic.",
  },
  {
    question: "Why should I use a FAQ on my website or app?",
    answer:
      "Utilizing a FAQ section on your website or app is a practical way to offer instant assistance to your users or customers. Instead of waiting for customer support responses, they can find quick answers to commonly asked questions. ",
  },
  {
    question: "How do I effectively create a FAQ section?",
    answer:
      "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
  },
  {
    question: "What are the benefits of having a well-maintained FAQ section?",
    answer:
      "There are numerous advantages to maintaining a robust FAQ section. Firstly, it provides immediate answers to common queries, which improves the user experience.",
  },
  {
    question: "How do I effectively create a FAQ section?",
    answer:
      "Creating a FAQ section starts with gathering the most frequent questions you receive from your users or customers. Once you have a list, you need to write clear, detailed, and helpful answers to each question.",
  },
];

interface Faq9Props {
  className?: string;
}

const Faq9 = ({ className }: Faq9Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mt-2 mb-12 text-3xl font-bold md:text-6xl">FAQ</h2>
        <Accordion type="multiple">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="mb-2 rounded-md border-b-0 bg-muted px-5 py-2 md:mb-4"
            >
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq9 };

```

```tsx
import { MessageCircleQuestion } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const DATA = [
  {
    question: "Is there a free version?",
    answer:
      "Yes! We offer a Free Plan with essential features. You can upgrade anytime for advanced tools and integrations.",
  },
  {
    question: "What apps can I integrate?",
    answer:
      "Our platform supports integration with various popular apps and services. The specific integrations available depend on your plan level.",
  },
  {
    question: "How does the AI work?",
    answer:
      "Our AI technology uses advanced machine learning algorithms to analyze and process your data, providing intelligent insights and automation capabilities.",
  },
  {
    question: "Can I use this with a team?",
    answer:
      "Absolutely! Our platform is designed for both individual and team use. You can easily collaborate and share resources with team members.",
  },
  {
    question: "Is my data safe?",
    answer:
      "We take data security seriously. All data is encrypted and stored securely following industry best practices and compliance standards.",
  },
  {
    question: "How do I manage my subscription?",
    answer:
      "You can manage your subscription easily through your account dashboard, where you can upgrade, downgrade, or modify your plan settings.",
  },
];

interface Faq10Props {
  className?: string;
}

const Faq10 = ({ className }: Faq10Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="border-y">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <MessageCircleQuestion className="size-4" />

            <span>FAQ</span>
          </Badge>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Everything You Need to Know
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Looking for quick answers? Check out our{" "}
            <span className="underline">FAQ section</span>.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="mx-auto max-w-3xl pt-8 pb-4 md:pb-8 lg:pt-[3.75rem] lg:pb-[50px]">
          <Accordion type="single" collapsible className="space-y-4">
            {DATA.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-[7px] border px-6 text-primary data-[state=open]:pb-2"
              >
                <AccordionTrigger className="py-5 text-start text-base tracking-[-0.32px]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base tracking-[-0.32px] text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

export { Faq10 };

```

```tsx
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
  {
    title: "Support",
    questions: [
      {
        question: "How do I update my account without breaking my laptop?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.",
      },
      {
        question: "Is support free, or do I need to Google everything?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.",
      },
      {
        question: "Are you going to be subsumed by AI?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.",
      },
    ],
  },
  {
    title: "Your account",
    questions: [
      {
        question: "Is support free, or do I need to Google everything?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.",
      },
      {
        question: "Are you going to be subsumed by AI?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.",
      },
    ],
  },
  {
    title: "Other questions",
    questions: [
      {
        question: "Is support free, or do I need to Google everything?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.",
      },
      {
        question: "Are you going to be subsumed by AI?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.",
      },
    ],
  },
];

interface Faq11Props {
  className?: string;
}

const Faq11 = ({ className }: Faq11Props) => {
  return (
    <section
      className={cn(
        "relative mx-2.5 mt-2.5 rounded-t-2xl rounded-b-[36px] bg-linear-to-b from-background via-background to-slate-100 lg:mx-4 dark:to-slate-900",
        className,
      )}
    >
      <section className="py-32">
        <div className="container grid max-w-5xl gap-16 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Got Questions?
            </h2>

            <p className="max-w-md leading-snug font-medium text-muted-foreground lg:mx-auto">
              If you can't find what you're looking for,{" "}
              <a href="#" className="underline underline-offset-4">
                get in touch
              </a>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="">
                <h3 className="border-b py-4 font-medium text-muted-foreground">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={i} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger className="text-start">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export { Faq11 };

```

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type Category = "Support" | "Account" | "Features" | "Security" | "Other";

interface FAQItem {
  question: string;
  answer: string;
  category: Category;
}

const faqItems: FAQItem[] = [
  // Support Questions
  {
    category: "Support",
    question: "Is there a free version?",
    answer:
      "Yes! We offer a generous free plan with just enough features except that one feature you really want! Our strategy is to get your credit card details on file then steadily double our prices against inflation rates.",
  },
  {
    category: "Support",
    question: "Is support free, or do I need to Perplexity everything?",
    answer:
      "We pride ourselves on our comprehensive support system. Our chatbot will happily redirect you to our documentation, which will then redirect you back to the chatbot.",
  },
  {
    category: "Support",
    question: "What if I need immediate assistance?",
    answer:
      "Our AI support team will get back to you in approximately 3-5 business years.",
  },
  // Account Questions
  {
    category: "Account",
    question: "How do I update my account without breaking my laptop?",
    answer:
      "Our platform is designed to be extremely user-friendly. Just follow our simple 47-step process, and you should be fine!",
  },
  {
    category: "Account",
    question: "How do I update my account without breaking the universe?",
    answer: "Just be very careful not to press any buttons too hard.",
  },
  {
    category: "Account",
    question: "What happens if I forget my password?",
    answer: "You'll need to solve three riddles and defeat a dragon.",
  },
  // Features Questions
  {
    category: "Features",
    question: "Are you going to be subsumed by AI?",
    answer:
      "Probably! But until then, we'll keep pretending we're irreplaceable.",
  },
  {
    category: "Features",
    question: "What makes your platform unique?",
    answer:
      "We use at least 7 different types of AI, and none of them work together!",
  },
  {
    category: "Features",
    question: "Do you support integration with other tools?",
    answer: "We integrate with everything except the tools you actually use.",
  },
  // Security Questions
  {
    category: "Security",
    question: "How secure is my data?",
    answer:
      'We use military-grade encryption, but our password is "password123".',
  },
  {
    category: "Security",
    question: "What happens in case of a data breach?",
    answer:
      "We'll send you a very apologetic email with a $5 gift card to your local coffee shop.",
  },
  {
    category: "Security",
    question: "Do you have a backup system?",
    answer:
      "Yes, we back up everything to a USB stick that we keep in a very safe place... somewhere.",
  },
  // Other Questions
  {
    category: "Other",
    question: "Why is your pricing so complicated?",
    answer:
      "Because simple pricing would make it too easy for you to understand what you're paying for.",
  },
  {
    category: "Other",
    question: "Do you offer refunds?",
    answer:
      "Yes, but only if you can prove you're from an alternate dimension.",
  },
  {
    category: "Other",
    question: "What's your roadmap look like?",
    answer: "It's more of a road-squiggle, really. We're agile!",
  },
];

const categories: Category[] = [
  "Support",
  "Account",
  "Features",
  "Security",
  "Other",
];

const TOP_PADDING = 300;

interface Faq12Props {
  className?: string;
}

const Faq12 = ({ className }: Faq12Props) => {
  const [activeCategory, setActiveCategory] = useState<Category>("Support");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isScrollingRef = useRef(false);
  const categoryRefs = useRef<Record<Category, HTMLDivElement | null>>({
    Support: null,
    Account: null,
    Features: null,
    Security: null,
    Other: null,
  });

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();

    let debounceTimeout: NodeJS.Timeout;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Skip if we're programmatically scrolling
        if (isScrollingRef.current) return;

        // Clear any pending timeout
        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }

        // Debounce the category update
        debounceTimeout = setTimeout(() => {
          const intersectingEntries = entries.filter(
            (entry) => entry.isIntersecting,
          );

          // Find the entry that's closest to being 100px from the top
          const entry = intersectingEntries.reduce(
            (closest, current) => {
              const rect = current.boundingClientRect;
              const distanceFromThreshold = Math.abs(rect.top - TOP_PADDING);
              const closestDistance = closest
                ? Math.abs(closest.boundingClientRect.top - TOP_PADDING)
                : Infinity;

              return distanceFromThreshold < closestDistance
                ? current
                : closest;
            },
            null as IntersectionObserverEntry | null,
          );

          if (entry) {
            const category = entry.target.getAttribute(
              "data-category",
            ) as Category;
            if (category) {
              setActiveCategory(category);
            }
          }
        }, 150);
      },
      {
        root: null,
        rootMargin: `-${TOP_PADDING}px 0px -100% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    Object.entries(categoryRefs.current).forEach(([category, element]) => {
      if (element) {
        element.setAttribute("data-category", category);
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const cleanup = setupObserver();
    return () => {
      cleanup();
      observerRef.current?.disconnect();
    };
  }, [setupObserver]);

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
    isScrollingRef.current = true;

    const element = document.getElementById(`faq-${category.toLowerCase()}`);
    if (element) {
      element.style.scrollMargin = `${TOP_PADDING}px`;
      element.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  return (
    <section
      className={cn(
        "min-h-screen bg-[#F2F2F2] py-32 dark:bg-[#24242B]",
        className,
      )}
    >
      <div className="container max-w-4xl">
        <div className="text-center">
          <h1 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">
            We've got answers
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-balance text-muted-foreground">
            This really should be an LLM but we're waiting for RAG to truly
            reach commodity stage before we touch it.
          </p>
        </div>

        <div className="mt-8 grid max-w-5xl gap-8 md:mt-12 md:grid-cols-[200px_1fr] md:gap-12 lg:mt-16">
          {/* Sidebar */}
          <div className="sticky top-24 flex h-fit flex-col gap-4 max-md:hidden">
            {categories.map((category) => (
              <Button
                variant="ghost"
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`justify-start text-left text-xl transition-colors ${
                  activeCategory === category
                    ? "font-semibold"
                    : "font-normal hover:opacity-75"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* FAQ Items by Category */}
          <div className="space-y-6">
            {categories.map((category) => {
              const categoryItems = faqItems.filter(
                (item) => item.category === category,
              );

              return (
                <div
                  key={category}
                  id={`faq-${category.toLowerCase()}`}
                  ref={(el) => {
                    categoryRefs.current[category] = el;
                  }}
                  className={cn(
                    `rounded-xl`,
                    activeCategory === category
                      ? "bg-background"
                      : "bg-background/40",
                    "px-6",
                  )}
                  style={{
                    scrollMargin: `${TOP_PADDING}px`,
                  }}
                >
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={`${categories[0]}-0`}
                    className="w-full"
                  >
                    {categoryItems.map((item, i) => (
                      <AccordionItem
                        key={i}
                        value={`${category}-${i}`}
                        className="border-b border-muted last:border-0"
                      >
                        <AccordionTrigger className="text-base font-medium hover:no-underline">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base font-medium text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Faq12 };

```

```tsx
import { type SVGProps, useId } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const FAQ_ITEMS = [
  {
    category: "SUPPORT",
    items: [
      {
        question: "Is there a free version?",
        answer:
          "Yes! We offer a generous free plan with just enough features except that one feature you really want! Our strategy is to get your credit card details on file then steadily double our prices against inflation rates.",
      },
      {
        question: "How do I update my account without breaking my laptop?",
        answer:
          "Our platform is designed with safety in mind. You can update your account settings through our intuitive dashboard without any risk to your hardware. We have multiple safeguards in place to prevent any system conflicts.",
      },
      {
        question: "Is support free, or do I need to Google everything?",
        answer:
          "We provide comprehensive support at no additional cost. Our dedicated support team is available 24/7 to help you with any questions or issues you might encounter. No need to rely on Google - we're here to help!",
      },
      {
        question: "Are you going to be subsumed by AI?",
        answer:
          "While we embrace AI technology to enhance our services, we maintain a strong human element in our operations. Our team works alongside AI to provide the best possible service while ensuring human oversight and decision-making remain central to our operations.",
      },
    ],
  },
  {
    category: "YOUR ACCOUNT",
    items: [
      {
        question: "Is support free, or do I need to Google everything?",
        answer:
          "We provide comprehensive support at no additional cost. Our dedicated support team is available 24/7 to help you with any questions or issues you might encounter. No need to rely on Google - we're here to help!",
      },
      {
        question: "Are you going to be subsumed by AI?",
        answer:
          "While we embrace AI technology to enhance our services, we maintain a strong human element in our operations. Our team works alongside AI to provide the best possible service while ensuring human oversight and decision-making remain central to our operations.",
      },
    ],
  },
  {
    category: "OTHER QUESTIONS",
    items: [
      {
        question: "Is support free, or do I need to Google everything?",
        answer:
          "We provide comprehensive support at no additional cost. Our dedicated support team is available 24/7 to help you with any questions or issues you might encounter. No need to rely on Google - we're here to help!",
      },
      {
        question: "Are you going to be subsumed by AI?",
        answer:
          "While we embrace AI technology to enhance our services, we maintain a strong human element in our operations. Our team works alongside AI to provide the best possible service while ensuring human oversight and decision-making remain central to our operations.",
      },
    ],
  },
];

export function Faq14() {
  return (
    <section className="relative py-32">
      <div className="container">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-2xl text-muted-foreground md:text-3xl">
            Everything you need to know about Charter
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl space-y-12 md:mt-12 lg:mt-20">
          {FAQ_ITEMS.map((category) => (
            <Card key={category.category} className="border-hidden bg-muted">
              <CardHeader className="pb-0">
                <h3 className="border-b pb-4 font-mono text-sm font-medium tracking-widest text-accent-foreground uppercase">
                  {category.category}
                </h3>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`${category.category}-${i}`}
                      className="border-b border-muted last:border-0"
                    >
                      <AccordionTrigger className="text-start text-base font-medium hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base font-medium text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="absolute -inset-40 z-[-1] [mask-image:radial-gradient(circle_at_center,black_0%,black_20%,transparent_75%)]">
        <PlusSigns className="h-full w-full text-foreground/[0.05]" />
      </div>
    </section>
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
import type { LucideIcon } from "lucide-react";
import { Clock, Heart, Home, Wallet } from "lucide-react";

import { cn } from "@/lib/utils";

interface FaqItem {
  icon: LucideIcon;
  heading: string;
  description: string;
}

interface Faq15Props {
  title?: string;
  items?: FaqItem[];
  className?: string;
}

const defaultItems: FaqItem[] = [
  {
    icon: Heart,
    heading: "Save a life, gain a friend",
    description:
      "By choosing to adopt, you're giving a deserving animal a second chance at happiness while gaining a loyal companion who will bring joy to your life.",
  },
  {
    icon: Wallet,
    heading: "More affordable than buying",
    description:
      "Adoption fees typically include vaccinations, microchipping, and spaying/neutering, making it a more cost-effective option than purchasing from a breeder.",
  },
  {
    icon: Clock,
    heading: "Skip the puppy phase",
    description:
      "Many shelter pets are already house-trained and understand basic commands, saving you time and effort in the training process.",
  },
  {
    icon: Home,
    heading: "Support local shelters",
    description:
      "Your adoption helps support the vital work of local shelters, enabling them to continue rescuing and caring for animals in need.",
  },
];

const Faq15 = ({
  title = "Why should you adopt a pet from your local shelter?",
  items = defaultItems,
  className,
}: Faq15Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-semibold md:text-5xl lg:mx-14">
            {title}
          </h2>
          <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {items.map((item, idx) => (
              <li className="flex flex-col gap-2.5" key={idx}>
                <div className="flex items-center gap-2 md:gap-2.5">
                  <item.icon className="size-5 shrink-0 md:size-6" />
                  <h3 className="font-semibold md:text-lg">{item.heading}</h3>
                </div>
                <p className="text-sm text-muted-foreground md:text-base">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Faq15 };

```

```tsx
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_QUESTIONS = [
  {
    question: "What is a FAQ?",
    answer:
      "A FAQ is a list of frequently asked questions and answers on a particular topic.",
  },
  {
    question: "What is the purpose of a FAQ?",
    answer:
      "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
  },
  {
    question: "How do I create a FAQ?",
    answer:
      "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
  },
  {
    question: "What are the benefits of a FAQ?",
    answer:
      "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
  },
  {
    question: "What is a FAQ?",
    answer:
      "A FAQ is a list of frequently asked questions and answers on a particular topic.",
  },
  {
    question: "What is the purpose of a FAQ?",
    answer:
      "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
  },
  {
    question: "How do I create a FAQ?",
    answer:
      "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
  },
  {
    question: "What are the benefits of a FAQ?",
    answer:
      "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
  },
];

interface Faq16Props {
  className?: string;
}

const Faq16 = ({ className }: Faq16Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <h1 className="mb-10 text-center text-6xl font-bold tracking-tighter text-foreground">
          FAQs
        </h1>
        <div className="z-20 mx-auto max-w-2xl rounded-2xl border border-border bg-background p-3">
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col items-center justify-center gap-3"
          >
            {FAQ_QUESTIONS.map((item, index) => (
              <AccordionItem
                value={index.toString()}
                key={index}
                className="m-0 w-full rounded-xl bg-muted px-4 py-2"
              >
                <AccordionTrigger className="flex flex-1 justify-between text-left font-semibold transition-all hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="mt-2 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export { Faq16 };

```

```tsx
"use client";

import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface ProfileInfo {
  name: string;
  title: string;
  image: string;
}

interface Faq17Props {
  heading?: string;
  profileInfo?: ProfileInfo;
  contactSection?: {
    title: string;
    description: string;
    linkText: string;
    className?: string;
  };
  items?: FaqItem[];
  showBottomButtons?: boolean;
  className?: string;
}

const Faq17 = ({
  heading = "FAQ",
  profileInfo = {
    name: "Sarah Johnson",
    title: "Customer Success Manager",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
  },
  contactSection = {
    title: "Still have questions?",
    description:
      "Can't find what you're looking for? Our team is here to help! Whether you need clarification, have a specific question, or want to learn more about our services, we'd love to hear from you. Let's get you the answers you need.",
    linkText: "Contact us",
  },
  items = [
    {
      question: "What services do you offer?",
      answer:
        "We provide a comprehensive range of services tailored to meet your needs. From consultation and planning to implementation and ongoing support, our team is equipped to handle projects of all sizes. Contact us for a detailed overview of our offerings.",
    },
    {
      question: "How do I get started?",
      answer:
        "Getting started is easy! Simply reach out to us through our contact form or give us a call. We'll schedule a consultation to discuss your needs, answer any questions, and create a customized plan that works best for you and your timeline.",
    },
    {
      question: "What are your pricing options?",
      answer:
        "Our pricing is flexible and depends on the scope of your project and specific requirements. We offer various packages to accommodate different budgets and needs. We're happy to provide a detailed quote after understanding your project requirements.",
    },
    {
      question: "Do you offer support after completion?",
      answer:
        "Absolutely! We believe in building long-term relationships with our clients. We provide ongoing support, maintenance, and are always available to help with any questions or additional needs that may arise after project completion.",
    },
    {
      question: "What makes you different from competitors?",
      answer:
        "We pride ourselves on our personalized approach, attention to detail, and commitment to customer satisfaction. Our experienced team combines expertise with creativity to deliver exceptional results. We focus on understanding your unique needs and exceeding your expectations.",
    },
  ],
  className,
}: Faq17Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12 xl:grid-cols-12 xl:gap-16">
          <div className="flex flex-col justify-between lg:col-span-2 xl:col-span-4">
            <div>
              <div className="mb-8 flex items-start gap-3 sm:gap-4 lg:mb-12">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-16">
                  <img
                    src={profileInfo.image}
                    alt={profileInfo.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="mb-1 text-lg leading-tight font-semibold sm:text-xl">
                    {profileInfo.name}
                  </h2>
                  <p className="text-sm sm:text-base">{profileInfo.title}</p>
                </div>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-lg leading-tight font-semibold sm:text-xl">
                  {contactSection.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {contactSection.description}
                </p>
              </div>
            </div>
            <div className="py-4">
              <div className="group flex h-auto p-0 text-start text-base font-medium hover:bg-transparent sm:text-xl">
                <span className="border-b-2 border-border pb-0.5 transition-colors">
                  {contactSection.linkText}
                </span>
                <ArrowUpRight className="ml-1 h-6 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 xl:col-span-8">
            <div className="mb-8 md:text-center lg:mb-16 lg:text-left">
              <h1 className="text-4xl leading-none font-medium tracking-tight sm:text-6xl">
                {heading}
              </h1>
            </div>
            <div className="max-w-none">
              <Accordion
                type="single"
                collapsible
                defaultValue="item-0"
                className="space-y-0"
              >
                {items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className={cn(
                      "border-0",
                      index !== items.length - 1 && "border-b border-border",
                    )}
                  >
                    <AccordionTrigger className="justify-between py-6 text-left text-lg font-semibold hover:no-underline sm:text-xl lg:py-8 lg:text-xl">
                      <span className="pr-4">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pr-8 pb-6 text-sm leading-relaxed text-muted-foreground sm:text-base lg:pb-8">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Faq17 };

```

"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

export interface ServicesListAccordionBenefitsProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    benefits?: string[];
    ctaText?: string;
    ctaUrl?: string;
  }>;
  bottomCtaText?: string;
  bottomCtaUrl?: string;
}

const defaultServices = [
  {
    id: "service-1",
    title: "Web Development",
    shortDescription: "Custom websites and web applications",
    fullDescription:
      "We build high-performance websites and applications that look great and work flawlessly across all devices. Using modern technologies like React, Next.js, and Tailwind CSS, we create digital experiences that help your business grow.",
    benefits: [
      "Responsive design that works on all devices",
      "Fast loading speeds and optimized performance",
      "SEO-friendly code structure",
      "Custom features tailored to your business needs",
      "Ongoing maintenance and support available",
    ],
    ctaText: "Learn more",
    ctaUrl: "#",
  },
  {
    id: "service-2",
    title: "UI/UX Design",
    shortDescription: "User-centered design solutions",
    fullDescription:
      "Good design is about more than just aesthetics—it's about creating intuitive, enjoyable experiences for your users. We combine visual design with usability principles to create interfaces that delight your users and achieve your business goals.",
    benefits: [
      "User research and persona development",
      "Wireframing and prototyping",
      "Visual design with attention to brand consistency",
      "Usability testing and iteration",
      "Design systems that scale with your business",
    ],
    ctaText: "Learn more",
    ctaUrl: "#",
  },
  {
    id: "service-3",
    title: "E-commerce Solutions",
    shortDescription: "Online stores that drive sales",
    fullDescription:
      "Turn your products into profit with a custom e-commerce solution that makes selling online simple. We create online stores that are easy to manage, secure for your customers, and optimized for conversions.",
    benefits: [
      "Seamless checkout experiences",
      "Product catalog management",
      "Secure payment processing",
      "Inventory management integrations",
      "Mobile-optimized shopping experience",
    ],
    ctaText: "Learn more",
    ctaUrl: "#",
  },
  {
    id: "service-4",
    title: "Digital Marketing & SEO",
    shortDescription: "Strategies to increase visibility",
    fullDescription:
      "The best website in the world won't help your business if no one can find it. We develop comprehensive digital marketing and SEO strategies that drive qualified traffic to your site and convert visitors into customers.",
    benefits: [
      "Technical SEO optimization",
      "Keyword research and content strategy",
      "Local SEO for brick-and-mortar businesses",
      "Analytics setup and performance tracking",
      "Conversion rate optimization",
    ],
    ctaText: "Learn more",
    ctaUrl: "#",
  },
  {
    id: "service-5",
    title: "Website Maintenance",
    shortDescription: "Keeping your site secure and updated",
    fullDescription:
      "A website is never truly 'finished.' We offer ongoing maintenance services to ensure your site remains secure, up-to-date, and performing at its best. From security updates to content changes, we'll keep your digital presence running smoothly.",
    benefits: [
      "Regular security updates and monitoring",
      "Performance optimization",
      "Content updates and additions",
      "Backup and recovery solutions",
      "24/7 support for critical issues",
    ],
    ctaText: "Learn more",
    ctaUrl: "#",
  },
];

/**
 * ServicesListAccordionBenefits - An accordion layout with expandable service items featuring detailed benefits lists.
 * Each accordion item shows title and short description when collapsed, expanding to reveal full description,
 * benefits list with bullet points, and a CTA link. Includes a bottom CTA for custom quotes.
 * Ideal for freelancers or agencies showcasing detailed service offerings with clear value propositions.
 */
export function ServicesListAccordionBenefits({
  className,
  title = "My Services",
  description = "Click on any service to learn more about how I can help your business succeed online",
  services = defaultServices,
  bottomCtaText = "Get a custom quote",
  bottomCtaUrl = "#",
}: ServicesListAccordionBenefitsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {description}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {services.map((service) => (
              <AccordionItem
                key={service.id}
                value={service.id}
                className="border-b border-primary/10 px-0"
              >
                <AccordionTrigger className="py-6 hover:no-underline">
                  <div className="flex flex-1 items-center text-left">
                    <div>
                      <h3 className="text-xl font-medium">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{service.fullDescription}</p>
                    {service.benefits && service.benefits.length > 0 && (
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                          Key Benefits:
                        </h4>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {service.benefits.map((benefit, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="text-xl leading-tight text-primary">
                                &bull;
                              </span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {service.ctaText && (
                      <div className="pt-2">
                        <Pressable
                          href={service.ctaUrl}
                          variant="outline"
                          size="sm"
                          asButton
                        >
                          {service.ctaText}
                          <DynamicIcon
                            name="lucide/arrow-right"
                            className="ml-2 h-3.5 w-3.5"
                          />
                        </Pressable>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {bottomCtaText && (
            <div className="mt-12 text-center">
              <Pressable href={bottomCtaUrl} variant="default" asButton>
                {bottomCtaText}
                <DynamicIcon
                  name="lucide/arrow-right"
                  className="ml-2 h-4 w-4"
                />
              </Pressable>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

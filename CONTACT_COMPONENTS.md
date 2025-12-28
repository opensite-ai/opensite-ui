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

```tsx
"use client";

import { Calendar as CalendarIcon, Clock, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const TOPICS = [
  "Product Demo",
  "Sales Inquiry",
  "Technical Support",
  "Partnership",
  "General Question",
];

export const title = "React Contact Block Callback";

export default function ContactCallback() {
  return (
    <section className="pb-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Request a Callback
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Schedule a time that works for you and we'll call you to discuss
            your needs.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 lg:p-8">
            <form action="#" className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Your Information</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Schedule */}
              <div className="border-t pt-6">
                <h3 className="mb-4 text-lg font-semibold">
                  Preferred Callback Time
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <div className="relative">
                      <Input id="date" type="date" className="pl-10" />
                      <CalendarIcon className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Select>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="cst">Central Time (CST)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Topic */}
              <div className="border-t pt-6">
                <h3 className="mb-4 text-lg font-semibold">
                  What would you like to discuss?
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Select>
                      <SelectTrigger id="topic">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {TOPICS.map((topic) => (
                          <SelectItem key={topic} value={topic.toLowerCase()}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">
                      Additional Details (Optional)
                    </Label>
                    <Textarea
                      id="details"
                      placeholder="Help us prepare for the call by sharing any specific questions or topics you'd like to cover..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium">Callback Process</p>
                    <p className="mt-1 text-muted-foreground leading-relaxed">
                      We'll call you at the scheduled time at the phone number
                      you provided. Please ensure you're available to answer. If
                      you miss the call, we'll send you a follow-up email.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full gap-2" size="lg">
                <Phone className="h-4 w-4" />
                Schedule Callback
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Need immediate assistance?{" "}
          <a href="#" className="text-primary hover:underline">
            Start a live chat
          </a>{" "}
          or call us at{" "}
          <a href="tel:+15551234567" className="text-primary hover:underline">
            +1 (555) 123-4567
          </a>
        </p>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Mail, Phone, Ticket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const OPTIONS = [
  {
    icon: Phone,
    info: "+1(424) 535 3523",
  },
  {
    icon: Mail,
    info: "hello@mail.com",
  },
  {
    icon: Ticket,
    info: "Open Support Ticket",
  },
];

export const title = "React Contact Block Card";

export default function ContactCard() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Card className="p-6 lg:p-8">
            <h3 className="mb-6 text-2xl font-semibold tracking-tight">
              Contact us
            </h3>
            <form action="#" className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help..."
                  rows={4}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="privacy-policy" />
                <Label
                  htmlFor="privacy-policy"
                  className="cursor-pointer text-sm font-normal"
                >
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </Card>

          <div className="lg:pt-8">
            <h2 className="mb-3 text-3xl font-bold tracking-tight">
              Get in Touch
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
            <div className="mt-10 space-y-4">
              {OPTIONS.map(({ icon: Icon, info }, key) => (
                <div key={key} className="flex items-center gap-4">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span>{info}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { Briefcase, Upload, User, X, File } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const POSITIONS = [
  { value: "frontend", label: "Frontend Developer" },
  { value: "backend", label: "Backend Developer" },
  { value: "fullstack", label: "Full Stack Developer" },
  { value: "designer", label: "Product Designer" },
  { value: "pm", label: "Product Manager" },
  { value: "marketing", label: "Marketing Manager" },
  { value: "other", label: "Other" },
];

const AVAILABILITY = [
  { value: "immediately", label: "Immediately" },
  { value: "2-weeks", label: "2 weeks notice" },
  { value: "1-month", label: "1 month notice" },
  { value: "flexible", label: "Flexible" },
];

export const title = "React Contact Block Careers";

export default function ContactCareers() {
  const [resume, setResume] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setResume(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Join Our Team
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We're always looking for talented people to join us.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Position & Resume */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Position Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select>
                      <SelectTrigger id="position">
                        <SelectValue placeholder="Select a position" />
                      </SelectTrigger>
                      <SelectContent>
                        {POSITIONS.map((pos) => (
                          <SelectItem key={pos.value} value={pos.value}>
                            {pos.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Resume / CV</Label>
                    {!resume ? (
                      <label
                        htmlFor="resume-upload"
                        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 transition-colors hover:border-foreground"
                      >
                        <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                        <p className="text-sm">Upload your resume</p>
                        <p className="text-xs text-muted-foreground">
                          PDF or DOCX up to 5MB
                        </p>
                        <Input
                          id="resume-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <File className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{resume.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(resume.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleRemoveFile}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">
                      LinkedIn Profile (Optional)
                    </Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio">
                      Portfolio / Website (Optional)
                    </Label>
                    <Input
                      id="portfolio"
                      type="url"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Availability</Label>
                    <RadioGroup defaultValue="2-weeks" className="space-y-2">
                      {AVAILABILITY.map((item) => (
                        <div
                          key={item.value}
                          className="flex items-center gap-3"
                        >
                          <RadioGroupItem value={item.value} id={item.value} />
                          <Label htmlFor={item.value} className="font-normal">
                            {item.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Right: Personal Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Your Information</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cover-letter">
                      Cover Letter (Optional)
                    </Label>
                    <Textarea
                      id="cover-letter"
                      placeholder="Tell us why you'd be a great fit for this role..."
                      rows={5}
                    />
                  </div>

                  <Separator className="my-4" />

                  <Button className="w-full">Submit Application</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We'll review your application and get back to you within 5
                    business days.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import {
  Calendar,
  ChefHat,
  MapPin,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

const EVENT_TYPES = [
  { value: "wedding", label: "Wedding" },
  { value: "corporate", label: "Corporate Event" },
  { value: "birthday", label: "Birthday / Anniversary" },
  { value: "holiday", label: "Holiday Party" },
  { value: "gala", label: "Gala / Fundraiser" },
  { value: "private", label: "Private Dinner" },
  { value: "other", label: "Other" },
];

const SERVICE_STYLES = [
  { value: "buffet", label: "Buffet", description: "Self-serve stations" },
  { value: "plated", label: "Plated", description: "Formal sit-down service" },
  { value: "family", label: "Family Style", description: "Shared platters" },
  {
    value: "stations",
    label: "Food Stations",
    description: "Interactive cooking",
  },
  { value: "cocktail", label: "Cocktail", description: "Passed appetizers" },
];

const CUISINES = [
  { id: "american", label: "American" },
  { id: "italian", label: "Italian" },
  { id: "asian", label: "Asian Fusion" },
  { id: "mexican", label: "Mexican" },
  { id: "mediterranean", label: "Mediterranean" },
  { id: "bbq", label: "BBQ" },
];

const DIETARY_OPTIONS = [
  { id: "vegetarian", label: "Vegetarian options" },
  { id: "vegan", label: "Vegan options" },
  { id: "gluten-free", label: "Gluten-free options" },
  { id: "kosher", label: "Kosher" },
  { id: "halal", label: "Halal" },
];

export const title = "React Contact Block Catering";

export default function ContactCatering() {
  const [guests, setGuests] = useState([75]);
  const [serviceStyle, setServiceStyle] = useState<string>("buffet");

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <Badge variant="secondary" className="mb-4">
            <ChefHat className="mr-1 h-3 w-3" />
            Custom Menus
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Catering Inquiry
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            From intimate dinners to grand celebrations, we'll create the
            perfect menu.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Event Details */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Event Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="event-type">Event Type</Label>
                      <Select>
                        <SelectTrigger id="event-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {EVENT_TYPES.map((event) => (
                            <SelectItem key={event.value} value={event.value}>
                              {event.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-date">Event Date</Label>
                      <Input id="event-date" type="date" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <Label>Estimated Guests</Label>
                      </div>
                      <span className="text-lg font-semibold">{guests[0]}</span>
                    </div>
                    <Slider
                      value={guests}
                      onValueChange={setGuests}
                      min={10}
                      max={500}
                      step={5}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10 guests</span>
                      <span>500 guests</span>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input id="start-time" type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time">End Time</Label>
                      <Input id="end-time" type="time" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="venue">Venue / Location</Label>
                    </div>
                    <Input id="venue" placeholder="Venue name or address" />
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <Label>Service Style</Label>
                    <RadioGroup
                      value={serviceStyle}
                      onValueChange={setServiceStyle}
                      className="grid grid-cols-2 gap-2"
                    >
                      {SERVICE_STYLES.map((style) => (
                        <Label
                          key={style.value}
                          htmlFor={`style-${style.value}`}
                          className={`flex cursor-pointer flex-col rounded-lg border p-3 transition-colors ${
                            serviceStyle === style.value
                              ? "border-primary"
                              : "hover:border-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              value={style.value}
                              id={`style-${style.value}`}
                              className="sr-only"
                            />
                            <span className="text-sm font-medium">
                              {style.label}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {style.description}
                          </span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Right: Menu & Contact */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <UtensilsCrossed className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Menu & Contact</h3>
                </div>

                <form className="space-y-4">
                  <div className="space-y-3">
                    <Label>Cuisine Preferences</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {CUISINES.map((cuisine) => (
                        <div
                          key={cuisine.id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox id={cuisine.id} />
                          <Label
                            htmlFor={cuisine.id}
                            className="text-sm font-normal"
                          >
                            {cuisine.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Dietary Accommodations Needed</Label>
                    <div className="space-y-2">
                      {DIETARY_OPTIONS.map((diet) => (
                        <div key={diet.id} className="flex items-center gap-2">
                          <Checkbox id={diet.id} />
                          <Label
                            htmlFor={diet.id}
                            className="text-sm font-normal"
                          >
                            {diet.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Per Person</Label>
                    <Select>
                      <SelectTrigger id="budget">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25-50">$25-50 / person</SelectItem>
                        <SelectItem value="50-75">$50-75 / person</SelectItem>
                        <SelectItem value="75-100">$75-100 / person</SelectItem>
                        <SelectItem value="100-150">
                          $100-150 / person
                        </SelectItem>
                        <SelectItem value="150+">$150+ / person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Rachel Green" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="rachel@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">Additional Details</Label>
                    <Textarea
                      id="details"
                      placeholder="Theme, special requests, must-have dishes, bar service needs..."
                      rows={2}
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox id="tasting" />
                    <Label
                      htmlFor="tasting"
                      className="text-sm font-normal leading-tight"
                    >
                      I'm interested in scheduling a tasting
                    </Label>
                  </div>

                  <div className="rounded-lg border p-3 flex items-center gap-3">
                    <ChefHat className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Minimum 25 guests. Custom menus available for all dietary
                      needs.
                    </p>
                  </div>

                  <Button className="w-full">Request Proposal</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We'll send a detailed proposal within 48 hours.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Clock, FileText, MessageSquare } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const SERVICES = [
  {
    value: "strategy",
    label: "Strategy Session",
    description: "High-level planning and direction",
  },
  {
    value: "review",
    label: "Portfolio Review",
    description: "In-depth analysis of current work",
  },
  {
    value: "coaching",
    label: "1-on-1 Coaching",
    description: "Personalized guidance and feedback",
  },
];

const DURATIONS = [
  { value: "30", label: "30 minutes", price: "Free", badge: "Intro Call" },
  { value: "60", label: "60 minutes", price: "$150", badge: null },
  { value: "90", label: "90 minutes", price: "$200", badge: "Most Popular" },
];

export const title = "React Contact Block Consultation";

export default function ContactConsultation() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Book a Consultation
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Get expert advice tailored to your specific needs.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Service & Duration */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Select Service</h3>
                </div>

                <RadioGroup defaultValue="strategy" className="space-y-3">
                  {SERVICES.map((service) => (
                    <Label
                      key={service.value}
                      htmlFor={`service-${service.value}`}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:border-foreground has-data-[state=checked]:border-primary"
                    >
                      <RadioGroupItem
                        value={service.value}
                        id={`service-${service.value}`}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-medium">{service.label}</span>
                        <p className="text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>

                <Separator className="my-6" />

                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Duration</h3>
                </div>

                <RadioGroup defaultValue="60" className="space-y-3">
                  {DURATIONS.map((duration) => (
                    <Label
                      key={duration.value}
                      htmlFor={`duration-${duration.value}`}
                      className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:border-foreground has-data-[state=checked]:border-primary"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value={duration.value}
                          id={`duration-${duration.value}`}
                        />
                        <span>{duration.label}</span>
                        {duration.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {duration.badge}
                          </Badge>
                        )}
                      </div>
                      <span className="font-semibold">{duration.price}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              {/* Right: Contact & Intake */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Your Information</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="challenge">
                      What challenge are you facing?
                    </Label>
                    <Textarea
                      id="challenge"
                      placeholder="Briefly describe your situation and what you hope to achieve..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tried">
                      What have you tried so far? (Optional)
                    </Label>
                    <Textarea
                      id="tried"
                      placeholder="Any approaches or solutions you've already explored..."
                      rows={2}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-start gap-2">
                    <Checkbox id="reminder" defaultChecked />
                    <Label
                      htmlFor="reminder"
                      className="text-sm font-normal leading-tight"
                    >
                      Send me a reminder 24 hours before
                    </Label>
                  </div>

                  <Button className="w-full">Request Consultation</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We'll confirm your booking within 2 hours.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import {
  Dribbble,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  Ticket,
  Twitter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const DATA = [
  { icon: Phone, info: "+1 (424) 535-3523" },
  { icon: Mail, info: "hello@company.com" },
  { icon: Ticket, info: "Open Support Ticket" },
];

export const title = "React Contact Block Dark";

export default function ContactDark() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            Any questions or remarks? Just write us a message!
          </p>
        </div>

        <Card className="grid gap-0 overflow-hidden lg:grid-cols-2">
          <div className="p-6 lg:p-8">
            <form action="#" className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help..."
                  rows={4}
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </div>

          <div className="flex flex-col justify-between bg-primary p-6 text-primary-foreground lg:p-8">
            <div>
              <h3 className="mb-3 text-xl font-semibold">
                Contact Information
              </h3>
              <p className="mb-8 text-sm text-primary-foreground/80">
                Fill up the form and our team will get back to you within 24
                hours.
              </p>
              <div className="space-y-4">
                {DATA.map(({ icon: Icon, info }, key) => (
                  <div key={key} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-primary-foreground/70" />
                    <span className="text-sm">{info}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
              >
                <Dribbble className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-primary-foreground/40 hover:text-primary-foreground"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { BarChart3, Play, Users, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const USE_CASES = [
  { value: "automation", label: "Workflow Automation", icon: Zap },
  { value: "analytics", label: "Analytics & Reporting", icon: BarChart3 },
  { value: "collaboration", label: "Team Collaboration", icon: Users },
];

const TEAM_SIZES = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "201-500", label: "201-500" },
  { value: "500+", label: "500+" },
];

const TIMELINES = [
  { value: "asap", label: "As soon as possible" },
  { value: "this-week", label: "This week" },
  { value: "this-month", label: "This month" },
  { value: "exploring", label: "Just exploring" },
];

export const title = "React Contact Block Demo";

export default function ContactDemo() {
  const [useCase, setUseCase] = useState<string>("");

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Request a Demo
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            See how we can help your team work smarter.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Use Case & Details */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Play className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">What interests you?</h3>
                </div>

                <RadioGroup
                  value={useCase}
                  onValueChange={setUseCase}
                  className="space-y-3"
                >
                  {USE_CASES.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Label
                        key={item.value}
                        htmlFor={`usecase-${item.value}`}
                        className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors ${
                          useCase === item.value
                            ? "border-primary"
                            : "hover:border-foreground"
                        }`}
                      >
                        <RadioGroupItem
                          value={item.value}
                          id={`usecase-${item.value}`}
                          className="sr-only"
                        />
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{item.label}</span>
                      </Label>
                    );
                  })}
                </RadioGroup>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-size">Team Size</Label>
                    <Select>
                      <SelectTrigger id="team-size">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        {TEAM_SIZES.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label} people
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">
                      When are you looking to start?
                    </Label>
                    <Select>
                      <SelectTrigger id="timeline">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMELINES.map((timeline) => (
                          <SelectItem
                            key={timeline.value}
                            value={timeline.value}
                          >
                            {timeline.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Right: Contact Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Your Information</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" placeholder="Product Manager" />
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-start gap-2">
                    <Checkbox id="updates" />
                    <Label
                      htmlFor="updates"
                      className="text-sm font-normal leading-tight"
                    >
                      Send me product updates and tips
                    </Label>
                  </div>

                  <Button className="w-full">Request Demo</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We'll reach out within 1 business day to schedule your demo.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { AlertTriangle, Clock, Phone, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const PRIORITIES = [
  {
    value: "critical",
    label: "Critical",
    description: "System down, business stopped",
    response: "15 min",
  },
  {
    value: "high",
    label: "High",
    description: "Major impact, needs attention",
    response: "2 hours",
  },
  {
    value: "normal",
    label: "Normal",
    description: "Standard request",
    response: "24 hours",
  },
];

export const title = "React Contact Block Emergency";

export default function ContactEmergency() {
  const [priority, setPriority] = useState<string>("normal");

  const selectedPriority = PRIORITIES.find((p) => p.value === priority);

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Urgent Support
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Need immediate help? Select your priority level below.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Priority Selection */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Priority Level</h3>
                </div>

                <RadioGroup
                  value={priority}
                  onValueChange={setPriority}
                  className="space-y-3"
                >
                  {PRIORITIES.map((item) => (
                    <Label
                      key={item.value}
                      htmlFor={item.value}
                      className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors ${
                        priority === item.value
                          ? "border-primary"
                          : "hover:border-foreground"
                      }`}
                    >
                      <RadioGroupItem
                        value={item.value}
                        id={item.value}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.label}</span>
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="mr-1 h-3 w-3" />
                            {item.response}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>

                <Separator className="my-6" />

                {/* Phone Option for Critical */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Call for Critical Issues</p>
                      <p className="text-sm text-muted-foreground">
                        +1 (555) 911-0000
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Available 24/7 for critical emergencies only
                  </p>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Send className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Describe Your Issue</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief summary of the issue"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the issue, what you've tried, and the impact..."
                      rows={4}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Expected response:</span>
                    <span className="font-medium text-foreground">
                      {selectedPriority?.response}
                    </span>
                  </div>

                  <Button className="w-full">Submit Request</Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { Calendar, MapPin, Ticket, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const TICKETS = [
  {
    value: "early",
    label: "Early Bird",
    price: "$99",
    originalPrice: "$149",
    available: true,
  },
  {
    value: "standard",
    label: "Standard",
    price: "$149",
    originalPrice: null,
    available: true,
  },
  {
    value: "vip",
    label: "VIP Access",
    price: "$299",
    originalPrice: null,
    available: true,
  },
];

const DIETARY = [
  { value: "none", label: "No restrictions" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
];

export const title = "React Contact Block Event";

export default function ContactEvent() {
  const [ticket, setTicket] = useState<string>("standard");

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Register for the Event
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Secure your spot at our upcoming conference.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Event Info & Tickets */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="rounded-lg border p-4 mb-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Design Conference 2025</p>
                      <p className="text-sm text-muted-foreground">
                        March 15-16, 2025 • 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm">Convention Center</p>
                      <p className="text-sm text-muted-foreground">
                        123 Main Street, San Francisco, CA
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Ticket className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Select Ticket</h3>
                </div>

                <RadioGroup
                  value={ticket}
                  onValueChange={setTicket}
                  className="space-y-3"
                >
                  {TICKETS.map((item) => (
                    <Label
                      key={item.value}
                      htmlFor={`ticket-${item.value}`}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                        ticket === item.value
                          ? "border-primary"
                          : "hover:border-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value={item.value}
                          id={`ticket-${item.value}`}
                        />
                        <div>
                          <span className="font-medium">{item.label}</span>
                          {item.value === "vip" && (
                            <p className="text-xs text-muted-foreground">
                              Includes workshop + networking dinner
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">{item.price}</span>
                        {item.originalPrice && (
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            {item.originalPrice}
                          </span>
                        )}
                      </div>
                    </Label>
                  ))}
                </RadioGroup>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">Limited</Badge>
                  <span>Only 23 early bird tickets remaining</span>
                </div>
              </div>

              {/* Right: Attendee Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Attendee Information</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Acme Inc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Job Title</Label>
                      <Input id="job-title" placeholder="Designer" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dietary">Dietary Requirements</Label>
                    <Select>
                      <SelectTrigger id="dietary">
                        <SelectValue placeholder="Select dietary needs" />
                      </SelectTrigger>
                      <SelectContent>
                        {DIETARY.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="special">
                      Special Requirements (Optional)
                    </Label>
                    <Textarea
                      id="special"
                      placeholder="Accessibility needs, allergies, or other requirements..."
                      rows={2}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-start gap-2">
                    <Checkbox id="terms" />
                    <Label
                      htmlFor="terms"
                      className="text-sm font-normal leading-tight"
                    >
                      I agree to the event{" "}
                      <a href="#" className="text-primary hover:underline">
                        terms and conditions
                      </a>
                    </Label>
                  </div>

                  <Button className="w-full">Complete Registration</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    You'll receive a confirmation email with your ticket.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Send } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FAQS = [
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply sign up for an account, complete your profile, and you can begin using our services immediately. We also offer a guided onboarding tour to help you familiarize yourself with all the features.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise accounts. All payments are processed securely through our encrypted payment gateway.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. If you cancel, you'll continue to have access until the end of your current billing period. No cancellation fees apply.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied within the first 30 days, contact our support team for a full refund. Refunds are processed within 5-7 business days.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click the 'Forgot Password' link on the login page, enter your email address, and we'll send you a password reset link. The link expires after 24 hours for security. If you don't receive the email, check your spam folder.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use bank-level encryption (AES-256) for all data storage and SSL/TLS for data transmission. We're SOC 2 certified and GDPR compliant. Your data is backed up daily and stored in multiple secure locations.",
  },
];

export const title = "React Contact Block FAQ";

export default function ContactFaq() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Find answers to common questions below. If you can't find what
            you're looking for, we're here to help.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Card className="mb-10 p-6">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Contact Form */}
        <div className="text-center">
          <h3 className="mb-2 text-xl font-semibold tracking-tight">
            Still need help?
          </h3>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Send us a message.
          </p>

          <Card className="p-6 text-left lg:p-8">
            <form action="#" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your question or issue..."
                  rows={4}
                />
              </div>

              <Button className="w-full gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const RATINGS = [
  { value: "1", emoji: "😠", label: "Very Bad" },
  { value: "2", emoji: "😕", label: "Bad" },
  { value: "3", emoji: "😐", label: "Okay" },
  { value: "4", emoji: "🙂", label: "Good" },
  { value: "5", emoji: "😍", label: "Excellent" },
];

const CATEGORIES = [
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  { value: "usability", label: "Usability" },
  { value: "performance", label: "Performance" },
  { value: "design", label: "Design" },
  { value: "other", label: "Other" },
];

export const title = "React Contact Block Feedback";

export default function ContactFeedback() {
  const [rating, setRating] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Share Your Feedback
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Help us improve by sharing your experience.
          </p>
        </div>

        <Card className="mx-auto max-w-xl">
          <CardContent className="p-6">
            <form className="space-y-6">
              {/* Rating */}
              <div className="space-y-3">
                <Label>How would you rate your experience?</Label>
                <ToggleGroup
                  type="single"
                  value={rating}
                  onValueChange={setRating}
                  className="justify-between"
                >
                  {RATINGS.map((item) => (
                    <ToggleGroupItem
                      key={item.value}
                      value={item.value}
                      className="flex h-14 w-14 flex-col gap-0.5 data-[state=on]:border-primary"
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {item.label}
                      </span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>

              <Separator />

              {/* Categories */}
              <div className="space-y-3">
                <Label>
                  What is your feedback about? (Select all that apply)
                </Label>
                <ToggleGroup
                  type="multiple"
                  value={categories}
                  onValueChange={setCategories}
                  className="flex-wrap justify-start gap-2"
                >
                  {CATEGORIES.map((category) => (
                    <ToggleGroupItem
                      key={category.value}
                      value={category.value}
                      className="rounded-full border px-4 py-1 text-sm data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    >
                      {category.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>

              <Separator />

              {/* Feedback Text */}
              <div className="space-y-2">
                <Label htmlFor="feedback">Tell us more</Label>
                <Textarea
                  id="feedback"
                  placeholder="What did you like? What could be better? Any suggestions?"
                  rows={4}
                />
              </div>

              {/* Optional Contact */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email (Optional)
                  <span className="ml-2 font-normal text-muted-foreground">
                    — if you'd like us to follow up
                  </span>
                </Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>

              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Feedback
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Your feedback helps us build a better product. Thank you!
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import {
  Activity,
  Calendar,
  Dumbbell,
  Flame,
  Heart,
  Target,
  Timer,
  Trophy,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const FITNESS_GOALS = [
  {
    value: "weight-loss",
    label: "Lose Weight",
    icon: Flame,
    metric: "Burn fat",
  },
  {
    value: "muscle",
    label: "Build Muscle",
    icon: Dumbbell,
    metric: "Get stronger",
  },
  {
    value: "endurance",
    label: "Endurance",
    icon: Activity,
    metric: "Last longer",
  },
  { value: "tone", label: "Tone & Define", icon: Target, metric: "Look lean" },
  {
    value: "performance",
    label: "Performance",
    icon: Trophy,
    metric: "Compete",
  },
  {
    value: "wellness",
    label: "General Wellness",
    icon: Heart,
    metric: "Feel great",
  },
];

const EXPERIENCE_LEVELS = [
  {
    value: "beginner",
    label: "Beginner",
    description: "New to exercise or returning after long break",
    sessions: "2-3x/week recommended",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Exercise regularly, know basic movements",
    sessions: "3-4x/week recommended",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Consistent training, ready for intensity",
    sessions: "4-5x/week recommended",
  },
];

const TRAINING_FORMATS = [
  {
    value: "1on1",
    label: "1-on-1 Training",
    price: "$$$",
    description: "100% personalized attention",
  },
  {
    value: "semi",
    label: "Semi-Private (2-4)",
    price: "$$",
    description: "Small group, shared cost",
  },
  {
    value: "group",
    label: "Group Classes",
    price: "$",
    description: "Community & motivation",
  },
  {
    value: "online",
    label: "Online Coaching",
    price: "$$",
    description: "Train anywhere, anytime",
  },
];

const AVAILABILITY = [
  { id: "early", label: "Early Morning (5-7am)", icon: "🌅" },
  { id: "morning", label: "Morning (7-11am)", icon: "☀️" },
  { id: "midday", label: "Midday (11am-2pm)", icon: "🌤️" },
  { id: "afternoon", label: "Afternoon (2-5pm)", icon: "⛅" },
  { id: "evening", label: "Evening (5-8pm)", icon: "🌆" },
  { id: "weekend", label: "Weekends", icon: "📅" },
];

const HEALTH_CONSIDERATIONS = [
  { id: "injury", label: "Current injury or pain" },
  { id: "surgery", label: "Recent surgery" },
  { id: "heart", label: "Heart condition" },
  { id: "pregnant", label: "Pregnant or postpartum" },
  { id: "diabetes", label: "Diabetes" },
  { id: "none", label: "None of the above" },
];

export const title = "React Contact Block Fitness";

export default function ContactFitness() {
  const [goal, setGoal] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [format, setFormat] = useState<string>("1on1");

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <Badge variant="secondary" className="mb-4">
            <Dumbbell className="mr-1 h-3 w-3" />
            Start Your Transformation
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Find Your Perfect Training Program
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're just starting out or ready to level up, we'll build a
            plan that fits your life.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            {/* Goal Selection - Visual Top Section */}
            <div className="border-b p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">What's Your Primary Goal?</h3>
              </div>
              <RadioGroup
                value={goal}
                onValueChange={setGoal}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6"
              >
                {FITNESS_GOALS.map((fg) => {
                  const Icon = fg.icon;
                  return (
                    <Label
                      key={fg.value}
                      htmlFor={`goal-${fg.value}`}
                      className={`flex cursor-pointer flex-col items-center rounded-lg border p-4 text-center transition-all ${
                        goal === fg.value
                          ? "border-primary ring-1 ring-primary"
                          : "hover:border-foreground"
                      }`}
                    >
                      <RadioGroupItem
                        value={fg.value}
                        id={`goal-${fg.value}`}
                        className="sr-only"
                      />
                      <Icon
                        className={`mb-2 h-6 w-6 ${
                          goal === fg.value
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-xs font-medium">{fg.label}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {fg.metric}
                      </span>
                    </Label>
                  );
                })}
              </RadioGroup>
            </div>

            <div className="grid md:grid-cols-2">
              {/* Left: Experience & Format */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Your Fitness Profile</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label>Current Fitness Level</Label>
                    <RadioGroup
                      value={experience}
                      onValueChange={setExperience}
                      className="space-y-2"
                    >
                      {EXPERIENCE_LEVELS.map((level) => (
                        <Label
                          key={level.value}
                          htmlFor={`exp-${level.value}`}
                          className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                            experience === level.value
                              ? "border-primary"
                              : "hover:border-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              value={level.value}
                              id={`exp-${level.value}`}
                            />
                            <div>
                              <span className="text-sm font-medium">
                                {level.label}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                {level.description}
                              </p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {level.sessions}
                          </Badge>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>Preferred Training Format</Label>
                    <RadioGroup
                      value={format}
                      onValueChange={setFormat}
                      className="grid grid-cols-2 gap-2"
                    >
                      {TRAINING_FORMATS.map((tf) => (
                        <Label
                          key={tf.value}
                          htmlFor={`format-${tf.value}`}
                          className={`flex cursor-pointer flex-col rounded-lg border p-3 transition-colors ${
                            format === tf.value
                              ? "border-primary"
                              : "hover:border-foreground"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <RadioGroupItem
                              value={tf.value}
                              id={`format-${tf.value}`}
                              className="sr-only"
                            />
                            <span className="text-sm font-medium">
                              {tf.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {tf.price}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {tf.description}
                          </span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <Label>Health Considerations</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {HEALTH_CONSIDERATIONS.map((health) => (
                        <div
                          key={health.id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox id={health.id} />
                          <Label
                            htmlFor={health.id}
                            className="text-sm font-normal"
                          >
                            {health.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      We'll discuss any considerations during your consultation
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Schedule & Contact */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Availability & Contact</h3>
                </div>

                <form className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <Label>When Can You Train?</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {AVAILABILITY.map((time) => (
                        <div key={time.id} className="flex items-center gap-2">
                          <Checkbox id={time.id} />
                          <Label
                            htmlFor={time.id}
                            className="text-sm font-normal"
                          >
                            <span className="mr-1">{time.icon}</span>
                            {time.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">
                      Desired Training Frequency
                    </Label>
                    <Select>
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Sessions per week" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1x per week</SelectItem>
                        <SelectItem value="2">2x per week</SelectItem>
                        <SelectItem value="3">3x per week</SelectItem>
                        <SelectItem value="4">4x per week</SelectItem>
                        <SelectItem value="5+">5+ per week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">
                      What's Motivating You Right Now?
                    </Label>
                    <Textarea
                      id="motivation"
                      placeholder="An upcoming event, health wake-up call, wanting more energy, ready for a change..."
                      rows={2}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Alex Rivera" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="alex@example.com"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Select>
                        <SelectTrigger id="age">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18-24">18-24</SelectItem>
                          <SelectItem value="25-34">25-34</SelectItem>
                          <SelectItem value="35-44">35-44</SelectItem>
                          <SelectItem value="45-54">45-54</SelectItem>
                          <SelectItem value="55+">55+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Preferred Location</Label>
                      <Select>
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="downtown">
                            Downtown Studio
                          </SelectItem>
                          <SelectItem value="westside">Westside Gym</SelectItem>
                          <SelectItem value="online">Online Only</SelectItem>
                          <SelectItem value="home">At My Home</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        Free Fitness Assessment
                      </span>
                      <Badge>$75 Value</Badge>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Body composition analysis</li>
                      <li>• Movement screening</li>
                      <li>• Goal-setting session</li>
                      <li>• Personalized program recommendation</li>
                    </ul>
                  </div>

                  <Button className="w-full" size="lg">
                    <Flame className="mr-2 h-4 w-4" />
                    Claim Your Free Assessment
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    No commitment required. Let's see if we're the right fit.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { MapPin, Phone, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const title = "React Contact Block Map";

export default function ContactFormMap() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Get in Touch
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Have a question or want to work together? Fill out the form below
            and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="p-6 lg:p-8">
            <h3 className="mb-6 text-xl font-semibold tracking-tight">
              Send us a message
            </h3>
            <form action="#" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  rows={4}
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </Card>

          {/* Map and Contact Info */}
          <div className="space-y-4">
            {/* Map */}
            <Card className="overflow-hidden">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841981670344!2d-73.98823492346652!3d40.75798113481837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office location map"
                />
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      123 Business St, Suite 100
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">contact@company.com</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Building2, CalendarClock, ShieldCheck, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const VISIT_PURPOSES = [
  { value: "meeting", label: "Business Meeting" },
  { value: "interview", label: "Job Interview" },
  { value: "delivery", label: "Delivery / Pickup" },
  { value: "contractor", label: "Contractor Work" },
  { value: "tour", label: "Office Tour" },
  { value: "event", label: "Event / Conference" },
  { value: "other", label: "Other" },
];

const DURATIONS = [
  { value: "1h", label: "Under 1 hour" },
  { value: "half-day", label: "Half day (up to 4 hours)" },
  { value: "full-day", label: "Full day" },
  { value: "multi-day", label: "Multiple days" },
];

const ID_TYPES = [
  { value: "drivers", label: "Driver's License" },
  { value: "passport", label: "Passport" },
  { value: "state-id", label: "State ID" },
  { value: "employee", label: "Employee Badge (other company)" },
];

const HOSTS = [
  { value: "sarah-chen", label: "Sarah Chen", department: "Engineering" },
  { value: "michael-ross", label: "Michael Ross", department: "Sales" },
  { value: "emily-wang", label: "Emily Wang", department: "HR" },
  { value: "david-kim", label: "David Kim", department: "Operations" },
  { value: "other", label: "Other (specify below)", department: null },
];

export const title = "React Contact Block Guest";

export default function ContactGuest() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Visitor Pre-Registration
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Register your visit in advance for a faster check-in experience.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Visitor Info */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Visitor Information</h3>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Jennifer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Martinez" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company / Organization</Label>
                    <Input id="company" placeholder="Acme Partners" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jennifer@acme.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="id-type">ID Type (for check-in)</Label>
                    </div>
                    <Select>
                      <SelectTrigger id="id-type">
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ID_TYPES.map((id) => (
                          <SelectItem key={id.value} value={id.value}>
                            {id.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Please bring valid photo ID for verification at reception
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Will you need parking?</Label>
                    <RadioGroup defaultValue="no" className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="parking-yes" />
                        <Label htmlFor="parking-yes" className="font-normal">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="parking-no" />
                        <Label htmlFor="parking-no" className="font-normal">
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Right: Visit Details */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CalendarClock className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Visit Details</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="visit-date">Visit Date</Label>
                      <Input id="visit-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="arrival-time">Expected Arrival</Label>
                      <Input id="arrival-time" type="time" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Expected Duration</Label>
                    <Select>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="How long will you be here?" />
                      </SelectTrigger>
                      <SelectContent>
                        {DURATIONS.map((dur) => (
                          <SelectItem key={dur.value} value={dur.value}>
                            {dur.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose of Visit</Label>
                    <Select>
                      <SelectTrigger id="purpose">
                        <SelectValue placeholder="Why are you visiting?" />
                      </SelectTrigger>
                      <SelectContent>
                        {VISIT_PURPOSES.map((purpose) => (
                          <SelectItem key={purpose.value} value={purpose.value}>
                            {purpose.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="host">Who are you visiting?</Label>
                    <Select>
                      <SelectTrigger id="host">
                        <SelectValue placeholder="Select your host" />
                      </SelectTrigger>
                      <SelectContent>
                        {HOSTS.map((host) => (
                          <SelectItem key={host.value} value={host.value}>
                            <span>{host.label}</span>
                            {host.department && (
                              <span className="text-muted-foreground ml-2">
                                ({host.department})
                              </span>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Equipment you're bringing, accessibility needs, or other details..."
                      rows={2}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Checkbox id="nda" />
                      <Label
                        htmlFor="nda"
                        className="text-sm font-normal leading-tight"
                      >
                        I agree to sign an NDA upon arrival if required
                      </Label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox id="policies" defaultChecked />
                      <Label
                        htmlFor="policies"
                        className="text-sm font-normal leading-tight"
                      >
                        I agree to follow building security policies
                      </Label>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3 flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Your host will be notified and a badge will be ready at
                      reception
                    </p>
                  </div>

                  <Button className="w-full">Complete Registration</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    You'll receive a confirmation email with check-in
                    instructions.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const title = "React Contact Block Image";

export default function ContactImage() {
  return (
    <section className="grid min-h-[600px] w-full grid-cols-1 md:grid-cols-2">
      <div className="flex items-center p-6 sm:p-10 lg:p-12">
        <div className="w-full max-w-md">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">Contact us</h2>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            Whether you have questions or you would just like to say hello,
            contact us.
          </p>
          <form action="#" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us how we can help..."
                rows={4}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="privacy-policy" />
              <Label
                htmlFor="privacy-policy"
                className="cursor-pointer text-sm font-normal"
              >
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>
            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1658246944389-9e9ac0a85dda?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1064"
          alt="Contact"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import {
  Car,
  CircleDollarSign,
  Home,
  Shield,
  ShieldCheck,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

const COVERAGE_TYPES = [
  {
    value: "auto",
    label: "Auto Insurance",
    icon: Car,
    description: "Vehicles & drivers",
  },
  {
    value: "home",
    label: "Home Insurance",
    icon: Home,
    description: "Property & contents",
  },
  {
    value: "life",
    label: "Life Insurance",
    icon: User,
    description: "Family protection",
  },
  {
    value: "bundle",
    label: "Bundle & Save",
    icon: Shield,
    description: "Multiple policies",
  },
];

const DEDUCTIBLES = [
  { value: "250", label: "$250", premium: "Higher premium" },
  { value: "500", label: "$500", premium: "Standard" },
  { value: "1000", label: "$1,000", premium: "Lower premium" },
  { value: "2500", label: "$2,500", premium: "Lowest premium" },
];

const AUTO_DISCOUNTS = [
  { id: "multi-car", label: "Multiple vehicles" },
  { id: "good-driver", label: "Clean driving record (3+ years)" },
  { id: "safety", label: "Anti-theft / Safety features" },
  { id: "low-mileage", label: "Low annual mileage (<7,500)" },
];

const HOME_DISCOUNTS = [
  { id: "security", label: "Security system installed" },
  { id: "new-roof", label: "Roof replaced in last 10 years" },
  { id: "claims-free", label: "Claims-free (5+ years)" },
  { id: "smart-home", label: "Smart home devices" },
];

export const title = "React Contact Block Insurance";

export default function ContactInsurance() {
  const [coverageType, setCoverageType] = useState<string>("auto");
  const [coverageAmount, setCoverageAmount] = useState([250000]);
  const [deductible, setDeductible] = useState<string>("500");

  const formatCoverage = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const discounts = coverageType === "home" ? HOME_DISCOUNTS : AUTO_DISCOUNTS;

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <Badge className="mb-4">
            <ShieldCheck className="mr-1 h-3 w-3" />
            Free Quote in Minutes
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Get Your Insurance Quote
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Compare rates and find the coverage that fits your life and budget.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            {/* Coverage Type Selection - Top Bar */}
            <div className="border-b p-4">
              <RadioGroup
                value={coverageType}
                onValueChange={setCoverageType}
                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {COVERAGE_TYPES.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Label
                      key={type.value}
                      htmlFor={`type-${type.value}`}
                      className={`flex cursor-pointer flex-col items-center rounded-lg border p-4 text-center transition-colors ${
                        coverageType === type.value
                          ? "border-primary"
                          : "hover:border-foreground"
                      }`}
                    >
                      <RadioGroupItem
                        value={type.value}
                        id={`type-${type.value}`}
                        className="sr-only"
                      />
                      <Icon
                        className={`mb-2 h-6 w-6 ${
                          coverageType === type.value
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-sm font-medium">{type.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {type.description}
                      </span>
                    </Label>
                  );
                })}
              </RadioGroup>
            </div>

            <div className="grid md:grid-cols-2">
              {/* Left: Policy Details */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Coverage Details</h3>
                </div>

                <div className="space-y-6">
                  {coverageType === "auto" && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="vehicle-year">Vehicle Year</Label>
                          <Select>
                            <SelectTrigger id="vehicle-year">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from(
                                { length: 15 },
                                (_, i) => 2024 - i
                              ).map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vehicle-make">Make</Label>
                          <Select>
                            <SelectTrigger id="vehicle-make">
                              <SelectValue placeholder="Select make" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="toyota">Toyota</SelectItem>
                              <SelectItem value="honda">Honda</SelectItem>
                              <SelectItem value="ford">Ford</SelectItem>
                              <SelectItem value="chevrolet">
                                Chevrolet
                              </SelectItem>
                              <SelectItem value="bmw">BMW</SelectItem>
                              <SelectItem value="mercedes">
                                Mercedes-Benz
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicle-model">Model</Label>
                        <Input
                          id="vehicle-model"
                          placeholder="e.g., Camry, Civic, F-150"
                        />
                      </div>
                    </>
                  )}

                  {coverageType === "home" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="address">Property Address</Label>
                        <Input
                          id="address"
                          placeholder="123 Main Street, City, State ZIP"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="year-built">Year Built</Label>
                          <Input
                            id="year-built"
                            type="number"
                            placeholder="e.g., 1995"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sqft">Square Footage</Label>
                          <Input
                            id="sqft"
                            type="number"
                            placeholder="e.g., 2,400"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {coverageType === "life" && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input id="dob" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender</Label>
                          <Select>
                            <SelectTrigger id="gender">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label>Tobacco Use</Label>
                        <RadioGroup defaultValue="no" className="flex gap-4">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="no" id="tobacco-no" />
                            <Label htmlFor="tobacco-no" className="font-normal">
                              Non-smoker
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="yes" id="tobacco-yes" />
                            <Label
                              htmlFor="tobacco-yes"
                              className="font-normal"
                            >
                              Smoker
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </>
                  )}

                  {coverageType === "bundle" && (
                    <div className="space-y-3">
                      <Label>Policies to Bundle</Label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="bundle-auto" defaultChecked />
                          <Label htmlFor="bundle-auto" className="font-normal">
                            Auto Insurance
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="bundle-home" defaultChecked />
                          <Label htmlFor="bundle-home" className="font-normal">
                            Home Insurance
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="bundle-life" />
                          <Label htmlFor="bundle-life" className="font-normal">
                            Life Insurance
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="bundle-umbrella" />
                          <Label
                            htmlFor="bundle-umbrella"
                            className="font-normal"
                          >
                            Umbrella Policy
                          </Label>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Bundle 2+ policies and save up to 25%
                      </p>
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Coverage Amount</Label>
                      <span className="text-lg font-semibold">
                        {formatCoverage(coverageAmount[0])}
                      </span>
                    </div>
                    <Slider
                      value={coverageAmount}
                      onValueChange={setCoverageAmount}
                      min={50000}
                      max={1000000}
                      step={25000}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$50K</span>
                      <span>$1M</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Deductible</Label>
                    <RadioGroup
                      value={deductible}
                      onValueChange={setDeductible}
                      className="grid grid-cols-2 gap-2"
                    >
                      {DEDUCTIBLES.map((ded) => (
                        <Label
                          key={ded.value}
                          htmlFor={`ded-${ded.value}`}
                          className={`flex cursor-pointer flex-col rounded-lg border p-3 transition-colors ${
                            deductible === ded.value
                              ? "border-primary"
                              : "hover:border-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              value={ded.value}
                              id={`ded-${ded.value}`}
                              className="sr-only"
                            />
                            <span className="text-sm font-medium">
                              {ded.label}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {ded.premium}
                          </span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Right: Discounts & Contact */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Discounts & Contact</h3>
                </div>

                <form className="space-y-4">
                  <div className="space-y-3">
                    <Label>Available Discounts</Label>
                    <div className="space-y-2">
                      {discounts.map((discount) => (
                        <div
                          key={discount.id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox id={discount.id} />
                          <Label
                            htmlFor={discount.id}
                            className="text-sm font-normal"
                          >
                            {discount.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Check all that apply to maximize your savings
                    </p>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Michael" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Thompson" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="michael@example.com"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="90210" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current-provider">
                      Current Insurance Provider
                    </Label>
                    <Select>
                      <SelectTrigger id="current-provider">
                        <SelectValue placeholder="Select provider (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          No current coverage
                        </SelectItem>
                        <SelectItem value="state-farm">State Farm</SelectItem>
                        <SelectItem value="geico">GEICO</SelectItem>
                        <SelectItem value="progressive">Progressive</SelectItem>
                        <SelectItem value="allstate">Allstate</SelectItem>
                        <SelectItem value="liberty">Liberty Mutual</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox id="consent" defaultChecked />
                    <Label
                      htmlFor="consent"
                      className="text-sm font-normal leading-tight"
                    >
                      I agree to receive my quote and policy information via
                      email and phone
                    </Label>
                  </div>

                  <div className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Estimated Savings</span>
                      <Badge>Up to $480/yr</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Average savings when switching to us with eligible
                      discounts
                    </p>
                  </div>

                  <Button className="w-full" size="lg">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Get My Free Quote
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    No obligation. Your information is secure and never shared.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Briefcase, Calendar, Clock, Globe, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const ROLES = [
  { value: "frontend", label: "Frontend Developer" },
  { value: "backend", label: "Backend Developer" },
  { value: "fullstack", label: "Full Stack Developer" },
  { value: "designer", label: "Product Designer" },
  { value: "pm", label: "Product Manager" },
  { value: "other", label: "Other" },
];

const INTERVIEW_TYPES = [
  { value: "phone", label: "Phone Screen", duration: "30 min" },
  { value: "technical", label: "Technical Interview", duration: "60 min" },
  { value: "behavioral", label: "Behavioral Interview", duration: "45 min" },
  { value: "final", label: "Final Round", duration: "90 min" },
];

const FORMATS = [
  { value: "video", label: "Video Call", icon: Video },
  { value: "phone", label: "Phone Call", icon: null },
  { value: "onsite", label: "On-site", icon: null },
];

const TIMEZONES = [
  { value: "pst", label: "Pacific Time (PT)" },
  { value: "mst", label: "Mountain Time (MT)" },
  { value: "cst", label: "Central Time (CT)" },
  { value: "est", label: "Eastern Time (ET)" },
  { value: "utc", label: "UTC" },
  { value: "other", label: "Other" },
];

const TIME_SLOTS = [
  { id: "morning", label: "Morning (9am - 12pm)" },
  { id: "afternoon", label: "Afternoon (12pm - 5pm)" },
  { id: "evening", label: "Evening (5pm - 7pm)" },
];

export const title = "React Contact Block Interview";

export default function ContactInterview() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <Badge className="mb-4">Next Step</Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Schedule Your Interview
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Select your availability and we'll confirm your interview time.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Interview Details */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Interview Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Position</Label>
                    <Select>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Confirm your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Interview Type</Label>
                    <div className="space-y-2">
                      {INTERVIEW_TYPES.map((type) => (
                        <label
                          key={type.value}
                          className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:border-foreground has-checked:border-primary"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="interview-type"
                              value={type.value}
                              className="h-4 w-4 accent-primary"
                            />
                            <span className="text-sm font-medium">
                              {type.label}
                            </span>
                          </div>
                          <Badge variant="secondary">{type.duration}</Badge>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <Label>Preferred Format</Label>
                    <RadioGroup defaultValue="video" className="flex gap-2">
                      {FORMATS.map((format) => (
                        <Label
                          key={format.value}
                          htmlFor={`format-${format.value}`}
                          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border p-3 transition-colors hover:border-foreground has-data-[state=checked]:border-primary"
                        >
                          <RadioGroupItem
                            value={format.value}
                            id={`format-${format.value}`}
                            className="sr-only"
                          />
                          <span className="text-sm">{format.label}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Right: Availability */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Your Availability</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date-1">Preferred Date</Label>
                      <Input id="date-1" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-2">Alternate Date</Label>
                      <Input id="date-2" type="date" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Label>Available Times (select all that apply)</Label>
                    </div>
                    <div className="space-y-2">
                      {TIME_SLOTS.map((slot) => (
                        <div key={slot.id} className="flex items-center gap-3">
                          <Checkbox id={slot.id} />
                          <Label htmlFor={slot.id} className="font-normal">
                            {slot.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="timezone">Your Timezone</Label>
                    </div>
                    <Select>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMEZONES.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Jordan Lee" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jordan@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accommodations">
                      Accommodation Requests (Optional)
                    </Label>
                    <Textarea
                      id="accommodations"
                      placeholder="Let us know if you need any accommodations such as sign language interpreter, extended time, or accessibility requirements..."
                      rows={2}
                    />
                  </div>

                  <Button className="w-full">Submit Availability</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We'll send a calendar invite within 24 hours confirming your
                    interview.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const LOCATIONS = [
  {
    city: "New York",
    country: "United States",
    isHQ: true,
    address: "123 Broadway, Suite 100, New York, NY 10001",
    phone: "+1 (212) 555-0100",
    email: "newyork@company.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM EST",
    mapUrl: "https://maps.google.com",
  },
  {
    city: "London",
    country: "United Kingdom",
    isHQ: false,
    address: "45 King Street, London, WC2E 8JH",
    phone: "+44 20 7123 4567",
    email: "london@company.com",
    hours: "Mon-Fri: 9:00 AM - 5:30 PM GMT",
    mapUrl: "https://maps.google.com",
  },
  {
    city: "Singapore",
    country: "Singapore",
    isHQ: false,
    address: "1 Raffles Place, #20-01, Singapore 048616",
    phone: "+65 6123 4567",
    email: "singapore@company.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM SGT",
    mapUrl: "https://maps.google.com",
  },
  {
    city: "San Francisco",
    country: "United States",
    isHQ: false,
    address: "100 Market Street, San Francisco, CA 94105",
    phone: "+1 (415) 555-0200",
    email: "sanfrancisco@company.com",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM PST",
    mapUrl: "https://maps.google.com",
  },
];

export const title = "React Contact Block Locations";

export default function ContactLocations() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Our Global Offices
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We have offices around the world to better serve you. Reach out to
            your nearest location.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {LOCATIONS.map((location) => (
            <Card key={location.city} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{location.city}</h3>
                  <p className="text-sm text-muted-foreground">
                    {location.country}
                  </p>
                </div>
                {location.isHQ && <Badge>Headquarters</Badge>}
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <p className="text-sm">{location.address}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <a
                    href={`tel:${location.phone}`}
                    className="text-sm hover:underline"
                  >
                    {location.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <a
                    href={`mailto:${location.email}`}
                    className="text-sm hover:underline"
                  >
                    {location.email}
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {location.hours}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* General Contact */}
        <Card className="mt-10 p-8">
          <div className="text-center">
            <h3 className="mb-2 text-xl font-semibold tracking-tight">
              Can't find your location?
            </h3>
            <p className="text-muted-foreground mb-6">
              Contact our main office and we'll direct you to the right team
              member for your region.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button className="gap-2">
                <Mail className="h-4 w-4" />
                Contact Us
              </Button>
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                +1 (800) 123-4567
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { AlertTriangle, Calendar, Home, Upload, Wrench } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = [
  {
    value: "plumbing",
    label: "Plumbing",
    description: "Leaks, clogs, water heater",
  },
  {
    value: "electrical",
    label: "Electrical",
    description: "Outlets, lighting, breakers",
  },
  {
    value: "hvac",
    label: "HVAC",
    description: "Heating, cooling, ventilation",
  },
  {
    value: "appliance",
    label: "Appliances",
    description: "Fridge, stove, dishwasher",
  },
  {
    value: "structural",
    label: "Structural",
    description: "Doors, windows, walls",
  },
  { value: "pest", label: "Pest Control", description: "Insects, rodents" },
  { value: "other", label: "Other", description: "General repairs" },
];

const URGENCY = [
  {
    value: "emergency",
    label: "Emergency",
    description: "Safety hazard, flooding, no heat",
    badge: "Immediate",
  },
  {
    value: "urgent",
    label: "Urgent",
    description: "Major inconvenience, need quick fix",
    badge: "24 hours",
  },
  {
    value: "routine",
    label: "Routine",
    description: "Non-urgent repair needed",
    badge: "3-5 days",
  },
];

const AVAILABILITY = [
  { value: "anytime", label: "Any weekday (9am-5pm)" },
  { value: "morning", label: "Mornings only (9am-12pm)" },
  { value: "afternoon", label: "Afternoons only (12pm-5pm)" },
  { value: "weekend", label: "Weekends only" },
];

export const title = "React Contact Block Maintenance";

export default function ContactMaintenance() {
  const [urgency, setUrgency] = useState<string>("routine");
  const [photos, setPhotos] = useState<File[]>([]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Maintenance Request
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Report an issue and we'll get it fixed as soon as possible.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Issue Details */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Wrench className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Issue Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">What type of issue?</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <div>
                              <span>{cat.label}</span>
                              <span className="text-muted-foreground ml-2 text-xs">
                                {cat.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location in unit</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Master bathroom, Kitchen"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Describe the problem</Label>
                    <Textarea
                      id="description"
                      placeholder="Please provide details: What's happening? When did it start? Is it getting worse?"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <Label>How urgent is this?</Label>
                    </div>
                    <RadioGroup
                      value={urgency}
                      onValueChange={setUrgency}
                      className="space-y-2"
                    >
                      {URGENCY.map((level) => (
                        <Label
                          key={level.value}
                          htmlFor={`urgency-${level.value}`}
                          className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                            urgency === level.value
                              ? "border-primary"
                              : "hover:border-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              value={level.value}
                              id={`urgency-${level.value}`}
                            />
                            <div>
                              <span className="text-sm font-medium">
                                {level.label}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                {level.description}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              level.value === "emergency"
                                ? "destructive"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {level.badge}
                          </Badge>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Photos (Optional but helpful)</Label>
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed p-4 transition-colors hover:border-foreground">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {photos.length > 0
                          ? `${photos.length} photo(s) selected`
                          : "Upload photos of the issue"}
                      </span>
                      <Input
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Right: Access & Contact */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Home className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Access & Scheduling</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit Number</Label>
                      <Input id="unit" placeholder="e.g., 4B, 201" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="building">Building (if applicable)</Label>
                      <Input id="building" placeholder="e.g., North Tower" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="availability">
                        When can we access your unit?
                      </Label>
                    </div>
                    <Select>
                      <SelectTrigger id="availability">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABILITY.map((slot) => (
                          <SelectItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Entry Permission</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="enter" />
                        <Label htmlFor="enter" className="text-sm font-normal">
                          Permission to enter if I'm not home
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="pet" />
                        <Label htmlFor="pet" className="text-sm font-normal">
                          I have pets in the unit
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="access-notes">
                      Access Instructions (Optional)
                    </Label>
                    <Textarea
                      id="access-notes"
                      placeholder="Gate code, parking instructions, pet details, or anything else the technician should know..."
                      rows={2}
                    />
                  </div>

                  {urgency === "emergency" && (
                    <div className="rounded-lg border border-destructive p-3">
                      <p className="text-sm text-destructive font-medium">
                        For life-threatening emergencies, call 911 first.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        After-hours emergencies: (555) 123-4567
                      </p>
                    </div>
                  )}

                  <Button className="w-full">Submit Request</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    You'll receive a confirmation with your work order number.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const title = "React Contact Block Minimal";

export default function ContactMinimal() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-md px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">Let's Talk</h2>
          <p className="text-muted-foreground leading-relaxed">
            Send us a message and we'll get back to you within 24 hours.
          </p>
        </div>

        <form action="#" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your full name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell us what's on your mind..."
              rows={4}
            />
          </div>

          <Button className="w-full gap-2">
            <Send className="h-4 w-4" />
            Send Message
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          By submitting this form, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import {
  ArrowRight,
  Box,
  Calendar,
  Home,
  MapPin,
  Package,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

const HOME_SIZES = [
  { value: "studio", label: "Studio", rooms: "1 room", estimate: "1-2 hours" },
  {
    value: "1bed",
    label: "1 Bedroom",
    rooms: "2-3 rooms",
    estimate: "2-3 hours",
  },
  {
    value: "2bed",
    label: "2 Bedroom",
    rooms: "4-5 rooms",
    estimate: "3-5 hours",
  },
  {
    value: "3bed",
    label: "3 Bedroom",
    rooms: "6-7 rooms",
    estimate: "5-7 hours",
  },
  {
    value: "4bed",
    label: "4+ Bedroom",
    rooms: "8+ rooms",
    estimate: "7+ hours",
  },
  {
    value: "office",
    label: "Office/Commercial",
    rooms: "Varies",
    estimate: "Custom quote",
  },
];

const SERVICE_LEVELS = [
  {
    value: "labor",
    label: "Labor Only",
    description: "You pack, we load & move",
    price: "$$",
  },
  {
    value: "basic",
    label: "Basic Move",
    description: "Load, transport, unload",
    price: "$$$",
  },
  {
    value: "full",
    label: "Full Service",
    description: "We pack & move everything",
    price: "$$$$",
    badge: "Most Popular",
  },
  {
    value: "white-glove",
    label: "White Glove",
    description: "Full service + unpacking",
    price: "$$$$$",
  },
];

const SPECIAL_ITEMS = [
  { id: "piano", label: "Piano / Organ" },
  { id: "pool-table", label: "Pool Table" },
  { id: "safe", label: "Heavy Safe (500+ lbs)" },
  { id: "antiques", label: "Antiques / Fine Art" },
  { id: "gym", label: "Gym Equipment" },
  { id: "hot-tub", label: "Hot Tub / Spa" },
];

const ADDITIONAL_SERVICES = [
  { id: "packing", label: "Packing materials included" },
  { id: "storage", label: "Temporary storage needed" },
  { id: "cleaning", label: "Move-out cleaning" },
  { id: "disposal", label: "Furniture disposal / Donation" },
];

export const title = "React Contact Block Moving";

export default function ContactMoving() {
  const [serviceLevel, setServiceLevel] = useState<string>("full");
  const [rooms, setRooms] = useState([5]);

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <Badge variant="secondary" className="mb-4">
            <Truck className="mr-1 h-3 w-3" />
            Free Estimates
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Get Your Moving Quote
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Professional movers you can trust. Tell us about your move and get a
            free estimate.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            {/* Address Bar - Top Section */}
            <div className="border-b p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">Moving From & To</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr,auto,1fr]">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin Address</Label>
                  <Input
                    id="origin"
                    placeholder="123 Current Street, City, State ZIP"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Floor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ground">Ground Floor</SelectItem>
                        <SelectItem value="1">1st Floor</SelectItem>
                        <SelectItem value="2">2nd Floor</SelectItem>
                        <SelectItem value="3">3rd Floor</SelectItem>
                        <SelectItem value="4+">4th Floor+</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Elevator?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Has Elevator</SelectItem>
                        <SelectItem value="no">No Elevator</SelectItem>
                        <SelectItem value="na">N/A (House)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="rounded-full border p-2">
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Destination Address</Label>
                  <Input
                    id="destination"
                    placeholder="456 New Avenue, City, State ZIP"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Floor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ground">Ground Floor</SelectItem>
                        <SelectItem value="1">1st Floor</SelectItem>
                        <SelectItem value="2">2nd Floor</SelectItem>
                        <SelectItem value="3">3rd Floor</SelectItem>
                        <SelectItem value="4+">4th Floor+</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Elevator?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Has Elevator</SelectItem>
                        <SelectItem value="no">No Elevator</SelectItem>
                        <SelectItem value="na">N/A (House)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2">
              {/* Left: Move Details */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Home className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Move Size & Service</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="home-size">Home Size</Label>
                    <Select>
                      <SelectTrigger id="home-size">
                        <SelectValue placeholder="Select home size" />
                      </SelectTrigger>
                      <SelectContent>
                        {HOME_SIZES.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            <div className="flex items-center justify-between w-full">
                              <span>{size.label}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {size.rooms}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Box className="h-4 w-4 text-muted-foreground" />
                        <Label>Estimated Rooms / Areas</Label>
                      </div>
                      <span className="text-lg font-semibold">{rooms[0]}</span>
                    </div>
                    <Slider
                      value={rooms}
                      onValueChange={setRooms}
                      min={1}
                      max={15}
                      step={1}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 room</span>
                      <span>15 rooms</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>Service Level</Label>
                    <RadioGroup
                      value={serviceLevel}
                      onValueChange={setServiceLevel}
                      className="space-y-2"
                    >
                      {SERVICE_LEVELS.map((level) => (
                        <Label
                          key={level.value}
                          htmlFor={`level-${level.value}`}
                          className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                            serviceLevel === level.value
                              ? "border-primary"
                              : "hover:border-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              value={level.value}
                              id={`level-${level.value}`}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  {level.label}
                                </span>
                                {level.badge && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {level.badge}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {level.description}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {level.price}
                          </span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Special Items (check all that apply)</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {SPECIAL_ITEMS.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <Checkbox id={item.id} />
                          <Label
                            htmlFor={item.id}
                            className="text-sm font-normal"
                          >
                            {item.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Schedule & Contact */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Schedule & Contact</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="move-date">Preferred Move Date</Label>
                      <Input id="move-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="flexibility">Date Flexibility</Label>
                      <Select>
                        <SelectTrigger id="flexibility">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="exact">Exact date only</SelectItem>
                          <SelectItem value="1-2">± 1-2 days</SelectItem>
                          <SelectItem value="week">± 1 week</SelectItem>
                          <SelectItem value="flexible">
                            Very flexible
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Additional Services</Label>
                    <div className="space-y-2">
                      {ADDITIONAL_SERVICES.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox id={service.id} />
                          <Label
                            htmlFor={service.id}
                            className="text-sm font-normal"
                          >
                            {service.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Instructions</Label>
                    <Textarea
                      id="notes"
                      placeholder="Narrow stairways, parking restrictions, items requiring special care, flexible timing preferences..."
                      rows={2}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="David Chen" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="david@example.com"
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox id="survey" />
                    <Label
                      htmlFor="survey"
                      className="text-sm font-normal leading-tight"
                    >
                      I'd like a free virtual or in-home survey for a more
                      accurate quote
                    </Label>
                  </div>

                  <div className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          Licensed & Insured
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Full value protection available on all moves
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Truck className="mr-2 h-4 w-4" />
                    Get Free Quote
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    No obligation. Quote delivered within 2 hours during
                    business hours.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const STEPS = [
  { number: 1, title: "Contact Information" },
  { number: 2, title: "Project Details" },
  { number: 3, title: "Review & Submit" },
];

export const title = "React Contact Block Multistep";

export default function ContactMultistep() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-2xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Request a Quote
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Fill out the form below and we'll get back to you with a detailed
            quote.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Progress Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">
                  {STEPS[currentStep - 1].title}
                </h3>
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of {STEPS.length}
                </span>
              </div>
              <Progress
                value={(currentStep / STEPS.length) * 100}
                className="h-1"
              />
            </div>

            <form action="#" className="space-y-4">
              {/* Step 1: Contact Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name (Optional)</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="service">Service</Label>
                      <Select>
                        <SelectTrigger id="service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="development">
                            Development
                          </SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select>
                        <SelectTrigger id="budget">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<5k">Less than $5,000</SelectItem>
                          <SelectItem value="5k-10k">
                            $5,000 - $10,000
                          </SelectItem>
                          <SelectItem value="10k-25k">
                            $10,000 - $25,000
                          </SelectItem>
                          <SelectItem value="25k+">$25,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <Select>
                      <SelectTrigger id="timeline">
                        <SelectValue placeholder="When do you need this?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="1month">Within 1 month</SelectItem>
                        <SelectItem value="3months">Within 3 months</SelectItem>
                        <SelectItem value="6months">Within 6 months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="details">Project Details</Label>
                    <Textarea
                      id="details"
                      placeholder="Tell us about your project..."
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-4 rounded-lg border p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Contact Information
                      </p>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm">john@example.com</p>
                      <p className="text-sm">+1 (555) 000-0000</p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm text-muted-foreground">
                        Project Details
                      </p>
                      <p className="font-medium">Service: Consulting</p>
                      <p className="text-sm">Budget: $10,000 - $25,000</p>
                      <p className="text-sm">Timeline: Within 3 months</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    By submitting this form, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-2">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Previous
                  </Button>
                ) : (
                  <div />
                )}
                {currentStep < STEPS.length ? (
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Submit Request</Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { Building2, Handshake, Globe, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const PARTNERSHIP_TYPES = [
  { value: "integration", label: "Integration", icon: Globe },
  { value: "reseller", label: "Reseller", icon: Building2 },
  { value: "affiliate", label: "Affiliate", icon: Users },
  { value: "co-marketing", label: "Co-Marketing", icon: Handshake },
];

const COMPANY_SIZES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-1000", label: "201-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

const INDUSTRIES = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "retail", label: "Retail" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

export const title = "React Contact Block Partnership";

export default function ContactPartnership() {
  const [partnerType, setPartnerType] = useState<string>("");

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Become a Partner
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Let's explore how we can grow together.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Partnership Details */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Handshake className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Partnership Type</h3>
                </div>

                <RadioGroup
                  value={partnerType}
                  onValueChange={setPartnerType}
                  className="grid grid-cols-2 gap-3"
                >
                  {PARTNERSHIP_TYPES.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Label
                        key={type.value}
                        htmlFor={type.value}
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors ${
                          partnerType === type.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "hover:border-foreground"
                        }`}
                      >
                        <RadioGroupItem
                          value={type.value}
                          id={type.value}
                          className="sr-only"
                        />
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          {type.label}
                        </span>
                      </Label>
                    );
                  })}
                </RadioGroup>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="size">Company Size</Label>
                      <Select>
                        <SelectTrigger id="size">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMPANY_SIZES.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select>
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((industry) => (
                            <SelectItem
                              key={industry.value}
                              value={industry.value}
                            >
                              {industry.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Contact Info & Proposal */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Your Details</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input id="title" placeholder="Head of Partnerships" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proposal">Partnership Proposal</Label>
                    <Textarea
                      id="proposal"
                      placeholder="Tell us about your partnership idea, mutual benefits, and what you'd like to achieve together..."
                      rows={5}
                    />
                  </div>

                  <Separator className="my-4" />

                  <Button className="w-full">Submit Partnership Inquiry</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Our partnerships team will review and respond within 48
                    hours.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { Calendar, Camera, Clock, Image, MapPin, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const SHOOT_TYPES = [
  { value: "portrait", label: "Portrait / Headshot" },
  { value: "family", label: "Family Session" },
  { value: "couple", label: "Couples / Engagement" },
  { value: "maternity", label: "Maternity / Newborn" },
  { value: "event", label: "Event Coverage" },
  { value: "product", label: "Product / Commercial" },
  { value: "real-estate", label: "Real Estate / Interiors" },
  { value: "other", label: "Other (specify)" },
];

const PACKAGES = [
  {
    value: "mini",
    label: "Mini Session",
    duration: "30 min",
    images: "10 edited",
    price: "$195",
  },
  {
    value: "standard",
    label: "Standard",
    duration: "1 hour",
    images: "25 edited",
    price: "$350",
    badge: "Popular",
  },
  {
    value: "premium",
    label: "Premium",
    duration: "2 hours",
    images: "50 edited",
    price: "$595",
  },
  {
    value: "luxury",
    label: "Luxury",
    duration: "4 hours",
    images: "100+ edited",
    price: "$995",
  },
];

const LOCATIONS = [
  {
    value: "studio",
    label: "In-Studio",
    description: "Professional lighting & backdrops",
  },
  {
    value: "outdoor",
    label: "Outdoor Location",
    description: "Parks, urban, or beach",
  },
  {
    value: "client",
    label: "Your Location",
    description: "Home, office, or venue",
  },
  {
    value: "destination",
    label: "Destination",
    description: "Travel available",
  },
];

const ADDONS = [
  { id: "hair-makeup", label: "Hair & Makeup Artist (+$150)" },
  { id: "outfit-change", label: "Additional Outfit Change (+$75)" },
  { id: "rush-edit", label: "Rush Editing - 48hr (+$100)" },
  { id: "prints", label: "Print Package - 8x10s & 5x7s (+$125)" },
  { id: "digital-all", label: "All Digital Files (+$200)" },
];

export const title = "React Contact Block Photography";

export default function ContactPhotography() {
  const [selectedPackage, setSelectedPackage] = useState<string>("standard");
  const [location, setLocation] = useState<string>("studio");

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <Badge variant="secondary" className="mb-4">
            <Camera className="mr-1 h-3 w-3" />
            Book Your Session
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Photography Booking
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Let's create stunning images together. Tell us about your vision.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Session Details */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Image className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Session Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shoot-type">Type of Shoot</Label>
                    <Select>
                      <SelectTrigger id="shoot-type">
                        <SelectValue placeholder="What are we capturing?" />
                      </SelectTrigger>
                      <SelectContent>
                        {SHOOT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Package</Label>
                    <RadioGroup
                      value={selectedPackage}
                      onValueChange={setSelectedPackage}
                      className="space-y-2"
                    >
                      {PACKAGES.map((pkg) => (
                        <Label
                          key={pkg.value}
                          htmlFor={`pkg-${pkg.value}`}
                          className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                            selectedPackage === pkg.value
                              ? "border-primary"
                              : "hover:border-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              value={pkg.value}
                              id={`pkg-${pkg.value}`}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  {pkg.label}
                                </span>
                                {pkg.badge && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {pkg.badge}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {pkg.duration} • {pkg.images}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold">{pkg.price}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Location Preference</h3>
                  </div>

                  <RadioGroup
                    value={location}
                    onValueChange={setLocation}
                    className="grid grid-cols-2 gap-2"
                  >
                    {LOCATIONS.map((loc) => (
                      <Label
                        key={loc.value}
                        htmlFor={`loc-${loc.value}`}
                        className={`flex cursor-pointer flex-col rounded-lg border p-3 transition-colors ${
                          location === loc.value
                            ? "border-primary"
                            : "hover:border-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value={loc.value}
                            id={`loc-${loc.value}`}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">
                            {loc.label}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {loc.description}
                        </span>
                      </Label>
                    ))}
                  </RadioGroup>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">
                            Morning (8-11am)
                          </SelectItem>
                          <SelectItem value="midday">
                            Midday (11am-2pm)
                          </SelectItem>
                          <SelectItem value="afternoon">
                            Afternoon (2-5pm)
                          </SelectItem>
                          <SelectItem value="golden">
                            Golden Hour (5-7pm)
                          </SelectItem>
                          <SelectItem value="flexible">I'm Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Add-ons & Contact */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Customize & Contact</h3>
                </div>

                <form className="space-y-4">
                  <div className="space-y-3">
                    <Label>Session Add-ons (Optional)</Label>
                    <div className="space-y-2">
                      {ADDONS.map((addon) => (
                        <div key={addon.id} className="flex items-center gap-2">
                          <Checkbox id={addon.id} />
                          <Label
                            htmlFor={addon.id}
                            className="text-sm font-normal"
                          >
                            {addon.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="people">Number of People</Label>
                    <Select>
                      <SelectTrigger id="people">
                        <SelectValue placeholder="How many in the shoot?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Just me (1 person)</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3-5">3-5 people</SelectItem>
                        <SelectItem value="6-10">6-10 people</SelectItem>
                        <SelectItem value="10+">10+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vision">Your Vision & Ideas</Label>
                    <Textarea
                      id="vision"
                      placeholder="Describe the mood, style, or any inspiration—Pinterest boards, wardrobe ideas, props you're bringing..."
                      rows={3}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Sophia Martinez" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="sophia@example.com"
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox id="newsletter" />
                    <Label
                      htmlFor="newsletter"
                      className="text-sm font-normal leading-tight"
                    >
                      Send me mini session announcements and exclusive offers
                    </Label>
                  </div>

                  <div className="rounded-lg border p-3 flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      50% retainer to book. Balance due before session.
                    </p>
                  </div>

                  <Button className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Request Session
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We'll confirm availability within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Download, FileText, Mail, Newspaper } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const STORY_TYPES = [
  { value: "company-news", label: "Company News" },
  { value: "product-launch", label: "Product Launch" },
  { value: "executive-interview", label: "Executive Interview" },
  { value: "industry-commentary", label: "Industry Commentary" },
  { value: "research-data", label: "Research & Data" },
  { value: "event-coverage", label: "Event Coverage" },
];

const DEADLINES = [
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "this-week", label: "This Week" },
  { value: "next-week", label: "Next Week" },
  { value: "flexible", label: "Flexible" },
];

export const title = "React Contact Block Press";

export default function ContactPress() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Press Inquiries
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            For media and press requests, please fill out the form below.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Press Form */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Newspaper className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Media Request</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Jane Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@publication.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="publication">Publication</Label>
                      <Input id="publication" placeholder="TechCrunch" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Your Role</Label>
                      <Input id="role" placeholder="Senior Reporter" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="story-type">Story Type</Label>
                      <Select>
                        <SelectTrigger id="story-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {STORY_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline</Label>
                      <Select>
                        <SelectTrigger id="deadline">
                          <SelectValue placeholder="Select deadline" />
                        </SelectTrigger>
                        <SelectContent>
                          {DEADLINES.map((deadline) => (
                            <SelectItem
                              key={deadline.value}
                              value={deadline.value}
                            >
                              {deadline.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiry">Inquiry Details</Label>
                    <Textarea
                      id="inquiry"
                      placeholder="Please describe your story angle, questions, and any specific information you need..."
                      rows={4}
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox id="photographer" />
                    <Label
                      htmlFor="photographer"
                      className="text-sm font-normal leading-tight"
                    >
                      I need high-resolution images or video assets
                    </Label>
                  </div>

                  <Button className="w-full">Submit Press Request</Button>
                </form>
              </div>

              {/* Right: Press Resources */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Press Resources</h3>
                </div>

                <div className="space-y-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Download our press kit for logos, executive bios, product
                    screenshots, and company information.
                  </p>

                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download Press Kit
                  </Button>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Media Contact</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>press@company.com</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Response Time</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We aim to respond to all press inquiries within 4 business
                      hours. For urgent requests, please indicate your deadline.
                    </p>
                  </div>

                  <Separator />

                  <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Note:</span>{" "}
                      This form is for verified journalists and media
                      professionals only. For general inquiries, please use our{" "}
                      <a href="#" className="text-primary hover:underline">
                        contact form
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { Briefcase, Calendar, DollarSign, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

const PROJECT_TYPES = [
  { value: "website", label: "Website" },
  { value: "webapp", label: "Web Application" },
  { value: "mobile", label: "Mobile App" },
  { value: "branding", label: "Branding" },
  { value: "other", label: "Other" },
];

const TIMELINES = [
  { value: "asap", label: "ASAP" },
  { value: "1-2months", label: "1-2 months" },
  { value: "3-6months", label: "3-6 months" },
  { value: "flexible", label: "Flexible" },
];

export const title = "React Contact Block Quote";

export default function ContactQuote() {
  const [budget, setBudget] = useState([15000]);
  const [projectType, setProjectType] = useState<string>("");

  const formatBudget = (value: number) => {
    if (value >= 50000) return "$50,000+";
    return `$${value.toLocaleString()}`;
  };

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Request a Quote
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Tell us about your project and we'll provide a custom estimate.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Project Details */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Project Details</h3>
                </div>

                <div className="space-y-6">
                  {/* Project Type */}
                  <div className="space-y-3">
                    <Label>What do you need?</Label>
                    <RadioGroup
                      value={projectType}
                      onValueChange={setProjectType}
                      className="grid grid-cols-2 gap-2"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <Label
                          key={type.value}
                          htmlFor={type.value}
                          className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm transition-colors ${
                            projectType === type.value
                              ? "border-primary bg-primary text-primary-foreground"
                              : "hover:border-foreground"
                          }`}
                        >
                          <RadioGroupItem
                            value={type.value}
                            id={type.value}
                            className="sr-only"
                          />
                          {type.label}
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Budget Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        Budget
                      </Label>
                      <span className="text-sm font-medium">
                        {formatBudget(budget[0])}
                      </span>
                    </div>
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      min={1000}
                      max={50000}
                      step={1000}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$1,000</span>
                      <span>$50,000+</span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="timeline"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Timeline
                    </Label>
                    <Select>
                      <SelectTrigger id="timeline">
                        <SelectValue placeholder="When do you need this?" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMELINES.map((timeline) => (
                          <SelectItem
                            key={timeline.value}
                            value={timeline.value}
                          >
                            {timeline.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project, goals, and any specific requirements..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Right: Contact Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Send className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Contact Information</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://example.com"
                    />
                  </div>

                  <Separator className="my-4" />

                  <Button className="w-full">Get Your Quote</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We typically respond within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Gift, Mail, User, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const RELATIONSHIPS = [
  { value: "colleague", label: "Colleague" },
  { value: "friend", label: "Friend" },
  { value: "industry-peer", label: "Industry Peer" },
  { value: "client", label: "Client" },
  { value: "other", label: "Other" },
];

const INTERESTS = [
  { value: "product", label: "Interested in our product" },
  { value: "solution", label: "Looking for a solution like ours" },
  { value: "conversation", label: "Open to a conversation" },
];

export const title = "React Contact Block Referral";

export default function ContactReferral() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Refer a Friend
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Know someone who would benefit from our product? Share the love.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Referral Details */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Who are you referring?</h3>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="referee-first">Their First Name</Label>
                      <Input id="referee-first" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="referee-last">Their Last Name</Label>
                      <Input id="referee-last" placeholder="Smith" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referee-email">Their Email</Label>
                    <Input
                      id="referee-email"
                      type="email"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referee-company">Their Company</Label>
                    <Input id="referee-company" placeholder="Acme Inc." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relationship">Your Relationship</Label>
                    <Select>
                      <SelectTrigger id="relationship">
                        <SelectValue placeholder="How do you know them?" />
                      </SelectTrigger>
                      <SelectContent>
                        {RELATIONSHIPS.map((rel) => (
                          <SelectItem key={rel.value} value={rel.value}>
                            {rel.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Their Interest Level</Label>
                    <RadioGroup defaultValue="solution" className="space-y-2">
                      {INTERESTS.map((interest) => (
                        <div
                          key={interest.value}
                          className="flex items-center gap-3"
                        >
                          <RadioGroupItem
                            value={interest.value}
                            id={interest.value}
                          />
                          <Label
                            htmlFor={interest.value}
                            className="font-normal"
                          >
                            {interest.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Right: Your Info & Message */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Your Information</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="your-name">Your Name</Label>
                      <Input id="your-name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="your-email">Your Email</Label>
                      <Input
                        id="your-email"
                        type="email"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Personal Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Add a note we can include when reaching out to your referral..."
                      rows={3}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Earn $50 credit</p>
                        <p className="text-sm text-muted-foreground">
                          You'll both get $50 credit when they sign up
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Submit Referral
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We'll reach out to your referral within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { AlertTriangle, Bug, FileText, Monitor, Upload, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = [
  { value: "bug", label: "Bug / Something Broken" },
  { value: "ui", label: "UI / Visual Issue" },
  { value: "performance", label: "Performance / Slow" },
  { value: "crash", label: "Crash / Error" },
  { value: "security", label: "Security Concern" },
  { value: "feature", label: "Feature Request" },
  { value: "other", label: "Other" },
];

const SEVERITY = [
  {
    value: "critical",
    label: "Critical",
    description: "System unusable, data loss",
    color: "destructive",
  },
  {
    value: "high",
    label: "High",
    description: "Major feature broken",
    color: "default",
  },
  {
    value: "medium",
    label: "Medium",
    description: "Workaround available",
    color: "secondary",
  },
  {
    value: "low",
    label: "Low",
    description: "Minor / Cosmetic",
    color: "outline",
  },
];

const BROWSERS = [
  { value: "chrome", label: "Chrome" },
  { value: "firefox", label: "Firefox" },
  { value: "safari", label: "Safari" },
  { value: "edge", label: "Edge" },
  { value: "other", label: "Other" },
];

const OS = [
  { value: "windows", label: "Windows" },
  { value: "macos", label: "macOS" },
  { value: "linux", label: "Linux" },
  { value: "ios", label: "iOS" },
  { value: "android", label: "Android" },
];

export const title = "React Contact Block Report";

export default function ContactReport() {
  const [files, setFiles] = useState<File[]>([]);
  const [severity, setSeverity] = useState<string>("medium");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Report an Issue
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Help us improve by reporting bugs or requesting features.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Issue Details */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Bug className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Issue Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="What type of issue?" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Issue Title</Label>
                    <Input
                      id="title"
                      placeholder="Brief description of the problem"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <Label>Severity</Label>
                    </div>
                    <RadioGroup
                      value={severity}
                      onValueChange={setSeverity}
                      className="grid grid-cols-2 gap-2"
                    >
                      {SEVERITY.map((level) => (
                        <Label
                          key={level.value}
                          htmlFor={`severity-${level.value}`}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                            severity === level.value
                              ? "border-primary"
                              : "hover:border-foreground"
                          }`}
                        >
                          <RadioGroupItem
                            value={level.value}
                            id={`severity-${level.value}`}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {level.label}
                              </span>
                              {level.value === "critical" && (
                                <Badge
                                  variant="destructive"
                                  className="text-[10px]"
                                >
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {level.description}
                            </p>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">What happened?</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what you were doing and what went wrong..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="steps">Steps to reproduce</Label>
                    <Textarea
                      id="steps"
                      placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Right: Environment & Contact */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Environment</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="browser">Browser</Label>
                      <Select>
                        <SelectTrigger id="browser">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {BROWSERS.map((browser) => (
                            <SelectItem
                              key={browser.value}
                              value={browser.value}
                            >
                              {browser.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="os">Operating System</Label>
                      <Select>
                        <SelectTrigger id="os">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {OS.map((os) => (
                            <SelectItem key={os.value} value={os.value}>
                              {os.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url">Page URL (if applicable)</Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://app.example.com/page"
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <Label>Attachments</Label>
                    {files.length > 0 && (
                      <div className="space-y-2 mb-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border p-2"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm truncate max-w-[180px]">
                                {file.name}
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => removeFile(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed p-4 transition-colors hover:border-foreground">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Upload screenshots or files
                      </span>
                      <Input
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*,.pdf,.txt,.log"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account">
                        Account/User ID (Optional)
                      </Label>
                      <Input id="account" placeholder="user_123" />
                    </div>
                  </div>

                  <Button className="w-full">
                    <Bug className="mr-2 h-4 w-4" />
                    Submit Report
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    You'll receive a ticket number via email for tracking.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Clock, PartyPopper, Utensils, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const PARTY_SIZES = [
  { value: "1", label: "1 guest" },
  { value: "2", label: "2 guests" },
  { value: "3", label: "3 guests" },
  { value: "4", label: "4 guests" },
  { value: "5", label: "5 guests" },
  { value: "6", label: "6 guests" },
  { value: "7+", label: "7+ guests (call us)" },
];

const TIME_SLOTS = [
  { value: "17:00", label: "5:00 PM" },
  { value: "17:30", label: "5:30 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "18:30", label: "6:30 PM" },
  { value: "19:00", label: "7:00 PM", badge: "Popular" },
  { value: "19:30", label: "7:30 PM", badge: "Popular" },
  { value: "20:00", label: "8:00 PM" },
  { value: "20:30", label: "8:30 PM" },
  { value: "21:00", label: "9:00 PM" },
];

const OCCASIONS = [
  { id: "birthday", label: "Birthday" },
  { id: "anniversary", label: "Anniversary" },
  { id: "date", label: "Date Night" },
  { id: "business", label: "Business Meal" },
  { id: "celebration", label: "Celebration" },
];

const SEATING = [
  { value: "any", label: "No Preference" },
  { value: "indoor", label: "Indoor" },
  { value: "outdoor", label: "Outdoor/Patio" },
  { value: "bar", label: "Bar Area" },
  { value: "private", label: "Private Dining" },
];

export const title = "React Contact Block Reservation";

export default function ContactReservation() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Make a Reservation
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Reserve your table and we'll have everything ready for you.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Date, Time & Party */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Utensils className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Reservation Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="party-size">Party Size</Label>
                      <Select>
                        <SelectTrigger id="party-size">
                          <SelectValue placeholder="Guests" />
                        </SelectTrigger>
                        <SelectContent>
                          {PARTY_SIZES.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Label>Preferred Time</Label>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <label
                          key={slot.value}
                          className="relative flex cursor-pointer items-center justify-center rounded-md border p-2 text-sm transition-colors hover:border-foreground has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground"
                        >
                          <input
                            type="radio"
                            name="time"
                            value={slot.value}
                            className="sr-only"
                          />
                          {slot.label}
                          {slot.badge && (
                            <span className="absolute -top-2 -right-2">
                              <Badge
                                variant="secondary"
                                className="text-[10px] px-1"
                              >
                                {slot.badge}
                              </Badge>
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seating">Seating Preference</Label>
                    <Select>
                      <SelectTrigger id="seating">
                        <SelectValue placeholder="Select seating area" />
                      </SelectTrigger>
                      <SelectContent>
                        {SEATING.map((seat) => (
                          <SelectItem key={seat.value} value={seat.value}>
                            {seat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <PartyPopper className="h-4 w-4 text-muted-foreground" />
                      <Label>Special Occasion? (Optional)</Label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {OCCASIONS.map((occasion) => (
                        <label
                          key={occasion.id}
                          className="flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors hover:border-foreground has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground"
                        >
                          <input
                            type="checkbox"
                            id={occasion.id}
                            className="sr-only"
                          />
                          {occasion.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Guest Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Guest Information</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Maria" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Garcia" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="maria@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requests">
                      Special Requests or Dietary Needs
                    </Label>
                    <Textarea
                      id="requests"
                      placeholder="Allergies, dietary restrictions, highchair needed, accessibility requirements..."
                      rows={2}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-start gap-2">
                    <Checkbox id="sms" defaultChecked />
                    <Label
                      htmlFor="sms"
                      className="text-sm font-normal leading-tight"
                    >
                      Send me SMS reminders about my reservation
                    </Label>
                  </div>

                  <div className="rounded-lg border p-3">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Note:</span>{" "}
                      We hold tables for 15 minutes past reservation time.
                    </p>
                  </div>

                  <Button className="w-full">Complete Reservation</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    You'll receive instant confirmation via email and SMS.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { Bed, Calendar, Leaf, MapPin, Users, Utensils } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const ACCOMMODATIONS = [
  {
    value: "shared-dorm",
    label: "Shared Dormitory",
    price: "$850",
    description: "4-6 people, shared bath",
  },
  {
    value: "shared-room",
    label: "Shared Room",
    price: "$1,100",
    description: "2 people, private bath",
  },
  {
    value: "private",
    label: "Private Room",
    price: "$1,450",
    description: "Queen bed, private bath",
    badge: "Popular",
  },
  {
    value: "premium",
    label: "Premium Suite",
    price: "$1,950",
    description: "King bed, ocean view",
    badge: null,
  },
];

const SESSIONS = [
  { id: "morning-yoga", label: "Morning Yoga & Meditation" },
  { id: "breathwork", label: "Breathwork Journey" },
  { id: "sound-healing", label: "Sound Healing Circle" },
  { id: "nature-walk", label: "Guided Nature Walk" },
  { id: "workshop", label: "Personal Growth Workshop" },
  { id: "massage", label: "Spa & Massage (additional fee)" },
];

const DIETARY = [
  { value: "none", label: "No restrictions" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "dairy-free", label: "Dairy-free" },
  { value: "other", label: "Other (specify)" },
];

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner - New to this" },
  { value: "some", label: "Some Experience" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced Practitioner" },
];

export const title = "React Contact Block Retreat";

export default function ContactRetreat() {
  const [accommodation, setAccommodation] = useState<string>("private");

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <Badge className="mb-4">
            <Leaf className="mr-1 h-3 w-3" />
            Limited Spots
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Wellness Retreat Registration
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Join us for a transformative 5-day journey of renewal and
            self-discovery.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            {/* Event Info Banner */}
            <div className="border-b p-4">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>June 15-20, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Serenity Mountain Resort, Colorado</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>24 spots remaining</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2">
              {/* Left: Accommodation & Sessions */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Accommodation</h3>
                </div>

                <RadioGroup
                  value={accommodation}
                  onValueChange={setAccommodation}
                  className="space-y-3"
                >
                  {ACCOMMODATIONS.map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={`acc-${option.value}`}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                        accommodation === option.value
                          ? "border-primary"
                          : "hover:border-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value={option.value}
                          id={`acc-${option.value}`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{option.label}</span>
                            {option.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {option.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">{option.price}</span>
                    </Label>
                  ))}
                </RadioGroup>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label>Sessions of Interest (select all that apply)</Label>
                    <div className="space-y-2">
                      {SESSIONS.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            id={session.id}
                            defaultChecked={session.id !== "massage"}
                          />
                          <Label
                            htmlFor={session.id}
                            className="text-sm font-normal"
                          >
                            {session.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select>
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPERIENCE_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Right: Personal Info & Dietary */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Your Information</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Maya" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Patel" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="maya@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency">
                      Emergency Contact Name & Phone
                    </Label>
                    <Input
                      id="emergency"
                      placeholder="John Doe, +1 (555) 123-4567"
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-2 mb-4">
                    <Utensils className="h-4 w-4 text-muted-foreground" />
                    <Label>Dietary Requirements</Label>
                  </div>

                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select dietary preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {DIETARY.map((diet) => (
                          <SelectItem key={diet.value} value={diet.value}>
                            {diet.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">
                      Allergies or Special Needs
                    </Label>
                    <Textarea
                      id="allergies"
                      placeholder="Food allergies, mobility needs, or anything we should know to support you..."
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="intention">
                      What brings you to this retreat? (Optional)
                    </Label>
                    <Textarea
                      id="intention"
                      placeholder="Share your intentions or what you hope to experience..."
                      rows={2}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-start gap-2">
                    <Checkbox id="terms" />
                    <Label
                      htmlFor="terms"
                      className="text-sm font-normal leading-tight"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        retreat guidelines
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        cancellation policy
                      </a>
                    </Label>
                  </div>

                  <div className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Early Bird Pricing</span>
                      <Badge>Save $200</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      $500 deposit reserves your spot. Balance due 30 days
                      before retreat.
                    </p>
                  </div>

                  <Button className="w-full">Reserve My Spot</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Questions? Email us at retreats@example.com
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { Calendar, Heart, Music, Users, Utensils } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const MEALS = [
  { value: "beef", label: "Filet Mignon" },
  { value: "chicken", label: "Herb Roasted Chicken" },
  { value: "fish", label: "Pan-Seared Salmon" },
  { value: "vegetarian", label: "Vegetarian Risotto" },
  { value: "vegan", label: "Vegan Option" },
];

const GUEST_COUNTS = [
  { value: "1", label: "Just me" },
  { value: "2", label: "2 guests" },
  { value: "3", label: "3 guests" },
  { value: "4", label: "4 guests" },
];

export const title = "React Contact Block RSVP";

export default function ContactRSVP() {
  const [attending, setAttending] = useState<string>("");
  const [guestCount, setGuestCount] = useState<string>("1");

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-xl px-4">
        <div className="mb-10 text-center">
          <Badge variant="secondary" className="mb-4">
            <Heart className="mr-1 h-3 w-3" />
            You're Invited
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Sarah & Michael's Wedding
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Saturday, June 21, 2025 • The Grand Estate
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="rounded-lg border p-4 mb-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  Please respond by May 15, 2025
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ceremony at 4:00 PM • Reception to follow
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base">Will you be attending?</Label>
                <RadioGroup
                  value={attending}
                  onValueChange={setAttending}
                  className="grid grid-cols-2 gap-3"
                >
                  <Label
                    htmlFor="attending-yes"
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-4 transition-colors ${
                      attending === "yes"
                        ? "border-primary bg-primary/5"
                        : "hover:border-foreground"
                    }`}
                  >
                    <RadioGroupItem
                      value="yes"
                      id="attending-yes"
                      className="sr-only"
                    />
                    <span className="text-2xl mb-1">🎉</span>
                    <span className="font-medium">Joyfully Accept</span>
                  </Label>
                  <Label
                    htmlFor="attending-no"
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border p-4 transition-colors ${
                      attending === "no"
                        ? "border-primary bg-primary/5"
                        : "hover:border-foreground"
                    }`}
                  >
                    <RadioGroupItem
                      value="no"
                      id="attending-no"
                      className="sr-only"
                    />
                    <span className="text-2xl mb-1">😢</span>
                    <span className="font-medium">Regretfully Decline</span>
                  </Label>
                </RadioGroup>
              </div>

              {attending === "yes" && (
                <>
                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="As it appears on your invitation"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="guests">Number of Guests</Label>
                      </div>
                      <Select value={guestCount} onValueChange={setGuestCount}>
                        <SelectTrigger id="guests">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {GUEST_COUNTS.map((count) => (
                            <SelectItem key={count.value} value={count.value}>
                              {count.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {parseInt(guestCount) > 1 && (
                      <div className="space-y-2">
                        <Label>Guest Names</Label>
                        <div className="space-y-2">
                          {Array.from({ length: parseInt(guestCount) - 1 }).map(
                            (_, i) => (
                              <Input
                                key={i}
                                placeholder={`Guest ${i + 2} name`}
                              />
                            )
                          )}
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Utensils className="h-4 w-4 text-muted-foreground" />
                        <Label>Meal Selection</Label>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="meal-1"
                          className="text-sm text-muted-foreground"
                        >
                          Your meal choice
                        </Label>
                        <Select>
                          <SelectTrigger id="meal-1">
                            <SelectValue placeholder="Select entrée" />
                          </SelectTrigger>
                          <SelectContent>
                            {MEALS.map((meal) => (
                              <SelectItem key={meal.value} value={meal.value}>
                                {meal.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {parseInt(guestCount) > 1 && (
                        <div className="space-y-2">
                          {Array.from({ length: parseInt(guestCount) - 1 }).map(
                            (_, i) => (
                              <Select key={i}>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={`Guest ${i + 2} entrée`}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {MEALS.map((meal) => (
                                    <SelectItem
                                      key={meal.value}
                                      value={meal.value}
                                    >
                                      {meal.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dietary">
                        Dietary Restrictions or Allergies
                      </Label>
                      <Textarea
                        id="dietary"
                        placeholder="Please let us know of any allergies or dietary requirements..."
                        rows={2}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Music className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="song">Song Request (Optional)</Label>
                      </div>
                      <Input
                        id="song"
                        placeholder="What song will get you on the dance floor?"
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox id="photos" defaultChecked />
                      <Label
                        htmlFor="photos"
                        className="text-sm font-normal leading-tight"
                      >
                        I consent to being photographed and appearing in wedding
                        photos
                      </Label>
                    </div>
                  </div>
                </>
              )}

              {attending === "no" && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="decline-name">Your Name</Label>
                      <Input
                        id="decline-name"
                        placeholder="So we know who responded"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Send a Message (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Share your well wishes with the couple..."
                        rows={3}
                      />
                    </div>
                  </div>
                </>
              )}

              <Button className="w-full" disabled={!attending}>
                {attending === "yes"
                  ? "Confirm Attendance"
                  : attending === "no"
                  ? "Send Response"
                  : "Submit RSVP"}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Questions? Contact us at wedding@example.com
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Building2, Users, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const title = "React Contact Block Sales";

export default function ContactSales() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Talk to Sales
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Tell us about your needs and we'll help you find the right solution.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <Card>
            <CardContent className="p-6">
              <form action="#" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company-size">Company Size</Label>
                    <Select>
                      <SelectTrigger id="company-size">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-1000">
                          201-1000 employees
                        </SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select>
                      <SelectTrigger id="budget">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<5k">Less than $5,000</SelectItem>
                        <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                        <SelectItem value="15k-50k">
                          $15,000 - $50,000
                        </SelectItem>
                        <SelectItem value="50k+">$50,000+</SelectItem>
                        <SelectItem value="unsure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">How can we help?</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project or goals..."
                    rows={4}
                  />
                </div>

                <Button className="w-full">Contact Sales</Button>

                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Info Panel */}
          <div className="lg:pt-4">
            <h3 className="text-2xl font-semibold tracking-tight">
              Let's find the right solution for you
            </h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Our sales team will work with you to understand your needs and
              recommend the best plan for your business.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex gap-3">
                <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium">Quick response</p>
                  <p className="text-sm text-muted-foreground">
                    We'll get back to you within 24 hours
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium">Dedicated support</p>
                  <p className="text-sm text-muted-foreground">
                    A rep assigned to your account
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium">Custom demo</p>
                  <p className="text-sm text-muted-foreground">
                    Tailored to your specific needs
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { Clock, Video } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const DAYS = [
  { day: "Mon", date: "16", full: "Monday, December 16", available: true },
  { day: "Tue", date: "17", full: "Tuesday, December 17", available: true },
  { day: "Wed", date: "18", full: "Wednesday, December 18", available: true },
  { day: "Thu", date: "19", full: "Thursday, December 19", available: false },
  { day: "Fri", date: "20", full: "Friday, December 20", available: true },
];

const TIME_SLOTS = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: false },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: true },
];

export const title = "React Contact Block Schedule";

export default function ContactSchedule() {
  const [selectedDay, setSelectedDay] = useState<string | null>("16");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedDayData = DAYS.find((d) => d.date === selectedDay);

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Schedule a Meeting
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Pick a time that works for you.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-5">
              {/* Left: Meeting Info */}
              <div className="border-b p-6 md:col-span-2 md:border-b-0 md:border-r">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-muted-foreground">
                      Product Demo
                    </p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>30 minutes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <span>Google Meet</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <p className="text-sm text-muted-foreground leading-relaxed">
                  A quick intro call to learn about your needs and show you how
                  we can help.
                </p>
              </div>

              {/* Right: Date & Time Selection */}
              <div className="p-6 md:col-span-3">
                {/* Day Selection */}
                <div className="mb-6">
                  <p className="mb-3 text-sm font-medium">December 2024</p>
                  <div className="grid grid-cols-5 gap-2">
                    {DAYS.map((day) => (
                      <button
                        key={day.date}
                        onClick={() =>
                          day.available && setSelectedDay(day.date)
                        }
                        disabled={!day.available}
                        className={`rounded-lg border py-3 text-center transition-colors ${
                          selectedDay === day.date
                            ? "border-primary bg-primary text-primary-foreground"
                            : day.available
                            ? "hover:border-foreground"
                            : "cursor-not-allowed opacity-40"
                        }`}
                      >
                        <span className="block text-xs">{day.day}</span>
                        <span className="block text-lg font-semibold">
                          {day.date}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="mb-6">
                  <p className="mb-3 text-sm font-medium">
                    {selectedDayData?.full}
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() =>
                          slot.available && setSelectedTime(slot.time)
                        }
                        disabled={!slot.available}
                        className={`rounded-lg border py-2 text-sm transition-colors ${
                          selectedTime === slot.time
                            ? "border-primary bg-primary text-primary-foreground"
                            : slot.available
                            ? "hover:border-foreground"
                            : "cursor-not-allowed opacity-40"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Contact Form */}
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    disabled={!selectedDay || !selectedTime}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { Megaphone, TrendingUp, Users, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const PACKAGES = [
  {
    value: "starter",
    label: "Starter",
    price: "$500",
    description: "Logo placement + mention",
  },
  {
    value: "growth",
    label: "Growth",
    price: "$1,500",
    description: "Dedicated segment + social",
    badge: "Popular",
  },
  {
    value: "premium",
    label: "Premium",
    price: "$3,500",
    description: "Multi-episode + custom content",
  },
  {
    value: "custom",
    label: "Custom",
    price: "Contact Us",
    description: "Tailored partnership",
  },
];

const GOALS = [
  { value: "awareness", label: "Brand Awareness" },
  { value: "leads", label: "Lead Generation" },
  { value: "sales", label: "Direct Sales" },
  { value: "launch", label: "Product Launch" },
];

const DURATIONS = [
  { value: "single", label: "Single Campaign" },
  { value: "monthly", label: "Monthly (3+ months)" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annual", label: "Annual Partnership" },
];

export const title = "React Contact Block Sponsorship";

export default function ContactSponsorship() {
  const [selectedPackage, setSelectedPackage] = useState<string>("growth");

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Become a Sponsor
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Partner with us to reach an engaged audience of 50K+ subscribers.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Audience & Packages */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="rounded-lg border p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Audience Reach</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">50K+</p>
                      <p className="text-xs text-muted-foreground">
                        Subscribers
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">120K</p>
                      <p className="text-xs text-muted-foreground">
                        Monthly Views
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">8.5%</p>
                      <p className="text-xs text-muted-foreground">
                        Engagement
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Megaphone className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Sponsorship Package</h3>
                </div>

                <RadioGroup
                  value={selectedPackage}
                  onValueChange={setSelectedPackage}
                  className="space-y-3"
                >
                  {PACKAGES.map((pkg) => (
                    <Label
                      key={pkg.value}
                      htmlFor={`pkg-${pkg.value}`}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                        selectedPackage === pkg.value
                          ? "border-primary"
                          : "hover:border-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem
                          value={pkg.value}
                          id={`pkg-${pkg.value}`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{pkg.label}</span>
                            {pkg.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {pkg.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {pkg.description}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">{pkg.price}</span>
                    </Label>
                  ))}
                </RadioGroup>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Campaign Goal</Label>
                    <Select>
                      <SelectTrigger id="goal">
                        <SelectValue placeholder="What's your primary goal?" />
                      </SelectTrigger>
                      <SelectContent>
                        {GOALS.map((goal) => (
                          <SelectItem key={goal.value} value={goal.value}>
                            {goal.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Partnership Duration</Label>
                    <Select>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {DURATIONS.map((duration) => (
                          <SelectItem
                            key={duration.value}
                            value={duration.value}
                          >
                            {duration.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Right: Company Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Company Information</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Contact Name</Label>
                      <Input id="name" placeholder="Sarah Johnson" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input id="title" placeholder="Marketing Manager" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="sarah@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Company Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Tell us about your product/campaign
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="What would you like to promote? Any specific messaging or requirements?"
                      rows={3}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="rounded-lg border p-3 flex items-center gap-3">
                    <Zap className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Most sponsors see 3-5x ROI on their campaigns
                    </p>
                  </div>

                  <Button className="w-full">Request Sponsorship Info</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We'll send our full media kit within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { MessageCircle, Mail, Phone, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export const title = "React Contact Block Support";

export default function ContactSupport() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            How can we help?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Send us a message or use one of our other support channels.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 font-semibold">Send a message</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                We'll respond within 24 hours.
              </p>
              <form action="#" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue..."
                    rows={4}
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          {/* Other Support Options */}
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 font-semibold">Other ways to get help</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Choose the option that works best for you.
              </p>

              <div className="space-y-4">
                <button className="flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors hover:bg-muted/50">
                  <MessageCircle className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">
                      Chat with our team in real-time
                    </p>
                  </div>
                </button>

                <button className="flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors hover:bg-muted/50">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </button>

                <button className="flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-colors hover:bg-muted/50">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">Help Center</p>
                    <p className="text-sm text-muted-foreground">
                      Browse articles and guides
                    </p>
                  </div>
                </button>

                <Separator />

                <div className="flex items-center gap-4 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    support@company.com
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Building, Calendar, Home, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const LEASE_TERMS = [
  { value: "6", label: "6 months" },
  { value: "12", label: "12 months" },
  { value: "18", label: "18 months" },
  { value: "24", label: "24 months" },
  { value: "flexible", label: "Flexible" },
];

const OCCUPANTS = [
  { value: "1", label: "1 person" },
  { value: "2", label: "2 people" },
  { value: "3", label: "3 people" },
  { value: "4", label: "4 people" },
  { value: "5+", label: "5+ people" },
];

const INCOME_RANGES = [
  { value: "under-3x", label: "Under 3x rent" },
  { value: "3x-4x", label: "3x - 4x rent" },
  { value: "4x-5x", label: "4x - 5x rent" },
  { value: "5x+", label: "5x+ rent" },
];

const EMPLOYMENT = [
  { value: "employed", label: "Employed Full-Time" },
  { value: "part-time", label: "Employed Part-Time" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "retired", label: "Retired" },
  { value: "student", label: "Student" },
];

export const title = "React Contact Block Tenant";

export default function ContactTenant() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Rental Inquiry
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Interested in this property? Tell us about yourself to schedule a
            viewing.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Move-in & Household */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Move-in Details</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="move-date">Desired Move-in Date</Label>
                    <Input id="move-date" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lease-term">Preferred Lease Term</Label>
                    <Select>
                      <SelectTrigger id="lease-term">
                        <SelectValue placeholder="Select lease length" />
                      </SelectTrigger>
                      <SelectContent>
                        {LEASE_TERMS.map((term) => (
                          <SelectItem key={term.value} value={term.value}>
                            {term.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Household Information</h3>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupants">Number of Occupants</Label>
                    <Select>
                      <SelectTrigger id="occupants">
                        <SelectValue placeholder="How many will live here?" />
                      </SelectTrigger>
                      <SelectContent>
                        {OCCUPANTS.map((occ) => (
                          <SelectItem key={occ.value} value={occ.value}>
                            {occ.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Do you have pets?</Label>
                    <RadioGroup defaultValue="no" className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="pets-yes" />
                        <Label htmlFor="pets-yes" className="font-normal">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="pets-no" />
                        <Label htmlFor="pets-no" className="font-normal">
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Do you need parking?</Label>
                    <RadioGroup defaultValue="yes" className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="parking-yes" />
                        <Label htmlFor="parking-yes" className="font-normal">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="parking-no" />
                        <Label htmlFor="parking-no" className="font-normal">
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Right: Contact & Employment */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Home className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Your Information</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Michael" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Chen" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="michael@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="employment">Employment Status</Label>
                      <Select>
                        <SelectTrigger id="employment">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {EMPLOYMENT.map((emp) => (
                            <SelectItem key={emp.value} value={emp.value}>
                              {emp.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="income">Monthly Income</Label>
                      <Select>
                        <SelectTrigger id="income">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          {INCOME_RANGES.map((inc) => (
                            <SelectItem key={inc.value} value={inc.value}>
                              {inc.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Additional Information (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about yourself, your rental history, or any questions..."
                      rows={2}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-start gap-2">
                    <Checkbox id="consent" />
                    <Label
                      htmlFor="consent"
                      className="text-sm font-normal leading-tight"
                    >
                      I consent to a credit and background check as part of the
                      application process
                    </Label>
                  </div>

                  <div className="rounded-lg border p-3 flex items-center gap-3">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Viewings available 7 days a week by appointment
                    </p>
                  </div>

                  <Button className="w-full">Submit Inquiry</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We'll contact you within 24 hours to schedule a viewing.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Building2, FileCheck, Shield, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = [
  { value: "supplies", label: "Office Supplies" },
  { value: "technology", label: "Technology & IT" },
  { value: "professional", label: "Professional Services" },
  { value: "facilities", label: "Facilities & Maintenance" },
  { value: "marketing", label: "Marketing & Creative" },
  { value: "logistics", label: "Logistics & Shipping" },
  { value: "other", label: "Other" },
];

const BUSINESS_TYPES = [
  { value: "corporation", label: "Corporation" },
  { value: "llc", label: "LLC" },
  { value: "partnership", label: "Partnership" },
  { value: "sole-prop", label: "Sole Proprietorship" },
];

const CERTIFICATIONS = [
  { id: "mbe", label: "Minority-Owned (MBE)" },
  { id: "wbe", label: "Women-Owned (WBE)" },
  { id: "veteran", label: "Veteran-Owned" },
  { id: "lgbtbe", label: "LGBTBE Certified" },
  { id: "hubzone", label: "HUBZone" },
  { id: "small", label: "Small Business" },
];

export const title = "React Contact Block Vendor";

export default function ContactVendor() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Become a Vendor
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Join our network of qualified suppliers and service providers.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Business Details */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Business Information</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Legal Business Name</Label>
                    <Input id="business-name" placeholder="Acme Supplies LLC" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="dba">DBA (if different)</Label>
                      <Input id="dba" placeholder="Acme Co." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax-id">Tax ID / EIN</Label>
                      <Input id="tax-id" placeholder="XX-XXXXXXX" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-type">Business Type</Label>
                    <Select>
                      <SelectTrigger id="business-type">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUSINESS_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Primary Service Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="What do you provide?" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Company Website</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://acmesupplies.com"
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <Label>Diversity Certifications (Optional)</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {CERTIFICATIONS.map((cert) => (
                        <div key={cert.id} className="flex items-center gap-2">
                          <Checkbox id={cert.id} />
                          <Label
                            htmlFor={cert.id}
                            className="text-sm font-normal"
                          >
                            {cert.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Contact & Insurance */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FileCheck className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Contact & Compliance</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Contact Name</Label>
                      <Input id="contact-name" placeholder="John Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-title">Title</Label>
                      <Input id="contact-title" placeholder="Sales Manager" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@acmesupplies.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Do you carry general liability insurance?</Label>
                    <RadioGroup defaultValue="yes" className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="insurance-yes" />
                        <Label htmlFor="insurance-yes" className="font-normal">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="insurance-no" />
                        <Label htmlFor="insurance-no" className="font-normal">
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capabilities">
                      Describe your products/services
                    </Label>
                    <Textarea
                      id="capabilities"
                      placeholder="Tell us about your capabilities, capacity, and what makes you a great partner..."
                      rows={3}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="rounded-lg border p-3 flex items-center gap-3">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Approved vendors gain access to our procurement portal
                    </p>
                  </div>

                  <Button className="w-full">Submit Application</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Applications are reviewed within 5-7 business days.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { Calendar, Heart, Sparkles, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const INTERESTS = [
  { id: "events", label: "Event Support" },
  { id: "admin", label: "Administrative" },
  { id: "outreach", label: "Community Outreach" },
  { id: "mentor", label: "Mentoring" },
  { id: "fundraising", label: "Fundraising" },
  { id: "marketing", label: "Marketing & Social Media" },
];

const AVAILABILITY = [
  { value: "weekly", label: "Weekly (recurring)" },
  { value: "monthly", label: "Monthly" },
  { value: "events", label: "Special Events Only" },
  { value: "flexible", label: "Flexible / On-Call" },
];

const HOURS = [
  { value: "1-5", label: "1-5 hours/month" },
  { value: "5-10", label: "5-10 hours/month" },
  { value: "10-20", label: "10-20 hours/month" },
  { value: "20+", label: "20+ hours/month" },
];

const DAYS = [
  { id: "weekday-morning", label: "Weekday Mornings" },
  { id: "weekday-afternoon", label: "Weekday Afternoons" },
  { id: "weekday-evening", label: "Weekday Evenings" },
  { id: "weekend", label: "Weekends" },
];

export const title = "React Contact Block Volunteer";

export default function ContactVolunteer() {
  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Become a Volunteer
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Join our community of dedicated volunteers making a difference.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Interests & Availability */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Areas of Interest</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {INTERESTS.map((interest) => (
                    <div key={interest.id} className="flex items-center gap-2">
                      <Checkbox id={interest.id} />
                      <Label
                        htmlFor={interest.id}
                        className="text-sm font-normal"
                      >
                        {interest.label}
                      </Label>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Availability</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="commitment">Commitment Level</Label>
                    <Select>
                      <SelectTrigger id="commitment">
                        <SelectValue placeholder="How often can you volunteer?" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABILITY.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours">Hours Available</Label>
                    <Select>
                      <SelectTrigger id="hours">
                        <SelectValue placeholder="Select hours per month" />
                      </SelectTrigger>
                      <SelectContent>
                        {HOURS.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Preferred Times</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {DAYS.map((day) => (
                        <div key={day.id} className="flex items-center gap-2">
                          <Checkbox id={day.id} />
                          <Label
                            htmlFor={day.id}
                            className="text-sm font-normal"
                          >
                            {day.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Personal Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Your Information</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="Sarah" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Johnson" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="sarah@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">
                      Why do you want to volunteer with us?
                    </Label>
                    <Textarea
                      id="motivation"
                      placeholder="Tell us about your interest in our mission and what you hope to contribute..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Are you 18 or older?</Label>
                    <RadioGroup defaultValue="yes" className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id="age-yes" />
                        <Label htmlFor="age-yes" className="font-normal">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="age-no" />
                        <Label htmlFor="age-no" className="font-normal">
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-start gap-2">
                    <Checkbox id="background" />
                    <Label
                      htmlFor="background"
                      className="text-sm font-normal leading-tight"
                    >
                      I consent to a background check if required for my
                      volunteer role
                    </Label>
                  </div>

                  <div className="rounded-lg border p-3 flex items-center gap-3">
                    <Heart className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Join 500+ volunteers who donated 10,000+ hours last year
                    </p>
                  </div>

                  <Button className="w-full">Submit Application</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We'll contact you within 3-5 days about next steps.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { Calendar, ClipboardList, Package, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const ISSUE_TYPES = [
  { value: "doa", label: "Defective on Arrival", badge: "Priority" },
  { value: "malfunction", label: "Stopped Working", badge: null },
  { value: "damage", label: "Physical Damage", badge: null },
  { value: "missing", label: "Missing Parts", badge: null },
  { value: "performance", label: "Performance Issue", badge: null },
];

const RESOLUTIONS = [
  { value: "repair", label: "Repair" },
  { value: "replace", label: "Replacement" },
  { value: "refund", label: "Refund" },
  { value: "any", label: "No Preference" },
];

const PROOF_TYPES = [
  { value: "receipt", label: "Original Receipt" },
  { value: "order", label: "Order Confirmation Email" },
  { value: "registered", label: "Product Registered" },
  { value: "other", label: "Other Proof" },
];

export const title = "React Contact Block Warranty";

export default function ContactWarranty() {
  const [issueType, setIssueType] = useState<string>("");

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Warranty Claim
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Submit a warranty claim for your product. We'll process it within 48
            hours.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Left: Product & Issue */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Product Information</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="serial">Serial Number</Label>
                    <Input id="serial" placeholder="SN-XXXX-XXXX-XXXX" />
                    <p className="text-xs text-muted-foreground">
                      Found on the product label or packaging
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="product">Product Name</Label>
                      <Input id="product" placeholder="Model XYZ-2000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="purchase-date">Purchase Date</Label>
                      <Input id="purchase-date" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proof">Proof of Purchase</Label>
                    <Select>
                      <SelectTrigger id="proof">
                        <SelectValue placeholder="Select proof type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROOF_TYPES.map((proof) => (
                          <SelectItem key={proof.value} value={proof.value}>
                            {proof.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-2 mb-4">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Issue Type</h3>
                  </div>

                  <RadioGroup
                    value={issueType}
                    onValueChange={setIssueType}
                    className="space-y-2"
                  >
                    {ISSUE_TYPES.map((issue) => (
                      <Label
                        key={issue.value}
                        htmlFor={`issue-${issue.value}`}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                          issueType === issue.value
                            ? "border-primary"
                            : "hover:border-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem
                            value={issue.value}
                            id={`issue-${issue.value}`}
                          />
                          <span className="text-sm">{issue.label}</span>
                        </div>
                        {issue.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {issue.badge}
                          </Badge>
                        )}
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              {/* Right: Contact & Resolution */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <ClipboardList className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Claim Details</h3>
                </div>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="order">Order Number (Optional)</Label>
                      <Input id="order" placeholder="ORD-123456" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Describe the Issue</Label>
                    <Textarea
                      id="description"
                      placeholder="Please provide details about what happened and when the issue started..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resolution">Preferred Resolution</Label>
                    <Select>
                      <SelectTrigger id="resolution">
                        <SelectValue placeholder="How would you like this resolved?" />
                      </SelectTrigger>
                      <SelectContent>
                        {RESOLUTIONS.map((res) => (
                          <SelectItem key={res.value} value={res.value}>
                            {res.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-start gap-2">
                    <Checkbox id="confirm" />
                    <Label
                      htmlFor="confirm"
                      className="text-sm font-normal leading-tight"
                    >
                      I confirm this product is within the warranty period and
                      has not been damaged through misuse
                    </Label>
                  </div>

                  <div className="rounded-lg border p-3 flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Claims are typically processed within 2-3 business days
                    </p>
                  </div>

                  <Button className="w-full">Submit Warranty Claim</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    You'll receive a claim number and next steps via email.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
"use client";

import { useState } from "react";
import { Calendar, Heart, MapPin, Music, Sparkles, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

const WEDDING_STYLES = [
  { value: "classic", label: "Classic & Timeless", icon: "👑" },
  { value: "modern", label: "Modern & Minimal", icon: "✨" },
  { value: "rustic", label: "Rustic & Bohemian", icon: "🌿" },
  { value: "romantic", label: "Romantic Garden", icon: "🌸" },
  { value: "glamorous", label: "Glamorous & Luxe", icon: "💎" },
  { value: "destination", label: "Destination", icon: "✈️" },
];

const VENUE_TYPES = [
  { value: "ballroom", label: "Ballroom / Hotel" },
  { value: "outdoor", label: "Outdoor / Garden" },
  { value: "barn", label: "Barn / Rustic" },
  { value: "beach", label: "Beach / Waterfront" },
  { value: "vineyard", label: "Vineyard / Winery" },
  { value: "estate", label: "Private Estate" },
  { value: "undecided", label: "Still Exploring" },
];

const SERVICES_NEEDED = [
  { id: "planning", label: "Full Wedding Planning" },
  { id: "coordination", label: "Day-of Coordination" },
  { id: "venue", label: "Venue" },
  { id: "catering", label: "Catering" },
  { id: "photography", label: "Photography" },
  { id: "videography", label: "Videography" },
  { id: "florals", label: "Florals & Decor" },
  { id: "music", label: "DJ / Live Music" },
];

const BUDGET_RANGES = [
  { value: "under-10", label: "Under $10,000" },
  { value: "10-25", label: "$10,000 - $25,000" },
  { value: "25-50", label: "$25,000 - $50,000" },
  { value: "50-100", label: "$50,000 - $100,000" },
  { value: "100-plus", label: "$100,000+" },
  { value: "undecided", label: "Still determining" },
];

export const title = "React Contact Block Wedding";

export default function ContactWedding() {
  const [style, setStyle] = useState<string>("");
  const [guests, setGuests] = useState([120]);

  const getGuestLabel = (count: number) => {
    if (count < 50) return "Intimate celebration";
    if (count < 150) return "Medium gathering";
    if (count < 250) return "Large celebration";
    return "Grand affair";
  };

  return (
    <section className="py-12">
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="mb-10 text-center">
          <Badge className="mb-4">
            <Heart className="mr-1 h-3 w-3" />
            Say "I Do" With Us
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Begin Your Wedding Journey
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Every love story deserves a perfect celebration. Let's bring your
            vision to life.
          </p>
        </div>

        <Card>
          <CardContent className="p-0">
            {/* Style Selection - Top Visual Section */}
            <div className="border-b p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">What's Your Wedding Style?</h3>
              </div>
              <RadioGroup
                value={style}
                onValueChange={setStyle}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6"
              >
                {WEDDING_STYLES.map((ws) => (
                  <Label
                    key={ws.value}
                    htmlFor={`style-${ws.value}`}
                    className={`flex cursor-pointer flex-col items-center rounded-lg border p-4 text-center transition-all ${
                      style === ws.value
                        ? "border-primary ring-1 ring-primary"
                        : "hover:border-foreground"
                    }`}
                  >
                    <RadioGroupItem
                      value={ws.value}
                      id={`style-${ws.value}`}
                      className="sr-only"
                    />
                    <span className="text-2xl mb-2">{ws.icon}</span>
                    <span className="text-xs font-medium leading-tight">
                      {ws.label}
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="grid md:grid-cols-2">
              {/* Left: Event Details */}
              <div className="border-b p-6 md:border-b-0 md:border-r">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Wedding Details</h3>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="wedding-date">Wedding Date</Label>
                      <Input id="wedding-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-flexibility">Date Flexibility</Label>
                      <Select>
                        <SelectTrigger id="date-flexibility">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="set">Date is set</SelectItem>
                          <SelectItem value="flexible">
                            Flexible ± 2 weeks
                          </SelectItem>
                          <SelectItem value="month">
                            Flexible within month
                          </SelectItem>
                          <SelectItem value="exploring">
                            Still choosing
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <Label>Estimated Guest Count</Label>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-semibold">
                          {guests[0]}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {getGuestLabel(guests[0])}
                        </p>
                      </div>
                    </div>
                    <Slider
                      value={guests}
                      onValueChange={setGuests}
                      min={20}
                      max={400}
                      step={10}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>20 guests</span>
                      <span>400 guests</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="venue-type">Venue Preference</Label>
                    </div>
                    <Select>
                      <SelectTrigger id="venue-type">
                        <SelectValue placeholder="What type of venue?" />
                      </SelectTrigger>
                      <SelectContent>
                        {VENUE_TYPES.map((venue) => (
                          <SelectItem key={venue.value} value={venue.value}>
                            {venue.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Preferred City / Region</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Napa Valley, Miami Beach"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Music className="h-4 w-4 text-muted-foreground" />
                      <Label>Services Needed</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {SERVICES_NEEDED.map((service) => (
                        <div
                          key={service.id}
                          className="flex items-center gap-2"
                        >
                          <Checkbox id={service.id} />
                          <Label
                            htmlFor={service.id}
                            className="text-sm font-normal"
                          >
                            {service.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Budget & Contact */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Heart className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">About You</h3>
                </div>

                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Wedding Budget Range</Label>
                    <Select>
                      <SelectTrigger id="budget">
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUDGET_RANGES.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      This helps us recommend the right options for you
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vision">Your Wedding Vision</Label>
                    <Textarea
                      id="vision"
                      placeholder="Tell us about your dream wedding—colors, themes, must-haves, or any inspiration you've gathered..."
                      rows={3}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="partner1">Partner 1 Name</Label>
                      <Input id="partner1" placeholder="Jessica" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partner2">Partner 2 Name</Label>
                      <Input id="partner2" placeholder="Michael" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jessica.michael@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referral">How Did You Hear About Us?</Label>
                    <Select>
                      <SelectTrigger id="referral">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="pinterest">Pinterest</SelectItem>
                        <SelectItem value="google">Google Search</SelectItem>
                        <SelectItem value="referral">
                          Friend / Family Referral
                        </SelectItem>
                        <SelectItem value="wedding-wire">
                          WeddingWire / The Knot
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox id="newsletter" />
                    <Label
                      htmlFor="newsletter"
                      className="text-sm font-normal leading-tight"
                    >
                      Send me wedding planning tips and exclusive vendor offers
                    </Label>
                  </div>

                  <div className="rounded-lg border p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Free Consultation</span>
                      <Badge variant="secondary">60 min</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Meet with our team to discuss your vision and explore
                      options
                    </p>
                  </div>

                  <Button className="w-full" size="lg">
                    <Heart className="mr-2 h-4 w-4" />
                    Start Planning Together
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We'll reach out within 24 hours to schedule your
                    consultation.
                  </p>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Newsletter2() {
  return (
    <section className="px-4 py-20 bg-accent">
      <div className="mx-auto max-w-6xl">
        <Card className="overflow-hidden shadow-none p-0">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 items-center">
              <img
                src="/images/dashboard.png"
                alt="Product screenshot"
                width={1200}
                height={800}
                className="h-64 w-full object-cover md:h-full"
              />
              <form className="flex flex-col gap-4 p-8 max-w-md w-full mx-auto">
                <div className="space-y-1 text-center">
                  <h2 className="text-2xl font-bold tracking-tight">
                    Get the inside scoop
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Join our newsletter to stay ahead.
                  </p>
                </div>
                <div className="grid gap-2 text-left">
                  <Label htmlFor="email2">Email</Label>
                  <Input
                    id="email2"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
```

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "@mynaui/icons-react";

export default function Newsletter4() {
  return (
    <section className="px-4 py-20">
      <Card className="mx-auto max-w-3xl overflow-hidden shadow-none">
        <div className="grid gap-8 p-6 grid-cols-1 md:grid-cols-2 items-center justify-center w-full">
          <div>
            <CardHeader className="p-0">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Unlock exclusive content
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Sign up and get benefits like:
              </p>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <ul className="space-y-2" role="list">
                {[
                  "Exclusive tutorials",
                  "Product news",
                  "Member-only discounts",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="size-4 text-primary" stroke={2} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </div>
          <form className="grid gap-4 w-full">
            <div className="grid gap-2">
              <Label htmlFor="email3">Email</Label>
              <Input
                id="email3"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </Card>
    </section>
  );
}
```

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, MessageSquare, Wrench } from "lucide-react";

export default function CenterAligned() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Contact us</h1>
        <p className="text-muted-foreground mt-3">
          We&apos;d love to talk about how we can help you.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-lg">
        <Card className="p-0">
          <CardContent className="p-6">
            <h2 className="mb-8 text-xl font-semibold">Fill in the form</h2>
            <form>
              <div className="grid gap-4 lg:gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                  <div>
                    <Label htmlFor="firstname" className="mb-2">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      id="firstname"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastname" className="mb-2">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      id="lastname"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                  <div>
                    <Label htmlFor="email" className="mb-2">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2">
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      placeholder="Enter your phone"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="mb-2">
                    Details
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project"
                    rows={4}
                  />
                </div>
              </div>

              <div className="mt-6 grid">
                <Button type="submit" size="lg">
                  Send inquiry
                </Button>
              </div>

              <div className="mt-3 text-center">
                <p className="text-muted-foreground text-sm">
                  We&apos;ll get back to you in 1-2 business days.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 grid items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <a
          href={"#"}
          className="group hover:bg-muted flex h-full flex-col rounded-lg p-4 text-center sm:p-6"
        >
          <BrainCircuit className="text-muted-foreground mx-auto size-9" />
          <div className="mt-5">
            <h3 className="text-lg font-semibold">Knowledgebase</h3>
            <p className="text-muted-foreground mt-1">
              We&apos;re here to help with any questions or code.
            </p>
            <p className="text-primary mt-5 inline-flex items-center gap-x-1 font-medium">
              Contact support
              <svg
                className="size-4 transition ease-in-out group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </a>

        <a
          href={"#"}
          className="group hover:bg-muted flex h-full flex-col rounded-lg p-4 text-center sm:p-6"
        >
          <MessageSquare className="text-muted-foreground mx-auto size-9" />
          <div className="mt-5">
            <h3 className="text-lg font-semibold">FAQ</h3>
            <p className="text-muted-foreground mt-1">
              Search our FAQ for answers to anything you might ask.
            </p>
            <p className="text-primary mt-5 inline-flex items-center gap-x-1 font-medium">
              Visit FAQ
              <svg
                className="size-4 transition ease-in-out group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </a>

        <a
          href={"#"}
          className="group hover:bg-muted flex h-full flex-col rounded-lg p-4 text-center sm:p-6"
        >
          <Wrench className="text-muted-foreground mx-auto size-9" />
          <div className="mt-5">
            <h3 className="text-lg font-semibold">Developer APIs</h3>
            <p className="text-muted-foreground mt-1">
              Check out our development quickstart guide.
            </p>
            <p className="text-primary mt-5 inline-flex items-center gap-x-1 font-medium">
              Contact sales
              <svg
                className="size-4 transition ease-in-out group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
```

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function SplitWithDetails() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-2xl lg:max-w-5xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Contact us</h1>
          <p className="text-muted-foreground mt-3">
            We&apos;d love to talk about how we can help you.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
          <Card className="p-0">
            <CardContent className="p-6">
              <h2 className="mb-8 text-xl font-semibold">Fill in the form</h2>
              <form>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Input type="text" placeholder="First Name" />
                    </div>
                    <div>
                      <Input type="text" placeholder="Last Name" />
                    </div>
                  </div>

                  <div>
                    <Input type="email" placeholder="Email" />
                  </div>

                  <div>
                    <Input type="tel" placeholder="Phone Number" />
                  </div>

                  <div>
                    <Textarea placeholder="Details" rows={4} />
                  </div>
                </div>

                <div className="mt-4 grid">
                  <Button type="submit">Send inquiry</Button>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-muted-foreground text-sm">
                    We&apos;ll get back to you in 1-2 business days.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="divide-border divide-y">
            <div className="flex gap-x-7 py-6">
              <MapPin className="text-muted-foreground mt-1.5 size-6" />
              <div>
                <h3 className="font-semibold">Our address</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  We&apos;re here to help with any questions or code.
                </p>
                <address className="text-muted-foreground mt-2 text-sm not-italic">
                  300 Bath Street, Tay House
                  <br />
                  Glasgow G2 4JR, United Kingdom
                </address>
              </div>
            </div>

            <div className="flex gap-x-7 py-6">
              <Mail className="text-muted-foreground mt-1.5 size-6" />
              <div>
                <h3 className="font-semibold">Email us</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  We&apos;ll get back to you as soon as possible.
                </p>
                <p className="mt-2">
                  <a
                    className="text-primary text-sm font-medium hover:underline"
                    href="mailto:hello@example.com"
                  >
                    hello@example.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-x-7 py-6">
              <Phone className="text-muted-foreground mt-1.5 size-6" />
              <div>
                <h3 className="font-semibold">Call us</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  Mon-Fri from 8am to 5pm.
                </p>
                <p className="mt-2">
                  <a
                    className="text-primary text-sm font-medium hover:underline"
                    href="tel:+1 (555) 000-0000"
                  >
                    +1 (555) 000-0000
                  </a>
                </p>
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function WithMap() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-2xl lg:max-w-5xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Get in touch</h1>
          <p className="text-muted-foreground mt-3">
            We&apos;d love to hear from you. Please fill out this form.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <Card className="p-0">
            <CardContent className="p-6">
              <form>
                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="First name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Email" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="Phone" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      className="min-h-[350px]"
                      rows={14}
                    />
                  </div>

                  <Button type="submit">Send message</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Map and Contact Info */}
          <div className="space-y-6">
            <div className="bg-muted relative aspect-square w-full overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.9416307263784!2d-0.12574468422944231!3d51.50718397963522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c7c7eb9be3%3A0x3918653583725b56!2sRiver%20Thames!5e0!3m2!1sen!2suk!4v1647095757714!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="text-muted-foreground mt-1 h-5 w-5 shrink-0" />
                <div>
                  <h3 className="font-medium">Visit us</h3>
                  <p className="text-muted-foreground text-sm">
                    100 Smith Street, Melbourne VIC 3000, Australia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-muted-foreground mt-1 h-5 w-5 shrink-0" />
                <div>
                  <h3 className="font-medium">Email us</h3>
                  <a
                    href="mailto:hello@example.com"
                    className="text-primary text-sm hover:underline"
                  >
                    hello@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-muted-foreground mt-1 h-5 w-5 shrink-0" />
                <div>
                  <h3 className="font-medium">Call us</h3>
                  <a
                    href="tel:+1234567890"
                    className="text-primary text-sm hover:underline"
                  >
                    +1 (234) 567-890
                  </a>
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
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, PlusIcon } from "lucide-react";

type ContactInfoProps = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<"div"> & {
  // Content props
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title = "Contact With Us",
  description = "If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.",
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        "bg-card border relative grid h-full w-full shadow md:grid-cols-2 lg:grid-cols-3",
        className
      )}
      {...props}
    >
      <PlusIcon className="absolute -top-3 -left-3 h-6 w-6" />
      <PlusIcon className="absolute -top-3 -right-3 h-6 w-6" />
      <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6" />
      <PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6" />
      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-4 px-4 py-8 md:p-8">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="text-muted-foreground max-w-xl text-sm md:text-base lg:text-lg">
            {description}
          </p>
          <div className="grid gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {contactInfo?.map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "bg-muted/40 flex h-full w-full items-center border-t p-5 md:col-span-1 md:border-t-0 md:border-l",
          formSectionClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <div className={cn("flex items-center gap-3 py-3", className)} {...props}>
      <div className="bg-muted/40 rounded-lg p-3">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-muted-foreground text-xs">{value}</p>
      </div>
    </div>
  );
}
```

```tsx
import React from "react";
import { cn } from "@/lib/utils";
import {
  Check,
  Copy,
  LucideIcon,
  Mail,
  MapPin,
  Phone,
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
} from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";

const APP_EMAIL = "mail@example.com";
const APP_PHONE = "+92 300 1234567";
const APP_PHONE_2 = "+92 321 9876543";

export function ContactPage() {
  const socialLinks = [
    {
      icon: GithubIcon,
      href: "https://github.com/sshahaider",
      label: "GitHub",
    },
    {
      icon: TwitterIcon,
      href: "https://twitter.com/sshahaider",
      label: "Twitter",
    },
    {
      icon: LinkedinIcon,
      href: "https://linkedin.com/in/sshahaider",
      label: "LinkedIn",
    },
    {
      icon: InstagramIcon,
      href: "https://instagram.com/sshahaider",
      label: "Instagram",
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto h-full max-w-6xl lg:border-x">
        <div
          aria-hidden
          className="absolute inset-0 isolate -z-10 opacity-80 contain-strict"
        >
          <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
        </div>
        <div className="flex grow flex-col justify-center px-4 md:px-6 pt-32 pb-16">
          <h1 className=" text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="text-muted-foreground mb-5 text-base">
            Contact the support team at Asme.
          </p>
        </div>
        <BorderSeparator />
        <div className="grid md:grid-cols-3">
          <Box
            icon={Mail}
            title="Email"
            description="We respond to all emails within 24 hours."
          >
            <a
              href={`mailto:${APP_EMAIL}`}
              className="font-mono text-base font-medium tracking-wide hover:underline"
            >
              {APP_EMAIL}
            </a>
            <CopyButton className="size-6" test={APP_EMAIL} />
          </Box>
          <Box
            icon={MapPin}
            title="Office"
            description="Drop by our office for a chat."
          >
            <span className="font-mono text-base font-medium tracking-wide">
              Office # 100, 101 Second Floor Kohinoor 1, Faisalabad, Pakistan
            </span>
          </Box>
          <Box
            icon={Phone}
            title="Phone"
            description="We're available Mon-Fri, 9am-5pm."
            className="border-b-0 md:border-r-0"
          >
            <div>
              <div className="flex items-center gap-x-2">
                <a
                  href={`tel:${APP_PHONE}`}
                  className="block font-mono text-base font-medium tracking-wide hover:underline"
                >
                  {APP_PHONE}
                </a>
                <CopyButton className="size-6" test="+923207376123" />
              </div>
              <div className="flex items-center gap-x-2">
                <a
                  href={`tel:${APP_PHONE_2}`}
                  className="block font-mono text-base font-medium tracking-wide hover:underline"
                >
                  {APP_PHONE_2}
                </a>
                <CopyButton className="size-6" test="+923045771644" />
              </div>
            </div>
          </Box>
        </div>
        <BorderSeparator />
        <div className="relative flex h-full min-h-80 items-center justify-center">
          <div
            className={cn(
              "z--10 absolute inset-0 size-full",
              "bg-[radial-gradient(color-mix(in_oklab,var(--foreground)30%,transparent)_1px,transparent_1px)]",
              "bg-size-[32px_32px]",
              "mask-[radial-gradient(ellipse_at_center,var(--background)_30%,transparent)]"
            )}
          />

          <div className="relative z-1 space-y-6">
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              Find us online
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted/50 hover:bg-accent flex items-center gap-x-2 rounded-full border px-4 py-2"
                >
                  <link.icon className="size-4" />
                  <span className="font-mono text-sm font-medium tracking-wide">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BorderSeparator() {
  return <div className="absolute inset-x-0 h-px w-full border-b" />;
}

type ContactBox = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  title: string;
  description: string;
};

function Box({
  title,
  description,
  className,
  children,
  ...props
}: ContactBox) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between border-b md:border-r md:border-b-0",
        className
      )}
    >
      <div className="bg-muted/40 flex items-center gap-x-3 border-b p-4">
        <props.icon className="text-muted-foreground size-5" strokeWidth={1} />
        <h2 className="font-heading text-lg font-medium tracking-wider">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-x-2 p-4 py-12">{children}</div>
      <div className="border-t p-4">
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}

type CopyButtonProps = ButtonProps & {
  test: string;
};

function CopyButton({
  className,
  variant = "ghost",
  size = "icon",
  test,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(test);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("disabled:opacity-100", className)}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      disabled={copied || props.disabled}
      {...props}
    >
      <div
        className={cn(
          "transition-all",
          copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      >
        <Check className="size-3.5 stroke-emerald-500" aria-hidden="true" />
      </div>
      <div
        className={cn(
          "absolute transition-all",
          copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Copy aria-hidden="true" className="size-3.5" />
      </div>
    </Button>
  );
}
```

```tsx
export default function Contact() {
  const contactMethods = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      ),
      title: "Join our community",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        name: "Join our Discord",
        href: "javascript:void(0)",
      },
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_17_80)">
            <path
              d="M15.1003 43.5C33.2091 43.5 43.1166 28.4935 43.1166 15.4838C43.1166 15.0619 43.1072 14.6307 43.0884 14.2088C45.0158 12.815 46.679 11.0886 48 9.11066C46.205 9.90926 44.2993 10.4308 42.3478 10.6575C44.4026 9.42588 45.9411 7.491 46.6781 5.21159C44.7451 6.35718 42.6312 7.16528 40.4269 7.60128C38.9417 6.02318 36.978 4.97829 34.8394 4.62816C32.7008 4.27803 30.5064 4.64216 28.5955 5.66425C26.6846 6.68635 25.1636 8.30947 24.2677 10.2827C23.3718 12.2559 23.1509 14.4693 23.6391 16.5807C19.725 16.3842 15.8959 15.3675 12.4 13.5963C8.90405 11.825 5.81939 9.33893 3.34594 6.29909C2.0888 8.46655 1.70411 11.0314 2.27006 13.4722C2.83601 15.9131 4.31013 18.047 6.39281 19.44C4.82926 19.3904 3.29995 18.9694 1.93125 18.2119V18.3338C1.92985 20.6084 2.7162 22.8132 4.15662 24.5736C5.59704 26.334 7.60265 27.5412 9.8325 27.99C8.38411 28.3863 6.86396 28.4441 5.38969 28.1588C6.01891 30.1149 7.24315 31.8258 8.89154 33.0527C10.5399 34.2796 12.5302 34.9613 14.5847 35.0025C11.0968 37.7423 6.78835 39.2283 2.35313 39.2213C1.56657 39.2201 0.780798 39.1719 0 39.0769C4.50571 41.9676 9.74706 43.5028 15.1003 43.5Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_17_80">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),

      title: "Follow us on Twitter",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        name: "Send us DMs",
        href: "javascript:void(0)",
      },
    },
  ];

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 text-gray-600 gap-12 md:px-8 lg:flex">
        <div className="max-w-md">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Let’s connect
          </h3>
          <p className="mt-3">
            We’re here to help and answer any question you might have, We look
            forward to hearing from you .
          </p>
        </div>
        <div>
          <ul className="mt-12 gap-y-6 gap-x-12 items-center md:flex lg:gap-x-0 lg:mt-0">
            {contactMethods.map((item, idx) => (
              <li
                key={idx}
                className="space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none"
              >
                <div className="w-12 h-12 rounded-full border flex items-center justify-center text-gray-700">
                  {item.icon}
                </div>
                <h4 className="text-gray-800 text-lg font-medium xl:text-xl">
                  {item.title}
                </h4>
                <p>{item.desc}</p>
                <a
                  href={item.link.href}
                  className="flex items-center gap-1 text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium"
                >
                  {item.link.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Mail } from 'lucide-react';

export default function PortfolioSplitSectionSignup() {
  return (
    <div className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="bg-muted/20 border-border overflow-hidden rounded-xl border shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left column - Benefits */}
            <div className="bg-muted/30 relative p-6 md:p-8 lg:p-10">
              <div className="relative z-10">
                <div className="flex items-center">
                  <div className="bg-primary/10 text-primary mr-3 flex h-10 w-10 items-center justify-center rounded-full">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h3 className="text-primary text-sm font-semibold tracking-wider uppercase">
                    Designer&apos;s Digest
                  </h3>
                </div>

                <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                  Subscribe for free tips, case studies, and templates
                </h2>

                <p className="text-muted-foreground mt-3">
                  Join my newsletter and get exclusive insights into my design
                  process, along with resources to help you improve your own
                  creative work.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary mt-0.5 mr-3 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Weekly Design Insights</h4>
                      <p className="text-muted-foreground text-sm">
                        Learn about the latest design trends and techniques
                        I&apos;m exploring
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary mt-0.5 mr-3 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Exclusive Resources</h4>
                      <p className="text-muted-foreground text-sm">
                        Get access to templates, checklists, and guides not
                        available anywhere else
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary mt-0.5 mr-3 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full">
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Project Breakdowns</h4>
                      <p className="text-muted-foreground text-sm">
                        Behind-the-scenes looks at my process for real client
                        projects
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 hidden md:block">
                  <div className="flex h-32 gap-3">
                    <div>
                      <img
                        src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
                        alt="Newsletter preview"
                        width={500}
                        height={120}
                        className="h-32 rounded-md object-cover"
                      />
                    </div>
                    <div>
                      <img
                        src="https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
                        alt="Newsletter preview"
                        width={500}
                        height={120}
                        className="h-32 rounded-md object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative background element */}
              <div className="bg-primary/5 absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl"></div>
            </div>

            {/* Right column - Form */}
            <div className="bg-background p-6 md:p-8 lg:p-10">
              <form className="mx-auto max-w-md">
                <h3 className="text-xl font-semibold">Join the newsletter</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Sign up to receive my newsletter with design insights and
                  resources.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="Your name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-address">Email Address</Label>
                    <Input
                      id="email-address"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>I&apos;m interested in</Label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-1 lg:grid-cols-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ui-design" />
                        <label
                          htmlFor="ui-design"
                          className="cursor-pointer text-sm"
                        >
                          UI Design
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ux-research" />
                        <label
                          htmlFor="ux-research"
                          className="cursor-pointer text-sm"
                        >
                          UX Research
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="web-development" />
                        <label
                          htmlFor="web-development"
                          className="cursor-pointer text-sm"
                        >
                          Web Development
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="case-studies" />
                        <label
                          htmlFor="case-studies"
                          className="cursor-pointer text-sm"
                        >
                          Case Studies
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="group w-full">
                    Subscribe to Newsletter
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <p className="text-muted-foreground text-center text-xs">
                    I respect your privacy. Unsubscribe at any time. No spam,
                    ever.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function MapWithContactInfo() {
  return (
    <section className="container mx-auto px-4 py-12 md:px-6 md:py-24 lg:py-32 2xl:max-w-[1400px]">
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Find Me
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Located in the heart of San Francisco. Feel free to visit or get in
          touch through any channel.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Map Section - 3/5 width on large screens */}
        <div className="bg-muted h-[400px] overflow-hidden rounded-lg lg:col-span-3 lg:h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948552!3d37.75781499651705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1619806204562!5m2!1sen!2sus"
            className="h-full w-full border-0"
            loading="lazy"
            title="Location map"
            allowFullScreen
          ></iframe>
        </div>

        {/* Contact Information - 2/5 width on large screens */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent>
              <h3 className="mb-6 text-xl font-semibold">
                Contact Information
              </h3>

              <div className="mb-8 space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-primary mt-1 size-5 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium">Address</h4>
                    <p className="text-muted-foreground text-sm">
                      123 Market Street
                      <br />
                      San Francisco, CA 94103
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="text-primary mt-1 size-5 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium">Phone</h4>
                    <a
                      href="tel:+1234567890"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-primary mt-1 size-5 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="font-medium">Email</h4>
                    <a
                      href="mailto:hello@example.com"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      hello@example.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Mini Contact Form */}
              <div className="border-t pt-6">
                <h4 className="mb-4 font-medium">Send a quick message</h4>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="quick-email" className="sr-only">
                      Email
                    </Label>
                    <Input
                      id="quick-email"
                      type="email"
                      placeholder="Your email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="quick-message" className="sr-only">
                      Message
                    </Label>
                    <Textarea
                      id="quick-message"
                      placeholder="Your message"
                      rows={3}
                      className="resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send
                  </Button>
                </form>
              </div>

              {/* Social Links */}
              <div className="mt-6 border-t pt-6">
                <div className="flex justify-center space-x-4">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
```

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
                <h3 className="mb-4 text-lg font-semibold">
                  Your Information
                </h3>
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
                      <Input
                        id="date"
                        type="date"
                        className="pl-10"
                      />
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
                    <Label htmlFor="details">Additional Details (Optional)</Label>
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
            <h3 className="mb-6 text-2xl font-semibold tracking-tight">Contact us</h3>
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
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                />
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
            <h2 className="mb-3 text-3xl font-bold tracking-tight">Get in Touch</h2>
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
                    <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio / Website (Optional)</Label>
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
                        <div key={item.value} className="flex items-center gap-3">
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
                    We'll review your application and get back to you within 5 business days.
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
import { Calendar, ChefHat, MapPin, Users, UtensilsCrossed } from "lucide-react";

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
  { value: "stations", label: "Food Stations", description: "Interactive cooking" },
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
            From intimate dinners to grand celebrations, we'll create the perfect menu.
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
                            <RadioGroupItem value={style.value} id={`style-${style.value}`} className="sr-only" />
                            <span className="text-sm font-medium">{style.label}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{style.description}</span>
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
                        <div key={cuisine.id} className="flex items-center gap-2">
                          <Checkbox id={cuisine.id} />
                          <Label htmlFor={cuisine.id} className="text-sm font-normal">
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
                          <Label htmlFor={diet.id} className="text-sm font-normal">
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
                        <SelectItem value="100-150">$100-150 / person</SelectItem>
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
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
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
                      Minimum 25 guests. Custom menus available for all dietary needs.
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
                      className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:border-foreground has-[[data-state=checked]]:border-primary"
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
                      className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:border-foreground has-[[data-state=checked]]:border-primary"
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
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                />
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
                    <Label htmlFor="timeline">When are you looking to start?</Label>
                    <Select>
                      <SelectTrigger id="timeline">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMELINES.map((timeline) => (
                          <SelectItem key={timeline.value} value={timeline.value}>
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
  { value: "early", label: "Early Bird", price: "$99", originalPrice: "$149", available: true },
  { value: "standard", label: "Standard", price: "$149", originalPrice: null, available: true },
  { value: "vip", label: "VIP Access", price: "$299", originalPrice: null, available: true },
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
                    <Label htmlFor="special">Special Requirements (Optional)</Label>
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
          <h3 className="mb-2 text-xl font-semibold tracking-tight">Still need help?</h3>
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
                <Label>What is your feedback about? (Select all that apply)</Label>
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
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                />
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
import { Activity, Calendar, Dumbbell, Flame, Heart, Target, Timer, Trophy } from "lucide-react";

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
  { value: "weight-loss", label: "Lose Weight", icon: Flame, metric: "Burn fat" },
  { value: "muscle", label: "Build Muscle", icon: Dumbbell, metric: "Get stronger" },
  { value: "endurance", label: "Endurance", icon: Activity, metric: "Last longer" },
  { value: "tone", label: "Tone & Define", icon: Target, metric: "Look lean" },
  { value: "performance", label: "Performance", icon: Trophy, metric: "Compete" },
  { value: "wellness", label: "General Wellness", icon: Heart, metric: "Feel great" },
];

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner", description: "New to exercise or returning after long break", sessions: "2-3x/week recommended" },
  { value: "intermediate", label: "Intermediate", description: "Exercise regularly, know basic movements", sessions: "3-4x/week recommended" },
  { value: "advanced", label: "Advanced", description: "Consistent training, ready for intensity", sessions: "4-5x/week recommended" },
];

const TRAINING_FORMATS = [
  { value: "1on1", label: "1-on-1 Training", price: "$$$", description: "100% personalized attention" },
  { value: "semi", label: "Semi-Private (2-4)", price: "$$", description: "Small group, shared cost" },
  { value: "group", label: "Group Classes", price: "$", description: "Community & motivation" },
  { value: "online", label: "Online Coaching", price: "$$", description: "Train anywhere, anytime" },
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
            Whether you're just starting out or ready to level up, we'll build a plan that fits your life.
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
                      <Icon className={`mb-2 h-6 w-6 ${goal === fg.value ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-xs font-medium">{fg.label}</span>
                      <span className="text-[10px] text-muted-foreground">{fg.metric}</span>
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
                            <RadioGroupItem value={level.value} id={`exp-${level.value}`} />
                            <div>
                              <span className="text-sm font-medium">{level.label}</span>
                              <p className="text-xs text-muted-foreground">{level.description}</p>
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
                            <RadioGroupItem value={tf.value} id={`format-${tf.value}`} className="sr-only" />
                            <span className="text-sm font-medium">{tf.label}</span>
                            <span className="text-xs text-muted-foreground">{tf.price}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{tf.description}</span>
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
                        <div key={health.id} className="flex items-center gap-2">
                          <Checkbox id={health.id} />
                          <Label htmlFor={health.id} className="text-sm font-normal">
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
                          <Label htmlFor={time.id} className="text-sm font-normal">
                            <span className="mr-1">{time.icon}</span>
                            {time.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Desired Training Frequency</Label>
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
                    <Label htmlFor="motivation">What's Motivating You Right Now?</Label>
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
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
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
                          <SelectItem value="downtown">Downtown Studio</SelectItem>
                          <SelectItem value="westside">Westside Gym</SelectItem>
                          <SelectItem value="online">Online Only</SelectItem>
                          <SelectItem value="home">At My Home</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Free Fitness Assessment</span>
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
          <h2 className="mb-3 text-3xl font-bold tracking-tight">Get in Touch</h2>
          <p className="text-muted-foreground leading-relaxed">
            Have a question or want to work together? Fill out the form below
            and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="p-6 lg:p-8">
            <h3 className="mb-6 text-xl font-semibold tracking-tight">Send us a message</h3>
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
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
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
                        <Label htmlFor="parking-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id="parking-no" />
                        <Label htmlFor="parking-no" className="font-normal">No</Label>
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
                      Your host will be notified and a badge will be ready at reception
                    </p>
                  </div>

                  <Button className="w-full">Complete Registration</Button>

                  <p className="text-center text-xs text-muted-foreground">
                    You'll receive a confirmation email with check-in instructions.
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

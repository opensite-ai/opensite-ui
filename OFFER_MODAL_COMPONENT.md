```tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const OfferModal1 = () => {
  return (
    <Dialog defaultOpen modal={false}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(event) => event.preventDefault()}
        className="duration-400 data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full max-w-115 bottom-4 left-auto right-4 top-auto block h-fit max-h-dvh translate-x-0 translate-y-0 space-y-2.5 rounded-sm p-10"
      >
        <div className="absolute end-1.5 top-1.5">
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="text-muted-foreground text-xs uppercase"
              size="sm"
            >
              Close
            </Button>
          </DialogClose>
        </div>
        <DialogHeader>
          <DialogTitle className="text-start font-serif text-2xl font-normal leading-snug">
            Join our newsletter and enjoy 35% off your first order
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2.5">
          <Input type="email" placeholder="Email" />
          <Button className="w-full text-xs uppercase">subscribe</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { OfferModal1 };

```

```tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useGoogleFont } from "@/hooks/use-google-font";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormType = z.infer<typeof formSchema>;

type OfferModalData = {
  overline: string;
  title: string;
  description: string;
};

type Offermodal4Props = OfferModalData;

const OFFER_MODAL = {
  overline: "Treat Yourself!",
  title: "Become a Member & Enjoy 20% Off",
  description:
    "Sign up to receive our latest updates — you can unsubscribe whenever you like.",
};

const OfferModal4 = ({
  overline = OFFER_MODAL.overline,
  title = OFFER_MODAL.title,
  description = OFFER_MODAL.description,
}: Offermodal4Props) => {
  useGoogleFont("Oswald");
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  return (
    <Dialog defaultOpen>
      <DialogContent
        showCloseButton={false}
        style={
          {
            "--font-antonio": "Oswald, sans-serif",
          } as React.CSSProperties
        }
        className="data-[state=closed]:slide-out-to-bottom-30 data-[state=open]:slide-in-from-bottom-30 sm:max-w-190 lg:max-w-117.5 group max-h-[calc(100dvh-2rem)] max-w-full gap-0 rounded-none border-none p-0 max-lg:bottom-0 max-lg:top-auto max-lg:translate-y-0"
      >
        <div className="absolute -end-px -top-px">
          <DialogClose asChild>
            <Button
              size="icon-sm"
              className="origin-top-right rounded-none transition-all duration-300 lg:scale-50 lg:opacity-0 lg:group-hover:scale-100 lg:group-hover:opacity-100 [@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100"
            >
              <X />
            </Button>
          </DialogClose>
        </div>
        <div className="max-h-72.5 h-full overflow-hidden max-lg:hidden">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/promotional/Woman-with-Smartphone-2.png"
            alt="Woman shopping on her smartphone"
            className="block size-full object-cover object-[50%_15%]"
          />
        </div>
        <div className="lg:px-15 space-y-5 overflow-y-auto px-9 py-5 lg:py-7">
          <div className="space-y-2.5">
            <p className="font-antonio text-center text-sm font-bold uppercase leading-none">
              {overline}
            </p>
            <DialogTitle className="font-antonio text-center text-3xl font-bold">
              {title}
            </DialogTitle>
          </div>
          <Form {...form}>
            <form
              className="space-y-2.5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex items-center gap-2.5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <InputGroup>
                          <InputGroupInput
                            placeholder="Email Address"
                            {...field}
                          />
                          <InputGroupAddon align="inline-end">
                            <Mail />
                          </InputGroupAddon>
                        </InputGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button size="icon" type="submit" className="lg:hidden">
                  <ArrowRight />
                </Button>
              </div>
              <Button className="w-full max-lg:hidden" type="submit">
                Get Offer
              </Button>
            </form>
          </Form>
          <DialogFooter>
            <DialogDescription className="text-muted-foreground text-center text-xs leading-relaxed">
              {description}
            </DialogDescription>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { OfferModal4 };

```

```tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const OFFER_MODAL = {
  logo: {
    src: "https://cdn.ing/assets/files/record/286285/q7zi0j433fhs847rfbc82uaqydga",
    alt: "",
  },
  title: "Join Now & Enjoy 20% Off",
  description:
    "Join our mailing list for updates and offers. You can unsubscribe at any time.",
  image: {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/promotional/Cozy-Smartphone-Interaction-2.png",
    alt: "",
  },
};

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type Image = {
  src: string;
  alt: string;
};

type FormType = z.infer<typeof formSchema>;

type OfferModalData = {
  logo: Image;
  image: Image;
  title: string;
  description: string;
};

type Offermodal5Props = OfferModalData;

const OfferModal5 = ({
  title = OFFER_MODAL.title,
  logo = OFFER_MODAL.logo,
  description = OFFER_MODAL.description,
  image = OFFER_MODAL.image,
}: Offermodal5Props) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  return (
    <Sheet defaultOpen>
      <SheetContent className="md:max-w-150 w-full max-md:!max-w-[calc(100dvw-2.5rem)] [&>button:hover>svg]:rotate-180 [&>button>svg]:size-5 [&>button>svg]:transition-all">
        <div className="max-h-full overflow-y-auto">
          <div className="space-y-4 p-6 md:p-16">
            <div className="basis-1/2 space-y-8">
              <SheetHeader className="gap-8 p-0">
                {logo && (
                  <img
                    src={logo.src}
                    alt={logo.src}
                    className="size-11 lg:size-16 dark:invert"
                  />
                )}
                <div className="space-y-4">
                  <SheetTitle className="text-2xl font-medium leading-tight md:text-3xl lg:text-4xl">
                    {title}
                  </SheetTitle>
                  <SheetDescription className="text-xl leading-tight">
                    {description}
                  </SheetDescription>
                </div>
              </SheetHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex items-start gap-3 max-sm:flex-col">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full flex-1">
                          <FormControl>
                            <Input
                              className="h-10 rounded-full px-6"
                              placeholder="Email Address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      size="lg"
                      className="sm:basis-30 rounded-full max-sm:w-full"
                    >
                      Join
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            <p className="text-muted-foreground text-xs">
              By signing up, you consent to our{" "}
              <a href="#" className="underline-offset-3 underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="underline-offset-3 underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <div className="h-1/2 basis-1/2">
            <AspectRatio ratio={1} className="overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="block size-full object-cover object-center"
              />
            </AspectRatio>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { OfferModal5 };

```

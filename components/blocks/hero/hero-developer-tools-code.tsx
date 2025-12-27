"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";

export interface HeroDeveloperToolsCodeProps {
  className?: string;
}

export function HeroDeveloperToolsCode({
  className,
}: HeroDeveloperToolsCodeProps): React.JSX.Element {
  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <Badge variant="outline" className="w-fit">
              <DynamicIcon name="lucide/terminal" size={14} className="mr-1" />
              Developer Tools
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Build faster with modern developer tools
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to build production-ready applications.
              Type-safe APIs, real-time subscriptions, and powerful CLI tools.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Pressable
                href="#"
                asButton
                variant="default"
                size="lg"
              >
                Get started
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
              <Pressable
                href="#"
                asButton
                variant="outline"
                size="lg"
              >
                <DynamicIcon name="lucide/github" size={16} className="mr-2" />
                View on GitHub
              </Pressable>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-border bg-zinc-950 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center text-sm text-zinc-500">
                  terminal
                </div>
              </div>
              <div className="p-4 font-mono text-sm">
                <div className="text-zinc-500">$ npx create-app@latest</div>
                <div className="mt-2 text-green-400">
                  Creating a new app in ./my-app
                </div>
                <div className="mt-1 text-zinc-400">
                  Installing dependencies...
                </div>
                <div className="mt-1 text-zinc-400">
                  <span className="text-blue-400">info</span> Using npm
                </div>
                <div className="mt-1 text-zinc-400">
                  <span className="text-green-400">success</span> Installed 127 packages
                </div>
                <div className="mt-2 text-zinc-500">$ npm run dev</div>
                <div className="mt-1 text-green-400">
                  Ready on http://localhost:3000
                </div>
                <div className="mt-2 flex items-center">
                  <span className="text-zinc-500">$</span>
                  <span className="ml-1 h-4 w-2 animate-pulse bg-zinc-400"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

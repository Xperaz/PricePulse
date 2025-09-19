"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarClock,
  PieChart,
  Sparkles,
} from "lucide-react";

export default function AnalyticsPage() {
  const projected = [
    {
      label: "Conversion Rate Tracking",
      icon: <PieChart className="size-4" />,
    },
    {
      label: "Top Performing Products",
      icon: <BarChart3 className="size-4" />,
    },
    { label: "Geo Revenue Breakdown", icon: <Sparkles className="size-4" /> },
    {
      label: "Time‑to‑Purchase Insights",
      icon: <CalendarClock className="size-4" />,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 space-y-10">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <span className="inline-block size-2 rounded-full bg-green-400 animate-pulse" />
          Analytics Preview
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Analytics Dashboard <span className="text-primary">Coming Soon</span>
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
          We are building a powerful analytics layer to help you understand
          product performance, user geography, and real conversion paths. While
          we finish things up, here is a preview of what you can expect.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="size-4 text-primary" /> Planned Metrics
            </CardTitle>
            <CardDescription>
              Key insights shipping in the first release.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {projected.map((item) => (
                <li key={item.label} className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">{item.icon}</span>
                  <span className="text-muted-foreground">{item.label}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="size-4 text-primary" /> Sample Funnel
            </CardTitle>
            <CardDescription>Illustrative placeholder values.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span>Visits</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span>Banner Views</span>
                <span>72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span>Clicks</span>
                <span>38%</span>
              </div>
              <Progress value={38} className="h-2" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span>Conversions</span>
                <span>9%</span>
              </div>
              <Progress value={9} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="size-4 text-primary" /> Get Notified
            </CardTitle>
            <CardDescription>Join the early access list.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-3"
              action={() => {
                /* TODO: integrate action later */
              }}
            >
              <Input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="h-10"
              />
              <Button type="submit" className="w-full">
                Notify Me <ArrowRight className="size-4 ml-1" />
              </Button>
              <p className="text-[11px] text-muted-foreground leading-snug">
                We’ll only email you about the analytics launch. No spam.
              </p>
            </form>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Interface Preview (Placeholder)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden border-dashed">
              <CardHeader className="space-y-2">
                <div className="h-4 w-28 rounded bg-muted animate-pulse" />
                <div className="h-6 w-16 rounded bg-muted animate-pulse" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-3 w-full rounded bg-muted animate-pulse" />
                <div className="h-3 w-5/6 rounded bg-muted animate-pulse" />
                <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="pt-4 text-center text-xs text-muted-foreground">
        <p>Building the next analytics experience. Your feedback is welcome.</p>
      </footer>
    </div>
  );
}

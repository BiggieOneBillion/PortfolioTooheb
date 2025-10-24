// app/components/admin-creation-form.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";

import { AdminSchema, AdminFormValues } from "@/lib/validations/admin";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

function strengthLabel(score: number) {
  // score: 0..4
  switch (score) {
    case 0:
    case 1:
      return "Weak";
    case 2:
      return "Fair";
    case 3:
      return "Good";
    case 4:
      return "Strong";
    default:
      return "";
  }
}

export default function AdminCreationForm() {
  const form = useForm<AdminFormValues>({
    resolver: zodResolver(AdminSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  // password value tracked to compute strength
  const passwordValue = form.watch("password", "");

  // compute zxcvbn result (memoized)
  const zxcvbnResult = useMemo(
    () => zxcvbn(passwordValue || ""),
    [passwordValue]
  );

  // score 0..4
  const score = zxcvbnResult.score;
  const feedback = zxcvbnResult.feedback; // suggestions/warnings

  async function onSubmit(values: AdminFormValues) {
    try {
      // example: POST to your API endpoint (adjust route as needed)
      const res = await fetch("/api/auth/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        toast.error(errorBody?.message || "Failed to create admin");
        return;
      }

      const data = await res.json();
      console.log("Success:", data);
      toast.success("Admin created successfully!");
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto pt-5 pb-10"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormDescription>Your admin email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>

              {/* Password strength UI */}
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    Strength: <strong>{strengthLabel(score)}</strong>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {zxcvbnResult.feedback?.warning || ""}
                  </div>
                </div>

                {/* Progress bar (simple) */}
                <div className="h-2 bg-slate-200 rounded mt-2 overflow-hidden">
                  <div
                    style={{ width: `${(score / 4) * 100}%` }}
                    className={`h-full transition-all ${
                      score <= 1
                        ? "bg-red-500"
                        : score === 2
                        ? "bg-yellow-500"
                        : score === 3
                        ? "bg-emerald-400"
                        : "bg-emerald-600"
                    }`}
                  />
                </div>

                {/* Suggestions */}
                {feedback.suggestions && feedback.suggestions.length > 0 && (
                  <ul className="mt-2 text-xs">
                    {feedback.suggestions.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                )}
              </div>

          {/* <FormDescription>Enter your password.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormDescription>Re-enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

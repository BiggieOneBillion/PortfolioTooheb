"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { is } from "date-fns/locale";
import AdminCreationForm from "./admin-creation-form";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await apiClient.post("/auth/login", { password });
      return response.data;
    },
    onSuccess: (data) => {
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${data.email}`,
      });
      // Navigate to OTP verification page
      router.push("/admin/verify-otp");
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid password",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      toast({
        title: "Error",
        description: "Please enter your password",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate(password);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["check-auth"],
    queryFn: async () => {
      const response = await apiClient.get("/auth/check");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#234a56]" />
      </div>
    );
  }

  if (isError) {
    toast({
      title: "Error",
      description: "Failed to check authentication status",
      variant: "destructive",
    });
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load. Please try again later.</p>
      </div>
    );
  }

  console.log("Auth check data:", data);

  if (data && data.exists) {
    return (
      <div className="min-h-full flex items-center justify-center bg-[#ede4d2] p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your password to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loginMutation.isPending}
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Demo credentials:</p>
              <p className="font-mono">Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section>
      <div className="min-h-full flex items-center justify-center bg-[#ede4d2] p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create Admin Account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to create an admin account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminCreationForm />
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Note:</p>
              <p className="font-mono">
                Save this credentials. Once saved cannot be changed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

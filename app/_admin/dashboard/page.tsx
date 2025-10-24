"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogOut, Home, User, Mail } from "lucide-react";
import HomeContentEditor from "@/components/admin/home-contact-editor";
import AboutContentEditor from "@/components/admin/about-content-editor";
import ContactContentEditor from "@/components/admin/contact-content-editor";

export default function AdminDashboardPage() {
  const { session, isLoading, isAuthenticated, logout, isLoggingOut } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ede4d2]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#ede4d2] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#30586C]">
              Portfolio Content Manager
            </h1>
            <p className="text-muted-foreground mt-1">
              Customize your portfolio website content
            </p>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            disabled={isLoggingOut}
            className="bg-white"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="home" className="space-y-4">
          <TabsList className="bg-white">
            <TabsTrigger value="home">
              <Home className="mr-2 h-4 w-4" />
              Home Page
            </TabsTrigger>
            <TabsTrigger value="about">
              <User className="mr-2 h-4 w-4" />
              About Page
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Page
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <HomeContentEditor />
          </TabsContent>

          <TabsContent value="about">
            <AboutContentEditor />
          </TabsContent>

          <TabsContent value="contact">
            <ContactContentEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

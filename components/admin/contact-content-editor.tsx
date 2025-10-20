"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Smartphone, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { diffObjects, patchToSet } from "@/lib/transformers/home";
import useGetSiteData from "@/hooks/use-get-sitedata";

export default function ContactContentEditor() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeView, setActiveView] = useState<"mobile" | "desktop">("mobile");

  const { contactData, isLoadingContactData } = useGetSiteData();

  const updateMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      const old = queryClient.getQueryData<any>(["contact-content"]);
      const patch = diffObjects(old, updatedData);
      const nested = patchToSet(patch);
      const response = await apiClient.put("/content/contact", nested);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-content"] });
      toast({
        title: "Success",
        description: "Contact page content updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    },
  });

  const [formData, setFormData] = useState(contactData || {});

  if (contactData && !formData.mobile) {
    setFormData(contactData);
  }

  const handleUpdate = (
    view: "mobile" | "desktop",
    field: string,
    value: any
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [view]: {
        ...prev[view],
        [field]: value,
      },
    }));
  };

  const handleParagraphUpdate = (
    view: "mobile" | "desktop",
    index: number,
    value: string
  ) => {
    setFormData((prev: any) => {
      const paragraphs = [...(prev[view]?.paragraphs || [])];
      paragraphs[index] = value;
      return {
        ...prev,
        [view]: {
          ...prev[view],
          paragraphs,
        },
      };
    });
  };

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  if (isLoadingContactData) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Contact Page Content</CardTitle>
          <CardDescription>
            Customize content for mobile and desktop views
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeView}
            onValueChange={(v) => setActiveView(v as "mobile" | "desktop")}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="mobile">
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile View
              </TabsTrigger>
              <TabsTrigger value="desktop">
                <Monitor className="mr-2 h-4 w-4" />
                Desktop View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mobile" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Header Section</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Heading</Label>
                    <Input
                      value={formData.mobile?.heading || ""}
                      onChange={(e) =>
                        handleUpdate("mobile", "heading", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Header Image URL</Label>
                    <Input
                      value={formData.mobile?.image || ""}
                      onChange={(e) =>
                        handleUpdate("mobile", "image", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Content Paragraphs</h3>
                {formData.mobile?.paragraphs?.map(
                  (paragraph: string, index: number) => (
                    <div key={index} className="space-y-2">
                      <Label>Paragraph {index + 1}</Label>
                      <Textarea
                        rows={3}
                        value={paragraph}
                        onChange={(e) =>
                          handleParagraphUpdate("mobile", index, e.target.value)
                        }
                      />
                    </div>
                  )
                )}
              </div>
            </TabsContent>

            <TabsContent value="desktop" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Header Section</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Heading</Label>
                    <Input
                      value={formData.desktop?.heading || ""}
                      onChange={(e) =>
                        handleUpdate("desktop", "heading", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Header Image URL</Label>
                    <Input
                      value={formData.desktop?.image || ""}
                      onChange={(e) =>
                        handleUpdate("desktop", "image", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Content Paragraphs</h3>
                {formData.desktop?.paragraphs?.map(
                  (paragraph: string, index: number) => (
                    <div key={index} className="space-y-2">
                      <Label>Paragraph {index + 1}</Label>
                      <Textarea
                        rows={3}
                        value={paragraph}
                        onChange={(e) =>
                          handleParagraphUpdate(
                            "desktop",
                            index,
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

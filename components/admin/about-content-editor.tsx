"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../lib/api-client";
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
import { diffObjects, patchToSet } from "@/lib/transformers/about";
import useGetSiteData from "@/hooks/use-get-sitedata";
import Image from "next/image";

export default function AboutContentEditor() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeView, setActiveView] = useState<"mobile" | "desktop">("mobile");

  const { aboutData, isLoadingAboutData } = useGetSiteData();

  const updateMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      const old = queryClient.getQueryData<any>(["about-content"]);
      const patch = diffObjects(old, updatedData);
      const nested = patchToSet(patch);
      const response = await apiClient.put("/content/about", nested);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about-content"] });
      toast({
        title: "Success",
        description: "About page content updated successfully",
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

  const [formData, setFormData] = useState(aboutData || {});

  if (aboutData && !formData.mobile) {
    setFormData(aboutData);
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

  const handleImageUpdate = (
    view: "mobile" | "desktop",
    imageNumber: number,
    value: string
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [view]: {
        ...prev[view],
        images: [...prev[view]?.images].toSpliced(imageNumber, 1, value),
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

  if (isLoadingAboutData) {
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
          <CardTitle>About Page Content</CardTitle>
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
                    <Label>Subtitle</Label>
                    <Input
                      value={formData.mobile?.subtitle || ""}
                      onChange={(e) =>
                        handleUpdate("mobile", "subtitle", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">About Paragraphs</h3>
                {formData.mobile?.paragraphs?.map(
                  (paragraph: string, index: number) => (
                    <div key={index} className="space-y-2">
                      <Label>Paragraph {index + 1}</Label>
                      <Textarea
                        rows={4}
                        value={paragraph}
                        onChange={(e) =>
                          handleParagraphUpdate("mobile", index, e.target.value)
                        }
                      />
                    </div>
                  )
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Why Choose Me Section</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Section Heading</Label>
                    <Input
                      value={formData.mobile?.whyChooseMe?.heading || ""}
                      onChange={(e) =>
                        handleUpdate("mobile", "whyChooseMe", {
                          ...formData.mobile?.whyChooseMe,
                          heading: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Closing Text</Label>
                    <Textarea
                      rows={3}
                      value={formData.mobile?.whyChooseMe?.closingText || ""}
                      onChange={(e) =>
                        handleUpdate("mobile", "whyChooseMe", {
                          ...formData.mobile?.whyChooseMe,
                          closingText: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
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
                    <Label>Subtitle</Label>
                    <Input
                      value={formData.desktop?.subtitle || ""}
                      onChange={(e) =>
                        handleUpdate("desktop", "subtitle", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">About Paragraphs</h3>
                {formData.desktop?.paragraphs?.map(
                  (paragraph: string, index: number) => (
                    <div key={index} className="space-y-2">
                      <Label>Paragraph {index + 1}</Label>
                      <Textarea
                        rows={4}
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

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Why Choose Me Section</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Section Heading</Label>
                    <Input
                      value={formData.desktop?.whyChooseMe?.heading || ""}
                      onChange={(e) =>
                        handleUpdate("desktop", "whyChooseMe", {
                          ...formData.desktop?.whyChooseMe,
                          heading: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Content Text</Label>
                    <Textarea
                      rows={6}
                      value={formData.desktop?.whyChooseMe?.text || ""}
                      onChange={(e) =>
                        handleUpdate("desktop", "whyChooseMe", {
                          ...formData.desktop?.whyChooseMe,
                          text: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Additional Images</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {formData?.desktop?.images?.map((num: string, i: number) => (
                        <div key={i} className="space-y-2">
                          <Label>Image {i + 1} URL</Label>
                          <Input
                            value={formData?.desktop?.images[i] || ""}
                            onChange={(e) =>
                              handleImageUpdate("desktop", i, e.target.value)
                            }
                          />
                          <div className="relative aspect-square h-[300px] w-full overflow-hidden rounded-lg border">
                            <Image
                              src={
                                formData?.desktop?.images[i] ||
                                "/placeholder-user.jpg"
                              }
                              alt={`Additional image ${i}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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

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
import Image from "next/image";
import {
  diffObjects,
  dotPatchToNested,
  patchToSet,
} from "@/lib/transformers/home";
import useGetSiteData from "@/hooks/use-get-sitedata";

export default function HomeContentEditor() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeView, setActiveView] = useState<"mobile" | "desktop">("mobile");

  const { homeData, isLoadingHomeData } = useGetSiteData();

  const updateMutation = useMutation({
    mutationFn: async (updatedData: any) => {
      const old = queryClient.getQueryData<any>(["home-content"]);
      const patch = diffObjects(old, updatedData);
      const nested = patchToSet(patch);
      const response = await apiClient.put("/content/home", nested);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["home-content"] });
      toast({
        title: "Success",
        description: "Home page content updated successfully",
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

  const [formData, setFormData] = useState(homeData || {});

  // Update form data when query data loads
  if (homeData && !formData.mobile) {
    setFormData(homeData);
  }

  const handleUpdate = (
    view: "mobile" | "desktop",
    section: string,
    field: string,
    value: any
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [view]: {
        ...prev[view],
        [section]: {
          ...prev[view]?.[section],
          [field]: value,
        },
      },
    }));
  };

  const handleArrayUpdate = (
    view: "mobile" | "desktop",
    section: string,
    field: string,
    index: number,
    value: string
  ) => {
    setFormData((prev: any) => {
      const currentArray = prev[view]?.[section]?.[field] || [];
      const newArray = [...currentArray];
      newArray[index] = value;
      return {
        ...prev,
        [view]: {
          ...prev[view],
          [section]: {
            ...prev[view]?.[section],
            [field]: newArray,
          },
        },
      };
    });
  };

  const handleServiceUpdate = (
    view: "mobile" | "desktop",
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    setFormData((prev: any) => {
      const services = [...(prev[view]?.cta?.services || [])];
      services[index] = { ...services[index], [field]: value };
      return {
        ...prev,
        [view]: {
          ...prev[view],
          cta: {
            ...prev[view]?.cta,
            services,
          },
        },
      };
    });
  };

  const handleCarouselImageUpdate = (index: number, value: string) => {
    setFormData((prev: any) => {
      const images = [...(prev.mobile?.hero?.carouselImages || [])];
      images[index] = value;
      return {
        ...prev,
        mobile: {
          ...prev.mobile,
          hero: {
            ...prev.mobile?.hero,
            carouselImages: images,
          },
        },
      };
    });
  };

  const handleSave = () => {
    // console.log(formData)
    updateMutation.mutate(formData);
  };

  if (isLoadingHomeData) {
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
          <CardTitle>Home Page Content</CardTitle>
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
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Hero Section</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Title Line 1</Label>
                    <Input
                      value={formData.mobile?.hero?.title?.[0] || ""}
                      onChange={(e) =>
                        handleArrayUpdate(
                          "mobile",
                          "hero",
                          "title",
                          0,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title Line 2</Label>
                    <Input
                      value={formData.mobile?.hero?.title?.[1] || ""}
                      onChange={(e) =>
                        handleArrayUpdate(
                          "mobile",
                          "hero",
                          "title",
                          1,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Animated Words (comma separated)</Label>
                    <Input
                      value={
                        formData.mobile?.hero?.animatedWords?.join(", ") || ""
                      }
                      onChange={(e) =>
                        handleUpdate(
                          "mobile",
                          "hero",
                          "animatedWords",
                          e.target.value.split(",").map((s: string) => s.trim())
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Carousel Images</Label>
                    <div className="grid grid-cols-2 gap-10">
                      {[0, 1, 2].map((index) => (
                        <div key={index} className="space-y-2">
                          <Input
                            value={
                              formData.mobile?.hero?.carouselImages?.[index] ||
                              ""
                            }
                            onChange={(e) =>
                              handleCarouselImageUpdate(index, e.target.value)
                            }
                          />
                          <div className="relative h-[200px] w-full overflow-hidden rounded-lg border">
                            <Image
                              src={
                                formData.mobile?.hero?.carouselImages?.[
                                  index
                                ] || "/placeholder-user.jpg"
                              }
                              alt={`Carousel image ${index + 1}`}
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

              {/* Description Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Description Section</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Heading</Label>
                    <Input
                      value={formData.mobile?.description?.heading || ""}
                      onChange={(e) =>
                        handleUpdate(
                          "mobile",
                          "description",
                          "heading",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description Text</Label>
                    <Textarea
                      rows={4}
                      value={formData.mobile?.description?.text || ""}
                      onChange={(e) =>
                        handleUpdate(
                          "mobile",
                          "description",
                          "text",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description Images</Label>
                    <div className="grid grid-cols-2 gap-10">
                      {[0, 1].map((index) => (
                        <div key={index} className="space-y-2">
                          <Input
                            value={
                              formData.mobile?.description?.images?.[index] ||
                              ""
                            }
                            onChange={(e) =>
                              handleArrayUpdate(
                                "mobile",
                                "description",
                                "images",
                                index,
                                e.target.value
                              )
                            }
                          />
                          <div className="relative h-[200px] w-full overflow-hidden rounded-lg border">
                            <Image
                              src={
                                formData.mobile?.description?.images?.[index] ||
                                "/placeholder-user.jpg"
                              }
                              alt={`Description image ${index + 1}`}
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

              {/* Photo Grid Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Photo Grid</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
                    <div key={index} className="space-y-2">
                      <Label>Image {index + 1}</Label>
                      <Input
                        value={
                          formData.mobile?.photoGrid?.images?.[index] || ""
                        }
                        onChange={(e) =>
                          handleArrayUpdate(
                            "mobile",
                            "photoGrid",
                            "images",
                            index,
                            e.target.value
                          )
                        }
                      />
                      <div className="relative aspect-square h-[200px] w-full overflow-hidden rounded-lg border">
                        <Image
                          src={
                            formData.mobile?.photoGrid?.images?.[index] ||
                            "/placeholder-user.jpg"
                          }
                          alt={`Grid image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="desktop" className="space-y-6">
              {/* Hero Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Hero Section</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Heading</Label>
                    <Input
                      value={formData.desktop?.hero?.heading || ""}
                      onChange={(e) =>
                        handleUpdate(
                          "desktop",
                          "hero",
                          "heading",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      rows={3}
                      value={formData.desktop?.hero?.description || ""}
                      onChange={(e) =>
                        handleUpdate(
                          "desktop",
                          "hero",
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-10">
                    <div className="space-y-2">
                      <Label>Left Image URL</Label>
                      <Input
                        value={formData.desktop?.hero?.leftImage || ""}
                        onChange={(e) =>
                          handleUpdate(
                            "desktop",
                            "hero",
                            "leftImage",
                            e.target.value
                          )
                        }
                      />
                      <Image
                        src={
                          formData.desktop?.hero?.leftImage ||
                          "/placeholder-user.jpg"
                        }
                        alt="Left hero image"
                        height={100}
                        width={100}
                        className="h-[200px]  w-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Center Image URL</Label>
                      <Input
                        value={formData.desktop?.hero?.centerImage || ""}
                        onChange={(e) =>
                          handleUpdate(
                            "desktop",
                            "hero",
                            "centerImage",
                            e.target.value
                          )
                        }
                      />
                      <Image
                        src={
                          formData.desktop?.hero?.centerImage ||
                          "/placeholder-user.jpg"
                        }
                        alt="Left hero image"
                        height={100}
                        width={100}
                        className="h-[200px] w-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Right Image URL</Label>
                      <Input
                        value={formData.desktop?.hero?.rightImage || ""}
                        onChange={(e) =>
                          handleUpdate(
                            "desktop",
                            "hero",
                            "rightImage",
                            e.target.value
                          )
                        }
                      />
                      <Image
                        src={
                          formData.desktop?.hero?.rightImage ||
                          "/placeholder-user.jpg"
                        }
                        alt="Left hero image"
                        height={100}
                        width={100}
                        className="h-[200px] w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Services Section</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Section Heading</Label>
                    <Input
                      value={formData.desktop?.cta?.heading || ""}
                      onChange={(e) =>
                        handleUpdate(
                          "desktop",
                          "cta",
                          "heading",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  {formData.desktop?.cta?.services?.map(
                    (service: any, index: number) => (
                      <Card key={index} className="p-4">
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label>Service {index + 1} Title</Label>
                            <Input
                              value={service.title}
                              onChange={(e) =>
                                handleServiceUpdate(
                                  "desktop",
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Service {index + 1} Description</Label>
                            <Textarea
                              rows={3}
                              value={service.description}
                              onChange={(e) =>
                                handleServiceUpdate(
                                  "desktop",
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </Card>
                    )
                  )}
                </div>
              </div>
              {/* Additional image section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Images</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <div key={num} className="space-y-2">
                      <Label>Image {num} URL</Label>
                      <Input
                        value={
                          formData.desktop?.imageGallery?.[`image${num}`] || ""
                        }
                        onChange={(e) =>
                          handleUpdate(
                            "desktop",
                            "imageGallery",
                            `image${num}`,
                            e.target.value
                          )
                        }
                      />
                      <div className="relative aspect-square h-[300px] w-full overflow-hidden rounded-lg border">
                        <Image
                          src={
                            formData.desktop?.imageGallery?.[`image${num}`] ||
                            "/placeholder-user.jpg"
                          }
                          alt={`Additional image ${num}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
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

// // example client-side function (React)
// async function updateHomePage(formInputs: {
//   textFields: { [key: string]: any }; // keys in dot-notation
//   imageFiles: { [key: string]: File[] | File }; // keys in dot-notation
// }) {
//   const fd = new FormData();

//   // append text fields (if arrays/objects, stringify)
//   for (const [key, val] of Object.entries(formInputs.textFields)) {
//     if (val === undefined || val === null) continue;
//     if (typeof val === "object") {
//       fd.append(key, JSON.stringify(val));
//     } else {
//       fd.append(key, String(val));
//     }
//   }

//   // append files
//   for (const [key, files] of Object.entries(formInputs.imageFiles)) {
//     if (Array.isArray(files)) {
//       for (const f of files) fd.append(key, f);
//     } else if (files) {
//       fd.append(key, files);
//     }
//   }

//   const res = await fetch("/api/homepage/update", {
//     method: "POST",
//     body: fd,
//   });

//   const json = await res.json();
//   return json;
// }

// // Example usage:
// const textFields = {
//   "mobile.hero.title": ["Empower", "Build"],
//   "mobile.description.heading": "New heading",
//   "desktop.hero.heading": "Desktop heading",
// };

// const imageFiles = {
//   // send multiple images under 'mobile.hero.carouselImages'
//   "mobile.hero.carouselImages": [file1, file2],
//   // send single image under 'desktop.hero.leftImage'
//   "desktop.hero.leftImage": fileSingle,
// };

// await updateHomePage({ textFields, imageFiles });

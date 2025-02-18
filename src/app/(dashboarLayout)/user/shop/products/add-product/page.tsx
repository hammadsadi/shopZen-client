"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ShopZenLogo from "@/components/shared/Logo/ShopZenLogo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SZImageUpload from "@/components/ui/core/SZImageUpload";
import SHImagePreview from "@/components/ui/core/SZImageUpload/SHImagePreview";
import { toast } from "sonner";
import { createShop } from "@/services/Shop";
import { LoaderCircle } from "lucide-react";
const AddProductPage = () => {
  const [imageFiels, setImageFiels] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm();
  const {
    formState: { isSubmitting },
  } = form;

  // Register Form Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Remove White Space and Empty String
    const servicesOffered = data?.servicesOffered
      ?.split(",")
      .map((service: string) => service.trim())
      .filter((item: string) => item !== '""' && item !== "''" && item !== "");

    // Modefied Data
    const modifiedData = {
      ...data,
      servicesOffered: servicesOffered,
      establishedYear: Number(data?.establishedYear),
    };

    try {
      // Append Data
      const formData = new FormData();
      formData.append("data", JSON.stringify(modifiedData));
      formData.append("logo", imageFiels[0] as File);
      const res = await createShop(formData);
      // Toast Handle
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="max-w-4xl w-full bg-white border p-7 md:p-10 rounded my-4">
          <div className="flex gap-2 border-b pb-3 mb-6">
            <ShopZenLogo />
            <div className="space-y-1">
              <h2 className="font-bold text-lg md:text-2xl">Add Product</h2>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Price</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shop.shopName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shop Name</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brand.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand Name</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* {imagePreview?.length > 0 ? (
                <div className="mt-4">
                  <SHImagePreview
                    setImageFiels={setImageFiels}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    className="flex justify-center"
                  />
                </div>
              ) : (
                <div className="mt-4">
                  <SZImageUpload
                    imageFiels={imageFiels}
                    setImageFiels={setImageFiels}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    imageFileLabel="Upload Logo"
                  />
                </div>
              )} */}

              {imagePreview?.length > 0 && (
                <div className="mt-4">
                  <SHImagePreview
                    setImageFiels={setImageFiels}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    className="flex justify-center"
                  />
                </div>
              )}
              {imagePreview.length < 3 ? (
                <div className="mt-4">
                  <SZImageUpload
                    imageFiels={imageFiels}
                    setImageFiels={setImageFiels}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    imageFileLabel="Upload Logo"
                  />
                </div>
              ) : (
                ""
              )}
              <Button type="submit" className="w-full mt-2">
                {isSubmitting ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;

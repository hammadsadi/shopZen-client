"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import ShopZenLogo from "@/components/shared/Logo/ShopZenLogo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SZImageUpload from "@/components/ui/core/SZImageUpload";
import SHImagePreview from "@/components/ui/core/SZImageUpload/SHImagePreview";
import { toast } from "sonner";
import { LoaderCircle, PlusIcon } from "lucide-react";
import { TCategory, TProduct } from "@/types";
import { getAllCategory } from "@/services/Category";
import { getAllBrand } from "@/services/Brand";
import { TBrand } from "@/types/brand.types";
import { updateProduct } from "@/services/Product";
import { useRouter } from "next/navigation";
const UpdateProductForm = ({product}:{product:TProduct}) => {
  const [imageFiels, setImageFiels] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>(product?.imageUrls || []);
  const [categoriesData, setCategoriesData] = useState<TCategory[] | []>([]);
  const [brandsData, setBrandsData] = useState<TBrand[] | []>([]);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || "",
      stock: product?.stock || "",
      weight: product?.weight || "",
      category: product?.category?._id || "",
      brand: product?.brand?._id || "",
      availableColors: product?.availableColors?.map((color) => ({
        value: color,
      })) || [{ value: "" }],
      keyFeatures: product?.keyFeatures?.map((feature) => ({
        value: feature,
      })) || [{ value: "" }],
      specification: Object.entries(product?.specification || {}).map(
        ([key, value]) => ({ key, value })
      ) || [{ key: "", value: "" }],
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  // Dynamic Colors Field Add
  const { append: colorAppend, fields: colorField } = useFieldArray({
    control: form.control,
    name: "availableColors",
  });
  // Set Color Field Value
  const addColor = () => {
    colorAppend({ value: "" });
  };

  // DynamicKey Features Fields Add
  const { append: keyFeaturesAppend, fields: keyFeaturesField } = useFieldArray(
    {
      control: form.control,
      name: "keyFeatures",
    }
  );

  // Set Ke Features Value
  const addKeyFeature = () => {
    keyFeaturesAppend({ value: "" });
  };

  // Add Specification Dynamically
  const { append: appendSpecification, fields: fieldSpecification } =
    useFieldArray({
      control: form.control,
      name: "specification",
    });

  // Add specification
  const addSpecification = () => {
    appendSpecification({ key: "", value: "" });
  };

  // Get Categories
  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData, brandsData] = await Promise.all([
        getAllCategory(),
        getAllBrand(),
      ]);
      setBrandsData(brandsData?.data);
      setCategoriesData(categoriesData?.data);
    };
    fetchData();
  }, []);

  // Handle Submit Product Add Form
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Modify Available Colors
    const availableColors = data?.availableColors?.map(
      (color: { value: string }) => color.value
    );
    // Modify Key Features
    const keyFeatures = data?.keyFeatures?.map(
      (kFeature: { value: string }) => kFeature.value
    );
    // Modify Specification
    const specification: { [key: string]: string } = {};
    data?.specification?.forEach(
      (item: { key: string; value: string }) =>
        (specification[item.key] = item.value)
    );
    // Modefied Data
    const modifiedData = {
      ...data,
      availableColors,
      keyFeatures,
      specification,
      price: parseFloat(data?.price),
      stock: parseInt(data?.stock),
      weight: parseFloat(data?.weight),
    };

    try {
      // Append Data
      const formData = new FormData();
      formData.append("data", JSON.stringify(modifiedData));
      // Append Multitple Images inside the Form Data
      for (const file of imageFiels) {
        formData.append("images", file);
      }
      const res = await updateProduct(formData, product?._id);
      // Toast Handle
      if (res?.success) {
        toast.success(res?.message);
        router.push("/user/shop/products");
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
              <h2 className="font-bold text-lg md:text-2xl">Update Product</h2>
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Product Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoriesData?.map((cat) => (
                            <SelectItem key={cat?._id} value={cat?._id}>
                              {cat?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Product Brand" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {brandsData?.map((brand) => (
                            <SelectItem key={brand?._id} value={brand?._id}>
                              {brand?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Key Features */}
                <div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Key Features</p>
                    <Button
                      onClick={addKeyFeature}
                      variant="outline"
                      className="size-8"
                      type="button"
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                  <div>
                    {keyFeaturesField?.map((item, idx) => (
                      <div key={item?.id}>
                        <FormField
                          control={form.control}
                          name={`keyFeatures.${idx}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Key Features {idx + 1}</FormLabel>
                              <FormControl>
                                <Input {...field} value={field.value || ""} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Available Colors */}
                <div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">Available Colors</p>
                    <Button
                      onClick={addColor}
                      variant="outline"
                      className="size-8"
                      type="button"
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                  <div>
                    {colorField?.map((item, idx) => (
                      <div key={item?.id}>
                        <FormField
                          control={form.control}
                          name={`availableColors.${idx}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color {idx + 1}</FormLabel>
                              <FormControl>
                                <Input {...field} value={field.value || ""} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>

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
              {/* Specification */}
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <p className="font-bold">Specification</p>
                  <Button
                    onClick={addSpecification}
                    variant="outline"
                    className="size-8"
                    type="button"
                  >
                    <PlusIcon />
                  </Button>
                </div>
                {fieldSpecification?.map((spcf, idx) => (
                  <div
                    key={spcf?.id}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3 "
                  >
                    <FormField
                      control={form.control}
                      name={`specification.${idx}.key`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Feature Name {idx + 1}</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`specification.${idx}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Feature Description {idx + 1}</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
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
                  "Update"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductForm;

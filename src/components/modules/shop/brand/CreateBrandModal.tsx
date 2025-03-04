"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import SHImagePreview from "@/components/ui/core/SZImageUpload/SHImagePreview";
import SZImageUpload from "@/components/ui/core/SZImageUpload";
import { useState } from "react";
import { toast } from "sonner";
import { createBrand } from "@/services/Brand";
const CreateBrandModal = () => {
  const form = useForm();
  const [imageFiels, setImageFiels] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const {
    formState: { isSubmitting },
  } = form;

  // Register Form Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("logo", imageFiels[0] as File);
    try {
      // Form Data Send to Server action
      const res = await createBrand(formData);
      // Toast Handle
      if (res?.success) {
        toast.success(res?.message);
        setImageFiels([]);
        setImagePreview([]);
        form.reset();
      } else {
        toast.error(res?.errorSources[0]?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Brand</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">
            Create Product Brand
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
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
          

            {imagePreview?.length > 0 ? (
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
            )}
            <Button
              // disabled={reCaptchaStatus ? false : true}
              type="submit"
              className="w-full mt-2"
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBrandModal;

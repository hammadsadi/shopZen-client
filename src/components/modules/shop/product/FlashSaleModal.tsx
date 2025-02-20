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
import { toast } from "sonner";
import { createFlashSale } from "@/services/FlashSale";
import { Dispatch, SetStateAction } from "react";

interface IFlashSaleModalProps {
  productsIds: string[];
  setProductIds: Dispatch<SetStateAction<string[]>>;
}
const FlashSaleModal = ({
  productsIds,
  setProductIds,
}: IFlashSaleModalProps) => {
  const form = useForm();
  const {
    formState: { isSubmitting },
  } = form;

  // Register Form Handle
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData = {
      products: [...productsIds],
      discountPercentage: parseFloat(data?.discountPercentage),
    };
    try {
      const res = await createFlashSale(modifiedData);
      if (res?.success) {
        toast.success(res?.message);
        setProductIds([]);
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
        <Button disabled={!productsIds?.length}>Create Flash Sale</Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">Create Flash Sale</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Percentage</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

export default FlashSaleModal;

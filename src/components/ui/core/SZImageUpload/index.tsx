import { ChangeEvent } from "react";
import { Input } from "../../input";
import { cn } from "@/lib/utils";
type TSZImageUploadProps = {
  imageFiels: File[] | [];
  setImageFiels: React.Dispatch<React.SetStateAction<[] | File[]>>;
  imagePreview: string[] | [];
  setImagePreview: React.Dispatch<React.SetStateAction<[] | string[]>>;
  imageFileLabel?: string;
  className?: string;
};
const SZImageUpload = ({
  setImageFiels,
  setImagePreview,
  imageFileLabel = "Upload Image",
  className,
}: TSZImageUploadProps) => {
  // Handle Image Change
  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageFiels((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
      event.target.value = "";
    }
  };
  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        onChange={handleChangeImage}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        id="shImage"
      />
      <label
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
        htmlFor="shImage"
      >
        {imageFileLabel}
      </label>
    </div>
  );
};

export default SZImageUpload;

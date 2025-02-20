'use server'

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Create Flash Sale
export const createFlashSale = async (data:any):Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/flash-sale`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")?.value as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get All Flash Sale
export const getAllFlashSaleProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/flash-sale`, {     
      next: {
        tags: ["PRODUCT"],
      },
    });

    return res.json();
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};


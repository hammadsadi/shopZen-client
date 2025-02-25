'use server'

import { TCoupon } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Create Coupon
export const createCoupon = async (data: TCoupon) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")?.value as string,
      },
      body: JSON.stringify(data),
    });
    revalidateTag("COUPON");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get All Coupon
export const getAllCoupon = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")?.value as string,
      },
      next: {
        tags: ["COUPON"],
      },
    });

    return res.json();
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};

// Delete Coupon
export const deleteCoupon = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/coupon/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")?.value as string,
      },
    });
    revalidateTag("COUPON");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
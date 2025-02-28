'use server'

import { accessTokenVerify } from "@/lib/accessTokenVerify";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { getRefreshToken } from "../AuthServices";
// Create Brand
export const createBrand = async (data: FormData) => {
  // Access Generate Functionality
  const cookieStore = await cookies();
  let token = cookieStore.get("accessToken")!.value;
  if (!token || (await accessTokenVerify(token))) {
    const { data } = await getRefreshToken();
    token = data?.accessToken;
    cookieStore.set("accessToken", token);
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data,
    });
    revalidateTag("BRAND");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};


// Get All Brands
export const getAllBrand = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")?.value as string,
      },
      next: {
        tags: ["BRAND"],
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Delete Single Brands
export const deleteSingleBrand = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("BRAND");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
'use server'

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Create Category
export const createCategory = async (data: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });
    revalidateTag("CATEGORY");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get All Category
export const getAllCategory = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")?.value as string,
      },
      next: {
        tags: ["CATEGORY"],
      },
    });

    return res.json();
  } catch (error: any) {
    console.log(error);
    return Error(error);
  }
};

// Delete Category
export const deleteCategory = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    revalidateTag("CATEGORY");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
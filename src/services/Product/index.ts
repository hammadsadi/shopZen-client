'use server'

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Create Product
export const createProduct = async (data: FormData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Update Product
export const updateProduct = async (
  data: FormData,
  productId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: data,
      }
    );
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Get All Product
export const getAllProducts = async (
  page?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();
  // Price
  if (query?.price) {
    params.append("minPrice", "0");
    params.append("maxPrice", query?.price.toString());
  }
  // Category
  if (query?.category) {
    params.append("categories", query?.category.toString());
  }
  // Brand
  if (query?.brand) {
    params.append("brands", query?.brand.toString());
  }
  // Rating
  if (query?.rating) {
    params.append("ratings", query?.rating.toString());
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product?page=${page}&${params}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value as string,
        },
        next: {
          tags: ["PRODUCT"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};


// Get Single Product
export const getSingleProduct = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Delete Product
export const deleteProduct = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
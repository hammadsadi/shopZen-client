'use server'

import { cookies } from "next/headers";
// Create Brand
export const createBrand = async(data:FormData)=>{
   try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
       method: "POST",
       headers: {
         Authorization: (await cookies()).get("accessToken")!.value,
       },
       body: data,
     });
     return res.json()
   } catch (error:any) {
    return Error(error)
   }
}


// Get All Brands
export const getAllBrand = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand`, {
      method: "GET",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};


// Delete Single Brands
export const deleteSingleBrand = async (id:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/brand/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
"use server"

import { TOrder } from "@/types";
import { cookies } from "next/headers";

// Create Order
export const createUserOrder = async (orderInfo: TOrder) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")?.value as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderInfo),
    });
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
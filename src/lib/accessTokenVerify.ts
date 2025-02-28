"use server";
import { getRefreshToken } from "@/services/AuthServices";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const accessTokenVerify = async (token: string): Promise<boolean> => {
  // Check Token
  if (!token) return true;
  try {
    const decode: { exp: number } = jwtDecode(token);
    return decode.exp * 1000 < Date.now();
  } catch (error: any) {
    console.error(error);
    return true;
  }
};

export const getValidateToken = async (): Promise<string> => {
  const cookieStore = await cookies();
  let token = cookieStore.get("accessToken")!.value;
  if (!token || (await accessTokenVerify(token))) {
    const { data } = await getRefreshToken();
    token = data?.accessToken;
    cookieStore.set("accessToken", token);
  }
  return token;
};

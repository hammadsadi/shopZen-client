import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";

// Role Type
type TRole = keyof typeof roleBasedPrivate
const authRoutes = ['/login', '/register']
const roleBasedPrivate = {
  user: [/^\/user/],
  admin: [/^\/admin/],
};
export const middleware = async(request:NextRequest) =>{
  // Get Pathname
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();

  // Check User Info
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  // Check Role
  if (userInfo?.role && roleBasedPrivate[userInfo?.role as TRole]) {
    // Get Route Info
    const routes = roleBasedPrivate[userInfo?.role as TRole];
    // Check route and Acces the Route
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
    matcher:['/login', '/create-shop', '/user', '/user/:page', '/admin', '/admin/:page']
}
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";

const authRoutes = ['/login', '/register']
export const middleware = async(request:NextRequest) =>{
    const {pathname} = request.nextUrl
    const userInfo = await getCurrentUser()
    if(!userInfo){
        if (authRoutes.includes(pathname)) {
            return NextResponse.next()
        }else{
            return NextResponse.redirect(
              new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/login?redirectPath=${pathname}`, request.url)
            );
        }
    }


    console.log('Hello World')
};

export const config = {
    matcher:['/login', '/create-shop']
}
import { jwtDecode } from "jwt-decode"

export const accessTokenVerify = async (token:string):Promise<boolean> =>{

    // Check Token
    if(!token) return true
    try {
        const decode:{exp:number} = jwtDecode(token)
        return decode.exp * 1000 < Date.now()
    } catch (error:any) {
       console.error(error) 
       return true
    }
}
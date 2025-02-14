import { getCurrentUser } from "@/services/AuthServices";
import { TUser } from "@/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

// User Provider Types
type TUserProvider = {
  user: TUser | null;
  isLoading: boolean;
  setUser: (user: TUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

// Create Context
const UserContext = createContext<TUserProvider | undefined>(undefined)

const UserProvider = ({ children }: { children:ReactNode }) => {
    const [user, setUser] = useState< TUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Get Cueent User and Set
    const handleUser = async() =>{
        const user = await getCurrentUser()
        setUser(user)
        setIsLoading(false)
    }
useEffect(()=>{
    handleUser()
},[isLoading])

return <UserContext.Provider value={{user, setUser, isLoading, setIsLoading}}>{children}</UserContext.Provider>;

};

// Create Hook 
export const useUser = () =>{
    const context = useContext(UserContext)
    if(context === undefined){
        throw new Error('useUser Must be used within the UserProvider Context')
    }

    return context
}

export default UserProvider
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type UserTypes = 'USER' | 'ADMIN' | 'SUPERADMIN'

interface AuthData {
  session: Session | null;
  // It will remain as any until the database types are imported from supbase
  profile: any;
  userType: UserTypes;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  userType: 'USER',
  loading: false,
});

const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  
  const [session, setSession] = useState<Session | null>()
  const [profile, setProfile] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {
    const fetchUserSession = async () => {
      const {data: {session} , error} = await supabase.auth.getSession()
      if(error){
        throw new Error('Error retreiving the session', error)
      }else{
        setSession(session)
        console.log(session)
      }

    }
  }, [])

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

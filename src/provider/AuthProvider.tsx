import { supabase } from "api";
import {
  signOut,
  getUser,
  AuthContext,
  useSignedInUser as useUser,
} from "api/user";
import { useEffect } from "react";

function useAuth() {
  const [user, setUser] = useUser();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
      }
    );
    return authListener.subscription.unsubscribe;
  }, [setUser]);

  return {
    user,
    signOut,
    getUser,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

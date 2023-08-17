import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useMemo, useEffect, useState } from "react";

type TAuthContextState = {
  user: User;
  loading: boolean;
};

export const AuthContext = createContext<TAuthContextState>({
  loading: false,
  user: {} as User,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [initialLoader, setInitialLoader] = useState<boolean>(true);
  const navigate = useNavigate();
  const { user, loading, setUser, setLoading } = useAuthStore();
  const value = useMemo(() => ({ user, loading }), [user, loading]);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          navigate("/");
        } else {
          setLoading(true);
          setUser({} as User);
          navigate("/auth");
        }
        setInitialLoader(false);
        setLoading(false);
      }),
    []
  );

  return (
    <AuthContext.Provider value={value}>
      {initialLoader ? "Loading..." : children}
    </AuthContext.Provider>
  );
};

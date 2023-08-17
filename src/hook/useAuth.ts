import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function useAuth() {
  const { setUser, setError, setLoading } = useAuthStore();
  const navigate = useNavigate();

  async function signUp(email: string, password: string) {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        navigate("/");
      })
      .catch((error) => {
        const err = error as Error;
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }
  async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        navigate("/");
      })
      .catch((error) => {
        const err = error as Error;
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }
  function logOut() {
    setLoading(true);
    setTimeout(
      () =>
        signOut(auth)
          .then(() => {
            setUser({} as User);
            navigate("/auth");
          })
          .catch((err) => {
            const error = err as Error;
            setError(error.message);
          })
          .finally(() => setLoading(false)),
      1000
    );
  }

  return { signUp, signIn, logOut };
}

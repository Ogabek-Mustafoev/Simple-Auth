import { useState, FormEvent } from "react";
import useAuth from "../../hook/useAuth";
import { useAuthStore } from "../../store/auth.store";

export default function Auth() {
  const [auth, setAuth] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);
  const { signUp, signIn } = useAuth();
  const { error, loading } = useAuthStore();

  function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!password.length || !email.length) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    if (!auth) {
      signUp(email, password);
    } else {
      signIn(email, password);
    }
  }

  return (
    <main className="container form-signin mt-4">
      <form className="m-auto w-50 text-center" onSubmit={onSubmitHandler}>
        <img
          className="mb-4"
          src="./enter.png"
          alt="login"
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">{auth ? "Log In" : "Sign Up"}</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-floating">
          <input
            type="email"
            className={`form-control ${invalid && "is-invalid"}`}
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating my-2">
          <input
            type="password"
            className={`form-control ${invalid && "is-invalid"}`}
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button
          disabled={loading}
          className="btn btn-primary w-100 py-2"
          type="submit"
        >
          {loading ? "Loading..." : auth ? "Log In" : "Sign Up"}
        </button>
        <p className="mt-2">
          {auth ? "Not account yet? " : "Already have an account? "}
          <span
            className="fw-bold text-primary pointer"
            style={{ cursor: "pointer" }}
            onClick={() => setAuth((prev) => !prev)}
          >
            {auth ? "Sign Up" : "Log In"}
          </span>
        </p>
      </form>
    </main>
  );
}

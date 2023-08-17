import useAuth from "../../hook/useAuth";
import { useAuthStore } from "../../store/auth.store";

export default function Navbar() {
  const { logOut } = useAuth();
  const { loading } = useAuthStore();

  return (
    <>
      <div className="container d-flex py-2 flex-column flex-md-row align-items-center mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center link-body-emphasis text-decoration-none"
        >
          <img
            className="img-fluid"
            src="./logo.png"
            alt="login"
            width="50"
            height="50"
          />
        </a>
        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <button
            className="btn btn-outline-secondary"
            onClick={logOut}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Log Out"}
          </button>
        </nav>
      </div>
    </>
  );
}

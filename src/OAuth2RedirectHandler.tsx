// OAuth2RedirectHandler.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuth2RedirectHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, []);

  return <div>Redirecting...</div>;
}

export default OAuth2RedirectHandler;

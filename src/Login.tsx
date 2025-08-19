// Login.jsx
import axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:8080/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    alert("Login success!");
  };

  return (
    <div>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <a href="http://localhost:8080/oauth2/authorization/google">
        Login with Google
      </a>
      <br />
      <a href="http://localhost:8080/oauth2/authorization/facebook">
        Login with Facebook
      </a>
    </div>
  );
}

export default Login;

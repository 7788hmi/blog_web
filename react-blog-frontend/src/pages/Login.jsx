import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.status) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful");
        navigate("/home");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      toast.error("Login error");
    }
  };

  return (
    <div className="page-background page-background-top-left">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="inner-container mb-2 p-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button m-2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext)
  async function loginUser(e) {
    e.preventDefault();
    try {
      const userInfo = await axios.post("/login", {
        email,
        password,
      });
      navigate("/");
      setUser(userInfo);
      alert("Login Successful");
      
    } catch (e) {
      alert("Login failed!");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginUser}>
          <input
            type="email"
            value={email}
            placeholder="your@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary" type="submit">
            Login
          </button>
          <div className="text-center py-2">
            Don&rsquo;t have an account yet?{" "}
            <Link
              to={"/register"}
              className="underline underline-offset-1 font-bold"
            >
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

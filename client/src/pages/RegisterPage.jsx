import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function registerUser(e){
    e.preventDefault();
    axios.get('/test');
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Wick"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary" type="submit">Register</button>
          <div className="text-center py-2">
            Already have an account yet?{" "}
            <Link
              to={"/login"}
              className="underline underline-offset-1 font-bold"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

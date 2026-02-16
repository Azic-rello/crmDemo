import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState("admin");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();

  const handle = () => {
    if (login === "admin" && password === "password") {
      navigate("/admin");
    } else {
      alert("Login yoki password xato!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a]">
      <div className="bg-[#051e54] text-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-white">
          Admin Login
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Iltimos login va parolni kiriting
        </p>

        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full mb-5 px-5 py-4 text-lg rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-5 py-4 text-lg rounded-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
        />

        <button
          onClick={handle}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Kirish
        </button>
      </div>
    </div>
  );
};

export default Login;

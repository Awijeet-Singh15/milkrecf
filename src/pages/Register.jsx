// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../utils/api";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const res = await API.post("/auth/register", { name, email, password });
//     localStorage.setItem("token", res.data.token);
//     navigate("/dashboard");
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto mt-10 bg-white shadow rounded">
//       <h1 className="text-2xl mb-4 font-bold">Register</h1>
//       <form onSubmit={handleRegister}>
//         <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 mb-2 border" />
//         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 mb-2 border" />
//         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-2 mb-2 border" />
//         <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Register</button>
//       </form>
//       <p className="mt-4 text-center">
//         Already have an account? <Link to="/login" className="text-green-600 underline">Login</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      setMessageType("success");
      setMessage("Registration successful! 🐄 Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Registration failed. Try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        {/* Left: Dairy-themed GIF */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center bg-green-100">
          <img
            src="https://media.giphy.com/media/I1nwVpCaB4k36/giphy.gif"
            alt="Dairy Cow"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Register Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">🐄 Register</h1>

          {message && (
            <div
              className={`text-white px-4 py-2 rounded mb-4 transition duration-300 ${
                messageType === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block mb-1 font-bold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-800 text-white font-bold py-2 rounded transition"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

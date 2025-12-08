import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(s => s.auth);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser({ name, email, password }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-start bg-gray-100 p-4 bg-cover bg-center bg-no-repeat" 
         style={{backgroundImage: "url('/images/backgroundImage.jpeg')"}}>
      
      <form onSubmit={submit} className="bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md ml-8 border border-white/30 mt-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create Account</h2>
        
        <div className="space-y-4">
          <input 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Name" 
            className="w-full p-3 border border-gray-300/80 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/80" 
          />
          <input 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Email" 
            className="w-full p-3 border border-gray-300/80 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/80" 
          />
          <input 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border border-gray-300/80 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/80" 
          />
        </div>

        <button 
          disabled={loading} 
          className="w-full py-3 bg-blue-600/90 hover:bg-blue-700/90 text-white rounded-lg font-medium mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {error && (
          <div className="bg-red-100/80 text-red-700 p-3 rounded mt-4 text-sm backdrop-blur-sm">
            {error}
          </div>
        )}

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
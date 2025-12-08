import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/slices/authSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(s => s.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  };

  // ✅ Redirect based on role
  useEffect(() => {
  if (user) {
    if (user.user.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate(from, { replace: true });
    }
  }
}, [user, from, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-start bg-gray-100 p-4 bg-cover bg-center bg-no-repeat" 
         style={{backgroundImage: "url('/images/backgroundImage.jpeg')"}}>
      
      <form 
        onSubmit={handleSubmit} 
        className="bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md ml-8 border border-white/30"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>

        {error && (
          <div className="bg-red-100/80 text-red-700 p-3 rounded mb-4 text-sm backdrop-blur-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            value={email}
            onChange={e => { setEmail(e.target.value); if (error) dispatch(clearError()); }}
            placeholder="Email"
            className="w-full p-3 border border-gray-300/80 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/80"
          />
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); if (error) dispatch(clearError()); }}
            placeholder="Password"
            className="w-full p-3 border border-gray-300/80 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/80"
          />
        </div>

        <button 
          disabled={loading} 
          className="w-full py-3 bg-blue-600/90 hover:bg-blue-700/90 text-white rounded-lg font-medium mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
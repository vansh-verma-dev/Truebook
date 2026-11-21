import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  LuChartNoAxesCombined,
  LuCalculator,
  LuBuilding2,
  LuShieldCheck,
} from "react-icons/lu";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // Backend token  
      const token =
        data.token ||
        data.accessToken ||
        data.data?.token ||
        data.data?.accessToken;

      if (!token) {
        console.log("Login Response:", data);
        toast.error("Login token nahi mila. Backend response check karo.");
        return;
      }

      // User session save  
      localStorage.setItem("token", token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      } else if (data.data?.user) {
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }

      toast.success("Welcome back! Login successful ");

      
      navigate("/", { replace: true });

    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Server connect nahi ho paya. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-[82vw] h-[90vh] flex bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-xl overflow-hidden">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between p-12">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-2">
              <LuChartNoAxesCombined className="text-4xl text-green-700" />
              <h1 className="text-3xl font-bold text-green-900">
                TrueBook
              </h1>
            </div>

            <p className="text-sm text-gray-600 mt-1">
              Smart Accounting. Simplified.
            </p>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Welcome Back
            </h2>

            <p className="mt-3 text-lg text-gray-600 max-w-md">
              Login to your TrueBook account and continue managing your books.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">

            <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
              <LuCalculator className="text-3xl text-green-700" />

              <div>
                <h3 className="font-semibold text-gray-900">
                  Smart Accounting Tools
                </h3>

                <p className="text-sm text-gray-500">
                  Vouchers, ledgers and reports in one place
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
              <LuBuilding2 className="text-3xl text-green-700" />

              <div>
                <h3 className="font-semibold text-gray-900">
                  Multi-Company Support
                </h3>

                <p className="text-sm text-gray-500">
                  Manage multiple companies with one login
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
              <LuShieldCheck className="text-3xl text-green-700" />

              <div>
                <h3 className="font-semibold text-gray-900">
                  Secure & Reliable
                </h3>

                <p className="text-sm text-gray-500">
                  Your data stays safe with secure login
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              Login
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Enter your details to access your account
            </p>

            {/* Email */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 h-12 mb-4 focus-within:border-green-600">
              <FaEnvelope className="text-gray-500" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full outline-none text-sm disabled:opacity-60"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 h-12 mb-3 focus-within:border-green-600">
              <FaLock className="text-gray-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full outline-none text-sm disabled:opacity-60"
              />

              <button
                type="button"
                disabled={loading}
                onClick={() => setShowPassword(!showPassword)}
                className="disabled:opacity-50"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm mb-6">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  className="accent-green-700"
                  disabled={loading}
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-green-700 font-semibold"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 flex items-center justify-center gap-2 text-white font-semibold rounded-xl transition-all duration-200 ${
                loading
                  ? "bg-green-700 cursor-not-allowed opacity-80"
                  : "bg-green-900 hover:bg-green-800"
              }`}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Logging in...
                </>
              ) : (
                "Login →"
              )}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-green-700 font-semibold"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
 
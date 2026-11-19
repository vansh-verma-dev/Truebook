import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaUserTie } from "react-icons/fa";
import { LuChartNoAxesCombined, LuCalculator, LuBuilding2, LuShieldCheck } from "react-icons/lu";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    role: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // yaha apni API call lagao
    // axios.post("/api/auth/register", form)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      {/* main box: 82vw x 90vh */}
      <div className="w-[82vw] h-[90vh] flex bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-xl overflow-hidden">
        {/* ---------- LEFT SIDE ---------- */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between p-12">
          {/* logo */}
          <div>
            <div className="flex items-center gap-2">
              <LuChartNoAxesCombined className="text-4xl text-green-700" />
              <h1 className="text-3xl font-bold text-green-900">TrueBook</h1>
            </div>
            <p className="text-sm text-gray-600 mt-1">Smart Accounting. Simplified.</p>
          </div>

          {/* heading */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Build Your Account</h2>
            <p className="mt-3 text-lg text-gray-600 max-w-md">
              Get started with TrueBook and manage your finances smarter.
            </p>
          </div>

          {/* feature cards */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
              <LuCalculator className="text-3xl text-green-700" />
              <div>
                <h3 className="font-semibold text-gray-900">Smart Accounting Tools</h3>
                <p className="text-sm text-gray-500">Vouchers, ledgers and reports in one place</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
              <LuBuilding2 className="text-3xl text-green-700" />
              <div>
                <h3 className="font-semibold text-gray-900">Multi-Company Support</h3>
                <p className="text-sm text-gray-500">Manage multiple companies with one login</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
              <LuShieldCheck className="text-3xl text-green-700" />
              <div>
                <h3 className="font-semibold text-gray-900">Secure & Reliable</h3>
                <p className="text-sm text-gray-500">Your data stays safe with secure login</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- RIGHT SIDE (FORM) ---------- */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-sm text-gray-500 mb-5">Fill in the details to get started</p>

            {/* Role - sabse upar aur thoda bada */}
            <div className="flex items-center gap-3 border-2 border-green-600 rounded-xl px-4 h-14 mb-4 bg-green-50">
              <FaUserTie className="text-green-700 text-lg" />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-base font-medium text-gray-800"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="owner">Business Owner</option>
                <option value="accountant">Accountant</option>
                <option value="company">Company</option>
                <option value="professional">Professional</option>
              </select>
            </div>

            {/* Full Name */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 h-12 mb-4 focus-within:border-green-600">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full outline-none text-sm"
              />
            </div>

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
                className="w-full outline-none text-sm"
              />
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 h-12 mb-4 focus-within:border-green-600">
              <FaPhone className="text-gray-500" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                maxLength={10}
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 h-12 mb-5 focus-within:border-green-600">
              <FaLock className="text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create Password"
                value={form.password}
                onChange={handleChange}
                minLength={6}
                required
                className="w-full outline-none text-sm"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-green-900 hover:bg-green-800 text-white font-semibold rounded-xl"
            >
              Create Account →
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-green-700 font-semibold">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
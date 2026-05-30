import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

function SignupPage({ setMode }) {
    return (
        <section className="flex h-[90vh] w-[80vw] bg-white">


            <div className="left w-[45%] bg-orange-500">

            </div>


            <div className="right w-[55%] bg-gradient-to-br from-white to-orange-50 flex items-center justify-center px-6 py-3">

                <div className="w-full max-w-sm">


                    <div className="mb-4">
                        <h1 className="font-bold text-3xl text-gray-800 leading-tight">
                            Create Account 
                        </h1>

                        <p className="text-gray-500 mt-1 text-xs">
                            Join us today and start your journey.
                        </p>
                    </div>

                    <form className="flex flex-col gap-2">

                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="Name"
                                className="text-xs font-semibold text-gray-600"
                            >
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                id="Name"
                                required
                                className="border border-gray-300 px-3 py-2 text-sm rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
                            />
                        </div>


                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="Email"
                                className="text-xs font-semibold text-gray-600"
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                id="Email"
                                required
                                className="border border-gray-300 px-3 py-2 text-sm rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
                            />
                        </div>


                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="Password"
                                className="text-xs font-semibold text-gray-600"
                            >
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Create a password"
                                id="Password"
                                required
                                className="border border-gray-300 px-3 py-2 text-sm rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
                            />
                        </div>


                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="ConfirmPassword"
                                className="text-xs font-semibold text-gray-600"
                            >
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                placeholder="Confirm your password"
                                id="ConfirmPassword"
                                required
                                className="border border-gray-300 px-3 py-2 text-sm rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
                            />
                        </div>


                        <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer leading-4 mt-1">
                            <input
                                type="checkbox"
                                className="accent-orange-500 mt-[2px]"
                                required
                            />

                            I agree to the
                            <span className="text-orange-500 font-semibold cursor-pointer hover:underline">
                                Terms & Conditions
                            </span>
                        </label>

                        <button className="bg-black hover:bg-gray-800 transition-all duration-300 text-white py-2 text-sm font-semibold rounded-lg shadow-md hover:scale-[1.01] active:scale-[0.98] mt-1">
                            Create Account
                        </button>

                        <div className="flex items-center gap-2 my-1">

                            <div className="flex-1 h-[1px] bg-gray-300"></div>

                            <h1 className="text-gray-400 text-[10px]">
                                OR CONTINUE WITH
                            </h1>

                            <div className="flex-1 h-[1px] bg-gray-300"></div>

                        </div>

                        <button
                            type="button"
                            className="border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 py-2 flex items-center justify-center gap-2 rounded-lg shadow-sm text-sm font-medium text-gray-700"
                        >
                            <FcGoogle className="text-xl" />
                            Continue with Google
                        </button>


                        <p className="text-center text-gray-500 text-xs mt-1">
                            Already have an account?{" "}
                        
                          <button 
                          onClick={() => setMode("signin")}
                                className="font-bold text-orange-500 hover:underline"
                          >     Login here</button>
                            
                        </p>

                    </form>
                </div>
            </div>
        </section>
    );
}

export default SignupPage;
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

function SigninPage({ setMode }) {
    return (
        <section className="flex w-[80vw]  h-[90vh] overflow-hidden  bg-white">

            <div className="left w-[45%] bg-orange-500">

            </div>

            <div className="right w-[55%] bg-gradient-to-br from-white to-orange-50 flex items-center justify-center p-2">

                <div className="w-full pl-5 pr-5">
                    <div className="mb-2">
                        <h1 className="font-bold text-5xl text-gray-800 leading-tight">
                            Welcome Back!
                        </h1>

                        <p className="text-gray-500 mt-1 text-sm">
                            Please login to continue and enjoy the experience.
                        </p>
                    </div>

                    <form className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="Email"
                                className="text-sm font-semibold text-gray-600"
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                id="Email"
                                required
                                className="border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
                            />
                        </div>


                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="Password"
                                className="text-sm font-semibold text-gray-600"
                            >
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                id="Password"
                                required
                                className="border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-200"
                            />
                        </div>


                        <div className="flex justify-between items-center text-sm">

                            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="accent-orange-500"
                                />
                                Remember me
                            </label>

                            <p className="text-orange-500 font-semibold cursor-pointer hover:underline">
                                Forgot Password?
                            </p>
                        </div>


                        <button className="bg-black hover:bg-gray-800 transition-all duration-300 text-white p-3 text-lg font-semibold rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                            Login
                        </button>


                        <div className="flex items-center gap-3 my-2">

                            <div className="flex-1 h-[1px] bg-gray-300"></div>

                            <h1 className="text-gray-400 text-sm">
                                OR CONTINUE WITH
                            </h1>

                            <div className="flex-1 h-[1px] bg-gray-300"></div>
                        </div>


                        <button
                            type="button"
                            className="border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 p-3 flex items-center justify-center gap-3 rounded-xl shadow-sm font-medium text-gray-700"
                        >
                            <FcGoogle className="text-2xl" />
                            Continue with Google
                        </button>


                        <p className="text-center text-gray-500 text-sm mt-2">
                            Don&apos;t have an account?{" "}

                            <button className="font-bold text-orange-500 hover:underline"
                                onClick={() => setMode("signup")}
                            >
                                Sign up here
                            </button >




                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default SigninPage;
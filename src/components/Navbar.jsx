import { section } from "framer-motion/m";
import { useState } from "react";
import { FaBell } from "react-icons/fa";

function Navbar({open, setOpen}) {
   
    return (
        <section className="dashboard-page w-full bg-white">

            <nav className="w-full h-[75px] px-8 flex items-center justify-between border-b border-slate-200 bg-white shadow-sm">

                <div className="logo">
                    <h1 className="text-slate-800 text-3xl font-bold tracking-wide">
                        True
                        <span className="text-[#0d6efd]">Book</span>
                    </h1>
                </div>


                <div className="company-name">
                    <h2 className="text-slate-500 text-sm md:text-base font-medium hidden sm:flex">
                        Vansh Verma Enterprises Pvt. Ltd.
                    </h2>
                </div>


                <div className="profile-section flex items-center gap-5">


                    <button className="relative"
                       onClick={() => setOpen(true)}
                    >
                        <FaBell className="text-slate-500 text-xl cursor-pointer hover:text-[#0d6efd] transition-all duration-300" />

                        <span className="absolute -top-1 -right-1 w-[8px] h-[8px] bg-[#0d6efd] rounded-full"></span>
                    </button>


                    <div className="flex items-center gap-3 cursor-pointer">

                        <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-slate-200">
                            <img
                                src="https://i.pinimg.com/736x/43/78/71/4378717c7ac9b9120c6d163c370838be.jpg"
                                alt="User"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="hidden md:block">
                            <h3 className="text-slate-800 text-sm font-medium">
                                Vansh Verma
                            </h3>

                            <p className="text-slate-400 text-xs">
                                Administrator
                            </p>
                        </div>

                    </div>
                </div>

            </nav>
        </section>
    )
}
export default Navbar;
import { IoSearch } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import { AiFillPrinter } from "react-icons/ai";
function DaybookNavbar() {
    return (
        <>
            <nav className="w-[83vw] bg-white border border-slate-200 shadow-sm  text-slate-800 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                {/* Left Side */}
                <div>
                    <h1 className="text-lg font-semibold tracking-wide">Day Book</h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Manage your daily accounting entries
                    </p>
                </div>

                <div className="flex items-center gap-2">

                    <button className="flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#0d6efd] transition-all duration-200 px-4 py-2 rounded-lg text-sm font-medium">
                        <BsDownload /> Export
                    </button>

                    <button className="flex items-center gap-2 bg-[#0d6efd] hover:bg-[#0250c5] text-white transition-all duration-200 px-4 py-2 rounded-lg text-sm font-medium shadow-md shadow-blue-200">
                        <AiFillPrinter /> Print
                    </button>
                </div>

            </nav>
        </>
    )
}
export default DaybookNavbar;
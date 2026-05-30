import { IoSearch } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import { AiFillPrinter } from "react-icons/ai";
function DaybookNavbar() {
    return (
        <>
            <nav className="w-[80vw] bg-[#1d2939] text-white px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                {/* Left Side */}
                <div>
                    <h1 className="text-lg font-semibold tracking-wide">Day Book</h1>
                    <p className="text-xs text-gray-400">
                        Manage your daily accounting entries
                    </p>
                </div>

                <div className="flex gap-2">
                    <button className="flex items-center gap-2 border border-gray-500 hover:bg-gray-700 transition px-4 py-2 rounded-lg text-sm">
                        <BsDownload /> Export
                    </button>

                    <button className="flex items-center gap-2 border border-gray-500 hover:bg-gray-700 transition px-4 py-2 rounded-lg text-sm">
                        <AiFillPrinter /> Print
                    </button>
                </div>

            </nav>
        </>
    )
}
export default DaybookNavbar;
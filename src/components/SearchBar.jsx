import { FaPlus, FaSearch } from "react-icons/fa";
function Searchbar({ setActivePage }) {
    return (
        <>
            <div className="w-[80vw] py-2 px-2 flex gap-3 mt-2">

                {/* ----Search_box--- */}
                <div className="box bg-white border border-slate-200 flex items-center gap-3 text-slate-500 px-3.5 rounded-xl shadow-[0_1px_3px_rgba(16,24,40,0.06)] focus-within:border-[#0d6efd] focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">

                    <FaSearch className="text-sm text-slate-400" />

                    <input
                        type="text"
                        placeholder="Search your company..."
                        className="bg-transparent border-none outline-none w-[400px] py-2.5 rounded-md text-sm text-[#1d2939] placeholder:text-slate-400"
                    />
                </div>

                <button
                    className="bg-[#0d6efd] hover:bg-[#0250c5] active:scale-95 px-5 py-2.5 border-none rounded-xl flex items-center gap-2 font-medium text-sm text-white shadow-[0_1px_2px_rgba(13,110,253,0.3)] transition-all duration-150"
                    onClick={() => setActivePage("CreateCompany")}
                >
                    <FaPlus className="text-xs" />
                    New
                </button>
            </div>
        </>
    )
}
export default Searchbar;
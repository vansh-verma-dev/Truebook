
import { FaPlus, FaPen, FaFolderOpen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function Footer() {
    return (
        <footer className=" bottom-0 w-[80vw] bg-[#1d2939]/90 backdrop-blur-md
         px-5 py-4 flex items-center justify-between
        gap-4 ">

            <button className=" flex-1 h-[55px] bg-orange-500 hover:bg-orange-600 rounded-xl
            flex items-center justify-center gap-2 font-medium transition-all duration-300
        ">
                <FaPlus />
                Create Company
            </button>


            <button className=" flex-1 h-[55px] text-white
            bg-white/5 hover:bg-white/10
            border border-white/10
            rounded-xl
            flex items-center justify-center gap-2
            transition-all duration-300
 ">
                <FaFolderOpen />
                Open Company
            </button>


            <button className="
            flex-1 h-[55px]
            bg-white/5 hover:bg-white/10
            border border-white/10
            rounded-xl
            text-white
            flex items-center justify-center gap-2
            transition-all duration-300
        ">
                <FaPen />
                Alter Company
            </button>


            <button className="
            flex-1 h-[55px]
            bg-red-500/10 hover:bg-red-500/20
            text-red-400
            border border-red-500/20
            rounded-xl
            flex items-center justify-center gap-2
            transition-all duration-300
        ">
                <MdDelete className="text-xl" />
                Delete Company
            </button>

        </footer>
    )
}
export default Footer
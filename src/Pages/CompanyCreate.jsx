import { MdSaveAs } from "react-icons/md";
import CompForm from "../components/companyForm";

function CompnayCreate() {
    return (
        <section>
            {/* --Navbar-- */}
            <nav className="w-[80vw] flex  items-center justify-between px-3 py-3  text-white bg-[#1d2939]">
                <span>
                    <h1>Create New Company </h1>
                    <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, beatae!</p>
                </span>
                <button className="flex items-center gap-2 bg-green-600 px-5 py-2 rounded-xl"><MdSaveAs /> Save Company</button>
            </nav>

  <CompForm/>

        </section>
    )
}
export default CompnayCreate;
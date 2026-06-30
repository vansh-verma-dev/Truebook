import { FaPlus, FaSearch } from "react-icons/fa";
function Searchbar({ setActivePage }) {
    return (
        <>
            <div className="  w-[80vw] py-2 px-2 flex gap-4 mt-2">
                {/* ----Search_box--- */}
                <div className="box bg-[#1d2939] flex  items-center gap-3 text-white px-3 rounded-lg overflow-hidden" >

                    <FaSearch className="font-light" />

                    <input type="text" placeholder="Search You Company..."
                        className="bg-[#1d2939]   border-none outline-none w-[400px] rounded-md text-white" />
                </div>

                <button
                    className="bg-[#02ce1d] px-5 py-2 border-none rounded-md flex items-center   font-thin text-white "
                        onClick={() => setActivePage("CreateCompany")}
                > <FaPlus
                        className="font-thin  "
                    />New</button>
            </div>
        </>
    )
}
export default Searchbar;
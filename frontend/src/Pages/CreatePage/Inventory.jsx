import {
    FaBoxes,
    FaBoxOpen,
    FaWarehouse,
    FaFileInvoice,
    FaFileContract,
    FaBuilding,
    FaIdCard,
} from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
function Inventory(){
    
    const CardsStyle =
        "group flex items-center gap-4 w-[220px] px-4 py-3 bg-white border border-orange-100 rounded-xl shadow-sm hover:shadow-lg hover:border-orange-300 hover:-translate-y-1 transition-all duration-200 cursor-pointer";

    const IconBox =
        "bg-orange-100 p-3 rounded-xl group-hover:bg-orange-200 transition-all";

    const IconStyle =
        "text-xl text-orange-600";
    return(
        <>
                <h1 className="text-2xl font-bold text-slate-800 mb-3 mt-8 border-l-4 border-orange-500 pl-3">
                Inventory
            </h1>

            <div className="flex flex-wrap gap-4">

                <div className={CardsStyle}>
                    <div className={IconBox}>
                        <FaBoxes className={IconStyle} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Stock Group</h3>
                        <p className="text-xs text-slate-500">Organize stock groups</p>
                    </div>
                </div>

                <div className={CardsStyle}>
                    <div className={IconBox}>
                        <FaBoxes className={IconStyle} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Stock Category</h3>
                        <p className="text-xs text-slate-500">Manage stock categories</p>
                    </div>
                </div>

                <div className={CardsStyle}>
                    <div className={IconBox}>
                        <FaBoxOpen className={IconStyle} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Stock Items</h3>
                        <p className="text-xs text-slate-500">Create inventory items</p>
                    </div>
                </div>

                <div className={CardsStyle}>
                    <div className={IconBox}>
                        <FaIndianRupeeSign className={IconStyle} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Unit</h3>
                        <p className="text-xs text-slate-500">Manage measurement units</p>
                    </div>
                </div>

                <div className={CardsStyle}>
                    <div className={IconBox}>
                        <FaWarehouse className={IconStyle} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Location</h3>
                        <p className="text-xs text-slate-500">Manage stock locations</p>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Inventory;
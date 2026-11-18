import {
    FaUsers,
    FaBook,
    FaBoxes,
    FaBoxOpen,
    FaWarehouse,
    FaFileInvoice,
    FaFileContract,
    FaBuilding,
    FaIdCard,
} from "react-icons/fa";

function  TaxCompliance(){
       const CardsStyle =
        "group flex items-center gap-4 w-[280px] px-4 py-3 bg-white border border-orange-100 rounded-xl shadow-sm hover:shadow-lg hover:border-orange-300 hover:-translate-y-1 transition-all duration-200 cursor-pointer";

    const IconBox =
        "bg-orange-100 p-3 rounded-xl group-hover:bg-orange-200 transition-all";

    const IconStyle =
        "text-xl text-orange-600";
    return(
        <>
              {/* Tax */}
            <h1 className="text-2xl font-bold text-slate-800 mb-3 mt-8 border-l-4 border-orange-500 pl-3">
                Tax & Compliance
            </h1>

            <div className="flex flex-wrap gap-4">

                <div className={CardsStyle}>
                    <div className={IconBox}>
                        <FaFileInvoice className={IconStyle} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">GST Registration</h3>
                        <p className="text-xs text-slate-500">Configure GST registration</p>
                    </div>
                </div>

                <div className={CardsStyle}>
                    <div className={IconBox}>
                        <FaFileContract className={IconStyle} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">GST Classification</h3>
                        <p className="text-xs text-slate-500">Manage GST classifications</p>
                    </div>
                </div>

                <div className={CardsStyle}>
                    <div className={IconBox}>
                        <FaBuilding className={IconStyle} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Company GST Details</h3>
                        <p className="text-xs text-slate-500">Company GST information</p>
                    </div>
                </div>

                <div className={CardsStyle}>
                    <div className={IconBox}>
                        <FaIdCard className={IconStyle} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">PAN/CIN Details</h3>
                        <p className="text-xs text-slate-500">Legal company information</p>
                    </div>
                </div>

            </div>
        </>
    )
}
export default TaxCompliance;
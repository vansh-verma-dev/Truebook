import {
    FaUsers,
    FaBook,
} from "react-icons/fa";

import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiNotePencilBold } from "react-icons/pi";
function AccountingMastery() {
   
    const CardsStyle =
        "group flex items-center gap-4 w-[220px] px-4 py-3 bg-white border border-orange-100 rounded-xl shadow-sm hover:shadow-lg hover:border-orange-300 hover:-translate-y-1 transition-all duration-200 cursor-pointer";

    const IconBox =
        "bg-orange-100 p-3 rounded-xl group-hover:bg-orange-200 transition-all";

    const IconStyle =
        "text-xl text-orange-600";

    return (
        <>
            {/* Accounting */}
            < h1 className="text-2xl font-bold text-slate-800 mb-3 border-l-4 border-orange-500 pl-3" >
                Accounting Masters
            </h1 >

            <div className="flex flex-wrap gap-4">

                <div className={CardsStyle}>
                    <div className={IconBox}>
                        <FaUsers className={IconStyle} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Group</h3>
                        <p className="text-xs text-slate-500">Manage account groups</p>
                    </div>
                </div>

                <div className={CardsStyle}
                    
                >
                    <div className={IconBox}>
                        <FaBook className={IconStyle} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Ledger</h3>
                        <p className="text-xs text-slate-500">Create and manage ledgers</p>
                    </div>
                </div>

                <div className={CardsStyle}>
                    <div className={IconBox}>
                        <FaIndianRupeeSign className={IconStyle} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Currency</h3>
                        <p className="text-xs text-slate-500">Manage currencies</p>
                    </div>
                </div>

                <div className={CardsStyle}>
                    <div className={IconBox}>
                        <PiNotePencilBold className={IconStyle} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">Voucher Type</h3>
                        <p className="text-xs text-slate-500">Configure vouchers</p>
                    </div>
                </div>

            </div>
        </>

    )
}
export default AccountingMastery;
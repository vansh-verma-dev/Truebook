import {
    FaTachometerAlt,
    FaPlusCircle,
    FaEdit,
    FaReceipt,
    FaBook,
    FaUniversity,
    FaChartBar,
    FaBuilding,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Toaster position="top-right" />
            {/* App */}
        </>
    );
}
function Sidebar({ setActivePage }) {

    const HandleAlert = () => {
        toast.success("Feature coming soon!");
    };

    const BtnStyle =
        "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 text-sm font-medium";

    const IconStyle = "text-[16px]";

    return (

        <section className="w-[240px] h-screen bg-white border-r border-slate-200 flex flex-col px-3 py-4 overflow-hidden shadow-sm">
            <Toaster position="top-right" />

            {/* Dashboard */}
            <button
                className="w-full flex items-center gap-3 px-4 py-2.5 bg-[#0d6efd] hover:bg-[#0250c5] text-white rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#0d6efd]/20 flex-shrink-0"
                onClick={() => setActivePage("Dashboard")}
            >
                <FaTachometerAlt className="text-2xl"/>
                Dashboard
            </button>

            {/* Navigation */}
            <div className="flex-1 mt-4 space-y-4 overflow-hidden">

                {/* Masters */}
                <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-blue-600 mb-1 px-2">
                        Masters
                    </p>

                    <div className="space-y-0.5">
                        <button
                            className={BtnStyle}
                            onClick={() => setActivePage("CreateHome")}
                        >
                            <FaPlusCircle className={IconStyle} />
                            Create
                        </button>

                        <button
                            className={BtnStyle}
                            onClick={() => setActivePage("Alter")}
                        >
                            <FaEdit className={IconStyle} />
                            Alter
                        </button>
                    </div>
                </div>

                {/* Transactions */}
                <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-blue-600 mb-1 px-2">
                        Transactions
                    </p>

                    <div className="space-y-0.5">
                        <button
                            className={BtnStyle}
                            onClick={() => setActivePage("Voucher")}
                        >
                            <FaReceipt className={IconStyle} />
                            Vouchers
                        </button>

                        <button
                            className={BtnStyle}
                            onClick={() => setActivePage("Daybook")}
                        >
                            <FaBook className={IconStyle} />
                            Day Book
                        </button>

                        <button
                            className={BtnStyle}
                            onClick={() => setActivePage("BanKing")} 
                        >
                            <FaUniversity className={IconStyle} />
                            Banking
                        </button>
                    </div>
                </div>

                {/* Reports */}
                <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-blue-600 mb-1 px-2">
                        Reports
                    </p>

                    <div className="space-y-0.5">
                        <button
                            className={BtnStyle}
                            onClick={() => setActivePage("Reports")}
                        >
                            <FaChartBar className={IconStyle} />
                            Reports
                        </button>
                    </div>
                </div>

                {/* Settings */}
                <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-blue-600 mb-1 px-2">
                        Settings
                    </p>

                    <div className="space-y-0.5">
                        <button
                            className={BtnStyle}
                            onClick={() => setActivePage("company")}
                        >
                            <FaBuilding className={IconStyle} />
                            Company
                        </button>

                        <button
                            className={BtnStyle}
                            onClick={() => setActivePage("setting")}
                        >
                            <FaCog className={IconStyle} />
                            Settings
                        </button>

                        <button
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-sm font-medium"
                            onClick={() => setActivePage("Account")}
                        >
                            <FaSignOutAlt className={IconStyle} />
                            Log Out
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Sidebar;
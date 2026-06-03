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
        "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm font-medium";

    const IconStyle = "text-orange-400/80 text-[13px]";

    return (

        <section className="w-[20vw] h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800/60 flex flex-col px-3 py-4 overflow-hidden">
            <Toaster position="top-right" />
            {/* Dashboard */}
            <button
                className="w-full flex items-center gap-3 px-4 py-2.5 bg-orange-500 hover:bg-orange-400 text-white rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg shadow-orange-500/20 flex-shrink-0"
                onClick={() => setActivePage("Dashboard")}
            >
                <FaTachometerAlt />
                Dashboard
            </button>

            {/* Navigation */}
            <div className="flex-1 mt-4 space-y-4 overflow-hidden">

                {/* Masters */}
                <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-orange-400 mb-1 px-2">
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
                    <p className="text-[10px] uppercase tracking-widest font-bold text-orange-400 mb-1 px-2">
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
                            // onClick={() => setActivePage("BanKing")}
                            onClick={HandleAlert}
                        >
                            <FaUniversity className={IconStyle} />
                            Banking
                        </button>
                    </div>
                </div>

                {/* Reports */}
                <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-orange-400 mb-1 px-2">
                        Reports
                    </p>

                    <div className="space-y-0.5">
                        <button
                            className={BtnStyle}
                            // onClick={() => setActivePage("Reports")}
                             onClick={HandleAlert}
                        >
                            <FaChartBar className={IconStyle} />
                            Reports
                        </button>
                    </div>
                </div>

                {/* Settings */}
                <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-orange-400 mb-1 px-2">
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
                            // onClick={() => setActivePage("setting")}
                             onClick={HandleAlert}
                        >
                            <FaCog className={IconStyle} />
                            Settings
                        </button>

                        <button
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-300 hover:bg-red-500/15 hover:text-red-200 transition-all duration-200 text-sm font-medium"
                            onClick={() => setActivePage("Account")}
                        >
                            <FaSignOutAlt />
                            Log Out
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Sidebar;
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveUser, removeAccount } from "../utils/accountStore";

function Sidebar({ setActivePage }) {

    const navigate = useNavigate();
    const [showLogout, setShowLogout] = useState(false);

    const handleLogout = () => {
        removeAccount(getActiveUser().id);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("selectedCompany");

        setShowLogout(false);

        toast.success("Logged out successfully!");

        navigate("/login", { replace: true });
    };

    const BtnStyle =
        "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 text-sm font-medium";

    const IconStyle = "text-[16px]";

    return (

        <>
            <section className="w-[240px] h-screen bg-white border-r border-slate-200 sm:flex flex-col px-3 py-4 overflow-hidden shadow-sm hidden">

                {/* Dashboard */}
                <button
                    className="w-full flex items-center gap-3 px-4 py-2.5 bg-[#0d6efd] hover:bg-[#0250c5] text-white rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#0d6efd]/20 flex-shrink-0"
                    onClick={() => setActivePage("Dashboard")}
                >
                    <FaTachometerAlt className="text-2xl" />
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
                                onClick={() => setShowLogout(true)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-sm font-medium"
                            >
                                <FaSignOutAlt className={IconStyle} />
                                Log Out
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {showLogout && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">

                        {/* Icon */}
                        <div className="w-14 h-14 mx-auto flex items-center justify-center bg-red-100 rounded-full mb-4">
                            <FaSignOutAlt className="text-red-600 text-2xl" />
                        </div>

                        {/* Heading */}
                        <h2 className="text-xl font-bold text-gray-800 text-center">
                            Confirm Logout
                        </h2>

                        {/* Message */}
                        <p className="text-sm text-gray-500 text-center mt-2">
                            Are you sure you want to log out of your account?
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-6">

                            <button
                                onClick={() => setShowLogout(false)}
                                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-100 transition"
                            >
                                No, Cancel
                            </button>

                            <button
                                onClick={handleLogout}
                                className="flex-1 py-2.5 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition shadow-md shadow-red-500/20"
                            >
                                Yes, Logout
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;
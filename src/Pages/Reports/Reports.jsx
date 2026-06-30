import {
    FaBalanceScale,
    FaBook,
    FaBoxOpen,
    FaFileInvoiceDollar,
    FaChartLine,
    FaStar,
    FaHistory,
    FaSearch
} from "react-icons/fa";

function Reports() {

    const reportCard =
        "bg-white border border-slate-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer";

    return (
        <section className="bg-slate-50 w-[83vw] h-[90vh] p-5 overflow-y-auto">

            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0d6efd] to-[#0250c5] rounded-2xl p-6 text-white shadow-lg shadow-blue-200">

                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-12 -right-4 w-28 h-28 bg-white/10 rounded-full"></div>

                <h1 className="relative text-3xl font-bold tracking-tight">
                    Reports Center
                </h1>

                <p className="relative text-blue-100 mt-2 text-sm md:text-base">
                    Access financial, accounting, inventory and business reports
                </p>

            </div>

            {/* Search */}
            <div className="mt-5 relative">

                <FaSearch className="absolute left-4 top-4 text-slate-400" />

                <input
                    type="text"
                    placeholder="Search reports..."
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-orange-400 bg-white"
                />

            </div>

            {/* Quick Section */}
            <div className="grid grid-cols-2 gap-4 mt-5">

                <div className="bg-white rounded-xl border border-slate-200 p-4">

                    <div className="flex items-center gap-2 mb-3">
                        <FaStar className="text-orange-500" />
                        <h2 className="font-semibold text-slate-800">
                            Favorite Reports
                        </h2>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="hover:text-orange-500 cursor-pointer">
                            Trial Balance
                        </div>
                        <div className="hover:text-orange-500 cursor-pointer">
                            Balance Sheet
                        </div>
                        <div className="hover:text-orange-500 cursor-pointer">
                            Day Book
                        </div>
                    </div>

                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4">

                    <div className="flex items-center gap-2 mb-3">
                        <FaHistory className="text-orange-500" />
                        <h2 className="font-semibold text-slate-800">
                            Recent Reports
                        </h2>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div>Profit & Loss</div>
                        <div>Cash Book</div>
                        <div>Sales Analysis</div>
                    </div>

                </div>

            </div>

            {/* Financial Reports */}
            <div className="mt-6">

                <div className="flex items-center gap-2 mb-3">
                    <FaBalanceScale className="text-orange-500" />
                    <h2 className="text-xl font-bold text-slate-800">
                        Financial Reports
                    </h2>
                </div>

                <div className="grid grid-cols-4 gap-4">

                    <div className={reportCard}>Trial Balance</div>
                    <div className={reportCard}>Profit & Loss</div>
                    <div className={reportCard}>Balance Sheet</div>
                    <div className={reportCard}>Ratio Analysis</div>

                </div>

            </div>

            {/* Accounting Reports */}
            <div className="mt-6">

                <div className="flex items-center gap-2 mb-3">
                    <FaBook className="text-orange-500" />
                    <h2 className="text-xl font-bold text-slate-800">
                        Accounting Reports
                    </h2>
                </div>

                <div className="grid grid-cols-4 gap-4">

                    <div className={reportCard}>Day Book</div>
                    <div className={reportCard}>Ledger Report</div>
                    <div className={reportCard}>Cash Book</div>
                    <div className={reportCard}>Bank Book</div>

                </div>

            </div>

            {/* Inventory Reports */}
            <div className="mt-6">

                <div className="flex items-center gap-2 mb-3">
                    <FaBoxOpen className="text-orange-500" />
                    <h2 className="text-xl font-bold text-slate-800">
                        Inventory Reports
                    </h2>
                </div>

                <div className="grid grid-cols-4 gap-4">

                    <div className={reportCard}>Stock Summary</div>
                    <div className={reportCard}>Stock Register</div>
                    <div className={reportCard}>Stock Movement</div>
                    <div className={reportCard}>Low Stock Items</div>

                </div>

            </div>

            {/* GST Reports */}
            <div className="mt-6">

                <div className="flex items-center gap-2 mb-3">
                    <FaFileInvoiceDollar className="text-orange-500" />
                    <h2 className="text-xl font-bold text-slate-800">
                        GST & Tax Reports
                    </h2>
                </div>

                <div className="grid grid-cols-4 gap-4">

                    <div className={reportCard}>GST Summary</div>
                    <div className={reportCard}>GSTR-1</div>
                    <div className={reportCard}>GSTR-3B</div>
                    <div className={reportCard}>Tax Analysis</div>

                </div>

            </div>

            {/* Business Insights */}
            <div className="mt-6 mb-4">

                <div className="flex items-center gap-2 mb-3">
                    <FaChartLine className="text-orange-500" />
                    <h2 className="text-xl font-bold text-slate-800">
                        Business Insights
                    </h2>
                </div>

                <div className="grid grid-cols-4 gap-4">

                    <div className={reportCard}>Sales Analysis</div>
                    <div className={reportCard}>Purchase Analysis</div>
                    <div className={reportCard}>Expense Analysis</div>
                    <div className={reportCard}>Customer Analysis</div>

                </div>

            </div>

        </section>
    );
}

export default Reports;
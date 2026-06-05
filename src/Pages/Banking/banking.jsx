import {
    FaUniversity,
    FaExchangeAlt,
    FaFileImport,
    FaMoneyCheckAlt,
    FaFileInvoiceDollar,
    FaChartLine,
    FaChevronRight
} from "react-icons/fa";

function Banking() {

    const itemStyle =
        "flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all cursor-pointer";

    return (
        <section className="bg-slate-50 w-[80vw] h-[90vh] p-5 overflow-y-auto">

            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-6 text-white shadow-lg">

                <h1 className="text-3xl font-bold">
                    Banking
                </h1>

                <p className="text-orange-100 mt-2">
                    Manage bank accounts, cheque operations and banking activities.
                </p>

            </div>

            {/* Banking Sections */}
            <div className="grid grid-cols-2 gap-5 mt-5">

                {/* Banking Activities */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">

                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaExchangeAlt className="text-orange-500" />
                        Banking Activities
                    </h2>

                    <div className="space-y-2">

                        <div className={itemStyle}>
                            <span>Fund Transfer</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Bank Reconciliation</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Payment Advice</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Deposit Slip</span>
                            <FaChevronRight />
                        </div>

                    </div>

                </div>

                {/* Cheque Management */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">

                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaMoneyCheckAlt className="text-orange-500" />
                        Cheque Management
                    </h2>

                    <div className="space-y-2">

                        <div className={itemStyle}>
                            <span>Cheque Printing</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Cheque Register</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Issued Cheques</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Post Dated Cheques</span>
                            <FaChevronRight />
                        </div>

                    </div>

                </div>

                {/* Statements */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">

                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaFileImport className="text-orange-500" />
                        Statements & Import
                    </h2>

                    <div className="space-y-2">

                        <div className={itemStyle}>
                            <span>Import Bank Statement</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Statement History</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Download Statement</span>
                            <FaChevronRight />
                        </div>

                    </div>

                </div>

                {/* Bank Accounts */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">

                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaUniversity className="text-orange-500" />
                        Bank Accounts
                    </h2>

                    <div className="space-y-2">

                        <div className={itemStyle}>
                            <span>Bank Account List</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Add Bank Account</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Balance Summary</span>
                            <FaChevronRight />
                        </div>

                    </div>

                </div>

                {/* Reports */}
                <div className="bg-white rounded-xl border border-slate-200 p-4 col-span-2">

                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaChartLine className="text-orange-500" />
                        Banking Reports & Analytics
                    </h2>

                    <div className="grid grid-cols-3 gap-3">

                        <div className={itemStyle}>
                            <span>Bank Summary</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Cash Flow Analysis</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Monthly Bank Report</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Bank Wise Balance</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Cheque Status Report</span>
                            <FaChevronRight />
                        </div>

                        <div className={itemStyle}>
                            <span>Reconciliation Report</span>
                            <FaChevronRight />
                        </div>

                    </div>

                </div>

            </div>

            {/* Footer */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mt-5 flex justify-between">

                <div>
                    <p className="text-sm text-slate-500">
                        Active Bank Accounts
                    </p>
                    <h3 className="font-semibold text-slate-800">
                        3 Accounts
                    </h3>
                </div>

                <div>
                    <p className="text-sm text-slate-500">
                        Total Bank Balance
                    </p>
                    <h3 className="font-semibold text-green-600">
                        ₹ 12,45,000
                    </h3>
                </div>

                <div>
                    <p className="text-sm text-slate-500">
                        Reconciliation Status
                    </p>
                    <h3 className="font-semibold text-orange-600">
                        Pending
                    </h3>
                </div>

            </div>

        </section>
    );
}

export default Banking;
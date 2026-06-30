import {
    FaBuilding,
    FaFileInvoice,
    FaCalculator,
    FaLock,
    FaDatabase,
    FaPalette,
    FaChevronRight
} from "react-icons/fa";

function Settings() {

    const rowStyle =
        "flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all cursor-pointer";

    return (
        <section className="bg-slate-50 h-[90vh] w-[83vw] p-5 overflow-y-auto">

            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-6 text-white shadow-lg">

                <h1 className="text-3xl font-bold">
                    Settings
                </h1>

                <p className="text-orange-100 mt-2">
                    Configure your company, accounting preferences and system settings.
                </p>

            </div>

            {/* Main Content */}
            <div className="grid grid-cols-2 gap-5 mt-5">

                {/* Company */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">

                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaBuilding className="text-orange-500" />
                        Company
                    </h2>

                    <div className="space-y-2">

                        <div className={rowStyle}>
                            <span>Company Details</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                        <div className={rowStyle}>
                            <span>GST Information</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                        <div className={rowStyle}>
                            <span>Financial Year</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                    </div>

                </div>

                {/* Voucher */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">

                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaFileInvoice className="text-orange-500" />
                        Voucher Settings
                    </h2>

                    <div className="space-y-2">

                        <div className={rowStyle}>
                            <span>Voucher Numbering</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                        <div className={rowStyle}>
                            <span>Default Narration</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                        <div className={rowStyle}>
                            <span>Voucher Rules</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                    </div>

                </div>

                {/* Accounting */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">

                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaCalculator className="text-orange-500" />
                        Accounting
                    </h2>

                    <div className="space-y-2">

                        <div className={rowStyle}>
                            <span>Currency Settings</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                        <div className={rowStyle}>
                            <span>Decimal Places</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                        <div className={rowStyle}>
                            <span>Ledger Defaults</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                    </div>

                </div>

                {/* Security */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">

                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaLock className="text-orange-500" />
                        Security
                    </h2>

                    <div className="space-y-2">

                        <div className={rowStyle}>
                            <span>Change Password</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                        <div className={rowStyle}>
                            <span>User Access</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                        <div className={rowStyle}>
                            <span>Login Activity</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                    </div>

                </div>

                {/* Data */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">

                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaDatabase className="text-orange-500" />
                        Data Management
                    </h2>

                    <div className="space-y-2">

                        <div className={rowStyle}>
                            <span>Backup Data</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                        <div className={rowStyle}>
                            <span>Restore Backup</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                        <div className={rowStyle}>
                            <span>Export Data</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                    </div>

                </div>

                {/* Appearance */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">

                    <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaPalette className="text-orange-500" />
                        Appearance
                    </h2>

                    <div className="space-y-2">

                        <div className={rowStyle}>
                            <span>Theme</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                        <div className={rowStyle}>
                            <span>Accent Color</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                        <div className={rowStyle}>
                            <span>Interface Preferences</span>
                            <FaChevronRight className="text-slate-400" />
                        </div>

                    </div>

                </div>

            </div>

            {/* Footer */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mt-5 flex justify-between items-center">

                <div>
                    <p className="text-sm text-slate-500">
                        TrueBook Version
                    </p>

                    <h3 className="font-semibold text-slate-800">
                        v1.0.0
                    </h3>
                </div>

                <div>
                    <p className="text-sm text-slate-500">
                        Database Status
                    </p>

                    <h3 className="font-semibold text-green-600">
                        Connected ●
                    </h3>
                </div>

                <div>
                    <p className="text-sm text-slate-500">
                        Financial Year
                    </p>

                    <h3 className="font-semibold text-slate-800">
                        2025-26
                    </h3>
                </div>

            </div>

        </section>
    );
}

export default Settings;
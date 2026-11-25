import { useState } from "react";
import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import {
    FaBalanceScale,
    FaBook,
    FaBoxOpen,
    FaFileInvoiceDollar,
    FaChartLine,
    FaSearch,
    FaArrowLeft,
} from "react-icons/fa";
import TrialBalance from "./TrialBalance";
 
const sections = [
    {
        title: "Financial Reports",
        icon: FaBalanceScale,
        reports: [
            { name: "Trial Balance", slug: "trial-balance"  , path: "/trial-balance"},
            { name: "Profit & Loss", slug: "profit-loss" },
            { name: "Balance Sheet", slug: "balance-sheet" },
            { name: "Ratio Analysis", slug: "ratio-analysis" },
        ],
    },
    {
        title: "Accounting Reports",
        icon: FaBook,
        reports: [
            { name: "Day Book", slug: "day-book", path: "/daybook" },
            { name: "Ledger Report", slug: "ledger-report" },
            { name: "Cash Book", slug: "cash-book" },
            { name: "Bank Book", slug: "bank-book" },
        ],
    },
    {
        title: "Inventory Reports",
        icon: FaBoxOpen,
        reports: [
            { name: "Stock Summary", slug: "stock-summary" },
            { name: "Stock Register", slug: "stock-register" },
            { name: "Stock Movement", slug: "stock-movement" },
            { name: "Low Stock Items", slug: "low-stock" },
        ],
    },
    {
        title: "GST & Tax Reports",
        icon: FaFileInvoiceDollar,
        reports: [
            { name: "GST Summary", slug: "gst-summary" },
            { name: "GSTR-1", slug: "gstr-1" },
            { name: "GSTR-3B", slug: "gstr-3b" },
            { name: "Tax Analysis", slug: "tax-analysis" },
        ],
    },
    {
        title: "Business Insights",
        icon: FaChartLine,
        reports: [
            { name: "Sales Analysis", slug: "sales-analysis" },
            { name: "Purchase Analysis", slug: "purchase-analysis" },
            { name: "Expense Analysis", slug: "expense-analysis" },
            { name: "Customer Analysis", slug: "customer-analysis" },
        ],
    },
];

const findReport = (slug) =>
    sections.flatMap((section) => section.reports).find((report) => report.slug === slug);

const reportCard =
    "bg-white border border-slate-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer text-left text-sm font-medium text-slate-700";

 
function ReportsHome() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const openReport = (report) => navigate(report.path || `/reports/${report.slug}`);

    const query = search.toLowerCase().trim();

    const visibleSections = sections
        .map((section) => ({
            ...section,
            reports: section.reports.filter((report) => report.name.toLowerCase().includes(query)),
        }))
        .filter((section) => section.reports.length > 0);

    return (
        <section className="bg-slate-50 w-[83vw] h-[90vh] p-5 overflow-y-auto">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0d6efd] to-[#0250c5] rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-12 -right-4 w-28 h-28 bg-white/10 rounded-full"></div>

                <h1 className="relative text-3xl font-bold tracking-tight">Reports Center</h1>

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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-orange-400 bg-white"
                />
            </div>

            {/* Sections */}
            {visibleSections.map((section, index) => {
                const Icon = section.icon;

                return (
                    <div
                        key={section.title}
                        className={`mt-6 ${index === visibleSections.length - 1 ? "mb-4" : ""}`}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Icon className="text-orange-500" />
                            <h2 className="text-xl font-bold text-slate-800">{section.title}</h2>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {section.reports.map((report) => (
                                <button
                                    key={report.slug}
                                    onClick={() => openReport(report)}
                                    className={reportCard}
                                >
                                    {report.name}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            })}

            {visibleSections.length === 0 && (
                <p className="py-20 text-center text-slate-500">No reports found.</p>
            )}
        </section>
    );
}

 
function ReportPage() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const report = findReport(slug);

    if (!report) return <Navigate to="/reports" replace />;

 
    if (report.path) return <Navigate to={report.path} replace />;

    return (
        <section className="bg-slate-50 w-[83vw] h-[90vh] flex flex-col">
            <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-6 py-4">
                <button
                    onClick={() => navigate("/reports")}
                    title="Back to Reports"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                >
                    <FaArrowLeft className="text-xs" />
                </button>
                <h1 className="text-xl font-bold text-slate-800">{report.name}</h1>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center text-center">
                <p className="text-lg font-semibold text-slate-800">{report.name}</p>
                <p className="mt-1 max-w-sm text-sm text-slate-500">This report is coming soon.</p>
            </div>
        </section>
    );
}

 
function Reports() {
    return (
   <Routes>
    <Route index element={<ReportsHome />} />
    <Route path="trial-balance" element={<TrialBalance />} />
    <Route path=":slug" element={<ReportPage />} />
    <Route path="*" element={<Navigate to="/reports" replace />} />
</Routes>
    );
}

export default Reports;
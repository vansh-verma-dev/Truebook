import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import DaybookNavbar from "../components/DaybookNavbar";

const voucherTypes = {
    sales: { label: "Sales", prefix: "SV", style: "bg-green-100 text-green-700" },
    purchase: { label: "Purchase", prefix: "PV", style: "bg-red-100 text-red-700" },
    payment: { label: "Payment", prefix: "PY", style: "bg-orange-100 text-orange-700" },
    receipt: { label: "Receipt", prefix: "RC", style: "bg-blue-100 text-blue-700" },
    contra: { label: "Contra", prefix: "CV", style: "bg-purple-100 text-purple-700" },
    salesReturn: { label: "Sales Return", prefix: "SR", style: "bg-yellow-100 text-yellow-700" },
    purchaseReturn: { label: "Purchase Return", prefix: "PR", style: "bg-pink-100 text-pink-700" },
    journal: { label: "Journal", prefix: "JV", style: "bg-gray-200 text-gray-700" },
};

const showSide = {
    payment: "Dr",
    receipt: "Cr",
    sales: "Dr",
    purchase: "Cr",
    salesReturn: "Cr",
    purchaseReturn: "Dr",
    contra: "Cr",
    journal: "Dr",
};

const rowGrid = "grid grid-cols-[110px_1fr_140px_110px_150px_150px] items-center gap-3";

const getSelectedCompany = () => {
    try {
        return JSON.parse(localStorage.getItem("selectedCompany") || "null");
    } catch {
        return null;
    }
};

const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        timeZone: "UTC",
    });

const money = (amount) =>
    Number(amount || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

const getVoucherNo = (voucher) => {
    const prefix = voucherTypes[voucher.voucherType]?.prefix || "VC";
    return `${prefix}-${String(voucher.voucherNumber).padStart(5, "0")}`;
};

const getRowData = (voucher) => {
    const side = showSide[voucher.voucherType] || "Dr";

    let entries = voucher.entries.filter((entry) => entry.type === side);
    if (entries.length === 0) entries = voucher.entries.slice(0, 1);

    if (entries.length === 0) {
        return { side: "Dr", particulars: "-", amount: voucher.totalAmount };
    }

    return {
        side: entries[0].type,
        particulars: entries.map((entry) => entry.ledger?.name || "-").join(", "),
        amount: entries.reduce((sum, entry) => sum + entry.amount, 0),
    };
};

function Daybook() {
    const navigate = useNavigate();
    const companyId = getSelectedCompany()?._id;

    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const fetchVouchers = async () => {
        if (!companyId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const params = new URLSearchParams();
            if (typeFilter) params.append("type", typeFilter);
            if (fromDate) params.append("from", fromDate);
            if (toDate) params.append("to", toDate);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/companies/${companyId}/vouchers?${params.toString()}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to load day book");
            }

            setVouchers(data.data || []);
        } catch (err) {
            setError(err.message || "Unable to load day book");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, [companyId, typeFilter, fromDate, toDate]);

    const searchValue = search.toLowerCase().trim();

    const rows = vouchers
        .map((voucher) => ({ voucher, ...getRowData(voucher) }))
        .filter(({ voucher }) => {
            if (!searchValue) return true;

            const text = [
                getVoucherNo(voucher),
                voucherTypes[voucher.voucherType]?.label,
                voucher.narration,
                voucher.refNo,
                ...voucher.entries.map((entry) => entry.ledger?.name),
            ]
                .join(" ")
                .toLowerCase();

            return text.includes(searchValue);
        });

    const totalDebit = rows
        .filter((row) => row.side === "Dr")
        .reduce((sum, row) => sum + row.amount, 0);

    const totalCredit = rows
        .filter((row) => row.side === "Cr")
        .reduce((sum, row) => sum + row.amount, 0);

    const hasFilters = search || typeFilter || fromDate || toDate;

    const clearFilters = () => {
        setSearch("");
        setTypeFilter("");
        setFromDate("");
        setToDate("");
    };

    return (
        <div className="w-[83vw]">
            <DaybookNavbar />

            <main className="bg-white w-full h-[95vh]">
                <div className="flex items-center justify-between px-5 py-3 bg-white border-b shadow-sm">
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search ledger, voucher no, narration..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="outline-none bg-transparent text-sm w-72"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">All Voucher Types</option>
                            {Object.entries(voucherTypes).map(([key, info]) => (
                                <option key={key} value={key}>
                                    {info.label}
                                </option>
                            ))}
                        </select>

                        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50 shadow-sm date_input">
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="text-sm outline-none bg-transparent"
                            />
                            <span className="text-gray-500 text-sm">to</span>
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="text-sm outline-none bg-transparent"
                            />
                        </div>

                        {hasFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {!companyId && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <p className="text-lg font-semibold text-gray-800">No company selected</p>
                        <p className="mt-1 text-sm text-gray-500">
                            Select a company to see its day book.
                        </p>
                        <button
                            onClick={() => navigate("/company")}
                            className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Select Company
                        </button>
                    </div>
                )}

                {companyId && (
                    <div className="m-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="h-[56vh] overflow-y-auto">
                            <div
                                className={`${rowGrid} sticky top-0 z-10 border-b bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500`}
                            >
                                <p>Date</p>
                                <p>Particulars</p>
                                <p>Vch Type</p>
                                <p>Vch No</p>
                                <p className="text-right">Debit Amount</p>
                                <p className="text-right">Credit Amount</p>
                            </div>

                            {loading && (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="w-9 h-9 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                                    <p className="mt-3 text-sm text-gray-500">Loading day book...</p>
                                </div>
                            )}

                            {!loading && error && (
                                <div className="py-16 text-center">
                                    <p className="text-red-600 font-medium">{error}</p>
                                    <button
                                        onClick={fetchVouchers}
                                        className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                                    >
                                        Retry
                                    </button>
                                </div>
                            )}

                            {!loading && !error && rows.length === 0 && (
                                <p className="py-20 text-center text-gray-500">
                                    {vouchers.length === 0
                                        ? "No vouchers yet for this company."
                                        : "No vouchers match your search."}
                                </p>
                            )}

                            {!loading &&
                                !error &&
                                rows.map(({ voucher, side, particulars, amount }) => {
                                    const info = voucherTypes[voucher.voucherType];

                                    return (
                                        <div
                                            key={voucher._id}
                                            className={`${rowGrid} border-b border-l-4 border-l-transparent px-4 py-3 text-sm text-gray-600 transition hover:border-l-amber-400 hover:bg-amber-50/60`}
                                        >
                                            <p className="whitespace-nowrap">{formatDate(voucher.date)}</p>

                                            <div className="min-w-0">
                                                <p className="truncate font-semibold text-gray-800">
                                                    {particulars}
                                                </p>
                                                {voucher.narration && (
                                                    <p className="truncate text-xs italic text-gray-400">
                                                        {voucher.narration}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        info?.style || "bg-gray-100 text-gray-600"
                                                    }`}
                                                >
                                                    {info?.label || voucher.voucherType}
                                                </span>
                                            </div>

                                            <p className="font-medium text-gray-700">
                                                {getVoucherNo(voucher)}
                                            </p>

                                            <p className="text-right font-semibold tabular-nums text-gray-800">
                                                {side === "Dr" ? money(amount) : ""}
                                            </p>

                                            <p className="text-right font-semibold tabular-nums text-gray-800">
                                                {side === "Cr" ? money(amount) : ""}
                                            </p>
                                        </div>
                                    );
                                })}
                        </div>

                        <div className={`${rowGrid} border-t-2 bg-slate-50 px-4 py-3 text-sm`}>
                            <p className="col-span-4 text-gray-500">
                                Vouchers:{" "}
                                <span className="font-semibold text-gray-800">{rows.length}</span>
                            </p>
                            <p className="text-right font-bold tabular-nums text-gray-800">
                                {money(totalDebit)}
                            </p>
                            <p className="text-right font-bold tabular-nums text-gray-800">
                                {money(totalCredit)}
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Daybook;
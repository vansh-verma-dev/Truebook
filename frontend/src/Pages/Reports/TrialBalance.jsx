import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaPrint, FaFileCsv, FaChevronDown, FaChevronRight } from "react-icons/fa";

const rowGrid = "grid grid-cols-[1fr_140px_130px_130px_140px_140px] items-center gap-3";

const invoiceTypes = ["sales", "purchase", "salesReturn", "purchaseReturn"];

 
const groupValue = (g) => g.key || g._id;

 
const idOf = (value) => value?._id || value || "";

const getCompany = () => {
    try {
        return JSON.parse(localStorage.getItem("selectedCompany") || "null");
    } catch {
        return null;
    }
};

const dayOf = (date) => (date ? new Date(date).toLocaleDateString("en-CA") : "");

// financial year: 1 April se 31 March
const financialYearStart = () => {
    const now = new Date();
    const year = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
    return `${year}-04-01`;
};

const money = (amount) =>
    Number(amount || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

const isZero = (n) => Math.abs(n) < 0.005;

const formatDate = (day) => {
    if (!day) return "-";
    return new Date(`${day}T00:00:00`).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

 
const entriesOf = (v, ledgers) => {
    if (Array.isArray(v.entries) && v.entries.length > 0) {
        return v.entries.map((e) => ({
            ledger: idOf(e.ledger),
            type: e.type,
            amount: Number(e.amount || 0),
        }));
    }

    if (invoiceTypes.includes(v.voucherType) && Array.isArray(v.items) && v.party) {
        const amount = v.items.reduce(
            (sum, item) => sum + Number(item.quantity ?? item.qty ?? 0) * Number(item.rate || 0),
            0
        );
        const counterGroup = v.voucherType.startsWith("sales") ? "sales" : "purchase";
        const counter = ledgers.find((l) => l.group === counterGroup);
        if (!counter || amount <= 0) return [];

        const party = idOf(v.party);
       
        const partyIsDr = v.voucherType === "sales" || v.voucherType === "purchaseReturn";

        return [
            { ledger: party, type: partyIsDr ? "Dr" : "Cr", amount },
            { ledger: counter._id, type: partyIsDr ? "Cr" : "Dr", amount },
        ];
    }

    return [];
};

function TrialBalance() {
    const company = getCompany();
    const companyId = company?._id;
    const baseUrl = `${import.meta.env.VITE_API_URL}/api/companies/${companyId}`;
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const [ledgers, setLedgers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [from, setFrom] = useState(financialYearStart());
    const [to, setTo] = useState(new Date().toLocaleDateString("en-CA"));
    const [groupFilter, setGroupFilter] = useState("");
    const [search, setSearch] = useState("");
    const [hideZero, setHideZero] = useState(true);
    const [collapsed, setCollapsed] = useState({});

    const getJson = async (path, message) => {
        const res = await fetch(`${baseUrl}/${path}`, { headers });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || message);
        return data;
    };

    const loadAll = async () => {
        try {
            setLoading(true);
            setError("");
            const [ledgerData, groupData, voucherData] = await Promise.all([
                getJson("ledgers", "Failed to load ledgers"),
                getJson("group", "Failed to load groups"),
                getJson("vouchers", "Failed to load vouchers"),
            ]);
            setLedgers(ledgerData.ledger || ledgerData.data || []);
            setGroups(groupData.groups || []);
            setVouchers(voucherData.vouchers || voucherData.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (companyId) loadAll();
        else setLoading(false);
    }, [companyId]);

 
    const { rows, skipped } = useMemo(() => {
        const map = {};
        ledgers.forEach((l) => {
            const opening = Number(l.openingBalance || 0) * (l.openingType === "Cr" ? -1 : 1);
            map[l._id] = { ledger: l, opening, dr: 0, cr: 0 };
        });

        let skippedCount = 0;

        vouchers.forEach((v) => {
            const day = dayOf(v.date);
            if (to && day > to) return;

            const list = entriesOf(v, ledgers);
            if (list.length === 0) {
                skippedCount++;
                return;
            }

            list.forEach((e) => {
                const row = map[e.ledger];
                if (!row) return;

                if (from && day < from) {
                    row.opening += e.type === "Dr" ? e.amount : -e.amount;
                } else if (e.type === "Dr") {
                    row.dr += e.amount;
                } else {
                    row.cr += e.amount;
                }
            });
        });

        const result = Object.values(map).map((row) => {
            const closing = row.opening + row.dr - row.cr;
            return {
                ...row,
                closingDr: closing > 0 ? closing : 0,
                closingCr: closing < 0 ? -closing : 0,
            };
        });

        return { rows: result, skipped: skippedCount };
    }, [ledgers, vouchers, from, to]);

    // groups ke hisaab se sections
    const sections = useMemo(() => {
        const query = search.toLowerCase().trim();

        const visible = rows.filter((row) => {
            if (groupFilter && row.ledger.group !== groupFilter) return false;
            if (query && !row.ledger.name.toLowerCase().includes(query)) return false;
            if (hideZero && isZero(row.opening) && isZero(row.dr) && isZero(row.cr)) return false;
            return true;
        });

        const known = groups.map((g) => ({ value: groupValue(g), name: g.name }));
        const knownValues = known.map((g) => g.value);
        const unknown = [...new Set(visible.map((r) => r.ledger.group))]
            .filter((value) => !knownValues.includes(value))
            .map((value) => ({ value, name: value || "Other" }));

        return [...known, ...unknown]
            .map((g) => {
                const items = visible
                    .filter((r) => r.ledger.group === g.value)
                    .sort((a, b) => a.ledger.name.localeCompare(b.ledger.name));
                return { ...g, items, total: sum(items) };
            })
            .filter((g) => g.items.length > 0);
    }, [rows, groups, groupFilter, search, hideZero]);

    const grand = sum(sections.flatMap((s) => s.items));
    const difference = Math.round((grand.closingDr - grand.closingCr) * 100) / 100;
    const tallied = difference === 0;

    const signed = (n) => (isZero(n) ? "-" : `${money(Math.abs(n))} ${n > 0 ? "Dr" : "Cr"}`);
    const amountOrDash = (n) => (isZero(n) ? "-" : money(n));

    const exportCsv = () => {
        const lines = [
            ["Particulars", "Opening", "Debit", "Credit", "Closing Debit", "Closing Credit"],
            ...sections.flatMap((s) => [
                [s.name, signed(s.total.opening), s.total.dr, s.total.cr, s.total.closingDr, s.total.closingCr],
                ...s.items.map((r) => [
                    `  ${r.ledger.name}`,
                    signed(r.opening),
                    r.dr,
                    r.cr,
                    r.closingDr,
                    r.closingCr,
                ]),
            ]),
            ["Grand Total", signed(grand.opening), grand.dr, grand.cr, grand.closingDr, grand.closingCr],
        ];

        const csv = lines
            .map((line) => line.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
            .join("\n");

        const link = document.createElement("a");
        link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
        link.download = `trial-balance-${from}-to-${to}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    const toggle = (value) => setCollapsed({ ...collapsed, [value]: !collapsed[value] });

    if (!companyId) {
        return (
            <section className="flex h-[90vh] w-[83vw] items-center justify-center bg-slate-50">
                <p className="text-gray-500">Select a company first to view the Trial Balance.</p>
            </section>
        );
    }

    return (
        <div className="w-[83vw]">
          
            <style>{`
                @media print {
                    body * { visibility: hidden; }
                    #tb-print, #tb-print * { visibility: visible; }
                    #tb-print { position: absolute; left: 0; top: 0; width: 100%; }
                    .tb-scroll { height: auto !important; overflow: visible !important; }
                }
            `}</style>

            <main className="bg-white w-full h-[95vh]" id="tb-print">
                {/* Filters */}
                <div className="flex items-center justify-between gap-3 border-b bg-white px-5 py-3 shadow-sm print:hidden">
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search ledger..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="outline-none bg-transparent text-sm w-56"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <input
                                type="date"
                                value={from}
                                max={to || undefined}
                                onChange={(e) => setFrom(e.target.value)}
                                className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            to
                            <input
                                type="date"
                                value={to}
                                min={from || undefined}
                                onChange={(e) => setTo(e.target.value)}
                                className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <select
                            value={groupFilter}
                            onChange={(e) => setGroupFilter(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">All Groups</option>
                            {groups.map((g) => (
                                <option key={groupValue(g)} value={groupValue(g)}>
                                    {g.name}
                                </option>
                            ))}
                        </select>

                        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                checked={hideZero}
                                onChange={(e) => setHideZero(e.target.checked)}
                                className="h-4 w-4"
                            />
                            Hide zero ledgers
                        </label>

                        <button
                            onClick={exportCsv}
                            disabled={sections.length === 0}
                            title="Export CSV"
                            className="flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
                        >
                            <FaFileCsv /> CSV
                        </button>
                        <button
                            onClick={() => window.print()}
                            title="Print"
                            className="flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            <FaPrint className="text-xs" /> Print
                        </button>
                    </div>
                </div>

                {/* Report */}
                <div className="m-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b bg-white px-4 py-3 text-center">
                        <h1 className="text-lg font-bold text-gray-800">Trial Balance</h1>
                        <p className="text-sm font-medium text-gray-700">{company?.name}</p>
                        <p className="text-xs text-gray-500">
                            {formatDate(from)} to {formatDate(to)}
                        </p>
                    </div>

                    <div className="tb-scroll h-[56vh] overflow-y-auto">
                        <div
                            className={`${rowGrid} sticky top-0 z-10 border-b bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500`}
                        >
                            <p>Particulars</p>
                            <p className="text-right">Opening</p>
                            <p className="text-right">Debit</p>
                            <p className="text-right">Credit</p>
                            <p className="text-right">Closing Debit</p>
                            <p className="text-right">Closing Credit</p>
                        </div>

                        {loading && <p className="py-20 text-center text-gray-500">Loading trial balance...</p>}

                        {!loading && error && (
                            <div className="py-16 text-center">
                                <p className="text-red-600 font-medium">{error}</p>
                                <button
                                    onClick={loadAll}
                                    className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {!loading && !error && sections.length === 0 && (
                            <p className="py-20 text-center text-gray-500">No ledgers found for this period.</p>
                        )}

                        {!loading &&
                            !error &&
                            sections.map((section) => (
                                <div key={section.value}>
                                    <button
                                        type="button"
                                        onClick={() => toggle(section.value)}
                                        className={`${rowGrid} w-full border-b bg-slate-100 px-4 py-2.5 text-left text-sm font-bold text-gray-800 hover:bg-slate-200/70`}
                                    >
                                        <span className="flex items-center gap-2">
                                            {collapsed[section.value] ? (
                                                <FaChevronRight className="text-[10px] text-gray-500" />
                                            ) : (
                                                <FaChevronDown className="text-[10px] text-gray-500" />
                                            )}
                                            {section.name}
                                            <span className="text-xs font-medium text-gray-400">
                                                ({section.items.length})
                                            </span>
                                        </span>
                                        <span className="text-right tabular-nums">{signed(section.total.opening)}</span>
                                        <span className="text-right tabular-nums">{amountOrDash(section.total.dr)}</span>
                                        <span className="text-right tabular-nums">{amountOrDash(section.total.cr)}</span>
                                        <span className="text-right tabular-nums">
                                            {amountOrDash(section.total.closingDr)}
                                        </span>
                                        <span className="text-right tabular-nums">
                                            {amountOrDash(section.total.closingCr)}
                                        </span>
                                    </button>

                                    {!collapsed[section.value] &&
                                        section.items.map((row) => (
                                            <div
                                                key={row.ledger._id}
                                                className={`${rowGrid} border-b border-l-4 border-l-transparent px-4 py-2.5 text-sm text-gray-600 transition hover:border-l-amber-400 hover:bg-amber-50/60`}
                                            >
                                                <p className="truncate pl-6 font-medium text-gray-800">
                                                    {row.ledger.name}
                                                </p>
                                                <p className="text-right tabular-nums">{signed(row.opening)}</p>
                                                <p className="text-right tabular-nums">{amountOrDash(row.dr)}</p>
                                                <p className="text-right tabular-nums">{amountOrDash(row.cr)}</p>
                                                <p className="text-right font-semibold tabular-nums text-gray-800">
                                                    {amountOrDash(row.closingDr)}
                                                </p>
                                                <p className="text-right font-semibold tabular-nums text-gray-800">
                                                    {amountOrDash(row.closingCr)}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            ))}
                    </div>

                    {/* Grand Total */}
                    <div
                        className={`${rowGrid} border-t-2 border-gray-300 bg-slate-50 px-4 py-3 text-sm font-bold text-gray-800`}
                    >
                        <p>Grand Total</p>
                        <p className="text-right tabular-nums">{signed(grand.opening)}</p>
                        <p className="text-right tabular-nums">{money(grand.dr)}</p>
                        <p className="text-right tabular-nums">{money(grand.cr)}</p>
                        <p className="text-right tabular-nums">{money(grand.closingDr)}</p>
                        <p className="text-right tabular-nums">{money(grand.closingCr)}</p>
                    </div>

                    <div
                        className={`flex items-center justify-between border-t px-4 py-2.5 text-sm ${
                            tallied ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                        }`}
                    >
                        <p className="font-medium">
                            {tallied
                                ? "✓ Trial Balance is tallied (Debit = Credit)"
                                : `Difference in Trial Balance: ₹ ${money(Math.abs(difference))} ${
                                      difference > 0 ? "(Debit is more)" : "(Credit is more)"
                                  }`}
                        </p>
                        {skipped > 0 && (
                            <p className="text-xs font-medium text-amber-600">
                                {skipped} voucher{skipped === 1 ? "" : "s"} could not be included
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

// rows ka total
function sum(items) {
    return items.reduce(
        (total, r) => ({
            opening: total.opening + r.opening,
            dr: total.dr + r.dr,
            cr: total.cr + r.cr,
            closingDr: total.closingDr + r.closingDr,
            closingCr: total.closingCr + r.closingCr,
        }),
        { opening: 0, dr: 0, cr: 0, closingDr: 0, closingCr: 0 }
    );
}

export default TrialBalance;
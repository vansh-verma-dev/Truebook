import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    VoucherHeader,
    VoucherFooter,
    money,
    todayDate,
    inputClass,
} from "./VoucherParts";
import {
    getSelectedCompany,
    fetchLedgers,
    saveVoucher,
    getVoucherNo,
} from "./voucherApi";
import LedgerQuickCreate, { useNewLedgerShortcut } from "./LedgerQuickCreate";

const NEW_LEDGER = "__new__";

const emptyRows = () => [
    { side: "Dr", ledger: "", amount: "" },
    { side: "Cr", ledger: "", amount: "" },
];

function Message({ title, text, children }) {
    return (
        <section className="flex h-full flex-col items-center justify-center bg-slate-50 text-center">
            <p className="text-lg font-semibold text-slate-800">{title}</p>
            <p className="mt-1 max-w-sm text-sm text-slate-500">{text}</p>
            {children}
        </section>
    );
}

function Journal() {
    const companyId = getSelectedCompany()?._id;

    const [ledgers, setLedgers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [savedNo, setSavedNo] = useState("");

    const [date, setDate] = useState(todayDate());
    const [narration, setNarration] = useState("");
    const [rows, setRows] = useState(emptyRows);

    // null | { index } (index = -1 matlab koi row nahi, sirf ledger banana hai)
    const [createTarget, setCreateTarget] = useState(null);

    useEffect(() => {
        if (!companyId) {
            setLoading(false);
            return;
        }

        fetchLedgers(companyId)
            .then(setLedgers)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [companyId]);

    const filledRows = rows.filter((row) => row.ledger && Number(row.amount) > 0);

    const totalDr = filledRows
        .filter((row) => row.side === "Dr")
        .reduce((sum, row) => sum + Number(row.amount), 0);

    const totalCr = filledRows
        .filter((row) => row.side === "Cr")
        .reduce((sum, row) => sum + Number(row.amount), 0);

    const difference = totalDr - totalCr;
    const isBalanced = totalDr > 0 && Math.round(difference * 100) === 0;

    const changeRow = (index, field, value) => {
        if (field === "ledger" && value === NEW_LEDGER) {
            setCreateTarget({ index });
            return;
        }
        setRows(rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    };

    const addRow = () => setRows([...rows, { side: "Dr", ledger: "", amount: "" }]);

    const removeRow = (index) => setRows(rows.filter((row, i) => i !== index));

    // Ctrl + N / Alt + N: pehli khali row ke liye ledger banao
    useNewLedgerShortcut(() => {
        if (!companyId || loading || error || createTarget) return;

        const emptyIndex = rows.findIndex((row) => !row.ledger);
        if (emptyIndex >= 0) {
            setCreateTarget({ index: emptyIndex });
        } else {
            setRows([...rows, { side: "Dr", ledger: "", amount: "" }]);
            setCreateTarget({ index: rows.length });
        }
    });

    const handleCreated = (list, created) => {
        setLedgers(list);

        if (created && createTarget.index >= 0) {
            setRows(
                rows.map((row, i) =>
                    i === createTarget.index ? { ...row, ledger: created._id } : row
                )
            );
        }

        setCreateTarget(null);
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            const voucher = await saveVoucher(companyId, {
                voucherType: "journal",
                date,
                narration,
                entries: filledRows.map((row) => ({
                    ledger: row.ledger,
                    type: row.side,
                    amount: Number(row.amount),
                })),
            });

            const voucherNo = getVoucherNo(voucher.voucherType, voucher.voucherNumber);

            setSavedNo(voucherNo);
            toast.success(`Voucher saved (${voucherNo})`);
            setRows(emptyRows());
            setNarration("");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSaving(false);
        }
    };

    const modal = createTarget && (
        <LedgerQuickCreate
            companyId={companyId}
            onClose={() => setCreateTarget(null)}
            onCreated={handleCreated}
        />
    );

    if (!companyId) {
        return <Message title="No company selected" text="Select a company first to create vouchers." />;
    }

    if (loading) {
        return <Message title="Loading..." text="Fetching your ledgers" />;
    }

    if (error) {
        return <Message title="Something went wrong" text={error} />;
    }

    if (ledgers.length < 2) {
        return (
            <>
                <Message
                    title="Not enough ledgers"
                    text="A journal voucher needs at least 2 ledgers. Create them to continue."
                >
                    <button
                        type="button"
                        onClick={() => setCreateTarget({ index: -1 })}
                        className="mt-4 h-10 rounded-lg bg-orange-500 px-5 text-sm font-semibold text-white hover:bg-orange-600"
                    >
                        + Create ledger
                    </button>
                </Message>
                {modal}
            </>
        );
    }

    return (
        <section className="flex h-full flex-col bg-slate-50">
            <VoucherHeader
                title="Journal Voucher"
                subtitle="Record adjustment and non-cash accounting transactions"
                voucherNo={savedNo || "Auto"}
                date={date}
                setDate={setDate}
            />

            <div className="flex-1 overflow-y-auto p-4">
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="grid grid-cols-[80px_1fr_150px_150px_40px] gap-3 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <p>Dr / Cr</p>
                        <p>Particulars</p>
                        <p className="text-right">Debit</p>
                        <p className="text-right">Credit</p>
                        <span></span>
                    </div>

                    {rows.map((row, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[80px_1fr_150px_150px_40px] items-center gap-3 border-b border-slate-100 px-4 py-2 hover:bg-orange-50/50"
                        >
                            <select
                                value={row.side}
                                onChange={(e) => changeRow(index, "side", e.target.value)}
                                className={inputClass}
                            >
                                <option value="Dr">Dr</option>
                                <option value="Cr">Cr</option>
                            </select>

                            <select
                                value={row.ledger}
                                onChange={(e) => changeRow(index, "ledger", e.target.value)}
                                className={`${inputClass} max-w-xs`}
                            >
                                <option value="">Select ledger</option>
                                <option value={NEW_LEDGER}>+ Create new ledger</option>
                                {ledgers.map((ledger) => (
                                    <option key={ledger._id} value={ledger._id}>
                                        {ledger.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                min="0"
                                placeholder="0.00"
                                disabled={row.side !== "Dr"}
                                value={row.side === "Dr" ? row.amount : ""}
                                onChange={(e) => changeRow(index, "amount", e.target.value)}
                                className={`${inputClass} text-right`}
                            />

                            <input
                                type="number"
                                min="0"
                                placeholder="0.00"
                                disabled={row.side !== "Cr"}
                                value={row.side === "Cr" ? row.amount : ""}
                                onChange={(e) => changeRow(index, "amount", e.target.value)}
                                className={`${inputClass} text-right`}
                            />

                            <button
                                type="button"
                                onClick={() => removeRow(index)}
                                disabled={rows.length <= 2}
                                className="h-9 rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            type="button"
                            onClick={addRow}
                            className="text-sm font-medium text-orange-600 hover:text-orange-700"
                        >
                            + Add Row
                        </button>
                        <span className="text-xs text-slate-400">Alt + N : new ledger</span>
                    </div>
                </div>
            </div>

            <VoucherFooter
                narration={narration}
                setNarration={setNarration}
                onSave={handleSave}
                saveDisabled={!isBalanced || saving}
            >
                <div className="flex gap-6">
                    <div>
                        <p className="text-xs text-slate-500">Total Debit</p>
                        <p className="text-lg font-bold text-slate-800">₹ {money(totalDr)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Total Credit</p>
                        <p className="text-lg font-bold text-slate-800">₹ {money(totalCr)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Difference</p>
                        <p
                            className={`text-lg font-bold ${
                                isBalanced ? "text-green-600" : "text-red-500"
                            }`}
                        >
                            ₹ {money(Math.abs(difference))}
                        </p>
                    </div>
                </div>
            </VoucherFooter>

            {modal}
        </section>
    );
}

export default Journal;
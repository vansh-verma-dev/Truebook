import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    VoucherHeader,
    VoucherFooter,
    unitList,
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

const emptyRow = { name: "", qty: "", unit: "Pcs", rate: "" };

const NEW_LEDGER = "__new__";

const rowAmount = (row) => Number(row.qty || 0) * Number(row.rate || 0);

function Message({ title, text }) {
    return (
        <section className="flex h-full flex-col items-center justify-center bg-slate-50 text-center">
            <p className="text-lg font-semibold text-slate-800">{title}</p>
            <p className="mt-1 max-w-sm text-sm text-slate-500">{text}</p>
        </section>
    );
}

function InvoiceVoucher({ type, title, subtitle, partyLabel, partyGroup }) {
    const companyId = getSelectedCompany()?._id;

    const [ledgers, setLedgers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [savedNo, setSavedNo] = useState("");
    const [creating, setCreating] = useState(false);

    const [date, setDate] = useState(todayDate());
    const [party, setParty] = useState("");
    const [refNo, setRefNo] = useState("");
    const [narration, setNarration] = useState("");
    const [rows, setRows] = useState([emptyRow]);

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

    const partyLedgers = ledgers.filter((ledger) => ledger.group === partyGroup);

    const filledRows = rows.filter(
        (row) => row.name.trim() && Number(row.qty) > 0 && row.rate !== ""
    );
    const total = filledRows.reduce((sum, row) => sum + rowAmount(row), 0);

    const changeParty = (value) => {
        if (value === NEW_LEDGER) {
            setCreating(true);
            return;
        }
        setParty(value);
    };

    const changeRow = (index, field, value) => {
        setRows(rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    };

    const addRow = () => setRows([...rows, emptyRow]);

    const removeRow = (index) => setRows(rows.filter((row, i) => i !== index));

    // Ctrl + N / Alt + N: naya party ledger
    useNewLedgerShortcut(() => {
        if (!companyId || loading || error || creating) return;
        setCreating(true);
    });

    const handleCreated = (list, created) => {
        setLedgers(list);
        if (created) setParty(created._id);
        setCreating(false);
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            const voucher = await saveVoucher(companyId, {
                voucherType: type,
                date,
                party,
                refNo,
                narration,
                items: filledRows.map((row) => ({
                    name: row.name.trim(),
                    quantity: Number(row.qty),
                    unit: row.unit,
                    rate: Number(row.rate),
                })),
            });

            const voucherNo = getVoucherNo(voucher.voucherType, voucher.voucherNumber);

            setSavedNo(voucherNo);
            toast.success(`Voucher saved (${voucherNo})`);
            setParty("");
            setRefNo("");
            setNarration("");
            setRows([emptyRow]);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (!companyId) {
        return <Message title="No company selected" text="Select a company first to create vouchers." />;
    }

    if (loading) {
        return <Message title="Loading..." text="Fetching your ledgers" />;
    }

    if (error) {
        return <Message title="Something went wrong" text={error} />;
    }

    return (
        <section className="flex h-full flex-col bg-slate-50">
            <VoucherHeader
                title={title}
                subtitle={subtitle}
                voucherNo={savedNo || "Auto"}
                date={date}
                setDate={setDate}
            />

            <div className="flex-1 overflow-y-auto p-4">
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-6 border-b border-slate-100 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-slate-700">
                                {partyLabel}
                            </label>
                            <select
                                value={party}
                                onChange={(e) => changeParty(e.target.value)}
                                className={`${inputClass} w-64`}
                            >
                                <option value="">Select party</option>
                                <option value={NEW_LEDGER}>+ Create new ledger</option>
                                {partyLedgers.map((ledger) => (
                                    <option key={ledger._id} value={ledger._id}>
                                        {ledger.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-slate-700">
                                Bill / Ref No
                            </label>
                            <input
                                value={refNo}
                                onChange={(e) => setRefNo(e.target.value)}
                                placeholder="Optional"
                                className={`${inputClass} w-40`}
                            />
                        </div>

                        <span className="ml-auto text-xs text-slate-400">
                            Alt + N : new ledger
                        </span>
                    </div>

                    <div className="grid grid-cols-[1fr_100px_100px_130px_140px_36px] gap-3 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <p>Item Name</p>
                        <p className="text-center">Qty</p>
                        <p className="text-center">Unit</p>
                        <p className="text-right">Rate</p>
                        <p className="text-right">Amount</p>
                        <span></span>
                    </div>

                    {rows.map((row, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[1fr_100px_100px_130px_140px_36px] items-center gap-3 border-b border-slate-100 px-4 py-2 hover:bg-orange-50/50"
                        >
                            <input
                                value={row.name}
                                onChange={(e) => changeRow(index, "name", e.target.value)}
                                placeholder="Item name"
                                className={`${inputClass} max-w-sm`}
                            />

                            <input
                                type="number"
                                min="0"
                                placeholder="0"
                                value={row.qty}
                                onChange={(e) => changeRow(index, "qty", e.target.value)}
                                className={`${inputClass} text-center`}
                            />

                            <select
                                value={row.unit}
                                onChange={(e) => changeRow(index, "unit", e.target.value)}
                                className={inputClass}
                            >
                                {unitList.map((name) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                min="0"
                                placeholder="0.00"
                                value={row.rate}
                                onChange={(e) => changeRow(index, "rate", e.target.value)}
                                className={`${inputClass} text-right`}
                            />

                            <input
                                readOnly
                                value={money(rowAmount(row))}
                                className={`${inputClass} bg-slate-50 text-right font-medium`}
                            />

                            <button
                                type="button"
                                onClick={() => removeRow(index)}
                                disabled={rows.length === 1}
                                className="h-9 rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <div className="px-4 py-3">
                        <button
                            type="button"
                            onClick={addRow}
                            className="text-sm font-medium text-orange-600 hover:text-orange-700"
                        >
                            + Add Item
                        </button>
                    </div>
                </div>
            </div>

            <VoucherFooter
                narration={narration}
                setNarration={setNarration}
                onSave={handleSave}
                saveDisabled={!party || filledRows.length === 0 || saving}
            >
                <p className="text-xs text-slate-500">
                    {saving ? "Saving..." : `Total Amount (${filledRows.length} items)`}
                </p>
                <h2 className="text-2xl font-bold text-orange-600">₹ {money(total)}</h2>
            </VoucherFooter>

            {creating && (
                <LedgerQuickCreate
                    companyId={companyId}
                    title={`Create ${partyLabel}`}
                    groupFilter={(g) => g.key === partyGroup}
                    defaultGroup={partyGroup}
                    onClose={() => setCreating(false)}
                    onCreated={handleCreated}
                />
            )}
        </section>
    );
}

export default InvoiceVoucher;
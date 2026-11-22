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

const emptyRow = { ledger: "", amount: "" };

const isCashBank = (ledger) => ledger.group === "cash" || ledger.group === "bank";

function Message({ title, text }) {
    return (
        <section className="flex h-full flex-col items-center justify-center bg-slate-50 text-center">
            <p className="text-lg font-semibold text-slate-800">{title}</p>
            <p className="mt-1 max-w-sm text-sm text-slate-500">{text}</p>
        </section>
    );
}

function CashBankVoucher({
    type,
    title,
    subtitle,
    accountLabel,
    accountSide,
    onlyCashBank = false,
}) {
    const companyId = getSelectedCompany()?._id;

    const [ledgers, setLedgers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [savedNo, setSavedNo] = useState("");

    const [date, setDate] = useState(todayDate());
    const [account, setAccount] = useState("");
    const [narration, setNarration] = useState("");
    const [rows, setRows] = useState([emptyRow]);

    useEffect(() => {
        if (!companyId) {
            setLoading(false);
            return;
        }

        fetchLedgers(companyId)
            .then((list) => {
                setLedgers(list);
                const first = list.find(isCashBank);
                if (first) setAccount(first._id);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [companyId]);

    const accountLedgers = ledgers.filter(isCashBank);
    const selectedAccount = ledgers.find((ledger) => ledger._id === account);
    const rowSide = accountSide === "Dr" ? "Cr" : "Dr";

    const particularLedgers = onlyCashBank
        ? accountLedgers.filter((ledger) => ledger._id !== account)
        : ledgers.filter((ledger) => !isCashBank(ledger));

    const filledRows = rows.filter(
        (row) => row.ledger && row.ledger !== account && Number(row.amount) > 0
    );
    const total = filledRows.reduce((sum, row) => sum + Number(row.amount), 0);

    const changeRow = (index, field, value) => {
        setRows(rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    };

    const addRow = () => setRows([...rows, emptyRow]);

    const removeRow = (index) => setRows(rows.filter((row, i) => i !== index));

    const handleSave = async () => {
        try {
            setSaving(true);

            const payload = {
                voucherType: type,
                date,
                narration,
                entries: [
                    { ledger: account, type: accountSide, amount: total },
                    ...filledRows.map((row) => ({
                        ledger: row.ledger,
                        type: rowSide,
                        amount: Number(row.amount),
                    })),
                ],
            };

            if (type === "payment" || type === "receipt") {
                payload.paymentMode = selectedAccount?.group;
            }

            const voucher = await saveVoucher(companyId, payload);
            const voucherNo = getVoucherNo(voucher.voucherType, voucher.voucherNumber);

            setSavedNo(voucherNo);
            toast.success(`Voucher saved (${voucherNo})`);
            setRows([emptyRow]);
            setNarration("");
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

    if (accountLedgers.length === 0) {
        return (
            <Message
                title="No Cash or Bank ledger"
                text="Create a ledger with group Cash or Bank first, then come back here."
            />
        );
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
                    <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                        <label className="text-sm font-medium text-slate-700">
                            {accountLabel}
                        </label>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                            {accountSide}
                        </span>
                        <select
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                            className={`${inputClass} w-56`}
                        >
                            {accountLedgers.map((ledger) => (
                                <option key={ledger._id} value={ledger._id}>
                                    {ledger.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-[1fr_180px_40px] gap-3 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <p>Particulars</p>
                        <p className="text-right">Amount</p>
                        <span></span>
                    </div>

                    {rows.map((row, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[1fr_180px_40px] items-center gap-3 border-b border-slate-100 px-4 py-2 hover:bg-orange-50/50"
                        >
                            <select
                                value={row.ledger}
                                onChange={(e) => changeRow(index, "ledger", e.target.value)}
                                className={`${inputClass} max-w-xs`}
                            >
                                <option value="">Select ledger</option>
                                {particularLedgers.map((ledger) => (
                                    <option key={ledger._id} value={ledger._id}>
                                        {ledger.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                min="0"
                                placeholder="0.00"
                                value={row.amount}
                                onChange={(e) => changeRow(index, "amount", e.target.value)}
                                className={`${inputClass} text-right`}
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
                            + Add Row
                        </button>
                    </div>
                </div>
            </div>

            <VoucherFooter
                narration={narration}
                setNarration={setNarration}
                onSave={handleSave}
                saveDisabled={total <= 0 || saving}
            >
                <p className="text-xs text-slate-500">
                    {saving ? "Saving..." : "Total Amount"}
                </p>
                <h2 className="text-2xl font-bold text-orange-600">₹ {money(total)}</h2>
            </VoucherFooter>
        </section>
    );
}

export default CashBankVoucher;
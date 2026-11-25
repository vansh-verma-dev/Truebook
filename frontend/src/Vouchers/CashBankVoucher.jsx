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

const emptyRow = { ledger: "", amount: "" };

const NEW_LEDGER = "__new__";

const isCashBank = (ledger) => ledger.group === "cash" || ledger.group === "bank";
const isCashBankGroup = (g) => g.key === "cash" || g.key === "bank";

function Message({ title, text, children }) {
    return (
        <section className="flex h-full flex-col items-center justify-center bg-slate-50 text-center">
            <p className="text-lg font-semibold text-slate-800">{title}</p>
            <p className="mt-1 max-w-sm text-sm text-slate-500">{text}</p>
            {children}
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

    // null | { type: "account" } | { type: "row", index }
    const [createTarget, setCreateTarget] = useState(null);

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

    // Contra: sirf baaki Cash/Bank | Payment & Receipt: Cash/Bank ke alawa sab
    const particularLedgers = onlyCashBank
        ? accountLedgers.filter((ledger) => ledger._id !== account)
        : ledgers.filter((ledger) => !isCashBank(ledger));

    const filledRows = rows.filter(
        (row) => row.ledger && row.ledger !== account && Number(row.amount) > 0
    );
    const total = filledRows.reduce((sum, row) => sum + Number(row.amount), 0);

    // jo ledger kisi row me select ho chuka hai, wo doosri rows me nahi dikhega
    const usedLedgers = rows.map((row) => row.ledger).filter(Boolean);

    // account badalne par agar wahi ledger kisi row me tha, to wo row khali ho jaye
    const changeAccount = (id) => {
        if (id === NEW_LEDGER) {
            setCreateTarget({ type: "account" });
            return;
        }
        setAccount(id);
        setRows(rows.map((row) => (row.ledger === id ? { ...row, ledger: "" } : row)));
    };

    const changeRow = (index, field, value) => {
        if (field === "ledger" && value === NEW_LEDGER) {
            setCreateTarget({ type: "row", index });
            return;
        }
        setRows(rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    };

    const addRow = () => setRows([...rows, emptyRow]);

    const removeRow = (index) => setRows(rows.filter((row, i) => i !== index));

    // Ctrl + N / Alt + N: pehli khali row ke liye ledger banao
    useNewLedgerShortcut(() => {
        if (!companyId || loading || error || createTarget) return;

        if (accountLedgers.length === 0) {
            setCreateTarget({ type: "account" });
            return;
        }

        const emptyIndex = rows.findIndex((row) => !row.ledger);
        if (emptyIndex >= 0) {
            setCreateTarget({ type: "row", index: emptyIndex });
        } else {
            setRows([...rows, emptyRow]);
            setCreateTarget({ type: "row", index: rows.length });
        }
    });

    const handleCreated = (list, created) => {
        setLedgers(list);

        if (created) {
            if (createTarget.type === "account") {
                setAccount(created._id);
            } else {
                setRows(
                    rows.map((row, i) =>
                        i === createTarget.index ? { ...row, ledger: created._id } : row
                    )
                );
            }
        }

        setCreateTarget(null);
    };

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

    // ledger banane wala popup kis type ke groups dikhaye
    const accountMode = createTarget?.type === "account";
    const rowCashBankOnly = onlyCashBank && !accountMode;

    const modal = createTarget && (
        <LedgerQuickCreate
            companyId={companyId}
            title={accountMode ? `Create ${accountLabel} Ledger` : "Create Ledger"}
            groupFilter={
                accountMode || rowCashBankOnly
                    ? isCashBankGroup
                    : (g) => !isCashBankGroup(g)
            }
            defaultGroup={
                accountMode || rowCashBankOnly
                    ? "bank"
                    : type === "receipt"
                    ? "sundryDebtor"
                    : "sundryCreditor"
            }
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

    if (accountLedgers.length === 0 || (onlyCashBank && accountLedgers.length < 2)) {
        return (
            <>
                <Message
                    title={
                        accountLedgers.length === 0
                            ? "No Cash or Bank ledger"
                            : "Need 2 Cash / Bank ledgers"
                    }
                    text={
                        onlyCashBank
                            ? "Contra transfers money between two Cash / Bank accounts. Create them to continue."
                            : "Create a Cash or Bank ledger to continue."
                    }
                >
                    <button
                        type="button"
                        onClick={() => setCreateTarget({ type: "account" })}
                        className="mt-4 h-10 rounded-lg bg-orange-500 px-5 text-sm font-semibold text-white hover:bg-orange-600"
                    >
                        + Create Cash / Bank ledger
                    </button>
                </Message>
                {modal}
            </>
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
                            onChange={(e) => changeAccount(e.target.value)}
                            className={`${inputClass} w-56`}
                        >
                            <option value={NEW_LEDGER}>+ Create new ledger</option>
                            {accountLedgers.map((ledger) => (
                                <option key={ledger._id} value={ledger._id}>
                                    {ledger.name}
                                </option>
                            ))}
                        </select>
                        <span className="ml-auto text-xs text-slate-400">
                            Alt + N : new ledger
                        </span>
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
                                <option value={NEW_LEDGER}>+ Create new ledger</option>
                                {particularLedgers
                                    .filter(
                                        (ledger) =>
                                            ledger._id === row.ledger ||
                                            !usedLedgers.includes(ledger._id)
                                    )
                                    .map((ledger) => (
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

            {modal}
        </section>
    );
}

export default CashBankVoucher;
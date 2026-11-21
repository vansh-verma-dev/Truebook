import { useState } from "react";
import {
    VoucherHeader,
    VoucherFooter,
    cashBankList,
    money,
    todayDate,
    inputClass,
} from "./VoucherParts";

const emptyRow = { ledger: "", amount: "" };

function CashBankVoucher({
    type,
    title,
    subtitle,
    voucherNo,
    accountLabel,
    accountSide,
    particularList,
}) {
    const [date, setDate] = useState(todayDate());
    const [account, setAccount] = useState(cashBankList[0]);
    const [narration, setNarration] = useState("");
    const [rows, setRows] = useState([emptyRow]);

    const balance = "88,789.00 Cr";
    const rowSide = accountSide === "Dr" ? "Cr" : "Dr";
    const options = particularList.filter((name) => name !== account);

    const filledRows = rows.filter(
        (row) => row.ledger && row.ledger !== account && Number(row.amount) > 0
    );
    const total = filledRows.reduce((sum, row) => sum + Number(row.amount), 0);

    const changeRow = (index, field, value) => {
        setRows(rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    };

    const addRow = () => setRows([...rows, emptyRow]);

    const removeRow = (index) => setRows(rows.filter((row, i) => i !== index));

    const handleSave = () => {
        const entries = [
            { ledger: account, type: accountSide, amount: total },
            ...filledRows.map((row) => ({
                ledger: row.ledger,
                type: rowSide,
                amount: Number(row.amount),
            })),
        ];

        console.log({ voucherType: type, date, narration, entries });
        // call api here
    };

    return (
        <section className="flex h-full flex-col bg-slate-50">
            <VoucherHeader
                title={title}
                subtitle={subtitle}
                voucherNo={voucherNo}
                date={date}
                setDate={setDate}
            />

            <div className="flex-1 overflow-y-auto p-4">
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-6 border-b border-slate-100 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-slate-700">
                                {accountLabel}
                            </label>
                            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                                {accountSide}
                            </span>
                            <select
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                                className={`${inputClass} w-52`}
                            >
                                {cashBankList.map((name) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <p className="text-sm text-slate-500">
                            Current Bal :{" "}
                            <span className="font-semibold text-green-600">₹ {balance}</span>
                        </p>
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
                                {options.map((name) => (
                                    <option key={name} value={name}>
                                        {name}
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
                saveDisabled={total <= 0}
            >
                <p className="text-xs text-slate-500">Total Amount</p>
                <h2 className="text-2xl font-bold text-orange-600">₹ {money(total)}</h2>
            </VoucherFooter>
        </section>
    );
}

export default CashBankVoucher;
import { useState } from "react";
import {
    VoucherHeader,
    VoucherFooter,
    cashBankList,
    ledgerList,
    partyList,
    money,
    todayDate,
    inputClass,
} from "./VoucherParts";

const allLedgers = [...cashBankList, ...ledgerList, ...partyList];

function Journal() {
    const [date, setDate] = useState(todayDate());
    const [narration, setNarration] = useState("");
    const [rows, setRows] = useState([
        { side: "Dr", ledger: "", amount: "" },
        { side: "Cr", ledger: "", amount: "" },
    ]);

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
        setRows(rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    };

    const addRow = () => setRows([...rows, { side: "Dr", ledger: "", amount: "" }]);

    const removeRow = (index) => setRows(rows.filter((row, i) => i !== index));

    const handleSave = () => {
        const entries = filledRows.map((row) => ({
            ledger: row.ledger,
            type: row.side,
            amount: Number(row.amount),
        }));

        console.log({ voucherType: "journal", date, narration, entries });
        // call api here
    };

    return (
        <section className="flex h-full flex-col bg-slate-50">
            <VoucherHeader
                title="Journal Voucher"
                subtitle="Record adjustment and non-cash accounting transactions"
                voucherNo="JV-00001"
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
                                {allLedgers.map((name) => (
                                    <option key={name} value={name}>
                                        {name}
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
                saveDisabled={!isBalanced}
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
        </section>
    );
}

export default Journal;
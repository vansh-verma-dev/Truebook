import { useState } from "react";
import {
    VoucherHeader,
    VoucherFooter,
    itemList,
    unitList,
    gstList,
    money,
    todayDate,
    inputClass,
} from "./VoucherParts";

const emptyRow = { item: "", qty: "", unit: "Pcs", rate: "", gst: 0 };

const rowAmount = (row) => Number(row.qty || 0) * Number(row.rate || 0);

function InvoiceVoucher({ type, title, subtitle, voucherNo, partyLabel, partyList }) {
    const [date, setDate] = useState(todayDate());
    const [party, setParty] = useState("");
    const [narration, setNarration] = useState("");
    const [rows, setRows] = useState([emptyRow]);

    const balance = "50,000 Cr";

    const filledRows = rows.filter((row) => row.item && rowAmount(row) > 0);
    const subTotal = filledRows.reduce((sum, row) => sum + rowAmount(row), 0);
    const gstTotal = filledRows.reduce(
        (sum, row) => sum + (rowAmount(row) * Number(row.gst)) / 100,
        0
    );
    const grandTotal = subTotal + gstTotal;

    const changeRow = (index, field, value) => {
        setRows(rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    };

    const addRow = () => setRows([...rows, emptyRow]);

    const removeRow = (index) => setRows(rows.filter((row, i) => i !== index));

    const handleSave = () => {
        const items = filledRows.map((row) => ({
            name: row.item,
            quantity: Number(row.qty),
            unit: row.unit,
            rate: Number(row.rate),
            gstRate: Number(row.gst),
            amount: rowAmount(row),
        }));

        console.log({ voucherType: type, date, party, narration, items, totalAmount: grandTotal });
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
                                {partyLabel}
                            </label>
                            <select
                                value={party}
                                onChange={(e) => setParty(e.target.value)}
                                className={`${inputClass} w-64`}
                            >
                                <option value="">Select party</option>
                                {partyList.map((name) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {party && (
                            <p className="text-sm text-slate-500">
                                Current Balance :{" "}
                                <span className="font-semibold text-green-600">₹ {balance}</span>
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-[1fr_90px_90px_120px_90px_130px_36px] gap-3 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                        <p>Item Name</p>
                        <p className="text-center">Qty</p>
                        <p className="text-center">Unit</p>
                        <p className="text-right">Rate</p>
                        <p className="text-center">GST %</p>
                        <p className="text-right">Amount</p>
                        <span></span>
                    </div>

                    {rows.map((row, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[1fr_90px_90px_120px_90px_130px_36px] items-center gap-3 border-b border-slate-100 px-4 py-2 hover:bg-orange-50/50"
                        >
                            <select
                                value={row.item}
                                onChange={(e) => changeRow(index, "item", e.target.value)}
                                className={`${inputClass} max-w-xs`}
                            >
                                <option value="">Select item</option>
                                {itemList.map((name) => (
                                    <option key={name} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>

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

                            <select
                                value={row.gst}
                                onChange={(e) => changeRow(index, "gst", e.target.value)}
                                className={inputClass}
                            >
                                {gstList.map((rate) => (
                                    <option key={rate} value={rate}>
                                        {rate}%
                                    </option>
                                ))}
                            </select>

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
                saveDisabled={!party || filledRows.length === 0}
            >
                <p className="text-xs text-slate-500">
                    Sub Total ₹ {money(subTotal)} + GST ₹ {money(gstTotal)}
                </p>
                <p className="mt-1 text-xs text-slate-500">Total Amount</p>
                <h2 className="text-2xl font-bold text-orange-600">₹ {money(grandTotal)}</h2>
            </VoucherFooter>
        </section>
    );
}

export default InvoiceVoucher;
import { useState } from "react";

function Journal() {
    const [rows, setRows] = useState([
        {
            type: "By",
            ledger: "",
            balance: "88,789.00 Dr",
            amount: ""
        },
           {
            type: "To",
            ledger: "",
            balance: "80,789.00 Dr",
            amount: ""
        }
    ]);

    return (
        <section className="h-full bg-white">

            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">

                <div>
                    <h1 className="text-xl font-bold text-slate-800">
                        Journal Voucher
                    </h1>

                    <p className="text-xs text-slate-500 mt-0.5">
                        Record adjustment and non-cash accounting transactions
                    </p>
                </div>

                <div className="flex gap-8 text-sm">

                    <div>
                        <span className="text-slate-500">
                            Voucher No
                        </span>
                        <p className="font-semibold">
                            JV-00001
                        </p>
                    </div>

                    <div>
                        <span className="text-slate-500">
                            Date
                        </span>
                        <p className="font-semibold">
                            05-Jun-2026
                        </p>
                    </div>

                    <div>
                        <span className="text-slate-500">
                            Day
                        </span>
                        <p className="font-semibold">
                            Friday
                        </p>
                    </div>

                </div>
            </div>

            {/* Table Header */}
            <div className="flex justify-between bg-slate-100 border-y border-slate-300 px-3 py-2 font-semibold text-slate-700">

                <div className="w-[60%]">
                    Particulars
                </div>

                <div className="w-[20%] text-center">
                    Debit
                </div>

                <div className="w-[20%] text-center">
                    Credit
                </div>

            </div>

            {/* Entries */}
            <section className="h-[50vh] overflow-y-auto">

                {rows.map((row, index) => (

                    <div
                        key={index}
                        className="flex justify-between px-3 py-2 border-b border-slate-100 hover:bg-orange-50"
                    >

                        {/* Particular */}
                        <div className="w-[60%]">

                            <div className="flex gap-2">

                                <select
                                    className="w-[50px] h-8 border border-slate-300 rounded-md px-2 text-sm"
                                    defaultValue={row.type}
                                >
                                    <option>By</option>
                                    <option>To</option>
                                </select>

                                <div>

                                    <select
                                        className="w-[260px] h-8 border border-slate-300 rounded-md px-2 text-sm"
                                    >
                                        <option>Select Ledger</option>
                                        <option>Cash A/c</option>
                                        <option>Sales A/c</option>
                                        <option>Furniture A/c</option>
                                        <option>Capital A/c</option>
                                        <option>SBI Bank</option>
                                    </select>

                                    <p className="text-xs text-slate-500 mt-1">
                                        Cur Bal : {row.balance}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Debit */}
                        <div className="w-[20%] flex justify-center">

                            <input
                                type="number"
                                placeholder="0.00"
                                disabled={row.type === "To"}
                                className={`w-[140px] h-8 border rounded-md px-3 text-right outline-none
                                ${row.type === "To"
                                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                        : "border-slate-300 focus:border-orange-500"
                                    }`}
                            />

                        </div>

                        {/* Credit */}
                        <div className="w-[20%] flex justify-center">

                            <input
                                type="number"
                                placeholder="0.00"
                                disabled={row.type === "By"}
                                className={`w-[140px] h-8 border rounded-md px-3 text-right outline-none
                                ${row.type === "By"
                                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                        : "border-slate-300 focus:border-orange-500"
                                    }`}
                            />

                        </div>

                    </div>


                ))}

            </section>

            {/* Narration + Totals */}
            <div className="flex justify-between px-4 py-3 overflow-hidden border-t border-slate-200">

                <div>
                    <p className="text-sm font-medium text-slate-700 mb-1">
                        Narration
                    </p>

                    <textarea
                        className="w-[40vw] h-14 border border-slate-300 rounded-md px-3 py-2 resize-none outline-none focus:border-orange-500"
                        placeholder="Enter narration..."
                    ></textarea>
                </div>

                <div className="text-right">

                    <p className="text-sm text-slate-500 mt-2">
                        Total Credit
                    </p>

                    <h2 className="text-xl font-bold text-orange-600">
                        ₹ 0.00
                    </h2>
                </div>

            </div>

        </section>
    );
}

export default Journal;
import { useState } from "react";

function Sales() {
    const [curBal] = useState("50,000 Cr");

    return (
        <section className="h-full bg-white">

            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">

                <div>
                    <h1 className="text-xl font-bold text-slate-800">
                        Sales Voucher
                    </h1>

                    <p className="text-xs text-slate-500 mt-0.5">
                        Record sales transactions and customer invoices
                    </p>
                </div>

                <div className="flex gap-8 text-sm">
                    <div>
                        <span className="text-slate-500">Voucher No</span>
                        <p className="font-semibold">SV-0001</p>
                    </div>

                    <div>
                        <span className="text-slate-500">Date</span>
                        <p className="font-semibold">05-Jun-2026</p>
                    </div>

                    <div>
                        <span className="text-slate-500">Day</span>
                        <p className="font-semibold">Friday</p>
                    </div>
                </div>

            </div>

            {/* Party */}
            <div className="px-4 py-2">

                <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-700">
                        Party A/c :
                    </p>

                    <select className="border border-slate-300 h-8 px-2 rounded-md w-[250px]">
                        <option>Select Party</option>
                    </select>
                </div>

                <p className="text-xs text-green-600 mt-1">
                    Current Balance : {curBal}
                </p>

            </div>

            {/* Item Header */}
            <div className="flex bg-slate-100 border-y border-slate-300 py-2 px-3 font-semibold text-slate-700">

                <div className="w-[45%]">Item Name</div>
                <div className="w-[15%] text-center">Qty</div>
                <div className="w-[20%] text-center">Rate</div>
                <div className="w-[20%] text-center">Amount</div>

            </div>

            {/* Items */}
            <section className="h-[40vh] overflow-y-auto ">

                <div className="flex items-center px-3 py-2 border-b">

                    <div className="w-[45%]">
                        <select className="border border-slate-300 h-8 px-2 rounded-md w-[250px]">
                            <option>Select Item</option>
                        </select>
                    </div>

                    <div className="w-[15%] text-center">
                        <input
                            type="number"
                            className="border border-slate-300 h-8 w-20 rounded-md px-2 text-center"
                        />
                    </div>

                    <div className="w-[20%] text-center">
                        <input
                            type="number"
                            className="border border-slate-300 h-8 w-28 rounded-md px-2 text-right"
                        />
                    </div>

                    <div className="w-[20%] text-center">
                        <input
                            type="number"
                            readOnly
                            value="0.00"
                            className="border border-slate-300 h-8 w-32 rounded-md px-2 text-right bg-slate-50"
                        />
                    </div>

                </div>

            </section>

            {/* Footer */}
            <div className="flex h-[15vh] overflow-hidden    justify-between px-1 py-2">

                    <div>

                        <p className="text-sm font-medium text-slate-700 mb-1">
                            Narration
                        </p>

                        <textarea
                            className="
                            w-[40vw]
                            h-14    
                            border
                            border-slate-300
                            rounded-md
                            px-3
                            py-2
                            outline-none
                            resize-none
                            focus:border-orange-500
                            "
                            placeholder="Enter narration..."
                        ></textarea>

                    </div>

                    <div className="text-right">

                        <p className="text-sm text-slate-500">
                            Total Amount
                        </p>

                        <h2 className="text-2xl font-bold text-orange-600">
                            ₹  {curBal}
                        </h2>

                    </div>

                </div>

        </section>
    );
}

export default Sales;
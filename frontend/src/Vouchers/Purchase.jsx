import { useState } from "react";

function Purchase() {
    const [curBal] = useState("25,000 Cr");

    return (
        <section className="h-full bg-white">

            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">

                <div>
                    <h1 className="text-xl font-bold text-slate-800">
                        Purchase Voucher
                    </h1>

                    <p className="text-xs text-slate-500 mt-0.5">
                        Record purchase transactions and supplier invoices
                    </p>
                </div>

                <div className="flex gap-8 text-sm">

                    <div>
                        <span className="text-slate-500">Voucher No</span>
                        <p className="font-semibold">PV-0001</p>
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

            {/* Supplier Section */}
            <div className="px-4 py-3 border-b border-slate-100">

                <div className="flex items-center gap-2">

                    <p className="font-medium text-slate-700">
                        Supplier A/c :
                    </p>

                    <select className="border border-slate-300 h-8 px-2 rounded-md w-[280px] outline-none focus:border-orange-500">
                        <option>Select Supplier</option>
                        <option>ABC Traders</option>
                        <option>XYZ Enterprises</option>
                        <option>Tech Solutions</option>
                    </select>

                </div>

                <p className="text-xs text-red-600 mt-1 ml-[95px]">
                    Current Balance : ₹ {curBal}
                </p>

            </div>

            {/* Table Header */}
            <div className="flex bg-slate-100 border-y border-slate-300 py-2 px-3 font-semibold text-slate-700">

                <div className="w-[40%]">
                    Item Name
                </div>

                <div className="w-[15%] text-center">
                    Qty
                </div>

                <div className="w-[15%] text-center">
                    Unit
                </div>

                <div className="w-[15%] text-center">
                    Rate
                </div>

                <div className="w-[15%] text-center">
                    Amount
                </div>

            </div>

            {/* Entry Section */}
            <section className="h-[40vh]   overflow-y-auto">

                <div className="flex items-center px-3 py-2 border-b border-slate-100 hover:bg-orange-50">

                    <div className="w-[40%]">

                        <select className="border border-slate-300 h-8 px-2 rounded-md w-[250px] outline-none focus:border-orange-500">
                            <option>Select Item</option>
                            <option>Laptop</option>
                            <option>Mouse</option>
                            <option>Keyboard</option>
                            <option>Monitor</option>
                        </select>

                    </div>

                    <div className="w-[15%] text-center">
                        <input
                            type="number"
                            placeholder="0"
                            className="border border-slate-300 h-8 w-20 rounded-md px-2 text-center outline-none focus:border-orange-500"
                        />
                    </div>

                    <div className="w-[15%] text-center">
                        <select className="border border-slate-300 h-8 w-20 rounded-md px-2 outline-none focus:border-orange-500">
                            <option>Pcs</option>
                            <option>Kg</option>
                            <option>Box</option>
                        </select>
                    </div>

                    <div className="w-[15%] text-center">
                        <input
                            type="number"
                            placeholder="0.00"
                            className="border border-slate-300 h-8 w-24 rounded-md px-2 text-right outline-none focus:border-orange-500"
                        />
                    </div>

                    <div className="w-[15%] text-center">
                        <input
                            type="number"
                            value="0.00"
                            readOnly
                            className="border border-slate-300 h-8 w-28 rounded-md px-2 text-right bg-slate-50"
                        />
                    </div>

                </div>

            </section>

            {/* Footer */}
           <div className="flex h-[18vh] overflow-hidden  justify-between px-1 py-2">

                    <div>

                        <p className="text-sm font-medium text-slate-700 mb-1">
                            Narration
                        </p>

                        <textarea
                            className="
                            w-[40vw]
                            h-12    
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

export default Purchase;
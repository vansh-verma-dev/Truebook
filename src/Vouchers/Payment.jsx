import { useState } from "react";

function Payment() {
    const [curval] = useState("88,789.00 Cr");

    return (
        <section className="h-full bg-slate-50">

            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">

                <div>
                    <h1 className="text-xl font-bold text-slate-800">
                        Payment Voucher
                    </h1>

                    <p className="text-xs text-slate-500 mt-0.5">
                        Manage outgoing payments to suppliers, expenses & accounts
                    </p>
                </div>

                <div className="flex gap-8 text-sm">

                    <div>
                        <span className="text-xs uppercase tracking-wide text-slate-500">
                            Voucher No
                        </span>

                        <p className="font-semibold text-slate-800">
                            CV-00001
                        </p>
                    </div>

                    <div>
                        <span className="text-xs uppercase tracking-wide text-slate-500">
                            Date
                        </span>

                        <p className="font-semibold text-slate-800">
                            04-Jun-2026
                        </p>
                    </div>

                    <div>
                        <span className="text-xs uppercase tracking-wide text-slate-500">
                            Day
                        </span>

                        <p className="font-semibold text-slate-800">
                            Thursday
                        </p>
                    </div>

                </div>

            </div>

            {/* Main */}
            <div className="flex flex-col gap-0 px-3 py-2">

                {/* Account */}
                <div className="flex items-center gap-2">

                    <p className="text-sm font-medium text-slate-700">
                        Account :
                    </p>

                    <select
                        className=" px-3 h-8 w-[200px] border border-slate-300 rounded-md bg-white text-sm text-slate-700 outline-none
                         focus:border-orange-500 "
                    >
                        <option>Cash</option>
                        <option>Bank</option>
                        <option>SBI Bank</option>
                    </select>

                </div>

                {/* Current Balance */}
                <div className="flex items-center gap-2">

                    <p className="text-sm font-medium text-slate-700">
                        Current Bal :
                    </p>

                    <span className="font-semibold text-green-600">
                        ₹ {curval}
                    </span>

                </div>

                {/* Header */}
                <div
                    className="
                    flex
                    justify-between
                    bg-slate-100
                    border-y
                    border-slate-300
                    px-3
                    py-2
                    font-semibold
                    text-slate-700
                    "
                >
                    <p>Particulars</p>
                    <p>Amount</p>
                </div>

                {/* Entries */}
                <section className="enterys h-[40vh] overflow-x-auto ">

                    <div
                        className=" flex items-center justify-between px-2 py-2  hover:bg-orange-50 transition-all  duration-150"
                    >

                        <div>

                            <select
                                className=" px-3 h-8 w-[220px] border border-slate-300 rounded-md bg-white  text-sm outline-none  focus:border-orange-500"
                            >
                                <option>End of List</option>
                                <option>Cash</option>
                                <option>Bank</option>
                                <option>SBI Bank</option>
                            </select>

                            <p className="text-xs text-red-500 mt-1 font-medium">
                                Cur : {curval}
                            </p>

                        </div>

                        <input
                            type="number" placeholder="0.00"  className="
                            text-right px-3 h-8  w-[160px] border border-slate-300  rounded-md outline-none  focus:border-orange-500
"
                        />

                    </div>

                </section>

                {/* Footer */}
                <div className="flex h-[15vh] overflow-hidden   justify-between px-1 py-2">

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
                            ₹ {curval}
                        </h2>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Payment;
import { useState } from "react";

function Contra() {
    const [listValue, setListValue] = useState("");
    return (
        <section className="bg-red-500 h-full">

           <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-semibold text-slate-800">
                        Contra Voucher
                    </h1>
                    <p className="text-xs text-slate-500">
                        Transfer funds between Cash & Bank Accounts
                    </p>
                </div>

                <div className="flex gap-6 text-sm">
                    <div>
                        <span className="text-slate-500">Voucher No</span>
                        <p className="font-semibold">CV-00001</p>
                    </div>

                    <div>
                        <span className="text-slate-500">Date</span>
                        <p className="font-semibold">04-Jun-2026</p>
                    </div>

                    <div>
                        <span className="text-slate-500">Day</span>
                        <p className="font-semibold">Thursday</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Contra;
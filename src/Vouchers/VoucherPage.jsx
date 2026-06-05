import { useState } from "react";
import Contra from "./Contra";
import Recipt from "./Recipt";
import PaymentPage from "./Payment";

function Voucher() {
    const [vchPage, setVchPage] = useState("Recipt");

    const btnStyle = `
    px-4
    h-8
    text-sm
    font-medium
    rounded-md
    border
    border-slate-300
    bg-white
    text-slate-700
    hover:bg-orange-50
    hover:border-orange-400
    hover:text-orange-600
    transition-all
    duration-150
    `;

    const activeBtn = `
    px-4
    h-8
    text-sm
    font-medium
    rounded-md
    border
    border-orange-500
    bg-orange-500
    text-white
    shadow-sm
    `;

    return (
        <section className="bg-white w-[80vw] h-[90vh]">

            {/* Main Voucher Page */}
            <main className="h-[82vh]">
                {vchPage === "Contra" && <Contra />}

                {vchPage === "Recipt" && <Recipt />}

                {vchPage === "Paymnet" && <PaymentPage />}
            </main>

            {/* Voucher Navigation */}
            <div className="flex items-center gap-2 px-3 py-2 border-t border-slate-200 bg-slate-50">

                <button
                    className={vchPage === "Contra" ? activeBtn : btnStyle}
                    onClick={() => setVchPage("Contra")}
                >
                    Contra
                </button>

                <button
                    className={vchPage === "Paymnet" ? activeBtn : btnStyle}
                    onClick={() => setVchPage("Paymnet")}
                >
                    Payment
                </button>

                <button
                    className={vchPage === "Recipt" ? activeBtn : btnStyle}
                    onClick={() => setVchPage("Recipt")}
                >
                    Receipt
                </button>

                <button className={btnStyle}>
                    Journal
                </button>

                <button className={btnStyle}>
                    Sales
                </button>

                <button className={btnStyle}>
                    Purchase
                </button>

                <button className={btnStyle}>
                    Other Vouchers
                </button>

            </div>

        </section>
    );
}

export default Voucher;
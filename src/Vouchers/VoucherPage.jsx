import { useState } from "react";
import Contra from "./Contra";
import Recipt from "./Recipt";

import Payment from "./Payment";
import Journal from "./Journal";
import Sales from "./Sales";
import Purchase from "./Purchase";

function Voucher() {
   const [vchPage, setVchPage] = useState("Contra");

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

            {vchPage === "Paymnet" && <Payment />}

            {vchPage === "Journal" && <Journal />}

            {vchPage === "Sales" && <Sales />}

            {vchPage === "Purchase" && <Purchase />}
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

            <button
               className={vchPage === "Journal" ? activeBtn : btnStyle}
               onClick={() => setVchPage("Journal")}
            >
               Journal
            </button>

            <button
               className={vchPage === "Sales" ? activeBtn : btnStyle}
               onClick={() => setVchPage("Sales")}
            >
               Sales
            </button>

            <button className={vchPage === "Purchase" ? activeBtn : btnStyle}
               onClick={() => setVchPage("Purchase")}
            >
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
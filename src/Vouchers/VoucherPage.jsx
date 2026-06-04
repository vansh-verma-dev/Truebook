import { style } from "framer-motion/m";
import { useState } from "react";
import Contra from "./Contra";
import Recipt from "./Recipt";
import PaymentPage from "./Payment";

function Voucher() {
   const [vchPage, setVchPage] = useState("Recipt");
   const btnStyle = "text-blue-800 border-2 px-5 py-1 rounded-lg"
   return (
      <section className="bg-white w-[80vw]  h-[90vh]">
         {/* -------------------------------------------------
                        -----Main Page------
            --------------------------------------- */}

         <main className="h-[80vh]   ">
                        {
                            vchPage === "Contra" &&
                            <Contra />
                        }
                          {
                            vchPage === "Recipt" &&
                            <Recipt />
                        }
                          {
                            vchPage === "Paymnet" &&
                            <PaymentPage />
                        }
         </main>

         {/* ----------Voucher Switch Btns----------- */}
         <div className="flex gap-3 py-2 px-2 border-t-2">
            <button className={btnStyle}
             onClick={() => setVchPage("Contra")}
            >Contra </button>

            <button className={btnStyle}
              onClick={() => setVchPage("Paymnet")}
            >Paymnet </button>

            <button className={btnStyle}
              onClick={() => setVchPage("Recipt")}
            >Recipt </button>
            <button className={btnStyle}>Journal </button>
            <button className={btnStyle}>sales </button>
          
            <button className={btnStyle}>Purchase </button>
            <button className={btnStyle}>Other Vouchers </button>
         </div>
      </section>
   )
}
export default Voucher;
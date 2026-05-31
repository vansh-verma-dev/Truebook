import { style } from "framer-motion/m";
import { useState } from "react";
import Contra from "./Contra";
import Recipt from "./Recipt";

function Voucher() {
   const [vchPage, setVchPage] = useState("Recipt");
   const btnStyle = "text-blue-800 border-2 px-5 py-1 rounded-lg"
   return (
      <section className="bg-white w-[80vw]  h-[90vh]">
         {/* -------navbar------- */}
         <nav
            className="flex items-center justify-between px-4 p-2 bg-[#101828]  text-white ">
            <h1>{vchPage} Voucher</h1>
            <button className="bg-green-600 hover:bg-green-500 shadow-lg px-5 py-2 rounded-lg">Save</button>
         </nav>

         {/* -------------------------------------------------
                        -----Main Page------
            --------------------------------------- */}

         <main className="h-[71vh]   ">
           
                        {
                            vchPage === "Contra" &&
                            <Contra />
                        }
                          {
                            vchPage === "Recipt" &&
                            <Recipt />
                        }
         </main>

         {/* ----------Voucher Switch Btns----------- */}
         <div className="flex gap-3 py-2 px-2 border-t-2">
            <button className={btnStyle}
             onClick={() => setVchPage("Contra")}
            >Contra </button>

            <button className={btnStyle}>Paymnet </button>

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
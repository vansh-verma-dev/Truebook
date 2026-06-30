import { PiNotePencilBold } from "react-icons/pi";
import AccountingMastery from "./AccountingMastery";
import Inventory from "./Inventory";
import TaxCompliance from "./tax";

function CreateHome() {

    const CardsStyle =
        "group flex items-center gap-4 w-[220px] px-4 py-3 bg-white border border-orange-100 rounded-xl shadow-sm hover:shadow-lg hover:border-orange-300 hover:-translate-y-1 transition-all duration-200 cursor-pointer";

    const IconBox =
        "bg-orange-100 p-3 rounded-xl group-hover:bg-orange-200 transition-all";

    const IconStyle =
        "text-xl text-orange-600";

    return (
        <main className="bg-gradient-to-br from-orange-50 via-white to-orange-100 h-[90vh] w-[83vw] p-5 overflow-y-auto">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-slate-800">
                    Create Master
                </h1>

                <p className="text-slate-500 mt-1">
                    Create and manage all your accounting, inventory and compliance masters
                </p>
            </div>

            {/* ------------------------------------------
                     ---AccountingMastery---
            ------------------------------------------ */}
            <AccountingMastery />
            {/* ------------------------------------------
                        ---Inventory---
            ------------------------------------------ */}
            <Inventory />
            {/* ------------------------------------------
            -             --TaxCompliance---
            ------------------------------------------ */}
            <TaxCompliance />


        </main>
    );
}

export default CreateHome;
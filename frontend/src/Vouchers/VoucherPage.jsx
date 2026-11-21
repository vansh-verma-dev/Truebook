import { useState } from "react";
import Contra from "./Contra";
import Recipt from "./Recipt";
import Payment from "./Payment";
import Journal from "./Journal";
import Sales from "./Sales";
import Purchase from "./Purchase";
import Company from "../Pages/company";

const tabs = [
    { name: "Contra", page: Contra },
    { name: "Payment", page: Payment },
    { name: "Receipt", page: Recipt },
    { name: "Journal", page: Journal },
    { name: "Sales", page: Sales },
    { name: "Purchase", page: Purchase },
    { name: "Company", page: Company },
];

function Voucher() {
    const [activeTab, setActiveTab] = useState("Contra");

    const ActivePage = tabs.find((tab) => tab.name === activeTab).page;

    return (
        <section className="flex h-[90vh] w-[83vw] flex-col bg-white">
            <main className="flex-1 overflow-hidden">
                <ActivePage />
            </main>

            <div className="flex items-center gap-2 border-t border-slate-200 bg-slate-50 px-3 py-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`h-8 rounded-md border px-4 text-sm font-medium transition ${
                            activeTab === tab.name
                                ? "border-orange-500 bg-orange-500 text-white shadow-sm"
                                : "border-slate-300 bg-white text-slate-700 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
                        }`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default Voucher;
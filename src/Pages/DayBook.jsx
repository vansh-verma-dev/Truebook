import { FaPlus, FaSearch } from "react-icons/fa";
import DaybookNavbar from "../components/DaybookNavbar";
import invoices from "../Data/Invoice"
import { div } from "framer-motion/m";
// bg-[#1d2939]
function Daybook() {
    const getVchTypeStyle = (type) => {
        switch (type) {
            case "Sales":
                return "bg-green-100 text-green-700";

            case "Purchase":
                return "bg-red-100 text-red-700";

            case "Payment":
                return "bg-orange-100 text-orange-700";

            case "Receipt":
                return "bg-blue-100 text-blue-700";

            case "Contra":
                return "bg-purple-100 text-purple-700";

            case "Sales Return":
                return "bg-yellow-100 text-yellow-700";

            case "Purchase Return":
                return "bg-pink-100 text-pink-700";

            case "Journal":
                return "bg-gray-200 text-gray-700";

            default:
                return "bg-gray-100 text-gray-600";
        }
    };
    return (
        <>
        <div className="w-[83vw]">
 <DaybookNavbar />
            <main className=" bg-white  w-full h-[95vh]">

                <div className="flex items-center justify-between px-5 py-3 bg-white border-b shadow-sm">

                    {/* Search Box */}
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search your data..."
                            className="outline-none bg-transparent text-sm w-64"
                        />
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-3">

                        {/* Voucher Filter */}
                        <select className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option>All Voucher Types</option>
                            <option>Sales</option>
                            <option>Payment</option>
                            <option>Receipt</option>
                            <option>Purchase</option>
                            <option>Contra</option>
                            <option>Sales Return</option>
                            <option>Purchase Return</option>
                            <option>Journal</option>
                            <option>Other</option>
                        </select>

                        {/* Date Range */}
                        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50 shadow-sm date_input">
                            <input type="date" className="text-sm outline-none bg-transparent"

                            />
                            <span className="text-gray-500 text-sm">to</span>
                            <input type="date" className="text-sm outline-none bg-transparent" />
                        </div>

                    </div>
                </div>


                <div className="h-[60vh] overflow-y-auto border rounded-lg bg-white">

                    {/* Header */}
                    <div className="grid grid-cols-7 bg-gray-100 text-gray-700 font-semibold text-sm px-3 py-2 sticky top-0 border-b">
                        <p>Date</p>
                        <p>Vch Type</p>
                        <p>Vch No</p>
                        <p>Particulars</p>
                        <p className="text-right">Debit</p>
                        <p className="text-right">Credit</p>
                        <p className="text-right">Balance</p>
                    </div>

                    {/* Rows */}
                    {invoices.map((invoice, index) => {
                        return (
                            <div
                                key={index}
                                className="grid grid-cols-7 items-center px-3 py-2 text-sm text-gray-600 border-b hover:bg-gray-50 transition"
                            >
                                <p>{invoice.date}</p>
                                <p
                                    className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${getVchTypeStyle(invoice.vchType)}`}
                                >
                                    {invoice.vchType}
                                </p>
                                <p>{invoice.vchNo}</p>
                                <p className="truncate">{invoice.particulars}</p>

                                <p className="text-right">{invoice.debit}</p>
                                <p className="text-right">{invoice.credit}</p>
                                <p className="text-right font-medium">{invoice.balance}</p>
                            </div>
                        );
                    })}

                </div>
            </main>
        </div>
           
        </>
    )
}
export default Daybook;
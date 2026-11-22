import {
   
    FaBook,
    FaMapMarkerAlt,
    FaLayerGroup,
    FaBuilding,
    FaIdCard,
} from "react-icons/fa";

import {
    FaIndianRupeeSign,
    FaBoxesStacked,
    FaRuler,
    FaFileInvoice,
} from "react-icons/fa6";

import { PiNotePencilBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function CreateHome() {
    const navigate = useNavigate();

    const CardsStyle =
        "group flex items-center gap-4 w-[220px] px-4 py-3 bg-white border border-orange-100 rounded-xl shadow-sm hover:shadow-lg hover:border-orange-300 hover:-translate-y-1 transition-all duration-200 cursor-pointer";

    const IconBox =
        "bg-orange-100 p-3 rounded-xl group-hover:bg-orange-200 transition-all";

    const IconStyle =
        "text-xl text-orange-600";

    // All Masters Data
    const Masters = [
        {
            section: "Accounting Masters",
            items: [
                {
                    name: "Group",
                    description: "Manage account groups",
                    path: "/create/group",
                    icon:  FaBook,
                },
                {
                    name: "Ledger",
                    description: "Create and manage ledgers",
                    path: "/create/ledger",
                    icon: FaBook,
                },
                {
                    name: "Currency",
                    description: "Manage currencies",
                    path: "/create/currency",
                    icon: FaIndianRupeeSign,
                },
                {
                    name: "Voucher Type",
                    description: "Configure vouchers",
                    path: "/create/voucher-type",
                    icon: PiNotePencilBold,
                },
            ],
        },

        {
            section: "Inventory",
            items: [
                {
                    name: "Stock Group",
                    description: "Organize stock groups",
                    path: "/create/stock-group",
                    icon: FaLayerGroup,
                },
                {
                    name: "Stock Category",
                    description: "Manage stock categories",
                    path: "/create/stock-category",
                    icon: FaBoxesStacked,
                },
                {
                    name: "Stock Items",
                    description: "Create inventory items",
                    path: "/create/stock-item",
                    icon: FaBoxesStacked,
                },
                {
                    name: "Unit",
                    description: "Manage measurement units",
                    path: "/create/unit",
                    icon: FaRuler,
                },
                {
                    name: "Location",
                    description: "Manage stock locations",
                    path: "/create/location",
                    icon: FaMapMarkerAlt,
                },
            ],
        },

        {
            section: "Tax & Compliance",
            items: [
                {
                    name: "GST Registration",
                    description: "Configure GST registration",
                    path: "/create/gst-registration",
                    icon: FaFileInvoice,
                },
                {
                    name: "GST Classification",
                    description: "Manage GST classifications",
                    path: "/create/gst-classification",
                    icon: FaFileInvoice,
                },
                {
                    name: "Company GST Details",
                    description: "Company GST information",
                    path: "/create/company-gst",
                    icon: FaBuilding,
                },
                {
                    name: "PAN/CIN Details",
                    description: "Legal company information",
                    path: "/create/pan-cin",
                    icon: FaIdCard,
                },
            ],
        },
    ];

    return (
        <main className="bg-gradient-to-br from-orange-50 via-white to-orange-100 h-[90vh] w-[83vw] p-5 overflow-y-auto">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-slate-800">
                    Create Master
                </h1>

                <p className="text-slate-500 mt-1">
                    Create and manage all your accounting, inventory and compliance masters
                </p>
            </div>

            {/* All Master Sections */}
            {Masters.map((master, index) => (
                <section key={index} className="mb-9">

                    {/* Section Heading */}
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-orange-500 pl-3">
                        {master.section}
                    </h2>

                    {/* Cards */}
                    <div className="flex flex-wrap gap-5">

                        {master.items.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.name}
                                    className={CardsStyle}
                                    onClick={() => navigate(item.path)}
                                >
                                    {/* Icon */}
                                    <div className={IconBox}>
                                        <Icon className={IconStyle} />
                                    </div>

                                    {/* Card Content */}
                                    <div>
                                        <h3 className="font-semibold text-slate-800">
                                            {item.name}
                                        </h3>

                                        <p className="text-xs text-slate-500">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </section>
            ))}

        </main>
    );
}

export default CreateHome;

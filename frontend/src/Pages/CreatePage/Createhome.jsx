import {
    FaMapMarkerAlt,
    FaLayerGroup,
    FaBuilding,
    FaIdCard,
    FaBook,
} from "react-icons/fa";

import {
    FaIndianRupeeSign,
    FaBoxesStacked,
    FaRuler,
    FaFileInvoice,
    FaUserGroup,
} from "react-icons/fa6";

import { PiNotePencilBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function AlterHome() {
    const navigate = useNavigate();

    const CardsStyle =
        "group flex items-center gap-4 w-[220px] px-4 py-3 bg-white border border-orange-100 rounded-xl shadow-sm hover:shadow-lg hover:border-orange-300 hover:-translate-y-1 transition-all duration-200 cursor-pointer";

    const IconBox =
        "bg-orange-100 p-3 rounded-xl group-hover:bg-orange-200 transition-all";

    const IconStyle = "text-xl text-orange-600";

    const Masters = [
        {
            section: "Accounting Masters",
            items: [
                {
                    name: "Group",
                    description: "Edit and manage account groups",
                    path: "/alter/group",
                    icon: FaUserGroup,
                },
                {
                    name: "Ledger",
                    description: "Edit and manage ledgers",
                    path: "/alter/ledger",
                    icon: FaBook,
                },
                {
                    name: "Currency",
                    description: "Edit currency details",
                    path: "/alter/currency",
                    icon: FaIndianRupeeSign,
                },
                {
                    name: "Voucher Type",
                    description: "Edit voucher configurations",
                    path: "/alter/voucher-type",
                    icon: PiNotePencilBold,
                },
            ],
        },

        {
            section: "Inventory",
            items: [
                {
                    name: "Stock Group",
                    description: "Edit stock groups",
                    path: "/alter/stock-group",
                    icon: FaLayerGroup,
                },
                {
                    name: "Stock Category",
                    description: "Edit stock categories",
                    path: "/alter/stock-category",
                    icon: FaBoxesStacked,
                },
                {
                    name: "Stock Items",
                    description: "Edit inventory items",
                    path: "/alter/stock-item",
                    icon: FaBoxesStacked,
                },
                {
                    name: "Unit",
                    description: "Edit measurement units",
                    path: "/alter/unit",
                    icon: FaRuler,
                },
                {
                    name: "Location",
                    description: "Edit stock locations",
                    path: "/alter/location",
                    icon: FaMapMarkerAlt,
                },
            ],
        },

        {
            section: "Tax & Compliance",
            items: [
                {
                    name: "GST Registration",
                    description: "Edit GST registrations",
                    path: "/alter/gst-registration",
                    icon: FaFileInvoice,
                },
                {
                    name: "GST Classification",
                    description: "Edit GST classifications",
                    path: "/alter/gst-classification",
                    icon: FaFileInvoice,
                },
                {
                    name: "Company GST Details",
                    description: "Edit company GST details",
                    path: "/alter/company-gst",
                    icon: FaBuilding,
                },
                {
                    name: "PAN/CIN Details",
                    description: "Edit company legal details",
                    path: "/alter/pan-cin",
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
                    Alter Master
                </h1>

                <p className="text-slate-500 mt-1">
                    Edit, update and manage your existing accounting, inventory and compliance masters
                </p>
            </div>

            {/* Master Sections */}
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

export default AlterHome;
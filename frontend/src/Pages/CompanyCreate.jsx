import { useState } from "react";
import { MdSaveAs } from "react-icons/md";
import toast from "react-hot-toast";

const sections = [
    {
        title: "Basic Details",
        fields: [
            { name: "name", label: "Company Name *", placeholder: "Enter company name", required: true },
            { name: "mailingName", label: "Mailing Name", placeholder: "Enter mailing name" },
            { name: "ownerName", label: "Owner Name", placeholder: "Enter owner name" },
            {
                name: "companyType",
                label: "Company Type",
                defaultValue: "Private Limited",
                options: [
                    { value: "Private Limited", label: "Private Limited" },
                    { value: "LLP", label: "LLP" },
                    { value: "Partnership", label: "Partnership" },
                    { value: "Sole Proprietorship", label: "Sole Proprietorship" },
                ],
            },
            { name: "industry", label: "Industry", placeholder: "Business type" },
            { name: "establishedDate", label: "Established Date", type: "date" },
        ],
    },
    {
        title: "Contact Details",
        fields: [
            { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
            { name: "phone", label: "Phone", placeholder: "Enter phone number", maxLength: 10 },
            { name: "alternatePhone", label: "Alternate Phone", placeholder: "Optional", maxLength: 10 },
            { name: "website", label: "Website", placeholder: "https://..." },
        ],
    },
    {
        title: "Address Details",
        fields: [
            { name: "address", label: "Address", type: "textarea", placeholder: "Enter full address", full: true },
            { name: "city", label: "City" },
            { name: "state", label: "State" },
            { name: "country", label: "Country", defaultValue: "India" },
            { name: "pincode", label: "Pincode", maxLength: 6 },
        ],
    },
    {
        title: "Tax Details",
        fields: [
            { name: "gstin", label: "GST Number", maxLength: 15 },
            { name: "pan", label: "PAN Number", maxLength: 10 },
            { name: "financialYearStart", label: "Financial Year Start *", type: "date", required: true },
            {
                name: "currency",
                label: "Currency",
                defaultValue: "INR",
                options: [
                    { value: "INR", label: "INR ₹" },
                    { value: "USD", label: "USD $" },
                    { value: "EUR", label: "EUR €" },
                ],
            },
            {
    name: "financialYearEnd",
    label: "Financial Year End *",
    type: "date",
    required: true,
},
{
    name: "booksBeginFrom",
    label: "Books Begin From *",
    type: "date",
    required: true,
},
        ],
    },
];


const initialData = Object.fromEntries(
    sections
        .flatMap((section) => section.fields)
        .map((field) => [field.name, field.defaultValue || ""])
);

const inputClass =
    "w-full p-3 rounded-lg bg-slate-50 text-[#1d2939] outline-none border border-slate-200 focus:border-[#0d6efd] focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder:text-slate-400";

function CreateCompany({ setActivePage }) {
    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);

        const cleanData = Object.fromEntries(
            Object.entries(formData).filter(
                ([key, value]) => value.trim() !== ""
            )
        );

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            return;
        }

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/Companies`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(cleanData),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to create company");
        }

        
        const newCompany = data.details;

        // Save selected company
        localStorage.setItem(
            "selectedCompany",
            JSON.stringify(newCompany)
        );

        toast.success("Company created successfully!");

        // Navigate to home/dashboard
        if (setActivePage) {
            setActivePage("/");
        }

    } catch (error) {
        console.error("Create company error:", error);
        toast.error(error.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
};

    return (
        <section className="h-[95vh]">
            {/* --Navbar-- */}
            <nav className="w-[80vw] flex items-center justify-between px-5 py-4 bg-white border-b border-slate-200 shadow-sm">
                <span>
                    <h1 className="text-[#1d2939] text-lg font-semibold tracking-wide">Create New Company</h1>
                    <p className="text-xs text-slate-400 mt-0.5">Fill in your company details to get started</p>
                </span>
                <button
                    className="flex items-center gap-2 bg-[#0d6efd] hover:bg-[#0250c5] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-[0_1px_2px_rgba(13,110,253,0.3)] transition-all duration-150"
                    type="submit"
                    form="company-form"
                    disabled={loading}
                >
                    <MdSaveAs />
                    {loading ? "Saving Company..." : "Save Company"}
                </button>
            </nav>

            <section className="w-full h-[90vh] overflow-x-auto bg-[#f8f9fb] p-4 sm:p-6">
                <form
                    id="company-form"
                    onSubmit={handleSubmit}
                    className="pb-14 max-w-5xl mx-auto flex flex-col gap-6"
                >
                    {sections.map((section) => (
                        <div
                            key={section.title}
                            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)]"
                        >
                            <h2 className="text-[#0d6efd] text-sm font-semibold uppercase tracking-wide mb-4">
                                {section.title}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {section.fields.map((field) => (
                                    <div
                                        key={field.name}
                                        className={`flex flex-col gap-1 ${field.full ? "sm:col-span-2" : ""}`}
                                    >
                                        <label className="text-slate-600 text-sm font-medium">
                                            {field.label}
                                        </label>

                                        {/* dropdown */}
                                        {field.options ? (
                                            <select
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                className={inputClass}
                                            >
                                                {field.options.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : field.type === "textarea" ? (
                                            /* textarea */
                                            <textarea
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                placeholder={field.placeholder}
                                                rows="3"
                                                className={inputClass}
                                            />
                                        ) : (
                                            /* normal input */
                                            <input
                                                name={field.name}
                                                type={field.type || "text"}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                placeholder={field.placeholder}
                                                maxLength={field.maxLength}
                                                required={field.required}
                                                className={inputClass}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </form>
            </section>
        </section>
    );
}

export default CreateCompany;
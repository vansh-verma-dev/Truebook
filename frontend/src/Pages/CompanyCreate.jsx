import { MdSaveAs } from "react-icons/md";


function CreateCompany({ setActivePage }) {
    return (
        <section className="h-[95vh]">
            {/* --Navbar-- */}
            <nav className="w-[80vw] flex items-center justify-between px-5 py-4 bg-white border-b border-slate-200 shadow-sm">
                <span>
                    <h1 className="text-[#1d2939] text-lg font-semibold tracking-wide">Create New Company</h1>
                    <p className="text-xs text-slate-400 mt-0.5">Fill in your company details to get started</p>
                </span>
                <button
                    className="flex items-center gap-2 bg-[#0d6efd] hover:bg-[#0250c5] active:scale-95 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-[0_1px_2px_rgba(13,110,253,0.3)] transition-all duration-150"
                    type="submit"
                    form="company-form"
                >
                    <MdSaveAs /> Save Company
                </button>
            </nav>

            <CompanyForm />

        </section>
    )
}
export default CreateCompany;

export const CompanyForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Company Saved");
    };
    return (
        <section className="w-full h-[90vh] overflow-x-auto bg-[#f8f9fb] p-4 sm:p-6 companyForm">

            <form id="company-form" onSubmit={handleSubmit} className="pb-14 max-w-5xl mx-auto flex flex-col gap-6">

                {/* ================= BASIC DETAILS ================= */}
                <SectionCard title="Basic Details">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <Input label="Company Name" placeholder="Enter company name" />
                        <Input label="Mailing Name" placeholder="Enter mailing name" />

                        <Input label="Owner Name" placeholder="Enter owner name" />

                        <Select
                            label="Company Type"
                            options={[
                                "Private Limited",
                                "LLP",
                                "Partnership",
                                "Sole Proprietorship",
                            ]}
                        />

                        <Input label="Industry" placeholder="Business type" />
                        <Input type="date" label="Established Date" />

                    </div>
                </SectionCard>

                {/* ================= CONTACT DETAILS ================= */}
                <SectionCard title="Contact Details">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <Input label="Email" type="email" placeholder="Enter email" />
                        <Input label="Phone" placeholder="Enter phone number" />
                        <Input label="Alternate Phone" placeholder="Optional" />
                        <Input label="Website" placeholder="https://..." />

                    </div>
                </SectionCard>

                {/* ================= ADDRESS ================= */}
                <SectionCard title="Address Details">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="sm:col-span-2 flex flex-col gap-1">
                            <label className="text-slate-600 text-sm font-medium">Address</label>
                            <textarea
                                className="w-full mt-1 p-3 rounded-lg bg-slate-50 text-[#1d2939] outline-none border border-slate-200 focus:border-[#0d6efd] focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder:text-slate-400"
                                rows="3"
                                placeholder="Enter full address"
                            />
                        </div>

                        <Input label="City" />
                        <Input label="State" />
                        <Input label="Country" />
                        <Input label="Pincode" />

                    </div>
                </SectionCard>

                {/* ================= TAX DETAILS ================= */}
                <SectionCard title="Tax Details">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <Input label="GST Number" />
                        <Input label="PAN Number" />
                        <Input label="Financial Year Start" type="date" />

                        <Select
                            label="Currency"
                            options={["INR ₹", "USD $", "EUR €"]}
                        />

                    </div>
                </SectionCard>

            </form>
        </section>
    )
}

function SectionCard({ title, children }) {
    return (
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
            <h2 className="text-[#0d6efd] text-sm font-semibold uppercase tracking-wide mb-4">
                {title}
            </h2>
            {children}
        </div>
    );
}

function Input({ label, ...props }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-slate-600 text-sm font-medium">{label}</label>
            <input
                {...props}
                className="p-3 rounded-lg bg-slate-50 text-[#1d2939] outline-none border border-slate-200 focus:border-[#0d6efd] focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder:text-slate-400"
            />
        </div>
    );
}

function Select({ label, options }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-slate-600 text-sm font-medium">{label}</label>
            <select className="p-3 rounded-lg bg-slate-50 text-[#1d2939] outline-none border border-slate-200 focus:border-[#0d6efd] focus:ring-2 focus:ring-blue-100 transition-all duration-200">
                {options.map((opt, i) => (
                    <option key={i}>{opt}</option>
                ))}
            </select>
        </div>
    );
}
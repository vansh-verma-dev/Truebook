import { MdSaveAs } from "react-icons/md";


function CreateCompany({ setActivePage }) {
    return (
        <section className="h-[95vh]">
            {/* --Navbar-- */}
            <nav className="w-[80vw]  flex  items-center justify-between px-3 py-3  text-white bg-[#1d2939]">
                <span>
                    <h1>Create New Company </h1>
                    <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, beatae!</p>
                </span>
                <button className="flex items-center gap-2 bg-green-600 px-5 py-2 rounded-xl"
                type="submit"
                ><MdSaveAs /> Save Company</button>
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
        <section className="w-full  h-[90vh]  overflow-x-auto bg-[#0b1120] p-4 sm:p-6 companyForm">

            <form onSubmit={handleSubmit} className=" pb-14  max-w-5xl mx-auto flex flex-col gap-6">

                {/* ================= BASIC DETAILS ================= */}
                <h2 className="text-orange-500 text-lg font-semibold tracking-wide">
                    Basic Details
                </h2>

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

                {/* ================= CONTACT DETAILS ================= */}
                <h2 className="text-orange-500 text-lg font-semibold tracking-wide mt-4">
                    Contact Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <Input label="Email" type="email" placeholder="Enter email" />
                    <Input label="Phone" placeholder="Enter phone number" />
                    <Input label="Alternate Phone" placeholder="Optional" />
                    <Input label="Website" placeholder="https://..." />

                </div>

                {/* ================= ADDRESS ================= */}
                <h2 className="text-orange-500 text-lg font-semibold tracking-wide mt-4">
                    Address Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="sm:col-span-2">
                        <label className="text-white text-sm">Address</label>
                        <textarea
                            className="w-full mt-1 p-3 rounded-lg bg-[#111827] text-white outline-none border border-white/10 focus:border-orange-500"
                            rows="3"
                            placeholder="Enter full address"
                        />
                    </div>

                    <Input label="City" />
                    <Input label="State" />
                    <Input label="Country" />
                    <Input label="Pincode" />

                </div>

                {/* ================= TAX DETAILS ================= */}
                <h2 className="text-orange-500 text-lg font-semibold tracking-wide mt-4">
                    Tax Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <Input label="GST Number" />
                    <Input label="PAN Number" />
                    <Input label="Financial Year Start" type="date" />

                    <Select
                        label="Currency"
                        options={["INR ₹", "USD $", "EUR €"]}
                    />

                </div>

            </form>
        </section>
    )
}

function Input({ label, ...props }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-white text-sm">{label}</label>
            <input
                {...props}
                className="p-3 rounded-lg bg-[#111827] text-white outline-none border border-white/10 focus:border-orange-500"
            />
        </div>
    );
}

function Select({ label, options }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-white text-sm">{label}</label>
            <select className="p-3 rounded-lg bg-[#111827] text-white outline-none border border-white/10 focus:border-orange-500">
                {options.map((opt, i) => (
                    <option key={i}>{opt}</option>
                ))}
            </select>
        </div>
    );
}
import { MdSaveAs } from "react-icons/md";
import { HiBuildingOffice2 } from "react-icons/hi2";

function CompForm() {
    return (
        <div className="w-full h-full bg-[#0b1120] p-5  ">

            {/* FORM */}
            <form
                className="
                h-[76vh]
                overflow-y-auto
                hide-scrollbar

                pr-2

                grid
                lg:grid-cols-2
                gap-5
            "
            >

                {/* ================= BASIC DETAILS ================= */}

                <div className="col-span-2">
                    <h2 className="text-sm font-semibold tracking-wider text-orange-400 uppercase">
                        Basic Details
                    </h2>
                </div>

                <InputField label="Company Name" placeholder="Enter company name" />
                <InputField label="Mailing Name" placeholder="Enter mailing name" />

                <InputField label="Owner Name" placeholder="Enter owner name" />

                <SelectField
                    label="Company Type"
                    options={[
                        "Private Limited",
                        "LLP",
                        "Partnership",
                        "Sole Proprietorship",
                    ]}
                />

                <InputField label="Industry" placeholder="Business industry" />
                <InputField label="Established Date" type="date" />

                {/* ================= CONTACT DETAILS ================= */}

                <div className="col-span-2 mt-3">
                    <h2 className="text-sm font-semibold tracking-wider text-orange-400 uppercase">
                        Contact Details
                    </h2>
                </div>

                <InputField label="Email Address" placeholder="Enter email address" type="email" />

                <InputField label="Phone Number" placeholder="Enter phone number" />

                <InputField label="Alternate Phone" placeholder="Alternate phone" />

                <InputField label="Website" placeholder="Enter website" />

                {/* ================= TAX DETAILS ================= */}

                <div className="col-span-2 mt-3">
                    <h2 className="text-sm font-semibold tracking-wider text-orange-400 uppercase">
                        Tax & Financial
                    </h2>
                </div>

                <InputField label="GST Number" placeholder="Enter GST number" />

                <InputField label="PAN Number" placeholder="Enter PAN number" />

                <InputField label="Financial Year" type="date" />

                <SelectField
                    label="Currency"
                    options={[
                        "Indian Rupee (₹)",
                        "US Dollar ($)",
                        "Euro (€)",
                    ]}
                />

                {/* ADDRESS */}
                <div className="col-span-2 flex flex-col gap-2">
                    <label className="label-style">
                        Address
                    </label>

                    <textarea
                        placeholder="Enter company address"
                        className="premium-input h-[120px] resize-none py-4"
                    />
                </div>

                <InputField label="City" placeholder="Enter city" />
                <InputField label="State" placeholder="Enter state" />

                <InputField label="Country" placeholder="Enter country" />
                <InputField label="Pincode" placeholder="Enter pincode" />

                {/* ================= BANK DETAILS ================= */}

                <div className="col-span-2 mt-3">
                    <h2 className="text-sm font-semibold tracking-wider text-orange-400 uppercase">
                        Banking Details
                    </h2>
                </div>

                <InputField label="Bank Name" placeholder="Enter bank name" />

                <InputField label="Account Number" placeholder="Enter account number" />

                <InputField label="IFSC Code" placeholder="Enter IFSC code" />

                <InputField label="UPI ID" placeholder="Enter UPI ID" />

                {/* BUTTONS */}

                <div className="col-span-2 flex justify-end gap-4 pt-6 sticky bottom-0 bg-[#0b1120] pb-2">

                    <button
                        type="reset"
                        className="
                        flex items-center gap-2
                        border border-red-500/30
                        text-red-400
                        hover:bg-red-500/10
                        px-6 py-3
                        rounded-2xl
                        mb-2
                        transition-all duration-300
                    "
                    >
                        <MdSaveAs className="text-lg" />
                        Reset
                    </button>

                    <button
                        type="submit"
                        className="
                        flex items-center gap-2

                        bg-orange-500
                        hover:bg-orange-600

                        text-white
                        font-medium

                        px-6 py-3
                        rounded-2xl

                        shadow-lg shadow-orange-500/20

                        transition-all duration-300
                    "
                    >
                        <MdSaveAs className="text-lg" />
                        Save Company
                    </button>

                </div>

            </form>
        </div>
    );
}

export default CompForm;


/* ================= REUSABLE INPUT ================= */

function InputField({
    label,
    placeholder,
    type = "text",
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="label-style text-white">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                className="premium-input"
            />
        </div>
    );
}


/* ================= REUSABLE SELECT ================= */

function SelectField({
    label,
    options,
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="label-style text-white">
                {label}
            </label>

            <select className="premium-input text-white">
                {options.map((item, index) => (
                    <option key={index}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}
export const cashBankList = ["Cash", "SBI Bank", "HDFC Bank"];

export const ledgerList = [
    "Rent",
    "Salary",
    "Electricity",
    "Office Expense",
    "Sales A/c",
    "Purchase A/c",
    "Capital A/c",
    "Furniture A/c",
];

export const partyList = ["ABC Traders", "XYZ Enterprises", "Tech Solutions"];

export const itemList = ["Laptop", "Mouse", "Keyboard", "Monitor"];

export const unitList = ["Pcs", "Kg", "Box", "Ltr", "Mtr"];

export const gstList = [0, 5, 12, 18, 28];

export const money = (n) =>
    Number(n || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

export const todayDate = () => new Date().toLocaleDateString("en-CA");

const dayName = (date) =>
    date
        ? new Date(date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long" })
        : "-";

export const inputClass =
    "h-9 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";

function InfoBox({ label, value }) {
    return (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5">
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                {label}
            </p>
            <p className="text-sm font-semibold text-slate-800">{value}</p>
        </div>
    );
}

export function VoucherHeader({ title, subtitle, voucherNo, date, setDate }) {
    return (
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
            <div>
                <h1 className="text-xl font-bold text-slate-800">{title}</h1>
                <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
            </div>

            <div className="flex items-center gap-3">
                <InfoBox label="Voucher No" value={voucherNo} />

                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                        Date
                    </p>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-transparent text-sm font-semibold text-slate-800 outline-none"
                    />
                </div>

                <InfoBox label="Day" value={dayName(date)} />
            </div>
        </div>
    );
}

export function VoucherFooter({ narration, setNarration, onSave, saveDisabled, children }) {
    return (
        <div className="flex items-end justify-between gap-6 border-t border-slate-200 bg-white px-6 py-4">
            <div className="flex-1">
                <p className="mb-1 text-sm font-medium text-slate-700">Narration</p>
                <textarea
                    value={narration}
                    onChange={(e) => setNarration(e.target.value)}
                    placeholder="Enter narration..."
                    className="h-16 w-full max-w-xl resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
            </div>

            <div className="flex items-end gap-6">
                <div className="text-right">{children}</div>

                <button
                    type="button"
                    onClick={onSave}
                    disabled={saveDisabled}
                    className="h-10 rounded-lg bg-orange-500 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                    Save Voucher
                </button>
            </div>
        </div>
    );
}
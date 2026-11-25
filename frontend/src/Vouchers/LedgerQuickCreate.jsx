import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { inputClass } from "./VoucherParts";
import { fetchGroups, fetchLedgers, createLedger } from "./voucherApi";

// default groups ke paas `key` hota hai, custom groups ke paas sirf _id
export const groupValue = (g) => g.key || g._id;

// Ctrl + N ya Alt + N dabane par handler chalega
// (Chrome/Edge/Firefox browser tab me Ctrl+N ko khud rakh lete hain, wahan Alt+N use karo)
export function useNewLedgerShortcut(handler) {
    useEffect(() => {
        const onKey = (e) => {
            if ((e.ctrlKey || e.metaKey || e.altKey) && e.code === "KeyN") {
                e.preventDefault();
                handler();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [handler]);
}

function LedgerQuickCreate({
    companyId,
    title = "Create Ledger",
    groupFilter = () => true, // kaun se groups dropdown me dikhne chahiye
    defaultGroup, // pehle se select hone wala group (key ya _id)
    onClose,
    onCreated, // (updatedLedgerList, createdLedger) => void
}) {
    const [groups, setGroups] = useState([]);
    const [form, setForm] = useState({
        name: "",
        group: "",
        openingBalance: "",
        openingType: "Dr",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchGroups(companyId)
            .then((list) => {
                const allowed = list.filter(groupFilter);
                setGroups(allowed);
                const pick = allowed.find((g) => groupValue(g) === defaultGroup) || allowed[0];
                setForm((f) => ({ ...f, group: pick ? groupValue(pick) : "" }));
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyId]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const defaultGroups = groups.filter((g) => g.isDefault);
    const customGroups = groups.filter((g) => !g.isDefault);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            setError("");

            const name = form.name.trim();

            await createLedger(companyId, {
                ...form,
                name,
                openingBalance: Number(form.openingBalance || 0),
            });

            // list dobara laao aur naya ledger naam + group se dhoondo
            const list = await fetchLedgers(companyId);
            const created = list.find(
                (l) => l.name.trim().toLowerCase() === name.toLowerCase() && l.group === form.group
            );

            toast.success("Ledger created");
            onCreated(list, created);
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <form onSubmit={handleSave} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-lg font-semibold text-slate-800">{title}</h2>

                <div className="mt-5 space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Ledger name</label>
                        <input
                            type="text"
                            required
                            autoFocus
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Under group</label>
                        <select
                            required
                            disabled={loading}
                            value={form.group}
                            onChange={(e) => setForm({ ...form, group: e.target.value })}
                            className={inputClass}
                        >
                            {defaultGroups.length > 0 && (
                                <optgroup label="Default Groups">
                                    {defaultGroups.map((g) => (
                                        <option key={groupValue(g)} value={groupValue(g)}>
                                            {g.name}
                                        </option>
                                    ))}
                                </optgroup>
                            )}
                            {customGroups.length > 0 && (
                                <optgroup label="My Groups">
                                    {customGroups.map((g) => (
                                        <option key={groupValue(g)} value={groupValue(g)}>
                                            {g.name}
                                        </option>
                                    ))}
                                </optgroup>
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Opening balance</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                min="0"
                                placeholder="0.00"
                                value={form.openingBalance}
                                onChange={(e) => setForm({ ...form, openingBalance: e.target.value })}
                                className={inputClass}
                            />
                            <select
                                value={form.openingType}
                                onChange={(e) => setForm({ ...form, openingType: e.target.value })}
                                className={`${inputClass} w-24`}
                            >
                                <option value="Dr">Dr</option>
                                <option value="Cr">Cr</option>
                            </select>
                        </div>
                    </div>
                </div>

                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-10 rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving || loading || !form.group}
                        className="h-10 rounded-lg bg-orange-500 px-5 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        {saving ? "Saving..." : "Create ledger"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LedgerQuickCreate;
import { useEffect, useState } from "react";
import { FaSearch, FaPlus, FaPen, FaTrash } from "react-icons/fa";

const natures = {
    asset: "Asset",
    liability: "Liability",
    income: "Income",
    expense: "Expense",
};

const rowGrid = "grid grid-cols-[1fr_170px_150px_160px_110px_110px] items-center gap-3";

const emptyForm = { name: "", group: "", openingBalance: "", openingType: "Dr" };
const emptyGroupForm = { name: "", nature: "asset" };

// default groups ke paas `key` hota hai, custom groups ke paas sirf _id
const groupValue = (g) => g.key || g._id;

const getCompanyId = () => {
    try {
        return JSON.parse(localStorage.getItem("selectedCompany") || "null")?._id;
    } catch {
        return null;
    }
};

const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
    });
};

const money = (amount) =>
    Number(amount || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

function LedgerAlterPage() {
    const companyId = getCompanyId();
    const baseUrl = `${import.meta.env.VITE_API_URL}/api/companies/${companyId}`;
    const url = `${baseUrl}/ledgers`;
    const groupUrl = `${baseUrl}/group`;
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const [ledgers, setLedgers] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [deleteItem, setDeleteItem] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState("");

    // ledger form ke andar group create / alter
    const [showGroupForm, setShowGroupForm] = useState(false);
    const [groupEditId, setGroupEditId] = useState(null);
    const [groupForm, setGroupForm] = useState(emptyGroupForm);
    const [groupSaving, setGroupSaving] = useState(false);
    const [groupError, setGroupError] = useState("");

    const fetchGroups = async () => {
        const res = await fetch(groupUrl, { headers });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load groups");
        const list = data.groups || [];
        setGroupList(list);
        return list;
    };

    const fetchLedgers = async () => {
        const res = await fetch(url, { headers });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load ledgers");
        setLedgers(data.ledger || []);
    };

    const loadAll = async () => {
        try {
            setLoading(true);
            setError("");
            await Promise.all([fetchGroups(), fetchLedgers()]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const refreshLedgers = async () => {
        try {
            setError("");
            await fetchLedgers();
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (companyId) loadAll();
        else setLoading(false);
    }, [companyId]);

    const groupLabel = (value) =>
        groupList.find((g) => groupValue(g) === value)?.name || value;

    const selectedGroup = groupList.find((g) => groupValue(g) === form.group);

    const openCreate = () => {
        setEditId(null);
        setForm({ ...emptyForm, group: groupList[0] ? groupValue(groupList[0]) : "" });
        setFormError("");
        setShowForm(true);
    };

    const openEdit = (ledger) => {
        setEditId(ledger._id);
        setForm({
            name: ledger.name,
            group: ledger.group,
            openingBalance: ledger.openingBalance,
            openingType: ledger.openingType || "Dr",
        });
        setFormError("");
        setShowForm(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            setFormError("");
            const res = await fetch(editId ? `${url}/${editId}` : url, {
                method: editId ? "PUT" : "POST",
                headers,
                body: JSON.stringify({
                    ...form,
                    openingBalance: Number(form.openingBalance || 0),
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to save ledger");
            setShowForm(false);
            refreshLedgers();
        } catch (err) {
            setFormError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            setSaving(true);
            setFormError("");
            const res = await fetch(`${url}/${deleteItem._id}`, {
                method: "DELETE",
                headers,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to delete ledger");
            setDeleteItem(null);
            refreshLedgers();
        } catch (err) {
            setFormError(err.message);
        } finally {
            setSaving(false);
        }
    };

    // ---------- group create / alter (ledger form ke andar se) ----------
    const openGroupCreate = () => {
        setGroupEditId(null);
        setGroupForm(emptyGroupForm);
        setGroupError("");
        setShowGroupForm(true);
    };

    const openGroupAlter = () => {
        if (!selectedGroup || selectedGroup.isDefault) return;
        setGroupEditId(selectedGroup._id);
        setGroupForm({ name: selectedGroup.name, nature: selectedGroup.nature || "asset" });
        setGroupError("");
        setShowGroupForm(true);
    };

    const handleGroupSave = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            setGroupSaving(true);
            setGroupError("");
            const res = await fetch(groupEditId ? `${groupUrl}/${groupEditId}` : groupUrl, {
                method: groupEditId ? "PUT" : "POST",
                headers,
                body: JSON.stringify(groupForm),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to save group");

            const list = await fetchGroups();

            // naya group bana to usko ledger form me auto-select karo
            if (!groupEditId) {
                const created = list.find(
                    (g) => !g.isDefault && g.name.toLowerCase() === groupForm.name.trim().toLowerCase()
                );
                if (created) setForm((f) => ({ ...f, group: groupValue(created) }));
            }
            setShowGroupForm(false);
        } catch (err) {
            setGroupError(err.message);
        } finally {
            setGroupSaving(false);
        }
    };

    const rows = ledgers.filter((l) =>
        `${l.name} ${groupLabel(l.group)}`.toLowerCase().includes(search.toLowerCase().trim())
    );

    const defaultGroups = groupList.filter((g) => g.isDefault);
    const customGroups = groupList.filter((g) => !g.isDefault);

    return (
        <div className="w-[83vw]">
            <main className="bg-white w-full h-[95vh]">
                <div className="flex items-center justify-between px-5 py-3 bg-white border-b shadow-sm">
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search ledger or group..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="outline-none bg-transparent text-sm w-72"
                        />
                    </div>

                    <button
                        onClick={openCreate}
                        disabled={loading || groupList.length === 0}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                    >
                        <FaPlus className="text-xs" />
                        Create Ledger
                    </button>
                </div>

                <div className="m-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="h-[66vh] overflow-y-auto">
                        <div
                            className={`${rowGrid} sticky top-0 z-10 border-b bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500`}
                        >
                            <p>Ledger Name</p>
                            <p>Group</p>
                            <p className="text-right">Opening Balance</p>
                            <p className="text-right">Closing Balance</p>
                            <p>Created On</p>
                            <p className="text-center">Actions</p>
                        </div>

                        {loading && <p className="py-20 text-center text-gray-500">Loading ledgers...</p>}

                        {!loading && error && (
                            <div className="py-16 text-center">
                                <p className="text-red-600 font-medium">{error}</p>
                                <button
                                    onClick={loadAll}
                                    className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {!loading && !error && rows.length === 0 && (
                            <p className="py-20 text-center text-gray-500">No ledgers found.</p>
                        )}

                        {!loading &&
                            !error &&
                            rows.map((ledger) => (
                                <div
                                    key={ledger._id}
                                    className={`${rowGrid} border-b border-l-4 border-l-transparent px-4 py-3 text-sm text-gray-600 transition hover:border-l-amber-400 hover:bg-amber-50/60`}
                                >
                                    <p className="truncate font-semibold text-gray-800">{ledger.name}</p>

                                    <div>
                                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 whitespace-nowrap">
                                            {groupLabel(ledger.group)}
                                        </span>
                                    </div>

                                    <p className="text-right tabular-nums">
                                        {money(ledger.openingBalance)}{" "}
                                        <span className="text-xs text-gray-400">{ledger.openingType}</span>
                                    </p>

                                    <p className="text-right font-semibold tabular-nums text-gray-800">
                                        {money(ledger.closingBalance ?? ledger.openingBalance)}{" "}
                                        <span className="text-xs text-gray-400">
                                            {ledger.closingType || ledger.openingType}
                                        </span>
                                    </p>

                                    <p className="whitespace-nowrap">{formatDate(ledger.createdAt)}</p>

                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => openEdit(ledger)}
                                            title="Edit"
                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                        >
                                            <FaPen className="text-xs" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setFormError("");
                                                setDeleteItem(ledger);
                                            }}
                                            title="Delete"
                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-red-50"
                                        >
                                            <FaTrash className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="border-t-2 bg-slate-50 px-4 py-3 text-sm text-gray-500">
                        Ledgers: <span className="font-semibold text-gray-800">{rows.length}</span>
                    </div>
                </div>
            </main>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <form onSubmit={handleSave} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {editId ? "Edit Ledger" : "Create Ledger"}
                        </h2>

                        <div className="mt-5 space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Ledger name</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <div className="mb-1 flex items-center justify-between">
                                    <label className="block text-sm font-medium text-gray-700">Under group</label>
                                    <div className="flex items-center gap-3 text-xs font-medium">
                                        <button
                                            type="button"
                                            onClick={openGroupCreate}
                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                        >
                                            <FaPlus className="text-[10px]" />
                                            Create
                                        </button>
                                        <button
                                            type="button"
                                            onClick={openGroupAlter}
                                            disabled={!selectedGroup || selectedGroup.isDefault}
                                            title={
                                                selectedGroup?.isDefault
                                                    ? "Default groups cannot be changed"
                                                    : "Alter selected group"
                                            }
                                            className="flex items-center gap-1 text-gray-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:text-gray-300"
                                        >
                                            <FaPen className="text-[10px]" />
                                            Alter
                                        </button>
                                    </div>
                                </div>
                                <select
                                    value={form.group}
                                    required
                                    onChange={(e) => setForm({ ...form, group: e.target.value })}
                                    className="w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                                <label className="mb-1 block text-sm font-medium text-gray-700">Opening balance</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.openingBalance}
                                        onChange={(e) => setForm({ ...form, openingBalance: e.target.value })}
                                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    <select
                                        value={form.openingType}
                                        onChange={(e) => setForm({ ...form, openingType: e.target.value })}
                                        className="w-24 rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="Dr">Dr</option>
                                        <option value="Cr">Cr</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {formError && <p className="mt-4 text-sm text-red-600">{formError}</p>}

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                            >
                                {saving ? "Saving..." : editId ? "Save changes" : "Create ledger"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Group create / alter popup (ledger form ke upar khulta hai) */}
            {showGroupForm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
                    <form onSubmit={handleGroupSave} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {groupEditId ? "Alter Group" : "Create Group"}
                        </h2>

                        <div className="mt-5 space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Group name</label>
                                <input
                                    type="text"
                                    required
                                    autoFocus
                                    value={groupForm.name}
                                    onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                                    className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Nature</label>
                                <select
                                    value={groupForm.nature}
                                    onChange={(e) => setGroupForm({ ...groupForm, nature: e.target.value })}
                                    className="w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    {Object.entries(natures).map(([key, label]) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {groupError && <p className="mt-4 text-sm text-red-600">{groupError}</p>}

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowGroupForm(false)}
                                className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={groupSaving}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                            >
                                {groupSaving ? "Saving..." : groupEditId ? "Save changes" : "Create group"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {deleteItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-lg font-semibold text-gray-800">Delete this ledger?</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            <span className="font-semibold text-gray-700">{deleteItem.name}</span> will be removed
                            permanently.
                        </p>

                        {formError && <p className="mt-3 text-sm text-red-600">{formError}</p>}

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteItem(null)}
                                className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={saving}
                                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
                            >
                                {saving ? "Deleting..." : "Delete ledger"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LedgerAlterPage;
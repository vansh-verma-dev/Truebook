import { useEffect, useState } from "react";
import { FaSearch, FaPlus, FaPen, FaTrash, FaLock } from "react-icons/fa";

const natures = {
    asset: { label: "Asset", style: "bg-green-100 text-green-700" },
    liability: { label: "Liability", style: "bg-red-100 text-red-700" },
    income: { label: "Income", style: "bg-blue-100 text-blue-700" },
    expense: { label: "Expense", style: "bg-orange-100 text-orange-700" },
};

const rowGrid = "grid grid-cols-[1fr_150px_130px_110px] items-center gap-3";

const emptyForm = { name: "", nature: "asset" };

const getCompanyId = () => {
    try {
        return JSON.parse(localStorage.getItem("selectedCompany") || "null")?._id;
    } catch {
        return null;
    }
};

function GroupPage() {
    const companyId = getCompanyId();
    const url = `${import.meta.env.VITE_API_URL}/api/companies/${companyId}/group`;
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [deleteItem, setDeleteItem] = useState(null);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState("");

    const fetchGroups = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await fetch(url, { headers });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to load groups");
            setGroups(data.groups || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (companyId) fetchGroups();
        else setLoading(false);
    }, [companyId]);

    const openCreate = () => {
        setEditId(null);
        setForm(emptyForm);
        setFormError("");
        setShowForm(true);
    };

    const openEdit = (group) => {
        setEditId(group._id);
        setForm({ name: group.name, nature: group.nature || "asset" });
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
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to save group");
            setShowForm(false);
            fetchGroups();
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
            if (!res.ok) throw new Error(data.message || "Failed to delete group");
            setDeleteItem(null);
            fetchGroups();
        } catch (err) {
            setFormError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const rows = groups.filter((g) => {
        if (typeFilter === "default" && !g.isDefault) return false;
        if (typeFilter === "custom" && g.isDefault) return false;
        return g.name.toLowerCase().includes(search.toLowerCase().trim());
    });

    return (
        <div className="w-[83vw]">
            <main className="bg-white w-full h-[95vh]">
                <div className="flex items-center justify-between px-5 py-3 bg-white border-b shadow-sm">
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search group..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="outline-none bg-transparent text-sm w-72"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">All Groups</option>
                            <option value="default">Default Groups</option>
                            <option value="custom">My Groups</option>
                        </select>

                        <button
                            onClick={openCreate}
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            <FaPlus className="text-xs" />
                            Create Group
                        </button>
                    </div>
                </div>

                <div className="m-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="h-[66vh] overflow-y-auto">
                        <div
                            className={`${rowGrid} sticky top-0 z-10 border-b bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500`}
                        >
                            <p>Group Name</p>
                            <p>Nature</p>
                            <p>Type</p>
                            <p className="text-center">Actions</p>
                        </div>

                        {loading && <p className="py-20 text-center text-gray-500">Loading groups...</p>}

                        {!loading && error && (
                            <div className="py-16 text-center">
                                <p className="text-red-600 font-medium">{error}</p>
                                <button
                                    onClick={fetchGroups}
                                    className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {!loading && !error && rows.length === 0 && (
                            <p className="py-20 text-center text-gray-500">No groups found.</p>
                        )}

                        {!loading &&
                            !error &&
                            rows.map((group) => {
                                const nature = natures[group.nature];

                                return (
                                    <div
                                        key={group._id || group.key}
                                        className={`${rowGrid} border-b border-l-4 border-l-transparent px-4 py-3 text-sm text-gray-600 transition hover:border-l-amber-400 hover:bg-amber-50/60`}
                                    >
                                        <p className="truncate font-semibold text-gray-800">{group.name}</p>

                                        <div>
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    nature?.style || "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {nature?.label || group.nature}
                                            </span>
                                        </div>

                                        <p className="text-xs font-medium text-gray-500">
                                            {group.isDefault ? "Default" : "Custom"}
                                        </p>

                                        <div className="flex items-center justify-center gap-2">
                                            {group.isDefault ? (
                                                <span
                                                    title="Default groups cannot be changed"
                                                    className="flex h-9 items-center gap-1.5 text-xs text-gray-400"
                                                >
                                                    <FaLock />
                                                    Locked
                                                </span>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => openEdit(group)}
                                                        title="Edit"
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                                    >
                                                        <FaPen className="text-xs" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setFormError("");
                                                            setDeleteItem(group);
                                                        }}
                                                        title="Delete"
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-red-50"
                                                    >
                                                        <FaTrash className="text-xs" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="border-t-2 bg-slate-50 px-4 py-3 text-sm text-gray-500">
                        Groups: <span className="font-semibold text-gray-800">{rows.length}</span>
                    </div>
                </div>
            </main>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <form onSubmit={handleSave} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {editId ? "Edit Group" : "Create Group"}
                        </h2>

                        <div className="mt-5 space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Group name</label>
                                <input
                                    type="text"
                                    required
                                    autoFocus
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Ye group kis type ka hai?
                                </label>
                                <select
                                    value={form.nature}
                                    onChange={(e) => setForm({ ...form, nature: e.target.value })}
                                    className="w-full rounded-lg border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    {Object.entries(natures).map(([key, item]) => (
                                        <option key={key} value={key}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
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
                                {saving ? "Saving..." : editId ? "Save changes" : "Create group"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {deleteItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-lg font-semibold text-gray-800">Delete this group?</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            <span className="font-semibold text-gray-700">{deleteItem.name}</span> will be removed
                            permanently. Agar is group me ledgers hain to delete nahi hoga.
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
                                {saving ? "Deleting..." : "Delete group"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GroupPage;
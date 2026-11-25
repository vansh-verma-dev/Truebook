const API = import.meta.env.VITE_API_URL;

const prefixes = {
    receipt: "RC",
    payment: "PY",
    contra: "CV",
    journal: "JV",
    sales: "SV",
    purchase: "PV",
    salesReturn: "SR",
    purchaseReturn: "PR",
};

const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getSelectedCompany = () => {
    try {
        return JSON.parse(localStorage.getItem("selectedCompany") || "null");
    } catch {
        return null;
    }
};

export const getVoucherNo = (type, number) =>
    `${prefixes[type] || "VC"}-${String(number).padStart(5, "0")}`;

export const fetchLedgers = async (companyId) => {
    const response = await fetch(`${API}/api/companies/${companyId}/ledgers`, {
        headers: authHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to load ledgers");
    }

    return data.ledger || data.data || [];
};

export const fetchGroups = async (companyId) => {
    const response = await fetch(`${API}/api/companies/${companyId}/group`, {
        headers: authHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to load groups");
    }

    return data.groups || [];
};

export const createLedger = async (companyId, payload) => {
    const response = await fetch(`${API}/api/companies/${companyId}/ledgers`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create ledger");
    }

    return data;
};

export const saveVoucher = async (companyId, payload) => {
    const response = await fetch(`${API}/api/companies/${companyId}/vouchers`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to save voucher");
    }

    return data.data;
};
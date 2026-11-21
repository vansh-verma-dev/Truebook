const readList = () => {
    try {
        return JSON.parse(localStorage.getItem("accounts")) || [];
    } catch {
        return [];
    }
};

export const getAccounts = () => readList();

export const getActiveUser = () => {
    try {
        return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
        return {};
    }
};

export const saveAccount = (token, user) => {
    const others = readList().filter((account) => account.user.id !== user.id);

    localStorage.setItem("accounts", JSON.stringify([...others, { token, user }]));
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.removeItem("selectedCompany");
};

export const activateAccount = (account) => {
    localStorage.setItem("token", account.token);
    localStorage.setItem("user", JSON.stringify(account.user));
    localStorage.removeItem("selectedCompany");
};

export const removeAccount = (userId) => {
    const rest = readList().filter((account) => account.user.id !== userId);
    localStorage.setItem("accounts", JSON.stringify(rest));

    if (getActiveUser().id === userId) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("selectedCompany");
    }
};
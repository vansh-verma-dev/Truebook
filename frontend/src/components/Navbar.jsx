import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaBell, FaBuilding, FaChevronDown, FaPlus } from "react-icons/fa";
import {
    getAccounts,
    getActiveUser,
    activateAccount,
    removeAccount,
} from "../utils/accountStore";

const roleLabel = {
    student: "Student",
    owner: "Business Owner",
    accountant: "Accountant",
};

const getInitials = (name) =>
    (name || "U")
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

function Navbar({ setOpen, company }) {
    const user = getActiveUser();
    const userName = user.fullName || user.name || "User";
    const userRole = roleLabel[user.role] || "User";
    const companyName = company?.name || "No Company Selected";

    const [menuOpen, setMenuOpen] = useState(false);
    const [accounts, setAccounts] = useState(getAccounts);
    const [switchingId, setSwitchingId] = useState("");
    const navRef = useRef(null);

    const otherAccounts = accounts.filter((account) => account.user.id !== user.id);

    useEffect(() => {
        const closeMenu = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", closeMenu);
        return () => document.removeEventListener("mousedown", closeMenu);
    }, []);

    const toggleMenu = () => {
        if (!menuOpen) setAccounts(getAccounts());
        setMenuOpen(!menuOpen);
    };

    const handleSwitchAccount = async (account) => {
        try {
            setSwitchingId(account.user.id);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/me`,
                { headers: { Authorization: `Bearer ${account.token}` } }
            );

            if (!response.ok) throw new Error("expired");

            activateAccount(account);
            window.location.reload();
        } catch {
            removeAccount(account.user.id);
            setAccounts(getAccounts());
            toast.error(`Session expired for ${account.user.email}. Please add the account again.`);
        } finally {
            setSwitchingId("");
        }
    };

    const handleAddAccount = () => {
        window.location.href = "/login";
    };

    return (
        <section className="dashboard-page w-full bg-white">
            <nav
                ref={navRef}
                className="relative z-40 w-full h-[75px] px-8 flex items-center justify-between border-b border-slate-200 bg-white shadow-sm"
            >
                <div className="logo">
                    <h1 className="text-slate-800 text-3xl font-bold tracking-wide">
                        True
                        <span className="text-[#0d6efd]">Book</span>
                    </h1>
                </div>

                <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 sm:flex">
                    <FaBuilding className="text-[#0d6efd]" />
                    <span className="max-w-[260px] truncate text-sm font-semibold text-slate-700">
                        {companyName}
                    </span>
                </div>

                <div className="profile-section flex items-center gap-5">
                    <button
                        className="relative"
                        onClick={() => {
                            setMenuOpen(false);
                            setOpen(true);
                        }}
                    >
                        <FaBell className="text-slate-500 text-xl cursor-pointer hover:text-[#0d6efd] transition-all duration-300" />

                        <span className="absolute -top-1 -right-1 w-[8px] h-[8px] bg-[#0d6efd] rounded-full"></span>
                    </button>

                    <div className="relative">
                        <button
                            onClick={toggleMenu}
                            className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-slate-50"
                        >
                            <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#0d6efd] text-sm font-bold text-white">
                                {getInitials(userName)}
                            </span>

                            <span className="hidden text-left md:block">
                                <span className="block text-sm font-medium text-slate-800">
                                    {userName}
                                </span>
                                <span className="block text-xs text-slate-400">
                                    {userRole}
                                </span>
                            </span>

                            <FaChevronDown
                                className={`hidden text-xs text-slate-400 transition md:block ${
                                    menuOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 top-[calc(100%+10px)] w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                                <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0d6efd] text-sm font-bold text-white">
                                        {getInitials(userName)}
                                    </span>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-slate-800">
                                            {userName}
                                        </p>
                                        <p className="truncate text-xs text-slate-400">
                                            {user.email || "-"}
                                        </p>
                                        <span className="mt-1 inline-block rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                                            Active • {userRole}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-2">
                                    <p className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                        Switch Account
                                    </p>

                                    {otherAccounts.length === 0 && (
                                        <p className="px-3 py-3 text-xs text-slate-400">
                                            No other account on this device
                                        </p>
                                    )}

                                    {otherAccounts.map((account) => (
                                        <button
                                            key={account.user.id}
                                            onClick={() => handleSwitchAccount(account)}
                                            disabled={!!switchingId}
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50 disabled:opacity-60"
                                        >
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                                                {getInitials(account.user.fullName)}
                                            </span>

                                            <span className="min-w-0 flex-1">
                                                <span className="block truncate text-sm font-semibold text-slate-800">
                                                    {account.user.fullName}
                                                </span>
                                                <span className="block truncate text-xs text-slate-400">
                                                    {account.user.email}
                                                </span>
                                            </span>

                                            {switchingId === account.user.id && (
                                                <span className="text-xs text-slate-400">
                                                    Switching...
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="border-t border-slate-100 p-2">
                                    <button
                                        onClick={handleAddAccount}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#0d6efd]"
                                    >
                                        <FaPlus className="text-sm" />
                                        Add another account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default Navbar;
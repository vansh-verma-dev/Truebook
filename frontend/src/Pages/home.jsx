import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../Pages/Dashboard";
import Company from "../Pages/company";
import Daybook from "../Pages/DayBook";
import CreateCompany from "../Pages/CompanyCreate";
import SplashScreen from "../Pages/SplashScreen";
import Voucher from "../Vouchers/VoucherPage";
import CreateHome from "../Pages/CreatePage/Createhome";
import AlterPage from "../Pages/AlterPage/AlterHome";
import Settings from "../Pages/setting/setting";
import Banking from "../Pages/Banking/banking";
import Reports from "../Pages/Reports/Reports";
import RightPanel from "../components/rightPanel";
import LedgerAlterPage from "./AlterPage/ledger.Alter";

const pagePaths = {
    Dashboard: "/",
    company: "/company",
    CreateCompany: "/company/create",
    Daybook: "/daybook",
    Voucher: "/voucher",
    voucher: "/voucher",
    CreateHome: "/create",
    Alter: "/alter",
    setting: "/settings",
    BanKing: "/banking",
    Reports: "/reports",
};

function HomePage() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [selectedCompany, setSelectedCompany] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("selectedCompany") || "null");
        } catch {
            return null;
        }
    });

    const setActivePage = (page) => {
        navigate(pagePaths[page] || "/");
    };

    useEffect(() => {
        const time = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(time);
    }, []);

    const handleCompanySelect = (company) => {
        localStorage.setItem("selectedCompany", JSON.stringify(company));
        setSelectedCompany(company);
        setActivePage("Dashboard");
    };

    return (
        <section className="w-full h-[100vh]">
            {loading && <SplashScreen />}

            <Navbar
                open={open}
                setOpen={setOpen}
                company={selectedCompany}
            />

            <main className="overflow-hidden h-[calc(100vh-75px)] flex relative main-page">
                <Sidebar setActivePage={setActivePage} />

                <RightPanel
                    open={open}
                    setOpen={setOpen}
                />

                <section className="mainpage">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />

                        <Route
                            path="company"
                            element={
                                <Company
                                    setActivePage={setActivePage}
                                    onSelectCompany={handleCompanySelect}
                                />
                            }
                        />

                        <Route
                            path="company/create"
                            element={<CreateCompany setActivePage={setActivePage} />}
                        />

                        <Route path="daybook" element={<Daybook />} />
                        <Route path="voucher" element={<Voucher />} />

                        <Route path="create" element={<CreateHome />} />

                        <Route path="alter" element={<AlterPage />} />
                        <Route path="alter/ledger" element={<LedgerAlterPage />} />

                        <Route path="settings" element={<Settings />} />
                        <Route path="banking" element={<Banking />} />
                        <Route path="reports" element={<Reports />} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </section>
            </main>
        </section>
    );
}

export default HomePage;
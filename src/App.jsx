import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Company from "./Pages/company";
import Daybook from "./Pages/DayBook";
import CreateCompany from "./Pages/CompanyCreate";
import Account from "./UserAccount/userpage";
import SplashScreen from "./Pages/SplashScreen";
import Voucher from "./Vouchers/VoucherPage";
import CreateHome from "./Pages/CreatePage/Createhome";
import AlterPage from "./Pages/AlterPage/AlterHome";
import Settings from "./Pages/setting/setting";

function App() {
    const [loading, setLoading] = useState(true);
    const [activePage, setActivePage] = useState("Dashboard");

    useEffect(() => {
        const time = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(time)
    }, []);


    return (
        <section className="  w-full h-[100vh]">
            {loading ? <SplashScreen /> : null}
            <Navbar />
            <main className="overflow-hidden   h-[100vh] flex   ">
                <Sidebar setActivePage={setActivePage} />
                <section className="mainpage">
                    <section className="mainpage">
                        {
                            activePage === "Dashboard" &&
                            <Dashboard />
                        }

                        {
                            activePage === "company" &&
                            <Company setActivePage={setActivePage} />
                        }

                        {
                            activePage === "voucher" &&
                            <Voucher />
                        }
                        {
                            activePage === "CreateCompany" &&
                            <CreateCompany />
                        }
                        {
                            activePage === "Daybook" &&
                            <Daybook />
                        }
                        {activePage === "Account" && (
                            <Account />
                        )
                        }
                        {
                            activePage === "Voucher" &&
                            <Voucher />
                        }
                        {
                            activePage === "CreateHome" &&
                            <CreateHome />
                        }
                          {
                            activePage === "Alter" &&
                            <AlterPage/>
                        }
                        {
                            activePage === "setting" &&
                            <Settings/>
                        }
                    </section>
                </section>
            </main>
        </section>
    )
}
export default App;
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
import Banking from "./Pages/Banking/banking";
import Reports from "./Pages/Reports/Reports";
import RightPanel from "./components/rightPanel";

function App() {
    const [open, setOpen] = useState(false);
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
            {/* ----Navbar--- */}
         <Navbar setOpen={setOpen} />
          {/*  ---Main-pages--- */}

            <main className="overflow-hidden   h-[100vh] flex relative main-page ">
                {/* ---sidebar--- */}
                <Sidebar setActivePage={setActivePage} />

                {/* --Rightpanel Notifivcation bar--- */}
               <RightPanel open={open} setOpen={setOpen} />

               {/* ----Mainpages--- */}
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
                            <AlterPage />
                        }
                        {
                            activePage === "setting" &&
                            <Settings />
                        }
                        {
                            activePage === "BanKing" &&
                            <Banking />
                        }
                        {
                            activePage === "Reports" &&
                            <Reports />
                        }

                    </section>
                </section>
            </main>
        </section>
    )
}
export default App;
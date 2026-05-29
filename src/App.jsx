import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Company from "./Pages/company";
import CompnayCreate from "./Pages/CompanyCreate";
import Daybook from "./Pages/DayBook";

function App() {
    const [activePage, setActivePage] = useState("Daybook");

    return (
        <section className="w-full h-[100vh]">
            <Navbar />
            <main className="overflow-hidden w-full h-100vh flex bg-[#030316] ">
                <Sidebar setActivePage={setActivePage} />
                <section className="mainpage">
                    <section className="mainpage">
                        {
                            activePage === "Dashboard" &&
                            <Dashboard />
                        }

                        {
                            activePage === "company" &&
                            <Company />
                        }

                        {
                            activePage === "voucher" &&
                            <Voucher />
                        }
                        {
                            activePage === "CreateCompnay" && 
                            <CompnayCreate/>
                        }
                        {
                            activePage === "Daybook" && 
                            <Daybook/>
                        }

                    </section>
                </section>
            </main>
        </section>
    )
}
export default App;
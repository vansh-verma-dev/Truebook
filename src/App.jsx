import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Company from "./Pages/company";
import Daybook from "./Pages/DayBook";
import CreateCompany from "./Pages/CompanyCreate";
 
function App() {
  
    const [activePage, setActivePage] = useState("company");
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
                            <Company setActivePage={setActivePage} />
                        }

                        {
                            activePage === "voucher" &&
                            <Voucher />
                        }
                        {
                            activePage === "CreateCompany" &&
                      <CreateCompany/>
                        }
                        {
                            activePage === "Daybook" &&
                            <Daybook />
                        }
                    </section>
                </section>
            </main>
        </section>
    )
}
export default App;
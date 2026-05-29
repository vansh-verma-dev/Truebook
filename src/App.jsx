import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Company from "./Pages/company";

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
                            <Company />
                        }

                        {
                            activePage === "voucher" &&
                            <Voucher />
                        }
                        

                    </section>
                </section>
            </main>
        </section>
    )
}
export default App;
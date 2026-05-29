
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainPage from "./mainPage";
import Account from "../UserAccount/userpage";



function Dashboard() {
  const [main, setMain] = useState(true);
  const [user , setUser] = useState(true);

  return (
    <section className="bg-[#0F172A] w-full h-[100vh]">
      <Navbar />

      <section className="flex">
        <Sidebar />

        <div>
           {!user? <Account/> : <MainPage/>}
        </div>


      </section>
    </section>
  );
}

export default Dashboard;
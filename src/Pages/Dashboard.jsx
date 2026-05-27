
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainPage from "./mainPage";
import SigninPage from "../UserAccount/signin";



function Dashboard() {
  const [main, setMain] = useState(true);

  return (
    <section className="bg-[#0F172A] w-full h-[100vh]">
      <Navbar />

      <section className="flex">
        <Sidebar />

        <div>
          <SigninPage />
        </div>


      </section>
    </section>
  );
}

export default Dashboard;
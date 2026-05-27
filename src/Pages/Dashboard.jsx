
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
 

function Dashboard() {
  return (
    <section className="bg-[#0F172A] w-full h-[100vh]">
      <Navbar />

      <section className="flex">
    <Sidebar/>
      </section>
    </section>
  );
}

export default Dashboard;
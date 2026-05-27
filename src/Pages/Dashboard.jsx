import { FaBell } from "react-icons/fa";

function Dashboard() {
  return (
    <section className="dashboard-page w-full min-h-screen bg-[#0F172A]">
 
      <nav className="w-full h-[75px] px-8 flex items-center justify-between border-b border-white/10 bg-[#101828]">

 
        <div className="logo">
          <h1 className="text-white text-3xl font-bold tracking-wide">
            True
            <span className="text-orange-500">Book</span>
          </h1>
        </div>

       
        <div className="company-name">
          <h2 className="text-gray-300 text-sm md:text-base font-medium hidden sm:flex">
            Vansh Verma Enterprises Pvt. Ltd.
          </h2>
        </div>

     
        <div className="profile-section flex items-center gap-5">

    
          <button className="relative">
            <FaBell className="text-white text-xl cursor-pointer hover:text-orange-400 transition-all duration-300" />

            <span className="absolute -top-1 -right-1 w-[8px] h-[8px] bg-orange-500 rounded-full"></span>
          </button>

         
          <div className="flex items-center gap-3 cursor-pointer">

            <div className="w-[40px] h-[40px] rounded-full overflow-hidden border">
              <img
                src="https://i.pinimg.com/736x/43/78/71/4378717c7ac9b9120c6d163c370838be.jpg"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="hidden md:block">
              <h3 className="text-white text-sm font-medium">
                Vansh Verma
              </h3>

              <p className="text-gray-400 text-xs">
                Administrator
              </p>
            </div>

          </div>
        </div>

      </nav>
    </section>
  );
}

export default Dashboard;
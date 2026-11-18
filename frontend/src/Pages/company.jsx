import Searchbar from "../components/SearchBar";
import CompanyData from "../Data/Company";

const avatarPalette = [
  { bg: "bg-violet-50 text-violet-600 border-violet-100" },
  { bg: "bg-sky-50 text-sky-600 border-sky-100" },
  { bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { bg: "bg-amber-50 text-amber-600 border-amber-100" },
  { bg: "bg-rose-50 text-rose-600 border-rose-100" },
  { bg: "bg-indigo-50 text-indigo-600 border-indigo-100" },
];

function Company({ setActivePage }) {
  return (
    <section className="w-[83vw] h-[95vh] relative m-0 p-0 bg-[#f8fafc] flex flex-col">
      
      {/* Top Header Bar */}
      <div className="px-6 pt-6 pb-2 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Switch Company</h1>
          <p className="text-xs text-slate-500 mt-0.5">Select a company workspace to continue accounting & reports</p>
        </div>
        
        <button 
          onClick={() => {
            console.log("Add company clicked");
          }}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Company
        </button>
      </div>

      {/* Search Input Container */}
      <div className="px-6 py-2 shrink-0">
        <Searchbar setActivePage={setActivePage} />
      </div>

      {/* Company List Container (Full Width Rows) */}
      <div className="company_scrollbar px-6 py-3 flex-1 overflow-y-auto">
        
        {CompanyData.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <svg className="w-10 h-10 text-slate-300 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
            </svg>
            <p className="text-sm font-medium text-slate-600">No companies found</p>
            <p className="text-xs text-slate-400 mt-1">Try searching with a different keyword</p>
          </div>
        )}

        <div className="flex flex-col gap-3 pb-6">
          {CompanyData.map((Compdata, ui) => {
            const initials = Compdata.companyName
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            const theme = avatarPalette[ui % avatarPalette.length];

            return (
              <div
                key={ui}
                className="group relative bg-white border border-slate-200/70 px-5 py-3.5 rounded-2xl
                           flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4
                           shadow-sm hover:shadow-md hover:border-blue-300/80 
                           transition-all duration-200"
              >
                {/* Left Side: Avatar, Name, Type & Status */}
                <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                  {/* Avatar */}
                  <div className={`shrink-0 w-11 h-11 rounded-xl ${theme.bg} 
                                  flex items-center justify-center text-sm font-bold 
                                  border shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                    {initials}
                  </div>

                  {/* Company Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {Compdata.companyName}
                      </h2>
                      {/* Active Dot */}
                      <span className="hidden sm:inline-flex h-2 w-2 relative shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
                      <span className="font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {Compdata.companyType}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span>FY: <strong className="text-slate-700">2025-26</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Action Button */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="sm:hidden text-xs text-slate-400">
                    FY: <span className="text-slate-700 font-medium">2025-26</span>
                  </div>
                  
                  <button
                    onClick={() => setActivePage(Compdata)}
                    className="bg-blue-600 hover:bg-blue-700 active:scale-95
                               text-white text-xs font-semibold px-5 py-2.5 rounded-xl
                               transition-all duration-200 shadow-sm shadow-blue-500/20
                               flex items-center gap-1.5 group/btn ml-auto sm:ml-0"
                  >
                    <span>Select</span>
                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

export default Company;
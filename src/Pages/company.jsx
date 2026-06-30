import Footer from "../components/company_footer";
import Searchbar from "../components/SearchBar";
import CompanyData from "../Data/Company";

// avatar ke liye soft color palette - companyName ke first letter se pick hota hai
const avatarPalette = [
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-sky-100", text: "text-sky-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
];

function Company({ setActivePage }) {
  return (
    <section className="w-full h-[95vh] relative m-0 p-0 bg-[#f8f9fb]">

      {/* --Search-Input--- */}
      <Searchbar setActivePage={setActivePage} />

      {/* --Company-Data--- */}
      <div className="company_scrollbar py-3 px-3 h-[85vh] overflow-y-auto">

        {CompanyData.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p className="text-sm">Koi company nahi mili</p>
          </div>
        )}

        {CompanyData.map((Compdata, ui) => {
          // initials nikal lete hain avatar ke liye
          const initials = Compdata.companyName
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

          const color = avatarPalette[ui % avatarPalette.length];

          return (
            <div
              key={ui}
              className="group bg-white border border-gray-100 m-2 px-4 py-3.5 rounded-2xl
                         flex items-center justify-between
                         shadow-[0_1px_3px_rgba(16,24,40,0.06)]
                         hover:shadow-[0_4px_12px_rgba(16,24,40,0.08)] hover:border-indigo-200
                         hover:-translate-y-0.5
                         transition-all duration-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Avatar */}
                <div className={`shrink-0 w-11 h-11 rounded-xl ${color.bg} ${color.text}
                                flex items-center justify-center text-sm font-semibold`}>
                  {initials}
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <h1 className="text-sm font-semibold text-[#1d2939] truncate">
                    {Compdata.companyName}
                  </h1>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {Compdata.companyType}
                  </p>
                </div>
              </div>

              {/* Select Button */}
              <button
                className="shrink-0 bg-indigo-600 hover:bg-indigo-500 active:scale-95
                           text-white text-sm font-medium px-5 py-2 rounded-xl
                           transition-all duration-150
                           shadow-[0_1px_2px_rgba(79,70,229,0.3)]"
              >
                Select
              </button>
            </div>
          );
        })}
      </div>

    </section>
  );
}
export default Company;
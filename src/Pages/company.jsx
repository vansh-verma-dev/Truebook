
import Footer from "../components/company_footer";
import Searchbar from "../components/SearchBar";
import CompanyData from "../Data/Company";

function Company() {
    return (
        <section className="relative">

            {/* --Search-Input--- */}
            <Searchbar />

            {/* --Company-Data--- */}
            <div className="company_scrollbar  py-2 h-[65vh] overflow-x-auto ">

                {CompanyData.map((Cdata, i) => {
                    return (
                        <div className="bg-[#1d2939] m-2 px-2 py-3 text-white  flex items-center justify-between">
                            <span>
                                <h1 className="text-sm">{Cdata.companyName}</h1>
                                <p className="text-xs text-gray-400">{Cdata.companyType}</p>
                            </span>

                            <button className="bg-blue-500 px-5 py-2 rounded-lg">
                                Select
                            </button>

                        </div>
                    )
                })}
            </div>

            {/* ---Footer-- */}
            <Footer />

        </section>
    )
}
export default Company;


import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

const avatarPalette = [
  { bg: "bg-violet-50 text-violet-600 border-violet-100" },
  { bg: "bg-sky-50 text-sky-600 border-sky-100" },
  { bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { bg: "bg-amber-50 text-amber-600 border-amber-100" },
  { bg: "bg-rose-50 text-rose-600 border-rose-100" },
  { bg: "bg-indigo-50 text-indigo-600 border-indigo-100" },
];

const CREATE_COMPANY_PAGE = "CreateCompany";
const ALTER_COMPANY_PAGE = "CreateCompany";
const SELECT_COMPANY_PAGE = "Dashboard";

const rowGrid =
  "grid grid-cols-[2fr_1.2fr_1fr_1.3fr_1fr_1fr_240px] items-center gap-4";

const getSavedCompanyId = () => {
  try {
    return JSON.parse(localStorage.getItem("selectedCompany"))?._id || "";
  } catch {
    return "";
  }
};

const getFinancialYear = (start) => {
  if (!start) return "-";

  const startYear = new Date(start).getFullYear();
  if (isNaN(startYear)) return "-";

  return `${startYear}-${String(startYear + 1).slice(-2)}`;
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function Company({ setActivePage }) {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(getSavedCompanyId);
  const [confirm, setConfirm] = useState({ type: "", company: null });
  const [deleting, setDeleting] = useState(false);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view your companies.");
        setCompanies([]);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/companies`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch companies");
      }

      setCompanies(data.data || []);
    } catch (err) {
      setError(err.message || "Unable to load companies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const searchValue = search.toLowerCase().trim();

    return (
      (company.name || "").toLowerCase().includes(searchValue) ||
      (company.companyType || "").toLowerCase().includes(searchValue) ||
      (company.city || "").toLowerCase().includes(searchValue)
    );
  });

  const handleSelectCompany = (company) => {
    localStorage.setItem("selectedCompany", JSON.stringify(company));
    setSelectedId(company._id);
    setActivePage(SELECT_COMPANY_PAGE);
  };

  const handleCreateCompany = () => {
    setActivePage(CREATE_COMPANY_PAGE);
  };

  const closeConfirm = () => setConfirm({ type: "", company: null });

  const deleteCompany = async () => {
    try {
      setDeleting(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/companies/${confirm.company._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete company");
      }

      setCompanies(companies.filter((c) => c._id !== confirm.company._id));

      if (confirm.company._id === selectedId) {
        localStorage.removeItem("selectedCompany");
        setSelectedId("");
      }

      toast.success("Company deleted");
      closeConfirm();
    } catch (err) {
      toast.error(err.message || "Unable to delete company");
    } finally {
      setDeleting(false);
    }
  };

  const alterCompany = () => {
    localStorage.setItem("alterCompany", JSON.stringify(confirm.company));
    closeConfirm();
    setActivePage(ALTER_COMPANY_PAGE);
  };

  const isDelete = confirm.type === "delete";
  const confirmName = confirm.company?.name || "";

  return (
    <section className="w-[83vw] h-[95vh] relative m-0 p-0 bg-[#f8fafc] flex flex-col">
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Switch Company</h1>
          <p className="text-sm text-gray-500 mt-1">
            Select a company to continue working
          </p>
        </div>

        <button
          onClick={handleCreateCompany}
          className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-sm"
        >
          + Create Company
        </button>
      </div>

      <div className="px-8 py-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-800">Your Companies</h2>

          <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            {companies.length}
          </span>
        </div>

        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search by name, type or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4 text-sm">Loading companies...</p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
            <p className="text-red-600 font-medium">{error}</p>

            <button
              onClick={fetchCompanies}
              className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && companies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl mb-4">
              🏢
            </div>

            <h3 className="text-xl font-semibold text-gray-800">
              No Companies Found
            </h3>

            <p className="text-gray-500 mt-2 max-w-sm">
              You haven't created any company yet. Create your first company to
              get started.
            </p>

            <button
              onClick={handleCreateCompany}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
            >
              + Create Your First Company
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          companies.length > 0 &&
          filteredCompanies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No companies match "{search}"</p>
            </div>
          )}

        {!loading && !error && filteredCompanies.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="min-w-[1000px]">
              <div
                className={`${rowGrid} bg-gray-50 border-b border-gray-200 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500`}
              >
                <p>Company</p>
                <p>Type</p>
                <p>City</p>
                <p>GSTIN</p>
                <p>Financial Year</p>
                <p>Created</p>
                <p className="text-right">Action</p>
              </div>

              {filteredCompanies.map((company, index) => {
                const initials = (company.name || "CO")
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();

                const palette = avatarPalette[index % avatarPalette.length];
                const isSelected = company._id === selectedId;

                return (
                  <div
                    key={company._id}
                    className={`${rowGrid} px-5 py-3.5 border-b border-gray-100 last:border-b-0 transition-colors ${
                      isSelected ? "bg-blue-50/60" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 shrink-0 rounded-xl border flex items-center justify-center text-sm font-bold ${palette.bg}`}
                      >
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-800">
                          {company.name}
                        </p>
                        <p className="truncate text-xs text-gray-400">
                          {company.email || company.phone || "-"}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 truncate">
                      {company.companyType || "-"}
                    </p>

                    <p className="text-sm text-gray-600 truncate">
                      {company.city || "-"}
                    </p>

                    <p className="text-sm text-gray-600 truncate">
                      {company.gstin || "-"}
                    </p>

                    <p className="text-sm font-medium text-gray-800">
                      {getFinancialYear(company.financialYearStart)}
                    </p>

                    <p className="text-sm text-gray-600">
                      {formatDate(company.createdAt)}
                    </p>

                    <div className="flex items-center justify-end gap-2">
                      {isSelected ? (
                        <span className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                          ✓ Selected
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSelectCompany(company)}
                          className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700 active:scale-95"
                        >
                          Select
                        </button>
                      )}

                      <button
                        onClick={() => setConfirm({ type: "alter", company })}
                        className="flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100 active:scale-95"
                      >
                        <FaEdit /> Alter
                      </button>

                      <button
                        onClick={() => setConfirm({ type: "delete", company })}
                        className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 active:scale-95"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!confirm.type}
        danger={isDelete}
        icon={isDelete ? <FaTrash /> : <FaEdit />}
        title={isDelete ? "Delete company?" : "Alter company?"}
        message={
          isDelete
            ? `Are you sure you want to delete "${confirmName}"?`
            : `Do you want to alter "${confirmName}"?`
        }
        yesText={isDelete ? "Yes, Delete" : "Yes, Alter"}
        loading={deleting}
        onYes={isDelete ? deleteCompany : alterCompany}
        onNo={closeConfirm}
      />
    </section>
  );
}

export default Company;
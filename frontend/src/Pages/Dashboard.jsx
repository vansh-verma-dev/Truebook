import {
  FaArrowUp,
  FaArrowDown,
  FaWallet,
  FaFileInvoiceDollar,
  FaUniversity,
  FaPlusCircle,
  FaReceipt,
  FaUserPlus,
  FaFileExport,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ---- Demo data (replace with real API data later) ----
const revenueTrend = [
  { month: "Jan", income: 42000, expense: 28000 },
  { month: "Feb", income: 38000, expense: 25000 },
  { month: "Mar", income: 51000, expense: 31000 },
  { month: "Apr", income: 47000, expense: 29500 },
  { month: "May", income: 62000, expense: 34000 },
  { month: "Jun", income: 58000, expense: 33000 },
  { month: "Jul", income: 71000, expense: 38500 },
];

const expenseSplit = [
  { name: "Inventory", value: 38, color: "#0d6efd" },
  { name: "Salaries", value: 27, color: "#22c55e" },
  { name: "Rent", value: 14, color: "#f59e0b" },
  { name: "Utilities", value: 11, color: "#a78bfa" },
  { name: "Other", value: 10, color: "#94a3b8" },
];

const recentTransactions = [
  { id: "INV-1042", party: "Sharma Traders", type: "Sales", date: "29 Jun", amount: 18500, status: "Paid" },
  { id: "PUR-0876", party: "Singh Hardware Co.", type: "Purchase", date: "28 Jun", amount: -9200, status: "Pending" },
  { id: "INV-1041", party: "Vansh Verma Enterprises", type: "Sales", date: "27 Jun", amount: 24750, status: "Paid" },
  { id: "EXP-0312", party: "Office Rent", type: "Expense", date: "26 Jun", amount: -15000, status: "Paid" },
  { id: "INV-1039", party: "Rajput Electronics", type: "Sales", date: "25 Jun", amount: 6800, status: "Overdue" },
];

const statusStyle = {
  Paid: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Overdue: "bg-rose-50 text-rose-600",
};

function StatCard({ label, value, change, positive, icon: Icon }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)] hover:shadow-[0_8px_20px_rgba(13,110,253,0.08)] transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400 font-medium">{label}</p>
          <h2 className="text-2xl font-bold text-[#1d2939] mt-1.5">{value}</h2>
        </div>
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
          <Icon className="text-[#0d6efd] text-base" />
        </div>
      </div>

      <div className="flex items-center gap-1 mt-3">
        {positive ? (
          <FaArrowUp className="text-emerald-500 text-[10px]" />
        ) : (
          <FaArrowDown className="text-rose-500 text-[10px]" />
        )}
        <span className={`text-xs font-semibold ${positive ? "text-emerald-500" : "text-rose-500"}`}>
          {change}
        </span>
        <span className="text-xs text-slate-400">vs last month</span>
      </div>
    </div>
  );
}

function QuickAction({ label, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 bg-white border border-slate-100 rounded-2xl py-4 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-200 group"
    >
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#0d6efd] transition-colors duration-200">
        <Icon className="text-[#0d6efd] group-hover:text-white text-sm transition-colors duration-200" />
      </div>
      <span className="text-xs font-medium text-slate-600">{label}</span>
    </button>
  );
}

function Dashboard({ setActivePage }) {
  return (
    <section className="w-[83vw] min-h-screen bg-[#f8f9fb] px-6 py-6 space-y-6">

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d6efd] to-[#0250c5] rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-12 -right-4 w-28 h-28 bg-white/10 rounded-full" />

        <h1 className="relative text-2xl md:text-3xl font-bold tracking-tight">
          Welcome back, Users
        </h1>
        <p className="relative text-blue-100 mt-2 text-sm md:text-base">
          Here's what's happening with your business today
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="₹3,69,000" change="12.4%" positive icon={FaWallet} />
        <StatCard label="Total Expense" value="₹2,19,000" change="6.1%" positive={false} icon={FaFileInvoiceDollar} />
        <StatCard label="Net Profit" value="₹1,50,000" change="18.7%" positive icon={FaArrowUp} />
        <StatCard label="Bank Balance" value="₹8,42,300" change="3.2%" positive icon={FaUniversity} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Revenue trend */}
        <div className="xl:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-semibold text-[#1d2939]">Income vs Expense</h3>
              <p className="text-xs text-slate-400 mt-0.5">Last 7 months</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0d6efd]" />Income</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300" />Expense</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d6efd" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#0d6efd" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                formatter={(val) => `₹${val.toLocaleString()}`}
              />
              <Area type="monotone" dataKey="expense" stroke="#cbd5e1" fill="#f1f5f9" strokeWidth={2} />
              <Area type="monotone" dataKey="income" stroke="#0d6efd" fill="url(#incomeGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense split */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
          <h3 className="text-sm font-semibold text-[#1d2939]">Expense Split</h3>
          <p className="text-xs text-slate-400 mt-0.5 mb-2">This month</p>

          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={expenseSplit} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3}>
                {expenseSplit.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip formatter={(val) => `${val}%`} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-1.5 mt-2">
            {expenseSplit.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-medium text-slate-700">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions + Recent transactions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
          <h3 className="text-sm font-semibold text-[#1d2939] mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <QuickAction label="New Voucher" icon={FaReceipt} onClick={() => setActivePage?.("Voucher")} />
            <QuickAction label="New Entry" icon={FaPlusCircle} onClick={() => setActivePage?.("CreateHome")} />
            <QuickAction label="Add Party" icon={FaUserPlus} onClick={() => setActivePage?.("CreateHome")} />
            <QuickAction label="Export Report" icon={FaFileExport} onClick={() => setActivePage?.("Reports")} />
          </div>
        </div>

        <div className="xl:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#1d2939]">Recent Transactions</h3>
            <button
              onClick={() => setActivePage?.("Daybook")}
              className="text-xs font-medium text-[#0d6efd] hover:underline"
            >
              View all
            </button>
          </div>

          <div className="space-y-1">
            {recentTransactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between px-2 py-2.5 rounded-xl hover:bg-slate-50 transition-colors duration-150"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1d2939] truncate">{t.party}</p>
                  <p className="text-xs text-slate-400">{t.id} · {t.type} · {t.date}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyle[t.status]}`}>
                    {t.status}
                  </span>
                  <span className={`text-sm font-semibold w-24 text-right ${t.amount > 0 ? "text-emerald-600" : "text-slate-700"}`}>
                    {t.amount > 0 ? "+" : ""}₹{Math.abs(t.amount).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

export default Dashboard;
import { useState } from "react";

import {
    LayoutDashboard,
    PlusSquare,
    PencilLine,
    Receipt,
    BookOpen,
    FileBarChart,
    Settings,
    LogOut,
    ChevronDown,
    ChevronRight,
} from "lucide-react";

function Sidebar() {

    const [openCreate, setOpenCreate] = useState(false);
    const [openAlter, setOpenAlter] = useState(false);

    return (
        <aside className="w-[280px] h-[90vh] bg-[#101828] border-r border-white/10 flex flex-col justify-between p-5">


            <div>

                <nav className="flex flex-col gap-2">


                    <button className="sidebar-btn bg-orange-500 text-white">
                        <LayoutDashboard size={20} />
                        Dashboard
                    </button>
                    <div>

                        <button
                            onClick={() => setOpenCreate(!openCreate)}
                            className="sidebar-btn justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <PlusSquare size={20} />
                                Create
                            </div>

                            {
                                openCreate
                                    ? <ChevronDown size={18} />
                                    : <ChevronRight size={18} />
                            }
                        </button>

                        {
                            openCreate && (
                                <div className="ml-8 mt-2 flex flex-col gap-2">

                                    <button className="submenu-btn">
                                        Voucher
                                    </button>

                                    <button className="submenu-btn">
                                        Ledger
                                    </button>

                                    <button className="submenu-btn">
                                        Unit
                                    </button>

                                    <button className="submenu-btn">
                                        Group
                                    </button>

                                </div>
                            )
                        }

                    </div>


                    <div>

                        <button
                            onClick={() => setOpenAlter(!openAlter)}
                            className="sidebar-btn justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <PencilLine size={20} />
                                Alter
                            </div>

                            {
                                openAlter
                                    ? <ChevronDown size={18} />
                                    : <ChevronRight size={18} />
                            }
                        </button>

                        {
                            openAlter && (
                                <div className="ml-8 mt-2 flex flex-col gap-2">

                                    <button className="submenu-btn">
                                        Voucher
                                    </button>

                                    <button className="submenu-btn">
                                        Ledger
                                    </button>

                                    <button className="submenu-btn">
                                        Unit
                                    </button>

                                    <button className="submenu-btn">
                                        Group
                                    </button>

                                </div>
                            )
                        }

                    </div>


                    <button className="sidebar-btn">
                        <Receipt size={20} />
                        Voucher
                    </button>


                    <button className="sidebar-btn">
                        <BookOpen size={20} />
                        Day Book
                    </button>


                    <button className="sidebar-btn">
                        <FileBarChart size={20} />
                        Reports
                    </button>

                    <button className="sidebar-btn">
                        <Settings size={20} />
                        Company
                    </button>

                    <button className="sidebar-btn">
                        <Settings size={20} />
                        Settings
                    </button>

                </nav>

                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300">
                    <LogOut size={20} />
                    Logout
                </button>
            </div>

        </aside>
    );
}

export default Sidebar;
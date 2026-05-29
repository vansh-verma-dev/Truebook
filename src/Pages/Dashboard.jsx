import { useRef, useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { FaRupeeSign, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Totalvalue from "../Data/totalData";

function Dashboard() {
    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const updateButtons = () => {
        const el = scrollRef.current;
        if (!el) return;
        setShowLeft(el.scrollLeft > 0);
        setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    };

    useEffect(() => {
        updateButtons();
    }, []);

    const scroll = (dir) => {
        scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
        setTimeout(updateButtons, 350);
    };

    return (
        <section className=" w-[100vw] sm:w-[80vw]">
            <div className="relative w-full">

                {/* Left Button */}
                {showLeft && (
                    <button
                        onClick={() => scroll(-1)}
                        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#1d2939] border border-white/15 text-white flex items-center justify-center hover:bg-[#2d3f55] transition-all">
                        <FaChevronLeft />
                    </button>
                )}

                {/* Right Button */}
                {showRight && (
                    <button
                        onClick={() => scroll(1)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#1d2939] border border-white/15 text-white flex items-center justify-center hover:bg-[#2d3f55] transition-all">
                        <FaChevronRight />
                    </button>
                )}

                {/* Cards Scroll */}
                <div
                    ref={scrollRef}
                    onScroll={updateButtons}
                    className="w-full overflow-x-auto px-10 py-3
                        [&::-webkit-scrollbar]:hidden
                        [-ms-overflow-style:none]
                        [scrollbar-width:none]">
                    <div className="flex gap-4 min-w-max">
                        {Totalvalue.map((Data, index) => {
                            const Icon = Data.Icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-[#101828] flex items-center gap-4 min-w-[270px] h-[130px] rounded-2xl border border-white/10 shadow-md shadow-black/20 px-4 hover:scale-[1.02] transition-all duration-300">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <Icon className={`text-4xl ${Data.IconColor}`} />
                                    </div>
                                    <div className="text-white">
                                        <p className="text-gray-400 text-sm">{Data.name}</p>
                                        <h1 className="flex items-center text-2xl font-bold mt-1">
                                            <FaRupeeSign className="text-lg" />
                                            {Data.Amount}
                                        </h1>
                                        <p className="flex items-center gap-1 text-sm mt-1">
                                            <GoArrowUpRight className="text-green-500" />
                                            <span className="text-green-500">{Data.lastval}</span>
                                            <span className="text-gray-500">vs last month</span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Dashboard;
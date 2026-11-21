import { useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";

function ConfirmModal({
    open,
    title,
    message,
    yesText = "Yes",
    noText = "No",
    danger = false,
    loading = false,
    icon = <FaQuestionCircle />,
    onYes,
    onNo,
}) {
    useEffect(() => {
        if (!open) return;

        const closeOnEsc = (e) => {
            if (e.key === "Escape" && !loading) onNo();
        };

        window.addEventListener("keydown", closeOnEsc);
        return () => window.removeEventListener("keydown", closeOnEsc);
    }, [open, loading, onNo]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
            onClick={() => !loading && onNo()}
        >
            <div
                className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-xl ${
                        danger ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-600"
                    }`}
                >
                    {icon}
                </div>

                <h2 className="text-center text-lg font-semibold text-gray-800">
                    {title}
                </h2>

                <p className="mt-1 text-center text-sm text-gray-500">{message}</p>

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={onNo}
                        disabled={loading}
                        className="h-10 flex-1 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {noText}
                    </button>

                    <button
                        onClick={onYes}
                        disabled={loading}
                        className={`h-10 flex-1 rounded-xl text-sm font-semibold text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${
                            danger
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Please wait..." : yesText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
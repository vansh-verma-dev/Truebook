export default function RightPanel({ open, setOpen }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl 
        transform transition-transform duration-300 ease-in-out  z-[9998]
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Notifications</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="p-4">
          No notifications
        </div>
      </div>
    </>
  );
}
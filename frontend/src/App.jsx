import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./Pages/home";
import Login from "./UserAccount/Login";
import SignUp from "./UserAccount/signup";

function App() {
  return (
    <>
      {/* Notification Messages */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#166534",
            color: "#fff",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
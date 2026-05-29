import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import SplashScreen from "./Pages/SplashScreen";
import SignupPage from "./UserAccount/signup";
import SigninPage from "./UserAccount/signin";

function App() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);

    }, []);

    if (loading) {
        return <SplashScreen />;
    }

   
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />

        </Routes>
    );
}

export default App;
import { useEffect, useState } from "react"
import Dashboard from "./Pages/Dashboard"
import SplashScreen from "./Pages/SplashScreen"

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <SplashScreen /> : <Dashboard />}
    </>
  )
}

export default App
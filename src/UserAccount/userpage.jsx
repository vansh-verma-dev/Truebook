import { Routes, Route } from "react-router-dom";
import SigninPage from "./signin";
import SignupPage from "./signup";
function Account(){
return(
      <Routes>
            {/* Auth Pages */}
            <Route path="/" element={<SignupPage/>} />
            <Route path="/signin" element={<SigninPage />} />
        </Routes>
)
}
export default Account;
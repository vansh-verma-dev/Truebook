import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/home";
import Login from "./UserAccount/Login";
import SignUp from "./UserAccount/signup";

function App(){
    return(
        <>
        <Routes>
            <Route path="/" element={<HomePage/>}/> 
            <Route path="/login" element={<Login/>}/> 
            <Route path="/signup" element={<SignUp/>}/> 
        </Routes>
        </>
    )
}
export default App;
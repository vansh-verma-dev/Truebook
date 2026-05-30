import { useState } from "react";
import SigninPage from "./signin"
import  SignupPage  from "./signup";

function Account({ setActivePage }) {
     const [mode, setMode] = useState("signup"); 
      return (
            <div>
            { mode === "signin" ? (
                  <SigninPage setMode={setMode} />
            ) : (
                  <SignupPage setMode={setMode} />
            )}
    </div >
      )
}
export default Account;
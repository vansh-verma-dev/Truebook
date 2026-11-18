import { FaArrowRight, FaRegUserCircle, FaUser, FaUserAltSlash } from "react-icons/fa"
import { MdLock, MdMail } from "react-icons/md"
import { Link } from "react-router-dom"

function signup() {
    const Details = [
        { name: "name", iocn: <FaUser />, placeholder: "Full Name" },
        { name: "email", iocn: <MdMail />, placeholder: "Email Address" },
        { name: "password", iocn: <MdLock />, placeholder: "Password" },
    ]
    return (
        <div className="bg-blue-300 w-[80vw] h-[90vh] p-10">


            <div className="bg-white w-[40%] h-full  rounded-2xl border-0 shadow-2xl shadow-gray-500 p-5">
                <h1 className="text-gray-700 font-semibold font-sans text-3xl ">Create Account</h1>
                <p className="text-sm text-gray-500">Fill in the details to get started</p>

                <form action="#">
                    <div className="mt-3">
                        {
                            Details.map((data, i) => {
                                return <div
                                className="flex gap-1 border border-gray-500  shadow-lg p-2 m-2 rounded-md  items-center "
                                >
                                    <span
                                    className="text-xl text-gray-700"
                                    >{data.iocn}</span>
                                    <input
                                    className="w-full  border-0 outline-none"
                                    type={data.name} placeholder={data.placeholder} />
                                </div>
                            })
                        }

                    </div>

                  <div className="flex gap-1 border border-gray-500  shadow-lg p-2 m-2 rounded-md  items-center">
                    <span
                      className="text-xl text-gray-700"
                    ><FaRegUserCircle /></span>
                      <select name="role" id="role"
                      className="w-full  border-0 outline-none"
                      >
                        <option value="student">Student</option>
                        <option value="business">Business </option>
                        <option value="enterprices">Enterprices</option>
                    </select>
                  </div>

                    <button
                     className="flex gap-1 w-full justify-center bg-blend-multiply bg-green-500 text-white   shadow-lg p-2 m-2 rounded-md  items-center "
                    >Create Account <FaArrowRight /></button>

                    <div 
                    className="flex justify-center"
                    >Alreay have an account?<Link 
                    className="text-red-600 font-bold"
                    >Signin</Link></div>
                </form>
            </div>
        </div>
    )
}
export default signup
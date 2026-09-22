function signup(){
    return(
       <section className="  w-[82vw] h-[90vh] p-2">

<div>
    <h1 className="text-[40px] font-medium">Create Account</h1>
    <p className="text-sm text-gray-500">Join us today and start your journey.Join us today and start your journey.</p>

    <form >
        <div className="p-3 ">
         <p>Full Name</p>
            <input type="text" placeholder="Enter You Name..."
            className="p-2 w-[50rem]"
            />
        </div>

         <div>
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="Enter You Email..." />
        </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="text" placeholder="Enter You Password..." />
        </div>

           <div>
            <label htmlFor="password">Confirm Password</label>
            <input type="text" placeholder="Enter You Confirm Password..." />
        </div>
        
           <div>
            <input type="checkbox" />
            <p>I agree to the</p>
            <button>Terms & Conditions</button>
        </div>

        <button>Create Account</button>
    </form>
</div>
       </section>
    )
}
export default signup
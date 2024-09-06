import { useNavigate } from "react-router-dom"
 

export function Landing() {
    const navigate =useNavigate();
    return (
        <div className="p-16">

            <blockquote className="text-xl italic font-semibold text-gray-900 ">
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                </svg>
                <p>"Tale-pod is a digital way to write Stories ,it's a destination to read /listen stories so that children can improve their imagination."</p>
            </blockquote>

            <h1 className="mb-4 text-3xl font-extrabold text-gray-900  md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">TALE-POD</span> _it's your story.</h1>
            <button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={async()=>{navigate(`/signup`)}}>signup</button>
            <button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"onClick={async()=>{navigate(`/signin`)}} >Signin</button>

        </div>
    )
}


import { SignupInput } from "@100xdevs/medium-common";
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios  from "axios";
import {BACKEND_URL} from "../config"


 
export const AuthBox = ({ type }: { type: "signup" | "signin" }) => {

    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        username: "",
        password: "",
        name: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs,{
                headers: {
                    'Content-Type': 'application/json'
                 }
                })
            console.log(response.data);
            console.log(response.data.jwt);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            type==='signin' ? navigate("/blogs"): navigate("/signin");
        } catch(e) {
            alert("Error while signing up")
            // alert the user here that the request failed
        }
    }


    return <div className="flex justify-center  h-screen flex-col  ">
        <div className=" flex justify-center ">
            <div className=" border border-black shadow-xl p-10 rounded-lg">

                <div className="pb-5">
                    <div className="flex justify-center">
                        <div className="font-bold text-3xl"> {type === "signup" ? "Signup" : "Signin"}</div>
                    </div>

                    <div>
                        <div className=" text-sm opacity-50">{type === "signup" ? "Already have an Account?" : "Don't have an account?"}<Link className="underline" to={type === "signup" ? "/Signin" : "/Signup"} > {type === "signup" ? "Signin" : "Signup"}</Link></div>
                    </div>
                </div>

                <div>{
                    type === "signup" ? <Labelinput label="Enter Name" placeholder="john dev" onchange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} /> : null}

                    <Labelinput label="Enter username" placeholder="johndev@gmail.com" onchange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />

                    <Labelinput label="Enter password" type={"password"} placeholder="gr5ttn45#$" onchange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />

                </div>
                 
                <div className="flex justify-center">
                <button type="button" onClick={sendRequest} className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-1 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"? "Signup":"Signin"}</button>
                </div>

            </div>

        </div>
    </div>
}
interface labeltype {
    label: string,
    placeholder: string,
    onchange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?:string;
}

function Labelinput({ label, placeholder, onchange, type }: labeltype) {
    return <>
        <div className="pb-3">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-black">{label}</label>

            <input type={type || "text"} onChange={onchange}  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg }  focus:ring-blue-500 focus:border-blue-500 block w-full p-2  dark:placeholder-slate-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder={placeholder} required />
        </div>
    </>
}
import { Navigate, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import axios from "axios"

interface BlogCardType{
    publishdate:string,
    author:string,
    title:string,
    content:string,
    id?:number
}
export const BlogBox=({
        publishdate,
        author,
        title,
        content,
        id
    }:BlogCardType)=>{
        const navigate=useNavigate();
 
return <>

<div       onClick={async () => {
            navigate(`/blog/${id}`)
        }
    } 

className="p-3 flex flex-col gap-2 border rounded-lg">

        <div className="flex items-center gap-3  font-semibold text-gray-500 font-mono ">
            <Avatar author={author}></Avatar>            
            <div className="text-lg">{author}</div>
            <svg className="h-5 w-5 text-lime-500 "  width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="5" cy="12" r="1" />  <circle cx="12" cy="12" r="1" />  <circle cx="19" cy="12" r="1" /></svg>
            <div className="text-opacity-30 font-sans">{publishdate}</div>

        </div>

        <div className=" ">
                <div className=" text-xl font-bold font-serif">{title}</div> 
                <div className=" text-slate-600">{content.slice(0,100)+"..."}</div>
        </div>

        <div className="flex items-center text-sm  pt-5">
        
            <svg className="h-4 w-4 text-lime-500"  fill="none"  viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>

            <div>{Math.floor(content.length/50)===0? "1":Math.floor(content.length/50)} minute</div>
        </div>

        
        <hr/>
</div>

</>
}
    

const Avatar=({author}:{author:string})=>{

    return<>
     < div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600" >
                <span className="font-medium text-gray-600 dark:text-gray-300">{author.slice(0,2).toUpperCase()}</span>
            </div>
    </>
}
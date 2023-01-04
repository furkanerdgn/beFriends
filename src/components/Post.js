import { useSelector } from "react-redux"
import { useRef, useState } from "react";
import auth from "../store/auth";

export default function Post() {
    const posts=useSelector(state => state.auth.posts)
    return (
<> 
    {
        posts.map((post) => {
            return(  
                <img src={post.src}/>
                )
            })
    }
    </>
    )      
}
import {Link } from "react-router-dom"
import HomeSvg from "../svgs/HomeSvg"
import MessageSvg from "../svgs/MessageSvg"
import UploadSvg from "../svgs/UploadSvg"
import CompassSvg from "../svgs/CompassSvg"
import HeartSvg from "../svgs/HeartSvg"
import UserSvg from "../svgs/UserSvg"
import { useSelector } from "react-redux"

export default function Header() {
    const user = useSelector(state => state.auth);
    return (
        <header className="h-[60px] bg-white border-b broder-gray-300 flex items-center justify-center sticky">
                <ul className="flex items-center gap-3 w-[930px]">
                    <li className="">
                    <Link to={"/"}>
                        <img className="h-[30px]" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram" />
                    </Link>
                    </li>
                    <li className="m-auto">
                        <form className="">
                            <input className="w-[225px] h-[35px] border bg-gray-200 p-2 border-gray-300 rounded-md" type="text" placeholder="Search"/>
                            <button className="hidden" type="submit">Search</button>             
                        </form>

                    </li>  
                    <ul className="flex row gap-3 items-center">
                    <li className="w-[20px] h-[20px] cursor-pointer">   
                        <HomeSvg/>
                    </li>
                    <li className="w-[20px] h-[20px] cursor-pointer">   
                        <MessageSvg/>
                    </li>
                    <li className="w-[20px] h-[20px] cursor-pointer">   
                        <UploadSvg/>
                    </li>                
                    <li className="w-[20px] h-[20px] cursor-pointer">   
                        <CompassSvg/>
                    </li> 
                    <li className="w-[20px] h-[20px] cursor-pointer">   
                        <HeartSvg/>
                    </li>
                    <li className="w-[25px] h-[25px] cursor-pointer">        
                          <img src={user.profilePicture[0].src || UserSvg} className="rounded-full border-1" />                                     
                    </li>
                    </ul>      
                </ul>

            
        </header>
    )
}

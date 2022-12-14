import {useRef,useEffect, useState} from "react";
import Input from "../components/Input";
import {AiFillFacebook} from "react-icons/ai"
import { useDispatch } from "react-redux";
import { setUser } from "../store/auth";
import {useNavigate,useLocation} from "react-router-dom"
import {login} from "../firebase.js"

export default function Login(){ 

         const navigate = useNavigate()
         const location = useLocation()
         const ref = useRef()
         const [username,setUserName] = useState("")
         const [password,setUserPassword] = useState("")
         const enabled = username && password;
         
         useEffect(()=>{
           let images = ref.current.querySelectorAll("img"),
           total = images.length,
          current= 0
          const imageSlider =()=>{
              images[(current >0 ? current:total)-1].classList.add("opacity-0")
              images[current].classList.remove("opacity-0")
              current = current === total-1 ? 0 : current+1;
          }
          imageSlider()
        let interval = setInterval(imageSlider,3000)
        return () =>{
          clearInterval(interval)
        }
        },[ref])

        const handleSubmit = async e =>{
          e.preventDefault();
          await login(username,password)
          navigate(location.state?.return_url || "/",{replace:true})
         }
        return(
          <section className="h-full w-full mt-10">
          <main className="h-full w-full">
          <article className="h-full w-full flex overflow-auto items-center gap-x-8 justify-center">
          
          <div className="w-[380px] h-[581px] relative bg-logo-pattern bg-[length:468.32px_634.15px] bg-[top_left_-46px]" >
            <div className="w-[250px] h-[538px] absolute top-[27px] right-[18px]" ref={ref}>
            <img className="w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ease-linear" src="https://www.instagram.com/static/images/homepage/screenshots/screenshot1-2x.png/cfd999368de3.png"/>
            <img className="w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ease-linear" src="https://www.instagram.com/static/images/homepage/screenshots/screenshot2-2x.png/80b8aebdea57.png"/>
            <img className="w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ease-linear" src="https://www.instagram.com/static/images/homepage/screenshots/screenshot3-2x.png/fe2540684ab2.png"/>
            <img className="w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ease-linear" src="https://www.instagram.com/static/images/homepage/screenshots/screenshot4-2x.png/8e9224a71939.png"/>
            </div>
          </div>
      
          <div>
          <div className="flex flex-col items-center gap-y-4">
          <div className="w-[350px] bg-white border p-[40px] pb-2">
            <a href="#" className="flex mb-8 justify-center">
              <img className="h-[51px]" src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"></img>
              </a>
            <form onSubmit={handleSubmit} className="grid gap-y-1.5">
              <Input type="text" value={username} onChange={ e =>setUserName(e.target.value)} label="Phone number, username or email">
              </Input>
              <Input type="password" value={password} onChange={ e =>setUserPassword(e.target.value)} label="Password">
              </Input>
           
      
            <button type="submit" disabled={!enabled} className="h-[30px] bg-brand text-white text-sm rounded disabled:opacity-50">Log In</button>
            <div className="flex items-center">
              <div className="h-px bg-gray-300 flex-1"/>
              <span className="px-4 my-2.5 mb-3.5 text-[13px] text-gray-500 font-semibold ">OR</span>
              <div className="h-px bg-gray-300 flex-1"/>
            </div>
            <a href="#" className="flex justify-center items-center gap-x-2 text-sm font-semibold text-facebook">
          <AiFillFacebook size={20}/>
          Log in with Facebook
            </a>
            <a href="#" className="text-xs m-2 text-center text-[#00376b] font-semibold">Forgot password?</a>
            </form>
          </div>
          <div className="w-[350px] bg-white border p-[40px] ">
            <p className="text-sm text-center  ">Don't have an account? <a href="#" className="text-brand font-semibold">Sign up</a></p> 
          </div>
          <p className="m-2">Get App</p>
            <div className="w-[350px] h-[100px] flex gap-2 items-stretch">
              <a className="w-[185px]">
                <img src="https://static.cdninstagram.com/rsrc.php/v3/yp/r/XUCupIzGmzB.png"></img>
                </a>     
             <a className="w-[165px]">
                <img src="https://static.cdninstagram.com/rsrc.php/v3/yf/r/BFthdeAc5KC.png"></img>
             </a>
            </div>
          </div>
          </div>
          </article>
          </main>
          <footer className="h-[60px] w-full text-sm text-gray-500">
          <ul className="w-full h-[60px] flex gap-5 flex-wrap items-center justify-center">
              <li><a href="#">Meta</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Help</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Top Accounts</a></li>
              <li><a href="#">Hashtags</a></li>
              <li><a href="#">Locations</a></li>
            </ul>
          </footer>
          </section>
        );
}
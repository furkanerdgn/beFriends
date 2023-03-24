import { useRef, useEffect, useState } from "react";
import Input from "../components/Input";
import { AiFillFacebook } from "react-icons/ai";
import {  useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../firebase.js";
import Footer from "../components/Footer";
import beFriends from "../assets/logo.png";
import slideFirst from "../assets/profileUser.PNG";
import slideSec from "../assets/post.PNG";
import slideTrip from "../assets/messagePage.PNG";
import slideFour from "../assets/newPostModal.PNG";
import slideFive from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();
  const [username, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  const enabled = username && password;
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    let images = ref.current.querySelectorAll("img"),
      total = images.length,
      current = 0;
    const imageSlider = () => {
      images[(current > 0 ? current : total) - 1].classList.add("opacity-0");
      images[current].classList.remove("opacity-0");
      current = current === total - 1 ? 0 : current + 1;
    };
    imageSlider();
    let interval = setInterval(imageSlider, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [ref]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    navigate("/", { replace: true });
  };
  return (
    <section className="h-full w-full mt-10">
      <main className="h-full w-full">
        <article className="h-full w-full flex overflow-auto items-center gap-x-8 justify-center">
          <div className="w-[380px] h-[581px] relative bg-logo-pattern bg-[length:468.32px_634.15px] bg-[top_left_-46px]">
            <div
              className="w-[250px] h-[538px] absolute top-[27px] right-[18px]"
              ref={ref}
            >
              <img
                className="w-full h-full object-scale-down absolute top-0 left-0 transition-opacity duration-1000 ease-linear"
                src={slideFirst}
              />
              <img
                className="w-full h-full absolute object-scale-down top-0 left-0 transition-opacity duration-1000 ease-linear"
                src={slideSec}
              />
              <img
                className="w-full h-full absolute object-scale-down top-0 left-0 transition-opacity duration-1000 ease-linear"
                src={slideTrip}
              />
              <img
                className="w-full h-full absolute object-scale-down top-0 left-0 transition-opacity duration-1000 ease-linear"
                src={slideFour}
              />
              <img
                className="w-full h-full absolute object-scale-down top-0 left-0 transition-opacity duration-1000 ease-linear"
                src={slideFive}
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col items-center gap-y-4">
              <div className="w-[350px] bg-white border p-[40px] pb-2">
                <a href="#" className="flex mb-1  justify-center">
                  <img className="h-[142px]" src={beFriends}></img>
                </a>
                <form onSubmit={handleSubmit} className="grid gap-y-1.5">
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    label="Phone number, username or email"
                  ></Input>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setUserPassword(e.target.value)}
                    label="Password"
                  ></Input>

                  <button
                    type="submit"
                    disabled={!enabled}
                    className="h-[30px] bg-brand text-white text-sm rounded disabled:opacity-50"
                  >
                    Log In
                  </button>
                  <div className="flex items-center">
                    <div className="h-px bg-gray-300 flex-1" />
                    <span className="px-4 my-2.5 mb-3.5 text-[13px] text-gray-500 font-semibold ">
                      OR
                    </span>
                    <div className="h-px bg-gray-300 flex-1" />
                  </div>
                  <a
                    href="#"
                    className="flex justify-center items-center gap-x-2 text-sm font-semibold text-facebook"
                  >
                    <AiFillFacebook size={20} />
                    Log in with Facebook
                  </a>
                  <a
                    href="#"
                    className="text-xs m-2 text-center text-[#00376b] font-semibold"
                  >
                    Forgot password?
                  </a>
                </form>
              </div>
              <div className="w-[350px] bg-white border p-[40px] ">
                <p className="text-sm text-center  ">
                  Don't have an account?{" "}
                  <Link
                    to={"/auth/signup"}
                    className="text-brand font-semibold"
                  >
                    Sign up
                  </Link>
                </p>
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
      <footer className="h-[60px] w-full text-sm items-center justify-center flex text-gray-500">
        <Footer />
      </footer>
    </section>
  );
}

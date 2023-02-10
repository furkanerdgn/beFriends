import { useRef, useEffect, useState } from "react";
import Input from "../components/Input";
import { AiFillFacebook } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signUp } from "../firebase.js";
import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import beFriends from "../assets/logo.png";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  const [email, setUserEmail] = useState("");

  const enabled = username && password;
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) {
      navigate(location.state?.return_url || "/", { replace: true });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(email, username, password);
  };

  return (
    <section className="h-full w-full mt-10">
      <main className="h-full w-full">
        <article className="h-full w-full flex overflow-auto items-center gap-x-8 justify-center">
          <div className="flex flex-col items-center gap-y-4">
            <div className="w-[350px] bg-white border p-[40px] pb-2">
              <a href="#" className="flex  justify-center">
                <img className="h-[130px]" src={beFriends}></img>
              </a>
              <form onSubmit={handleSubmit} className="grid gap-y-1.5">
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  label="Full Name"
                ></Input>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setUserEmail(e.target.value)}
                  label="Phone number, username or email"
                ></Input>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setUserPassword(e.target.value)}
                  label="Password"
                ></Input>

                <label htmlFor="check" className="text-sm m-2 float-left">
                  <input id="check" required className="mr-2" type="checkbox" />
                  Do you accept the terms of membership?
                </label>

                <button
                  type="submit"
                  disabled={!enabled}
                  className="h-[30px] mb-4 bg-brand text-white text-sm rounded disabled:opacity-50"
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div className="w-[350px] bg-white border p-[40px] ">
              <p className="text-sm text-center  ">
                You Have Already account{" "}
                <Link to={"/auth/login"} className="text-brand font-semibold">
                  Sign In{" "}
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
        </article>
      </main>
      <footer className="h-[60px] w-full text-sm items-center justify-center flex text-gray-500">
        <Footer />
      </footer>
    </section>
  );
}

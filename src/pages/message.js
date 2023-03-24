import { useSelector } from "react-redux";
import Header from "../components/Header";
import MessageSvg from "../svgs/MessageSvg.svg";
import { Link } from "react-router-dom";
import Aside from "../components/Aside";

export default function Message() {
  const user = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <div className="w-full h-[90%] flex justify-center overflow-auto items-start mt-6">
        <div className=" bg-white flex w-[900px] border-[1.2px] border-gray-300 h-[85%] ">
          <Aside />
          <div className="w-[600px] h-[85%] flex flex-col items-center justify-center">
            <img src={MessageSvg} alt="profile" className="w-20 h-20" />
            <h1 className=" text-xl mt-2">Your Messages</h1>
            <h1 className="font-thin mt-2">
              Send private photos and messages to a friend or group
            </h1>
            <Link to="/message/direct">
              <button className="bg-brand text-white px-3 py-1.5 rounded shadow-md mt-4">
                Send Message
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

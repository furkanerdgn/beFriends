import phone from "../svgs/PhoneSvg.svg";
import video from "../svgs/VideoSvg.svg";
import information from "../svgs/InfoSvg.svg";
import userSvg from "../svgs/UserSvg.svg";
import Talk from "./Talk";
import ChatInput from "./ChatInput";

export default function Chats() {
  return (
    <>
      <div className="flex justify-between border-b-[1.2px]">
        <div className="flex items-center justify-center p-3">
          <img
            src={userSvg}
            alt="user"
            className="w-10 h-10 p-2 rounded-full"
          />
          <p>Mustafa</p>
        </div>
        <div className="flex p-4">
          <img src={phone} alt="phone" className="w-8 h-8 p-2 " />
          <img src={video} alt="phone" className="w-8 h-8 p-2 " />
          <img src={information} alt="phone" className="w-8 h-8 p-2 " />
        </div>
      </div>
      <Talk />
      <ChatInput />
    </>
  );
}

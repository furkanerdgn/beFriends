import ArrowDown from "../svgs/ArrowDownSvg.svg";
import Chat from "../svgs/ChatSvg.svg";
import UserSvg from "../svgs/UserSvg.svg";
import { useSelector } from "react-redux";
import ChatModal from "./chatModal";
import { setChatModalUpdate } from "../utils";
import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Aside() {
  const user = useSelector((state) => state.auth);
  const selectedUser = useSelector((state) => state.auth.selectedUser);
  const chatModal = useSelector((state) => state.auth.chatModal);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.user.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user.user.uid && getChats();
  }, [user.user.uid]);

  return (
    <>
      {chatModal ? <ChatModal /> : null}
      <div className="w-[300px] hidden h-full border-r border-gray-300 lg:block">
        <header>
          <div className="flex items-center justify-between p-2 border-b border-gray-300">
            <div className="flex items-center justify-between w-full p-3">
              <div className="mx-auto flex items-center">
                <h1 className="font-medium">{user.user.displayName}</h1>
                <img src={ArrowDown} alt="arrow" className="w-4 h-4 ml-2" />
              </div>
              <img
                onClick={() => setChatModalUpdate(true)}
                src={Chat}
                alt="chat"
                className="w-4 h-4"
              />
            </div>
          </div>
        </header>

        <section className="overflow-y-auto flex flex-col">
          <div className="flex items-center justify-between p-2 border-b border-gray-300">
            <div className="flex items-center justify-between w-full p-3">
              <div className="flex  items-center">
                <img
                  src={user.user.photoURL || UserSvg}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <h1 className="font-medium ml-2">User Name</h1>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400">12:00</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-2 border-b border-gray-300">
            <div className="flex items-center justify-between w-full p-3">
              <div className="flex items-center">
                <img
                  src={user.user.photoURL || UserSvg}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <h1 className="font-medium ml-2">User Name</h1>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400">12:00</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

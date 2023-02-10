import userSvg from "../svgs/UserSvg.svg";
import { useState } from "react";
import { searchQuery } from "../firebase";
import sendSvg from "../svgs/sendSvg.svg";
import { setChatModalUpdate } from "../utils";
import { setSelectedUserUpdate } from "../utils";
import { useSelector } from "react-redux";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  update,
} from "firebase/firestore";
import { db } from "../firebase";

export default function ChatModal() {
  const [searchResult, setSearchResult] = useState();
  const [dataArr, setDataArr] = useState([]);

  const user = useSelector((state) => state.auth);
  const selectedUser = useSelector((state) => state.auth.selectedUser);

  const handleKeyDown = (e) => {
    e.key === "Enter" &&
      searchQuery(searchResult).then((res) => {
        setDataArr(res);
      });
  };

  const modalOperation = (item) => {
    setSelectedUserUpdate(item);
    setChatModalUpdate(false);
    setTimeout(() => {}, 1000);
    handleSelect();
  };

  const handleSelect = async () => {
    const combinedId =
      user.user.uid > selectedUser.userId
        ? user.user.uid + selectedUser.userId
        : selectedUser.userId + user.user.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        db.collection("userChats")
          .doc(user.user.uid)
          .update({
            [combinedId + ".userInfo"]: {
              uid: selectedUser.userId,
              displayName: selectedUser.username,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

        db.collection("userChats")
          .doc(selectedUser.userId)
          .update({
            [combinedId + ".userInfo"]: {
              uid: user.user.uid,
              displayName: user.user.displayName,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
      }
    } catch (err) {}
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white w-11/12 md:w-1/2 h-5/6 rounded-xl shadow-xl">
          <div className="flex items-center justify-between p-2 border-b border-gray-300">
            <div
              onClick={() => setChatModalUpdate(false)}
              className="flex items-center text-lg justify-between w-full p-3"
            >
              Back
            </div>
          </div>
          <div className="flex flex-col flex-wrap wrap-col  w-full overflow-y-auto h-[calc(100%-22px)]">
            <div className="flex items-center border-b border-gray-30 ">
              <img
                src={userSvg}
                alt="user"
                className="w-10 h-10 ml-4  p-2 0 rounded-full hidden md:inline"
              />
              <input
                type="text"
                placeholder="Search"
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchResult(e.target.value)}
                className="w-full p-4 px-6 outline-none font-normal text-brand text-lg"
              />
            </div>

            <div className="flex flex-col my-3 mx-2 p-2">
              <div className="flex flex-col my-4">
                {dataArr.length > 0 &&
                  dataArr.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => modalOperation(item)}
                        className="flex items-center cursor-pointer justify-between gap-2"
                      >
                        <img
                          src={userSvg}
                          alt="user"
                          className="w-10 h-10 ml-4  p-2 0 rounded-full hidden md:inline"
                        />
                        <p className="bg-gray-100 w-full text-brand text-lg rounded-xl p-2 ">
                          {item.username}
                        </p>
                        <img
                          src={sendSvg}
                          alt="send"
                          className="w-10 h-10 ml-4  p-2 0 rounded-full hidden md:inline"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

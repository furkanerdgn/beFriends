import { Link } from "react-router-dom";
import HomeSvg from "../svgs/HomeSvg.svg";
import MessageSvgDark from "../svgs/MessageSvgDark.svg";
import UploadSvg from "../svgs/UploadSvg.svg";
import CompassSvg from "../svgs/CompassSvg.svg";
import HeartSvg from "../svgs/HeartSvg.svg";
import UserSvg from "../svgs/UserSvg.svg";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import SignOut from "../svgs/SignOutSvg.svg";
import { signOut } from "firebase/auth";
import { logout, searchQuery, updateMe } from "../firebase";
import { setModalUpload, setSelectedUser } from "../store/auth";
import { setUploadModal } from "../utils";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ModalUpload from "./ModalUpload";
import sendSvg from "../svgs/sendSvg.svg";
import { setSelectedUserUpdate } from "../utils";
import headerLogo from "../assets/header.png";

export default function Header() {
  const user = useSelector((state) => state.auth);

  const [searchArea, setSearchArea] = useState(false);
  const [searchResult, setSearchResult] = useState();
  const [dataArr, setDataArr] = useState([]);
  const [notification, setNotification] = useState(false);

  const forModal = useSelector((state) => state.auth.modalUpload);

  const ref = useRef(null);

  const handleOperation = () => {
    ref.current.classList.toggle("hidden");
  };
  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleModalVisibility = () => {
    setUploadModal(!forModal);
  };

  const handleKeyDown = (e) => {
    e.key === "Enter" &&
      searchQuery(searchResult).then((res) => {
        setDataArr(res);
      });
  };

  useEffect(() => {
    if (searchResult) {
      setSearchArea(true);
    } else {
      setSearchArea(false);
    }
  }, [searchResult]);

  return (
    <header className="h-[60px] bg-white border-b broder-gray-300 flex items-center justify-center sticky">
      <ul className="flex items-center gap-3 w-[930px]">
        <li className="">
          <NavLink to="/">
            <img
              className="h-[50px] p-2 cursor-pointer"
              src={headerLogo}
              alt="beFriends"
            />
          </NavLink>
        </li>
        <li className="m-auto">
          <div className="">
            <input
              className="w-[225px] h-[35px] border bg-gray-50 p-2 border-gray-300 rounded-md"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchResult(e.target.value)}
              onClick={() => setSearchArea(true)}
              onKeyDown={handleKeyDown}
            />
            {searchArea && (
              <div className="absolute bg-white shadow-xl hover:bg-slate-300 w-56 rounded p-1.5 mt-0.5 cursor-pointer  ">
                {dataArr.length !== 0 ? (
                  dataArr.map((item) => {
                    return (
                      item.username && (
                        <Link to={`/profile/:${item.username}`}>
                          <div
                            onClick={() => setSelectedUserUpdate(item)}
                            className="flex items-center justify-between gap-2"
                          >
                            {item.username}
                            <img src={sendSvg} className="w-[20px] h-[20px]" />
                          </div>
                        </Link>
                      )
                    );
                  })
                ) : (
                  <div className="flex items-center gap-2">
                    <p>No result found</p>
                  </div>
                )}
              </div>
            )}
            <button className="hidden" type="submit">
              Search
            </button>
          </div>
        </li>
        <ul className="flex row gap-5 items-center">
          <li className="w-[20px] h-[20px] cursor-pointer">
            <NavLink to="/">
              <img src={HomeSvg} />
            </NavLink>
          </li>

          <li className="w-[20px] h-[20px] cursor-pointer relative ">
            <NavLink to="/message">
              {user.message.length ? (
                <div className="bg-red-600 animate-ping absolute right-[-2px] top-[-1px] w-[10px] h-[10px] rounded"></div>
              ) : null}
              <img src={MessageSvgDark} />
            </NavLink>
          </li>
          <li className="w-[20px] h-[20px] cursor-pointer">
            <img onClick={handleModalVisibility} src={UploadSvg} />
          </li>
          {forModal && <ModalUpload />}
          <li className="w-[20px] h-[20px] cursor-pointer">
            <NavLink to="/feed">
              <img src={CompassSvg} />
            </NavLink>
          </li>

          <li
            onClick={() => setNotification(!notification)}
            className="w-[20px] h-[20px] relative cursor-pointer"
          >
            <img src={HeartSvg} />
            {notification && (
              <div className="absolute overflow-y-auto shadow-lg bg-white w-[500px] right-1 h-[362px]  rounded p-1.5 mt-0.5 cursor-pointer  ">
                <div className="flex flex-col gap-2 border-b-2 ">
                  <p className="font-medium text-xs block">This Week</p>
                  <div className="flex items-center hover:bg-slate-300 justify-between p-3 gap-2">
                    <div className="flex">
                      <img
                        src={UserSvg}
                        className="w-[30px] h-[30px] rounded-full"
                      />
                      <p className="font-medium text-sm mx-2">username</p>
                      <p className="text-sm">liked your post</p>
                      <p className="text-sm mx-2 text-gray-400">1h</p>
                    </div>
                    <img
                      src="https://pbs.twimg.com/media/FjJ1aBGXoAAyUR6?format=jpg&name=large"
                      className="w-[40px] h-[40px] object-cover"
                    />
                  </div>
                  <div className="flex items-center hover:bg-slate-300 justify-between p-4 gap-2">
                    <div className="flex ">
                      <img
                        src={UserSvg}
                        className="w-[30px] h-[30px] rounded-full "
                      />
                      <p className="font-medium text-sm mx-2">username</p>
                      <p className="text-sm">liked your post</p>
                      <p className="text-sm mx-2 text-gray-400">1h</p>
                    </div>
                    <button className="text-sm bg-brand rounded text-white w-24 p-1">
                      Follow
                    </button>
                  </div>
                </div>
                <div className="flex flex-col hover:bg-slate-300 gap-2 border-b-2 ">
                  <p className="font-medium text-xs block">This Month</p>
                  <div className="flex items-center justify-between p-4 gap-2">
                    <div className="flex">
                      <img
                        src={UserSvg}
                        className="w-[30px] h-[30px] rounded-full"
                      />
                      <p className="font-medium text-sm mx-2">username</p>
                      <p className="text-sm">liked your post</p>
                      <p className="text-sm mx-2 text-gray-400">1 month</p>
                    </div>
                    <img
                      src="https://pbs.twimg.com/media/FjJ1aBGXoAAyUR6?format=jpg&name=large"
                      className="w-[40px] h-[40px]  object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col hover:bg-slate-300 gap-2 border-b-2 ">
                  <p className="font-medium text-xs block">This Year</p>
                  <div className="flex items-center justify-between p-4 gap-2">
                    <div className="flex">
                      <img
                        src={UserSvg}
                        className="w-[30px] h-[30px] rounded-full"
                      />
                      <p className="font-medium text-sm mx-2">username</p>
                      <p className="text-sm">liked your comment: Nice pic!</p>
                      <p className="text-sm mx-2 text-gray-400">1 year</p>
                    </div>
                    <img
                      src="https://pbs.twimg.com/media/FjJ1aBGXoAAyUR6?format=jpg&name=large"
                      className="w-[40px] h-[40px]  object-cover"
                    />
                  </div>
                </div>
              </div>
            )}
          </li>
          <li className="w-[20px] h-[20px] cursor-pointer">
            <img
              src={user.user.photoURL || UserSvg}
              onClick={handleOperation}
              className="rounded-full border-1"
            />
            <ul
              ref={ref}
              className="flex flex-col mt-2 items-center justify-start  ease-in-out duration-700 transition-all hidden relative w-52  top-1 left-[-125px] rounded bg-white shadow-xl border-gray-300 border-[0.3px]"
            >
              <li className="w-full p-1.5  hover:bg-slate-200 ">
                <Link to={`/profile/me`}>
                  <p className="font-medium w-full flex justify-start  items-center">
                    <img
                      className="w-[20px] h-[20px] mx-2 cursor-pointer font-light rounded-xl"
                      src={user.user.photoURL || UserSvg}
                    />{" "}
                    {user.user.displayName}
                  </p>
                </Link>
              </li>
              <div className="bg-gray-300 p-[0.3px] w-full shadow-md"></div>
              <li className="w-full p-1.5 hover:bg-slate-200">
                <p
                  onClick={handleLogout}
                  className="  font-medium w-full flex justify-start items-center "
                >
                  <img
                    className="w-[20px] h-[20px] mx-2 cursor-pointer"
                    src={SignOut}
                  />
                  Logout
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </ul>
    </header>
  );
}

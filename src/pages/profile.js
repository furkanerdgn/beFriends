import { useSelector } from "react-redux";
import Header from "../components/Header";
import { downloadImage } from "../firebase";
import UserSvg from "../svgs/UserSvg.svg";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

import { addFollower, removeFollower } from "../firebase";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const selectedUserInfo = useSelector((state) => state.auth.selectedUser);
  const user = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({});

  const [isFollower, setIsFollower] = useState(false);

  const handleClick = () => {
    //read
    downloadImage();
  };
  const getData = async () => {
    const docRef = doc(db, "users", selectedUserInfo.userId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const followBack = () => {
    user.follower.find((item) => item === selectedUserInfo.username)
      ? setIsFollower(true)
      : setIsFollower(false);
  };

  return (
    <>
      <Header />
      <div className="w-[1000px] m-auto ">
        <header className="w-full m-auto flex p-12">
          <div className="mx-16 w-[20%] ">
            <img
              className="w-[150px] rounded-full "
              src={selectedUserInfo.photoURL || UserSvg}
            />
          </div>
          <div className="mt-0">
            <div className="flex">
              <h1 className=" text-2xl font-thin ">
                {selectedUserInfo.username}
              </h1>
              {!isFollower ? (
                <button
                  className="rounded mx-auto font-medium border-2 px-4 py-1 text-white text-sm bg-brand border-gray-300"
                  onClick={() => {
                    addFollower(user.username);
                    setIsFollower(true);
                  }}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="rounded mx-auto font-medium border-2 px-4 py-1  text-sm  border-gray-300"
                  onClick={() => {
                    removeFollower(user.username);
                    setIsFollower(false);
                  }}
                >
                  Unfollow
                </button>
              )}
            </div>
            {userData?.userId && (
              <div className="flex gap-10 mt-5">
                <p>
                  <span className="font-bold">{userData.posts.length}</span>{" "}
                  post
                </p>
                <p>
                  <span className="font-bold">{userData.follower.length}</span>{" "}
                  follower
                </p>
                <p>
                  <span className="font-bold">{userData.following.length}</span>{" "}
                  following
                </p>
              </div>
            )}
            <div className="mt-5">
              <p className="font-medium "></p>
              <p>:(</p>
            </div>
          </div>
        </header>
        <div className="w-full">
          <div className="flex flex-col justify-center ml-20 mb-10">
            <div className="w-28 cursor-pointer">
              <img
                src="https://pbs.twimg.com/profile_images/1471822089934016514/22ul5BVf_400x400.jpg"
                className="w-20 h-20 bg-gray-300 p-0.5 rounded-full border-2"
              />
              <p className="text-center p-1 font-medium ml-[-2rem]">Me!</p>
            </div>
          </div>
        </div>
        <div className="w-full  border-gray-300 border-b-2 shadow-md"></div>
        <div className="flex justify-center m-0.5">
          <button className="p-1 w-44 font-thin focus:font-medium">
            Posts
          </button>
          <button className="p-1 w-44 font-thin focus:font-medium">
            Saved
          </button>
          <button className="p-1 w-44 font-thin focus:font-medium">
            Tagged
          </button>
        </div>
        <div className="flex flex-wrap gap-5 p-5">
          {userData?.userId && userData.posts.length > 0 ? (
            userData.posts.map((post, inx) => (
              <img
                src={post}
                key={inx}
                className="w-[300px] h-[300px] object-cover"
              />
            ))
          ) : (
            <>
              <div className="w-[300px] animate-pulse h-[300px] bg-gray-300"></div>
              <div className="w-[300px] animate-pulse h-[300px] bg-gray-300"></div>
              <div className="w-[300px] animate-pulse  h-[300px] bg-gray-300"></div>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center my-5">
        <Footer />
      </div>
    </>
  );
}

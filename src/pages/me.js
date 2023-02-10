import { useSelector } from "react-redux";
import Header from "../components/Header";
import { downloadImage, profileUpdate } from "../firebase";
import UserSvg from "../svgs/UserSvg.svg";
import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import { profilePhotoUpdate } from "../firebase";
import { Outlet } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Me() {
  const [forModal, setForModal] = useState(false);
  const [type, setType] = useState("name");
  const ref = useRef();
  const user = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState({});

  const handleClick = () => {
    //read
    downloadImage();
  };

  const getData = async () => {
    const docRef = doc(db, "users", user.uid);
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

  const modalVisibilty = () => {
    setType("name");
    setForModal(!forModal);
  };
  const handleOp = () => {
    setForModal(!forModal);
    setType("photo");
  };

  const ChangeNameModal = (type) => {
    const [input, setInput] = useState("");
    const changeName = () => {
      profileUpdate(input);
      setForModal(!forModal);
    };
    const changePhoto = () => {
      profilePhotoUpdate(input);
      setForModal(!forModal);
    };

    return (
      <div
        ref={ref}
        className=" fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
      >
        <Outlet />
        <div className="bg-gray-100 w-[400px] h-[300px] rounded-lg">
          <div
            onClick={() => setForModal(!forModal)}
            className="block p-2 border-gray-300 border-b-2 mx-1 font-medium"
          >
            <p className="inline cursor-pointer">Back</p>
          </div>
          <div className="flex flex-col justify-center items-center h-full">
            <div className="my-auto flex-col flex">
              <input
                type="text"
                className="bg-white shadow-sm mb-4 rounded-md p-2"
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="bg-brand text-white p-2 rounded shadow-md"
                onClick={type.type === "name" ? changeName : changePhoto}
              >
                {type.type === "name" ? "Change Name" : "Change Photo"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      {forModal && <ChangeNameModal type={type} />}
      <div className="w-[1000px] m-auto ">
        <header className="w-full m-auto flex p-12">
          <div onClick={handleOp} className="mx-16 w-[20%] ">
            <img
              className="w-[150px] rounded-full "
              src={user.photoURL || UserSvg}
            />
          </div>
          <div className="mt-0">
            <div className="flex">
              <h1 className=" text-2xl font-thin  ">{userData.username}</h1>
              <button
                className="rounded mx-auto font-medium border-2 p-0.5 text-sm border-gray-300"
                onClick={modalVisibilty}
              >
                Edit profile name
              </button>
            </div>
            {userData?.userId && (
              <div className="flex gap-10 mt-5 ">
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
              <p className="font-medium ">Furkan Erdoğan</p>
              <p>:(</p>
            </div>
          </div>
        </header>
        <div className="w-full">
          <div className="flex flex-col justify-center ml-20 mb-10">
            <div className="w-28 cursor-pointer">
              <img
                src="https://ocakmedya.com/wp-content/uploads/2022/10/0x0-dunyadan-muhtesem-doga-manzaralari-1512736354182.jpg"
                className="w-20 h-20 bg-gray-300 p-0.5 rounded-full border-2"
              />
              <p className="text-center p-1 font-medium ml-[-2rem]">Nature</p>
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
            <div className="flex flex-row bg-white gap-5 justify-center items-center">
              <div className="w-[300px] animate-pulse h-[300px] bg-gray-300"></div>
              <div className="w-[300px] animate-pulse h-[300px] bg-gray-300"></div>
              <div className="w-[300px] animate-pulse  h-[300px] bg-gray-300"></div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center my-5">
        <Footer />
      </div>
    </>
  );
}

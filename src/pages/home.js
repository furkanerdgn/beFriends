import Header from "../components/Header.js";
import { useSelector } from "react-redux";
import Footer from "../components/Footer.js";
import Post from "../components/Post.js";
import Stories from "../components/Stories.js";
import UserSvg from "../svgs/UserSvg.svg";
import LoaderSpinner from "../components/LoaderSpinner.js";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const user = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (loading) {
      const firstTimeout = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => {
        clearTimeout(firstTimeout);
      };
    }
    if (!loading) {
      const secondTimeout = setTimeout(() => {
        setShowButton(true);
      }, 150000);
      return () => {
        clearTimeout(secondTimeout);
      };
    }
  }, [loading]);

  //getData(){// this function get data from firebase}

  function handleClick() {
    setLoading(true);
    setShowButton(false);
  }

  return (
    <div className="">
      <div className="w-full h-1 hidden ease-in-out duration-300 z-10 m-0 p-0 block bg-gradient-to-tr from-yellow-400 to-purple-600"></div>
      <div className="sticky z-20 top-0 bg-gray-300 border-bottom-2">
        <Header />
      </div>
      <section className="mt-3 gap-12 flex justify-center ease-in-out">
        {/* this part include stories and post */}
        <div className=" ease-in-out duration-300">
          {/* this part include stories and post */}
          {loading ? (
            <div className="m-auto z-10 my-10 transition-[spacing] duration-700 animate-bounce rounded-3xl ease-in-out   ">
              <LoaderSpinner />
            </div>
          ) : (
            showButton && (
              <button
                id="newPost"
                className="justify-center m-auto sticky top-16 w-32 bg-white text-sm shadow-xl p-1.5 rounded-3xl flex flex-row font-semibold items-center text-gray-600 hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1 z-10"
                onClick={handleClick}
              >
                Yeni Gönderiler
              </button>
            )
          )}
          <div className=" bg-white shadow-sm mb-2 flex mt-3 flex-row rounded-lg border-gray-200 border-2 w-[450px]  items-center">
            {/* this part include stories */}
            <Stories />
          </div>

          <div className=" flex-col flex items-stretch justify-center  gap-4  shadow-sm rounded-lg w-[450px]  bg-white col-end-6">
            {/* this part include post */}

            <Post />
          </div>
        </div>
        <aside className="mt-10 hidden w-[380px] lg:block ">
          <div className="flex items-center justify-start gap-4">
            {/* this part include follower suggestions */}
            {user.user.photoURL ? (
              <img
                src={user.user.photoURL}
                className="w-14 h-14 rounded-full border-2"
              />
            ) : (
              <img src={UserSvg} className="w-14 h-14 rounded-full border-2" />
            )}

            <div className="flex flex-col ">
              <h1 className="font-semibold text-sm ">
                {user.user.displayName}
              </h1>
              <h1 className="text-gray-500 text-xs ">Kullanıcı Adı</h1>
            </div>
            <button className="text-brand text-xs font-medium mx-auto ">
              Switch
            </button>
          </div>
          <div className="flex items-center mt-4 ">
            <h1 className="text-gray-500 text-sm font-semibold ">
              Önerilen Hesaplar
            </h1>
            <button className="text-brand text-sm font-medium mx-auto">
              Tümünü Göster
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center justify-start gap-4 ">
              {/* this part include follower suggestions */}
              <div className="flex gap-4 items-center w-full">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://64.media.tumblr.com/65f6b815a43c3a447e04a7dd82dea129/0fdc20065f7348e6-73/s1280x1920/5e245bcb7e3dcb3eab2be6fc769a4a56e5c1755c.jpg"
                ></img>
                <div className="flex flex-col ">
                  <p className="font-semibold text-sm ">Selin Sıtkı</p>
                  <p className="text-gray-500 text-xs">Followed by Furkan</p>
                </div>
                <div className="flex flex-col float-right mx-auto">
                  <button className="text-brand text-xs font-medium pr-4">
                    Takip Et
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center w-full mb-10">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Ezra_Miller_by_Gage_Skidmore_2.jpg/800px-Ezra_Miller_by_Gage_Skidmore_2.jpg"
              ></img>
              <div className="flex flex-col ">
                <p className="font-semibold text-sm ">Furkan Çakan</p>
                <p className="text-gray-500 text-xs">Followed by Furkan</p>
              </div>
              <div className="flex flex-col float-right mx-auto">
                <button className="text-brand text-xs font-medium pr-4">
                  Takip Et
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </aside>
      </section>
    </div>
  );
}

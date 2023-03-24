import { useSelector } from "react-redux";
import { useState } from "react";
import userSvg from "../svgs/UserSvg.svg";
import Heart from "../svgs/Heart";
import Bookmark from "../svgs/Bookmark";
import messageSvg from "../svgs/MessageSvg.svg";
import sendSvg from "../svgs/sendSvg.svg";

export default function Post() {
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.auth.posts);

  const [redColor, setRedColor] = useState(false);
  const [bookmarkColor, setBookmarkColor] = useState(false);

  return (
    <>
      <div className="m-0 p-0 flex flex-col bg-gray-50 gap-4">
        {posts.map((post) => (
          <div className="border-2  bg-white" key={post.id}>
            <div className="flex justify-between p-2 items-center">
              <div className="flex p-2 items-center">
                <img
                  src={user.photoURL || userSvg}
                  alt="user"
                  className="w-6 h-6  rounded-full"
                />
                <h1 className="font-medium ml-2">{user.displayName}</h1>
              </div>
              <div>
                <p className="text-xs mr-1.5 text-gray-400">12:00</p>
              </div>
            </div>
            <div className="w-full p-[0.8px] mx-auto bg-gray-200" />
            <div className="flex flex-col items-center justify-center">
              <img
                src={post.src}
                alt="post"
                className="w-[600px] h-[600px] object-cover"
              />
            </div>
            <div className="flex justify-between items-center">
              <div
                onClick={() => setRedColor(!redColor)}
                className="flex p-3 gap-2 items-center"
              >
                <Heart fill={redColor ? "red" : "black"} />
                <img src={messageSvg} alt="message" className="w-5 h-5 ml-2" />
                <img src={sendSvg} alt="send" className="w-5 h-5 ml-2" />
              </div>
              <div
                onClick={() => setBookmarkColor(!bookmarkColor)}
                className="mr-2"
              >
                <Bookmark fill={bookmarkColor ? "black" : "blue"} />
              </div>
            </div>
            <div className="p-1.5 mb-4 flex flex-wrap">
              <p className="font-medium ml-2 block w-full">
                {post.likes}1 likes
              </p>
              <span className="font-medium ml-2">{user.displayName}</span>
              <p className="font-thin ml-2">post caption</p>
              <a href="#" className="text-gray-400 font-thin w-full ml-2">
                View all comments...
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

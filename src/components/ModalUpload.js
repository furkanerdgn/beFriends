import PhotoSvg from "../svgs/PhotoSvg.svg";
import { useSelector } from "react-redux";
import { setUploadModal } from "../utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { uploadImage } from "../firebase";

export default function ModalUpload() {
  const [inputValue, setInputValue] = useState([]);
  const user = useSelector((state) => state.auth);

  const forModal = useSelector((state) => state.auth.modalUpload);
  const handleModalVisibility = () => {
    setUploadModal(!forModal);
  };
  const photoHandle = (event) => {
    const file = event.target.files[0];
    setInputValue(file);
    document.getElementById("post").classList.remove("hidden");
  };

  const postPicture = () => {
    setUploadModal(!forModal);
    //post to firebase
    uploadImage(inputValue, user.userName);
  };

  const handleBack = () => {
    setUploadModal(!forModal);
  };

  return (
    <div
      className="fixed z-20 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          onClick={handleModalVisibility}
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex justify-between items-center px-3  border-slate-300 border-b-2">
            <button onClick={handleBack} className="text-bold">
              Back
            </button>
            <p className="block text-center font-medium p-1.5">
              Create new post
            </p>
            <Link to={`/profile/me`}>
              <button
                id="post"
                onClick={postPicture}
                className="text-brand hidden"
              >
                Post
              </button>
            </Link>
          </div>
          <div>
            <input
              onChange={photoHandle}
              className="absolute w-full h-full cursor-pointer opacity-0"
              type="file"
              id="profile_pic"
              name="profile_pic"
              accept=".jpg, .jpeg, .png"
            />

            {inputValue.length !== 0 ? (
              <img
                className="w-full h-full absolute object-cover"
                src={URL.createObjectURL(inputValue)}
              />
            ) : null}
            <div className="flex flex-col items-center justify-center">
              <img className="w-20 mt-40 mb-3" src={PhotoSvg} />
              <p className="font-thin text-xl">Drag photos and videos here</p>
              <button
                onClick={photoHandle}
                className="bg-brand text-sm text-white font-semibold rounded-lg p-1.5 px-2 mt-5 mb-40"
              >
                Select From Computer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

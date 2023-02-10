import userSvg from "../svgs/UserSvg.svg";

export default function Talk() {
  return (
    <>
      <div className="flex flex-col flex-wrap wrap-col  w-full overflow-y-auto h-[calc(100%-22px)]">
        <div className="flex flex-col my-3 mx-2 p-2">
          <div className="flex my-3">
            <img
              src={userSvg}
              alt="user"
              className="w-10 h-10 p-2  rounded-full hidden md:inline"
            />
            <div className="bg-gray-100 max-w-[40%] rounded-xl p-2 ">
              Message
            </div>
          </div>
        </div>

        <div className="w-full flex items-end flex-col ">
          <div className="bg-gray-100 float-right max-w-[40%] rounded-xl my-2 mx-2 px-3 py-2 ">
            Message
          </div>
        </div>
      </div>
    </>
  );
}

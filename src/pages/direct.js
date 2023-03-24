import Header from "../components/Header";
import Aside from "../components/Aside";
import Chats from "../components/Chats";

export default function Direct() {
  return (
    <>
      <Header />
      <div className="w-full h-full flex justify-center overflow-auto items-start mt-6">
        <div className=" bg-white flex w-[900px] border-[1.2px] border-gray-300 h-[85%] ">
          <Aside />
          <div className="w-[600px] h-[85%]">
            <Chats />
          </div>
        </div>
      </div>
    </>
  );
}

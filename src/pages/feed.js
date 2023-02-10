import Header from "../components/Header";

export default function Feed() {
  return (
    <>
      <Header />
      <div className="flex flex-wrap overflow-auto gap-4 w-[930px] mx-auto mt-5">
        <div className="w-[300px] h-[600px] flex flex-col gap-[30px] ">
          <div className="w-[285px] h-[285px] bg-red-100"></div>
          <div className="w-[285px] h-[285px] bg-red-100"></div>
        </div>
        <div className="w-[600px] h-[600px] bg-gray-300 float-right"></div>
        <div className=" flex gap-[30px] flex-wrap">
          <div className="w-[285px] h-[285px] bg-black"></div>
          <div className="w-[285px] h-[285px] bg-black"></div>
          <div className="w-[285px] h-[285px] bg-black"></div>
          <div className="w-[285px] h-[285px] bg-black"></div>
          <div className="w-[285px] h-[285px] bg-black"></div>
          <div className="w-[285px] h-[285px] bg-black"></div>
        </div>

        <div className="w-[600px] h-[600px] bg-gray-300 float-right"></div>

        <div className="w-[300px] h-[600px] flex flex-col flex-wrap gap-[30px] ">
          <div className="w-[285px] h-[285px] bg-red-100"></div>
          <div className="w-[285px] h-[285px] bg-red-100"></div>
        </div>
      </div>
    </>
  );
}

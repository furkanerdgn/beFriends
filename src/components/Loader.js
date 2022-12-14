export default function Loader() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-black">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      <label className="text-2xl  text-white">Yükleniyor ... </label>
    </div>
  );
}

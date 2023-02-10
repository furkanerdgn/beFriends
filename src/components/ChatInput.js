export default function ChatInput() {
  return (
    <div className="flex bg-red-500 h-12 justify-between border-t-[1.2px]">
      <input
        type="text"
        placeholder="Type something..."
        className="w-full text-lg h-full border-none outline-none p-4"
      />
    </div>
  );
}

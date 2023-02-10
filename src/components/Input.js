import { useEffect, useState } from "react";

export default function Input({ label, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const [inputType, setType] = useState(type);

  useEffect(() => {
    if (show) {
      setType("text");
    } else if (type === "password") {
      setType("password");
    }
  }, [show]);

  return (
    <label
      for="surname"
      className="relative flex bg-zinc-50 border rounded-sm focus-within:border-gray-400"
    >
      <input
        id="surname"
        required={true}
        type={inputType}
        className="w-full px-2 outline-none h-[38px] text-xs  valid:pt-3 peer"
        {...props}
      />
      <small className="absolute top-1/2 left-[9px] -translate-y-1/2 transition-all text-xs text-gray-400 cursor-text pointer-events-none peer-invalid:text-[10px] peer-invalid:top-2.5 peer-valid:text-[10px] peer-valid:top-2.5">
        {label}
      </small>
      {type === "password" && props?.value && (
        <div
          type="button"
          className="h-full cursor-pointer flex items-center select-none"
          onClick={() => setShow((show) => !show)}
        >
          {show ? "Hide" : "Show"}
        </div>
      )}
    </label>
  );
}

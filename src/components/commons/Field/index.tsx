import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import cn from "classnames";

type Event<T> = (v: T) => void;

type InputProps = {
  name: string;
  onBlur?: () => void;
  onChange?: Event<string>;
  onFocus?: () => void;
  unregister?: () => void;
  value?: (() => string | number) | string | null | number | undefined;
  placeholder?: string;
  error?: string;
  type?: "text" | "password";
  isPlaceholder?: boolean;
};
export default function Field({
  name,
  placeholder,
  value,
  error,
  onChange,
  onBlur,
  onFocus,
  type = "text",
  unregister,
}: InputProps) {
  const id = "input_" + nanoid();

  const [val, setVal] = useState(
    typeof value === "function" ? value() : value === null ? undefined : value
  );

  const [err, setErr] = useState(error);

  const handleChange = (e: string) => {
    setVal(e);
    if (e === "" && unregister) {
      const input = document.querySelector(`[id=${id}]`) as HTMLInputElement;
      input.value = "";
      return unregister();
    }
    onFocus && onFocus();

    onChange && onChange(e);
  };

  const handleBlur = () => {
    onBlur && onBlur();
  };

  useEffect(() => {
    setErr(error);
  }, [error]);

  return (
    <div className="wrapper-field ">
      <div className={cn("input-max", { active: !!val })}>
        <small>{val && placeholder}</small>
        {err && <span>{err}</span>}
        <input
          id={id}
          placeholder={placeholder}
          name={name}
          value={val}
          type={type}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onFocus={onFocus}
          autoComplete="off"
        />
        
      </div>
    </div>
  );
}

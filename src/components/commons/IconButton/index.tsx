import { CSSProperties, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  animation?: "scale" | "rotate";
  transparent?: boolean;
  htmlforId?: string;
}

export default function IconButton({
  animation = "rotate",
  transparent = false,
  htmlforId,
  ...props
}: Props) {
  const { children } = props;

  const style: CSSProperties = {
    background: "transparent",
  };
  return (
    <button
      {...props}
      id={htmlforId}
      className={`icon-button ${animation}`}
      style={transparent ? style : undefined}
    >
      {children}
    </button>
  );
}

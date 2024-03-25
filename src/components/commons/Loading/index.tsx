import { useEffect, useState } from "react";

type LoadingProps = {
  text?: string;
};

export default function Loading({ text = "Загружаем" }: LoadingProps) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (amount.length < 5) {
      setTimeout(setAmount, 300, amount + ".");
    } else {
      setTimeout(setAmount, 300, "");
    }
  }, [amount]);

  return <>{text+amount}</>;
}

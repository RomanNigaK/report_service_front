import classNames from "classnames";
import "./radio.sass";
import { useEffect, useState } from "react";

interface IRadioButton {
  name: string;
  value: string;
}

interface IRadioGroup {
  buttons: IRadioButton[];
  label: string;
  error?: string;
  defaulValue?: string;
  setValue: (val: string) => void;
}

export default function RadioGroup({
  buttons,
  label,
  error,
  setValue,
  defaulValue,
}: IRadioGroup) {
  const [val, setVal] = useState(defaulValue);
  useEffect(() => {
    if (val) setValue(val);
  }, [setValue, val]);

  return (
    <div className="radioGroup">
      <label>{label}</label>
      <div className="radioGroup__group">
        {buttons.map((e) => {
          return (
            <div key={`radioitem-${e.value}`}>
              <div
                className={classNames("radioGroup__button", {
                  chek: e.value === val,
                })}
                onClick={() => setVal(e.value)}
              />
              {e.name}
            </div>
          );
        })}
      </div>

      {error && <small>{error}</small>}
    </div>
  );
}

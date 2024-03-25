import classNames from "classnames";
import "./radio.sass";
import { useEffect, useState } from "react";
import { Roles } from "constans/enums";

interface IRadioButton {
  name: string;
  value: string;
}

interface IRadioGroup {
  buttons: IRadioButton[];
  label: string;
  error?: string;
  defaulValue?: string;
  setValue: (val: keyof typeof Roles) => void;
}

export default function RadioGroup({
  buttons,
  label,
  error,
  setValue,
  defaulValue,
}: IRadioGroup) {
  const [val, setVal] = useState<keyof typeof Roles | undefined>();
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
                onClick={() => setVal(e.value as keyof typeof Roles)}
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

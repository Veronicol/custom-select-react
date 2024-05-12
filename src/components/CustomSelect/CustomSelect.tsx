import { ReactElement, useState } from "react";
import { ExpandIcon } from "../../assets/icons/ExpandIcon";
import "./customSelect.css";
import { CustomOptionType } from "./customSelect.types";

type CustomSelectProps = {
  children: ReactElement<CustomOptionType>[];
};

export const CustomSelect = ({ children }: CustomSelectProps) => {
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);

  return (
    <div className="custom-select__container">
      <div
        className="custom-select__input"
        onClick={() => {
          setAreOptionsVisible(!areOptionsVisible);
        }}
      >
        <div>Custom Select Input</div>
        <ExpandIcon />
      </div>
      <div
        className={
          areOptionsVisible
            ? "custom-select__dropdown"
            : "custom-select__dropdown__hidden"
        }
      >
        {children}
      </div>
    </div>
  );
};

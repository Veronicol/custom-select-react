import { ReactElement, useEffect, useRef, useState } from "react";
import { ExpandIcon } from "../../assets/icons/ExpandIcon";
import "./customSelect.css";
import { CustomOptionType } from "./customSelect.types";

type CustomSelectProps = {
  children: ReactElement<CustomOptionType>[];
};

export const CustomSelect = ({ children }: CustomSelectProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutOfOptions = (event: MouseEvent) => {
      dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        setIsDropdownVisible(false);
    };
    document.addEventListener("click", handleClickOutOfOptions);
    return () => {
      document.removeEventListener("click", handleClickOutOfOptions);
    };
  }, []);

  return (
    <div className="custom-select__container">
      <div
        className="custom-select__input"
        onClick={(event) => {
          event.stopPropagation();
          setIsDropdownVisible(!isDropdownVisible);
        }}
      >
        <div>Custom Select Input</div>
        <ExpandIcon />
      </div>
      {children && (
        <div
          ref={dropdownRef}
          className={
            isDropdownVisible
              ? "custom-select__dropdown"
              : "custom-select__dropdown__hidden"
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};

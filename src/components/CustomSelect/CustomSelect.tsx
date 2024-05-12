import { ReactElement, cloneElement, useState } from "react";
import { ExpandIcon } from "../../assets/icons/ExpandIcon";
import "./customSelect.css";
import { CustomOptionType, CustomSelectOptionType } from "./customSelect.types";
import { useHideDropdownOnClickOut } from "./hooks/useHideDropdownOnClickOut";

type CustomSelectProps = {
  children: ReactElement<CustomOptionType>[];
};

type SelectChildrenWithPropsType = {
  onSelectOption: (value: CustomSelectOptionType) => void;
  selectedOption?: CustomSelectOptionType;
  children: ReactElement<CustomOptionType>[];
};

const SelectChildrenWithProps = ({
  onSelectOption,
  selectedOption,
  children,
}: SelectChildrenWithPropsType) => {
  return children.map((child) =>
    cloneElement(child, { onSelectOption, selectedOption })
  );
};

export const CustomSelect = ({ children }: CustomSelectProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [currentOption, setCurrentOption] = useState<CustomSelectOptionType>();

  const { dropdownRef } = useHideDropdownOnClickOut(setIsDropdownVisible);

  return (
    <div className="custom-select__container">
      <div
        className="custom-select__input"
        onClick={(event) => {
          event.stopPropagation();
          setIsDropdownVisible(!isDropdownVisible);
        }}
      >
        <div>{currentOption?.label}</div>
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
          <SelectChildrenWithProps
            onSelectOption={setCurrentOption}
            selectedOption={currentOption}
          >
            {children}
          </SelectChildrenWithProps>
        </div>
      )}
    </div>
  );
};

import { ReactElement, cloneElement } from "react";
import { ExpandIcon } from "../../assets/icons/ExpandIcon";
import "./customSelect.css";
import { CustomOptionType, CustomSelectOptionType } from "./customSelect.types";
import { useHideDropdownOnClickOut } from "./hooks/useHideDropdownOnClickOut";
import { CustomOption } from "./CustomOption";
import { useCustomSelect } from "./hooks/useCustomSelect";

type CustomSelectProps = {
  onChange?: (val: string) => void;
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
  function isCustomOptionType(
    child: ReactElement<
      CustomOptionType,
      string | React.JSXElementConstructor<unknown>
    >
  ): child is ReactElement<CustomOptionType> {
    return child.type === CustomOption;
  }
  const validChildren = children.filter((child) => isCustomOptionType(child));
  return validChildren.map((child) =>
    cloneElement(child, { onSelectOption, selectedOption })
  );
};

export const CustomSelect = ({ onChange, children }: CustomSelectProps) => {
  const initialState = {
    isDropdownVisible: false,
  };

  const {
    currentOption,
    isDropdownVisible,
    changeOption,
    toggleDropdownVisibility,
  } = useCustomSelect(initialState, onChange);

  const { dropdownRef } = useHideDropdownOnClickOut(toggleDropdownVisibility);

  return (
    <div className="custom-select__container">
      <div
        className="custom-select__input"
        onClick={(event) => {
          event.stopPropagation();
          toggleDropdownVisibility(!isDropdownVisible);
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
            onSelectOption={changeOption}
            selectedOption={currentOption}
          >
            {children}
          </SelectChildrenWithProps>
        </div>
      )}
    </div>
  );
};

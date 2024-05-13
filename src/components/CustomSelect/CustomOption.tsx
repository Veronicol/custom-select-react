import { useEffect, useState } from "react";
import { CustomOptionType, CustomSelectOptionType } from "./customSelect.types";
import { DoneIcon } from "../../assets/icons/DoneIcon";

export const CustomOption = ({
  value,
  children,
  selected = false,
  disabled = false,
  onSelectOption,
  selectedOption,
  dataTestId,
}: CustomOptionType) => {
  const currentOption: CustomSelectOptionType = {
    value,
    label: children,
  };

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    selected && onSelectOption && onSelectOption(currentOption);
  }, [selected]);

  useEffect(() => {
    if (selectedOption?.value === value) {
      onSelectOption && onSelectOption(currentOption);
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedOption?.value]);

  const onCustomOptionClick = () => {
    !disabled && onSelectOption && onSelectOption(currentOption);
  };

  return (
    <div
      data-testid={dataTestId}
      className={`custom-select__option ${
        disabled
          ? "custom-select__option__disabled"
          : "custom-select__option__active"
      }`}
      onClick={onCustomOptionClick}
    >
      {isSelected ? (
        <DoneIcon />
      ) : (
        <div className="custom-select__option__non-selected" />
      )}
      {children}
    </div>
  );
};

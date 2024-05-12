import { useEffect, useState } from "react";
import { CustomOptionType, CustomSelectOptionType } from "./customSelect.types";
import { DoneIcon } from "../../assets/icons/DoneIcon";

export const CustomOption = ({
  value,
  children,
  selected,
  onSelectOption,
  selectedOption,
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
    onSelectOption && onSelectOption(currentOption);
  };

  return (
    <div className="custom-select__option" onClick={onCustomOptionClick}>
      {isSelected ? (
        <DoneIcon />
      ) : (
        <div className="custom-select__option__non-selected" />
      )}
      {children}
    </div>
  );
};

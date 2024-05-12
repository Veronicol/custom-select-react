import { CustomOptionType } from "./customSelect.types";

export const CustomOption = ({ children }: CustomOptionType) => {
  return <div className="custom-select__option">{children}</div>;
};

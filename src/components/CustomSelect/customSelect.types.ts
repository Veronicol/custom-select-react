export type CustomSelectOptionType = {
  label: string;
  value: string;
};

export type CustomOptionType = {
  value: string;
  children: string;
  selected?: boolean;
  onSelectOption?: (value: CustomSelectOptionType) => void;
  selectedOption?: CustomSelectOptionType;
};

export type CustomSelectOptionType = {
  label: string;
  value: string;
};

export type CustomOptionType = {
  key: string;
  value: string;
  children: string;
  selected?: boolean;
  onSelectOption?: (value: CustomSelectOptionType) => void;
  selectedOption?: CustomSelectOptionType;
};

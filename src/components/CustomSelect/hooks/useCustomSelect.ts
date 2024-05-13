import { useEffect, useReducer } from "react";
import { CustomSelectOptionType } from "../customSelect.types";

enum actionTypes {
  CHANGE_OPTION = "CHANGE_OPTION",
  TOGGLE_DROPDOWN_VISIBILITY = "TOGGLE_DROPDOWN_VISIBILITY",
}

type ToggleDropDownVisibilityAction = {
  type: actionTypes.TOGGLE_DROPDOWN_VISIBILITY;
  payload: boolean;
};

type ChangeOptionAction = {
  type: actionTypes.CHANGE_OPTION;
  payload: CustomSelectOptionType;
};

type CustomSelectState = {
  isDropdownVisible: boolean;
  currentOption?: CustomSelectOptionType;
};

const customSelectReducer = (
  state: CustomSelectState,
  { type, payload }: ToggleDropDownVisibilityAction | ChangeOptionAction
): CustomSelectState => {
  switch (type) {
    case actionTypes.TOGGLE_DROPDOWN_VISIBILITY: {
      return {
        ...state,
        isDropdownVisible: payload,
      };
    }
    case actionTypes.CHANGE_OPTION: {
      return {
        ...state,
        currentOption: payload,
        isDropdownVisible: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const useCustomSelect = (
  stateInitial: CustomSelectState,
  onChangeTrigger?: (val: string) => void
) => {
  const [state, dispatch] = useReducer(customSelectReducer, stateInitial);
  const { currentOption, isDropdownVisible } = state;

  const toggleDropdownVisibility = (isVisible: boolean) =>
    dispatch({
      type: actionTypes.TOGGLE_DROPDOWN_VISIBILITY,
      payload: isVisible,
    });

  const changeOption = (newOption: CustomSelectOptionType) =>
    dispatch({
      type: actionTypes.CHANGE_OPTION,
      payload: newOption,
    });

  useEffect(() => {
    currentOption && onChangeTrigger && onChangeTrigger(currentOption.value);
  }, [currentOption]);

  return {
    currentOption,
    isDropdownVisible,
    changeOption,
    toggleDropdownVisibility,
  };
};

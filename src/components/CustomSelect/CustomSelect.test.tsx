import "@testing-library/jest-dom";

import { describe, test, expect, afterEach } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { CustomSelect } from "./CustomSelect";
import { CustomOption } from "./CustomOption";
import { selectOptions } from "../../utils/selectOptions";

const nonValidOptText =
  "Non valid option because is not a CustomOption element";

const setup = () => {
  render(
    <CustomSelect>
      <CustomOption key={selectOptions[0].value} value={selectOptions[0].value}>
        {selectOptions[0].label}
      </CustomOption>

      <div>{nonValidOptText}</div>

      <CustomOption key={selectOptions[1].value} value={selectOptions[1].value}>
        {selectOptions[1].label}
      </CustomOption>

      <CustomOption
        key={selectOptions[2].value}
        value={selectOptions[2].value}
        disabled
      >
        {selectOptions[2].label}
      </CustomOption>

      <CustomOption key={selectOptions[3].value} value={selectOptions[3].value}>
        {selectOptions[3].label}
      </CustomOption>
    </CustomSelect>
  );
};

describe("Custom Select Component", () => {
  afterEach(() => {
    cleanup();
  });

  test("should render the component", () => {
    setup();
    const customSelect = screen.getByTestId("custom-select");
    expect(customSelect).toBeInTheDocument();
  });

  test("should render a dropdown with only the options added as a '<CustomOption>' tag", () => {
    setup();
    const dropdown = screen.getByTestId("custom-select-dropdown");
    expect(dropdown).toBeInTheDocument();

    const options = within(dropdown).getAllByTestId("custom-select-option", {
      exact: false,
    });
    expect(options).toHaveLength(4);

    const divOption = within(dropdown).queryByText(nonValidOptText);
    expect(divOption).not.toBeInTheDocument();
  });
});

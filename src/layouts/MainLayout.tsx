import { CustomOption, CustomSelect } from "../components/CustomSelect";
import { selectOptions } from "../utils/selectOptions";

export const MainLayout = () => {
  return (
    <div className="main-layout__container">
      <div className="custom-select__section">
        <h1>Custom Select Input</h1>
        <CustomSelect>
          <CustomOption value={""} selected>
            -- Please, select an option --
          </CustomOption>
          <CustomOption value={selectOptions[0].value}>
            {selectOptions[0].label}
          </CustomOption>
          <CustomOption value={selectOptions[1].value}>
            {selectOptions[1].label}
          </CustomOption>
          <CustomOption value={selectOptions[2].value}>
            {selectOptions[2].label}
          </CustomOption>
          <CustomOption value={selectOptions[3].value}>
            {selectOptions[3].label}
          </CustomOption>
        </CustomSelect>
        <div className="select-result">Selected option is XXX</div>
      </div>
    </div>
  );
};

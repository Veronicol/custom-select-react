import { CustomOption, CustomSelect } from "../components/CustomSelect";

export const MainLayout = () => {
  return (
    <div className="main-layout__container">
      <div className="custom-select__section">
        <h1>Custom Select Input</h1>
        <CustomSelect />
        <CustomOption />
        <div className="select-result">Selected option is XXX</div>
      </div>
    </div>
  );
};

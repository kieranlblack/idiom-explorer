import React from "react";

import CreatableSelect from "react-select/creatable";

const createOption = (label) => ({
  label,
  value: label,
});

const MultiSelectTextInput = ({ value, setValue, ...other }) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, inputValue]);
        setInputValue("");
        event.preventDefault();
        break;
      default:
    }
  };

  return (
    <CreatableSelect
      components={{ DropdownIndicator: null }}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => setValue(newValue.map(({ value }) => value))}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      value={value.map(createOption)}
      {...other}
    />
  );
};

export default MultiSelectTextInput;

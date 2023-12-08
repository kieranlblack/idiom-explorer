import React, { useEffect } from "react";

import CreatableSelect from "react-select/creatable";

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

const MultiSelectTextInput = ({ onValueChange, defaultValue, ...other }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState(defaultValue.map((value) => ({ value: value, label: value })));

  useEffect(() => {
    onValueChange(value.map(({ value }) => value));
  }, [onValueChange, value]);

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
        break;
      default:
    }
  };

  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => setValue(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      value={value}
      {...other}
    />
  );
};

export default MultiSelectTextInput;

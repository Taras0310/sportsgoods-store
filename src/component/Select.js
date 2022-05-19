import React from "react";

export default function Select({ options, selectedValue, onChange }) {
  return (
    <select
      className="select-control"
      value={selectedValue}
      onChange={onChange}
    >
      {options.map((item) => {
        return (
          <option value={item.value} key={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
}

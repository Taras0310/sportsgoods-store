import React from "react";

export default function MySelect({ options, value }) {
  console.log(options);
  return (
    <select value={value}>
      {options.map((option) => (
        <option>{option.name}</option>
      ))}
    </select>
  );
}

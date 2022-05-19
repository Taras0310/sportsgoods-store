export function toSelectOptions(array) {
  const options = [{ value: "", label: "-" }];
  array.forEach((item) => {
    options.push({ value: `${item}`, label: item });
  });
  return options;
}

export const sortByOptions = [
  { value: "", label: "-" },
  { value: "brand", label: "Брендами" },
  { value: "price", label: "Ціною" },
];

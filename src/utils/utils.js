export function subCategoriesToSelectOptions(array) {
  const options = [{ value: "", label: "-" }];
  array.forEach((item) => {
    options.push({ value: `${item}`, label: item });
  });
  return options;
}

export function categoriesToSelectOptions(array) {
  const options = [{ value: "", label: "-" }];
  array.forEach((item) => {
    options.push({ value: `${item.name}`, label: item.name });
  });
  return options;
}

export const sortByOptions = [
  { value: "", label: "-" },
  { value: "brand", label: "Брендами" },
  { value: "price", label: "Ціною" },
];

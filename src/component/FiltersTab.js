import React, { useEffect, useState } from "react";
import { FcClearFilters } from "react-icons/fc";
import Select from "./Select";

export default function FiltersTab({
  subcategoryOptions,
  sortOptions,
  selectedSubcategory,
  selectedSort,
  handleSubCategories,
  handleSortBy,
  clearFilters,
}) {
  useEffect(() => {
    console.log(subcategoryOptions, "subcategories");
    console.log(sortOptions, "sort");
  }, []);

  return (
    <div className="filters-tab">
      <div className="tab-item">
        <label>підкатегорія:</label>
        <Select
          options={subcategoryOptions}
          selectedValue={selectedSubcategory}
          onChange={handleSubCategories}
        />
      </div>
      <div className="tab-item">
        <label>сортувати за:</label>
        <Select
          options={sortOptions}
          selectedValue={selectedSort}
          onChange={handleSortBy}
        />
      </div>
      <button className="btn-clear" onClick={() => clearFilters()}>
        <FcClearFilters />
      </button>
    </div>
  );
}

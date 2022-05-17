import React from "react";
import { useStore } from "../contexts/AppContext";
import "./categoryitem.scss";

export default function SubcategoryList({ subcategories }) {
  const { setQueryFilters, queryFilters } = useStore();

  return (
    <div className="category-block">
      {subcategories.map((subcategory) => {
        return (
          <div
            className="item"
            onClick={() =>
              setQueryFilters({ ...queryFilters, subcategory: subcategory })
            }
            key={subcategory}
          >
            {subcategory}
          </div>
        );
      })}
    </div>
  );
}

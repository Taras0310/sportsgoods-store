import React, { useEffect, useState } from "react";
import { useStore } from "../contexts/AppContext";
import ProductsList from "../component/ProductsList";
import Api from "../api";
import FiltersTab from "../component/FiltersTab";
import { sortByOptions, subCategoriesToSelectOptions } from "../utils/utils";

export default function Products() {
  const [products, setProducts] = useState(null);
  const { queryFilters, currentCategoryObject, setQueryFilters } = useStore();
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    Api.getProducts(queryFilters, selectedSort).then((productsData) => {
      setProducts(productsData);
    });
  }, [queryFilters, selectedSort]);

  function clearFilters() {
    setSelectedSort("");
    setSelectedSubcategory("");
    setQueryFilters({ category: queryFilters.category });
  }

  function handleSubcategories(event) {
    setSelectedSubcategory(event.target.value);
    if (event.target.value.length > 0) {
      setQueryFilters({ ...queryFilters, subcategory: event.target.value });
    } else {
      setQueryFilters({ category: queryFilters.category });
    }
  }

  function handleSortBy(event) {
    setSelectedSort(event.target.value);
  }

  return (
    <div className="page">
      <div className="product-block">
        {currentCategoryObject && (
          <>
            <FiltersTab
              subcategoryOptions={subCategoriesToSelectOptions(
                currentCategoryObject.subcategories
              )}
              sortOptions={sortByOptions}
              selectedSubcategory={selectedSubcategory}
              selectedSort={selectedSort}
              handleSubCategories={handleSubcategories}
              handleSortBy={handleSortBy}
              clearFilters={clearFilters}
            />
            <ProductsList products={products} />
          </>
        )}
      </div>
    </div>
  );
}

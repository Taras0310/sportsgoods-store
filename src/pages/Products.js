import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductsList from "../component/ProductsList";
import SubcategoryList from "../component/SubcategoryList";
import { useStore } from "../contexts/AppContext";
import Api from "../api";
import "../component/products.scss";
import Header from "../component/Header";

export default function Products() {
  const [products, setProducts] = useState(null);
  const {
    queryFilters,
    currentCategoryObject,
    setQueryFilters,
    setCurrentCategoryObject,
  } = useStore();
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    Api.getProducts(queryFilters, selectValue).then((productsData) => {
      setProducts(productsData);
    });
  }, [queryFilters, selectValue]);

  function filterObj() {
    setQueryFilters({ category: queryFilters.category });
  }
  // function clearFilter(){
  //   setQueryFilters({})
  //   setCurrentCategoryObject({})
  // }

  return (
    <div>
      <Header />
      <div className="products-block">
        {currentCategoryObject && (
          <>
            <SubcategoryList
              subcategories={currentCategoryObject.subcategories}
            />
            <div className="search">
              <select
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
              >
                <option disabled value="">
                  Сортувати за
                </option>
                <option value="brand"> Брендами</option>
                <option value="price">Ціною</option>
              </select>
              <button className="clear" onClick={filterObj}>
                Очистити фільтр
              </button>
            </div>

            <ProductsList products={products} />
          </>
        )}
      </div>
    </div>
  );
}

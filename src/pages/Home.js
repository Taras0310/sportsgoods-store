import React, { useEffect } from "react";
import { useStore } from "../contexts/AppContext";
import CategoryList from "../component/CategoryList";

export default function Home() {
  const { categories, clearFilter } = useStore();

  useEffect(() => {
    clearFilter();
  }, []);

  return (
    <div className="page">
      {!categories && "Loading..."}
      {categories && <CategoryList categories={categories} />}
    </div>
  );
}

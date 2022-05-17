import React from "react";
import { useStore } from "../contexts/AppContext";
import CategoryList from "../component/CategoryList";

export default function Home() {
  const { categories } = useStore();

  return (
    <div>
      {!categories && "Loading..."}
      {categories && <CategoryList categories={categories} />}
    </div>
  );
}

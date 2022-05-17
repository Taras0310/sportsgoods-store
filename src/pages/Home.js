import React, { useEffect, useState } from "react";
import Api from "../api";
import CategoryList from "../component/CategoryList";
import { useStore } from "../contexts/AppContext";

export default function Home() {
  const { categories, setCategories } = useStore();

  return (
    <div>
      {!categories && "Loading..."}
      {categories && <CategoryList categories={categories} />}
    </div>
  );
}

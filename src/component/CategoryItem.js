import { Link } from "react-router-dom";
import { useStore } from "../contexts/AppContext";
import "./categoryitem.scss";

const CategoryItem = ({ category }) => {
  const { queryFilters, setQueryFilters, setCurrentCategoryObject } =
    useStore();

  return (
    <div
      className="item"
      onClick={() => {
        setQueryFilters({ ...queryFilters, category: category.name });
        setCurrentCategoryObject(category);
      }}
    >
      <span>
        <Link to="/products">{category.name}</Link>
      </span>
    </div>
  );
};

export default CategoryItem;

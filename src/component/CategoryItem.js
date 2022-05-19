import { Link } from "react-router-dom";
import { useStore } from "../contexts/AppContext";

const CategoryItem = ({ category }) => {
  const { queryFilters, setQueryFilters, setCurrentCategoryObject } =
    useStore();

  return (
    <Link to="/products">
      <div
        className="category-item"
        onClick={() => {
          setQueryFilters({ ...queryFilters, category: category.name });
          setCurrentCategoryObject(category);
        }}
      >
        <div className="category-title">{category.name}</div>
      </div>
    </Link>
  );
};

export default CategoryItem;

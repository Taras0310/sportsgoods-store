
import React  from 'react'
import Categoryitem from './CategoryItem';


const CategoryList= ({categories}) =>{
    return(
        <div className="category-block">
            {categories.map(category =><Categoryitem key={category.id} category={category}/>)}
           
        </div>
        
   )

}
export default CategoryList;
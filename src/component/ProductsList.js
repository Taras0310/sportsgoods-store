import React, {  useState } from 'react'
import ProductItem from './ProductItem';
import './productsList.scss'

export default function ProductsList({products}) {

   
    return (
        <div className='product-list'> 
          {products ?
           products.map(el =>
            <ProductItem key={el.id} itemObj ={el}  />)
           :
           <div>Loading</div>
          }
          
           
        </div>
    )
}

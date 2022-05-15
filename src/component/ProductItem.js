import React from 'react'
import './productsList.scss'

export default function ProductItem({itemObj}) {
   
  return (
    
    <div className="card">
        <img src={itemObj.img} />
        <div className="icons"><button className='btn'>Додати до кошика</button></div>
        <div className='description'>
            <h3>{itemObj.brand}</h3>
            <div className="price">{itemObj.description}</div>
            <div className="price"><strong>{itemObj.price } $</strong></div>
        </div>
    </div>
  )
}

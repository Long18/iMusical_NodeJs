import React from 'react';
import { Link } from 'react-router-dom';
import "./CartItemCard.css";

const CartItemCard = ({item, deleteCartItems}) => {
    return (
        <div className='CartItemCard'>
            <img src={item.image} alt="ssa" />
            <div>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{`Price: ${item.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}`}</span> 
                <p onClick={() => deleteCartItems(item.product)}>Remove</p>
            </div>
        </div>
    ) 
}

export default CartItemCard

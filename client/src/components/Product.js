import React from "react";
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

export default function product({ product }) {
    return (
        <div className="text-left">
            <div>
                <Link to={'product/' + product._id}>
                    <div className="text-center">
                    <img src={product.image} className="img-fluid" />
                    </div>
                    <h1>{product.name}</h1>

                    <ReactStars
                        count={5}
                        value={product.rating}
                        isHalf={true}
                        edit={false}
                        size={24}
                        activeColor="#ffd700"
                    />

                    <h1>{product.price}</h1></Link>
            </div>
        </div>
    )
}
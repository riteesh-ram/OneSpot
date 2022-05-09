import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from 'react-redux'
import { addProductReview } from '../actions/productActions'

export default function Review({ product }) {

    const dispatch = useDispatch()
    const [rating, setrating] = useState(5)
    const [comment, setcomment] = useState('')

    function sendreview() {
        if (localStorage.getItem('currentUser')) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'))

            var alreadyreviewed

            for (var i = 0; i < product.reviews.length; i++) {

                if (product.reviews[i].userid == currentUser._id) {
                    alreadyreviewed = true
                }

            }

            if (alreadyreviewed) {
                alert('You have already reviewd this product')
            } else {

                const review = {
                    rating: rating,
                    comment: comment
                }

                dispatch(addProductReview(review, product._id))
            }
        }
        else {
            window.location.href = '/login'
        }
    }

    return (
        <div className='shadow p-3 mb-5 bg-white rounded ml-2 mr-3'>
            <h1>Give Your Review</h1>
            <ReactStars
                count={5}
                value={rating}
                isHalf={true}
                edit={true}
                size={24}
                activeColor="#ffd700"
                onChange={(e) => { setrating(e) }}
            />
            <input type="text" className="form-control mt-2" value={comment} onChange={(e) => { setcomment(e.target.value) }} />
            <button className='btn mt-3' onClick={sendreview}>Submit Review</button>

            <h2 className='mt-3'>Latest Reviews</h2>

            {product.reviews && (product.reviews.map(review => {
                return <div className="text-left">
                    <ReactStars
                        count={5}
                        value={review.rating}
                        isHalf={true}
                        edit={false}
                        size={24}
                        activeColor="#ffd700"
                        onChange={(e) => { setrating(e) }}
                    />
                    <p>{review.comment}</p>
                    <p>By : {review.name}</p>
                    <hr />
                </div>
            }))}

        </div>
    )
}
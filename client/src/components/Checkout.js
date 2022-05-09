import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch, useSelector } from 'react-redux'
import { placeOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/success'

export default function Checkout({ amount }) {

    const dispatch = useDispatch()
    const orderstate = useSelector(state => state.placeOrderReducer)

    const { loading, success, error } = orderstate

    function tokenHandler(token) {
        console.log(token)
        dispatch(placeOrder(token, amount))
    }

    function validate(){
        if(!localStorage.getItem('currentUser')){
            window.location.href='/login'
        }
    }

    return (
        <div>

            {loading && (<Loader />)}
            {success && (<Success success='Your Order Placed Successfully' />)}
            {error && (<Error error='Something Went wrong' />)}

            <StripeCheckout
                token={tokenHandler}
                amount={amount * 100}
                shippingAddress
                currency='INR'
                stripeKey='pk_test_51KihXISAL7iGjIkWpbSq0jrE1592QBZkRI5JjbJI8RIvHTLXOA19boIcWnWiY79uM3dq5tY6T7qTaD1JuTPzrIwA00vkKpIw1U'>
                <button className='btn' onClick={validate}>Checkout</button>
            </StripeCheckout>

        </div>

    )
}
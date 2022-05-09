import axios from "axios";

export const placeOrder = (token, subtotal) => (dispatch, getState) => {

    //getting current user and cart items states
    const currentUser = getState().loginReducer.currentUser
    //we are only taking the required properties of a product from cart items and save it in cartItems variable
    const demoItems = getState().cartReducer.cartItems

    const cartItems = new Array();

    for (var i = 0; i < demoItems.length; i++) {

        var item = {
            name: demoItems[i].name,
            quantity: demoItems[i].quantity,
            price: demoItems[i].price,
            _id: demoItems[i]._id
        }
        cartItems.push(item)
    }

    dispatch({ type: 'PLACE_ORDER_REQUEST' })

    axios.post('/api/orders/placeorder', { token, subtotal, currentUser, cartItems }).then(res => {
        axios.post('/api/products/changestock',{cartItems})
        dispatch({ type: 'PLACE_ORDER_SUCCESS' })
        console.log(res)

    }).catch(err => {
        dispatch({ type: 'PLACE_ORDER_FAILED' })
    })


}

export const getOrdersByUserId=()=>(dispatch , getState)=>{

    const userid = getState().loginReducer.currentUser._id

     dispatch({type:'GET_ORDERSBYUSERID_REQUEST'})

     axios.post('/api/orders/getordersbyuserid' , {userid:userid}).then(res=>{

          dispatch({type:'GET_ORDERSBYUSERID_SUCCESS' , payload:res.data})
          console.log(res.data);

     }).catch(err=>{
         dispatch({type:'GET_ORDERSBYUSERID_FAILED' , payload:err})

     })


}

export const getOrderById=(orderid)=>(dispatch , getState)=>{

    

    dispatch({type:'GET_ORDERBYID_REQUEST'})

    axios.post('/api/orders/getorderbyid' , {orderid:orderid}).then(res=>{

         dispatch({type:'GET_ORDERBYID_SUCCESS' , payload:res.data})
         console.log(res.data);

    }).catch(err=>{
        dispatch({type:'GET_ORDERBYID_FAILED' , payload:err})

    })


}

export const getAllOrders=()=>(dispatch , getState)=>{

    

    dispatch({type:'GET_ALLORDERS_REQUEST'})

    axios.get('/api/orders/getallorders').then(res=>{

         dispatch({type:'GET_ALLORDERS_SUCCESS' , payload:res.data})
         console.log(res.data);

    }).catch(err=>{
        dispatch({type:'GET_ALLORDERS_FAILED' , payload:err})

    })


}
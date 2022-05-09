const { v4: uuidv4 } = require('uuid')
const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51KihXISAL7iGjIkW1ddy8D3ajS8brhFwW75ReOFRuD6MCkWVvKnCfp3kScQawcr76Le5hTLtGGAqqYYpjXM0dx8q006CqBONoV")
const Order = require('../models/orderModel')

//placing order
router.post("/placeorder", async (req, res) => {

    try {
        const { token, cartItems, currentUser, subtotal } = req.body

        //creating the customer
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        //creating the payment

        const payment = await stripe.paymentIntents.create({
            amount: subtotal * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email
        }, {
            //it is the unique for every payment
            idempotencyKey: uuidv4()
        })



        //check if payment successful
        if (payment) {

            const order = new Order({

                userid: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                orderItems: cartItems,
                shippingAddress: {
                    address: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postalCode: token.card.addres_zip
                },
                orderAmount: subtotal,
                transactionId: payment.id,
                isDelivered: false


            })

            order.save(err => {

                if (err) {
                    return res.status(400).json({ message: 'Something went wrong' });
                }
                else {
                    res.send('Order Placed Successfully')
                }

            })
        }
        else {
            return res.status(400).json({ message: 'Payment failed' });
        }
    } catch (err) {
        return res.status(400).send("Error: " + err)
    }
})

router.post("/getordersbyuserid", (req, res) => {

    const userid = req.body.userid

    Order.find({userid: userid} , (err , docs)=>{

        if(err){
            return res.status(400).json({ message: 'something went wrong' });
        }
        else{
            res.send(docs)
        }

    })
  
});

router.post("/getorderbyid", (req, res) => {

    const orderid = req.body.orderid

    Order.find({_id: orderid} , (err , docs)=>{

        if(err){
            return res.status(400).json({ message: 'something went wrong' });
        }
        else{
            res.send(docs[0])
        }

    })
  
});

router.get("/getallorders", (req, res) => {

    Order.find({} , (err , docs)=>{

        if(err){
            return res.status(400).json({ message: 'something went wrong' });
        }else{
             res.send(docs)
        }

    })
  
});

module.exports = router
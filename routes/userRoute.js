require('dotenv').config();
const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const bcryptjs = require('bcryptjs');

router.post("/register", async (req, res) => {

    try{

        const user = await User.findOne({email: req.body.email})
        if(!user){
            const hashedPassword = await bcryptjs.hash(req.body.password, 10)
            const reguser = new User({
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword
            })
            await reguser.save()
            return res.send('User Registration success')
        }
        res.send('Something went wrong')
    } catch(err){
        console.log(err)
    }
})

router.post("/login", async (req, res) => {

    try{

        const user = await User.findOne({email: req.body.email})
        if(user){
            hashedPass = user.password
            if(await bcrypt.compare(req.body.password, hashedPass)){
                const loggedUser = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                }
                return res.send(loggedUser)
            } else{
                return res.status(400).json({ message: 'Invalid Credentilas' });
            }
        }
        return res.status(400).json({ message: 'Invalid Credentilas' });
    } catch(err){
        console.log(err)
    }
});

router.post("/update", (req, res) => {

    const { userid, updateduser } = req.body

    User.findByIdAndUpdate(userid, {
        name: updateduser.name,
        email: updateduser.email,
        password: updateduser.password
    }, (err) => {

        if (err) {
            console.log(userid);
            return res.status(400).json({ message: 'Something went wrong' + err });

        }
        else {
            res.send('User details updated successfully')
        }

    })

});

router.get("/getallusers", (req, res) => {

    User.find({}, (err, docs) => {

        if (err) {
            return res.status(400).json({ message: 'something went wrong' });
        }
        else {
            res.send(docs)
        }

    })

});

router.post("/deleteuser", (req, res) => {

    User.findByIdAndRemove(req.body.userid, (err) => {

        if (err) {
            return res.status(400).json({ message: 'Something went wrong' });
        }
        else {
            res.send('User deleted successfully')
        }

    })

});

router.post("/verify", async (req, res) => {

    try {

        // Step 1
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL || 'testing.purpose.1701@gmail.com', // TODO: your gmail account
                pass: process.env.PASSWORD || 'Riteeshram@$1' // TODO: your gmail password
            }
        });

        var email = req.body.email
        var name = req.body.name
        var code = Math.floor(Math.random() * 999999) + 10000

        // Step 2
        let mailOptions = {
            from: 'testing.purpose.1701@gmail.com', // TODO: email sender
            to: email, // TODO: email receiver
            subject: 'Verficiation Code From OneSpot',
            text: "Welcome " + name + "! the verification code is: " + code
        };

        // Step 3
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log('Error occurs');
            }
            console.log('Email sent!!!');
        });
        let text = code.toString();
        return res.status(201).send(text)

    } catch (err) {
        console.log(err)
    }
})

router.post('/checkemail', async(req, res)=>{

    try{
        const user = await User.findOne({email: req.body.email})
        if(user){
            return res.send("yes")
        }
        res.send("not")
    } catch(err){
        console.log(err)
    }
})

module.exports = router
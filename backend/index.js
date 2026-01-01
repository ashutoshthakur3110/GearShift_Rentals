const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3500;

const customerSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const Customer = mongoose.model('customer1',customerSchema);

mongoose.connect('mongodb://127.0.0.1:27017/Gearshift-Rentals')
  .then(()=>console.log("DB connected"))
  .catch(err=>console.log("DB error",err))

app.use(bodyParser.json());
app.use(cors());

app.post('/register', async(req,res)=>{
    const {email,password,name} = req.body;

    if(!email || !password || !name){
        return res.json({message : "All fields are required"});
    }

    const existingCustomer = await Customer.findOne({email});
    if(existingCustomer){
        return res.json({message : "user already exist"});
    }

    const json = {name,email,password};
    const newCustomer = new Customer(json);
    await newCustomer.save();
    res.json({message : "register success"});
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingCustomer = await Customer.findOne({ email });
        if (!existingCustomer) {
            return res.status(404).json({ message: "User does not exist" });
        }
        if (existingCustomer.password === password) {
            return res.status(200).json({ message: "Login success" });
        } else {
            return res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: 'Server error' });
    }
});

const bookingSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    pickupDate: Date,
    returnDate: Date,
    carType: String,
    createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('booking', bookingSchema);

app.post('/book', async (req, res) => {
    try {
        const { name, email, phone, pickupDate, returnDate, carType } = req.body;

        if (!name || !email || !phone || !pickupDate || !returnDate || !carType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBooking = new Booking({
            name,
            email,
            phone,
            pickupDate,
            returnDate,
            carType
        });

        await newBooking.save();
        return res.status(201).json({ message: "Booking successful" });
    } catch (err) {
        console.log("Booking error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

app.listen(port,()=>{
    console.log(`listning in ${port} number`);
})

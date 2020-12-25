const mongoose = require("mongoose");
const {ObjectId} = require("mongoose");
const product = require("./product");
const user = require("./user");

const productInCartSchema = new mongoose.Schema({
    product:{
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    quantity: Number,
    price: Number
})

const cartProduct = mongoose.model("cartProduct", productInCartSchema);

const orderSchema = new.mongoose.Schema({
    products: [productInCartSchema],
    transaction_id :{},
    amount:{
        type: Number,
        required: true,
    },
    //Added by me. I will work upon it
    quantity:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        trim: true
    },
    //Added by me. I will work upon it
    promoCode:{
        type: Number
    },
    updated: {Date},
    user:{
        type: ObjectId,
        ref: "User"
    }
}, 
    {timeStamps: true}
);

const Order = mongoose.model("Order", orderSchema);

modules.exports = mongoose.model(cartProduct , Order)
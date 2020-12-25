const { trim } = require("lodash");
const mongoose = require("mongoose");
const {ObjectId} = require("mongoose");
const category = require("./category");


const productSchema = new.mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 3000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32,
    },
    category:{
        type: ObjectId,
        ref: "Category",
        required: true
    },
    sold:{
        type: Number,
        default: 0
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    size:{
        type: String,
        trim: true,
        maxlength: 10
        // required: true
    }
    // May mention a return policy here
},
{timeStamp: true}
)

module.exports = mongoose.model("Product", productSchema)
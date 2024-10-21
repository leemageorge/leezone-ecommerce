
const mongoose = require("mongoose")

const addToCart = mongoose.Schema({
    productId : {
        ref: "product",
        type: String   
    },
    quantity: Number,
    userId: String
},
{
    timeStamps: true
}
)

const addToCartModal = mongoose.model("addToCart", addToCart)

module.exports = addToCartModal
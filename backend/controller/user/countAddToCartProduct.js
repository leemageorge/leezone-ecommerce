const addToCartModal = require("../../models/cartProducts")

const countAddToCartProduct = async(req,res)=>{
    try{

        const userId = req.userId

        const count = await addToCartModal.countDocuments({
            userId : userId
        })

        res.status(200).json({
            data: {count : count},
            message: "OK",
            error:false,
            success: true
        })

    }catch(err){
        res.status(500).json({
            message: err.message || err,
            error:true,
            success: false
        })
    }
}

module.exports = countAddToCartProduct
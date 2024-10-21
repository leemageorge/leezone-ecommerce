const productModal = require("../../models/productModal")

const searchProduct = async(req,res)=>{
    try{
        const query = req.query.q

        const regEx = new RegExp(query,"i","g")

        const product = await productModal.find({
            "$or": [
                {
                    productName: regEx
                },
                {
                    category: regEx
                }
            ]
        })

        res.status(200).json({
            message: "search product list",
            data: product,
            error: false,
            success: true
        })

    }catch(err){
        res.status(500).json({
            message: err.message || err,
            error : true,
            success: false
        })
    }
}

module.exports = searchProduct
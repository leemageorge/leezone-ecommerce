
const stripe = require("../../config/stripe")
const userModal = require("../../models/userModal")



const paymentController = async(request,response)=>{
    try{

        const { cartItems } = request.body

        const user = await userModal.findOne({_id: request.userId})

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            shipping_options: [
                {
                    shipping_rate: 'shr_1PkE42SE3cCp1GkNuHl1SUbg'
                }
            ],
            customer_email : user.email,
            metadata : {
                userId : request.userId
            },
            line_items : cartItems.map((item,index)=>{
                return{
                    price_data :
                     {
                        currency: 'inr',
                        product_data: 
                        {
                            name: item.productId.productName,
                            images : item.productId.productImage,
                            metadata: {
                                productId : item.productId._id
                            }
                    
                        },
                        unit_amount : item.productId.sellingPrice * 100
                    },
                    adjustable_quantity : {
                        enabled: true,
                        minimum : 1
                    }, 
                    quantity: item.quantity
                   
                }
            }),
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`

        }

        const session = await stripe.checkout.sessions.create(params)

        response.status(303).json(session)

    }catch(error){
        response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports = paymentController
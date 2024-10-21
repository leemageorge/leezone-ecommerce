const express = require("express")


const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require("../controller/user/userSignIn")
const userDetailsController = require("../controller/user/userDetails")
const userLogout = require("../controller/user/userLogout")
const allUsers = require("../controller/user/allUsers")
const updateUser = require("../controller/user/updateUser")
const uploadProductController = require("../controller/product/uploadProduct")
const getProductController = require("../controller/product/getProducts")
const updateProductController = require("../controller/product/updateProduct")
const authToken = require("../middlewares/authToken")
const getCategoryProduct = require("../controller/product/getCategoryProductOne")
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct")
const getProductDetails = require("../controller/product/getProductDetails")
const addToCartController = require("../controller/user/addToCartController")
const countAddToCartProduct = require("../controller/user/countAddToCartProduct")
const addToCartViewProduct = require("../controller/user/addToCartViewProduct")
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct")
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct")
const searchProduct = require("../controller/product/searchProduct")
const filterProductController = require("../controller/product/filterProduct")
const paymentController = require("../controller/order/paymentController")
const webhooks = require("../controller/order/webhook")
const orderController = require("../controller/order/orderController")



//SignUp
router.post("/signup", userSignUpController)

//SignIn
router.post("/signin", userSignInController)

//verifyToken
router.get("/user-details",authToken, userDetailsController)

//Logout

router.get("/userlogout", userLogout)

//admin panel
router.get("/all-user", authToken, allUsers)

//upadte user
router.post("/update-user", authToken, updateUser)

//upload new products
router.post("/upload-product", authToken, uploadProductController)

//get all products
router.get("/get-products", getProductController)

// update Product
router.post("/update-product", authToken, updateProductController)

//get product category
router.get("/get-categoryProduct",getCategoryProduct)

//get categoryWise Product
router.post("/category-product", getCategoryWiseProduct)

//get product details
router.post("/product-details", getProductDetails)

//user add to cart
router.post("/addtocart", authToken, addToCartController)

//count addtocart
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)


// view add to cart product
router.get("/view-cart-product",authToken,addToCartViewProduct)

//update add to cart product
router.post("/update-cart-product",authToken, updateAddToCartProduct)

//delete add to cart product
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

//search product
router.get("/search", searchProduct)

//filter product
router.post("/filter-product", filterProductController)

//payment and order
router.post("/checkout",authToken, paymentController)
//webhook
router.post("/webhook", webhooks) // api/webhook

// order details
router.get("/order-list", authToken,orderController)

module.exports = router
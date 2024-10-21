

const backendDomain = process.env.REACT_APP_BACKEND_URL

export const summaryApi = {

  signUP :{
    url:`${backendDomain}/api/signup`,
    method: "POST"
  },
  signIn:{
    url: `${backendDomain}/api/signin`,
    method: "POST"
  },
  currentUser:{
    url: `${backendDomain}/api/user-details`,
    method: "GET"
  },
  userLogout:{
    url:`${backendDomain}/api/userlogout`,
    method: "GET"
  },
  allUser: {
    url:`${backendDomain}/api/all-user`,
    method: "GET"
  },
  updateUser:{
    url: `${backendDomain}/api/update-user`,
    method: "POST"
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "POST"
  },
  allProduct:{
    url: `${backendDomain}/api/get-products`,
    method: "GET"
  },
  updateProduct :{
    url: `${backendDomain}/api/update-product`,
    method: "POST"
  },
  categpryProduct:{
    url: `${backendDomain}/api/get-categoryProduct`,
    method: "GET"
  },
  categoryWiseProduct : {
    url: `${backendDomain}/api/category-product`,
    method : "POST"
  },
  productDetails : {
    url: `${backendDomain}/api/product-details`,
    method: "POST"
  },
 addToCartProduct :{
  url: `${backendDomain}/api/addtocart`,
  method: "POST"
},
addToCartProductCount :{
  url: `${backendDomain}/api/countAddToCartProduct`,
  method: "GET"
},
addToCartProductView:{
  url: `${backendDomain}/api/view-cart-product`,
  method: "GET"
},
updateAddToCartProduct:{
  url: `${backendDomain}/api/update-cart-product`,
  method: "POST"
},
deleteAddToCartProduct: {
  url: `${backendDomain}/api/delete-cart-product`,
  method: "POST"
},
searchProduct: {
  url: `${backendDomain}/api/search`,
  method: "GET"
},
filterProduct: {
  url: `${backendDomain}/api/filter-product`,
  method: "POST"
},
payment: {
  url: `${backendDomain}/api/checkout`,
  method: "POST"
},
getOrder : {
    url : `${backendDomain}/api/order-list`,
    method:"GET"
}

}


 import App from "../App"
import {   createBrowserRouter} from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import ForgotPassword from "../pages/ForgotPassword"
import SignUp from "../pages/SignUp"
import AdminPanel from "../pages/AdminPanel"
import AllUsers from "../pages/AllUsers"
import AllProducts from "../pages/AllProducts"
import CategoryProduct from "../pages/CategoryProduct"
import ProductDetails from "../pages/ProductDetails"
import Cart from "../pages/Cart"
import SearchProduct from "../pages/SearchProduct"
import Success from "../pages/Success"
import Cancel from "../pages/Cancel"
import Orderpage from "../pages/Orderpage"

 const router  = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children:[
            {
                path:"",
                element: <Home />
            },
            {
                path:"login",
                element: <Login />
            },
            {
                path:"forgot-password",
                element: <ForgotPassword />
            },
            {
                path:"sign-up",
                element: <SignUp />
            },
            {
                path:"product-category",
                element:<CategoryProduct />
            },
            {   path:"product/:id",
                element: <ProductDetails />

            },
            {
                path: "cart",
                element: <Cart />

            },
            {
                path: "success",
                element: <Success />

            },
     
            {
                path: "cancel",
                element: <Cancel />

            },
            {
                path: "search",
                element: <SearchProduct />

            },
            {
                path: "order",
                element: <Orderpage />
            },
            {
                path:"admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    }
                ]
            }


        ]
    }
 ])

 export default router

 
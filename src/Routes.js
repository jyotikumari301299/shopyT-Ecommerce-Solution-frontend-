import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './core/Home';
import signup from './user/Signup';
import signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashBoard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import AddProduct from './admin/AddProduct';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';


 function Routes() {
  return (
   <BrowserRouter>
     <Switch>
       <Route exact path="/" component={Home} />
       <Route exact path="/signup" component={signup} />
       <Route exact path="/signin" component={signin} />
        <Route exact path="/cart" component={Cart} />
       <PrivateRoute path="/user/dashboard" component={UserDashBoard} />
       <AdminRoute path="/admin/dashboard" component={AdminDashBoard} />
       <AdminRoute  path="/admin/create/category" exact component={AddCategory} />
       <AdminRoute  path="/admin/create/product" exact component={AddProduct} />
       <AdminRoute path="/admin/categories" exact component={ManageCategories} />
       <AdminRoute path="/admin/products" exact component={ManageProducts} />
       <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />

     </Switch>
   </BrowserRouter>
  );
}


export default Routes;
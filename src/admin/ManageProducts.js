import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {getProducts, deleteProduct} from "./helper/adminapicall";

const ManageProducts = () => {

const [products, setProducts] = useState([]);

const {user, token} = isAuthenticated();
// we are going to preload into out  products so that as soon as the website loads up  or the component loads up we are gonna shoe that
const preload = () =>{
    getProducts()
    .then(data =>{ 
      console.log(data);
        if(data.error){
            console.log(data.error);
        }else{
            setProducts(data);
        }
    });
};

// useeffect me jo chize likhi hoti h wo component load hone se phle hi load ho jati h
useEffect(()=>{
    preload();
}, []);


//  delete product method
const deleteThisProduct = productId =>{
  deleteProduct(productId, user._id, token)
  .then(data =>{
    if(data.error){
      console.log(data.error);
    }else{
      preload();
    }
  });
}


  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}><span className="">Admin Home</span> </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>
          {products.map((product, index)=>(
              //* we are mentioning the key to make sure that everytime we are not looping througn the same object ,with the help of key we differentiate btw them
            <div key={index} className="row text-center mb-2 ">
            <div className="col-4">
             <h3 className="text-white text-left">{product.name}</h3>
            </div>
            <div className="col-4">
              <Link className="btn btn-success" to={`/admin/product/update/${product._id}`} ><span className="">Update</span>  </Link>
            </div>
            <div className="col-4">
              <button onClick={()=>{
                deleteThisProduct(product._id)
              }} className="btn btn-danger"> Delete </button>
            </div>
          </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;

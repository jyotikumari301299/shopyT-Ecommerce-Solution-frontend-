import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import ImageHelper from './helper/ImageHelper';



const Card = ({ product , addtoCart = true, removeFromCart = false, setReload= f =>f, reload= undefined}) => {
        
const [redirect, setRedirect] = useState(false);
 const [count, setCount] = useState(product.count);

// these variables are made becoz ifany1 doent pass anything these will be the default values
const cardTitle = product ? product.name : "default name";
const cardDescription = product ? product.description : "deafult description";
const cardPrice = product ? product.price : "default price";


//A method that  can add the object into the the cart
const addToCart = ()=>{
  addItemToCart(product, () =>{
    setRedirect(true)    //changing the state of redirect to true
  });
}

// using redirect state
const getARedirect = (redirect) =>{
  if(redirect){
    return <Redirect  to="/cart"  />
  }
}

  const showAddToCart = (addtocart) =>{
      return (
          addtoCart && (
              <button
              onClick={addToCart}      //using addToCart method we created above
              className="btn btn-block btn-outline-success mt-2 mb-2"
            >
              Add to Cart
            </button>
          )
      );
  }

  const showRemoveFromCart = (removeFromCart) =>{
      return (
          removeFromCart && (
              <button
              onClick={()=>{
                removeItemFromCart(product._id);
                setReload(!reload);
              }}
              className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
              Remove from cart
            </button>
          )
      );
  }

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
      {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">
            {showAddToCart(addtoCart)}
          </div>
          <div className="col-12">
            {showRemoveFromCart(removeFromCart)}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Card;
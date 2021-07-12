import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';


const StripeCheckout = ({products, setReload = f => f, reload= undefined}) =>{
    
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });
    // iss syntax me kyu ikha confused
    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    // method for calculating the total of our entire checkout process 
    const getFinalAmount = ()=>{
        let amount = 0;
        products.map(p => {
            amount = amount + p.price;
        });
        return amount;
    }

    const showStripeButton = ()=>{
        return isAuthenticated() ? (
            <button className="btn btn-success">Pay with Stripe</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        );
    }


    return (
        <div>
            <h3 className="text-white">stripe checkout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
};


export default StripeCheckout;

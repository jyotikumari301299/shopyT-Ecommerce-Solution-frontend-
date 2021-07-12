import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { getmeToken, processPayment } from './helper/paymentBhelper';
import {createOrder} from "./helper/orderHelper";
import { isAuthenticated } from '../auth/helper';

import DropIn from "braintree-web-drop-in-react";

const Paymentb = ({products, setReload = f=>f, reload= undefined}) => {
   
const [info, setInfo] = useState({
    loading: false, 
    success: false,
    clientToken: null,
    error: "",
    instance: {}
});

const userId = isAuthenticated() && isAuthenticated().user._id;
const token = isAuthenticated() && isAuthenticated().token;



const getToken = (userId, token) =>{
    getmeToken(userId, token).then(info =>{
        console.log("INFORMATION",info);
        if(info.error){
            setInfo({...info, error: info.error});
        }else{
            const clientToken = info.clientToken;
            console.log(clientToken);
            setInfo({ clientToken});
        }
    })
    .catch(err => console.log("new error",err));
};



useEffect(() => {
    getToken(userId, token);
}, []);
   
   
    return (
        <div>
            <h3>test for bt</h3>
        </div>
    )
};

export default Paymentb;



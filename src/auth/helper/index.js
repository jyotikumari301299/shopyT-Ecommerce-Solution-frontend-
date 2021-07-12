import {API} from '../../backend';
// API means; http://localhost:8000/api/

// bit new in the beginning but revise it
export const signup = user =>{
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "content-Type": "application/json"
        },
        // hm jo frontend se data bhej rhe h wo yha pr receive ho rha h user me
        body: JSON.stringify(user),
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
};



export const signin = user =>{
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>console.log(err));
};

// a token is being set which is jwt token ,if the user is suuccessfully signed in
// then with help of this function we are storing user info into browser i.e jwt
export const authenticate = (data, next) =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}


export const signout = next =>{
    // token removed from browser
    if(typeof window !== 'undefined'){
        localStorage.removeItem("jwt");
        next();
        
        return fetch(`${API}/signout`,{
            method: "GET"
        })
        .then(response => console.log("Signout Success"))
        .catch(err => console.log(err));
    }
};


// to validate that the user is signedin or not (it is going to return 0 or 1)
export const isAuthenticated = () =>{
    if(typeof window == "undefined")
    {
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else
    {
        return false;
    }
};


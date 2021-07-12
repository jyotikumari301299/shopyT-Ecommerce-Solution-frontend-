// // module 17 -lec 5
// // ye kuchh jyada smjh nhi aaya iss method me kya kia h
// export const addItemToCart = (item, next) =>{
//     let cart= [];
//     if(typeof window !== undefined){
//         if(localStorage.getItem("cart")){
//             cart = JSON.parse(localStorage.getItem("cart"));
//         }
//         cart.push({
//             ...item,
//             count: 1
//         })
//         localStorage.setItem("cart", JSON.stringify(cart));
//         next();
//     }
// };


// // mrthod for fetching all the cart information from localstorage

// export const loadCart = () =>{
//     if(typeof window !== undefined){
//         if(localStorage.getItem("cart")){
//             return JSON.parse(localStorage.getItem("cart"));
//         }
//     }
// };


// // remove item from cart
// export const removeItemFromCart = (productId) =>{
//     let cart = [];
//     if(typeof window !== undefined){
//         if(localStorage.getItem("cart")){
//             cart = JSON.parse(localStorage.getItem("cart"));
//         }
//         cart.map((product, index)=>{
//             if(product._id === productId){
//                 cart.splice(index, 1);
//             }
//         })
//         localStorage.setItem("cart", JSON.stringify(cart));
//     }
//     return cart;
// };

// // emptying out the cart once the payment is successfull so that ther is nothing inside that and then force reloads the component
// export const cartEmpty = next =>{
//     if(typeof window !== undefined){
//         localStorage.removeItem("cart");
//         next();
//     }
// };




export const addItemToCart = (item, next) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.push({
        ...item,
        count: 1
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  };
  
  export const loadCart = () => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart"));
      }
    }
  };
  
  export const removeItemFromCart = productId => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === productId) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  };
  
  export const cartEmpty = next => {
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
      next();
    }
  };
  
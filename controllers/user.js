
const User = require("../models/user");
const Order = require("../models/order");
const product = require("../models/product");

exports.getUserById = (req, res, next, id) =>{
    User.findById(id).exec( (err, user)=>{
        if(err || !user)
        {
            return res.status(422).json({
                error: "User Not Found"
            });
        }
        req.profile = user;
        next();
    });
}

exports.getUser = (req, res) =>{
    // TODO for password
    // hm in dono fields ko undefined se overrite islie kr rhe h kyunki  hme ye dono fields 
    // backend se browser ko nhi bhejna
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

// update user
exports.updateUser = (req, res)=>{
        console.log("errrrrrrrrrrr");
  User.findByIdAndUpdate(
    {_id: req.profile._id},
    {$set: req.body},
    {new: true, useFindAndModify: false},
    (err, user) =>{
      if(err){
        return res.status(400).json({
          error: "You are not authorized to update the user"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  )
};


exports.userPurchaseList = (req, res)=>{
  Order.find({user: req.profile._id})
  // error aae to yha change kro sir ki video se thoda alag likha h yha
  .populate("user").exec((err, order)=>{
    if(err){
      return res.status(400).json({
        error: "No Order in this account"
      });
    }
    return res.json(order);
  })
}
  
exports.pushOrderInPurchaseList = (req, res, next)=>{
  let purchases = [];
  req.body.order.products.forEach(produst =>{
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    });
  });
  // store this purchasesin DB
  User.findOneAndUpdate({_id: req.profile._id},
    {$push: {purchases: purchases}},
    {new: true},
    (err, purchases)=>{
      if(err){
        return res.status(400).json({
          error: "Unable to save purchase List"
        });
        next();
      }
    }
    )
  
}
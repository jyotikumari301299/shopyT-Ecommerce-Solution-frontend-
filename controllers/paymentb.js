const braintree = require("braintree");


var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId:   "bmhnkv5z538757rb",
    publicKey:    "dxp8djkppw2jxtpv",
    privateKey:   "9ee8003984c46b54c37f13df7098c20a"
  });


// method for generating token
exports.getToken = (req, res) =>{
    gateway.clientToken.generate({}, function(err, response){
        console.log("fefeeee");
        if(err){
            console.log("eeeeeeeeeee",err);
            res.status(500).send(err);
        }else{
            res.send(response);
        }
        });
};


// method for processing payment
exports.processPayment = (req, res)=>{
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
              res.status(500).json(err);
          }else{
              console.log("result is heerre",result);
              res.json(result);
          }
      });
};

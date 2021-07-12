const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({ 
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};

// CREATE PRODUCT
exports.createProduct = (req, res)=>{
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file)=>{
    if(err){
      return res.status(400).json({
        error: "Problem with image" 
      });
    }
    // destructure the fields
    const {name, description, price, category, stock} = fields;
    // validating
    if(!name || !description || !price || !category || !stock){
      return res.status(400).json({
        error: "Please include all the fields"
      });
    }


    // handling Fields
    let product = new Product(fields);

    // handling file here
    if(file.photo){
      if(file.photo.size > 3000000){
        return res.status(400).json({
          error: "Image size is too big"
        });
      }
      // if file is ok then include it in DB
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // saving to DB
    product.save((err, product)=>{
      if(err){
         return res.status(400).json({
          error: " Saving tshirt to DB Failed"
        });
      }
       return res.json(product);
    });
  });
};

// GET A PRODUCT
exports.getProduct = (req, res)=>{
  // this is working so simlpy only bcoz we have already grabbed the product based on productId with the help of parameter extractor
  // for below seee video some optimization of binary data
  req.product.photo = undefined;
  return res.json(req.product);
}


// middleware for photos bcz that is bulky lecture 10/11
exports.photo = (req, res, next)=>{
  if(req.product.photo.data){
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
}


// delete controller
exports.deleteProduct = (req, res)=>{
  let product = req.product;
  product.remove((err, deletedProduct)=>{
    if(err){
      return res.status(400).json({
        error: "Failed to delete product"
      });
    }
    res.json({
      message: "Deletion was Successful",
      deletedProduct
    });
  });
};

// update controller
exports.updateProduct = (req, res)=>{
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file)=>{
    if(err){
      return res.status(400).json({
        error: "Problem with image" 
      });
    }

    // below 2 lines are the only updation code
    let product = req.product;
    // done with the help of lodash
    // this fields are gonna be updated inside the product thats ywe r having a lodash
    product = _.extend(product, fields);

    // handling file here
    if(file.photo){
      if(file.photo.size > 300000){
        return res.status(400).json({
          error: "Image size is too big"
        });
      }
      // if file is ok then include it in DB
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // saving to DB
    product.save((err, product)=>{
      if(err){
         return res.status(400).json({
          error: " Updation of product Failed"
        });
      }
       return res.json(product);
    });
  });
};

// Product listing
exports.getAllProducts = (req, res)=>{
  // grabbing all products 
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
  .select("-photo")
  .populate("category")
  .sort([[sortBy, "asc"]])
  .limit(limit)
  .exec((err, products)=>{
    if(err){
      return res.status(400).json({
        error: "No Product Found"
      });
    }
    res.json(products);
  })
}


// getting all unique categories
exports.getAllUniqueCategories = (req, res) =>{
  Product.distinct("category", {}, (err, category) =>{
    if(err){
      return res.status(400).json({
        error: "NO category found"
      });
    }
    res.json(category);
  });
};

// middleware for stock and sold increment-decrement
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map(prod => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } }
      }
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed"
      });
    }
    next();
  });
};



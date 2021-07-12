require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// MY ROUTES
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBRoutes")

// DB CONNECTION
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

  
 // MY MIDDLEWARES
 app.use(bodyParser.json());
//  COOKIEPARSER HELPS U TO CREATE OR PUT SOME VALUES INTO COOKIES OR DELETE SOME VALUE FROM COOKIES.
app.use(cookieParser());
app.use(cors());

// MY MIDDLEWARES FOR ROUTES
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);


// PORT
const port = 8000;

// SERVER STARTED
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});





  
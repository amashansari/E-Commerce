const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyparser = require("body-parser");
app.use(bodyparser.json());

const userRoutes = require("./routes/users_login");
const productRoutes = require("./routes/product_data");

const orderRoutes = require("./routes/order_data");
const orderedDataRoutes = require("./routes/ordered_data");

const queryRoutes = require("./routes/user_query");

const adminRoutes = require("./routes/admin_login");

// const cartRoutes = require("./routes/cart_data");

//----------------------- GET USERS_LOGIN -----------------------\\
app.get("/", app.use(userRoutes));


//----------------------- POST USERS_LOGIN -----------------------\\
app.post("/", app.use(userRoutes));


//----------------------- VERIFY EXISTING USER -----------------------\\
app.post("/", app.use(userRoutes));


//----------------------- GET PRODUCT_DATA -----------------------\\
app.get("/", app.use(productRoutes));

//----------------------- POST PRODUCT_DATA -----------------------\\
app.post("/", app.use(productRoutes));


//----------------------- POST CART DATA -----------------------\\
// app.post("/", app.use(cartRoutes));


//----------------------- POST ORDER DATA -----------------------\\
app.post("/", app.use(orderRoutes));


//----------------------- GET ORDERED DATA -----------------------\\
app.get("/", app.use(orderedDataRoutes));


//----------------------- GET ALL ORDERED DATA -----------------------\\
app.get("/", app.use(orderedDataRoutes));


//----------------------- GET USER QUERY -----------------------\\
app.post("/", app.use(queryRoutes));
app.get("/", app.use(queryRoutes));


//----------------------- REGISTER ADMIN -----------------------\\
app.post("/",app.use(adminRoutes))

//----------------------- VERIFY ADMIN -----------------------\\
app.post("/",app.use(adminRoutes))




app.listen(8081, () => {
  console.log(`Running on port 8081`);
});

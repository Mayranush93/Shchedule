global.express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyparser =require('body-parser');
const validator = require("express-validator");
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public/"));
app.use(bodyparser.urlencoded({extended:false}));
app.use(expressLayouts);


//backend routers
const adminRouter = require("./routes/backend/adminRouter.js");


// frontend routing
const homeRouter = require("./routes/frontend/homeRouter.js");

// register routers
app.use("/admin", adminRouter);
app.use("/", homeRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});
app.listen(3000);

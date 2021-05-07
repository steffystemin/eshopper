const express = require("express");
const path = require("path");
var bodyParser = require('body-parser');
var shopper = require('./js/shoppers')



const app = express();
const port =20000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"images")));
app.use(express.static(path.join(__dirname,"css")));
app.use(express.static(path.join(__dirname,"js")));
app.use(express.static(path.join(__dirname,"fonts")));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
   extended: false
}));

/*
app.use(function(req, res, next) {
    if (req.path.substr(-1) == '/' && req.path.length > 1) {
        var query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
    } else {
        next();
    }
});
*/



app.get("/", (req, res) =>{
    res.render("index");
});

app.get("/index", (req, res) =>{
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/4-0-4", (req, res) => {
    res.render("4-0-4");
});

app.get("/blogs", (req, res) => {
    res.render("blogs");
});

app.get("/blog-single", (req, res) => {
    res.render("blog-single");
});

app.get("/basket", (req, res) => {
    res.render("basket");
});

app.get("/checkout", (req, res) => {
    res.render("checkout");
});

app.get("/contact-us", (req, res) => {
    res.render("contact-us");
});

app.get("/product_details", (req, res) => {
    res.render("product_details");
});

app.get("/products", (req, res) => {
    res.render("products");
});

app.get("/header", (req, res) => {
    res.render("header");
});

app.get("/footer", (req, res) => {
    res.render("footer");
});

app.get("/add-product", (req, res) => {
    res.render("addproduct");
});

app.post("/saveproduct", (req, res) => {
    
    shopper.addProduct(req, res);
    
});

app.listen(port, () => {
    console.log(`Example app listining at http://localhost:${port}`);
})
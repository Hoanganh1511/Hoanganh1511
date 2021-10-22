"use strict";

var express = require('express');

var router = express.Router(); // Get product model 

var Page = require('../models/page');

var Product = require('../models/product'); //GET ađ product to cart


router.get('/add/:product', function (req, res) {
  var slug = req.params.product;
  Product.findOne({
    slug: slug
  }, function (err, p) {
    if (err) console.log(err);

    if (typeof req.session.cart == "undefined") {
      req.session.cart = [];
      req.session.cart.push({
        title: slug,
        qty: 1,
        price: parseFloat(p.price).toFixed(2),
        image: '/product_images/' + p._id + '/' + p.image
      });
    } else {
      var cart = req.session.cart;
      var newItem = true;

      for (var i = 0; i < cart.length; i++) {
        if (cart[i].title == slug) {
          cart[i].qty++;
          newItem = false;
          break;
        }
      }

      if (newItem) {
        cart.push({
          title: slug,
          qty: 1,
          price: parseFloat(p.price).toFixed(2),
          image: '/product_images/' + p._id + '/' + p.image
        });
      }
    } //  console.log(req.session.cart);


    req.flash('success', 'Product added');
    res.redirect('back');
  });
}); // GET checkout page

router.get('/checkout', function (req, res) {
  res.render('checkout', {
    title: 'Checkout',
    cart: req.session.cart
  });
  console.log(req.session.cart);
}); // GET update product

router.get('/update/:product', function (req, res) {
  var slug = req.params.product;
  var action = req.query.action;

  for (var i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].title == slug) {
      switch (action) {
        case "add":
          req.session.cart[i].qty++;
          break;

        case "remove":
          req.session.cart[i].qty--;
          break;

        case "clear":
          req.session.cart.splice(i, 1);
          if (req.session.cart.length == 0) delete req.session.cart;
          break;

        default:
          console.log('update problem');
          break;
      }

      break;
    }
  }

  req.flash('success', 'Cart updated !');
  res.redirect('/cart/checkout');
}); //Get a page
//  router.get('/:slug',function(req,res){
//      var slug = req.params.slug;
//      Page.findOne({slug:slug},function(err,page){
//          if(err)
//             console.log(err);
//             if(!page){
//                 res.redirect('/');
//             }else{
//                 res.render('index',{
//                     title:page.title,
//                     content: page.content
//                 });
//             }
//             if(slug == "shopping"){
//                 Product.find({},function(err,product){
//                     if(err)
//                        console.log(err);
//                       else{
//                            res.render('index',{
//                                title:product.title,
//                                id:product._id,
//                                desc:product.desc,
//                                category:product.category,
//                                price:product.price,
//                                image:product.image
//                            });
//                        }
//                 })};
//      });
//  })
//Get a shopping page
// router.get('/:slug',function(req,res){
//     var slug = req.params.slug;
//     if(slug == "shopping"){
//         Product.find({},function(err,product){
//             if(err)
//                console.log(err);
//               else{
//                    res.render('index',{
//                        title:product.title,
//                        desc:product.desc,
//                        price:product.price,
//                        image:product.image
//                    });
//                }
//         });
//     }
// })
// Exports

module.exports = router;
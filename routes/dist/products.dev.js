"use strict";

var express = require('express');

var router = express.Router();

var Page = require('../models/page');

var Product = require('../models/product');

var Category = require('../models/category');

var fs = require('fs-extra');

var EvaluateProduct = require('../models/evaluateproduct'); //Get all products


router.get('/', function (req, res) {
  var nameproduct = req.query.nameproduct;
  Product.find(function (err, products) {
    if (err) console.log(err);
    Product.find({
      title: {
        $regex: '.*' + nameproduct + '.*'
      }
    }, function (err, ps) {
      if (err) console.log(err);

      if (ps.length >= 1) {
        res.render('index', {
          title: "Có " + ps.length + ' sản phẩm tìm thấy',
          content: ps.content,
          products: ps
        });
      } else {
        res.render('index', {
          title: 'Khong co san pham nao !',
          content: 'noo',
          products: []
        });
      }
    });
  });
}); //  Get products by category

router.get('/:category', function (req, res) {
  var categorySlug = req.params.category;
  Category.findOne({
    slug: categorySlug
  }, function (err, c) {
    Product.find({
      category: categorySlug
    }, function (err, products) {
      if (err) console.log(err);
      EvaluateProduct.findOne({
        titleproduct: req.query.title
      }, function (err, ep) {
        if (ep == null) {
          ep = [];
        } else {
          ep = ep;
        }

        res.render('cat_products', {
          title: c.title,
          content: products.content,
          products: products,
          es: ep
        });
      });
    });
  });
}); //  Get product details 

router.get('/:category/:product', function (req, res) {
  var galleryImages = null;
  var loggedIn = req.isAuthenticated() ? true : false;
  Product.findOne({
    slug: req.params.product
  }, function (err, product) {
    //Params là tham số truyền vào phía sau của url
    if (err) {
      console.log(err);
    } else {
      var galleryDir = 'public/product_images/' + product._id + '/gallery'; // Khai báo 1 đường dẫn để lấy gallery của product này ra

      fs.readdir(galleryDir, function (err, files) {
        // lưu các dữ liệu đọc được từ galleryDir vào ==> files
        if (err) {
          console.log(err);
        } else {
          EvaluateProduct.find({
            titleproduct: req.query.title
          }, function (err, ep) {
            if (ep == null) {
              ep = [];
            } else {
              ep = ep;
            }

            galleryImages = files; // gallaryImages lúc đầu rỗng , nhưng bây giờ đã có các ảnh trong đường dẫn thư mục 

            res.render('product', {
              title: product.title,
              p: product,
              es: ep,
              galleryImages: galleryImages,
              loggedIn: loggedIn
            });
          });
        }
      });
    }
  });
}); //  Get a page
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
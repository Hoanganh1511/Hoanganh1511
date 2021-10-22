
var express = require('express');
var router = express.Router();
var Page = require('../models/page');
var Product = require('../models/product');



router.get('/',function(req, res){
    Page.findOne({slug:'home'},function(err,page){
        if(err)
           console.log(err);

         
               res.render('index',{
                   title:page.title,
                   content: page.content
             

           });
    })
    
 });


 //Get a page

 router.get('/:slug',function(req,res){
     var slug = req.params.slug;

     Page.findOne({slug:slug},function(err,page){
         if(err)
            console.log(err);

            if(!page){
                res.redirect('/');
            }else{
                res.render('index',{
                    title:page.title,
                    content: page.content
                });

            }
            if(slug == "shopping"){
                Product.find({},function(err,product){
                    if(err)
                       console.log(err);
            
                      else{
                           res.render('index',{
                               title:product.title,
                               id:product._id,
                               desc:product.desc,
                               category:product.category,
                               price:product.price,
                               image:product.image
                           });
            
                       }
                })};
     });
     
   
     
 })

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
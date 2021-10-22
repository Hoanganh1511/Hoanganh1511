
var express = require('express');
var router = express.Router();
// Get product model 
var Page = require('../models/page');
var Product = require('../models/product');
var Order = require('../models/order');
var User = require('../models/user');

//GET ađ product to cart
router.post('/add/:product',function(req, res){

    var slug = req.params.product;
    var size = req.body.size;
    Product.findOne({slug:slug},function(err,p){
        if(err)
           console.log(err);

         if(typeof req.session.cart == "undefined"){
             req.session.cart = [];
             req.session.cart.push({
                 title:slug,
                size:size,
                 qty:1,
                 price: parseFloat(p.price).toFixed(2),
                 image:'/product_images/' + p._id + '/' + p.image
             });
             }else{
                 var cart = req.session.cart;
                 var newItem = true;

                 for(var i = 0; i< cart.length; i++){
                     if(cart[i].title == slug){
                         cart[i].qty++;
                         newItem = false;
                         break;
                     }
                 }
                 if(newItem){
                    cart.push({
                        title:slug,
                        qty:1,
                        size:size,
                        price: parseFloat(p.price).toFixed(2),
                        image:'/product_images/' + p._id + '/' + p.image
                    });
                 }

             }
            //  console.log(req.session.cart);
             req.flash('success', 'Product added');
             res.redirect('back');
         });
    
    
});

// GET checkout page
router.get('/checkout',function(req,res){

    if(req.session.cart && req.session.cart.length == 0){
        delete req.session.cart;
        res.redirect('/cart/checkout');
    }
    res.render('checkout',{
        
        title:'Checkout',
        cart: req.session.cart
    });
    
  
    console.log(req.session.cart);
    
});

//Get CART bill
router.get('/bill', function (req, res) {

    // var bill = "";
    // console.log('bbbbbbbbbbb');

    // res.render('checkout',{
    //     array: bill.split(','),
       

    // });

    // const bill = req.query.total;
    // const array = bill.split(',');
    // console.log(array);
})
router.post('/bill', function (req, res) {
    const nameproduct = req.body.nameProduct;
    const nameProductArray = nameproduct.split(",");
    //quantity
    const quantity = req.body.quantityProduct;
    const quantityProductArray = quantity.split(",");
    // const quantityProductArray = quantity.split(',');
    //price
    const totalPrice = req.body.totalPrice;
    const address = req.body.address;


    const detailOrder = [];
    for (i = 0; i < nameProductArray.length; i++) {
        let a = `${nameProductArray[i]}  x  ${quantityProductArray[i]}`;
        detailOrder.push(a);
    }
    console.log(detailOrder);
    User.findOne({ _id: req.session.passport.user }, function (err, user) {
        const nameUser = user.username;

         var newOrder = new Order({
                    userOrder:nameUser,
                    productOrder: nameProductArray,
                    quantityOrder:quantityProductArray,
                    totalOrder: totalPrice,
             detailOrder: detailOrder,
                    address:address,
                   statusOrder:"Chưa vận chuyển",
                });
                newOrder.save(function(err){
                    if(err) return console.log(err);
                   
                    req.flash('Thành công: ', 'Thanh toán thành công !');
                    res.redirect('checkout');
                })
    })
   
    
})


// GET update product
router.get('/update/:product',function(req,res){
        var slug =req.params.product;
   
        var cart = req.session.cart;
        var action = req.query.action;

        for(var i = 0; i < cart.length ; i++){
            if(cart[i].title == slug){
                switch(action) {
                    case "add":
                        cart[i].qty++;
                        break;
                    case "remove":
                        cart[i].qty--;
                        if(cart[i].qty==0){
                            cart.splice(i,1);
                        }
                        break;
                    case "clear":
                        cart.splice(i,1);
                        if(cart.length == 0) delete cart;
                        break;
                    default:
                        console.log('update problem');
                        break;
                }
                break;
            }
        }
      
        res.redirect('/cart/checkout');

});


// GET clear cart
router.get('/clear',function(req,res){

    delete req.session.cart;

    req.flash('Succes:','Cart Cleared !');
    res.redirect('/cart/checkout');
    
});

// GET buy now
router.get('/buynow',function(req,res){

    delete req.session.cart;

    res.sendStatus(200);
    
});



 //Get a page

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
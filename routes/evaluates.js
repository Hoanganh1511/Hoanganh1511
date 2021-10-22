
var express = require('express');
var router = express.Router();
var Page = require('../models/page');
var Product = require('../models/product');
var Category = require('../models/category');
var fs = require('fs-extra');


var Evaluate = require('../models/evaluate');
var EvaluateProduct = require('../models/evaluateproduct');
//  Get message

router.get('/comment',function(req, res){
    console.log('aaaaa22');
    var fullname = "";
    var email = "";
    var phone = "";
    var message = "";
    console.log('aaaa');
   res.render('index',{
       fullname: fullname,
       email: email,
       phone: phone,
       message: message
   })
  
        
        
 });
// POST message

 router.post('/comment',function(req, res){
    
    req.checkBody('fullname','name must have a value').notEmpty();
    req.checkBody('email','email must have a value').isEmail();
    req.checkBody('phone','phone must have a value').isNumeric();
    req.checkBody('message','Message must have a value').notEmpty();
    
    var fullname = req.body.fullname;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;
    console.log(fullname,email,phone,message);
    var errors = req.validationErrors();

    if(errors){
        
        console.log('errors', errors);
        req.flash(' ','Thong tin khong hop le');
        res.redirect('/../index#contact');
        
    }else{
       
          
                var eva = new Evaluate({
                    fullname: fullname,
                    email:email,
                    phone:phone, 
                   message:message
                });
                eva.save(function(err){
                    if(err) return console.log(err);
                    console.log('aaaaaaaa');
                    req.flash('Thành công: ', 'Send thanh cong !!');
                    res.redirect('/../index');
                })
            
           
    
    }
    
 });


 router.get('/love',function(req, res){
    console.log('aaaaa22');
    Page.findOne({slug:'home'},function(err,page){
        if(err)
           console.log(err);

        Evaluate.find(function(err,eva){
            if(err) console.log(err);
    
            else{
                res.render('love',{
                    eva:eva,
                    title:'',
                    content: ''
              
                })
            }
        })
        

           });
    });
   
//  Get detail comment

router.get('/vote/:title',function(req, res){
   
    var commentproduct = "dsađâsđâs";
    var userproduct = ""
    console.log('commentproduct');
   res.render('product',{
      commentproduct:commentproduct,
      userproduct:userproduct
      
   })
  
        
        
 });
 // POST comment product 
 router.post('/vote/:title',function(req, res){
    var commentproduct = req.body.commentproduct;
    var tt = req.params.title;
    var userproduct = req.body.userproduct;
    console.log(commentproduct);
    console.log(tt);
    console.log(userproduct);
    req.checkBody('commentproduct','name must have a value').notEmpty();

    req.checkBody('userproduct','userproduct must have a value').notEmpty();
 
   
    console.log(commentproduct);
    var errors = req.validationErrors();

    if(errors){
        
        console.log('errors', errors);
        req.flash(' ','Thong tin khong hop le');
        res.redirect('product');
        
    }else{
       
          
                var ep = new EvaluateProduct({
                    titleproduct: tt,
                  commentproduct: commentproduct,
                  userproduct: userproduct
                });
                ep.save(function(err){
                    if(err) return console.log(err);
                    console.log('aaaaaaaa');
                    req.flash('Thành công: ', 'Send thanh cong !!');
                    res.redirect('/../../index');
                })
            
           
    
    }
    
 });
module.exports = router;
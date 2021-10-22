
var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcryptjs');


var User = require('../models/user');
var Order = require('../models/order');

// Get register 
router.get('/register',function(req, res){
   res.render('register',{
       title:'Register'
   });
    
 });

// Post register 
router.post('/register',function(req, res){
   var name = req.body.name;
   var email = req.body.email;
   
   var username = req.body.username;
   
   var password = req.body.password;
    var phone = req.body.phone;
    var status = req.body.status;
    var avatar = req.body.avatar;
    var password2 = req.body.password2;
    
    req.checkBody('name','Vui lòng nhập tên của bạn !').notEmpty();// không để trống
    req.checkBody('email','Vui lòng nhập lại Email !').isEmail();// định dạng email có đúng hay không
    req.checkBody('username','Vui lòng nhập username !').notEmpty();
    req.checkBody('password','Vui lòng nhập mật khẩu của bạn !').notEmpty();
    req.checkBody('password2','Xác thực mật khẩu không trùng khớp !').equals(password);// password2 phải bằng với thằng password

    var errors = req.validationErrors();
     
    if(errors){
        res.render('register',{
            errors:errors,
            user:null,
            title:'Register'
            
        });
       
    }else{
        User.findOne({username:username},function(err,user){
            if(err) console.log(err);
            if(user){
                req.flash('danger','Username đã tồn tại, hay đặt tên khác !');
                res.redirect('/users/register');
            }
            else{
                var user = new User({
                    name:name,
                    email:email,
                    username:username,
                    password: password,
                    phone: phone,
                    status: status,
                    avatar:avatar,
                    admin: 0
                });
             
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(user.password, salt, function(err, hash){
                        if(err) console.log(err);

                        user.password = hash;

                        user.save(function(err){
                            if(err){
                                console.log(err);
                            }else{
                                req.flash('success','Đăng ký thành công, vui lòng đăng nhập !');
                                res.redirect('/users/login');
                            }
                        });
                    });
                });
            }

        })

    }
  });
 
// Get Login 
router.get('/login',function(req, res){
    if(res.locals.user) res.redirect('/');

    res.render('login',{
        title:'Login'
    });
     
  });
router.get('/profile', function (req, res) {
    // if(res.locals.user) res.redirect('/');
    const checkChange = false;
    // res.render('login',{
    //     title:'Login'
    // });

    // console.log(req.session.passport.user);
    const profileID = req.session.passport.user;
    User.findOne({ _id: profileID }, function (err, u) {
        if (err) console.log(err);
        Order.find({ userOrder: u.username },function (err, o) {
            console.log(o);
            
                   res.render('profile',{

                       user: u,
                       checkChange: checkChange,
                        order: o,
           
                    })
        })
   
    });




  });

// Post Login 
router.post('/login',function(req, res,next){
   passport.authenticate('local', {
       successRedirect:'/',
       failureRedirect:'/users/login',
       badRequestMessage:'Vui lòng không để trống ! <i class="bi bi-info-circle ps-2"></i>',
       failureFlash:true
   })(req, res, next);

   // 
     
  });

// Get LogOut 
router.get('/logout',function(req, res){
   req.logout();
  
   req.flash('Success','Bạn đã đăng xuất!');
   res.redirect('/../index');
   req.session.destroy();
  });

//Change password
// router.get('/change_password', function (req, res) {

//     res.render('change_password')
// })


router.get('/change_password',function(req, res){
    // if(res.locals.user) res.redirect('/');

    // res.render('login',{
    //     title:'Login'
    // });
    const checkChange = true;
   const repassword = req.body;
    console.log(repassword);
    // console.log(req.session.passport.user);
    const profileID = req.session.passport.user;
    User.findOne({_id:profileID},function(err, c){
      
            if(err) console.log(err);
              
            // console.log(c)
    
                   res.render('change_password',{
                    //    title:c.title,
                    //    content:products.content,
                    //    products:products,
                    //    es: ep,
                       user: c,
                       checkChange:checkChange,

           
                    })
   
    });




});
router.get('/change_email',function(req, res){
    // if(res.locals.user) res.redirect('/');

    // res.render('login',{
    //     title:'Login'
    // });
    const checkChange = true;
   const reemail = req.body;
    console.log(reemail);
    // console.log(req.session.passport.user);
    const profileID = req.session.passport.user;
    User.findOne({_id:profileID},function(err, c){
      
            if(err) console.log(err);
              
            // console.log(c)
    
                   res.render('change_email',{
                    //    title:c.title,
                    //    content:products.content,
                    //    products:products,
                    //    es: ep,
                       user: c,
                       checkChange:checkChange,

           
                    })
   
    });




});
router.get('/change_name',function(req, res){
    // if(res.locals.user) res.redirect('/');

    // res.render('login',{
    //     title:'Login'
    // });
    const checkChange = true;
   const rename = req.body;
    console.log(rename);
    // console.log(req.session.passport.user);
    const profileID = req.session.passport.user;
    User.findOne({_id:profileID},function(err, c){
      
            if(err) console.log(err);
              
            // console.log(c)
    
                   res.render('change_name',{
                    //    title:c.title,
                    //    content:products.content,
                    //    products:products,
                    //    es: ep,
                       user: c,
                       checkChange:checkChange,

           
                    })
   
    });




});
  

   router.post('/change_password',function(req, res){
       const repassword = req.body.repassword;
       console.log(repassword);

                User.findById(req.session.passport.user, function(err, u){
                    if(err) return console.log(err);
                    bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(repassword, salt, function(err, hash){
                        if(err) console.log(err);

                        u.password = hash;

                       u.save(function(err){
                        if(err) return console.log(err);
                      
                        req.flash('Thành công: ', 'Mật khẩu của bạn đã được thay đổi, đăng nhập lại để kiểm tra');
                        res.redirect('change_password');
                    })
                    });
                });
        });

   });
 
router.post('/change_email',function(req, res){
       const reemail = req.body.reemail;
       console.log(reemail);

                User.findById(req.session.passport.user, function(err, u){
                    if(err) return console.log(err);
                 

                        u.email = reemail;

                       u.save(function(err){
                        if(err) return console.log(err);
                      
                        req.flash('Thành công: ', 'Email của bạn đã được thay đổi');
                        res.redirect('profile');
                    })
                  
                });
       

});
 router.post('/change_name',function(req, res){
       const rename = req.body.rename;
       console.log(rename);

                User.findById(req.session.passport.user, function(err, u){
                    if(err) return console.log(err);
                 

                        u.name = rename;

                       u.save(function(err){
                        if(err) return console.log(err);
                      
                        req.flash('Thành công: ', 'Tên của bạn đã được thay đổi');
                        res.redirect('profile');
                    })
                  
                });
       

 });



router.get('/usercancelOrder/:id', function (req, res) {
           
    const id = req.params.id;

    Order.findOne({_id:id},function(err,o){
        o.statusOrder ="Đã hủy"
        
        o.save();
        req.flash('Thành công:', `Đã hủy đơn của ${o.userOrder}!`);
        res.redirect('/users/profile');
    });
});
 
router.get('/reOrder/:id', function (req, res) {
           
    const id = req.params.id;

    Order.findOne({_id:id},function(err,o){
        o.statusOrder ="Chưa vận chuyển"
       
        o.save();
        req.flash('Thành công:', `Đã hủy đơn của ${o.userOrder}!`);
        res.redirect('/users/profile');
    });
});
 
router.get('/removeOrder/:id', function (req, res) {
           
    const id = req.params.id;

    Order.findByIdAndRemove({_id:id},function(err,o){
        o.save();
        res.redirect('/users/profile');
    });
 });

module.exports = router;
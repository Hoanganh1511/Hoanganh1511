var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcryptjs');

module.exports = function(passport){
    passport.use(new LocalStrategy(function(username,password, done){
        
        User.findOne({username: username},function(err, user){
            if(err)
                return done(err);
             if(!user){
            
                return done(null, false, {message: 'Tài khoản hoặc mật khẩu không trùng khớp !'});
            }
            if (user.checkblock) {
                 return done(null, false, {message: 'Tài khoản của bạn đã bị khóa ! <a href="" class="user_block">Liên hệ</a>'});
            }
           

            bcrypt.compare(password, user.password,function(err,isMatch){
                if(err) console.log(err);
                // neu co trung khop voi mat khau cua user sau khi tim dc ben tren thi se return rra thang user
                if(isMatch){
                 
                    return done(null, user);
                    
                }else {
                   
                    return done(null, false, {message: 'Mật khẩu bạn nhập sai !'});
                
                }
            })
           
        });
    }));
    passport.serializeUser(function(user,done){
        done(null, user.id);
    })
    passport.deserializeUser(function(id,done){
        User.findById(id, function(err, user){
                done(err,user);

        });
    })
    
}
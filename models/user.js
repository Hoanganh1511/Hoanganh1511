var mongoose = require('mongoose');

//User Schema: Cấu trúc cho model
var UserSchema = mongoose.Schema({

       name: {
           type:String,
           required: true
       },
       email: {
        type:String,
        required:true
        
        },
        username: {
            type:String,
            required: true
        },
        password: {
            type:String,
            required: true
        },
        admin:{
            type:Number
        },
        phone: {
                type:Number,
        },
        status: {
            type: Boolean,
            default:true,
        },
         avatar: {
                type:String,
        },
         status: {
        type: String,
        default:"Hoạt động",
         },
                 checkblock: {
        type: Boolean,
        default:false,
    }

    

});

var User = module.exports = mongoose.model('User', UserSchema);


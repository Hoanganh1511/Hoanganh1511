var mongoose = require('mongoose');

//Product Schema: Cấu trúc cho model
var ProductSchema = mongoose.Schema({

       title: {
           type:String,
           required: true
       },
       slug: {
        type:String,
        
        },
        desc: {
            type:String,
           
        },
        category: {
            type:String,
            
        },
        size:{
            type:Array,
           
        },
        price: {
            type:Number,
           
        },
        image: {
            type:String,
            
         },
         quantity: {
            type:Number,
            
    },
    status: {
        type: Boolean,
        default:true,
         },
         created_at: {
             type: Date,
             default: Date.now
        },
        created_by: {
            type: String,
         }
        

});

var Product = module.exports = mongoose.model('Product', ProductSchema);


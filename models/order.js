var mongoose = require('mongoose');

//Page Schema: Cấu trúc cho model
var PageSchema = mongoose.Schema({
    userOrder: {
        type: String,
        required:true,
        },
       productOrder: {
           type:Array,
           required: true
       },
       
        totalOrder: {
            type:Number,
            required: true
    },
    address: {
        type: String,
        required: true,
        },
         detailOrder: {
        type: Array,
        required:true,
        },
        statusOrder: {
        type: String,
        required:true
    },
         created_at: {
             type: Date,
             default: Date.now
        },
        

});

var Order = module.exports = mongoose.model('Order', PageSchema);


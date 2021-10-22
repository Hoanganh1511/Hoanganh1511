var mongoose = require('mongoose');

//Category Schema: Cấu trúc cho model
var EvaluateSchema = mongoose.Schema({

       fullname: {
           type:String,
           required: true
       },
       email: {
        type:String,
        required:true
        },
        phone: {
            type:Number,
            required: true
        },
        message: {
            type:String,
            required: true
        },
        
});

var Evaluate = module.exports = mongoose.model('Evaluate', EvaluateSchema);


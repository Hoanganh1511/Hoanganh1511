var mongoose = require('mongoose');

//Category Schema: Cấu trúc cho model
var EvaluateProductSchema = mongoose.Schema({

           
    userproduct: {
        type:String,
        required: true
    },
    titleproduct: {
        type:String,
        required: true
    },
        commentproduct: {
            type:String,
            required: true
    },
    checkhidden: {
        type: Boolean,
        default:false,
    },
    status: {
        type: String,
        default:"Hiển thị",
    }
        
});

var EvaluateProduct = module.exports = mongoose.model('EvaluateProduct', EvaluateProductSchema);



// Require các module cần thiết
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');
// var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var fileUpload = require('express-fileupload');
var passport = require('passport');
//Connect to DB

mongoose.connect(config.database,{
    useNewUrlParser: true, useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // Thong bao ket noi thanh cong!
  console.log('Connected to MongoDB !!')
});

//Init app
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set thư mục public 
//Liên kết phần mềm trung gian cấp ứng dụng với 1 phiên bản của object: app
// express.static mong chờ tham số đầu tiên là một 'đường dẫn' của một thư mục, không phải là một tên tệp.
app.use(express.static(path.join(__dirname, 'public')));


//Set global erros variable

app.locals.errors = null;

//Get Page Model

var Page = require('./models/page');

// Get all pages to pass to header.ejs

Page.find({}).sort({sorting: 1}).exec(function(err, pages){
  if(err) {
    console.log(err);
  }else{
    app.locals.pages = pages;
  }
});


//Get Category Model

var Category = require('./models/category');

// Get all category to pass to header.ejs

Category.find(function(err, categories){
  if(err) {
    console.log(err);
  }else{
    app.locals.categories = categories;
  }
});


//Get Evaluate Model

var Evaluate = require('./models/evaluate');

// Get all category to pass to header.ejs

Evaluate.find(function(err, evaluates){
  if(err) {
    console.log(err);
  }else{
    app.locals.evaluates = evaluates;
  }
});


// //Get EvaluateProduct Model

var EvaluateProduct = require('./models/evaluateproduct');

// // Get all category to pass to header.ejs

// Evaluate.find(function(err, evaluates){
//   if(err) {
//     console.log(err);
//   }else{
//     app.locals.evaluates = evaluates;
//   }
// });

// Get Product Model
var Product = require('./models/product');

// Get all product to pass to header.ejs

Product.find(function(err, products){
  if(err) {
    console.log(err);
  }else{
    app.locals.products = products;
  }
});

// Express fileUpload middleware
app.use(fileUpload());


//Body Parser middlewware

// parse application/x-www-form-urlencoded

app.use(express.urlencoded({ extended: false}))
// parse application/json
app.use(express.json());

//Express Session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
  // cookie: { secure: true }
}));
 // Express Validator middlewware
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length){
            formParam += '['+ namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value:value
        };
    },
    customValidators: {
      isImage: function(value, filename){
        var extension = (path.extname(filename)).toLowerCase();
        switch(extension){
          case '.jpg':
                return '.jpg';
               
          case '.jpeg':
                return '.jpeg';
          case '.png':
                return '.png';
          case '':
                return '.jpg';
          default:
                return false;
        }
      }
    }
}));
 


//Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);

  next();
});


//Passport config
require('./config/passport') (passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*',function(req,res,next){
  res.locals.cart = req.session.cart;
  res.locals.user = req.user || null;
  next();
})


// Set routes
// var pages = require('./routes/pages.js');
// app.use('/',pages);
var pages = require('./routes/pages.js');
var products = require('./routes/products.js');
var evaluates = require('./routes/evaluates.js');
var cart = require('./routes/cart.js');
var users = require('./routes/users.js');
var adminPages = require('./routes/admin_pages.js');
var adminCategories = require('./routes/admin_categories.js');
var adminProducts = require('./routes/admin_products.js');
var adminOrders = require('./routes/admin_orders.js');
var adminUsers = require('./routes/admin_users.js');
var adminComments = require('./routes/admin_comment.js');

app.use('/admin/pages',adminPages);
app.use('/admin/categories',adminCategories);
app.use('/admin/products', adminProducts);
app.use('/admin/orders', adminOrders);
app.use('/admin/users', adminUsers);
app.use('/admin/comment',adminComments);
app.use('/products',products);
app.use('/evaluates',evaluates);
app.use('/search',products);
app.use('/cart',cart);
app.use('/users',users);
app.use('/',pages);

 


//Start the server
var port = 3000;
app.listen(port, function(){
    console.log('Server started on port ' + port);
})

var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var resizeImg = require('resize-img');


var auth = require('../config/auth');
var isAdmin = auth.isAdmin;

//GET Product model
var Product = require('../models/product');


// GET category model
var Category = require('../models/category');


// GET products index
router.get('/',isAdmin,function(req, res){
   var count;
   Product.count(function(err,c){
       count=c;
   });
   Product.find(function(err, products){
       res.render('admin/products',{
           products:products,
           count:count
       });
   })
 });




// GET add product
 router.get('/add-product',isAdmin,function(req, res){
    
    var title = "";
    var desc = "";
    var price = "";
    var quantity = "";
     var created_at
     var created_by
     var status
    Category.find(function(err,categories){
        
       
            res.render('admin/add_product',{
                title: title,
                desc: desc,
                quantity: quantity,
                categories:categories,
                price: price,
                status:status,
                created_at:created_at,
                created_by: created_by,
            });
        
  
        
        
 })});


/// POST add product
 router.post('/add-product',function(req, res){
    
    if (! req.files) {imageFile = ""; }
   if (req.files) {
 
        var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";
   };
    
    req.checkBody('title','Title không được để trống !').notEmpty();
    req.checkBody('desc','Description không được để trống !').notEmpty();
    req.checkBody('price','Price không được để trống !').isDecimal();
    req.checkBody('image','Bạn phải upload image !').isImage(imageFile);
   
    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();

    var desc = req.body.desc;
    var price = req.body.price;
    var size = req.body.size;
    var quantity = req.body.quantity;
     var status = req.body.status;
     var category = req.body.category;
  
    var errors = req.validationErrors();

    if(errors){
       
            Category.find(function(err,categories){
                res.render('admin/add_product',{
                    errors:errors,
                    title:title,
                    desc:desc,
                    categories:categories,
                    size:size,
                    price: price,
                    quantity:quantity,
                    status:status,
            
                });
               
           
        });
       
       
    }else{
        Product.findOne({slug:slug}, function(err,product){
            if(product){
                req.flash('danger', 'Product title đã tồn tại, hãy chọn giá trị khác')
               Size.find(function(err,sizes){
                Category.find(function(err,categories){
                    res.render('admin/add_product',{
                        
                        title:title,
                        desc:desc,
                        categories:categories,
                        size:size,
                        price: price,
                        quantity: quantity,
                        status:status,
                      
                
                    });
                    
                })
               })
            }else{
                var price2 = parseFloat(price).toFixed(2);
                var product = new Product({
                    title: title,
                    slug:slug,
                    desc:desc, 
                    price: price2,
                    size: size,
                    quantity:quantity,
                    category:category,
                    image: imageFile,
                    status:status,
                });
                console.log(size);
                product.save(function(err){
                    if(err) return console.log(err);

                    mkdirp('public/product_images/'+product._id, function(err){
                        return console.log(err);
                    });
                    mkdirp('public/product_images/'+product._id + '/gallery/', function(err){
                        return console.log(err);
                    });
                   mkdirp('public/product_images/'+product._id + '/gallery/thumbs', function(err){
                        return console.log(err);
                    })
                    if(imageFile != ""){
                        var productImage = req.files.image;
                        var path = 'public/product_images/' + product._id + '/' + imageFile;
                       
                        productImage.mv(path,function(err){
                            return console.log(err);
                        });
                    }

                    req.flash('Thành công: ', 'Added');
                    res.redirect('/admin/products');
                })
            }
            
            
        })
    }
    
 });




 // GET edit product
 router.get('/edit-product/:id',isAdmin,function(req, res){
    
    var errors;

    if(req.session.errors) 
    errors = req.session.errors;
    req.session.errors = null;


      
    Category.find(function(err,categories){
        Product.findById(req.params.id, function(err,p){
            if(err){
                console.log(err);
                res.redirect('/admin/products')
            } else{
                var galleryDir = 'public/product_images/' + p._id + '/gallery';
                var galleryImages = null;

                fs.readdir(galleryDir, function(err, files){
                    if(err){
                        console.log(err);
                    }else{
                        galleryImages = files;

                        res.render('admin/edit_product',{
                            title: p.title,
                            errors: errors,
                            desc: p.desc,
                            categories:categories,
                            category:p.category.replace(/\s+/g, '-').toLowerCase(),
                            price: parseFloat(p.price).toFixed(2),
                            sizes:p.size,
                            image: p.image,
                            galleryImages: galleryImages,
                            id: p._id
                            
                        });
                   
                    }
                });
            }
        
    

   
 });
  });
});

 // POST edit product
 router.post('/edit-product/:id',function(req, res){
    if (! req.files) {imageFile = ""; }
   if (req.files) {
 
        var imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";
   };
   
    
    req.checkBody('title','title must have a value').notEmpty();
    req.checkBody('desc','Description must have a value').notEmpty();
    req.checkBody('price','Price must have a value').isDecimal();

    req.checkBody('image','You must upload an image!').isImage(imageFile);

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();

    var desc = req.body.desc;
    var price = req.body.price;
    var size = req.body.size;
    var category = req.body.category;
    var pimage = req.body.pimage;
    var id = req.params.id;
   
    var errors = req.validationErrors();

    if(errors){
            req.session.errors = errors;
            res.redirect('/admin/products/edit-product/' +id);
    }else{
    
           
        Product.findOne({slug:slug, _id:{$ne:id}},function(err,p){
            if(err)
              console.log(err);
  
              if(p){
                  
                  req.flash('danger','Product title exist, choose another');
                  res.redirect('/admin/products/edit-product' +id);
              }else{
                  Product.findById(id,function(err,p){
                      if(err)
                          console.log(err);
  
                      p.title = title;
                      p.slug = slug;
                      p.desc = desc;
                      p.size = size;
                      p.price = parseFloat(price).toFixed(2),
                
                      p.category = category;
                          if(imageFile != ""){
                              p.image = imageFile;
                          }
                          p.save(function(err){
                              if(err) console.log(err);
  
                              if(imageFile != ""){
                                  if(pimage != ""){
                                      fs.remove('public/product_images/'+ id + '/' + pimage,function(err){
                                          if(err) 
                                              console.log(err);
                                      });
                                  }
                                  var productImage = req.files.image;
                                  var path = 'public/product_images/' + id + '/' + imageFile;
                                 
                                  productImage.mv(path,function(err){
                                      return console.log(err);
                                  });
                              }
                              req.flash('success', 'Product edited');
                              res.redirect('/admin/products/edit-product/' +id);
                          })
                  })
              }
        })
         
   }});


// POST product gallery
router.post('/product-gallery/:id' ,function(req, res){
   var productImage = req.files.file;

   var id = req.params.id;
   var path = 'public/product_images/' + id + '/gallery/' + req.files.file.name;
   var thumbsPath = 'public/product_images/' + id + '/gallery/thumbs/' + req.files.file.name;
    productImage.mv(path,function(err){
        if(err)
         console.log(err);

         resizeImg(fs.readFileSync(path),{width:200,height:200}).then(function(buf){
             fs.writeFileSync(thumbsPath, buf);
         });
    });

    res.sendStatus(200);
});
  

// GET delete image
router.get('/delete-image/:image',isAdmin ,function(req, res){
    var id = req.query.id;
    var originalImage = 'public/product_images/' + id + '/gallery/' + req.params.image;
    var thumbImage = 'public/product_images/' + id + '/gallery/thumbs' + req.params.image;
    fs.remove(originalImage,function(err){
        if(err){
            console.log(err);

        }else{
            fs.remove(thumbImage,function(err){
                if(err){
                    console.log(err);
                }else{
                    req.flash('success', 'Image Thumb deleted !');
                    res.redirect('/admin/products/edit-product/' +id);
                }
            })
        }
    })

});
// GET delete product
router.get('/delete-product/:id',isAdmin ,function(req, res){
        var id = req.params.id;


        var path = '/../public/product_images/' +  id + '/';
      
       
        fs.remove(path,function(err){
            if(err){
               
            } else {
                Product.findByIdAndRemove( id,function(err){
                    console.log(err);
                });
                req.flash('success', 'Product deleted !');
                res.redirect('/admin/products');

            }
        })
  });


// Exports

module.exports = router;
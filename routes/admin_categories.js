
var express = require('express');

var router = express.Router();
var auth = require('../config/auth');
var isAdmin = auth.isAdmin;

//GET Category model
var Category = require('../models/category')


// GET Category index
router.get('/',isAdmin,function(req, res){
    
    Category.find(function(err,categories){
        if(err) return console.log(err);

        res.render('admin/categories',{
            categories:categories
        })
    })
       
    
 });

// GET add Category
 router.get('/add-category',isAdmin,function(req, res){
   
    var title = "";
  

    res.render('admin/add_category',{
        title: title,
       

    });
 });

/// POST add Category
 router.post('/add-category',function(req, res){
    
    req.checkBody('title','title must have a value').notEmpty();
    
    
    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    
    var errors = req.validationErrors();

    if(errors){
        console.log('errors', errors);
        res.render('admin/add_category',{
            errors:errors,
            title:title,
            
    
        });
    }else{
        Category.findOne({slug:slug}, function(err,category){
            if(category){
                req.flash('Danger: ', 'TitleCat đã tồn tại, hãy chọn giá trị khác')
                res.render('admin/add_category',{
                    title: title,
                    
                });
            }else{
                var category = new Category({
                    title: title,
                   slug:slug
                });
                category.save(function(err){
                    if(err) return console.log(err);
                    Category.find(function(err, categories){
                        if(err) {
                          console.log(err);
                        }else{
                          req.app.locals.categories = categories;
                        }
                      });
                    req.flash('Thành công: ', 'Added Cat');
                    res.redirect('/admin/categories/');
                })
            }
            
            
        })
    }
    
 });


 // GET edit category

 router.get('/edit-category/:id',isAdmin,function(req, res){
    
    Category.findById(req.params.id, function(err,category){
        if(err) return console.log(err);

        res.render('admin/edit_category',{
            title: category.title,
            id: category._id,
        });
    })

   
 });

 // POST edit category
 router.post('/edit-category/:id',function(req, res){
    req.checkBody('title','Title không được bỏ trống !').notEmpty();
   
    
    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var id = req.params.id;

    var errors = req.validationErrors();

    if(errors){
       
        res.render('admin/edit_category',{
            errors:errors,
            title:title,
            id: id
        });
    }else{
        Category.findOne({slug: slug, _id:{'$ne':id}}, function(err,category){
            if(category){
                req.flash('danger', 'Category đã tồn tại, vui lòng nhập giá trị khác.');
                res.render('admin/edit_category',{
                    title: title,
                    id: id
                });
            }else{
               
                Category.findById(id, function(err, category){
                    if(err) return console.log(err);

                    category.title = title;
                    category.slug = slug;
                    

                    category.save(function(err){
                        if(err) return console.log(err);
                        Category.find(function(err, categories){
                            if(err) {
                              console.log(err);
                            }else{
                              req.app.locals.categories = categories;
                            }
                          });
                        req.flash('Thành công: ', 'Category Edited');
                        res.redirect('/admin/categories/edit-category/'+id);
                    })


                    
                });
         
            }
            
            
        });
    }
   });



   
// GET delete category
router.get('/delete-category/:id',isAdmin ,function(req, res){
   Category.findByIdAndRemove(req.params.id,(err)=>{
        if(err) return console.log(err);

        req.flash('Thành công:', `Deleted !`);
        res.redirect('/admin/categories/');
   })
 });
// Exports

module.exports = router;
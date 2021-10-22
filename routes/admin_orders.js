
var express = require('express');

var router = express.Router();
var auth = require('../config/auth');
var isAdmin = auth.isAdmin;

//GET Category model
var Category = require('../models/category')
var Order = require('../models/order')
// var Order = require('../models/order')
// GET Category index
router.get('/',isAdmin,function(req, res){
    
    Order.find(function(err,orders){
        if(err) return console.log(err);

        res.render('admin/orders',{
            orders:orders
        })
    })
       
    
 });
 router.get('/submitOrder/:id', isAdmin, function (req, res) {
    const id = req.params.id;

    Order.findOne({_id:id},function(err,o){
        o.statusOrder ="Đơn đã xuất kho"
        o.checkblock = true;
        o.save();
        req.flash('Thành công:', `Đã xuất đơn của ${o.userOrder}!`);
        res.redirect('/admin/orders');
    });
 });

  router.get('/cancelOrder/:id', isAdmin, function (req, res) {
    const id = req.params.id;

    Order.findOne({_id:id},function(err,o){
        o.statusOrder ="Đã hủy"
        o.checkblock = true;
        o.save();
        req.flash('Thành công:', `Đã hủy đơn của ${o.userOrder}!`);
        res.redirect('/admin/orders');
    });
 });




module.exports = router;
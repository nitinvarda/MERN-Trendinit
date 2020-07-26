var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var artic = require("./Schema");
var userdata = require("./userSchema");
var passport = require("passport");



router.get("/", function (req, res, next) {
    // console.log(hello);
    return artic
        .find({})
        .limit(10)
        .sort({ _id: -1 })
        .exec((err, data) => {
            if (err) console.error(err);

            res.json(data);
        });

})






router.get("/sports", function (req, res, next) {
    return artic
        .find({ category: "Sports" })
        .limit(10)
        .sort({ _id: -1 })
        .exec((err, data) => {
            if (err) console.error(err);

            res.json(data);
        });

})

router.get("/cinema", function (req, res, next) {
    return artic
        .find({ category: "Cinema" })
        .limit(10)
        .sort({ _id: -1 })
        .exec((err, data) => {
            if (err) console.error(err);

            res.json(data);
        });

})
router.get("/international", function (req, res, next) {
    return artic
        .find({ category: "International" })
        .limit(10)
        .sort({ _id: -1 })
        .exec((err, data) => {
            if (err) console.error(err);

            res.json(data);
        });

})
router.get("/politics", function (req, res, next) {
    return artic
        .find({ category: "Politics" })
        .limit(10)
        .sort({ _id: -1 })
        .exec((err, data) => {
            if (err) console.error(err);

            res.json(data);
        });

})
router.get("/technology", function (req, res, next) {
    return artic
        .find({ category: "Technology" })
        .limit(10)
        .sort({ _id: -1 })
        .exec((err, data) => {
            if (err) console.error(err);

            res.json(data);
        });

})

router.get("/others", function (req, res, next) {
    return artic
        .find({ category: "Others" })
        .limit(10)
        .sort({ _id: -1 })
        .exec((err, data) => {
            if (err) console.error(err);

            res.json(data);
        });

})


// admin

router.post(
    "/admin",
    passport.authenticate("local"), (req, res) => {
        req.session.username = req.body.username;
        // console.log(doc);
        res.send("authenticated");
    }
);






module.exports = router;
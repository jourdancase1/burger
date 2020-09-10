var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/burgers", function(req, res){
    burgers.selectAll(function(req, res){
        var hbsObject = {
            bugers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject)
    });
});

// create new burger
router.post("/bugers/create", function(req, res){
    burgers.insertOne([
        "burger_name"
    ],[
        req.body.burger_name
    ], function(data){
        res.redirect("/burgers");
    })
})

router.put("/burgers/update/:id", function(req, res){
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burgers.updateOne({
        "devoured": req.body.devoured
    }, condition, funciton(data){
        res.redirect("/burgers")
    })
})




// Export routes for server.js to use.
module.exports = router;
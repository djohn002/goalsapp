var express =           require("express"),
    app =               express(),
    bodyParser=         require("body-parser"),
    mongoose =          require ("mongoose"),
    Goal =          require("./models/dailygoals"),
    methodOverride=     require("method-override"),
    flash =             require("connect-flash");
    

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({encoded:true}));
app.use(methodOverride("_method"));
app.use(flash());

mongoose.connect('mongodb://localhost/dailyGoals', {useNewUrlParser: true});

//=========DAILY GOALS ROUTES=========

//==========INDEX -show all daily, long term, short term, weaknesses  ===============
app.get("/index", function(req,res){
    //Get all daily goals from DB & then render file
    Goal.find({},function(err,allGoals){
        if (err){
            console.log(err);
        } else {
            res.render("index",{dailyGoals:allGoals});
        }
    });
    
});

// ============ NEW ==============
app.get("/dailyGoal/new", function(req,res){
    res.render("newdailyGoal");
});

// ============ SHOWs info about each goal  ==============
app.get("/dailyGoal/:id", function(req,res){
    //finds & shows goal with provided ID
    Goal.findById(req.params.id, function(err,foundGoal){
        if (err) {
            console.log(err);
        } else {
            res.render("showdailyGoal", {dailyGoal:foundGoal});
            console.log(foundGoal);
        }
    });
});


//===========CREATE route ================
app.post("/dailyGoal", function(req,res){
    var goal = req.body;
    console.log(req.body);
    // var author = {
    //     id: req.user._id,
    //     username: req.user.username
    // }
    
    //Create new goals & post to database
    Goal.create(goal, function (err, newlyCreated){
        if (err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("index");
        }
    
    });
});

//==================EDIT======================
app.get("/dailyGoal/:id/edit", function(req,res){
    Goal.findById(req.params.id, function(err,founddailyGoal){
        if (err) {
            console.log (err);
        } else {
                res.render("editdailyGoal", {dailyGoal: founddailyGoal});
        }
});
});

//============UPDATE===============================
app.put("/dailyGoal/:id", function(req,res){
    Goal.findByIdAndUpdate(req.params.id, {$set:req.body}, function(err,updateddailyGoal){
        if (err){
            console.log(err);
        } else {
            console.log(Goal._id);
            console.log(req.body);
            console.log(req.params.id);
            console.log(Goal.goal);
            console.log(updateddailyGoal);
            res.redirect("/index");
        }
    });
});

//=============DELETE=========================
app.delete("/dailyGoal/:id", function(req,res){
    Goal.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err);
            res.redirect("/index");
        } else {
            console.log("delete successful");
            res.redirect("/index");
        }
    });
} );



//in node, we access environment variables with process.env.
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Goals app has started");
});
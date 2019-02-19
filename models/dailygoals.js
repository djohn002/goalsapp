var mongoose = require("mongoose");

//Schema setup 
var dailygoalsSchema = new mongoose.Schema ({
    goal: String,
    typeofGoal: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
});
module.exports = mongoose.model("Goal", dailygoalsSchema);
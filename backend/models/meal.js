const mongoose = require("mongoose")
const Joi = require("joi");
const { string, number } = require("joi");
const { postSchema } = require("./post");

const mealSchema = new mongoose.Schema({
    name: {type: String, default: ""},
    description: {type: String,  minlength: 1, maxlength: 420},
    meal:{type: String, maxlength: 420}, 
    post: [{type: postSchema}],
    image: {type: String, default: ""},
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = {
    mealSchema,
    Meal,
};
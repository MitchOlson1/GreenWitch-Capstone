const mongoose = require("mongoose")
const Joi = require("joi");
const { string, number } = require("joi");


const chefSchema = new mongoose.Schema({
    name: {type: String, default: ""},
    uID: {type: String, default: ""},
    post: {type: String, required: true, minlength: 1, maxlength: 420},
    dishes:{type: String, required: true, minlength: 1, maxlength: 420},
    image: { type: String, default: ""}
   

});

const Post = mongoose.model("Chef", chefSchema);

function validateChef(post) {
    const schema = Joi.object({
        post: Joi.string().required(),
        dishes:Joi.string(),
    });
    return schema.validate(reply);
}

module.exports = {
    chefSchema,
    Post,
    validateChef,
};
const mongoose = require("mongoose")
const Joi = require("joi");
const { string, number } = require("joi");


const chefSchema = new mongoose.Schema({
    chef: {type: String, default: ""},
    post: {type: String, required: true, minlength: 1, maxlength: 420},
    dishes:{type: String, required: true, minlength: 1, maxlength: 420},
    image: { type: String, default: ""}
});

const Chef = mongoose.model("Chef", chefSchema);

// function validateChef(chef) {
//     const schema = Joi.object({
//         chef: Joi.string().required(),
//         post: Joi.string().required(),
//         dishes:Joi.string(),
//     });
//     return schema.validate(chef);
// }

module.exports = {
    chefSchema,
    Chef,
};
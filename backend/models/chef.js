const mongoose = require("mongoose")
const Joi = require("joi");
const { string, number } = require("joi");
const { mealSchema } = require("./meal");


const chefSchema = new mongoose.Schema({
    chef: {type: String, default: ""},
    post: {type: String,  minlength: 1, maxlength: 420},
    meal:[{type: mealSchema}], 
    
   
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
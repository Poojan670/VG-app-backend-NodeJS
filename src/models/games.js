const mongoose = require('mongoose')
const Joi = require('joi')
const { categorySchema } = require('./category')
const { developerSchema } = require('./developer')

const Game = new mongoose.model('Game', new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50,
    },
    price: {
        type: Number,
        min: 5,
        max: 99,
        required: true
    },
    developer: {
        type: developerSchema,
        required: true
    },
    category: {
        type: categorySchema,
        required: true
    },
    soldCount: {
        type: Number, default: 0, immutable: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
}, { versionKey: false })
)

function validateGame(game) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        developerId: Joi.string().required(),
        categoryId: Joi.string().required(),
        price: Joi.number().required(),
        numberInStock: Joi.number().min(0).required()
    })
    return schema.validate(game)
}

exports.Game = Game;
exports.validate = validateGame;
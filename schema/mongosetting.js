'use strict'

// import the mongoose package
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/lovechina")

mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const lovechinaschema = new Schema({
        name: String,
        address: String,
        type: String,
        evidence: String,
        X: Number,
        Y: Number,
        description: String
})
exports.LoveChina = mongoose.model('LoveChina', lovechinaschema)

const nglovechinaschema = new Schema({
        name: String,
        address: String,
        type: String,
        evidence: String,
        description: String

})
exports.NgLoveChina = mongoose.model('NgLoveChina',nglovechinaschema)
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
        evidence: Array,
        X: Number,
        Y: Number,
        description: Array
})
exports.LoveChina = mongoose.model('LoveChina', lovechinaschema)

// create a model using the schema

const nglovechinaschema = new Schema({
        name: String,
        address: String,
        type: String,
        evidence: Array,
        description: Array

})
exports.NgLoveChina = mongoose.model('NgLoveChina',nglovechinaschema)
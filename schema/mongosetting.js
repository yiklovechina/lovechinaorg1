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
        description: Array,
        status: String
})
exports.LoveChina = mongoose.model('LoveChina', lovechinaschema)

// create a model using the schema

const lovehkschema = new Schema({
        name: String,
        address: String,
        type: String,
        evidence: Array,
        X: Number,
        Y: Number,
        description: Array,
        status: String
})

exports.Lovehk = mongoose.model('Lovehk',lovehkschema)

const ac = new Schema({
        Account:String,
        password:String
})
exports.ac = mongoose.model('ac',ac)
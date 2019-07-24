'use strict'


const schema = require('../schema/mongosetting')

exports.getlovechinaDetailtype = type => new Promise( (resolve, reject) => {
	schema.LoveChina.find({type: type}, (err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})

exports.getlovechinaDetailname = name => new Promise( (resolve, reject) => {
	schema.LoveChina.find({name: new RegExp(name,"i")}, (err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})

exports.getlovechinaDetailXY = data => new Promise( (resolve, reject) => {
	schema.LoveChina.find({ $and:[ {
        X: {
            $gt: data.X - 0.05,
            $lt: data.X + 0.05
        }
    },{ Y: {
        $gt: data.Y - 0.05,
        $lt: data.Y + 0.05
    }
    }]
    }, (err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
    })
    
})

exports.insertReportData = details => new Promise( (resolve, reject) => {
    if (!'name' in details && !'type' in details && !'address' in details && !'evidence' in details && !`description` in details) {
        reject(new Error('missing attribute'))
    } else {
        const NgLoveChina = new schema.NgLoveChina(details)
        NgLoveChina.save((err,NgLoveChina) => {
            if (err) {
                reject (new Error(err))
            }
            resolve("Successful")
        })
    }
})

exports.insertData = details => new Promise( (resolve, reject) => {
    if (!'name' in details && !'type' in details && !'address' in details && !'evidence' in details && !'X' in details && !'Y' in details && !`description` in detail) {
        reject(new Error('missing attribute'))
    } else {
        const LoveChina = new schema.LoveChina(details)
        LoveChina.save((err,LoveChina) => {
            if (err) {
                reject (new Error(err))
            }
            resolve("Successful")
        })
    }
})





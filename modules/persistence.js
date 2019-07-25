'use strict'


const schema = require('../schema/mongosetting')

exports.getlovechinaDetailtype = type => new Promise( (resolve, reject) => {
	schema.LoveChina.find({type:type}, (err, docs) => {
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



// Number Type can not search by normal method
exports.getlovechinaDetailXY = data => new Promise( (resolve, reject) => {
    console.log(data.X)
    console.log(data.Y)
    schema.LoveChina.find({$and:[{
    X: {
    $gte: parseFloat(data.X) - 0.02,
    $lt: parseFloat(data.X) + 0.02
}, Y: {
    $gte: parseFloat(data.Y) - 0.02,
    $lt: parseFloat(data.Y) + 0.02
}}]} 
    , (err, docs) => {
        if (err) reject(new Error('database error'))
        console.log(docs)
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


//here should be checked
exports.insertData = (details,checker) => new Promise( (resolve, reject) => {
    if (!'name' in details && !'type' in details && !'address' in details && !'evidence' in details && !'X' in details && !'Y' in details && !`description` in detail) {
        reject(new Error('missing attribute'))
    } else {
        details.X = (details.X == '') ? '0' : details.X
        details.Y = (details.Y == '') ? '0' : details.Y
        if (checker) {
            console.log("Insert Data 1 with true")
        const LoveChina = new schema.LoveChina(details)
        LoveChina.save((err,LoveChina) => {
            if (err) {
                reject (new Error(err))
            }
            resolve("Successful")
        })
    } else {
        //checked duplicate
        //added description,evidence 'array type to database
        schema.LoveChina.update({$and:[
            { name: new RegExp(details.name,"i"),
             X: {
                 $gte: parseFloat(details.X) - 0.02,
                 $lt: parseFloat(details.X) + 0.02
             },
             Y:{
                 $gte: parseFloat(details.Y) - 0.02,
                 $lt: parseFloat(details.Y) + 0.02
             }
         }]}, { $push: { evidence: details.evidence, description:details.description} } ,(err, docs) => {
            if (err) reject(new Error(err))
           resolve("Due to the duplicated data, Only the description and evidence will be import")
        })
    }
    }       
})


exports.getlovechinaDetailname = name => new Promise( (resolve, reject) => {
	schema.LoveChina.find({name: new RegExp(name,"i")}, (err, docs) => {
        if (err) reject(new Error('database error'))
		resolve(docs)
	})
})

//datalist = name , X , Y
exports.checkdata = datalist => new Promise ((resolve,reject) => {
    if (datalist.name == '' && datalist.X == '' && datalist.Y == '') {
        // can not be null for name+X+Y
        resolve(false)
    } else {
        datalist.X = (datalist.X == '') ? '0' : datalist.X
        datalist.Y = (datalist.Y == '') ? '0' : datalist.Y
        // name partial equals and X,Y parial equals (similar without 0.05,0.05) => false 
        //true = insert (ok record)
        //false = evidence and description array ++
        // ***** insert name will display the similar record  *****
        schema.LoveChina.find({$and:[
           { name: new RegExp(datalist.name,"i"),
            X: {
                $gte: parseFloat(datalist.X) - 0.02,
                $lt: parseFloat(datalist.X) + 0.02
            },
            Y:{
                $gte: parseFloat(datalist.Y) - 0.02,
                $lt: parseFloat(datalist.Y) + 0.02
            }
        }]}, (err, docs) => {
            if (err) reject(new Error('G9G ERROR'))
            if (docs.length <1) {
               // console.log("CheckData 1 True")
                resolve(true)
            } else {
              //  console.log("Check Data 2 False")
                resolve(false)
            }
        })
    }
})

//here should be checked







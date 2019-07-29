'use strict'


const schema = require('../schema/mongosetting')


exports.getlovechinaDetailtype = type => new Promise( (resolve, reject) => {
	schema.LoveChina.find({$and:[{type:type}, {status:"T"}]}, (err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})

exports.getlovechinaDetailname = name => new Promise( (resolve, reject) => {
	schema.LoveChina.find({$and:[{name: new RegExp(name,"i")},{status:"T"}]}, (err, docs) => {
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
}, status: "T"
}]} 
    , (err, docs) => {
        if (err) reject(new Error('database error'))
        console.log(docs)
		resolve(docs)
    })
    
})

//here should be checked
exports.insertData = (details,checker) => new Promise( (resolve, reject) => {
    if (!'name' in details && !'type' in details && !'address' in details && !'evidence' in details && !'X' in details && !'Y' in details && !`description` in detail) {
        reject(new Error('missing attribute'))
    } else {
        details.X = (details.X == '') ? '0' : details.X
        details.Y = (details.Y == '') ? '0' : details.Y
        details.status = "F"
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


//love hk part



// love hk (copy and paste)
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


exports.getlovehkdetailtype = type => new Promise( (resolve, reject) => {
	schema.Lovehk.find({$and:[{type:type}, {status:"T"}]}, (err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})

exports.getlovehkDetailname = name => new Promise( (resolve, reject) => {
	schema.Lovehk.find({$and:[{name: new RegExp(name,"i")},{status:"T"}]}, (err, docs) => {
        if (err) reject(new Error('database error'))
		resolve(docs)
	})
})

// Number Type can not search by normal method
exports.getlovehkDetailXY = data => new Promise( (resolve, reject) => {
    console.log(data.X)
    console.log(data.Y)
    schema.Lovehk.find({$and:[{
    X: {
    $gte: parseFloat(data.X) - 0.02,
    $lt: parseFloat(data.X) + 0.02
}, Y: {
    $gte: parseFloat(data.Y) - 0.02,
    $lt: parseFloat(data.Y) + 0.02
}, status: "T"
}]} 
    , (err, docs) => {
        if (err) reject(new Error('database error'))
        console.log(docs)
		resolve(docs)
    })
    
})

//here should be checked
exports.insertHKData = (details,checker) => new Promise( (resolve, reject) => {
    if (!'name' in details && !'type' in details && !'address' in details && !'evidence' in details && !'X' in details && !'Y' in details && !`description` in detail) {
        reject(new Error('missing attribute'))
    } else {
        details.X = (details.X == '') ? '0' : details.X
        details.Y = (details.Y == '') ? '0' : details.Y
        details.status = "F"
        if (checker) {
            console.log("Insert Data 1 with true")
        const Lovehk = new schema.Lovehk(details)
        Lovehk.save((err,Lovehk) => {
            if (err) {
                reject (new Error(err))
            }
            resolve("Successful")
        })
    } else {
        //checked duplicate
        //added description,evidence 'array type to database
        schema.Lovehk.update({$and:[
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




//datalist = name , X , Y
exports.checkHKdata = datalist => new Promise ((resolve,reject) => {
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
        schema.Lovehk.find({$and:[
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



//love hk (end of copy and paste)


//end of love hk part




//View China  "F"
exports.getlovechinaF = () => new Promise( (resolve, reject) => {
	schema.LoveChina.find({status:"F"}, (err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})

exports.getlovehkF = () => new Promise( (resolve, reject) => {
	schema.Lovehk.find({status:"F"}, (err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})

//View HK "F"


//update china & hk "F"

//update => "n" "nmodified" "ok"
// no update = nmodified = 0
exports.updatecn = data => new Promise( (resolve, reject) => {
    if (!'name' in data && !'X' in data && !'Y' in data) {
        reject(new Error('invalid object'))
    }
    data.X = (data.X == '') ? 0 : data.X
    data.Y = (data.Y == '') ? 0 : data.Y
	schema.LoveChina.updateOne({$and:[{name:data.name},{X:data.X},{Y:data.Y}]}, {status:"T"},(err, docs) => {
        if (err) reject(new Error('database error'))
		resolve(docs)
	})
})

exports.updatehk = data => new Promise( (resolve, reject) => {
    if (!'name' in data && !'X' in data && !'Y' in data) {
        reject(new Error('invalid object'))
    }
    data.X = (data.X == '') ? 0 : data.X
    data.Y = (data.Y == '') ? 0 : data.Y
	schema.Lovehk.updateOne({$and:[{name:data.name},{X:data.X},{Y:data.Y}]}, {status:"T"},(err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})
//update hk &china "F"



// delete part
exports.delcn = data => new Promise( (resolve, reject) => {
    if (!'name' in data && !'X' in data && !'Y' in data) {
        reject(new Error('invalid object'))
    }
    data.X = (data.X == '') ? 0 : data.X
    data.Y = (data.Y == '') ? 0 : data.Y
	schema.LoveChina.deleteOne({$and:[{name:data.name},{X:data.X},{Y:data.Y}]},(err, docs) => {
        if (err) reject(new Error('database error'))
		resolve(docs)
	})
})

exports.delhk = data => new Promise( (resolve, reject) => {
    if (!'name' in data && !'X' in data && !'Y' in data) {
        reject(new Error('invalid object'))
    }
    data.X = (data.X == '') ? 0 : data.X
    data.Y = (data.Y == '') ? 0 : data.Y
	schema.Lovehk.deleteOne({$and:[{name:data.name},{X:data.X},{Y:data.Y}]},(err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})
//delete part

//add ac
// exports.addAccount = details => new Promise( (resolve, reject) => {
// 	if (!'username' in details && !'password' in details ){
// 		reject(new Error('invalid user object'))
// 	}
// 	const ac = new schema.ac(details)

// 	ac.save( (err, ac) => {
// 		if (err) {
// 			reject(new Error('error creating account'))
// 		}
// 		delete details.password
// 		resolve(details)
// 	})
// })
//first add ac

//get ac
exports.getCredentials = credentials => new Promise( (resolve, reject) => {
	schema.ac.find({Account: credentials.Account}, (err, docs) => {
		if (err) reject(new Error('database error'))
		if (docs.length) resolve(docs)
		reject(new Error(`invalid username`))
	})
})
//get ac



//get type
exports.getlovechinatype = () => new Promise( (resolve, reject) => {
	schema.LoveChina.distinct(("type"), (err, docs) => {
        if (err) reject(new Error('database error'))
        // docs.map(element => {
        //   data2.push(element)
        //   console.log(element)
        // })
        resolve(docs)
    })
})
exports.getlovehktype = () => new Promise( (resolve, reject) => {
	schema.Lovehk.distinct(("type"), (err, docs) => {
        if (err) reject(new Error('database error'))
        resolve(docs)
    })
})
//end of get type

//update type
exports.updatetype = data => new Promise( (resolve, reject) => {
	schema.LoveChina.distinct(("type"), (err, docs) => {
        if (err) reject(new Error('database error'))
        console.log(docs)
		resolve(docs)
	})
})

exports.updatehktype = data => new Promise( (resolve, reject) => {
	schema.LoveChina.distinct(("type"), (err, docs) => {
        if (err) reject(new Error('database error'))
        console.log(docs)
		resolve(docs)
	})
})

//end of update type
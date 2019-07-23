const persistence = require('./modules/persistence')

exports.getDetaillbytype = (request, callback) => {
    extractParam(request, 'type')
	.then( type => persistence.getlovechinaDetailtype(type))
	.then( lovechina => this.getlovechina(request, lovechina))
	.then( lovechina => callback(null, lovechina))
	.catch( err => callback(err))
}

exports.getDetailbyname = (request, callback) => {
    extractParam(request, 'name')
	.then( name => persistence.getlovechinaDetailname(name))
	.then( lovechina => this.getlovechina(request, lovechina))
	.then( lovechina => callback(null, lovechina))
	.catch( err => callback(err))
}

exports.getDetailbyXY = (request, callback) => {
    let data = {}
    extractParam(request, 'X')
    .then(X => data.X = X)
    .then(()=> {
        return extractParam(request, 'Y')
    })
    .then (Y => data.Y = Y)
    .then(()=>persistence.getlovechinaDetailXY(data))
	.then( lovechina => this.getlovechina(request, lovechina))
	.then( lovechina => callback(null, lovechina))
	.catch( err => callback(err))
}

exports.reportData = (request, callback) => {
    let data = {}
	extractBodyKey(request, 'name')
	.then(name => data.name = name)
	.then (()=> extractBodyKey(request,'address'))
	.then(address => data.address = address)
	.then (()=>  extractBodyKey(request,'type'))
	.then(type => data.type = type)
	.then (()=> extractBodyKey(request,'evidence'))
    .then(evidence => data.evidence = evidence)
	.then(() => persistence.insertReportData(data))
	.then(data => {callback(null,data)})
	.catch( err => {callback(err)})
}

exports.insertData = (request, callback) => {
    let data = {}
	extractBodyKey(request, 'name')
	.then(name => data.name = name)
	.then (()=> extractBodyKey(request,'address'))
	.then(address => data.address = address)
	.then (()=>  extractBodyKey(request,'type'))
	.then(type => data.type = type)
	.then (()=> extractBodyKey(request,'description'))
    .then(description => data.description = description)
    .then (()=> extractBodyKey(request,'X'))
    .then(X => data.X = X)
    .then (()=> extractBodyKey(request,'Y'))
    .then(Y => data.Y = Y)
	.then(() => persistence.insertData(data))
	.then(data => {callback(null,data)})
	.catch( err => {callback(err)})
}

//for get param
const extractParam = (request, param) => new Promise( (resolve, reject) => {
	if (request.params === undefined || request.params[param] === undefined) reject(new Error(`${param} parameter missing`))
	resolve(request.params[param])
})
//for get param

//for post key
const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
	if (request.body[key] === "") reject(new Error(`${key} can not be null`))
	resolve(request.body[key])
})
//for post key

//get lovechina field
exports.getlovechina = (request, datagf) => new Promise( (resolve, reject) => {
	const clean = datagf.map(element => {
		return {
        	name: element.name,
            address: element.address,
            type: element.type,
            description: element.description,
            x: element.X,
            y: element.Y
		}
	})
	resolve({results: clean})
})
//end of get lovechina field
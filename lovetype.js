const persistence = require('./modules/persistence')
const auth = require('./modules/authorisation')

exports.gettype = (request, callback) => {
    let data1 = []
    let data2 = []
         persistence.getlovechinatype()
         .then( lovetype => data1 = lovetype)
          .then (() => persistence.getlovehktype())
          .then( lovehktype => data2 = lovehktype)
         // .then( () => data1.concat(data2.filter(function (item){ return data1.indexOf(item)<0})))
          .then(()=> this.returntypearray(request,data1,data2))
          .then( data1 => callback(null, data1))
          .then( data2 => callback(null,data2))
          .then(data => {
            callback(null,data)
            }).catch( err => {
            callback(err)
        })

}

//get lovechina field
exports.returntypearray = (request, data1,data2) => new Promise( (resolve, reject) => {
    let data3 = data1.concat(data2.filter(function (item){return data1.indexOf(item) <0}));
	resolve({type: data3})
})
//end of get lovechina field

exports.updatetype = (request, callback) => {
    let data = {}
    auth.getHeaderCredentials(request).then( credentials => {
        this.username = credentials.Account
        this.password = credentials.password
        return auth.hashPassword(credentials)
        }).then(credentials => {
            return persistence.getCredentials(credentials)
        }).then( account => {
            const hash = account[0].password
            return auth.checkPassword(this.password, hash)
        }).then( () => {
            return extractBodyKey(request, 'type')
        }).then( type => {
            data.type = type
        }).then( () => {
            return extractBodyKey(request, 'replacevalue')
        }).then( replacevalue => {
            data.replacevalue = replacevalue
        }).then(()=>{
            return persistence.updatetype(data)
        }).then( () => {
            return persistence.updatehktype(data)
        }).then(data => {
            callback(null,data)
        }).catch( err => {
            callback(err)
        })
    }

    
exports.deltype = (request, callback) => {
    auth.getHeaderCredentials(request).then( credentials => {
        this.username = credentials.Account
        this.password = credentials.password
        return auth.hashPassword(credentials)
        }).then(credentials => {
            return persistence.getCredentials(credentials)
        }).then( account => {
            const hash = account[0].password
            return auth.checkPassword(this.password, hash)
        }).then(() => persistence.getlovehkF()
         ).then( lovechina => this.getlovechina(request, lovechina))
          .then( lovechina => callback(null, lovechina))
          .then(data => {
            callback(null,data)
            }).catch( err => {
            callback(err)
        })

}



exports.getlovetype = (request, datagf) => new Promise( (resolve, reject) => {
	const clean = datagf.map(element => {
		return {
        	type: element.type
		}
	})
	resolve({results: clean})
})

const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
    if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
    resolve(request.body[key])
})

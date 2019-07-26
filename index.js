'use strict'

const restify = require('restify')
const server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.queryParser())
server.use(restify.authorizationParser())
server.use(restify.CORS());

server.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});
const lovechina = require('./lovechina.js')
const status = {
	ok: 200,
	added: 201,
	badRequest: 400
}
const defaultPort = 8000

server.get('/', (req, res, next) => {
	res.redirect('/lovechina', next)
})

//start 
//search by type
server.get('/lovechinabytype', (req, res) => {
	lovechina.getDetaillbytype(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})
//end of search by type

//search by partial name
server.get('/lovechinabyname', (req, res) => {
	lovechina.getDetailbyname(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})
//end of search by partial name

//search by X and Y(周圍的野)
server.get('/lovechinabyXY', (req, res) => {
	lovechina.getDetailbyXY(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})
//end of search

//Insert Data (比你班友仔submit)
server.post('/lovechinainsert', (req, res) => {
	lovechina.insertData(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'POST')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})





//love Hong Kong

//search by type
server.get('/lovehkbytype', (req, res) => {
	lovechina.getlovehkbytype(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})
//end of search by type

//search by partial name
server.get('/lovehkbyname', (req, res) => {
	lovechina.getlovehkbyname(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})
//end of search by partial name

//search by X and Y(周圍的野)
server.get('/lovehkXY', (req, res) => {
	lovechina.getlovehkbyXY(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})
//end of search

//report scheme (被借刀/澄清專用, ADMIN拎唔拎走佢既事) (LOVE HONG KONG)
server.post('/lovechinareport', (req, res) => {
	lovechina.reportData(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'POST')
		if (err) {
			res.send(status.badRequest, {error: err.message})   
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})


//end of report scheme

//end of insert data 

//server remove
//^_^

//display all "F" for admin lovehk love china
server.post('/Viewchinabyadmin', (req, res) => {
	lovechina.viewchina(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'POST')
		if (err) {
			res.send(status.badRequest, {error: err.message})   
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})

server.post('Viewhkbyadmin', (req, res) => {
	lovechina.viewhk(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'POST')
		if (err) {
			res.send(status.badRequest, {error: err.message})   
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})

server.post('addac', (req,res) => {
	lovechina.addac(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'POST')
		if (err) {
			res.send(status.badRequest, {error: err.message})   
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})

//display all "F" for admin 







//end 













const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log('App is ready at : ' + port)
	}
})
//done
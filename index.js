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

//report scheme (被借刀/澄清專用, ADMIN拎唔拎走佢既事)
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

//end of insert data 

//server remove
//view by admin 
//^_^



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
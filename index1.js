let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

const csvFilePath='Data2.csv'
const csv=require('csvtojson')

csv({
	colParser:{
		"X":"number",
		"Y":"number",
		}
})
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
	// Insert Json-Object to MongoDB
	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
	  if (err) throw err;
	  var dbo = db.db("lovechina");
	  dbo.collection("lovechinas").insertMany(jsonObj, (err, res) => {
		if (err) throw err;
		console.log("Number of documents inserted: " + res.insertedCount);
		/**
			Number of documents inserted: 5
		*/
		db.close();
	  });
	});
})
var express = require('express');
var router = express.Router();

var fs = require("fs"),
	json;

function readJsonFileSync(filepath, encoding){

		if (typeof (encoding) == 'undefined'){
				encoding = 'utf8';
		}
		var file = fs.readFileSync(filepath, encoding);
		return JSON.parse(file);
}

function getFile(file){
		var filepath = __dirname + '/' + file;
		return readJsonFileSync(filepath);
}

router.get('/', function(req, res, next) {

	json = getFile('squares.json');
	console.log(json);
	res.json(json);

});

router.post('/', function(req, res, next) {

	squares_req = req.body;
	fs.rename(__dirname +'/squares.json', __dirname +'/old_squares.json', function (err) {
	  if(err){ throw err};
	  console.log('renamed complete');
		fs.writeFile(__dirname + '/' + 'squares.json', JSON.stringify(squares_req), function (err) {
			if(err){ throw err};
		  console.log('news squares saved');
		});
	});
	
});

module.exports = router;

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

	json = getFile('tasks.json');
	console.log(json);
	res.json(json);

});

router.post('/', function(req, res, next) {

	tasks_req = req.body;
	console.log("tasks post",tasks_req);
	fs.rename(__dirname +'/tasks.json', __dirname +'/old_tasks.json', function (err) {
	  if(err){ throw err};
	  console.log('renamed complete');
		fs.writeFile(__dirname + '/' + 'tasks.json', JSON.stringify(tasks_req), function (err) {
			if(err){ throw err};
		  console.log('news tasks saved');
		});
	});

});

module.exports = router;

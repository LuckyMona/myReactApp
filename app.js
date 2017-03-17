var express = require('express');
var app = express();

app.use(express.static('src'));
app.use(express.static('node_modules'));
app.use(express.static('bootstrap-3.3.0'));
app.use(express.static('lib'));

app.post('/selectTemplate.html',function(req, res){
	res.writeHead(200,{"Content-Type":"text/plain"});
    res.end();
});

app.post('/showProjects.html',function(req, res){
	res.writeHead(200,{"Content-Type":"text/plain"});
    res.end();
});


app.post('/selectModule.html',function(req, res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end();
});

app.post('/copyModule.html',function(req, res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end();
});


app.post('/newModule.html',function(req, res){
	res.writeHead(200,{"Content-Type":"text/plain"});
    res.end();
});

app.post('/showDoc.html',function(req, res){
	res.writeHead(200,{"Content-Type":"text/plain"});
    res.end();
});

app.listen(3000, function() {
  console.log('Server started: http://localhost:3000/');
});

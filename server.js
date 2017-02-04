var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var methodOverride = require('method-override');
var http = require('http');
var https = require('https');
var port = process.env.port || 80;

var app = new express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'jade');

app.use(methodOverride());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.get('/*', function(req, res) {
    res.sendfile('./public/index.html');
});

nconf.env().file({ file: 'config.json' });

app.post('/authToken', function(req, res) {
    var url = 'https://app.vssps.visualstudio.com/oauth2/token';
    
    var postData = {
        client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: nconf.get("client_assertion"),
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        redirect_uri: "http://127.0.0.1:80",
        assertion: req.body.assertion
    };
    
    request.post({url:url, formData: postData}, function (error, response, body) {
        res.send(body);
    });
});

app.post('/refreshAuthToken', function(req, res) {
    var url = 'https://app.vssps.visualstudio.com/oauth2/token';
    
    var postData = {
        client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: nconf.get("client_assertion"),
        grant_type: "refresh_token",
        redirect_uri: "http://127.0.0.1:80",
        assertion: req.body.assertion
    };
    
    request.post({url:url, formData: postData}, function (error, response, body) {
        res.send(body);
    });
});

// app.listen(port, function() {
    
// });

var credentials = {key: "", cert: ""};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var nconf = require('nconf');

var app = new express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'jade');

app.get('/*', function(req, res) {
    res.render('index');
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

app.listen(80, function() {
    
});
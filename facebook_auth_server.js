//7811baa0351c95c98f63ea39149a7039 app secret
//708504379182163 app id
//
//var http = require('http');
//http.createServer(function (req, res) {
//  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.end('Hello World\n');
//}).listen(1337);
//console.log('Server running on port 1337');
var http = require('http');
var nconf = require('nconf');
var querystring = require('querystring');
nconf.argv().file({file:"config.json"});

var auth_url = "https://graph.facebook.com/oauth/authorize?";
var random_id =  makeid(12);
var facebook_params = {
    client_id: nconf.get("client_id"),
    state: random_id,
    redirect_uri: encodeURIComponent(nconf.get("redirect_uri")),
    scope: nconf.get("scope"),
    display: nconf.get("display"),
    response_type:nconf.get("response_type")//can be "code" or "token", code is used for server side auth, while token is client...
};

http.createServer(function (request, response) {
    if (request.url === "/favicon.ico") {
        //ignore icon requests from browser...
        response.writeHead(400);
        response.end();
        return;
    }

    //get GET query parameters
    var get_parameters = querystring.parse(request.url.slice(2));
    for (var key in get_parameters) {
        facebook_params[key] = get_parameters[key];
    }

    console.log(request.url);
    //console.log(facebook_params);
    var url = constructurl(auth_url, facebook_params);
    response.writeHead(200, {
        'Content-Length': url.length,
        'Content-Type': 'text/plain' });
    response.write(url);
    response.end();
}).listen(1337);


function makeid(length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function constructurl(url, params){
    var result = url + "?";
    for(var key in params){
        url = url + key + "=" + params[key] + "&";
    }
    url = url.slice(0,url.length-1);
    return url;
}
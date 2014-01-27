//7811baa0351c95c98f63ea39149a7039 app secret
//708504379182163 app id
//
//var http = require('http');
//http.createServer(function (req, res) {
//  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.end('Hello World\n');
//}).listen(1337);
//console.log('Server running on port 1337');
var nconf = require('nconf');
nconf.argv().file({file:"config.json"});

var auth_url = "https://graph.facebook.com/oauth/authorize?";
var random_id =  makeid(12);
var params = {
    client_id: nconf.get("client_id"),
    state: random_id,
    redirect_uri: encodeURIComponent(nconf.get("redirect_uri")),
    scope: nconf.get("scope"),
    display: nconf.get("display"),
    response_type:nconf.get("response_type")//can be "code" or "token", code is used for server side auth, while token is client...
};

console.log(constructurl(auth_url, params));

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
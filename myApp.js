const dns = require('dns');
const validUrl =  require('is-valid-http-url');
var urlp = require('url');
var urlArray = [];

var createShortUrl = function(url,res){
    if(validUrl(url)){
    console.log("url " + url);
    hostname = urlp.parse(url).hostname;
    dns.lookup(hostname, (err,add,family)=>{
        if(err){
            res.json({error: 'invalid url'});
        }else{
            valuesFound = urlArray.filter(ob => ob.original_url == url);
            let shortUrlObj;
            if(valuesFound && valuesFound.length > 0){
                shortUrlObj = valuesFound[0];
            }else{
                shortUrl = urlArray.length + 1;
                shortUrlObj = {original_url : url, short_url: shortUrl};
            urlArray.push(shortUrlObj);
        }
        res.json(shortUrlObj);
        }
    })
    }else{
        res.json({error: 'invalid url'});
    }
}

var redirectShortUrl = function(shorturl,res){
console.log("entered redirect" + shorturl);
    valuesFound = urlArray.filter(ob => ob.short_url == parseInt(shorturl));
    if(valuesFound && valuesFound.length > 0){
        res.redirect(valuesFound[0].original_url);
    }else{
        res.json({error: 'invalid url'});
    }
}

exports.createShortUrl = createShortUrl;
exports.redirectShortUrl = redirectShortUrl;
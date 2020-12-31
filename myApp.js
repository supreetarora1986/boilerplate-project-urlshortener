const dns = require('dns');
var urlp = require('url');
var urlArray = [];

var createShortUrl = function(url,res){
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
}

exports.createShortUrl = createShortUrl;
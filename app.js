var cheerio = require("cheerio");
var http    = require("http");
var request = require("request");
var fs      = require("fs");
var smiley  = [];

function saveSmilie(sm) {
    http.get("http://xat.com/images/sm2/" + sm + ".swf?r=2", function(res) {
        res.pipe(fs.createWriteStream('sm2/' + sm + '.swf'));
        console.log(sm + " has been saved.");
    });
}

function ScrapOther() {
    request(
        'https://util.xat.com/wiki/index.php?title=Free_smilies/Other',
        function (error, response, body) {
            var $ = cheerio.load(body);
            $(".plainlinks").each(function () {
                var smiliename = $('a', this).text();
                if (smiliename != "") {
                    smiley.push(smiliename);
                    saveSmilie(smiliename);
                }
            });
            fs.writeFile('smilie.txt', smiley, function(err, body) {
                console.log("Smilies json has been saved.");
            })
        }
    )
}

function ScrapSmilie() {
    request(
        'https://util.xat.com/wiki/index.php?title=Free_smilies',
        function (error, response, body) {
            var $ = cheerio.load(body);
            $(".plainlinks").each(function () {
                var smiliename = $('a', this).text();
                if (smiliename != "") {
                    smiley.push(smiliename);
                    saveSmilie(smiliename);
                }
            });
        }
    );
    ScrapOther();
}

ScrapSmilie();
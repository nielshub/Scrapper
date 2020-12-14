const request = require("request");
const cheerio = require("cheerio");

function scrapeItems(URL) {
  request(URL, function (err, res, body) {
    if (err) console.error(err);
    let $ = cheerio.load(body);

    const child = "a";
    const parent = ".productTitle";

    $(child, parent).each(function (i, elem) {
      if (this) {
        console.log(this.attribs);
      }
    });
  });
}

scrapeItems(
  "https://www.guitarcenter.com/Bass.gc"
);

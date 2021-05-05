const rp = require("request-promise");
const $ = require("cheerio");

exports.scraper = (req, res) => {
  console.log("[SCRAPER.]inside scraper");
  const url =
    "https://practice.geeksforgeeks.org/problems/check-for-bst/1/?company[]=Amazon&company[]=Amazon&problemType=functional&page=1&sortBy=submissions&query=company[]AmazonproblemTypefunctionalpage1sortBysubmissionscompany[]Amazon";

  rp(url)
    .then(function (html) {
      const response = $("#problems", html).html();
      res.send(response);
    })
    .catch(function (err) {
      res.statsu(500).json({
        error: err,
      });
    });

  // res.send("hi");
};

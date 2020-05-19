var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require("fs");
var filepath;
var solution;
app.use(bodyParser.json());
app.use(
    "/",
    express.static(__dirname)
);

app.use(express.urlencoded());
app.post('/solution', function (req, res) {
    console.log(req.body);
    readsolution(req.body);
    res.send(solution);
});
module.exports = app;
app.listen(8060);

function readsolution(object){
    filepath = object.problemtype + "/" + object.problemname + "/solution." + object.solutionlang;
    solution = fs.readFileSync(filepath, {encoding: "utf-8"});
}
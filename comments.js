// Create web server
var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

var template = require("./lib/template.js");
var path = require("path");
var sanitizeHtml = require("sanitize-html");

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var compression = require("compression");
var topicRouter = require("./routes/topic");
var indexRouter = require("./routes/index");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get("*", function (request, response, next) {
  fs.readdir("./data", function (error, filelist) {
    request.list = filelist;
    next();
  });
});

app.use("/", indexRouter);
app.use("/topic", topicRouter);

// app.get('/', function(request, response) {
//   fs.readdir('./data', function(error, filelist){
//     var title = 'Welcome';
//     var description = 'Hello, Node.js';
//     var list = template.list(filelist);
//     var html = template.HTML(title, list,
//       `<h2>${title}</h2>${description}`,
//       `<a href="/create">create</a>`
//     );
//     response.send(html);
//   });
// });

// app.get('/page/:pageId', function(request, response) {
//   fs.readdir('./data', function(error, filelist){
//     var filteredId = path.parse(request.params.pageId).base;
//     fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
//       var title = request.params.pageId;
//       var sanitizedTitle = sanitizeHtml(title);
//       var sanitizedDescription = sanitizeHtml(description, {
//         allowedTags:['h1']
//       });
//       var list = template.list(filelist);
//       var html = template.HTML(sanitizedTitle, list,
//         `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
//         `<a href="/create">create</a>
//          <a href="/update/${sanitizedTitle}">update</a>
//          <form action="/delete_process" method="post">
//            <input type="hidden" name="id" value="${sanitizedTitle}">
//            <input type="submit" value="delete">
//          </form>`
//       );
//       response


const http = require('http');

var dt  = require('./_modules/moduleOne');

var url = require('url');

var fs  = require('fs');

//const app  = require('./app');

//app.set('port', process.env.PORT || 3001);

//const server = http.createServer(app);

const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
/*
const server = http.createServer((req,res,next) =>
                                            {res.end('salam saha, hello world');
                                            });
                                            next();

server.listen(process.env.PORT || 3000);


function request(req, res)
{
  let uri = './files/'+req.url +'.txt';
  console.log(uri);
  fs.appendFile(uri, 'Hello content!', function (err)
                                                            {
                                                              if (err)
                                                                throw err;
                                                              console.log('Saved!');
                                                             }
                                                          );

    fs.readFile(uri, function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });


}
*/

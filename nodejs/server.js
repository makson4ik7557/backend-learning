const http = require('http');
http.createServer(function (request,response){
    let status = 200;
    let body = '';
    if(request.url === '/hello') body = 'Hello page';
    else if(request.url === '/') body = 'Home page';
    else{
        status = 404;
        body = '404 not found';
    }
    response.writeHead(status, {'Content-Type': 'text/plain'})
    response.end(body);
}).listen(3000);
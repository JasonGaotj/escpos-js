const http = require("http");
const receive = require("./index");

const server = http.createServer((req, res) => {
  console.log("收到请求", req.url);
  const url = req.url;
  switch (url) {
    case "/escpos":
      res.end(receive());
      break;
    default:
      res.statusCode = 404;
      res.statusMessage = "Not found";
  }
});

server.on("clientError", (err, socket) => {
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

server.listen(9001);

const http = require('http');

const port = 1245;

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello Holberton School!');
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});

module.exports = app;

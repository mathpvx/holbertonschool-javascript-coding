const http = require('http');
const fs = require('fs');
const path = require('path');

// Create the HTTP server
const app = http.createServer((req, res) => {
  const { url } = req;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (url === '/students') {
    const databaseFile = process.argv[2];

    if (!databaseFile) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('This is the list of our students\n');
    } else {
      readDatabase(databaseFile, (err, studentsInfo) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Cannot load the database');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(`This is the list of our students\n${studentsInfo}`);
        }
      });
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Function to read the database file and process its content
function readDatabase(filePath, callback) {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      const lines = data.split('\n').filter(line => line.trim() !== '');
      const students = [];
      const csStudents = [];
      const sweStudents = [];

      lines.slice(1).forEach(line => {
        const [firstname, lastname, age, field] = line.split(',');
        const student = { firstname, lastname, age, field };

        students.push(student);
        if (field === 'CS') {
          csStudents.push(student);
        } else if (field === 'SWE') {
          sweStudents.push(student);
        }
      });

      const studentsInfo = [
        `Number of students: ${students.length}`,
        `Number of students in CS: ${csStudents.length}. List: ${csStudents.map(s => s.firstname).join(', ')}`,
        `Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.map(s => s.firstname).join(', ')}`,
      ].join('\n');

      callback(null, studentsInfo);
    }
  });
}

// Listen on port 1245
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;

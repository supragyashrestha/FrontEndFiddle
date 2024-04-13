const express = require('express');
const path = require('path');
const app = express();
const currentProject = 'EmployeeDatabase'

app.use(express.static(path.join(__dirname, currentProject)));

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, currentProject, 'index.html'));
});

app.listen(8080, () => {
    console.log("Server successfully running on port 8080");
  });
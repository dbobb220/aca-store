const express = require('express');
const app = express();
app.listen(8080, (err) => {
    err ? console.log('Error:' + err) : app.use(express.static('public'));
});


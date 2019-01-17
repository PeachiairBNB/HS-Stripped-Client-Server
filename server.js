const express = require('express');
var listingsDBFinder = require('./mongoFinder.js');
var path = require('path');

// Middleware
const bodyParser = require('body-parser');

const app = express();
app.use('/:listingID', express.static(path.join(__dirname, './client/dist')));
console.log(__dirname + './client/dist');
app.use(bodyParser.json());



// Get images by Listing ID #
app.get('/api/pictures/:listingID', (req, res) => {
    let listingID = req.params.listingID;
    console.log(listingID)
    listingsDBFinder(listingID, (data) => {
        if(data){
            res.send(data);
        } 
    })
});

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

let port = 5050;
app.listen(port, function () {
    console.log(`listening on Port ${port}...`);
});

module.exports = app;
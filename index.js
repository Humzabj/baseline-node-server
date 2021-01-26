const express = require('express')
const app = express()
const port = 3001
var AWS = require('aws-sdk');
let awsConfig = require('./aws-config.js');

AWS.config.update(awsConfig);
let documentClient = new AWS.DynamoDB.DocumentClient();

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    var params = {
        TableName: "email_archive",
    }
    documentClient.scan(params, function (err, data) {
        if (err) {
            console.log(JSON.stringify(err))
            res.send(JSON.stringify(err))
        } else {
            console.log(JSON.stringify(data))
            res.send(JSON.stringify(data))
        }
    })
})

app.listen(port)
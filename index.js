  'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const { response } = require('express');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let token="EAANJgBYQmhcBAL0IsuyXQCWvRLpNkBTEZCfip6GuwjkZAW7tyctyTcQ6553ZC8TPezCZAVNOtxbNBRdZAZCuCj7uR87od9tfpdfYrZBZC9Qh4O7N9N4SloYi3Lp0WqI4ChZAvV0QxE1qjQAEjRBeqeIZBkhwlCp0A1FRWJzbAGgygLagZDZD"
app.get('/',function(req,res){
    res.send('hello world')
})

app.get('/webhook',function(req,res){
    if(req.query['hub.verify_token'] === 'sjsxqs76hgfhg5454gfdgfdJ'){
        res.send(req.query['hub.challenge'])
    }
    res.send('token non valid');
})

app.post('/webhook',function(req,res){
    console.log(req.body.entry[0].messaging[0])
    // let msg=req.body.entry[0].messaging;
    //     console.log("hgfhgttttttttttfhg"+req.body.entry)
    //     let sender=msg[0].sender.id;
    //     console.log("====))m="+req.body.entry[0])
    //     if(req.body.entry[0].messaging[0] && req.body.entry[0].messaging[0].text)
    //     sendText(sender,"Text hello"+req.body.entry[0].messaging[0].text)
    // console.log("test  +=++"+req.body.entry[0].messaging[0].sender.id)
    res.sendStatus(200);
})

function sendText(sender,text){
    let msgData = {text:text}
    request({
        url:"https://graph.facebook.com/v9.0/me/messages",
        qs:{access_token : token},
        method : "POST",
        json:{
            recipient:{id:sender},
            message:msgData
        }
    },function(error,response,body){
        if(error){
            console.log("sending error"+error)
        }
    })
}

app.listen(app.get('port'),function(){
    console.log('excution port');
})
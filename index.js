  'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const { response } = require('express');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

token="EAANJgBYQmhcBAL0IsuyXQCWvRLpNkBTEZCfip6GuwjkZAW7tyctyTcQ6553ZC8TPezCZAVNOtxbNBRdZAZCuCj7uR87od9tfpdfYrZBZC9Qh4O7N9N4SloYi3Lp0WqI4ChZAvV0QxE1qjQAEjRBeqeIZBkhwlCp0A1FRWJzbAGgygLagZDZD"
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
    let msg=req.body.entry[0].messaging_events;
    for(int i=0;i<msg.length;i++){
        let event = msg[i];
        let sender=event.sender.id;
        if(event.message && event.message.text){
            let text = event.message.text;
            sendText(sender,"Text "+ text.substring(0,100))
        }
    }
    res.sendStatus(200);
})

function sendText(sender,text){
    let msgData = {text:text}
    request({
        url:"https://graph.facebook.com/me/messages",
        qs:{access_token , token},
        method : "POST",
        json:{
            receipt:{id:sender},
            message:msgData
        }
    },function(error,esponse,body){
        if(error){
            console.log("sending error")
        }else if(response.body.error){
            console.log("error body")
        }
    })
}

app.listen(app.get('port'),function(){
    console.log('excution port');
})
// Import kafka-node and express module
var express = require('express');
var kafka = require('kafka-node');
var app = express();

// code to handle JSON in our api
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// create a kafka producer
var Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client);

// add some event handler for our producer
producer.on('ready', function () {
    console.log('Producer is ready');
});

producer.on('error', function (err) {
    console.log('Producer is in error state');
    console.log(err);
})

// create a simple route and test our api
app.get('/',function(req,res){
    res.json({greeting:'Kafka Consumer'})
});

app.listen(5001,function(){
    console.log('Kafka producer running at 5001')
});

//create a route which can post some message to the topic
/*{
   topic: 'topicName',
   messages: ['message body'], // multi messages should be a array, single message can be just a string or a KeyedMessage instance
   key: 'theKey', // only needed when using keyed partitioner (optional)
   partition: 0, // default 0 (optional)
   attributes: 2 // default: 0 used for compression (optional)
}
*/
app.post('/sendMsg',function(req,res){
    var sentMessage = JSON.stringify(req.body.message);
    payloads = [
        { topic: req.body.topic, messages:sentMessage , partition: 0 }
    ];
    producer.send(payloads, function (err, data) {
            res.json(data);
    });
    
})

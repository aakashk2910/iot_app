var express = require('express');
var router = express.Router();
var sensorData = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IOT App' });
});

/* Get Sensor Data */
/*router.get('/consumer', function(req, res, next) {
    var sensorData = [];
    var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client(),
    consumer = new Consumer(
        client,
        [
            { topic: 'weather', partition: 0 }
        ],
        {
            autoCommit: false
        }
    );
    consumer.on('message', function (message) {
        sensorData.push(message.value);
        console.log(message);
    });

    res.render('consumer', {title: 'IOT App', consumerData: JSON.stringify(sensorData.reverse())});
});*/

router.get('/consumer', function(req, res, next) {
var kafka = require('kafka-node')
var Consumer = kafka.Consumer
var client = new kafka.Client("localhost:2181/")
var consumer = new Consumer(
  client,
  [
	{ topic: 'weather', partition: 0, offset: 0 }
  ],
  {fromOffset: true}
);
var i=1;
consumer.on('message', function (message) {
	if(i<20){
		i++;
		sensorData.push(message.value);
	}
});
	i=0;
  	res.render('consumer', {title: 'IOT App', sensorData: sensorData});
});

module.exports = router;


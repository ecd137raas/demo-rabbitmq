const express = require('express');
const router = express.Router();
const amqp = require('amqplib/callback_api');

router.get('/msg', function (req, res, next) {
    res.status(200).send({
        title: "Node Express API",
        version: "0.0.1"
    });
});

router.post('/publish', function(req, res, next) {
	amqp.connect('amqp://localhost', function(error0, connection) {
		if (error0) {
    		throw error0;
  		}
  		connection.createChannel(function(error1, channel) {
		    if (error1) {
		      throw error1;
		    }
		    var queue = 'user-message';
		    var msg = 'Produto1, Produto2, Produto3';

		    channel.assertQueue(queue, {
		      durable: true
		    });

		    channel.sendToQueue(queue, Buffer.from(msg));
		    console.log(" [x] Enviado %s", msg);
		  });
		});
	setTimeout(function() { 
  		connection.close(); 
  		process.exit(0) 
  	}, 500);

});

router.post('/consumer', function(req, res, next) {
	amqp.connect('amqp://localhost', function(error0, connection) {
		if (error0) {
    		throw error0;
  		}
  		connection.createChannel(function(error1, channel) {
		    if (error1) {
		      throw error1;
		    }
		    var queue = 'user-message';

		    channel.assertQueue(queue, {
		      durable: true
		    });

		    console.log(" [*] Aguardando mensagens %s. To exit press CTRL+C", queue);
			channel.consume(queue, function(msg) {
  				console.log(" [x] Recebendo %s", msg.content.toString());
			}, {
    			noAck: true
  			});
		 });
	});
});
module.exports = router;
var 
http = require('http'),
SerialPort = require('serialport').SerialPort,
server = http.createServer(callback);
server.listen(1337, '127.0.0.1');
console.log('Server On');

function callback (req, res) {
	console.log('callback');
	//console.log(req.method);
	var out = "";
	
	req.setEncoding('utf8');
	req.on('data', function(data) {
        console.log('Incoming data');
        //hacky data extraction
		out += data.substring(5, data.length);
	});
	req.on('error', console.error);
	req.on('end', function() {
        console.log('End incoming data');
        console.log(out);
		sp = initSerial();
        //console.log(sp);
		sp.on('open', function () {
			sp.write(out, function(err, results) {
                if(err != undefined) {
                    console.log('ERR: ' + err);   
                    console.log('Results: ' + results);   
                }
			});
		});
	});
}

function initSerial() {
	return new SerialPort('/dev/tty.usbmodem1411', {
		baudRate: 4800,
		dataBits: 8,
		parity: 'none',
		stopBits: 1,
		flowControl: false
	});
}
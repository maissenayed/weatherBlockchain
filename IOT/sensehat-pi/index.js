imu = require('node-sense-hat').Imu;
var request = require('request');

IMU = new imu.IMU();
var dataCollected = { 
    "coord" : {
        "lng" : -7.36, 
        "lat" : 53.99, 
        "state_code" : "cn", 
        "country_code" : "ie"
    }, 
    "sys" : {
        "country" : "IE", 
        "sunrise" : "07:10 AM", 
        "sunset" : "08:00 PM"
    }, 
    "main" : {
        "temp" : 0, 
        "humidity" : 0, 
        "pressure" : 0
    }, 
     "state": {"oid":"5ab94b9205e4eb8522c4afdc"}, 
    "timestamp" : new Date()
    
};

setInterval(function() {
    var SenseHatPromise = new Promise((resolve, reject) => {
        IMU.getValue((err, data) => {
            if (err != null) {
                console.error('Could not read sensor data: ', err);
                return;
            }

            dataCollected.main.temp = data.temperature.toFixed(3);
            dataCollected.main.humidity = data.humidity.toFixed(3);
            dataCollected.main.pressure = data.pressure.toFixed(3);
            dataCollected.timestamp = new Date();

        })
        resolve(dataCollected);
    });
    SenseHatPromise.then(function(values) {
        SenseHatData(values);

    });
}, 3000);




function SenseHatData(alldata) {

    var options = {
        uri: 'http://express.270bytes.com:3030/api/weatherData',
        method: 'POST',
        json: alldata
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body.main) // Print the shortened url.
        } else {
            console.log(error)
        }
    });
}
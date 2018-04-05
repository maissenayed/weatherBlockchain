imu = require('node-sense-hat').Imu;
var request = require('request');

IMU = new imu.IMU();
var dataCollected = {
    "coord": {
        "lng": 1.39,
        "lat": 35.0,
        "state_code": "tu",
        "country_code": "tn"
    },
    "sys": {
        "country":{"oid":"5ab86c20fa40dea638993f50"},
        "sunrise": "5:30",
        "sunset": "6:00"
    },
    "main": {
        "temp": 1.5,
        "humidity": 89.0,
        "pressure": 1010.3
    },
    "timestamp": new Date(),
    "state": {"oid":"5ab94b9205e4eb8522c4afdc"}
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

        })
        resolve(dataCollected);
    });
    SenseHatPromise.then(function(values) {
        SenseHatData(values);

    });
}, 3000);




function SenseHatData(alldata) {

    var options = {
        uri: 'http://apicollector.nammumu.net:3002/weatherData',
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
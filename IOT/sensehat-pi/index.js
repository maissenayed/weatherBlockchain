imu = require('node-sense-hat').Imu;
var request = require('request');

IMU = new imu.IMU();
var dataCollected = {
    "coord": {
        "lng": 36.866537,
        "lat": 10.164723,
        "code": "TN-AR"
    },
    "sys": {
        "country": "TN",
        "sunrise": "sunData.sunrise",
        "sunset": "sunData.sunset"
    },
    "weather": {
        "id": 804.0,
        "main": "clouds",
        "description": "overcast clouds"
    },
    "main": {
        "temp": 0,
        "humidity": 0,
        "pressure": 0
    }
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
var mongoose = require('mongoose');
var uri = "mongodb://mongo-admin:270bytes@270bytescluster-shard-00-00-6dhzp.mongodb.net:27017," +
    "270bytescluster-shard-00-01-6dhzp.mongodb.net:27017," +
    "270bytescluster-shard-00-02-6dhzp.mongodb.net:27017/weather?" +
    "ssl=true&replicaSet=270bytesCluster-shard-0&authSource=admin";

mongoose.connect(uri);

const mongoose = require('mongoose');

module.exports=()=>{
    mongoose.connect('xx');
    mongoose.connection.on('open',()=>{
        console.log('MongoDB:connected');
    });
    mongoose.connection.on('error',(err)=>{
        console.log('MongoDB:Error',err);
    });

    mongoose.Promise = global.Promise;
};
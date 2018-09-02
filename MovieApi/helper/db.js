const mongoose = require('mongoose');

module.exports=()=>{
    mongoose.connect('mongodb://movie_admin:admin123@ds143262.mlab.com:43262/movie');
    mongoose.connection.on('open',()=>{
        console.log('MongoDB:connected');
    });
    mongoose.connection.on('error',(err)=>{
        console.log('MongoDB:Error',err);
    });
};
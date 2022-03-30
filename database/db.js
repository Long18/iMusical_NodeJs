const { use } = require('express/lib/application');
const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://remote:remote@123@imusical.biyuh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',     
        {
            useNewUrlParser:true,
            useUnifiedTopology: true
        }
        );
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err);
    }
};


module.exports = connectDB;

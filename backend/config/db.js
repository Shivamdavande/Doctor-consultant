const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        let res = await mongoose.connect(process.env.MONGO_URI);

        if (res) {
            console.log('Connected to MongoDB');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectDB;
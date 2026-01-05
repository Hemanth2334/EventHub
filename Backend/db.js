const mongoose = require('mongoose');
const mongoURI = 'replace thihs with your mongodb uri';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully!");


    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); 
    }
};

module.exports = mongoDB;

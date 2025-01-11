const mongoose = require('mongoose');
require('dotenv').config();

const MONGOURI = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.un4md.mongodb.net/<dbname>?retryWrites=true&w=majority`;
console.log(process.env.NAME)
const connectMongo = async () => {
    try {
        await mongoose.connect(MONGOURI);
        console.log("Connected to MongoDB Atlas successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectMongo;

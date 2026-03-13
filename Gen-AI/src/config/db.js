const mongoose = require('mongoose');

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Server is connected to Db");
  } catch (err) {
    console.log("Error connecting to the Db",err);
    process.exit(1);
  }
}

module.exports = connectDb;
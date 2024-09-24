const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Database connection error: ", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;

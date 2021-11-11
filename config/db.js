const mongoose = require('mongoose');

const connectDB = async() => {
  await mongoose.connect(process.env.MONGO_URI, {
    // userNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: true
  });

  console.log("MongoDB connected")
}

module.exports = connectDB;
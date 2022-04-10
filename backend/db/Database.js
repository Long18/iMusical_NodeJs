const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((data) => {
        console.log(`mongodb is connected with server: ${data.connection.host}`);
      });
  
      console.log("MongoDB Connected...........................");
    } catch (error) {
      console.error("MongoDB Can't connect");
      process.exit(1);
    }
  };

module.exports = connectDatabase
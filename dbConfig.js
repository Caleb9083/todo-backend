const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const DB = process.env.DATABASE_CONNECTION_STRING.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", true);

const dbConfig = () => {
  mongoose
    .connect(DB)
    .then(() => console.log(`Database connection successful`))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConfig;

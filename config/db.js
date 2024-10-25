
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on("error", (err) => console.log(err.message + "oooops there is an error"))
mongoose.connection.on("connected", () => console.log("connected to mongo"))
mongoose.connection.on("disconnected", () => console.log("disconnected from mongo"))
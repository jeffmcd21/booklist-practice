
// ** --- DEPENDENCIES --- ** //
require("dotenv").config();
require("./config/db.js") 
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const bookRouter = require("./routes/books.js");

const app = express();
const { PORT = 3013 } = process.env;
// const PORT = process.env.PORT || 3013;
const seedData = require("./models/seed.js")

const Book = require("./models/Book.js");


// ** --- MIDDLEWARE --- ** //
app.use((req, res, next) => {
    req.model = {
        Book,
        seedData
    }
    console.log("this is middleware")
    next()
})

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use("/public", express.static("public"))


// ** --- ROUTER --- ** //
app.use("/books", bookRouter);



// ** --- SERVER LISTENER --- ** //
app.listen(PORT, () => console.log(`Listening to the sounds of portman ${PORT}`));
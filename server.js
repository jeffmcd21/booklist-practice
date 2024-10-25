
// ** --- DEPENDENCIES --- ** //
require("dotenv").config();
require("./config/db.js") 
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");

const app = express();
const { PORT = 3013 } = process.env;
// const PORT = process.env.PORT || 3013;

const Book = require("./models/Book.js")


// ** --- MIDDLEWARE --- ** //
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))


// ** --- ROUTES & ROUTER --- ** //

// ** INDEX - GET
app.get("/books", async (req, res) => {
    let books = await Book.find({})
    res.render("index.ejs", {
        books: books.reverse()
    })
})

// ** NEW - GET
app.get("/books/new", (req, res) => {
    res.render("new.ejs")
})

// ** DESTROY - DELETE
app.delete("/books/:id", async (req, res) => {
    try {
        let deletedBook = await Book.findByIdAndDelete(req.params.id)
        res.redirect("/books")
    } catch (error) {
        res.status(500).send("something went wrong when deleting")
    }
})

// ** UPDATE - PUT
app.put("/books/:id", async (req, res) => {
    try{
        if (req.body.completed === "on") {
            req.body.completed = true
        } else {
            req.body.completed = false
        } 
        let updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )
        res.redirect(`/books/${updatedBook._id}`)
    } catch (error) {
        res.send("something went wrong with this route")
    }
})


// ** CREATE - POST
app.post("/books", async (req, res) => {
    try {
        if (req.body.completed === "on") {
            req.body.completed = true
        } else {
            req.body.completed = false 
        }
        let newBook = await Book.create(req.body)
        res.redirect("/books")
    } catch (err) {
        res.send(err)
    }
})

// ** EDIT - GET
app.get("/books/edit/:id", async (req, res) => {
    try {
        let foundBook = await Book.findById(req.params.id)
        res.render("edit.ejs", {
            book: foundBook
        })
    } catch (error) {
        res.send("Error found")
    }
})

// ** SHOW - GET
app.get("/books/:id", async (req, res) => {
    let foundBook = await Book.findById(req.params.id)
    res.render("show.ejs", {
        book: foundBook
    })
})



// ** --- SERVER LISTENER --- ** //
app.listen(PORT, () => console.log(`Listening to the sounds of portman ${PORT}`))
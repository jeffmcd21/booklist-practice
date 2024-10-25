
// ** --- DEPENDENCIES --- ** //
const express = require("express");
const router = express.Router();

// ** --- ROUTES & ROUTER (INDUCESS) --- ** //

// ** INDEX - GET
router.get("/", async (req, res) => {
    let books = await req.model.Book.find({})
    res.render("index.ejs", {
        books: books.reverse()
    })
});

// ** NEW - GET
router.get("/new", (req, res) => {
    res.render("new.ejs")
});

// ** DESTROY - DELETE
router.delete("/:id", async (req, res) => {
    try {
        let deletedBook = await req.model.Book.findByIdAndDelete(req.params.id)
        res.redirect("/books")
    } catch (error) {
        res.status(500).send("something went wrong when deleting")
    }
});

// ** UPDATE - PUT
router.put("/:id", async (req, res) => {
    try{
        if (req.body.completed === "on") {
            req.body.completed = true
        } else {
            req.body.completed = false
        } 
        let updatedBook = await req.model.Book.findByIdAndUpdate(
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
});


// ** CREATE - POST
router.post("/", async (req, res) => {
    try {
        if (req.body.completed === "on") {
            req.body.completed = true
        } else {
            req.body.completed = false 
        }
        let newBook = await req.model.Book.create(req.body)
        res.redirect("/books")
    } catch (err) {
        res.send(err)
    }
});

// ** EDIT - GET
router.get("/edit/:id", async (req, res) => {
    try {
        let foundBook = await req.model.Book.findById(req.params.id)
        res.render("edit.ejs", {
            book: foundBook
        })
    } catch (error) {
        res.send("Error found")
    }
});

// ** SEED - GET
router.get("/seed", async (req, res) => {
    try {
        await req.model.Book.deleteMany({})    

        await req.model.Book.create(
            req.model.seedData
        )

        res.redirect("/books")
    } catch (error) {
        res.send("something went wrong with the seeding")
    }
});


// ** SHOW - GET
router.get("/:id", async (req, res) => {
    let foundBook = await req.model.Book.findById(req.params.id)
    res.render("show.ejs", {
        book: foundBook
    })
});


module.exports = router;
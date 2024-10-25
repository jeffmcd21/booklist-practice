
// ** --- DEPENDENCIES --- ** //


// ** --- EXPORTS --- ** //
module.exports = {
    index,
    newForm,
    destroy,
    update,
    create,
    edit,
    seed,
    show
};


// ** --- ROUTE CONTROLLERS --- ** //

// ** INDEX - GET
async function index(req, res) {
    let books = await req.model.Book.find({})
    res.render("index.ejs", {
        books: books.reverse()
    })
};

// ** NEW - GET
async function newForm(req, res) {
    res.render("new.ejs")
};

// ** DESTROY - DELETE
async function destroy(req, res) {
    try {
        let deletedBook = await req.model.Book.findByIdAndDelete(req.params.id)
        res.redirect("/books")
    } catch (error) {
        res.status(500).send("something went wrong when deleting")
    }
};

// ** UPDATE - PUT
async function update(req, res) {
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
};

// ** CREATE - POST
async function create(req, res) {
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
};

// ** EDIT - GET
async function edit(req, res) {
    try {
        let foundBook = await req.model.Book.findById(req.params.id)
        res.render("edit.ejs", {
            book: foundBook
        })
    } catch (error) {
        res.send("Error found")
    }
};

// ** SEED - GET
async function seed(req, res) {
    try {
        await req.model.Book.deleteMany({})    

        await req.model.Book.create(
            req.model.seedData
        )

        res.redirect("/books")
    } catch (error) {
        res.send("something went wrong with the seeding")
    }
};

// ** SHOW - GET
async function show(req, res) {
    let foundBook = await req.model.Book.findById(req.params.id)
    res.render("show.ejs", {
        book: foundBook
    })
};
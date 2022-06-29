const { response } = require("../app");
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

router.get("/", async function (req, res) {
    const movies = await Movie.find({})
    res.render("movies/movies",{movies})
})

// all your routes here
router.get("/create", async function (req, res) {
    const celebrities = await Celebrity.find({})
    res.render("movies/new-movie",{celebrities})
})

router.post("/create", async function (req, res) {
    try {
        console.log(req.body)
        const movies = await Movie.create({...req.body})
        console.log(movies)
        res.redirect("/movies")
    } catch (error) {
        console.log(error);        
    }
})

router.get("/:id", async function (req, res) {
    try {
        console.log("Entra")
        const movie = await Movie.findById(req.params.id)
        .populate('cast')
        console.log("Movie",movie)
        res.render("movies/movie-details", {movie})
    } catch (error) {
        console.log(error);
    }
})

router.post("/:id/delete", async function (req, res) {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id)
        console.log(movie)
        res.redirect("/movies")
        
    } catch (error) {
        console.log(error);
    }
})

router.get("/:id/edit", async function (req, res) {
    console.log("EntraEdit")

    try {
        const movie = await Movie.findById(req.params.id).populate("cast")
        const idArray = movie.cast.map(cast=>cast._id)
        const notInCast = await Celebrity.find({_id:{$not:{$in:idArray}}})
        res.render("movies/edit-movie",{movie,notInCast})
    } catch (error) {
        console.log(error);
    }
})

router.post("/:id/edit", async function (req, res) {
    const movie = await Movie.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
    console.log("Updated",movie)
    res.redirect(`/movies/${req.params.id}`)
})





module.exports = router;
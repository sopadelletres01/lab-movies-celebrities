const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here
router.get("/", async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find({})
        console.log(celebrities);
        res.render("celebrities/celebrities",{celebrities})
    } catch (error) {
        
    }
})

router.get("/create",(req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/create", async (req, res, next) => {
    try {
        const data = req.body
        const cel = await Celebrity.create({...data})
        console.log("cel",cel)
        res.redirect("/celebrities")
    } catch (error) {
        console.log(error)
        res.render("celebrities/new-celebrity")
    }
})

module.exports = router;
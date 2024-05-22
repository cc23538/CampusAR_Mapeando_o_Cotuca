const express = require("express")
const app = express()

const bodyParser = require("body-parser")

const rotas = require("../app/rotas/rotas")
rotas(app)

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

module.exports = app
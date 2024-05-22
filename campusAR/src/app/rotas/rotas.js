module.exports = (app) =>{
    app.use((req, res, next) =>{
        res.header("access-Control-Allow-Origin", "*")
        next()
    })

    app.get("/home", (req, res) => {
        console.log("rota /HOME")
        res.send("Olhe a console!")
    })


}
const express = require("express")
const app = express()
const port = 3000
var bodyParser = require("body-parser")

const routes = require("./routes/routes")

const mongoose = require("mongoose")
mongoose
  .connect("mongodb://localhost:27017/nutriologa-jocelyn", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes: true,
  })
  .then(re => {
    console.log("[ INFO ] Conectado a la BD")
  })
  .catch(err => {
    console.log(`err`, err)
  })

app.use(bodyParser.json())
app.use(routes)

app.use((err, req, res, next) => {
  res.send(err)
})

app.listen(port, () => {
  console.log(`Escuchando: ${port}`)
})

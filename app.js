const express = require("express")
const app = express()
const cors = require("cors")
const port = 3000
var bodyParser = require("body-parser")

const routes = require("./routes/routes")

const mongoose = require("mongoose")
app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

mongoose.set("useNewUrlParser", true)
mongoose.set("useUnifiedTopology", true)
mongoose.set("useCreateIndex", true)

mongoose
  .connect("mongodb://localhost:27017/nutriologa-jocelyn")
  .then(re => {
    console.log("[ INFO ] Conectado a la BD")
  })
  .catch(err => {
    console.log(`err`, err)
  })

app.use(routes)

app.use((err, req, res, next) => {
  console.log(err)
  res.send(err)
})

app.listen(port, () => {
  console.log(`Escuchando: ${port}`)
})

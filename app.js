require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT ?? 3000
const bodyParser = require("body-parser")
const autoParser = require("express-query-auto-parse")
const routes = require("./routes/routes")

const mongoose = require("mongoose")
app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(autoParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

mongoose.set("useNewUrlParser", true)
mongoose.set("useUnifiedTopology", true)
mongoose.set("useCreateIndex", true)

mongoose
  .connect(process.env.URI)
  .then(re => {
    console.log("[ INFO ] Conectado a la BD")
  })
  .catch(err => {
    console.log(`err`, err)
  })

app.use(routes)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send(err)
})

app.listen(port, () => {
  console.log(`Escuchando: ${port}`)
})

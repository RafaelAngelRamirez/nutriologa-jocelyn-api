const app = require("express")()
const Paciente = require("../models/paciente.model")

app.post("/", (req, res, next) => {
  console.log(req.body)
  delete req.body.datosAntropometricos

  new Paciente(req.body)
    .save()
    .then(p => res.send(p))
    .catch(_ => next(_))
})

app.put("/", (req, res, next) => {
  Paciente.findById(req.body._id)
    .exec()
    .then(p => {
      if (!p) throw "No existe el id"
      delete req.body._id
      Object.assign(p, req.body)
      return p.save()
    })
    .then(p => res.send(p))
    .catch(_ => next(_))
})

app.put("/datos-antropometricos", (req, res, next) => {
  Paciente.findById(req.body.id)
    .exec()
    .then(p => {
      if (p) throw "No existe el id"
      delete req.body._id
      p.datosAntropometricos.push(req.body)
      return p.save()
    })
    .then(p => res.send(p))
    .catch(_ => next(_))
})

app.delete("/id/:id", (req, res) => {
  Paciente.findById(req.params.id)
    .exec()
    .then(p => {
      if (!id) throw "No existe el id"
      return p.remove()
    })
    .then(p => res.send(p))
    .catch(_ => next(_))
})

app.get("/", (req, res) => {
  Paciente.find()
    .select("+nombre +fechaDeNacimiento +sexo +celular +metasDelPaciente")
    .exec()
    .then(p => res.send(p))
    .catch(_ => next(_))
})
app.get("/id/:id", (req, res) => {
  Paciente.findById(req.params.id)
    .exec()
    .then(p => res.send(p))
    .catch(_ => next(_))
})

module.exports = app

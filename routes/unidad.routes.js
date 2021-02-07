const app = require("express")()
const Unidad = require("../models/unidad.model")
const Alimento = require("../models/alimento.model")

app.get("/", (req, res, next) => {
  Unidad.find()
    .exec()
    .then(unidad => res.send(unidad))
    .catch(_ => next(_))
})

app.get("/detalle/:id", (req, res, next) => {
  Unidad.findById(req.params.id)
    .exec()
    .then(respuesta => {
      if (!respuesta) throw new Error("No existe el id")
      res.send(respuesta)
    })
    .catch(_ => next(_))
})

app.post("/", (req, res, next) => {
  let unidad = new Unidad(req.body)
  unidad
    .save()
    .then(unidad => res.send(unidad))
    .catch(_ => next(_))
})

app.put("/", (req, res) => {
  Unidad.findById(req.body._id)
    .exec()
    .then(unidad => {
      if (!unidad) throw "No existe el id"
      Object.assign(unidad, req.body)

      return unidad.save()
    })
    .then(uni => res.send(uni))
    .catch(_ => next(_))
})

app.delete("/eliminar/:id", async (req, res) => {
  // Primero buscamos todo los elemento que estan relacionados a esta
  // unidad y los eliminamos.

  let alimentosElimnados = []
  Alimento.deleteMany({ grupoDeAlimento: req.params.id }, { new: true })
    .exec()
    .then(eliminado => {
      alimentosElimnados = eliminado
      return Unidad.deleteOne({ _id: req.params.id }).exec()
    })
    .then(unidad => {
      res.send({ unidad, alimentosElimnados })
    })
    .catch(_ => next(_))
})

module.exports = app

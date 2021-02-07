const app = require("express")()
const GrupoDeAlimento = require("../models/unidad.model")
const Alimento = require("../models/alimento.model")

app.get("/", (req, res, next) => {
  GrupoDeAlimento.find()
    .exec()
    .then(grupo => res.send(grupo))
    .catch(_ => next(_))
})

app.get("/detalle/:id", (req, res, next) => {
  GrupoDeAlimento.findById(req.params.id)
    .exec()
    .then(respuesta => {
      if (!respuesta) throw new Error("No existe el id")
      res.send(respuesta)
    })
    .catch(_ => next(_))
})

app.post("", (req, res, next) => {
  let grupo = new GrupoDeAlimento(req.body)
  grupo
    .save()
    .then(respuesta => res.send(respuesta))
    .catch(_ => next(_))
})

app.put("/", (req, res) => {
  GrupoDeAlimento.findById(req.body._id)
    .exec()
    .then(respuesta => {
      if (!respuesta) throw "No existe el id"
      Object.assign(respuesta, req.body)

      return respuesta.save()
    })
    .then(r => res.send(r))
    .catch(_ => next(_))
})

app.delete("/eliminar/:id", async (req, res) => {
  // Primero buscamos todo los elemento que estan relacionados a esta
  // unidad y los eliminamos.

  let alimentosEliminados = []
  Alimento.deleteMany({ grupoDeAlimento: req.params.id })
    .exec()
    .then(eliminado => {
      alimentosEliminados = eliminado

      return GrupoDeAlimento.deleteOne({ _id: req.params.id }).exec()
    })
    .then(unidad => {
      res.send({ unidad, alimentosElimandos: alimentosEliminados })
    })
    .catch(_ => next(_))
})

module.exports = app

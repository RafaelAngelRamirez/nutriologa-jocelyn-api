const app = require("express")()
const Alimento = require("../models/alimento.model")

function popular(query)
{
  return query
    .populate("unidad", undefined, "unidad")
    // .populate("grupoDeAlimento", undefined, "grupoDeAlimento")
}

app.get("/", (req, res, next) => {
  popular(Alimento.find())
    .exec()
    .then(r => res.send(r))
    .catch(_ => next(_))
})

app.get("/detalle/:id", (req, res, next) => {
  popular(Alimento.findById(req.params.id))
    .exec()
    .then(r => {
      if (!r) throw new Error("No existe el id")
      res.send(r)
    })
    .catch(_ => next(_))
})

app.post("/", (req, res, next) => {
  let unidad = new Alimento(req.body)
  unidad
    .save()
    .then(r => res.send(r))
    .catch(_ => next(_))
})

app.put("/", (req, res) => {
  Alimento.findById(req.body._id)
    .exec()
    .then(r => {
      if (!r) throw "No existe el id"
      Object.assign(r, req.body)

      return r.save()
    })
    .then(r => res.send(r))
    .catch(_ => next(_))
})

app.delete("/eliminar/:id", async (req, res) => {
  Alimento.deleteOne({ _id: req.params.id })
    .exec()
    .then(r => {
      res.send(r)
    })
    .catch(_ => next(_))
})

module.exports = app

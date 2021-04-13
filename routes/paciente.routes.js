const app = require("express")()
const Paciente = require("../models/paciente.model")

app.post("/", (req, res, next) => {
  delete req.body.datosAntropometricos

  new Paciente(req.body)
    .save()
    .then(p => res.send(p))
    .catch(_ => next(_))
})

app.put("/", (req, res, next) => {
  Paciente.findById(req.body._id)
    .exec()
    .then(paciente => {
      if (!paciente) throw "No existe el id"
      delete req.body._id

      Object.assign(paciente, req.body)

      const limpiar = arreglo => {
        if (!arreglo) return
        while (arreglo.length > 0) arreglo.pop()
      }
      const asignar = (objetivo, nuevo) => nuevo.forEach(x => objetivo.push(x))

      const remplazarArreglo = (objetivo, nuevo) => {
        if (!nuevo || !objetivo) return
        limpiar(objetivo)
        asignar(objetivo, nuevo)
      }
      // Asignar arrays.
      remplazarArreglo(paciente.metasDelPaciente, req.body.metasDelPaciente)

      const padres = ["r24h", "tiemposDeComida"]

      padres.forEach(padre => {
        const propiedades = [
          "desayuno",
          "colacionM",
          "comida",
          "colacionV",
          "cena",
        ]

        propiedades.forEach(propiedad => {
          remplazarArreglo(
            paciente.habitosAlimentarios?.[padre]?.[propiedad],
            req.body.habitosAlimentarios?.[padre]?.[propiedad]
          )
        })
      })

      return paciente.save()
    })
    .then(p => res.send(p))
    .catch(_ => next(_))
})

app.put("/datos-antropometricos/crear", (req, res, next) => {
  Paciente.findById(req.body.idPaciente)
    .exec()
    .then(p => {
      if (!p) throw "No existe el id"
      delete req.body._id
      p.datosAntropometricos.push(req.body)
      return p.save()
    })
    .then(p => res.send(p))
    .catch(_ => next(_))
})

app.put("/datos-antropometricos/modificar", (req, res, next) => {
  Paciente.findById(req.body.idPaciente)
    .exec()
    .then(p => {
      if (!p) throw "No existe el id"

      const dato = p.datosAntropometricos.id(req.body._id)
      if (!dato) throw "No existe el registro antropometrico"

      Object.assign(dato, req.body)

      return p.save()
    })
    .then(p => res.send(p))
    .catch(_ => next(_))
})

app.delete(
  "/datos-antropometricos/:idPaciente/:idDatoAntro",
  (req, res, next) => {
    let eliminado = null
    Paciente.findById(req.params.idPaciente)
      .exec()
      .then(async paciente => {
        if (!paciente) throw "No existe el id"

        const eliminado = paciente.datosAntropometricos.pull(
          req.params.idDatoAntro
        )

        try {
          await paciente.save()
        } catch (error) {
          return next(err)
        }

        return res.send(eliminado)
      })
      .catch(_ => next(_))
  }
)

app.delete("/id/:id", (req, res, next) => {
  Paciente.findById( req.params.id )
    .exec()
    .then(p => {
      if (!p) throw "No existe el id"
      return p.remove()
    })
    .then(p => res.send({}))
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

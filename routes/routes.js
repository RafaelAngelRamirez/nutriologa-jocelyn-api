const app = require("express")()
const UnidadRoute = require("./unidad.routes")
const GrupoDeAlimentoRoute = require("./grupoDeAlimento.routes")
const AlimentoRoute = require("./alimento.routes")

const PacienteRoute = require("./paciente.routes")

app.use("/unidad", UnidadRoute)
app.use("/grupo-de-alimento", GrupoDeAlimentoRoute)
app.use("/alimento", AlimentoRoute)
app.use("/paciente", PacienteRoute)

module.exports = app

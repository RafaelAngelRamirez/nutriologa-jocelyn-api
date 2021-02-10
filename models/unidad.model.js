const mongoose = require("mongoose")

const unidad = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la unidad es obligatorio"],

    unique: [true, "El nombre de la unidad debe ser unico"],
  },

  descripcion: String,
})

module.exports = mongoose.model("unidad", unidad)

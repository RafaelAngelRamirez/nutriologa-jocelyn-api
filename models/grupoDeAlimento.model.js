const mongoose = require("mongoose")

const grupoDeAlimento = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del grupo es obligatorio"],
  },

  descripcion: String,
})

module.exports = mongoose.model("grupoDeAlimento", grupoDeAlimento)

const mongoose = require("mongoose")

let msjMinimo = campo => `El minimo para ${campo} es 0`

const alimento = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del alimento es obligatorio"],
    unique: [true, "El nombre no debe ser repetido. "],
  },
  cantidadSugerida: {
    type: String,
    min: [0, msjMinimo("{PATH}")],
  },
  unidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unidad",
    required: [true, "La unidad es necesaria"],
  },
  pesoBrutoRendondeado: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  pesoNeto: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  energia_kcal: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  energia_kj: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  proteina: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  lipidos: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  hidratosDeCarbono: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  fibra: { type: Number, min: [0, msjMinimo("{PATH}")] },
  vitaminaA: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  acidoAscorbico: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  acidoFolico: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  hierro_NO_HEM: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  potasio: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  indiceGlisemico: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  cargaGlicemica: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
    default: 0,
  },
  sodio: {
    type: Number,
    min: [0, msjMinimo("{PATH}")],
  },
  grupoDeAlimento: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "grupoDeAlimento",
  },
})

module.exports = mongoose.model("alimento", alimento)



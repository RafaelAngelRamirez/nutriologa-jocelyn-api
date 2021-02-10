const mongoose = require("mongoose")
const Schema = mongoose.Schema
const AutoIncrement = require("mongoose-sequence")(mongoose)

const PacienteSchema = new Schema(
  {
    // TODO: Agregar autoincremento
    _id: Number,
    nombre: { type: String, required: true, minlength: 5 },
    fechaDeNacimiento: Date,
    // true es mujer
    sexo: Boolean,

    celular: String,

    metasDelPaciente: [String],

    condicionActual: {
      embarazo: Boolean,
      ultimaMenstruacion: Date,
      dm: Boolean,
      ht: Boolean,
      dl: Boolean,
      au: Boolean,
      ca: Boolean,
      cv: Boolean,
      otra: String,
      problemasGastroIntestinales: {
        estrenimiento: Boolean,
        diarrea: Boolean,
        alergias: Boolean,
        vomito: Boolean,
        colitis: Boolean,
        gastritis: Boolean,
        nauseas: Boolean,
        agruras: Boolean,
        distencionAbdominal: Boolean,
        otro: String,
      },
    },

    actividadFisica: {
      tipo: String,
      frecuenciaSemana: Number,
      tiempoMinutos: Number,
      intensidad: Number,
    },

    habitosAlimentarios: {
      r24h: {
        desayuno: [String],
        colacionM: [String],
        comida: [String],
        colacionV: [String],
        cena: [String],
      },

      tiemposDeComida: {
        desayuno: [String],
        colacionM: [String],
        comida: [String],
        colacionV: [String],
        cena: [String],
      },
    },

    datosAntropometricos: [
      {
        compensacion: Number,
        peso: Number,
        // talla es la estatura
        talla: Number,
        circunferenciaCintura: Number,
        circunferenciaAbdomen: Number,
        circunferenciaCadera: Number,
        masaMuscular: Number,
        porcentajeDeGrasa: { type: Number, min: 0, max: 100 },
        porcentajeDeAgua: { type: Number, min: 0, max: 100 },
        fecha: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
)
PacienteSchema.plugin(AutoIncrement)

module.exports = mongoose.model("paciente", PacienteSchema)

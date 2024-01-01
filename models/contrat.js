const mongoose = require("mongoose");
// const autoIncrement = require("mongoose-sequence")(mongoose);

const contratSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "le type est obligatoire"],
    },
    salary: {
      type: String,
      required: [true, "le salary est obligatoire"],
    },
    startDate: {
      type: Date,
      required: [true, "la date de début est obligatoire"],
    },

    endDate: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salarie",
      required: [true, "Salarie est obligatoire"],
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job est obligatoire"],
    },
  },
  { timestamps: true }
);
// jobSchema.plugin(autoIncrement, { inc_field: "JOB_ID" });
module.exports = mongoose.model("Contrat", contratSchema);

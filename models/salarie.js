const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const salarieSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please provide the firstName"],
    },
    lastName: {
      type: String,
      required: [true, "please provide the lastName"],
    },
    email: {
      type: String,
      required: [true, "please provide the Email"],
    },
    // SAL_ADR: {
    //   type: String,
    // },
    // JOB_LIB: {
    //   type: String,
    //   required: [true, "please provide the job"],
    // },
    country: {
      type: String,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "job est obligatoire"],

      // default: null,
    },
    phoneNumber: {
      type: String,
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
  },
  { timestamps: true }
);
salarieSchema.plugin(autoIncrement, { inc_field: "SAL_ID" });
module.exports = mongoose.model("Salarie", salarieSchema);

const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const jobSchema = mongoose.Schema(
  {
    jobName: {
      type: String,
      required: [true, "le nom est obligatoire"],
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
jobSchema.plugin(autoIncrement, { inc_field: "JOB_ID" });
module.exports = mongoose.model("Job", jobSchema);

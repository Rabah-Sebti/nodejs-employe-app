const mongoose = require("mongoose");
const countrySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "le nom est obligatoire"],
  },

  code: {
    type: String,
    required: [true, "le code est obligatoire"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Country", countrySchema);

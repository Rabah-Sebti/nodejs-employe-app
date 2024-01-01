const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const modelSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please enter the firstName"],
    },
    lastName: {
      type: String,
      required: [true, "please enter the lastName"],
    },

    email: {
      type: String,
      required: [true, "please enter the email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "entrée un email valid",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please enter the password"],
    },
  },
  { timestamps: true }
);
modelSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

modelSchema.methods.comparePassword = async function (pass) {
  const isMatch = await bcrypt.compare(pass, this.password);
  return isMatch;
};
modelSchema.methods.getName = function () {
  return `${this.firstName} ${this.lastName}`;
};
modelSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userID: this._id,
      name: this.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    }
  );
};
module.exports = mongoose.model("User", modelSchema);

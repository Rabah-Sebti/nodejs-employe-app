const User = require("../models/user");
const { UnauthenticatedError, BadRequest } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: user, accessToken: token });
  } catch (error) {
    console.log("register", error);
  }
};
const login = async (req, res) => {
  debugger;
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("invalid inputs");
  }
  const isPassCorrect = await user.comparePassword(password);
  if (!isPassCorrect) {
    throw new UnauthenticatedError("password incorect");
  }
  const token = user.createJWT();
  res.json({ user: user, accessToken: token });
};
module.exports = { login, register };

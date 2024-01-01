const jwt = require("jsonwebtoken");
const authentificationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userID, name } = decoded;
    req.user = { userID, name };
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = authentificationMiddleware;

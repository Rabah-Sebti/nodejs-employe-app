require("express-async-errors");
const express = require("express");
const app = express();
const errorHandlerMiddleware = require("./middleware/error-handler");
const authUser = require("./middleware/auth");

require("dotenv").config();
const port = process.env.PORT || 3000;
const authRoute = require("./routes/auth");
const jobsRoute = require("./routes/job");
const salarisRoute = require("./routes/salarie");
const userRoute = require("./routes/user");
const contratRoute = require("./routes/contrat");

const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use("/api/auth", authRoute);
app.use("/api/jobs", authUser, jobsRoute);
app.use("/api/salaries", authUser, salarisRoute);
app.use("/api/users", authUser, userRoute);

app.use("/api/contrats", authUser, contratRoute);

app.use(errorHandlerMiddleware);
const connectDB = require("./db/connect");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listenning at port ${port}`);
    });
  } catch (error) {
    console.log("connect error", error);
  }
};
start();

const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
connectDB();
const PORT = 3000;
const userRoutes = require("./routes/userRoutes");
var cors = require('cors');

app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use((req, _, next) => {
  console.log(req.method + " at " + req.path);
  next();
});
app.use("/api/users", userRoutes);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

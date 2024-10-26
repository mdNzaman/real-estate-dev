require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auths.routes");
const propertyRoutes = require("./routes/properties.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

// Simple error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Connected to MySQL...");
});

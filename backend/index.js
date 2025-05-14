require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const marketplaceRoutes = require("./routes/marketplace");
app.use("/api/marketplace", marketplaceRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

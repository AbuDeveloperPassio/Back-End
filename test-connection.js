// test-connection.js
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rahmannoon12_db_user:QhMhhZU5IGTcwxMP@cluster0.t9ospxy.mongodb.net/carShowroomDB?appName=Cluster0")
  .then(() => console.log("✅ Connected to Atlas"))
  .catch((err) => console.error("❌ Connection failed:", err));
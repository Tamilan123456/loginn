const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const UserData = require("./models/mango.js"); // Use correct model name

dotenv.config();

async function importData() {
  try {
    const raw = fs.readFileSync("./samlple.json", "utf8");
    const users = JSON.parse(raw);

    if (!Array.isArray(users) || users.length === 0) {
      console.log(" No valid user data found.");
      return;
    }

    await UserData.deleteMany(); // Clear old data
    // console.log(" Old data cleared.");

    await UserData.insertMany(users); // Insert new data
    // console.log(" Data imported successfully!");
  } catch (err) {
    console.error(" Data Import Failed:", err);
  }
}

module.exports = importData;

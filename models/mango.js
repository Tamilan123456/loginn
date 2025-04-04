const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
});

const manodb = mongoose.model("UserData", UserDataSchema);

module.exports =manodb;

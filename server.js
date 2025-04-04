// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
// const { User, UserData } = require("./models/User");
const { mango } = require("./models/mango");
const importData=require("./migrete")
dotenv.config();

connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());  // Body parser for POST requests
// const cors = require("cors");

// const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"]; // Allow both origins

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(cookieParser()); // To parse cookies

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/auth", mango);

const fs = require("fs");

// let users = [{"id":1743152783855,"name":"Tamilan","age":"22","city":"Komarapalayam"},{"id":1743152783857,"name":"Tamilan","age":"22","city":"Komarapalayam"},{"id":1743152783858,"name":"Tamilan","age":"22","city":"Komarapalayam"},{"id":1743152783859,"name":"Tamilan","age":"22","city":"Komarapalayam"},{"id":1743576476369,"name":"Soundher","age":"22","city":"kon"},{"id":1743576489998,"name":"divya","age":"32","city":"Thanjavur"},{"id":1743576932587,"name":"tamilan","age":"","city":""}];

try {
  const data = fs.readFileSync("./samlple.json", "utf8");
  users = JSON.parse(data);
} catch (err) {
  console.log("No initial data found, starting with an empty array.");
}


//DIsplay All Users
app.get("/users",(req,res)=>{
  return res.json(users);
});

//Delete User Detais
app.delete("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  users = users.filter((user) => user.id !== id);

  // Reassign IDs sequentially after deletion
  users = users.map((user, index) => ({ ...user, id: index + 1 }));

  fs.writeFile("./samlple.json", JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ message: "Error saving data" });
    res.json({ message: "User deleted successfully", users });
  });
});


app.post("/users", (req, res) => {
  let { name, age, city } = req.body;

  if (!name || !age || !city) {
    return res.status(400).send({ message: "All Fields Required" });
  }

  let newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1; // Generate sequential ID

  let newUser = { id: newId, name, age, city };
  users.push(newUser);

  fs.writeFile("./samlple.json", JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ message: "Error saving data" });
    res.json({ message: "User details added successfully", users });
  });
});



//update user
app.patch("/users/:id", (req, res) => {
  let id = Number(req.params.id);
  let { name, age, city } = req.body;

  if (!name || !age || !city) {
    return res.status(400).send({ message: "All Fields Required" });
  }

  let index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { id, name, age, city };
  }

  fs.writeFile("./samlple.json", JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ message: "Error saving data" });
    res.json({ message: "User details updated successfully", users });
  });
});
app.get("/UserData", async (req, res) => {
  try {
    const users = await UserData.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

importData().then(() => console.log("✔️ Data import completed"));

// Start server
app.listen(process.ev.port, () => {
  console.log("Server running on port 4000");
});

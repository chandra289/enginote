const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

// connect to database
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI);

async function createAdmin(){

  const hashed = await bcrypt.hash("admin123",10);

  await User.create({
    name:"Super Admin",
    email:"admin@enginote.com",
    password:hashed,
    role:"superadmin"
  });

  console.log("Super Admin Created");

  mongoose.disconnect();
}

createAdmin();
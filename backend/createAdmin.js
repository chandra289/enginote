const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

// connect to database
mongoose.connect("mongodb://127.0.0.1:27017/enginote");

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
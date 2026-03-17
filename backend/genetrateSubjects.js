const mongoose = require("mongoose");
const Subject = require("./models/Subject");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const departments = [
"CSE",
"IT",
"ECE",
"EEE",
"MECH",
"CIVIL",
"AI&DS",
"CSBS"
];


// COMMON SUBJECTS (SEM 1 & 2)

const commonSubjects = {

1:[
"Technical Communication",
"Matrices and Calculus",
"Engineering Physics",
"Engineering Chemistry",
"Problem Solving using Python",
"Python Programming Lab",
"Physics / Chemistry Lab"
],

2:[
"Statistics and Numerical Methods",
"Basic Electrical and Electronics Engineering",
"Digital Principles",
"Object Oriented Programming",
"Engineering Graphics",
"OOP Lab",
"Engineering Practices Lab"
]

};


// DEPARTMENT SUBJECTS

const subjects = {

CSE:{
3:["Data Structures","Computer Organization","Operating Systems","Discrete Mathematics","Data Structures Lab"],
4:["Database Management Systems","Artificial Intelligence","Computer Networks","Theory of Computation","DBMS Lab"],
5:["Web Programming","Mobile Computing","Software Engineering","Professional Elective I","Web Programming Lab"],
6:["Machine Learning","Compiler Design","Professional Elective II","Professional Elective III"],
7:["Professional Elective IV","Professional Elective V","Open Elective","Project Phase I"],
8:["Professional Elective VI","Internship","Project Phase II"]
},

IT:{
3:["Data Structures","Computer Organization","Operating Systems","OOP","DS Lab"],
4:["Database Management Systems","Software Engineering","Computer Networks","DBMS Lab"],
5:["Web Technologies","Data Analytics","Information Security","Professional Elective"],
6:["Cloud Computing","Big Data Analytics","Professional Elective"],
7:["Professional Elective","Open Elective","Project Phase I"],
8:["Internship","Project Phase II"]
},

ECE:{
3:["Electronic Devices","Digital Electronics","Signals and Systems"],
4:["Analog Communication","Control Systems","Electromagnetic Fields"],
5:["Digital Signal Processing","Microprocessors","VLSI Design"],
6:["Wireless Communication","Embedded Systems"],
7:["Professional Elective","Open Elective","Project Phase I"],
8:["Internship","Project Phase II"]
},

EEE:{
3:["Electric Circuits","Analog Electronics","Electromagnetic Fields"],
4:["Electrical Machines I","Power Systems","Control Systems"],
5:["Electrical Machines II","Power Electronics","Microprocessors"],
6:["Electric Drives","Renewable Energy Systems"],
7:["Professional Elective","Open Elective","Project Phase I"],
8:["Internship","Project Phase II"]
},

MECH:{
3:["Engineering Mechanics","Thermodynamics","Manufacturing Technology"],
4:["Fluid Mechanics","Strength of Materials","Kinematics of Machines"],
5:["Heat Transfer","Dynamics of Machines","Design of Machine Elements"],
6:["Finite Element Analysis","CAD CAM"],
7:["Professional Elective","Open Elective","Project Phase I"],
8:["Internship","Project Phase II"]
},

CIVIL:{
3:["Engineering Mechanics","Construction Materials","Surveying"],
4:["Structural Analysis","Geotechnical Engineering","Environmental Engineering"],
5:["Design of Concrete Structures","Water Resources Engineering","Transportation Engineering"],
6:["Design of Steel Structures","Foundation Engineering"],
7:["Professional Elective","Open Elective","Project Phase I"],
8:["Internship","Project Phase II"]
},

"AI&DS":{
3:["Data Structures","Discrete Mathematics","Digital Principles","Probability and Statistics"],
4:["Database Management Systems","Artificial Intelligence","Machine Learning","Computer Networks"],
5:["Deep Learning","Natural Language Processing","Big Data Analytics"],
6:["Computer Vision","Reinforcement Learning"],
7:["Professional Elective","Open Elective","Project Phase I"],
8:["Internship","Project Phase II"]
},

CSBS:{
3:["Data Structures","Business Economics","Discrete Mathematics"],
4:["Database Management Systems","Financial Management","Operating Systems"],
5:["Business Analytics","Software Engineering","Web Technologies"],
6:["Machine Learning","Cloud Computing"],
7:["Professional Elective","Open Elective","Project Phase I"],
8:["Internship","Project Phase II"]
}

};



async function generateData(){

await Subject.deleteMany();

let dataset=[];

for(const dept of departments){

// SEM 1

commonSubjects[1].forEach((sub,i)=>{

dataset.push({

regulation:"R2023",
department:dept,
semester:1,
subjectCode:`${dept}101${i}`,
subjectName:sub

});

});

// SEM 2

commonSubjects[2].forEach((sub,i)=>{

dataset.push({

regulation:"R2023",
department:dept,
semester:2,
subjectCode:`${dept}201${i}`,
subjectName:sub

});

});

// SEM 3 - 8

for(const sem in subjects[dept]){

subjects[dept][sem].forEach((sub,i)=>{

dataset.push({

regulation:"R2023",
department:dept,
semester:Number(sem),
subjectCode:`${dept}${sem}${i}`,
subjectName:sub

});

});

}

}

await Subject.insertMany(dataset);

console.log(" FULL SUPER DATASET GENERATED");
console.log("Subjects inserted:",dataset.length);

process.exit();

}

generateData();
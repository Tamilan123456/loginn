// const express=require("express");
// const users=require("./samlple.json");
// const cors=require('cors');
// const fs=require("fs");


// const app=express();
// const port=8000;

// app.use(express.json());
// app.use(cors());

// //DIsplay All Users
// app.get("/users",(req,res)=>{
//     return res.json(users);
// });

// //Delete User Detais
// app.delete("/users/:id", (req,res)=>{
//     let id=Number(req.params.id);
//     let filterUsers=users.filter((user)=>user.id !==
// id);
// fs.writeFile("./samlple.json",JSON.stringify
//     (filterUsers),(err,data)=>{
//         return res.json(filterUsers);
//     }
// );
// });
// et id = Date.now();
// //     users.push({  name, age, city });

// //     fs.writeFile("./samlple.json", JSON.stringify(users, null, 2), (err) => {
// //         if (err) {
// //             return res.status(500).json({ message: "Error saving user data" });
// //         }
// //         res.status(201).json({ message: "User details added successfully" });
// //     });
// // });
// app.post("/users",(req,res)=>{
//     let{name,age,city}=req.body;
//     if(!name ||!age ||!city){
//         res.status(400).send({message:"All Fields Required"});
//     }
//     let id=Date.now();
//     users.push({id,name,age,city});

//     fs.writeFile("./samlple.json",JSON.stringify
//         (users),(err,data)=>{
//             return res.json({message: "User deatais Added Success"});
//         });

// });

// //update user
// app.patch("/users/:id",(req,res)=>{
//     let id=Number(req.params.id);
//     let{name,age,city}=req.body;
//     if(!name ||!age ||!city){
//         res.status(400).send({message:"All Fields Required"});
//     }
//     let index=users.findIndex((user)=> user.id==id);
//     users.splice(index,1,{...req.body});
//     fs.writeFile("./samlple.json",JSON.stringify
//         (users),(err,data)=>{
//             return res.json({message: "User deatais Updated Success"});
//         });

// });

// app.listen(port,(err)=>{
//     console.log(`App is Running in Port ${port}`);
// });
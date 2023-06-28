const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("", (req, res) => {
  let db = fs.readFileSync("db.json");
  db = JSON.parse(db);
  res.status(200).send(db.tours);
});

router.post("", (req, res) => {
  let db = fs.readFileSync("db.json");
  db = JSON.parse(db);

  let existEmail = db.tours.find((e) =>{ 
    // console.log(e.email,req.body.email)
    return e.email.toLowerCase() === req.body.email.toLowerCase()});

 console.log(existEmail);

 if(existEmail){
  return res.status(403).send({message:"Email Already exist."})
 }

  let newTour = { ...req.body, id: db.tours.length + 1 };
  db.tours.push(newTour);
  fs.writeFileSync("db.json", JSON.stringify(db));

  res.status(201).send(newTour);
});

module.exports = router;

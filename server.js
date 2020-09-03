const express = require("express")

const mongoose = require("mongoose")

require("dotenv").config({ path: ".env" });

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

// Create a person having this prototype

var Schema = mongoose.Schema;
const PersonSchema = new Schema({           //var blogShema//
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

 //create Model

var personModel = mongoose.model("person", PersonSchema);


 // Create Many Records with model.create()
var arrayOfPeople = [
  { name: "haikel", age: 25, favoriteFoods: ["couscous", "banana"] },
  { name: "bacem", age: 28, favoriteFoods: ["orange", "fromage"] },
  { name: "omar", age: 27, favoriteFoods: ["cacao", "citron"] },
  { name: "achref", age: 24, favoriteFoods: ["banana", "chocola"] },
  { name: "aziz", age: 26, favoriteFoods: ["kiwi", "ananas"] },
];

personModel.create(arrayOfPeople, (err, data) => {
  if (err) console.log(err);
  else console.log(arrayOfPeople);
});


// Use model.find() to Search Your Database
personModel
  .find({ name: "omar" })
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

// //Use model.findOne() to Return a Single Matching Document from Database
personModel
  .findOne({ favoriteFoods: { $in: ["banana"] } })
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

// //Use model.findById() to Search Your Database By _id

personModel
  .findById({
    _id: "5f51530ae5adf2bdb833ab25",
  })
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.error(err);
  });

// //   Perform Classic Updates by Running Find, Edit, then Save

personModel.findById("5f51530ae5adf2bdb833ab25", (err, person) => {
  if (err) console.log(err);
  person.favoriteFoods.push("makloub");
  person.save((err, person) => {
    if (err) console.log(err);
    console.log(person);
  });
});

// // Perform New Updates on a Document Using model.findOneAndUpdate()

personModel.findOneAndUpdate(
  { name: "bacem" },
  { age: 29 },
  { new: true },
  (err, person) => {
    if (err) console.log(err);
    console.log(person);
  }
);

// // Delete One Document Using model.findByIdAndRemove

personModel.findOneAndRemove("5f51530ae5adf2bdb833ab20", (err, person) => {
  if (err) console.log(err);
  console.log(person);
});

// // MongoDB and Mongoose - Delete Many Documents with model.remove()

personModel.deleteMany({ name: "Mary" }, (err, person) => {
  if (err) console.log(err);
  console.log("Person(s) with name 'Mary' was deleted");
});
// // Chain Search Query Helpers to Narrow Search Results

personModel
  .find({ favoriteFoods: { $in: ["Burrito"] } })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .exec()
  .then((doc) => console.log(doc))
  .catch((err) => console.error(err));

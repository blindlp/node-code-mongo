require("dotenv").config();

const mongoose = require("mongoose");

const Student = mongoose.model("Students", {
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
    enum: ["Programacion", "Ingles", "Cocina"],
  },
  age: {
    type: Number,
    min: 1,
  },
});

mongoose.connect(
  process.env.DATEBASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");

    Student.create({
      name: "Luis Pozuelos",
      course: "Programacion",
      age: 40,
    });
  }
);

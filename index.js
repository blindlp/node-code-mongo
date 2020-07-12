require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");

const app = express();

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

app.get("/students", async (request, response) => {
  const allStrudents = await Student.find();

  response.json({
    success: true,
    data: {
      students: allStrudents,
    },
  });
});

mongoose.connect(
  process.env.DATEBASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");

    app.listen(8080, () => {
      console.log("Server is ready");
    });
  }
);

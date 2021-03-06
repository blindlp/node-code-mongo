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

app.use(express.json());

app.post("/students", async (request, response) => {
  const studentInfo = request.body;

  const newStrudent = await Student.create(studentInfo);

  response.json({
    success: true,
    data: {
      student: newStrudent,
    },
  });
});

app.delete("/students/:id", async (request, response) => {
  try {
    const id = request.params.id;

    const studentDeleted = await Student.findByIdAndDelete(id);

    response.json({
      success: true,
      data: {
        student: studentDeleted,
      },
    });
  } catch (error) {
    response.status(400);
    response.json({
      sucess: false,
      error: error.message,
    });
  }
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

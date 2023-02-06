import _ from "lodash";
import Student from "../models/student.js";

export const createStudent = async (req, res) => {
  const students = await Student.find();
  let isUnique = false;

  students.forEach((student) => {
    if (
      student.student.name === req.body.student.name ||
      student.father.name === req.father.name
    ) {
      isUnique = true;
    }
  });

  try {
    if (isUnique === false) {
      let student = new Student({ ...req.body });

      await student.save();
      return res.json(student);
    } else {
      return res.json({ message: "Student Already Registered" });
    }
  } catch (error) {
    res.json(error);
  }
};

export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

export const getStudent = async (req, res) => {
  const students = await Student.findById(req.params.id);
  res.json(students);
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndRemove(id);

  if (!student)
    return res.send("The genre with the given ID is Already Deleted");

  res.send(student);
};
export const uploadImage = async (req, res) => {
  console.log(req.file.filename, req.body.studentId);
  const student = await Student.findByIdAndUpdate(req.body.studentId, {
    image: req.file.filename,
  });
  res.json(student);
};

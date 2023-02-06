import _ from "lodash";
import { cloudinary } from "../helper/imageUpload.js";
import Student from "../models/student.js";

export const createStudent = async (req, res) => {
  const students = await Student.find();
  let isUnique = false;

  students.forEach((student) => {
    if (
      student.student.name === req.body.student.name &&
      student.father.name === req.father.name
    ) {
      isUnique = true;
      res.json("Already Registered");
    }
  });

  if (isUnique === false) {
    let student = new Student({ ...req.body });

    await student.save();
    return res.json(student);
  } else {
    return res.json({ message: "Student Already Registered" });
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
  const result = cloudinary.uploader.upload(req.file.path, {
    public_id: `${req.student._id}_profile`,
    // crop: "fill",
  });
  res.json(student);
  const student = await Student.findByIdAndUpdate(req.body.studentId, {
    image: result.url,
  });
};

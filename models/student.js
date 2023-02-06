import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: String,
  class: String,
  dateOfBirth: String,
  previousSchool: String,
  previousClass: String,
  marks: Number,
  percentage: Number,
  nationality: String,
  hafiz_ul_quran: Boolean,
  orphan: Boolean,
  disability: String,
});

const ParentSchema = new mongoose.Schema({
  name: String,
  CNIC_No: {
    type: String,
  },
  occupation: String,
  company: String,
  designation: String,
  department: String,
  officeTelephone: Number,
  address: String,
  mobileNumber: Number,
  activeWhatsappNumber: Number,
  emailAddress: String,
});

const SiblingSchema = new mongoose.Schema({
  name: String,
  class: String,
  section: String,
  rollNo: Number,
});

const studentSchema = mongoose.model(
  "Student",
  new mongoose.Schema({
    student: StudentSchema,
    father: ParentSchema,
    mother: ParentSchema,
    siblings: [SiblingSchema],
    image: String,
  })
);

export default studentSchema;

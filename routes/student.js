import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,uploadImage
} from "../controllers/student.js";
import { isAdmin } from "../middleware/admin.js";
import { auth } from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (res, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter,
});

router.get("/", getStudents);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.post("/upload/image", upload.single("image"), uploadImage);
router.delete("/:id", auth, deleteStudent);

export default router;

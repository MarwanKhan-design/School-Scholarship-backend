// Imports
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import config from "config";
import cors from "cors";
import path from "path";

// Import Routes
import UserRoutes from "./routes/user.js";
import AuthRoutes from "./routes/auth.js";
import PostRoutes from "./routes/post.js";
import StudentRoutes from "./routes/student.js";

import { fileURLToPath } from "url";

// App
// if (!config.get("jwtPrivateKey")) {
//   console.error("FATAL ERROR: jwtPrivateKey is not defined");
//   process.exit(1);
// }

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(cors({ origin: "*" }));

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname + "/public")));
app.use("/images", express.static(path.join(__dirname, "/uploads")));

// Routes Checking
app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/student", StudentRoutes);

// Listeners
mongoose.connect(
  "mongodb+srv://iiui:iiuiSecurePass@cluster0.ocib0am.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => console.log("connected to DB")
);

// mongoose.connect("mongodb://localhost:27017/test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

app.listen(process.env.PORT || 3000, () =>
  console.log("App running on port 3000")
);

import express from "express";
import cors from "cors";
import router from "./router.js";
import { confDb } from "./db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3001;

app.use(cors({
  origin: "https://digiboard.elijahwood.co.uk",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

confDb();
router(app);

app.listen(PORT, () => {
  console.log("Server started.");
});

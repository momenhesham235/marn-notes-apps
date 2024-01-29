import express from "express";
import {
  getAllNotes,
  addANewNote,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";
import { requireAuth } from "../middlewares/requireAuth.js";
const router = express.Router();

router.use(requireAuth);

router.route("/").get(getAllNotes).post(addANewNote);

router.route("/:id").get(getNote).put(updateNote).delete(deleteNote);

export default router;

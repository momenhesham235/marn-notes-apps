import express from "express";
import {
  getAllNotes,
  addANewNote,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";
const router = express.Router();

router.route("/").get(getAllNotes).post(addANewNote);

router.route("/:id").get(getNote).put(updateNote).delete(deleteNote);

export default router;

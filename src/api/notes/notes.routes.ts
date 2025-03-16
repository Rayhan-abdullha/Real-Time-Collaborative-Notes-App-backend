import express from "express";
import { middleware } from "../../middleware";
import { notesController } from './notes.controller';

const router = express.Router();

router.get("/", middleware.authenticate, notesController.getNotes);
router.post("/", middleware.authenticate, notesController.createNote);
router.get("/:id", middleware.authenticate, notesController.getSingleNote);
router.delete("/:id", middleware.authenticate, notesController.deleteNote);
// router.patch("/", middleware.authenticate, notesController.updateNote);

export default router;

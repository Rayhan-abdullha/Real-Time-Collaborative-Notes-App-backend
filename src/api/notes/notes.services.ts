import { io } from "../..";
import CustomError from "../../lib/Error";
import Note, { INote } from "./notes.schema";

class AuthService {
  createNote = async (note: INote, userId: string) => {
    // create real time
    const newNote = await Note.create({ ...note, author: userId });
    // io.emit("createNote", newNote); // 🔴 Emit event to all connected clients
    return newNote
  };
  getNotes = async () => {
    const notes = await Note.find();
    return notes
  };
  updateNote = async ({updateNote, userId, noteId}: {updateNote: INote, userId: string, noteId: string}) => {
    const { title, content } = updateNote
    const note = await Note.findOneAndUpdate(
      { _id: noteId, author: userId },
      { title, content, updatedAt: new Date() },
      { new: true }
    );

    if (!note) return CustomError.notFound("Note not found");
    return note
  };
  deleteNote = async ({userId, noteId}: {userId: string, noteId: string}) => {
    return await Note.findOneAndDelete({ _id: noteId, author: userId });
  };
}

export default new AuthService();

import CustomError from "../../lib/Error";
import Note, { INote } from "./notes.schema";

class AuthService {
  createNote = async (note: INote, userId: string) => {
    const newNote = await Note.create({ ...note, author: userId });
    return newNote
  };
  getNotes = async () => {
    const notes = await Note.find();
    return notes
  };
  getSingleNote = async (noteId: string) => {
    const note = await Note.findById(noteId);
    return note
  }
  // updateNote = async ({updateNote, userId, noteId}: {updateNote: INote, userId: string, noteId: string}) => {
  //   const { title, content } = updateNote
  //   const note = await Note.findOneAndUpdate(
  //     { _id: noteId, author: userId },
  //     { title, content, updatedAt: new Date() },
  //     { new: true }
  //   );

  //   if (!note) return CustomError.notFound("Note not found");
  //   return note
  // };
  deleteNote = async ({ userId, noteId }: { userId: string, noteId: string }) => {
    const note = await Note.findOne({ _id: noteId, author: userId });
    if (!note) throw CustomError.unauthorized("You are not authorized to delete this note");
    
    await Note.deleteOne({ _id: noteId });
  };
}

export default new AuthService();

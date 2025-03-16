import connectDB from '../config/db';
import { Server } from "socket.io";
import app from './app/app';
import http from 'http';
import { config } from '../config/env';
import Note from './api/notes/notes.schema';
const httpServer = http.createServer(app);
connectDB()

// export const io = new Server(httpServer, { cors: { origin: "*" } });
export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Adjust according to your frontend
    credentials: true,
  },
});

// Socket.io real-time updates
io.on("connection", (socket) => {
  socket.on("joinNote", ({ noteId }) => {
    socket.join(noteId);
  });

  socket.on("editNote", async ({ noteId, updateData }) => {
    const { title, content } = updateData;
    const note = await Note.findOneAndUpdate(
      { _id: noteId },
      { title, content, updatedAt: new Date() },
      { new: true }
    );

    if (!note) return;

    io.to(noteId).emit("noteUpdated", note);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = config.port || 5500;
httpServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

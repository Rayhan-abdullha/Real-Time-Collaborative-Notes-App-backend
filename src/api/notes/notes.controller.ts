import { Request, Response, NextFunction } from "express";
import noteService from "./notes.services";
import BaseController from "../../lib/BaseController";
import CustomError from "../../lib/Error";

export type CustomRequest = Request & {
  id?: string;
  email?: string;
};

class Controller extends BaseController {
  createNote = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.id
    if (!userId) {
      return next(CustomError.unauthorized());
    }
    try {
      this.sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Note created successfully",
        data: await noteService.createNote(req.body, userId)
      });
    } catch (error) {
      next(error);
    }
  }
  getNotes = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Get notes successfully",
        data: await noteService.getNotes()
      });
    } catch (error) {
      next(error);
    }
  }
  updateNote = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req?.id
    if (!userId) {
      return next(CustomError.unauthorized());
    }
    try {
      this.sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Updated note successfully",
        data: await noteService.updateNote({updateNote: req.body, userId, noteId: req.params.id})
      });
    } catch (error) {
      next(error);
    }
  }
  deleteNote = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req?.id
    if (!userId) {
      return next(CustomError.unauthorized());
    }
    try {
      this.sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Deleted note successfully",
        data: await noteService.deleteNote({userId, noteId: req.params.id})
      });
    } catch (error) {
      next(error);
    }
  }
}

export const notesController = new Controller();

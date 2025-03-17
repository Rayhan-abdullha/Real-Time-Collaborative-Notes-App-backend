import { Request, Response, NextFunction } from "express";
import authService from "./auth.services";
import BaseController from "../../lib/BaseController";
import CustomError from "../../lib/Error";
import { CustomRequest } from "../notes/notes.controller";
import { config } from "../../../config/env";

class AuthController extends BaseController {
  profile = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.id
    if (!userId) {
      return next(CustomError.unauthorized());
    }
    try {
      const result = await authService.getProfile(userId);
      if (result instanceof CustomError) {
        next(result);
      }
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Profile fetched successfully",
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdUser = await authService.registerUser(req.body);
      if (createdUser instanceof CustomError) {
        next(createdUser);
      } else {
        res.cookie("refreshToken", createdUser.refreshToken, {
          httpOnly: true, 
          secure: config.node_env.production ? true : false,
          sameSite: "none",
          path: "/",
          domain: config.cors_origin_domain[3],
        });
        
        this.sendResponse(res, {
          statusCode: 201,
          success: true,
          message: "User created successfully",
          data: {
            name: createdUser.name,
            email: createdUser.email,
            accessToken: createdUser.accessToken
          }
        });
      }
    } catch (error) {
      next(error);
    }
  }

  login = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.loginUser(req.body)
      if (result instanceof CustomError) {
        next(result);
      } else {
        res.cookie("refreshToken", result.refreshToken, {
          httpOnly: true, 
          secure: config.node_env.production ? true : false,
          sameSite: "none",
          path: "/",
          domain: config.cors_origin_domain[3],
        });
        
        this.sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "Login successful",
          data: {
            refreshToken: result.refreshToken,
            accessToken: result.accessToken
          }
        });
      }
    } catch (error) {
      next(error);
    }
  }

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken: incomingRefreshToken } = req.cookies;
    if (!incomingRefreshToken) {
      next(CustomError.unauthorized());
    }
    try {
      const result = await authService.tokenRefresh(incomingRefreshToken);
      if (result instanceof CustomError) {
        next(result);
      } else {
        res.cookie("refreshToken", result.newRefreshToken, {
          httpOnly: true, 
          secure: config.node_env.production ? true : false,
          sameSite: "none",
          path: "/",
          domain: config.cors_origin_domain[3],
        });
        
        this.sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "Token refreshed successfully",
          data: {
            accessToken: result.accessToken
          }
        });
      }
    } catch (error) {
      next(error);
    }
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken: incomingRefreshToken } = req.cookies;
    if (!incomingRefreshToken) {
      next(CustomError.badRequest("No refresh token to logout", 400));
    }
    try {
      await authService.logout(incomingRefreshToken);
      res.clearCookie("refreshToken", {
        httpOnly: true, 
        secure: config.node_env.production ? true : false,
        sameSite: "none",
        path: "/",
        domain: config.cors_origin_domain[3],
      });
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Logout successful"
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();

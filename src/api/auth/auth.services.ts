import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "./auth.schema";
import CustomError from './../../lib/Error';
import { config } from "../../../config/env";

class AuthService {
  registerUser = async(data: IUser) => {
    const { name, email, password } = data;
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw CustomError.badRequest("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const accessToken = this.generateAccessToken(data);
    const refreshToken = this.generateRefreshToken(data);
    if (!accessToken || !refreshToken) return CustomError.badRequest("Failed to generate access token");

    const user = new User({ name, email, password: hashedPassword, refreshToken });
    await user.save();

    return {
      name: user.name,
      email: user.email,
      refreshToken: refreshToken,
      accessToken: accessToken
    }
  };

  loginUser = async (data: IUser) => {
    const { email, password } = data
    const user = await User.findOne({ email });
    if (!user) throw CustomError.badRequest("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw CustomError.badRequest("Invalid credentials");

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    if (!accessToken || !refreshToken) throw CustomError.badRequest("Failed to generate access token");
    
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken }; 
  };

  async tokenRefresh(token: string) {
    const decoded = jwt.verify(token, config.secret_refresh_token as string) as { userId: string, name: string, email: string }
    const user = await User.findOne({ email: decoded.email });

      if (!user || user.refreshToken !== token) {
        throw CustomError.forbidden("Invalid or expired refresh token", 403);
      }

      const newAccessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      user.refreshToken = newRefreshToken;
      await user.save();
      return { accessToken: newAccessToken, newRefreshToken };
  }

  async logout(incomingRefreshToken: string) {
    const decoded = jwt.verify(incomingRefreshToken, config.secret_refresh_token as string) as {userId: string,name: string, email: string}
    const user = await User.findOne({ email: decoded.email });
    if (!user) throw CustomError.badRequest("User not found");

    user.refreshToken = null;
    await user.save();
  }

  async getProfile(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw CustomError.badRequest("User not found");
    return user;
  }

  generateAccessToken(user: IUser) {
    const payload = { userId: user._id, email: user.email, name: user.name };
    const secret = config.secret_access_token as string;
    const expiresIn = "2m";
    return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn});
  }

  generateRefreshToken(user: IUser) {
    const payload = { userId: user._id, email: user.email, name: user.name };
    const secret = config.secret_refresh_token as string;
    const expiresIn = "7d";
    return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn });
  }
}

export default new AuthService();

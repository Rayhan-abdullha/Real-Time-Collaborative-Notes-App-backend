// import { Request, Response, NextFunction } from 'express';
// import lib from '../lib';
// import User from "../api/auth/auth.schema";

// interface AuthorizationRequest extends Request {
//   user?: {
//     id: string;
//     name: string;
//     email: string;
//   };
// }

// const authorization = (permissions: string[]) => {
//   return async (req: AuthorizationRequest, _res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const userId = req.user?.id; 

//       if (!userId) {
//         return next(lib.CustomError.unauthorized());
//       }

//       // Correcting the Mongoose query
//       const user = await User.findById(userId);
//       if (!user) {
//         return next(lib.CustomError.notFound());
//       }

//       next();
//     } catch (error) {
//       next(lib.CustomError.internalServerError(error.message));
//     }
//   };
// };

// export default authorization;

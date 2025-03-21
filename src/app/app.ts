import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import YML from 'yamljs';
import { allRoutes } from '../routes/router';
import { middleware } from '../middleware';
import { config } from '../../config/env';

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [...config.cors_origin_domain as string[]],
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
  }),
);

const swaggerDocs = YML.load(path.join(__dirname, `../docs`, 'api-docs.yml'));
app.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/api/v1', allRoutes);

app.use((req: Request, _res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as Error & { status?: number };
  error.status = 404;
  next(error);
});

app.use(middleware.errorMiddleware);
export default app;

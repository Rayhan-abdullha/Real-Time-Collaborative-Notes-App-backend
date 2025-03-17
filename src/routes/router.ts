import express, { Request, Response } from 'express';
import auth from '../api/auth';
import notes from '../api/notes';

const router = express.Router();
router.use('/auth', auth.routes);
router.use('/notes', notes.routes);

export const allRoutes = router;

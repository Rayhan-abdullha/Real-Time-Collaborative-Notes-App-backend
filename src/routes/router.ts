import express, { Request, Response } from 'express';
import auth from '../api/auth';
import notes from '../api/notes';

const router = express.Router();
router.get('/health',
    (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', code: 200, message: 'Welcome to the API' });
});

router.use('/auth', auth.routes);
router.use('/notes', notes.routes);

export const allRoutes = router;

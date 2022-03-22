import { RequestHandler, Router } from 'express';
import { create, deleteOne, readOne } from '../controllers/files';
import multer from 'multer';

const storagePath = process.env.STORAGE_PATH || (process.cwd() + '/uploads');

const upload = multer({
    storage: multer.diskStorage({ destination: storagePath })
});

function asyncHandler(handler: Function): RequestHandler {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch {
            res.status(500).json({ message: 'internal_error' });
        }
    }

}

const router = Router();

router.delete('/:id', asyncHandler(deleteOne));
router.get('/:id', asyncHandler(readOne));
router.post('/', upload.single('file'), asyncHandler(create));

export default router; 
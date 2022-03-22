import { Request, Response } from 'express';
import fs from 'fs';
import FileModel from '../models/File';

const storagePath = process.env.STORAGE_PATH || (process.cwd() + '/uploads');

function respondWithFileNotFound(res: Response): void {
    res.status(404).json({ message: 'file_not_found' });
}

function respondWithFile(filename: string, res: Response): void {
    if (!filename || !storagePath) {
        respondWithFileNotFound(res);
    }
    try {
        const readStream = fs.createReadStream(`${storagePath}/${filename}`);
        readStream.pipe(res);
    } catch {
        respondWithFileNotFound(res);
    }
}

export async function deleteOne(req: Request, res: Response) {
    const file = await FileModel.findById(req.params.id);
    if (file) {
        try {
            fs.rmSync(`${storagePath}/${file.filename}`);
        } catch { }
        await file.remove();
    }
    res.status(204).send();
}

export async function readOne(req: Request, res: Response) {
    const file = await FileModel.findById(req.params.id);
    respondWithFile(file?.filename, res);
}

export async function create(req: Request, res: Response) {
    if (req.file) {
        const doc = await FileModel.create({
            filename: req.file.filename,
        });
        res.json({
            id: doc._id,
            uri: `/api/files/${doc._id}`
        });
    } else {
        res.status(400).json({ message: 'missing_file' });
    }
}

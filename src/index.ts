import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import filesRouter from './routes/files';

async function init() {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/monoapp');

    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use('/api/files', filesRouter);

    app.use((req, res) => {
        console.log(req.path)
        res.status(404).json({ message: 'not found' });
    });

    app.listen(3020, () => {
        console.log("Files service alive!");
    });
}

init();
import { Schema, model } from 'mongoose';

export interface IFile {
    filename: string;
}

const schema = new Schema({
    filename: String
});

const FileModel = model('File', schema);

export default FileModel;
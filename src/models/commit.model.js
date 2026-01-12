import mongoose from 'mongoose';

const commitSchema = new mongoose.Schema({
    sha: { //el sha es el identificador único del commit
        type: String,
        required: true,
        unique: true, //debe ser único
    },
    message: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    repository: {
        type: String, 
        required: true,
    },
    }, 
{
    versionKey: false, // para quitar el __v
    toJSON: { 
        transform: (doc, ret) => { 
            delete ret._id; // esto para quitar el _id que pone mongo por defecto, si lo queremos pues lo quitamos y ya
            return ret; 
        } 
    }
});

const Commit = mongoose.model('Commit', commitSchema);

export default Commit;
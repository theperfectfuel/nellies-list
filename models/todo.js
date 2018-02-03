import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Todo', todoSchema);

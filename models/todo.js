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
    },
    owner: {
        type: String
    },
    createdBy: {
        type: String,
        default: "Me"
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date
    },
    category: {
        type: String
    },
    value: {
        type: Number
    }
});

export default mongoose.model('Todo', todoSchema);

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
    dueDateOffset: {
        type: Number,
        default: 7
    },
    owner: {
        type: String
    },
    createdBy: {
        type: String,
        default: "Me"
    },
    category: {
        type: String
    },
    pointValue: {
        type: Number,
        default: 10
    },
    priority: {
        type: Number
    }
}, 
{
    timestamps: true
});

export default mongoose.model('Todo', todoSchema);

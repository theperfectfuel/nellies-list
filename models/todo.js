import mongoose from 'mongoose';
import moment from 'moment';

var dueDate = moment().format();

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
    dueDate: {
        type: Date,
        default: dueDate
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

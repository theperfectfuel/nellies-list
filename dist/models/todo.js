'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var todoSchema = new Schema({
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
}, {
    timestamps: true
});

exports.default = _mongoose2.default.model('Todo', todoSchema);
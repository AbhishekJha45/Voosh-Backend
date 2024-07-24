const mongoose = require("mongoose")

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["TODO", "IN PROGRESS", "DONE"],
        required: true,
        default: "TODO"
    },
    createdAt: Date
}, {
    versionKey: false
})

const TaskModel = mongoose.model("task", TaskSchema)


module.exports = TaskModel
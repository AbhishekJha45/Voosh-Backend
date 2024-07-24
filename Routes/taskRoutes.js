const express = require("express")
const { addTask, getTasks, getTaskById, updateTask, deleteTask } = require("../Controller/taskController")
const {verifyUserToken} = require('../jwtToken');
const Task = express.Router();

Task.post("/addtask", addTask,verifyUserToken);
Task.get("/tasks", getTasks,verifyUserToken);
Task.get("/taskby-id/:id", getTaskById,verifyUserToken);
Task.put("/update-task/:id", updateTask,verifyUserToken);
Task.delete("/delete-task/:id", deleteTask,verifyUserToken);

module.exports=Task
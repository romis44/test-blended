const express = require("express");
const { getTasks } = require("./tasksRouter");

const router = express.Router();
router.get("/", async (req, res, next) => {
  const tasks = await getTasks();

  res.status(200).json(tasks);
});

module.exports = {
  tasksRouter: router,
};

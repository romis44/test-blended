const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

// const dbPath = path.join(__dirname,"..","db","tasks.json")

const dbPath = path.join(process.cwd(), "db", "tasks.json");

const getTasks = async () => {
  const tasks = await fs.readFile(dbPath);
  if (!task) {
    throw new Error("task not found");
  }

  return tasks;
};

// (async () => {
//   const data = await getTasks();

//   console.log(data);
// })();

const getTask = async (id) => {
  const tasks = await getTask();
  const task = tasks.find((task) => task.id === id);

  return task;
};

const createTask = async (data) => {
  const tasks = await getTasks();
  const newTask = {
    id: crypto.randomUUID(),
    ...data,
  };
  tasks.push(newTask);

  await fs.writeFile(dbPath, JSON.stringify(tasks, null, 2));
  return newTask;
};

const updateTask = async (id, { title, completed }) => {
  const tasks = await getTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index == -1) {
    throw new Error("task not found");
  }
  tasks[index] = {
    title,
    completed,
  };
  await fs.writeFile(dbPath, JSON.stringify(tasks, null, 2));
  return tasks[index];
};
const deleteTask = async (id) => {
  const tasks = await getTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index == -1) {
    throw new Error("task not found");
  }
  tasks.splice(index, 1);
  await fs.writeFile(dbPath, JSON.stringify(tasks, null, 2));
  return id;
};

module.exports = {
  getTask,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

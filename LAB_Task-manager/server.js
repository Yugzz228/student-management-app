const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const DATA_FILE = path.join(__dirname, "data", "tasks.json");

if (!fs.existsSync(DATA_FILE)) {
  fs.mkdirSync(path.join(__dirname, "data"), { recursive: true });
  fs.writeFileSync(DATA_FILE, "[]");
}

function getTasks() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

app.get("/", (req, res) => {
  const tasks = getTasks();
  res.render("index", { tasks });
});

app.post("/add", (req, res) => {
  const tasks = getTasks();

  tasks.push({
    id: Date.now(),
    title: req.body.title,
    completed: false
  });

  saveTasks(tasks);
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  let tasks = getTasks();

  tasks = tasks.filter(t => t.id != req.params.id);

  saveTasks(tasks);
  res.redirect("/");
});

app.post("/complete/:id", (req, res) => {
  const tasks = getTasks();

  tasks.forEach(t => {
    if (t.id == req.params.id) t.completed = true;
  });

  saveTasks(tasks);
  res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
  const tasks = getTasks();

  tasks.forEach(t => {
    if (t.id == req.params.id) t.title = req.body.title;
  });

  saveTasks(tasks);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

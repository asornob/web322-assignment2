const express = require("express");
const path = require("path");
const ejs = require("ejs");

const projectData = require("./modules/projects");

const app = express();
const PORT = process.env.PORT || 8080;

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.get("/", (req, res) => {
  res.render("home", { title: "Climate Solutions" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/solutions/projects", (req, res) => {
  const projects = projectData.getAllProjects();
  res.render("projects", { title: "All Sectors Projects", projects });
});

app.get("/solutions/projects/:id", (req, res) => {
  const project = projectData.getProjectById(req.params.id);
  if (project) {
    res.render("project", { title: project.name, project });
  } else {
    res.status(404).render("404", { title: "Project Not Found" });
  }
});

app.get("/solutions/sector/:sector", (req, res) => {
  const sectorProjects = projectData.getProjectsBySector(req.params.sector);
  res.render("projects", {
    title: `${req.params.sector} Projects`,
    projects: sectorProjects,
  });
});

// 404 Page
app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

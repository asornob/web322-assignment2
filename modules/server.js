const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();
const PORT = process.env.PORT || 8080;

// setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static folder
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res) => {
  res.render("home", { title: "Explore Climate Solutions" });
});

app.get("/solutions/projects", async (req, res) => {
  try {
    const sector = req.query.sector || "All";
    const projects = req.query.sector
      ? await projectData.getProjectsBySector(req.query.sector)
      : await projectData.getAllProjects();

    res.render("projects", {
      title: `${sector} Projects`,
      projects: projects,
    });
  } catch (err) {
    res.status(500).render("404", { message: "Error loading projects." });
  }
});

app.get("/solutions/projects/:id", async (req, res) => {
  try {
    const project = await projectData.getProjectById(req.params.id);
    res.render("project", { project });
  } catch (err) {
    res.status(404).render("404", { message: "Project not found" });
  }
});

app.use((req, res) => {
  res.status(404).render("404", { message: "Page Not Found" });
});

// initialize + export for Vercel
projectData.initialize().then(() => {
  if (process.env.VERCEL) {
    module.exports = app; // 🟢 for Vercel
  } else {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }
});

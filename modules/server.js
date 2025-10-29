const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static files
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res) => {
  res.render("home", {
    title: "Explore Climate Solutions",
  });
});

app.get("/solutions/projects", async (req, res) => {
  try {
    let projects;
    let sector = req.query.sector || "All";

    if (req.query.sector) {
      projects = await projectData.getProjectsBySector(req.query.sector);
    } else {
      projects = await projectData.getAllProjects();
    }

    res.render("projects", {
      title: "All Sectors Projects",
      projects,
      sector, // 👈 this fixes the undefined error
    });
  } catch (err) {
    res.status(404).render("404", { message: err });
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

// 404 route
app.use((req, res) => {
  res.status(404).render("404", { message: "Page Not Found" });
});

// start server
projectData
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () =>
      console.log(`Server running on port ${HTTP_PORT}`)
    );
  })
  .catch((err) => console.log(`Error initializing data: ${err}`));

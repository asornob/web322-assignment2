/********************************************************************************
*  WEB322 – Assignment 02
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy.
*
*  Name: Al Sad Ornob
*  Student ID: 130207236
*  Date: October 28, 2025
*  Published URL: (add your vercel link after deployment)
********************************************************************************/

const express = require("express");
const path = require("path");
const app = express();

const projectData = require("./modules/projects.js");

// set EJS view engine
app.set("view engine", "ejs");

// static files
app.use(express.static("public"));

// ================= ROUTES ================= //

// Home
app.get("/", (req, res) => {
  res.render("home");
});

// About
app.get("/about", (req, res) => {
  res.render("about");
});

// All or filtered projects
app.get("/solutions/projects", async (req, res) => {
  try {
    if (req.query.sector) {
      const list = await projectData.getProjectsBySector(req.query.sector);
      if (!list.length)
        return res.status(404).render("404", { message: "No projects found for that sector" });
      res.render("projects", { projects: list, sector: req.query.sector });
    } else {
      const all = await projectData.getAllProjects();
      res.render("projects", { projects: all, sector: "All Sectors" });
    }
  } catch (err) {
    res.status(404).render("404", { message: "Error loading projects" });
  }
});

// Single project
app.get("/solutions/projects/:id", async (req, res) => {
  try {
    const p = await projectData.getProjectById(req.params.id);
    res.render("project", { project: p });
  } catch (err) {
    res.status(404).render("404", { message: "Project not found" });
  }
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { message: "Page not found" });
});

// ================= SERVER START ================= //
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

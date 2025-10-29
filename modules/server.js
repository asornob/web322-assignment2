const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();

// set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// initialize project data before starting server
projectData
  .initialize()
  .then(() => {
    console.log("Data loaded successfully!");
  })
  .catch((err) => {
    console.log("Error initializing data:", err);
  });

// Home route
app.get("/", (req, res) => {
  res.render("home", { title: "Climate Solutions" });
});

// About route
app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

// All or filtered projects
app.get("/solutions/projects", async (req, res) => {
  try {
    let projects;
    if (req.query.sector) {
      projects = await projectData.getProjectsBySector(req.query.sector);
    } else {
      projects = await projectData.getAllProjects();
    }

    res.render("projects", {
      title: "All Sectors Projects",
      projects: projects,
    });
  } catch (err) {
    res.status(404).render("404", { message: err });
  }
});

// 404 route (for any unknown path)
app.use((req, res) => {
  res.status(404).render("404", { message: "Page Not Found" });
});

// ✅ Proper for both localhost & Vercel
const PORT = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // required for Vercel

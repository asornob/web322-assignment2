const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Home
app.get("/", (req, res) => {
  res.render("home", { title: "Climate Solutions" });
});

// About
app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

// Projects list
app.get("/solutions/projects", async (req, res) => {
  try {
    const projects = await projectData.getAllProjects();
    res.render("projects", { title: "All Projects", projects });
  } catch (err) {
    console.error("Error in /solutions/projects:", err);
    res.status(500).render("404", { message: err, title: "Error" });
  }
});

// Unknown route
app.use((req, res) => {
  res.status(404).render("404", { message: "Page Not Found", title: "404" });
});

// ✅ Proper startup order
const PORT = process.env.PORT || 8080;

(async function start() {
  try {
    await projectData.initialize();
    console.log("✅ Data loaded successfully!");
    app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ Failed to initialize data:", err);
  }
})();

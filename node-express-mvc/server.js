import dotenv from "dotenv"; // SUPPORT .ENV FILES
dotenv.config(); // LOAD .ENV VARIABLES

import express from "express"; // BRING IN EXPRESS
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors"; // USE CORS PACKAGE FOR CROSS-ORIGIN REQUESTS
import articles from "./routes/articlesRoutes.js"; // ARTICLES ROUTES

// SET UP PATH RESOLUTION FOR ES MODULES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // INITIALIZE APP
const port = process.env.PORT || 3000; // INITIALIZE DEFAULT PORT OR PORT FROM ENVIRONMENT VARIABLE

// VIEW ENGINE SETUP
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// USE MIDDLEWARES
app.use(express.urlencoded({ extended: false })); // PARSE application/x-www-form-urlencoded
app.use(express.json()); // PARSE application/json

// USE STATIC FILES (CSS, JS, IMAGES)
app.use(express.static(path.join(__dirname, "public")));

// CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  })
);

// SECURITY
app.disable("x-powered-by");

// ROUTES
articles(app); // ARTICLES ROUTES

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({ error: err.message });
});

// START SERVER
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// EXPORT APP (FOR TESTING OR OTHER PURPOSES)
export default app;

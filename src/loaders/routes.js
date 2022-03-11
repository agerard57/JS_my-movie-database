const express = require("express");

module.exports = function routes(app) {
  let router = express.Router();
  let srcPath = __dirname.replace("loaders", "");

  // ........................ Assets route ........................
  app.use("/assets", express.static(srcPath + "assets"));

  // ........................ Home route ........................
  app.get("/", (_req, res) => {
    res.sendFile(srcPath + "index.html");
  });

  app.use("/", router);

  // ........................ List Routes ........................
  app.get("/list", (_req, res) => {
    res.sendFile(srcPath + "pages/list/list.html");
  });

  app.use(
    "/assets/scripts/list/list.js",
    express.static(srcPath + "pages/list/list.js")
  );

  app.use(
    "/assets/scripts/list/list.model.js",
    express.static(srcPath + "pages/list/list.model.js")
  );

  // ........................ Movie Routes ........................
  app.get("/id/:id", (req, res) => {
    let id = req.params.id;
    res.sendFile(srcPath + "pages/movie/movie.html", { id: id });
  });

  app.use(
    "/assets/scripts/movie/movie.js",
    express.static(srcPath + "pages/movie/movie.js")
  );

  app.use(
    "/assets/scripts/movie/movie.model.js",
    express.static(srcPath + "pages/movie/movie.model.js")
  );

  // ........................ Redirect Route ........................
  //Automatically redirect any invalid paths to home
  //TODO Redirect to custom error page
  /*   app.get("*", (_req, res) => {
    res.redirect("/");
  }); */
};

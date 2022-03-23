module.exports = function (app, express, srcPath) {
  app.use(
    "/assets/scripts/utils/formatReleaseDate.js",
    express.static(srcPath + "utils/formatReleaseDate.js")
  );

  app.use(
    "/assets/scripts/utils/formatImageUrl.js",
    express.static(srcPath + "utils/formatImageUrl.js")
  );

  app.use(
    "/assets/scripts/utils/getRequest.js",
    express.static(srcPath + "utils/getRequest.js")
  );

  app.use(
    "/assets/scripts/utils/getIdFromUrl.js",
    express.static(srcPath + "utils/getIdFromUrl.js")
  );

  app.use(
    "/assets/scripts/utils/getWeather.js",
    express.static(srcPath + "utils/getWeather.js")
  );

  app.use(
    "/assets/scripts/utils/urlContains.js",
    express.static(srcPath + "utils/urlContains.js")
  );

  app.use(
    "/assets/scripts/utils/userDataStorage.js",
    express.static(srcPath + "utils/userDataStorage.js")
  );
};

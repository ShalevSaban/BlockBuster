const cors = require("cors");

const corsOptions = {
  origin: "https://bluckbuster.onrender.com",
  optionsSuccessStatus: 204,
};

module.exports = function (app) {
  app.use(cors(corsOptions));
};

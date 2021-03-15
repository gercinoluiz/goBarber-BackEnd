"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("express-async-errors");

require("reflect-metadata");

require("../typeorm");

require("../../container");

var _routes = _interopRequireDefault(require("./routes"));

var _morgan = _interopRequireDefault(require("morgan"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _globalErrorHandler = _interopRequireDefault(require("../../errors/globalErrorHandler"));

var _cors = _interopRequireDefault(require("cors"));

var _celebrate = require("celebrate");

var _rateLimiter = _interopRequireDefault(require("../middleware/rateLimiter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// It must be right inside express importing
// the code like this calls the code insede the file without the need of an export
_dotenv.default.config();

const app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use(_globalErrorHandler.default); // must be after the routes

app.use('/files', _express.default.static(_upload.default.uploadFolder)); //I need to use the line bellow after my files routes

app.use(_rateLimiter.default); // src/server.ts

app.listen(3333, () => {
  console.log("SERVER STARTED ON PORT 3333!");
});
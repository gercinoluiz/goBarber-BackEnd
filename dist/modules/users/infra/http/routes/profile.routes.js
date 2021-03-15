"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthetications = _interopRequireDefault(require("../middlewares/ensureAuthetications"));

var _ProfileController = _interopRequireDefault(require("../Controllers/ProfileController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const profileRouter = (0, _express.Router)();
const profileController = new _ProfileController.default(); //TODO: Very Important

profileRouter.use(_ensureAuthetications.default);
profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);
var _default = profileRouter;
exports.default = _default;
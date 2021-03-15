"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthetications = _interopRequireDefault(require("../middlewares/ensureAuthetications"));

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _UsersControler = _interopRequireDefault(require("../Controllers/UsersControler"));

var _UpdateUserAvatarController = _interopRequireDefault(require("../Controllers/UpdateUserAvatarController"));

var _reqChecker = _interopRequireDefault(require("../../../../../shared/infra/http/celebrate/reqChecker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)(_upload.default);
const usersRouter = (0, _express.Router)();
const usersController = new _UsersControler.default();
const updateUserAvatarController = new _UpdateUserAvatarController.default();
usersRouter.post("/", _reqChecker.default.user, usersController.create);
usersRouter.patch("/avatar", _ensureAuthetications.default, upload.single('avatar'), updateUserAvatarController.update);
var _default = usersRouter;
exports.default = _default;
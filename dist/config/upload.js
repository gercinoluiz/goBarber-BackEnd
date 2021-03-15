"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tempFolder = _path.default.resolve(__dirname, '..', '..', 'temp');

const uploadFolder = _path.default.resolve(tempFolder, 'uploads');

var _default = {
  tempFolder,
  uploadFolder,
  storage: _multer.default.diskStorage({
    destination: _path.default.resolve(__dirname, '..', '..', 'temp'),

    filename(request, file, callback) {
      const filehash = _crypto.default.randomBytes(10).toString('hex');

      const filename = `${filehash}-${file.originalname}`;
      return callback(null, filename);
    }

  })
};
exports.default = _default;
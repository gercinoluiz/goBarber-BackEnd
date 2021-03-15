"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAutentication;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureAutentication(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new _AppError.default('jwt token is missing', 402);
  console.log({
    authHeader
  }); // The code bellow separetes the Barear word from the token 7as85osa@!@i@ijidsaoj

  const [, token] = authHeader.split(' '); // The comma says i don want to use the first one from the desistruturation
  // I am using a try here in Order to send a custom error

  try {
    console.log({
      token
    });
    const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub
    } = decoded; // forcing the decoded to have sub inside it **Nice

    request.user = {
      id: sub
    };
    return next();
  } catch {
    console.log('HERE');
    throw new _AppError.default('Invalid JWT token', 401);
  }
}
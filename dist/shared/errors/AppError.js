"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class AppError extends Error {
  constructor(message, statuscode = 400) {
    super(message);
    this.message = void 0;
    this.statusCode = void 0;
    this.status = void 0;
    this.isOperational = void 0;
    this.message = message;
    this.status = `${statuscode}`.startsWith('4') ? 'fail' : 'error';
    this.statusCode = statuscode;
    this.isOperational = true; // Everytime I call this AppError it will be true, if not It is not this custom class,but the Erro class

    Error.captureStackTrace(this, this.constructor);
  }

}

var _default = AppError;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const globalErrorHandler = (err, request, response, next) => {
  // If I have four parameters I know It is an Error Handler
  if (err.isOperational) {
    return response.status(err.statusCode).json({
      status: err.status,
      mesage: err.message
    });
  }

  console.log(err.stack);
  console.log(err.message);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
};

var _default = globalErrorHandler;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

const reqChecker = {
  createAppointment: (0, _celebrate.celebrate)({
    [_celebrate.Segments.BODY]: {
      provider_id: _celebrate.Joi.string().uuid().required(),
      date: _celebrate.Joi.date()
    }
  }),
  provider_id: (0, _celebrate.celebrate)({
    [_celebrate.Segments.PARAMS]: {
      provider_id: _celebrate.Joi.string().uuid().required()
    }
  }),
  email: (0, _celebrate.celebrate)({
    [_celebrate.Segments.BODY]: {
      email: _celebrate.Joi.string().email().required()
    }
  }),
  resetPassword: (0, _celebrate.celebrate)({
    [_celebrate.Segments.BODY]: {
      token: _celebrate.Joi.string().uuid().required(),
      password: _celebrate.Joi.string().required(),
      password_confirmation: _celebrate.Joi.string().valid(_celebrate.Joi.ref('password'))
    }
  }),
  profile: (0, _celebrate.celebrate)({
    [_celebrate.Segments.BODY]: {
      name: _celebrate.Joi.string().required(),
      email: _celebrate.Joi.string().email().required(),
      old_password: _celebrate.Joi.string(),
      password: _celebrate.Joi.string(),
      password_confirmation: _celebrate.Joi.string().valid(_celebrate.Joi.ref('password'))
    }
  }),
  session: (0, _celebrate.celebrate)({
    [_celebrate.Segments.BODY]: {
      email: _celebrate.Joi.string().email().required(),
      password: _celebrate.Joi.string().required()
    }
  }),
  user: (0, _celebrate.celebrate)({
    [_celebrate.Segments.BODY]: {
      name: _celebrate.Joi.string().required(),
      email: _celebrate.Joi.string().email().required(),
      password: _celebrate.Joi.string().required()
    }
  })
};
var _default = reqChecker;
exports.default = _default;
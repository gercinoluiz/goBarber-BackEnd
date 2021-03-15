"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Notification = _interopRequireDefault(require("../../infra/typeorm/schemas/Notification"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeNotificationsRepository {
  constructor() {
    this.notifications = [];
  }

  async create({
    content,
    receipt_id
  }) {
    const notification = new _Notification.default();
    Object.assign(notification, {
      id: new _mongodb.ObjectID(),
      receipt_id,
      content
    });
    this.notifications.push(notification);
    return notification;
  }

}

exports.default = FakeNotificationsRepository;
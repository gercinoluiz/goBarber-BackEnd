"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Notification = _interopRequireDefault(require("../schemas/Notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotificationsRepository {
  constructor() {
    this.mongoOrmRepository = void 0;
    this.mongoOrmRepository = (0, _typeorm.getMongoRepository)(_Notification.default, 'mongo');
  }

  async create({
    content,
    receipt_id
  }) {
    const notification = this.mongoOrmRepository.create({
      receipt_id,
      content
    });
    await this.mongoOrmRepository.save(notification);
    return notification;
  }

}

exports.default = NotificationsRepository;
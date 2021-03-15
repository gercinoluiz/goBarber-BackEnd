"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddFieldAvatartToUsersTable1605037510937 {
  async up(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: "avatar",
      type: 'varchar',
      isNullable: true // I got to pay atention when creating table with this option as false, due to the formar data

    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('users', 'avatar');
  }

}

exports.default = AddFieldAvatartToUsersTable1605037510937;
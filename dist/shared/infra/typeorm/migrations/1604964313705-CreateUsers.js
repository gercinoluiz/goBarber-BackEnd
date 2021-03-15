"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUsers1604964313705 {
  async up(queryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'); // this code aims to generate automaticlly uuid in postgrees

    await queryRunner.createTable(new _typeorm.Table({
      name: "users",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "name",
        type: "varchar",
        isNullable: false // it says it is impossible to leave this field as null

      }, {
        name: "email",
        type: "varchar",
        isNullable: false,
        // it says it is impossible to leave this field as null
        isUnique: true
      }, {
        name: "password",
        type: "varchar",
        isNullable: false // it says it is impossible to leave this field as null

      }, {
        name: 'created_at',
        type: 'timestamp',
        // Only available in postgress
        isNullable: false,
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        // Only available in postgress
        isNullable: false,
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('appointments');
  }

}

exports.default = CreateUsers1604964313705;
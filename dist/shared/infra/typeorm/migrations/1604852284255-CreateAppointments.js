"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAppointments1604852284255 = void 0;

var _typeorm = require("typeorm");

class CreateAppointments1604852284255 {
  async up(queryRunner) {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'); // this code aims to generate automaticlly uuid in postgrees

    await queryRunner.createTable(new _typeorm.Table({
      name: "appointments",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "provider",
        type: "varchar",
        isNullable: false // it says it is impossible to leave this field as null

      }, {
        name: 'date',
        type: 'timestamp with time zone',
        // Only available in postgress
        isNullable: false
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
        default: 'now()',
        isNullable: false
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('appointments');
  }

}

exports.CreateAppointments1604852284255 = CreateAppointments1604852284255;
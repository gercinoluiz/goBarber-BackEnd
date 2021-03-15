"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterFieldProviderId1604971592762 = void 0;

var _typeorm = require("typeorm");

class AlterFieldProviderId1604971592762 {
  async up(queryRunner) {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: "provider_id",
      type: "uuid",
      isNullable: true
    }));
    await queryRunner.createForeignKey('appointments', new _typeorm.TableForeignKey({
      name: "AppointmentProvider",
      columnNames: ['provider_id'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: "provider",
      type: "varchar",
      isNullable: false // it says it is impossible to leave this field as null

    }));
  }

}

exports.AlterFieldProviderId1604971592762 = AlterFieldProviderId1604971592762;
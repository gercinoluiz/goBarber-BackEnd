import { boolean } from "@hapi/joi";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddProviderField1615917841299 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'isProvider',
                type: 'boolean',
                isNullable: true,
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'provider');
    }
}

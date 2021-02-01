import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddFieldAvatartToUsersTable1605037510937 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('users', new TableColumn({
            name: "avatar",
            type: 'varchar',
            isNullable: true // I got to pay atention when creating table with this option as false, due to the formar data
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn('users', 'avatar')

    }

}

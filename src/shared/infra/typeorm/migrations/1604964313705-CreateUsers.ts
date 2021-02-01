import { MigrationInterface, QueryRunner, Table, Unique } from "typeorm";

export default class CreateUsers1604964313705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');  // this code aims to generate automaticlly uuid in postgrees


        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },

                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false // it says it is impossible to leave this field as null
                    },

                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false, // it says it is impossible to leave this field as null
                        isUnique: true

                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false // it says it is impossible to leave this field as null
                    },

                    {
                        name: 'created_at',
                        type: 'timestamp', // Only available in postgress
                        isNullable: false,
                        default: 'now()'
                    },

                    {
                        name: 'updated_at',
                        type: 'timestamp', // Only available in postgress
                        isNullable: false,
                        default: 'now()'
                    },



                ]

            })
        )



    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('appointments')
    }

}

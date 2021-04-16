import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransfers1618585301809 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transfers",
        columns: [
          { name: "statement_out", type: "uuid", isPrimary: true},
          { name: "statement_in", type: "uuid", isPrimary: true}
        ],
        foreignKeys: [
          {
            name: 'FKTransfers_StatementOut',
            columnNames: ['statement_out'],
            referencedTableName: 'statements',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          {
            name: 'FKTransfers_StatementIn',
            columnNames: ['statement_in'],
            referencedTableName: 'statements',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transfers")
  }

}

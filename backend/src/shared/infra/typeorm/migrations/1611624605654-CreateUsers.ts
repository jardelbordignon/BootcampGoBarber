import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUsers1611624605654 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            //default: 'generate()'
          },
          {
            name: 'name',
            type: 'varchar(100)'
          },
          {
            name: 'email',
            type: 'varchar(120)',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'avatar',
            type: 'varchar(100)',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP'
          }
        ]
      })
    )
    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'ProviderFK',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL', // caso o prestador exclua seu registro os dados devem permanecer para o cliente
      onUpdate: 'CASCADE'
    }))

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'ClientFK',
      columnNames: ['client_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL', // caso o cliente exclua seu registro os dados devem permanecer para o prestador
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'appointmentsFK')
    await queryRunner.dropTable('users')
  }

}

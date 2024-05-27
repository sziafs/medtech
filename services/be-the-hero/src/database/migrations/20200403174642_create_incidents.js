exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){ 
        //campos
        table.increments(); //primary key
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); // relacionamento

        table.foreign('ong_id').references('id').inTable('ongs'); // chave estrangeira
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};

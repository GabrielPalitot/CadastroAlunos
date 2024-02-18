const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          nome: 'Luiz',
          email: 'Luiz@gmail.com',
          password_hash: await bcryptjs.hash('Valtev123', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Luiz1',
          email: 'Luiz1@gmail.com',
          password_hash: await bcryptjs.hash('Valtev123', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Luiz2',
          email: 'Luiz2@gmail.com',
          password_hash: await bcryptjs.hash('Valtev123', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down() { },
};

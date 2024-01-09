'use strict';

const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gerente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: 'Cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
     
     await queryInterface.bulkInsert('users', [{
      name: 'External Admin',
      username: 'external-admin',
      email: 'external-admin@gmail.com',
      password: bcrypt.hashSync('12345678', 10),
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      active: 1,
      token: 'external-admin'
     }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

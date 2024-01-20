'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.literal("gen_random_uuid()")      // Tự động render ra một id duy nhất theo tiêu chuẩn v4

      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique:true,
       
      },
      address: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      roleCode: {
        type: Sequelize.STRING,
        references:{       // ràng buộc với bảng Roles
          model :'Roles',
          key:'code'
        }
      },
      avatar: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
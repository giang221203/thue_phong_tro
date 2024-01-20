'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"), // Tự động render ra một id duy nhất theo tiêu chuẩn v4
      },
      text: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      propertyId: {
        type: Sequelize.UUID,
        references:{       // ràng buộc với bảng Properties
          model :'Properties',
          key:'id'
        }
      },
      uid: {
        type: Sequelize.UUID,
        references:{       // ràng buộc với bảng Features
          model :'Users',
          key:'id'
        }
      },
      parentComment:{
        type: Sequelize.UUID,
        allowNull: false,
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
    await queryInterface.dropTable('Comments');
  }
};
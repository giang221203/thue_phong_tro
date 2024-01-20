'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PropertyFeatures', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"), // Tự động render ra một id duy nhất theo tiêu chuẩn v4
      },
      propertyId: {
        type: Sequelize.UUID,
        references:{       // ràng buộc với bảng Properties
          model :'Properties',
          key:'id'
        }
      },
      featureId: {
        type: Sequelize.UUID,
        references:{       // ràng buộc với bảng Features
          model :'Features',
          key:'id'
        }
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
    await queryInterface.dropTable('PropertyFeatures');
  }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserMedias', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue:Sequelize.literal("gen_random_uuid()")      // Tự động render ra một id duy nhất theo tiêu chuẩn v4

      },
      uid: {
        type: Sequelize.UUID,
        references:{       // ràng buộc với bảng User
          model :'Users',
          key:'id'
        }
   
      },
      provider: {
        type: Sequelize.STRING,
        allowNull:false   // không cho phép null
      },
      link: {
        type: Sequelize.STRING,
        allowNull:false
      },
      icon: {
        type: Sequelize.STRING,
        allowNull:false   // không cho phép null
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
    await queryInterface.dropTable('UserMedias');
  }
};
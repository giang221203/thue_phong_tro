'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"), // Tự động render ra một id duy nhất theo tiêu chuẩn v4
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      listingType: {
        type: Sequelize.ENUM(['SALE','RENTAL']),
        allowNull:false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      propertyTypeId: {
        type: Sequelize.UUID,
        allowNull:false,
        references:{       // ràng buộc với bảng PropertyTypes
          model :'PropertyTypes',
          key:'id'
        }
      },
      status: {
        type: Sequelize.ENUM(['PENDING','RENTAL','APPROVED']),
        // pending :trạng thái chờ duyệt ,cancel:bị từ chối ,approved :được phép đăng
        defaultValue:'PENDING'
      },
      isAvailable: { // trạng thái chưa được bán hoặc đã được bán
        type: Sequelize.BOOLEAN,
        defaultValue:true 
      },
      images: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      featuredImage: {
        type: Sequelize.STRING,
        allowNull:false
      },
      postedBy: {
        type: Sequelize.UUID,
        allowNull:false,
        references:{       // ràng buộc với bảng Users
          model :'Users',
          key:'id'
        }
        
      },
      bedRoom: {
        type: Sequelize.INTEGER,
    
      },
      bathRoom: {
        type: Sequelize.INTEGER,
      
      },
      propertySize: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      yearBuilt: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Properties');
  }
};
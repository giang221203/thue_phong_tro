module.exports = {
  // add 1 column trong bảng property
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Properties", "owner", {
      // tên bảng muốn thêm ,1 column muốn thêm,thuộc tính
      type: Sequelize.UUID,
      references: {
        // ràng buộc ower với bảng Users
        model: "Users",
        key: "id",
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Properties", "owner");
  },
};

const { DataTypes } = require("sequelize");

const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
  });

  return Category;
}

module.exports = CategoryModel;
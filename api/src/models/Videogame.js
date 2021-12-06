const { urlencoded } = require('body-parser');
const { DataTypes, UUID, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Videogame", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    createdInDb : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://screencraft.org/wp-content/uploads/2021/08/Write-for-Video-Games-1024x576.jpg',
      set(value) {
        if(value === '') {
        this.setDataValue('image',
        'https://screencraft.org/wp-content/uploads/2021/08/Write-for-Video-Games-1024x576.jpg')
        } else {
        this.setDataValue('image', value);
        }
      }
    },
  });
};

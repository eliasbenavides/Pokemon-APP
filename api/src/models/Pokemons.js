const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemons', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp:{
      type: DataTypes.INTEGER
    },
    attack:{
      type: DataTypes.INTEGER
    },
    defense:{
      type: DataTypes.INTEGER
    },
    speed:{
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    },
    urlImg: {
      type: DataTypes.STRING,
      defaultValue: 'https://www.carteltec.com/wp-content/uploads/2021/08/1629211687_Este-Pokemon-es-el-unico-que-no-tiene-debilidades-758x387.jpg'
    },
    createInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }

  },{timestamps: false});
};

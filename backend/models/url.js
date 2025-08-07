import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Url = sequelize.define('Url', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.STRING,
      unique: true
    },
    url_encurtada: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });

  return Url;
};
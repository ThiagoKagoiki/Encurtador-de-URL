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
    urlOriginal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shortLink: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  return Url;
};
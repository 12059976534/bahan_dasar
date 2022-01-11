

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wisata = sequelize.define('Wisata', {
    namawisata: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    no_pengurus: DataTypes.STRING,
    poto: DataTypes.STRING,
    
  }, {});

  return Wisata;
};
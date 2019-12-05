const  Sequelize =  require('sequelize');
const db  = require('../config/db');

const User = db.define('users',{

id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
	
	name:{
		type:Sequelize.STRING,
		allowNull: false,
		field:'name',
	},

	institute:{
		type:Sequelize.STRING,
		allowNull: false,
		field:'institute',
	},

	year:{
		type:Sequelize.STRING,
		allowNull: false,
		field:'year',
	},


	},{timestamps: false})
module.exports=User;
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

	email:
	{
		type:Sequelize.STRING,
		allowNull: false,
		field:'email',

	},

		password:
	{
		type:Sequelize.STRING,
		allowNull: false,
		field:'password',

	},
	// facebook: {
	// 	id: String,
	// 	token: String,
	// 	email: String,
	// 	name: String
	//   },



	},{timestamps: false})
module.exports=User;
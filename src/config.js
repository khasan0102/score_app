const host = 'localhost'
const PORT = process.env.PORT || 3000

const pgConfig = {
	host: 'localhost',
	port: 5432,
	user:'postgres',
	password: '0102',
	database: 'score_db'
}

module.exports = { 
	pgConfig,
	PORT,
	host
}
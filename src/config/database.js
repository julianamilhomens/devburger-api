require('dotenv').config();

console.log('🔍 DATABASE_URL existe?', !!process.env.DATABASE_URL);
console.log('🔍 NODE_ENV:', process.env.NODE_ENV);

module.exports = {
    ...(process.env.DATABASE_URL
        ? {
            url: process.env.DATABASE_URL,
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
        : {
            dialect: 'postgres',
            host: process.env.PG_HOST || 'localhost',
            port: process.env.PG_PORT || 5432,
            username: process.env.PG_USERNAME || 'postgres',
            password: process.env.PG_PASSWORD || 'postgres',
            database: process.env.PG_DATABASE || 'devburger',
        }),

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    logging: process.env.NODE_ENV === 'development' ? console.log : false,

    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
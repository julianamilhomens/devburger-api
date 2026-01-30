require('dotenv').config();

module.exports = {
   
    ...(process.env.DATABASE_URL
        ? {
            url: process.env.DATABASE_URL,
            dialect: 'postgres',
        }
        : {
            
            dialect: 'postgres',
            host: process.env.PG_HOST || 'localhost',
            port: process.env.PG_PORT || 5432,
            username: process.env.PG_USERNAME || 'postgres',
            password: process.env.PG_PASSWORD || 'postgres',
            database: process.env.PG_DATABASE || 'devburger',
        }),

   
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            require: true,
            rejectUnauthorized: false
        } : false
    },

   
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
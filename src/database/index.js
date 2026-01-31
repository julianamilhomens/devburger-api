import Sequelize from "sequelize";
import mongoose from "mongoose";
import configDatabase from '../config/database'

import User from "../app/models/User";
import Product from "../app/models/Product";
import Category from "../app/models/Category";

const models = [User, Product, Category];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        console.log('🔍 Iniciando conexão PostgreSQL...');
        
        if (process.env.DATABASE_URL) {
            console.log('🔍 Usando DATABASE_URL com SSL');
            this.connection = new Sequelize(process.env.DATABASE_URL, {
                dialect: 'postgres',
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                },
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
                logging: false,
                define: {
                    timestamps: true,
                    underscored: true,
                    underscoredAll: true,
                }
            });
        } else {
           
            console.log('🔍 Usando configuração local');
            this.connection = new Sequelize(configDatabase);
        }
        
       
        this.connection.authenticate()
            .then(() => {
                console.log('✅ PostgreSQL conectado com sucesso!');
                return this.syncModels();
            })
            .catch(err => {
                console.error('❌ Erro PostgreSQL:', err.message);
                console.error('Stack:', err.stack);
                process.exit(1);
            });

       
        models
            .map((model) => model.init(this.connection))
            .map((model) => model.associate && model.associate(this.connection.models));
    }

    async mongo() {
        try {
            console.log('🔍 Conectando MongoDB...');
            this.mongoConnection = await mongoose.connect(
                process.env.MONGO_URL || 'mongodb://localhost:27017/devburger'
            );
            console.log('✅ MongoDB conectado com sucesso!');
        } catch (err) {
            console.error('❌ Erro MongoDB:', err.message);
            process.exit(1);
        }
    }

    async syncModels() {
        try {
            if (process.env.NODE_ENV === 'development') {
                await this.connection.sync({ alter: true });
            } else {
                await this.connection.sync();
            }
            console.log('📊 Models sincronizados com PostgreSQL');
        } catch (err) {
            console.error('❌ Erro ao sincronizar models:', err.message);
        }
    }
}

export default new Database();
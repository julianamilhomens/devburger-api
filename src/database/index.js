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
        this.connection = new Sequelize(configDatabase);
        
        // Testar conexão PostgreSQL
        this.connection.authenticate()
            .then(() => console.log('✅ PostgreSQL conectado com sucesso!'))
            .catch(err => {
                console.error('❌ Erro PostgreSQL:', err.message);
                process.exit(1);
            });

        models
            .map((model) => model.init(this.connection))
            .map((model) => model.associate && model.associate(this.connection.models));
    }

    async mongo() {
        try {
            // Usar MONGO_URL do .env
            this.mongoConnection = await mongoose.connect(
                process.env.MONGO_URL || 'mongodb://localhost:27017/devburger'
            );
            console.log('✅ MongoDB conectado com sucesso!');
        } catch (err) {
            console.error('❌ Erro MongoDB:', err.message);
            process.exit(1);
        }
    }

    // Método para sincronizar models
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
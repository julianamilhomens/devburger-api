import Category from '../../app/models/Category.js';
import User from '../../app/models/User.js';

import '../../database/index.js'; 

async function seed() {
  try {
    console.log('🌱 Iniciando seed...');

    await Category.bulkCreate(
      [
        { name: 'Entradas' },
        { name: 'Hambúrgueres' },
        { name: 'Bebidas' },
        { name: 'Sobremesas' }
      ],
      { ignoreDuplicates: true }
    );

    console.log('✅ Categorias criadas/verificadas');

    await User.findOrCreate({
      where: { email: 'admin@email.com' },
      defaults: {
        name: 'Admin',
        email: 'admin@email.com',
        password: '12345678',
        admin: true
      }
    });

    console.log('✅ Admin verificado/criado');

    await User.findOrCreate({
      where: { email: 'user@email.com' },
      defaults: {
        name: 'User',
        email: 'user@email.com',
        password: '12345678',
        admin: false
      }
    });

    console.log('✅ User verificado/criado');

    console.log('🌱 Seed finalizado com sucesso!');
    process.exit();
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    process.exit(1);
  }
}

seed();

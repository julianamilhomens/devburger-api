import Category from '../../app/models/Category.js';
import User from '../../app/models/User.js';
import '../../database/index.js';

async function seed() {
  try {
    console.log('🌱 Iniciando seed...');

    const categories = [
      {
        name: 'Entradas',
        path: 'https://res.cloudinary.com/dv3ovr0pg/image/upload/v1770946748/ef17891f-822f-4afa-ab65-caa03b5c9e70_ckywr7.png'
      },
      {
        name: 'Hambúrgueres',
        path: 'https://res.cloudinary.com/dv3ovr0pg/image/upload/v1770946620/1b8a6a5a-b486-42bb-87d7-71c53070fdf7_xvhsnb.png'
      },
      {
        name: 'Bebidas',
        path: 'https://res.cloudinary.com/dv3ovr0pg/image/upload/v1770946811/39370a92-a857-4b66-bc77-ae4b4146d33e_z4kzdg.png'
      },
      {
        name: 'Sobremesas',
        path: 'https://res.cloudinary.com/dv3ovr0pg/image/upload/v1770946951/3c55737a-8ac0-4501-8f83-12f0b10eabc2_rtbjzb.png'
      }
    ];

    for (const category of categories) {
      await Category.findOrCreate({
        where: { name: category.name },
        defaults: category
      });
    }

    console.log('✅ Categorias criadas com imagem');

    await User.findOrCreate({
      where: { email: 'admin@email.com' },
      defaults: {
        name: 'Admin',
        email: 'admin@email.com',
        password: '12345678',
        admin: true
      }
    });

    await User.findOrCreate({
      where: { email: 'user@email.com' },
      defaults: {
        name: 'User',
        email: 'user@email.com',
        password: '12345678',
        admin: false
      }
    });

    console.log('✅ Usuários criados/verificados');

    console.log('🌱 Seed finalizado com sucesso!');
    process.exit();

  } catch (error) {
    console.error('❌ Erro no seed:', error);
    process.exit(1);
  }
}

seed();

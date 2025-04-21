import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('PayYourShare', 'root', 'NdcpR-34m8hb', {
//     host: '127.0.0.1',
//     dialect: 'mysql',
//     logging: false // Disable logging
// });

const sequelize = new Sequelize('PayYourShare', 'root', 'Kaushal$#@#123', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
});

(async() => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully!');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
})();

export default sequelize;
import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';


dotenv.config();

const DBNAME = process.env.DBNAME;
const DBUSER = process.env.DBUSER;
const DBPASS = process.env.DBPASS;
const DBHOST = process.env.DBHOST;

if (!DBNAME || !DBUSER || !DBPASS || !DBUSER) {
    throw new Error('Missing required environment variables');
}

export const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
    host: DBHOST, 
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

export const connectDb = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        throw error
    }
};




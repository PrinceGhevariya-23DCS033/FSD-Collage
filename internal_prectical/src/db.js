const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin:admin123@auth.lztubmq.mongodb.net/?retryWrites=true&w=majority&appName=auth';
const dbName = 'internal_practical';
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully!');
        const db = client.db(dbName);
        const collection = db.collection('internal_Practical');
        const usersCollection = db.collection('users');
        return { db, collection, usersCollection };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectToDatabase;
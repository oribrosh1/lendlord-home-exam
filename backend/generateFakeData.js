const mongoose = require('mongoose');
const User = require('./models/users'); // Adjust path to where your model is
const { faker } = require('@faker-js/faker');
const { USER_ROLES } = require('./constants'); // Ensure the path to constants is correct
const APP_ENV = process.env.NODE_ENV || 'development'

require('dotenv').config({ path: `./.env.${APP_ENV}` })
mongoose.set('strictQuery', false)

mongoose?.connection?.on('connected', () => {
    console.log('Mongoose connected')
})

mongoose?.connection?.on('disconnected', () => {
    console.log('Mongoose disconnected')
})

mongoose?.connection?.on('error', err => {
    console.error('Mongoose error', err)
})


async function createFakeUsers(numUsers = 50) {
    const connString = process.env.MONGO_CONN_STRING ? process.env.MONGO_CONN_STRING : config.database
    await mongoose.connect(connString + "-test")

    console.log('connected to test database')

    function createRandomUser(managers = []) {
        const role = faker.helpers.arrayElement(Object.values(USER_ROLES));
        const managerId = role !== 'manager' && managers.length ? faker.helpers.arrayElement(managers) : undefined;

        return {
            _id: new mongoose.Types.ObjectId(), // Generate a valid MongoDB ObjectId
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            dateStarted: faker.date.past(10), // Users started within the past 10 years
            salary: faker.datatype.number({ min: 30000, max: 200000 }), // Random salary between 30k and 200k
            role: role,
            manager: managerId,
            registeredAt: faker.date.past() // This field is not in the schema, may not be needed
        };
    }

    function generateUsers(numUsers = 50) {
        let users = [];
        let managers = [];

        for (let i = 0; i < numUsers; i++) {
            let newUser = createRandomUser(managers);
            users.push(newUser);
            if (newUser.role === USER_ROLES.MANAGER) {
                managers.push(newUser._id);
            }
        }

        return users;
    }
    const users = generateUsers(); // Generate 20 random users

    await User.insertMany(users);
    console.log(`${numUsers} fake users created!`);
}

createFakeUsers(200).then(() => {
    mongoose.disconnect();
}).catch(err => {
    console.error(err);
    mongoose.disconnect();
});
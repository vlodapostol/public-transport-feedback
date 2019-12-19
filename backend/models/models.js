const Sequelize = require("sequelize");

const sequelize = new Sequelize('project_DB', 'root', 'p@ss', {
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('connection succesful');
}).catch((err) => {
    console.log(`error on connection:${err}`);
});

class User extends Sequelize.Model {};
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isEnabled: {
        type:Sequelize.BOOLEAN,
        defaultValue: true
    }
}, {sequelize, modelName:'user'});

class Feedback extends Sequelize.Model {};
Feedback.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startingPoint: {
        type: Sequelize.STRING,
        allowNull: false
    },
    destinationPoint: {
        type: Sequelize.STRING,
        allowNull: false
    },
    transportType: {
        type: Sequelize.STRING,
        validate: {
            validateType(value) {
                if (!(value === 'BUS' || value === 'METRO' || value === 'TRAM')) {
                    throw new Error('Transport type can only be: BUS, METRO or TRAM');
                }
            }
        }

    },
    departureHour: {
        type: Sequelize.TIME,
        allowNull: false
    },
    tripDuration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    crowdednessLevel: {
        type: Sequelize.STRING,
        validate: {
            validateType(value) {
                if (!(value === 'LOW' || value === 'MEDIUM' || value === 'HIGH')) {
                    throw new Error('Transport type can only be: LOW, MEDIUM or HIGH');
                }
            }
        }
    },
    observations: {
        type: Sequelize.STRING
    },
    satisfactionLevel: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
}, { sequelize, modelName: 'feedback' });

User.hasMany(Feedback, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
});

sequelize.sync();

module.exports = { sequelize, Feedback, User};

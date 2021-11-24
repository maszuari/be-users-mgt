module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull:false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull:false
        },
    });
    return User;
};
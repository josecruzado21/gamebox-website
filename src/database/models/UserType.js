module.exports = (sequelize, dataTypes) => {
    let alias = 'UserType';
    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(500),
            allowNull: false
        }
        
    };

    let config = {
        timestamps: false ,    tableName : 'usertype' 
    }

    const User = sequelize.define(alias, cols, config);



    return User;

}
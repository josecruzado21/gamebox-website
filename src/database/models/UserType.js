module.exports = (sequelize, dataTypes) => {
    let alias = 'UserType';
    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        type: {
            type: dataTypes.STRING(500),
            allowNull: false
        }
        
    };

    let config = {
        timestamps: false ,    tableName : 'usertype' 
    }

    const UserType = sequelize.define(alias, cols, config);

    UserType.associate = function(models){
        UserType.hasMany(models.User, {
            as:'UserUserType',
            foreignKey:'type'
        })
    }

    return UserType;


}
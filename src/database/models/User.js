module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(500),
            allowNull: false
        }


    };

    let config = {
        timestamps: false ,    tableName : 'users' 
    }

    const User = sequelize.define(alias, cols, config);
    
    User.associate = function(models){
        User.hasMany(models.ShoppingCart, {
            as:'shoppingCarUser',
            foreignKey:'user'
        })
    }

    return User;

}
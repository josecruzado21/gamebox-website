module.exports = (sequelize, dataTypes) => {
    let alias = 'ShoppingCart';
    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        itemsQuantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        totalPrice: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        date: {
            type: dataTypes.DATE,
            allowNull: false
        }


    };

    let config = {
        timestamps: false,
        tableName : 'shoppingcart'  
    }

    const ShoppingCart = sequelize.define(alias, cols, config);

    // ShoppingCart.associate = function(models){

    //     ShoppingCart.belongsToMany(models);

    // }


    return ShoppingCart;

}
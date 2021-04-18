module.exports = (sequelize, dataTypes) => {
    let alias = 'ShoppingCartProduct';
    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product: {
            type: dataTypes.INTEGER,
            allowNull: false,
            // references:{
            //     model:"Product",
            //     key:"id"
            // }
        },
        shoppingCart: {
            type: dataTypes.INTEGER,
            allowNull: false,
            // references:{
            //     model:"ShoppingCart",
            //     key:"id"
            // }
        },
        hasEdition: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        edition: {
            type: dataTypes.STRING(500),
            allowNull: true
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(500),
            allowNull: true
        },
        category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    };

    let config = {
        timestamps: false ,    tableName : 'ShoppingCartProducts'
    }

    const ShoppingCartProduct = sequelize.define(alias, cols, config);

    ShoppingCartProduct.associate = function(models){
        ShoppingCartProduct.belongsTo(models.ShoppingCart, {
            as:'shoppingCartShoppingCartProducts',
            foreignKey:'shoppingCart'
        })

        ShoppingCartProduct.belongsTo(models.Product, {
            as:'productShoppingCartProducts',
            foreignKey:'product'
        })
    
        ShoppingCartProduct.belongsTo(models.Category, {
            as:'categories',
            foreignKey:'category'
        })
    }

    return ShoppingCartProduct;

}
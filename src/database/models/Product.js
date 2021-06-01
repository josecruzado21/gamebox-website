module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
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
        },
        slug: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        image1: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        image2: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        category: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        hasEdition: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        edition: {
            type: dataTypes.STRING(500),
            allowNull: true
        },
        homeTags: {
            type: dataTypes.STRING(500),
            allowNull: true
        },
        stock: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        isNew: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        rawInfo: {
            type: dataTypes.INTEGER,
            allowNull: true
        }


    };

    let config = {
        timestamps: false  ,   tableName: 'products' 
        
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){

        Product.belongsTo(models.Category, {
            as:'categories',
            foreignKey:'category'
        })
        

        Product.belongsTo(models.RawInfo, {
                as:'rawInfoObj',
                foreignKey:'rawInfo'
        })

        Product.hasMany(models.ShoppingCartProduct, {
            as:"productsShoppingCartProducts",
            foreignKey:"product"
        })

        // Product.belongsToMany(models.ShoppingCart, {
        //         through: models.ShoppingCartProduct,
        //         as:"shoppingCart"
        // })
        
    }

    return Product;

}
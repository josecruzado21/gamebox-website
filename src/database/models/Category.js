

module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
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
        parent_id: {
            type: dataTypes.INTEGER,
            allowNull: true,
            hierarchy: true
        }


    };

    let config = {
        timestamps: false,
        tableName : 'categories'  
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models){

        Category.hasMany(models.ShoppingCartProduct, {
            as:'shoppincartProducts',
            foreignKey:'category'
        })

        Category.hasMany(models.Product, {
            as:'products',
            foreignKey:'category'
        })

        Category.hasMany(models.Category, {
            as:'subCategory',
            foreignKey:'parent_id'
        })

        Category.belongsTo(models.Category, {
            as:'parentCategory',
            foreignKey:'parent_id',
            targetKey: 'id',
        })

        

    }

    return Category;

}
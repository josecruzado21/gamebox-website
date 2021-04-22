module.exports = (sequelize, dataTypes) => {
    let alias = 'ShoppingCartStatus';
    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
        
    };

    let config = {
        timestamps: false ,    tableName : 'ShoppingCartStatus' 
    }

    const ShoppingCartStatus = sequelize.define(alias, cols, config);
   
    ShoppingCartStatus.associate = function(models){
        ShoppingCartStatus.hasMany(models.ShoppingCart, {
            as:'shoppingCartStatus',
            foreignKey:'shoppingCartStatus'
        })
}

    return ShoppingCartStatus;

}
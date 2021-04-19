module.exports = (sequelize, dataTypes) => {
    let alias = 'RawInfo';
    let cols = {
        id:{
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        synopsis: {
            type: dataTypes.TEXT,
            allowNull: false
        }, 
        launchDate: {
            type: dataTypes.DATE,                        
            allowNull: false
        },
        metacritic: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        metacriticUrl: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        developer: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        genres: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        platforms: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        tags: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        recommendedAge: {
            type: dataTypes.INTEGER,
            allowNull: false
        }



    };

    let config = {
        timestamps: false  ,   tableName : 'rawinfo' 
     
    }

    const RawInfo = sequelize.define(alias, cols, config);

    RawInfo.associate = function(models){
        RawInfo.hasMany(models.Product, {
            as:'rawInfo',
            foreignKey:'rawInfo'
        })
    }

    return RawInfo;

}
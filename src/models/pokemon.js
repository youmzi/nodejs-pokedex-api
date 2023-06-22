const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique : {
                msg: 'Le nom existe déjà.'
            },
            validate: {
                notEmpty: { msg: 'Le nom ne peut pas être vide'},
                notNull: { msg: 'Le nom est une propriété requise.' }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
                notNull: { msg: 'Les points de vie sont une propriété requise.' },
                min: {
                    args: [0],
                    msg: 'Les points de vie doivent être supérieurs ou égales à 0.'
                },
                max: {
                    args: [999],
                    msg: 'Les points de vie doivent être inférieurs ou égales à 999.'
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de dégâts.' },
                notNull: { msg: 'Les points de dégâts sont une propriété requise.' },
                min: {
                    args: [0],
                    msg: 'Les points de dégâts doivent être supérieurs ou égales à 0.'
                },
                max: {
                    args: [99],
                    msg: 'Les points de dégâts doivent être inférieurs ou égales à 99.'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: 'Utilisez uniquement une URL valide pour l\'image.' },
                notNull: { msg: 'L\'URL de l\'image est une propriété requise.' }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value) {
                    if(!value) {
                        throw new Error('Un Pokémon doit au moins avoir un type.')
                    }
                    if(value.split(',').length > 3) {
                        throw new Error('Un Pokémon ne peux pas avoir plus de trois types.')
                    }
                    value.split(',').forEach(type => {
                        if(!validTypes.includes(type)) {
                            throw new Error(`Le type d'un Pokémon doit appartenir à la liste suivante : ${validTypes}`)
                        }
                    });
                }
            }
        }
    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}
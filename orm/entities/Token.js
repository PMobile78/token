const { EntitySchema } = require('typeorm')
const Token = require('../models/Token')

module.exports = new EntitySchema({
    name: 'Token',
    target: Token,
    tableName: 'tokens',
    columns: {
        id: {
            primary: true,
            type: 'bigint',
            generated: true,
            unsigned: true
        },
        uuid: {
            type: 'varchar',
            length: 255
        },
        affiliate_id: {
            type: 'int',
            unsigned: true
        },
        is_valid: {
            type: 'boolean',
            default: true
        },
        created_date: {
            type: 'int',
            unsigned: true
        },
        expiry_date: {
            type: 'int',
            unsigned: true
        },
    }
})
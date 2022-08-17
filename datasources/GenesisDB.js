const camelcaseKeys = require('camelcase-keys')
const Token = require('../orm/models/Token')
const {AbstractDB, Helpers: {floorTime}, Exceptions: {NotFound} } = require('genesis-libs')
const typeorm = require('typeorm')

class GenesisDB extends AbstractDB {

    get typeorm () {
        return typeorm
    }
    
    async create (uuid, affiliateId, expiryDate) {
        let connection = await this.connection()
        const token = new Token(null, uuid, affiliateId, true, floorTime(new Date), expiryDate)
        let tokenRepository = connection.getRepository(Token)
        await tokenRepository.save(token)
        return camelcaseKeys(token)
    }

    async get (uuid) {
        let connection = await this.connection()
        let tokenRepository = connection.getRepository(Token)
        let token = await tokenRepository.findOne({where: {uuid: uuid}})
        if (!token) {
            throw new NotFound('token', uuid)
        }
        return token
    }

    async invalidate (token) {
        let connection = await this.connection()
        let tokenRepository = connection.getRepository(Token)
        token.is_valid = false
        await tokenRepository.save(token)
        return camelcaseKeys(token)
    }
}

module.exports = GenesisDB

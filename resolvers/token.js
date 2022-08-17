const TokenService = require('../services/Token')
const GenesisDB = require('../datasources/GenesisDB')

module.exports = {
    Query: {
        verifyEmailToken: async (parent, {token}) => {
            let service = new TokenService(new GenesisDB)
            return service.verifyEmailToken(token)
        },
    },
    Mutation: {
        createEmailToken: async (parent, {}, {affiliateId}) => {
            let service = new TokenService(new GenesisDB)
            return service.createEmailToken(affiliateId)
        },
        createEmailTokenSecret: async (parent, {affiliateId}) => {
            let service = new TokenService(new GenesisDB)
            return await service.createEmailToken(affiliateId)
        }
    },
}
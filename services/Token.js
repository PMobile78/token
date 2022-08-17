const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const ms = require('ms')
const {Config, Exceptions: {NotFound, BadInput}, logger} = require('genesis-libs')
const camelcaseKeys = require('camelcase-keys')

class Token {
    constructor (database) {
        this.database = database
    }

    async decode (token, ignoreExpiration = false) {
        try {
            let secret = await Config.get('auth.token.secret')
            return jwt.verify(
                token,
                secret,
                {
                    ignoreExpiration: ignoreExpiration,
                    algorithms: ['HS512']
                }
            )
        } catch (error) {
            looger.debug('token can\'t be decoded %o', error)
            throw new BadInput({
                token: 'Invalid token'
            })
        }
    }

    async checkToken (tokenForValidation) {
        let decoded = await this.decode(tokenForValidation)
        try {
            let token = await this.database.get(decoded.jti)
            if (!token.is_valid) {
                throw new BadInput({
                    token: 'Token was expired'
                })
            }
            return camelcaseKeys(token)
        } catch (error) {
            looger.debug('token can\'t be found in db')
            if (error instanceof NotFound) {
                throw new BadInput({
                    token: 'Token invalid'
                })
            }
            throw error
        }
    }

    async checkAndInvalidateToken (tokenForValidation) {
        let token = await this.checkToken(tokenForValidation)
        token = await this.database.invalidate(token)
        return {
            tokenId: token.id,
            affiliateId: token.affiliateId
        }
    }

    async verifyEmailToken (token) {
        return this.checkAndInvalidateToken(token)
    }

    async createToken (params) {
        const secret = await Config.get('auth.token.secret')
        const token = jwt.sign(
            {},
            secret,
            {
                expiresIn: params.expiry,
                jwtid: params.uuid,
                algorithm: 'HS512'
            }
        )
        let result = await this.database.create(params.uuid, params.affiliateId, this.expiryDate(params.expiry))
        return {
            body: token,
            tokenId: result.id,
            affiliateId: result.affiliateId
        }
    }

    async createEmailToken (affiliateId) {
        let expireEmailToken = await Config.get('auth.token.expireEmailToken')
        return await this.createToken({
            uuid: uuidv4(),
            expiry: expireEmailToken,
            affiliateId: affiliateId
        })
    }

    expiryDate (expireDate) {
        return Math.floor(Math.floor(Date.now() / 1000) + ms(expireDate) / 1000)
    }
}

module.exports = Token
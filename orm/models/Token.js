class Token {
    constructor (id, uuid, affiliate_id, is_valid, created_date, expiry_date) {
        this.id = id
        this.uuid = uuid
        this.affiliate_id = affiliate_id
        this.is_valid = is_valid
        this.created_date = created_date
        this.expiry_date = expiry_date
    }
}

module.exports = Token


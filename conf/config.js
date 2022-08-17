module.exports = (config) => {
    config.auth = {
        token: {
            secret: `/auth/token/secret`,
            expireAccessToken: '12h', // Default: '12h'. (Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc))
            expireRefreshToken: '30d', // Default: '30d'. (Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc))
            expireEmailToken: '24h' // Default: '24h'. (Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc))
        }
    }
    config.acl.affiliate = ['createEmailToken']
    config.acl.internalUser = ['createEmailTokenSecret', 'verifyEmailToken']
    return config
}
const {gql} = require('genesis-libs')

module.exports = gql` 
    extend type Query {
        verifyEmailToken(token: String!): VerifiedToken!
    }
    
    type Mutation {
        createEmailToken: Token!
        createEmailTokenSecret(affiliateId: ID!): Token!
    }
    type Token {
        body: String
        tokenId: ID!
        affiliateId: ID!
    }
    type VerifiedToken {
        tokenId: ID!
        affiliateId: ID!
    }
`
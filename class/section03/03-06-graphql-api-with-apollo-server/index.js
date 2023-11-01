// index.js

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
    type Query {
        qqq: String,
        abc: String
    }
`

const resolvers = {
    Query: {
        qqq: () => {
            return "zxcvㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹzxvzxㄴ"
        },
        abc: () => {
            return "abcder"
        },
    }
}

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

startStandaloneServer(server) // 4000
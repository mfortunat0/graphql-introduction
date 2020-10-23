const fs = require('fs')
const { ApolloServer } = require('apollo-server')
const data = require('./data')

const typeDefs = fs.readFileSync('schema.graphql', 'utf8').toString()
const resolvers = {
    Query: {
        helloWorld: () => {
            return 'Hello World'
        },
        persons: () => {
            return data
        },
        person: (parent, { index }) => {
            return data[index]
        }
    },
    Mutation: {
        insert: (parent, { name }) => {
            data.push({
                name
            })
            return "Sucessful"
        },
        insertInput: (parent, { person: { name } }) => {
            data.push({
                name
            })
            return "Sucessful"
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
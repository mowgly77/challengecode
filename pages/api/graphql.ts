const { ApolloServer, gql } = require('apollo-server-micro');
const Cors = require('micro-cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Configuración de la base de datos
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ users: [] }).write();

// Definir el esquema GraphQL
const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        name: String!
    }

    type Query {
        getUser(id: ID!): User
    }

    type Mutation {
        register(email: String!, name: String!): User
    }
`;

const resolvers = {
    Query: {
        getUser: (_: any, { id }: { id: string }) => {
            // Obtener el usuario por ID
            const user = db.get('users').find({ id: parseInt(id) }).value();
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }
    },
    Mutation: {
        register: (_: any, { email, name }: { email: string; name: string }) => {
            // Crear un nuevo usuario
            const newUser = {
                id: Date.now(),
                email,
                name,
            };
            db.get('users').push(newUser).write();
            return newUser;
        }
    }
};

// Crear una instancia del servidor Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Crear una instancia del middleware CORS
const cors = Cors({
    origin: '*',
    allowCredentials: true,
});

const startServer = async () => {
    await server.start();
    const handler = server.createHandler({ path: '/api/graphql' });
    return cors((req: any, res: any) => handler(req, res));
};

export default async function handler(req: any, res: any) {
    await server.start();
    const handler = server.createHandler({ path: '/api/graphql' });
    return handler(req, res);
}

export const config = {
    api: {
        bodyParser: false,
    },
};
import http from 'http';
import express from 'express';
import cors from 'cors';
import { GraphQLError } from 'graphql';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { resolvers, typeDefs } from '@/graphql';
import { verifyAuthToken } from '@/utils/auth';

const app = express();
const httpServer = http.createServer(app);


const server = new ApolloServer({
    typeDefs,
    resolvers,

});

server.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }));

(async () => (
    await server.start(),
    app.use('/graphql', (req, res, next) => {
        res.cookie('apollo-x-custom-delay', 1000);
        cors<cors.CorsRequest>()(req, res, next);
        express.json()(req, res, next);
        expressMiddleware(server)(req, res, next);
    })
))

const port = Number(process.env.PORT) || 8080;

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { host: '0.0.0.0', port },
        context: async ({ req }) => {
            // context allows us to access the request coming from the client side
            const authToken = req.headers.authorization?.split(' ')[1] || null;
            if (!authToken) {
                return { currentUser: null, userRoles: [] };
            }
            try {
                const user = await verifyAuthToken(authToken);
                if (!user) {
                    throw new Error('Invalid auth token');
                }
                user.passwordHash = '';
                return { currentUser: user, userRoles: user.role ? [user.role] : [] };
            } catch (error) {
                throw new GraphQLError('Invalid auth token', { extensions: { code: 'UNAUTHENTICATED' } });
            }
        },
    });
    console.log(`Server running at ${url}`);
}

startServer()


import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    sayHello(delay: Int!): String
  }
`;

const delayMs = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const resolvers = {
  Query: {
    async sayHello(_root, { delay }, _context) {
      await delayMs(delay);
      return `Hello World! The time is currently ${new Date()}`;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

const server = apolloServer.start();

async function GraphQLEndPoint(req: NextApiRequest, res: NextApiResponse<any>) {
  await server;
  const handler = apolloServer.createHandler({
    path: "/api/graphql",
  });
  return handler(req, res);
}

export default GraphQLEndPoint;

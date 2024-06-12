import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

// resolver and type definition imports
import MergesResolvers from "./backend/graphql/resolvers/merge.resolvers.js";
import MergesTypeDefs from "./backend/graphql/typeDefs/merge.typeDef.js";

// import mongodb database
import mongoDBConnection from "./backend/config/mongoDB.js";

// imports passport module
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import { buildContext } from "graphql-passport";
// import ConnectMongoDBSession from "connect-mongodb-session";

// user CRUD functions
import { configurePassport } from "./backend/passport/passport.config.js";

// Initialization
const app = express();
dotenv.config();

// call passport configure function
configurePassport();

// Environment variables
const PORT = process.env.PORT || 9090;

// Set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Create an HTTP server
const httpServer = http.createServer(app);

// setup mongodb session store
const mongoDBStore = connectMongo(session);

const store = new mongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

store.on("error", (err) => console.log(err));

// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
    },
    store: store,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs: MergesTypeDefs,
  resolvers: MergesResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Start the Apollo Server and apply the middleware
const startApolloServer = async () => {
  await server.start();

  app.use(
    "/",
    expressMiddleware(server, {
      context: async ({ req, res }) => buildContext({ req, res }),
    })
  );

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgCyan);
    mongoDBConnection();
  });
};

// Start the Apollo Server
startApolloServer();

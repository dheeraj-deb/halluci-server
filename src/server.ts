import express from "express";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";
import mongoose from "mongoose";

import { connectDB } from "./database/db";

dotenv.config();

// Import schema
import { typeDefs } from "./schema/index";

// Import resolvers
import { resolvers } from "./resolvers/index";

// Connect to MongoDB
connectDB()

const app = express();
const port = 3008;

// Create schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);

app.listen(process.env.HTTP_PORT, () => console.log(`Server running on port ${port}`));

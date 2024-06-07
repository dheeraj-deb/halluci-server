import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";
import passport from "passport";
import cookieParser from "cookie-parser"



import { connectDB } from "./database/db";

dotenv.config();

// Import schema
import { typeDefs } from "./schema/index";

// Import resolvers
import { resolvers } from "./resolvers/index";
import passportJwtAuth from "./middleware/passportJWT";
import { ApolloServer } from "apollo-server-express";
import { StatusCodes } from "http-status-codes";

// Connect to MongoDB
connectDB()

const app = express();
const port = 3008;

app.use(cookieParser())
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }))
app.use(passport.initialize());
passport.use(passportJwtAuth);

app.use((req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err: Record<string, any>, user: Record<string, any>, info: Record<string, any>) => {
    if (err) return next(err);

    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
});
// Create schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  "/graphql",
  (req, res, next) => {
    graphqlHTTP({
      schema,
      graphiql: true,
      context: {
        user: req.user || null,
        auth: !!req.user,
        res,
      },
      customFormatErrorFn: (error:Record<string, any>) => {
        const response = {
          message: error.message,
          locations: error.locations,
          path: error.path,
          extensions: error.extensions || {},
        };
  
        if (error.originalError) {
          if (error.originalError.code === "INTERNAL_SERVER_ERROR") {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
          } else if (error.originalError.extensions?.http?.status) {
            res.status(error.originalError.extensions.http.status);
          } else {
            res.status(StatusCodes.BAD_REQUEST);
          }
        }
  
        return response;
        next()
      },
    })(req,res);
  }
);

// const setHttpPlugin = {
//   async requestDidStart() {
//     return {
//       async willSendResponse({ response }: { response: Record<string, any> }) {
//         if (response.errors) {
//           if (response.errors[0].code == "INTERNAL_SERVER_ERROR") {
//             response.http.status = StatusCodes.INTERNAL_SERVER_ERROR
//           } else {
//             console.log("FF",response.errors[0].extensions.http.status);
            
//             response.http.status = response.errors[0].extensions.http.status
//           }

//         }
//       },
//     };
//   },
// };

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   plugins: [setHttpPlugin],
//   context: ({ req, res }) => ({
//     user: req.user || null,
//     auth: !!req.user,
//     res
//   })
// });



// async function startApolloServer() {
//   await server.start(); // Await the start method before calling applyMiddleware
//   server.applyMiddleware({ app, path: "/graphql" });
// }

// startApolloServer().then(() => {
//   app.listen(process.env.HTTP_PORT || port, () => {
//     console.log(`Server running on port ${port}`);
//   });
// })

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

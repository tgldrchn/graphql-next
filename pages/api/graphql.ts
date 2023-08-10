import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import getAndpostRequest from "../utils/mongodb";

const typeDefs = `#graphql

  type Post {
    text: String
    images: [String]
    name: String
    _id: ID!
    userId: String
    createdAt: Int
  }

  input PostInput {
    name: String
    text: String
    images: [String]

  }

  type Query {
    getPosts: [Post]
    getPostDetails: Post
  }

  type Mutation {
    createPost(input: PostInput!): ID
 
  }
`;
//    updatePost(id: ID!, PostUpdateInput: PostInput!): Post
//     deletePost(id : ID!): Post
const resolvers = {
  Query: {
    getPosts: async () => {
      const result = await getAndpostRequest("find", {});
      return result;
    },
    getPostDetails: () => {},
  },

  Mutation: {
    createPost: async (
      _: never,
      args: { input: { text: String; name: String } }
    ) => {
      console.log(args.input);

      const { text, name } = args.input;
      const result = await getAndpostRequest("insertOne", {
        document: { text, name },
      });
      return result.insertedId;
    },
  },
  //   updatePost: () => {},
  //   deletePost: () => {},
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import { globalIdField } from "graphql-relay";

import { IUser } from "./UserModel";
import { nodeInterface, registerTypeLoader } from "../node/typeRegister";
import { UserLoader } from "./UserLoader";

const UserType = new GraphQLObjectType<IUser>({
  name: "User",
  description: "Represents a user in the bank system",
  fields: () => ({
    id: globalIdField("User"),
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (user) => user._id,
    },
    fullName: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.fullName,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.email,
    },
    taxId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.taxId,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (user) => user.createdAt.toISOString(),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (user) => user.updatedAt.toISOString(),
    },
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(UserType, (context, id) =>
  UserLoader.load(context as any, id)
);

export { UserType };

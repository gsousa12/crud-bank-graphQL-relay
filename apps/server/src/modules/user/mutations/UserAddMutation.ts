import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

import { userField } from "../UserFields";
import { createUserService } from "../service/createUserService";

import { CreateUserDTO } from "../dtos/CreateUserDTO";

const mutation = mutationWithClientMutationId({
  name: "UserAdd",
  inputFields: {
    fullName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    taxId: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (args: CreateUserDTO) => {
    const user = await createUserService(args);
    return { user: user._id };
  },
  outputFields: {
    ...userField("user"),
  },
});

export const UserAddMutation = {
  ...mutation,
};

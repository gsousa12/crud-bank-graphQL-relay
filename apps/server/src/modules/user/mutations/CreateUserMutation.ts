import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

import { createUserService } from "../service/CreateUserService";

import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { userField } from "../userFields";

const mutation = mutationWithClientMutationId({
  name: "CreateUser",
  inputFields: {
    fullName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    taxId: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (input: CreateUserDTO) => {
    const user = await createUserService(input);
    return { user: user._id };
  },
  outputFields: {
    ...userField("user"),
  },
});

export const CreateUserMutation = {
  ...mutation,
};

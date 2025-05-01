import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

import { createUserService } from "../service/CreateUserService";
import { userField } from "../userFields";

export type CreateUserType = {
  fullName: string;
  email: string;
  taxId: string;
  password: string;
};

const mutation = mutationWithClientMutationId({
  name: "CreateUser",
  inputFields: {
    fullName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    taxId: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (input: CreateUserType) => {
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

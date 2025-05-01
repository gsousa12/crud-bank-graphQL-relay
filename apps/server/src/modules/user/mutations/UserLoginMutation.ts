import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { userField } from "../userFields";
import { loginService } from "../service/loginService";

export type LoginRequestType = {
  email: string;
  password: string;
};

const mutation = mutationWithClientMutationId({
  name: "UserLogin",
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (input: LoginRequestType) => {
    const { token, user } = await loginService(input);
    return { token, user: user._id };
  },
  outputFields: {
    token: { type: GraphQLString },
    ...userField("user"),
  },
});

export const UserLoginMutation = {
  ...mutation,
};

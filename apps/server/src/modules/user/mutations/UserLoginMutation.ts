import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { userField } from "../userFields";
import { LoginDTO } from "../dtos/LoginDTO";
import { loginService } from "../service/loginService";

const mutation = mutationWithClientMutationId({
  name: "UserLogin",
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (input: LoginDTO) => {
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

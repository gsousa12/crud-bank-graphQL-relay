import { GraphQLObjectType } from "graphql";
import { userMutations } from "../modules/user/mutations/userMutations";

// import { messageMutations } from '../modules/message/mutations/messageMutations';

// export const MutationType = new GraphQLObjectType({
// 	name: 'Mutation',
// 	fields: () => ({
// 		...messageMutations,
// 	}),
// });

export const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...userMutations,
  }),
});

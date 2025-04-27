import { GraphQLObjectType } from "graphql";
import { userMutations } from "../modules/user/mutations/userMutations";
import { transactionMutations } from "../modules/transaction/mutations/TransactionMutations";

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
    ...transactionMutations,
  }),
});

import { GraphQLObjectType } from "graphql";

import { accountQueries } from "../modules/account/queries/AccountQueries";
import { transactionQueries } from "../modules/transaction/queries/TransactionQueries";

// import { messageConnectionField } from '../modules/message/messageFields';

// export const QueryType = new GraphQLObjectType({
// 	name: 'Query',
// 	fields: () => ({
// 		...messageConnectionField('messages'),
// 	}),
// });
export const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...accountQueries,
    ...transactionQueries,
  }),
});

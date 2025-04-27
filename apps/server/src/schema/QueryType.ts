import { GraphQLObjectType } from "graphql";

import { AccountQueries } from "../modules/account/queries/AccountQueries";

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
    ...AccountQueries,
  }),
});

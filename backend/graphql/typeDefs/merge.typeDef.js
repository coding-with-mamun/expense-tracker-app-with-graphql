import { mergeTypeDefs } from "@graphql-tools/merge";
import transactionTypeDef from "./transaction.typeDef.js";
import userTypeDef from "./user.typedef.js";

// merge resolvers
const MergesTypeDefs = mergeTypeDefs([transactionTypeDef, userTypeDef]);

// export default mergeResolvers
export default MergesTypeDefs;

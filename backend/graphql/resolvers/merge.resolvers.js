import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolvers.js";
import transactionResolver from "./transaction.resolvers.js";

// merge resolvers
const MergesResolvers = mergeResolvers([userResolver, transactionResolver]);

// export default mergeResolvers
export default MergesResolvers;

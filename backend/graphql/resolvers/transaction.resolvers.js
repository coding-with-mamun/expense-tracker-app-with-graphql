import Transaction from "../../models/transaction.model.js";

const transactionResolver = {
  Query: {
    // Get all transactions
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser) throw new Error("Unauthenticated");

        const userId = await context.getUser()._id;

        // Get single user all transactions
        const transaction = await Transaction.findOne({ userId });

        return transaction;
      } catch (err) {
        throw new Error("Error getting transaction");
      }
    },

    // GET SINGLE transaction
    transaction: async (_, { TransactionId }) => {
      try {
        const transaction = await Transaction.findById(TransactionId);
        return transaction;
      } catch (err) {
        throw new Error("Error getting transaction");
      }
    },
    //? TODO => ADD CATEGORY STATISTICS QUERY
  },
  Mutation: {
    // create new Transaction
    createTransaction: async (_, { input }, context) => {
      try {
        const transaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });

        await transaction.save();
        return transaction;
      } catch (err) {
        throw new Error(err.message || "Internal server error");
      }
    },

    // update
    updateTransaction: async (_, { input }, context) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );

        return updatedTransaction;
      } catch (err) {
        throw new Error(err.message || "Internal server error");
      }
    },

    //
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deleteTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deleteTransaction;
      } catch (err) {
        throw new Error(err.message || "Internal server error");
      }
    },

    //? TODO => ADD USER transaction RELATION
  },
};

// export default
export default transactionResolver;

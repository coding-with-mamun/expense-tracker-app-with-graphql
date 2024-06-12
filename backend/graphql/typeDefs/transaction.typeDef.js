const transactionTypeDef = `#graphql 
    type Transaction{
        _id: ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String
        date: String!
    }

 
    type Query{

        #get all transactions
        transactions: [Transaction]

        #get single transaction
        transaction(TransactionId: ID!): Transaction

        #? TODO => ADD CATEGORY STATISTICS QUERY
    }

    type Mutation{
        #create new transaction
        createTransaction(input: CreateTransaction): Transaction

        #update transaction
        updateTransaction(input: UpdateTransaction): Transaction

        #delete transaction
        deleteTransaction(transactionId: ID! ): Transaction
    }

    # create transaction input type
    input CreateTransaction {
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String
        date: String!
    }

    # update transaction
    input UpdateTransaction {
        transactionId: ID!
        description: String
        paymentType: String
        category: String
        amount: Float
        location: String
        date: String
    }

`;

// export default
export default transactionTypeDef;

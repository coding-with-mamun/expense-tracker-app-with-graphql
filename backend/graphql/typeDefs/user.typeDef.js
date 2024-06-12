const userTypeDef = `#graphql 
    type User {
        _id: ID!
        username: String!
        name: String!
        password: String!
        profilePicture: String
        gender: String!
    }

    type Query{
        # get authenticated user
        authUser: User

        # get single user
        user(userId: ID!): User
    }

    type Mutation{

        # user signup
        signup(input: signupInput!): User

        # user login
        login(input: loginInput!): User

        #user logout
        logout: LogoutResponse
    }

    # user signup input type
    input signupInput{
        username: String!
        name: String!
        password: String!
        gender: String!
    }

    # user login input
    input loginInput{
        username: String!
        password: String!
    }

    # user logout message
    type LogoutResponse{
        message: String!
    }

`;

// export default
export default userTypeDef;

import { buildSchema } from "graphql";

const schemaUser = buildSchema(`
  
  #----------------- Input Section --------------------
  input UserInputSignup {
    Username: String
    FullName: String
    Email: String
    Password: String
  }

  input UserInputLogin {
    Username: String
    Password: String
  }


  #----------------- Type Section --------------------
  type UserResponse {
    Id: ID
    Username: String
    FullName: String
    Email: String
    Role: String
  }

  type ResponseWithoutoken {
  #------------ Message -------------
    message: String  
  }

  type ResponseWithToken {

    user: UserResponse!
  #------------ Message -------------
    message: String  
  #------------ Jwt Toke -------------
    useToken: String  

  }


  #------------------ Query and Mutation ---------------------
  type Query {
    getAllUser: [UserResponse!] 
    getIdUser(Id: ID!): UserResponse!
 
  }

  type Mutation {
    postSignupUser(input: UserInputSignup!): ResponseWithoutoken!
    postLoginUser(input: UserInputLogin!): ResponseWithToken!  
    deleleUser(Id: ID!): ResponseWithoutoken!
  }

  

`);


export default schemaUser;

import { buildSchema } from 'graphql';

const schemaPassenger = buildSchema(`
    # Scalar type for Date, make sure to implement this if needed.
    scalar Date

    #----------------- Input Section --------------------
    input PassengerInput {
        FirstName: String
        LastName: String
        MiddleName: String
        DateOfBirth: Date
        Gender: String
        Nationality: String
        PassportNumber: String
        Email: String
        PhoneNumber: String
        EmergencyContact: String
    }

    type PassengerResponse {
        Id: ID
        FirstName: String
        LastName: String
        MiddleName: String
        DateOfBirth: Date
        Gender: String
        Nationality: String
        PassportNumber: String
        Email: String
        PhoneNumber: String
        EmergencyContact: String
    }
    
    #----------------- Response Section --------------------
    type PassengerResponseMassage {
        #------------ Message -------------
        message: String
    }

    type PassengerResponseMassageWithID {
        #------------ Message -------------
        message: String
        Id: ID
    }

    #------------------ Query and Mutation ---------------------
    type Query {
        getAllPassenger: [PassengerResponse!]    
        getIdPassenger(Id: ID!): PassengerResponse!   
    }

    type Mutation {
        postPassenger(input: PassengerInput!): PassengerResponseMassageWithID!  
    }

  
`);

export default schemaPassenger

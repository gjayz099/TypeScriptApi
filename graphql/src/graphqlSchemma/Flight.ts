import { buildSchema } from "graphql";

const schemaFlight = buildSchema(`
    # Scalar type for Date, make sure to implement this if needed.
    scalar Date
    scalar Time

    #----------------- Input Section --------------------
    input FlightInput {
        FlightNumber: String
        DepartureAirport: String
        ArrivalAirport: String
        FlightPrice: Float
        FlightDuration: String
        DepartureDate: Date
        DepartureTime: Time
        Airline: String
        PassengerCapacity: Int
    }

    #----------------- Type Section --------------------    
    type FlightResponse {
        Id: ID
        FlightNumber: String
        DepartureAirport: String
        ArrivalAirport: String
        FlightPrice: Float
        FlightDuration: String
        DepartureDate: Date
        DepartureTime: Time
        Airline: String
        PassengerCapacity: Int
    }


    type FlightResponseMassage {
    #------------ Message -------------
        message: String
    }
    #------------------ Query and Mutation ---------------------
    type Query {
        getAllFlight: [FlightResponse!]
        getIdFlight(Id: ID!): FlightResponse!
    }

    type Mutation {
        postFlight(input: FlightInput!): FlightResponseMassage!
        putIdFlight(Id: ID!, input: FlightInput!): FlightResponseMassage!
        deleteIdFlight(Id: ID!): FlightResponseMassage!
    }


`);

export default schemaFlight;

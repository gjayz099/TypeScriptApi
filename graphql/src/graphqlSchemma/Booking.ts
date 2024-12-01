import { buildSchema } from 'graphql';

const schemaBooking = buildSchema(`
    # Scalar type for Date, make sure to implement this if needed.
    scalar Date
    scalar Time

    #----------------- Input Section --------------------
    input BookingInput {
        PassengerID: ID
        SeatClass: String
        SeatPreference: String
    }


    #----------------- Type Section --------------------
    type Passenger {
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
    type Flight {
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



    type BookingResponse {
        Id: ID
        PassengerID: Passenger
        FlightID: Flight
        SeatClass: String
        SeatPreference: String
        BookingStatus: String
        PaymentStatus: String
    }

    

    #------------------ Query and Mutation ---------------------
    type Query {
        getAllBooking: [BookingResponse!] 
        getIdBooking(Id: ID!): BookingResponse! 
    }

    type Mutation {
        postBookingWithIdFlight(input: BookingInput!, Id: ID): BookingResponse!
    }

`);

export default schemaBooking;

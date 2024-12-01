import { buildSchema } from 'graphql';

const schemaCheckin = buildSchema(`
    # Scalar type for Date, make sure to implement this if needed.
    scalar Date
    scalar Time

    #----------------- Input Section --------------------
    input CheckinInput {
        BoardingGate: String
        SeatAssignment: String
        BoardingTime: Date
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


    type Booking {
        Id: ID
        PassengerID: Passenger
        FlightID: Flight
        SeatClass: String
        SeatPreference: String
        BookingStatus: String
        PaymentStatus: String
    }


    type CheckinResponse {
        Id: ID
        BookingID: Booking
        CheckinDate: Date
        CheckinTime: Time
        CheckinStatus: String
        BoardingGate: String
        SeatAssignment: String
        BoardingTime: Date
    }

    

    #------------------ Query and Mutation ---------------------
    type Query {
        getAllCheckin: [CheckinResponse!]
        getIdCheckin(Id: ID!): CheckinResponse!
       

    }
    type Mutation {
     postCheckinWithIdBooking(input: CheckinInput!, bookingId: ID): CheckinResponse!
    }

`);

export default schemaCheckin;

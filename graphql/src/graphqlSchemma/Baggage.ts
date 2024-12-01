import { buildSchema } from 'graphql';

const schemaBaggage = buildSchema(`

    # Scalar type for Date, make sure to implement this if needed.
    scalar Date
    scalar Time
    #----------------- Input Section --------------------

    input BaggageInput {
        BaggageType: String
        Weight: Float
        BaggageAllowance: Float
        ExcessWeight: Float
        BaggagePrice: Float
        BaggageClaimLocation: String
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
    type BaggageResponse {
        Id: ID
        BookingID: Booking
        BaggageType: String
        Weight: Float
        BaggageAllowance: Float
        ExcessWeight: Float
        BaggagePrice: Float
        BaggageClaimLocation: String
    }

    #------------------ Query and Mutation ---------------------
    type Query{
        getAllBaggage: [BaggageResponse!]
    }

    type Mutation{
        postBaggageWithBookingID(input: BaggageInput!, bookingId: ID): BaggageResponse!
    }
   

`)

export default schemaBaggage
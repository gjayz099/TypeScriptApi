import { buildSchema } from 'graphql';

const schemaPayment = buildSchema(`

    # Scalar type for Date, make sure to implement this if needed.
    scalar Date

    #----------------- Input Section --------------------
    input PaymentInput {
        Amount: Float
        PaymentMethod: String
        PaymentStatus: String
    }

    
    #----------------- Type Section --------------------
    type Booking {
        Id: ID
        SeatClass: String
        SeatPreference: String
        BookingStatus: String
        PaymentStatus: String
    }
    type PaymentResponse {
        BookingID: Booking
        Amount: Float
        PaymentMethod: String
        PaymentStatus: String
        PaymentDate: Date
    }

    #------------------ Query and Mutation ---------------------
    type Query{
        postPaymentBookingID(input: PaymentInput!, bookingId: ID): PaymentResponse!
    }
   

`)

export default schemaPayment
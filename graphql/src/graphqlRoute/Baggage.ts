import Booking from '../model/Booking';
import Baggage from '../model/Baggage'
import Flight from '../model/Flight';
import Passenger from '../model/Passenger';
import { v4 as uuidv4 } from 'uuid';


const rootBaggage = {

    postBaggageWithBookingID: async( {input, bookingId} : Baggage ) => {
        try{

            const { BaggageType, Weight, BaggageAllowance, ExcessWeight, BaggagePrice, BaggageClaimLocation} = input;

            const booking = await Booking.findByPk(bookingId);

            if (!booking) {return {message: 'booking not found'}};


            const baggage = await Baggage.create({
                Id: uuidv4(),
                BookingID: bookingId,
                BaggageType,
                Weight,
                ExcessWeight,
                BaggagePrice,
                BaggageClaimLocation,
                BaggageAllowance,
                CreateDate: new Date()
            })

            return {
                Id: baggage.dataValues.Id,
                BookingID: {
                    SeatClass: booking.dataValues.SeatClass,
                    SeatPreference: booking.dataValues.SeatPreference,
                    BookingStatus: booking.dataValues.BookingStatus,
                    PaymentStatus: booking.dataValues.PaymentStatus,
                },
                BaggageType: baggage.dataValues.BaggageType,
                Weight: baggage.dataValues.Weight,
                ExcessWeight: baggage.dataValues.ExcessWeight,
                BaggagePrice: baggage.dataValues.BaggagePrice,
                BaggageClaimLocation: baggage.dataValues.BaggageClaimLocation,
                BaggageAllowance: baggage.dataValues.BaggageAllowance,
            }



        }catch (error) {
        console.error('Error while post baggage:', error);
        throw new Error('Internal server error: ');
        }
    },
    getAllBaggage: async( {}  : Baggage) => {
        try{
            const baggages = await Baggage.findAll({ 
                include: [
                    {
                        model: Booking,
                        include: [
                            {
                                model: Passenger,  
                                attributes: ['FirstName', 'LastName', 'Email', 'PassportNumber'],
                            },
                            {
                                model: Flight,  
                                attributes: [
                                    'FlightNumber',
                                    'DepartureAirport',
                                    'ArrivalAirport',
                                    'FlightPrice',
                                    'DepartureDate',
                                    'DepartureTime',
                                    'FlightDuration',
                                    'Airline',
                                    'PassengerCapacity'
                                ] 
                            }
                        ],
                        attributes:[
                            'SeatClass',
                            'SeatPreference',
                            'BookingStatus',
                            'PaymentStatus'
                        ]
                    }
                ]
            })

    
            const baggageDetails = baggages.map((baggage) => {
                const booking = baggage.Booking.dataValues;
                const passenger = baggage.Booking.Passenger.dataValues;
                const flight = baggage.Booking.Flight.dataValues;

                return {
                    Id: baggage.dataValues.Id,
                    BookingID: { 
                        PassengerID: {
                            FirstName: passenger.FirstName,
                            LastName: passenger.LastName,
                            Email: passenger.Email,
                          },
                          FlightID: {
                            FlightNumber: flight.FlightNumber,
                            DepartureAirport: flight.DepartureAirport,
                            ArrivalAirport: flight.ArrivalAirport,
                            FlightPrice: flight.FlightPrice,
                            FlightDuration: flight.FlightDuration,
                            DepartureDate: flight.DepartureDate,
                            DepartureTime: flight.DepartureTime,
                            Airline: flight.Airline,
                            PassengerCapacity: flight.PassengerCapacity,
                          },
                        Id: booking.Id,
                        SeatClass: booking.SeatClass,
                        SeatPreference: booking.SeatPreference,
                        BookingStatus: booking.BookingStatus,
                        PaymentStatus: booking.PaymentStatus,

                    },
                    
                    BaggageType: baggage.dataValues.BaggageType,
                    Weight: baggage.dataValues.Weight,
                    ExcessWeight: baggage.dataValues.ExcessWeight,
                    BaggagePrice: baggage.dataValues.BaggagePrice,
                    BaggageClaimLocation: baggage.dataValues.BaggageClaimLocation,
                    BaggageAllowance: baggage.dataValues.BaggageAllowance,
                }

            })

            return baggageDetails;
        } catch (error) {
            console.error('Error while get all baggage:', error);
            throw new Error('Internal server error: ');
        }
    }
}


export default rootBaggage;
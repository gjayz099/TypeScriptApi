
import Booking from "../model/Booking";
import Checkin from "../model/Checkin";
import Flight from "../model/Flight";
import Passenger from "../model/Passenger";
import { v4 as uuidv4 } from 'uuid';

const rootCheckin = {

    postCheckinWithIdBooking: async ( { input, bookingId  } : Checkin ) => {
        try{

            const {  BoardingGate, BoardingTime,  SeatAssignment }  = input;

            const booking = await Booking.findByPk(bookingId);


            if (!booking) {throw new Error('booking not found')};

            const checkin = await Checkin.create({
                Id: uuidv4(),
                BookingID: bookingId,
                CheckinDate: new Date(),
                CheckinTime: new Date().toLocaleTimeString('en-PH', { hour12: false }), // Format to "HH:mm:ss"
                CheckinStatus: "Checked-in",
                BoardingTime,
                BoardingGate,
                SeatAssignment,
                CreateDate: new Date()

            })

            
            return {
                Id: checkin.dataValues.Id,
                BookingID: {
                    SeatClass: booking.dataValues.SeatClass,
                    SeatPreference: booking.dataValues.SeatPreference,
                    BookingStatus: booking.dataValues.BookingStatus,
                    PaymentStatus: booking.dataValues.PaymentStatus,

                },
                CheckinDate: checkin.dataValues.CheckinDate,
                CheckinTime: checkin.dataValues.CheckinTime,
                CheckinStatu: checkin.dataValues.CheckinStatus ,
                BoardingGate: checkin.dataValues.BoardingGate,
                BoardingTime: checkin.dataValues.BoardingTime,
                SeatAssignment: checkin.dataValues.SeatAssignment
            }


        } catch (error) {
        console.error('Error while post checkin:', error);
        throw new Error('Internal server error: ' );
        }
    },

    getAllCheckin: async ( {} : Checkin ) => {
        try{
            const checkins = await Checkin.findAll({
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
                        attributes: [
                            'BookingDate',
                            'SeatClass',
                            'SeatPreference',
                            'BookingStatus',
                            'PaymentStatus',

                        ]
                    }
                ]
            })

            const checkinDetails = checkins.map((checkin) => {
                const booking = checkin.Booking?.dataValues;
                const passenger = checkin.Booking.Passenger.dataValues;
                const flight = checkin.Booking.Flight.dataValues;
                return{

                    Id: checkin.dataValues.Id, 
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
                        PaymentStatus: booking.PaymentStatus,
                        BookingStatus: booking.BookingStatus,
                        SeatClass: booking.SeatClass,
                        SeatPreference: booking.SeatPreference
                        
                        
                    },
                    CheckinDate: checkin.dataValues.CheckinDate,
                    CheckinTime: checkin.dataValues.CheckinTime,
                    CheckinStatu: checkin.dataValues.CheckinStatus ,
                    BoardingGate: checkin.dataValues.BoardingGate,
                    BoardingTime: checkin.dataValues.BoardingTime,
                    SeatAssignment: checkin.dataValues.SeatAssignment
                }

                
            }) 
            return checkinDetails; 
        } catch (error) {
        console.error('Error while get all checkin:', error);
        throw new Error('Internal server error: ');
        }
    },
    getIdCheckin: async( {Id} : Checkin ) => {
        try{
            const checkin = await Checkin.findByPk( Id,{
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
                        attributes: [
                            'BookingDate',
                            'SeatClass',
                            'SeatPreference',
                            'BookingStatus',
                            'PaymentStatus',
                        ]
                    }
                ]
            })


            if (!checkin) { return{ message : 'checkin not found'}}


            const booking = checkin.Booking.dataValues;
            const passenger = checkin.Booking.Passenger.dataValues;
            const flight = checkin.Booking.Flight.dataValues;
            return {
                Id: checkin.dataValues.Id,
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
                    SeatClass: booking.SeatClass,
                    SeatPreference: booking.SeatPreference,
                    BookingStatus: booking.BookingStatus,
                    PaymentStatus: booking.PaymentStatus,
                },
                CheckinDate: checkin.dataValues.CheckinDate,
                CheckinTime: checkin.dataValues.CheckinTime,
                CheckinStatu: checkin.dataValues.CheckinStatus ,
                BoardingGate: checkin.dataValues.BoardingGate,
                BoardingTime: checkin.dataValues.BoardingTime,
                SeatAssignment: checkin.dataValues.SeatAssignment
            }
        } catch (error) {
            console.error('Error while get one checkin:', error);
            throw new Error('Internal server error: ' );
        }
    },
    


}



export default rootCheckin;


import Booking from '../model/Booking';
import Flight from '../model/Flight';
import Passenger from '../model/Passenger';
import { v4 as uuidv4 } from 'uuid';



const rootBooking = {
    postBookingWithIdFlight: async ({ input, Id } : Booking) => {
        try {
        const { PassengerID, SeatClass, SeatPreference } = input;

       
        const flight = await Flight.findByPk(Id);
        if (!flight) {
            throw new Error('Flight not found');
        }

        // Fetch the passenger details
        const passenger = await Passenger.findByPk(PassengerID);
        if (!passenger) {
            throw new Error('Passenger not found');
        }

        // Create the booking entry
        const booking = await Booking.create({
            Id: uuidv4(),
            PassengerID,
            BookingDate: new Date(),
            FlightID: Id,
            SeatClass,
            SeatPreference,
            BookingStatus: 'Pending',
            PaymentStatus: 'Unpaid',
            CreateDate: new Date(),
        });


        return {
            Id: booking.Id,
            PassengerID: {
            FirstName: passenger.dataValues.FirstName,
            LastName: passenger.dataValues.LastName, 
            Email: passenger.dataValues.Email,      
            },
            SeatClass: booking.dataValues.SeatClass,
            SeatPreference: booking.dataValues.SeatPreference,
            BookingStatus: booking.dataValues.BookingStatus,
            PaymentStatus: booking.dataValues.PaymentStatus,
            BookingDate: booking.dataValues.BookingDate,
            FlightID: {
            FlightNumber: flight.dataValues.FlightNumber,
            DepartureAirport: flight.dataValues.DepartureAirport,
            ArrivalAirport: flight.dataValues.ArrivalAirport,
            FlightPrice: flight.dataValues.FlightPrice,
            FlightDuration: flight.dataValues.FlightDuration,
            DepartureDate: flight.dataValues.DepartureDate,
            DepartureTime: flight.dataValues.DepartureTime,
            Airline: flight.dataValues.Airline,
            PassengerCapacity: flight.dataValues.PassengerCapacity,
            },
        };
        
        } catch (error) {
            console.error('Error while post booking:', error);
            throw new Error('Internal server error');
        }
    },

    getAllBooking: async ({ } : Booking) => {
        try {
      
            const bookings = await Booking.findAll({
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
                ]
            });


            const passengerDetails = bookings.map((booking) => {
                const passenger = booking.Passenger.dataValues;
                const flight = booking.Flight.dataValues;
    
                return {
                    Id: booking.dataValues.Id,  
    
              
                    PassengerID: {
                        Id: booking.dataValues.PassengerID,
                        FirstName: passenger.FirstName,
                        LastName: passenger.LastName, 
                        Email: passenger.Email,   
                    },
    
                    SeatClass: booking.dataValues.SeatClass,
                    SeatPreference: booking.dataValues.SeatPreference,
                    BookingStatus: booking.dataValues.BookingStatus,
                    PaymentStatus: booking.dataValues.PaymentStatus,
                    BookingDate: booking.dataValues.BookingDate,
    
                    FlightID: {
                        Id: booking.dataValues.FlightID,
                        FlightNumber: flight.FlightNumber,
                        DepartureAirport: flight.DepartureAirport,
                        ArrivalAirport: flight.ArrivalAirport,
                        FlightPrice: flight.FlightPrice,
                        FlightDuration: flight.FlightDuration,
                        DepartureDate: flight.DepartureDate,
                        DepartureTime: flight.DepartureTime,
                        Airline: flight.Airline,
                        PassengerCapacity: flight.PassengerCapacity,
                    }
                };
            });


    
            return passengerDetails; 

        } catch (error) {
            console.error('Error while getting all bookings:', error);
            throw new Error('Internal server error: ');
        }
    },

    getIdBooking: async ({ Id } : Booking) => {
        try {
       
            const booking = await Booking.findByPk(Id, {
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
                ]
            });

            if (!booking) {return { message: 'Booking not found'}};


            const passenger = booking.Passenger.dataValues;
            const flight = booking.Flight.dataValues;
            return {
                Id: booking.dataValues.Id,  

          
                PassengerID: {
                    Id: booking.dataValues.PassengerID,
                    FirstName: passenger.FirstName,
                    LastName: passenger.LastName, 
                    Email: passenger.Email,   
                },

                SeatClass: booking.dataValues.SeatClass,
                SeatPreference: booking.dataValues.SeatPreference,
                BookingStatus: booking.dataValues.BookingStatus,
                PaymentStatus: booking.dataValues.PaymentStatus,
                BookingDate: booking.dataValues.BookingDate,

                FlightID: {
                    Id:  booking.dataValues.FlightID,
                    FlightNumber: flight.FlightNumber,
                    DepartureAirport: flight.DepartureAirport,
                    ArrivalAirport: flight.ArrivalAirport,
                    FlightPrice: flight.FlightPrice,
                    FlightDuration: flight.FlightDuration,
                    DepartureDate: flight.DepartureDate,
                    DepartureTime: flight.DepartureTime,
                    Airline: flight.Airline,
                    PassengerCapacity: flight.PassengerCapacity,
                }
            };
        } catch (error) {
            console.error('Error while get one bookings:', error);
            throw new Error('Internal server error: ');
        }
    }
};

export default rootBooking;

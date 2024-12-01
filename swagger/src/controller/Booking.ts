import Booking from '../model/Booking';
import Passenger from '../model/Passenger';
import Flight from '../model/Flight';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';


const PostBookingWithParamsIdFlight = async(req: Request, res: Response) => {
    try {
        const flight_id = req.params.flightId;

        const flight = await Flight.findByPk(flight_id);
        if(!flight) {res.status(404).json( { message: "Flight ID is not found"}) ; return};

        const { PassengerID, BookingDate, DepartureDateTime, ArrivalDateTime, SeatClass, SeatPreference} = req.body;

        const passenger = await Passenger.findByPk(PassengerID);
        if(!passenger) {res.status(404).json( { message: "Passenger ID is not found"}) ; return};


        const booking = await Booking.create({
            Id: uuidv4(),
            FlightID: flight_id,
            PassengerID, 
            BookingDate, 
            DepartureDateTime, 
            ArrivalDateTime, 
            SeatClass, 
            SeatPreference, 
            BookingStatus: 'Pending',
            PaymentStatus: 'Unpaid',
            CreateDate: new Date()

        })

        res.status(200).json({
            message: 'Booking created successfully',
            booking: booking
        })

    } catch (error) {
        console.error('Error while post booking:', error);
        res.status(505).json('Internal server error: ');
    }
}

const GetAllBooking = async(req: Request, res: Response) => {
    try{
        const booking = await Booking.findAll({
            include: [
                {
                    model: Passenger,  
                    attributes: ['FirstName', 'LastName', 'Email'],
                },
                {
                    model: Flight,  
                    attributes: [
                        'FlightNumber',
                        'DepartureAirport',
                        'ArrivalAirport',
                        'FlightPrice',
                        'DepartureDateTime',
                        'ArrivalDateTime',
                        'FlightDuration',
                        'Airline',
                        'PassengerCapacity'
                    ] 
                }
            ]
        })

        res.status(200).json({
            booking: booking
        })
    } catch (error) {
        console.error('Error while get all booking:', error);
        res.status(505).json('Internal server error: ');
    }
}


const GetIdBooking = async(req: Request, res: Response) => {
    try {
        const booking_Id = req.params.id


        const booking = await Booking.findByPk(booking_Id, {
            include: [
                {
                    model: Passenger,  
                    attributes: ['FirstName', 'LastName', 'Email'],
                },
                {
                    model: Flight,  
                    attributes: [
                        'FlightNumber',
                        'DepartureAirport',
                        'ArrivalAirport',
                        'FlightPrice',
                        'DepartureDateTime',
                        'ArrivalDateTime',
                        'FlightDuration',
                        'Airline',
                        'PassengerCapacity'
                    ] 
                }
            ]
        })
        if(!booking) {res.status(404).json( { message: "Booking ID is not found"}) ; return};


        console.log(booking)
        res.status(200).json({
            booking: booking
        })
    } catch (error) {
        console.error('Error while get one booking:', error);
        res.status(505).json('Internal server error: ');
    }
}
export { PostBookingWithParamsIdFlight, GetAllBooking, GetIdBooking }
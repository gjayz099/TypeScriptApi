import Booking from '../model/Booking';
import Baggage from '../model/Baggage';
import Passenger from '../model/Passenger';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import Flight from '../model/Flight';


const PostBaggageWithParamsIdBooking = async(req: Request, res: Response) => {
    try {
        const booking_id = req.params.bookingId;

        const booking = await Booking.findByPk(booking_id);

        if(!booking) {res.status(404).json( { message: "Booking ID is not found"}) ; return};


        const { BaggageType, Weight, BaggageAllowance, ExcessWeight, BaggagePrice, BaggageClaimLocation } = req.body;

        const baggage =  await Baggage.create({
            Id: uuidv4(),
            BookingID: booking_id,
            BaggageType, 
            Weight, 
            BaggageAllowance, 
            ExcessWeight, 
            BaggagePrice, 
            BaggageClaimLocation,
            CreateDate: new Date()
        })


        res.status(200).json({
            message: 'Baggage created successfully',
            baggage: baggage
        })


    } catch (error) {
        console.error('Error while post baggage:', error);
        res.status(505).json('Internal server error: ');
    }
}

const GetAllBaggage = async(req: Request, res: Response) => {
    try{
        const baggage = await Baggage.findAll({
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
                        'DepartureDateTime',
                        'ArrivalDateTime',
                        'SeatClass',
                        'SeatPreference',
                        'BookingStatus',
                        'PaymentStatus'
                    ],
                  
                }
            ]

        })

        res.status(200).json({
            baggage: baggage
        })

    } catch (error) {
        console.error('Error while get all baggage:', error);
        res.status(505).json('Internal server error: ');
    }
}

const GetIdBaggage = async(req: Request, res: Response) => {
    try {

        const baggage_id = req.params.id

        const baggage = await Baggage.findByPk(baggage_id, {
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
                        'DepartureDateTime',
                        'ArrivalDateTime',
                        'SeatClass',
                        'SeatPreference',
                        'BookingStatus',
                        'PaymentStatus'
                    ],
                  
                }
            ]
        })

        if(!baggage) {res.status(404).json( { message: "Baggage ID is not found"}); return};

        res.status(200).json({
            baggage: baggage
        })

    } catch (error) {
        console.error('Error while get one baggage:', error);
        res.status(505).json('Internal server error: ');
    }
}

export { PostBaggageWithParamsIdBooking,  GetAllBaggage, GetIdBaggage}